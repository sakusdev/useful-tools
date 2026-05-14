import { useMemo, useState } from 'react'
import { RotateCcw, Timer } from 'lucide-react'

export default function BpmTapperPage() {
  const [taps, setTaps] = useState<number[]>([])

  const stats = useMemo(() => {
    const recent = taps.slice(-12)
    const intervals = recent.slice(1).map((tap, index) => tap - recent[index]).filter((value) => value > 120 && value < 3000)
    const average = intervals.length ? intervals.reduce((sum, value) => sum + value, 0) / intervals.length : 0
    const bpm = average ? 60000 / average : 0
    return {
      bpm,
      intervals,
      confidence: Math.min(100, Math.round((intervals.length / 8) * 100)),
    }
  }, [taps])

  function tap() {
    const now = performance.now()
    setTaps((current) => {
      const next = current.length && now - current[current.length - 1] > 3000 ? [now] : [...current, now]
      return next.slice(-24)
    })
  }

  return (
    <section className="glass-panel p-4 sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
        <Timer size={14} /> Audio / Music
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">BPM Tapper</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Tap along with music to estimate tempo from recent beat intervals.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <button
          type="button"
          onClick={tap}
          onKeyDown={(event) => {
            if (event.code === 'Space') {
              event.preventDefault()
              tap()
            }
          }}
          className="min-h-72 rounded-3xl border border-sky-300/30 bg-sky-300/15 p-8 text-center shadow-2xl shadow-sky-950/20 hover:bg-sky-300/20 focus:outline-none focus:ring-4 focus:ring-sky-300/25"
        >
          <div className="text-sm font-semibold uppercase tracking-wide text-sky-100">Tap or press Space</div>
          <div className="mt-6 text-7xl font-black tracking-tight text-white">{stats.bpm ? Math.round(stats.bpm) : '--'}</div>
          <div className="mt-2 text-xl font-bold text-zinc-300">BPM</div>
        </button>

        <div className="space-y-3">
          {[
            ['Taps', taps.length],
            ['Average interval', stats.intervals.length ? `${Math.round(stats.intervals.reduce((sum, value) => sum + value, 0) / stats.intervals.length)} ms` : '--'],
            ['Confidence', `${stats.confidence}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="text-sm text-zinc-400">{label}</div>
              <div className="mt-2 text-3xl font-black text-white">{value}</div>
            </div>
          ))}
          <button type="button" onClick={() => setTaps([])} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 font-semibold text-zinc-200 hover:bg-white/10">
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>
    </section>
  )
}

