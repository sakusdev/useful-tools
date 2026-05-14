import { useMemo, useState } from 'react'

interface MidiNote {
  channel: number
  note: number
  velocity: number
  tick: number
}

interface MidiSummary {
  format: number
  tracks: number
  division: number
  tempo: number | null
  timeSignature: string | null
  notes: MidiNote[]
}

function readText(view: DataView, offset: number, length: number) {
  return String.fromCharCode(...Array.from({ length }, (_, index) => view.getUint8(offset + index)))
}

function readVar(view: DataView, offset: number) {
  let value = 0
  let cursor = offset
  while (cursor < view.byteLength) {
    const byte = view.getUint8(cursor)
    cursor += 1
    value = (value << 7) | (byte & 0x7f)
    if ((byte & 0x80) === 0) break
  }
  return { value, offset: cursor }
}

function parseMidi(buffer: ArrayBuffer): MidiSummary {
  const view = new DataView(buffer)
  if (readText(view, 0, 4) !== 'MThd') throw new Error('Not a standard MIDI file.')
  const headerLength = view.getUint32(4)
  const format = view.getUint16(8)
  const tracks = view.getUint16(10)
  const division = view.getUint16(12)
  let offset = 8 + headerLength
  const notes: MidiNote[] = []
  let tempo: number | null = null
  let timeSignature: string | null = null

  for (let track = 0; track < tracks && offset < view.byteLength; track += 1) {
    if (readText(view, offset, 4) !== 'MTrk') break
    const length = view.getUint32(offset + 4)
    let cursor = offset + 8
    const end = cursor + length
    let tick = 0
    let runningStatus = 0

    while (cursor < end) {
      const delta = readVar(view, cursor)
      tick += delta.value
      cursor = delta.offset
      let status = view.getUint8(cursor)
      if (status < 0x80) {
        status = runningStatus
      } else {
        cursor += 1
        runningStatus = status
      }

      if (status === 0xff) {
        const type = view.getUint8(cursor)
        cursor += 1
        const size = readVar(view, cursor)
        cursor = size.offset
        if (type === 0x51 && size.value === 3) {
          const microseconds = (view.getUint8(cursor) << 16) | (view.getUint8(cursor + 1) << 8) | view.getUint8(cursor + 2)
          tempo = Math.round(60000000 / microseconds)
        }
        if (type === 0x58 && size.value >= 2) {
          timeSignature = `${view.getUint8(cursor)}/${2 ** view.getUint8(cursor + 1)}`
        }
        cursor += size.value
        continue
      }

      if (status === 0xf0 || status === 0xf7) {
        const size = readVar(view, cursor)
        cursor = size.offset + size.value
        continue
      }

      const eventType = status & 0xf0
      const channel = (status & 0x0f) + 1
      const data1 = view.getUint8(cursor)
      const data2 = eventType === 0xc0 || eventType === 0xd0 ? 0 : view.getUint8(cursor + 1)
      cursor += eventType === 0xc0 || eventType === 0xd0 ? 1 : 2

      if (eventType === 0x90 && data2 > 0) {
        notes.push({ channel, note: data1, velocity: data2, tick })
      }
    }

    offset = end
  }

  return { format, tracks, division, tempo, timeSignature, notes }
}

function noteName(note: number) {
  const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return `${names[note % 12]}${Math.floor(note / 12) - 1}`
}

export default function MidiViewerPage() {
  const [summary, setSummary] = useState<MidiSummary | null>(null)
  const [error, setError] = useState('')
  const visibleNotes = useMemo(() => summary?.notes.slice(0, 80) ?? [], [summary])

  async function loadFile(file: File) {
    try {
      setSummary(parseMidi(await file.arrayBuffer()))
      setError('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not parse MIDI file.')
      setSummary(null)
    }
  }

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">MIDI Viewer</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Drop in a .mid file to inspect header data, tempo, time signature, and note-on events.</p>
      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.04] p-8 text-center hover:bg-white/[0.07]">
        <span className="text-lg font-bold text-white">Choose MIDI file</span>
        <span className="mt-2 text-sm text-zinc-400">Standard MIDI files only</span>
        <input type="file" accept=".mid,.midi,audio/midi" className="hidden" onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) void loadFile(file)
        }} />
      </label>
      {error && <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}
      {summary && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['Format', summary.format],
              ['Tracks', summary.tracks],
              ['PPQ / Division', summary.division],
              ['Tempo', summary.tempo ? `${summary.tempo} BPM` : '--'],
              ['Time', summary.timeSignature ?? '--'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</div>
                <div className="mt-2 text-2xl font-black text-white">{value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-4">
            <div className="mb-3 text-sm font-semibold text-zinc-300">Note events: {summary.notes.length}</div>
            <div className="max-h-96 overflow-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-zinc-500">
                  <tr><th className="p-2">Tick</th><th className="p-2">Note</th><th className="p-2">MIDI</th><th className="p-2">Velocity</th><th className="p-2">Channel</th></tr>
                </thead>
                <tbody className="text-zinc-200">
                  {visibleNotes.map((note, index) => (
                    <tr key={`${note.tick}-${note.note}-${index}`} className="border-t border-white/10">
                      <td className="p-2">{note.tick}</td><td className="p-2 font-bold">{noteName(note.note)}</td><td className="p-2">{note.note}</td><td className="p-2">{note.velocity}</td><td className="p-2">{note.channel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

