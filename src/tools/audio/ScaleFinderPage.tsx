import { useMemo, useState } from 'react'
import { noteNames, notesFromIntervals, scales } from './musicTheory'

export default function ScaleFinderPage() {
  const [root, setRoot] = useState('C')
  const [scale, setScale] = useState<keyof typeof scales>('Major')
  const notes = useMemo(() => notesFromIntervals(root, scales[scale]), [root, scale])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Scale Finder</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Explore modes and pentatonic/blues scales from any root note.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-sm font-semibold text-zinc-300">Root</span>
          <select value={root} onChange={(event) => setRoot(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none">
            {noteNames.map((note) => <option key={note}>{note}</option>)}
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold text-zinc-300">Scale</span>
          <select value={scale} onChange={(event) => setScale(event.target.value as keyof typeof scales)} className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none">
            {Object.keys(scales).map((name) => <option key={name}>{name}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
        <div className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{root} {scale}</div>
        <div className="mt-4 flex flex-wrap gap-3">
          {notes.map((note, index) => (
            <div key={`${note}-${index}`} className="rounded-3xl border border-white/10 bg-zinc-950/70 px-5 py-4 text-center">
              <div className="text-xs text-zinc-500">Degree {index + 1}</div>
              <div className="mt-1 text-2xl font-black text-white">{note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

