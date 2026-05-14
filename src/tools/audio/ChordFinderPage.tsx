import { useMemo, useState } from 'react'
import { chordTypes, noteNames, notesFromIntervals } from './musicTheory'

export default function ChordFinderPage() {
  const [root, setRoot] = useState('C')
  const [type, setType] = useState<keyof typeof chordTypes>('Major')
  const notes = useMemo(() => notesFromIntervals(root, chordTypes[type]), [root, type])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Chord Finder</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Build common chords and see the notes that make them up.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-sm font-semibold text-zinc-300">Root</span>
          <select value={root} onChange={(event) => setRoot(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none">
            {noteNames.map((note) => <option key={note}>{note}</option>)}
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold text-zinc-300">Chord type</span>
          <select value={type} onChange={(event) => setType(event.target.value as keyof typeof chordTypes)} className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none">
            {Object.keys(chordTypes).map((name) => <option key={name}>{name}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
        <div className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{root} {type}</div>
        <div className="mt-4 flex flex-wrap gap-3">
          {notes.map((note) => (
            <div key={note} className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-2xl font-black text-zinc-950">{note}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

