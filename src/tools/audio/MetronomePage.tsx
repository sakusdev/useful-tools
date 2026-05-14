import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

function beep(context: AudioContext, accented: boolean) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = accented ? 1200 : 820
  gain.gain.setValueAtTime(0.0001, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(accented ? 0.35 : 0.2, context.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.08)
  oscillator.connect(gain).connect(context.destination)
  oscillator.start()
  oscillator.stop(context.currentTime + 0.09)
}

export default function MetronomePage() {
  const [bpm, setBpm] = useState(120)
  const [beats, setBeats] = useState(4)
  const [running, setRunning] = useState(false)
  const [beat, setBeat] = useState(0)
  const contextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!running) return
    const interval = window.setInterval(() => {
      setBeat((current) => {
        const next = (current % beats) + 1
        const context = contextRef.current
        if (context) beep(context, next === 1)
        return next
      })
    }, 60000 / bpm)

    return () => window.clearInterval(interval)
  }, [beats, bpm, running])

  async function toggle() {
    if (!contextRef.current) contextRef.current = new AudioContext()
    await contextRef.current.resume()
    if (!running) {
      setBeat(0)
      beep(contextRef.current, true)
      setBeat(1)
    }
    setRunning((value) => !value)
  }

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Metronome</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Adjust tempo and time signature, then play a browser-generated click track.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center">
          <div className="text-7xl font-black text-white">{bpm}</div>
          <div className="text-sm font-semibold uppercase tracking-wide text-zinc-400">BPM</div>
          <button type="button" onClick={toggle} className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-zinc-950 hover:bg-sky-100">
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? 'Stop' : 'Start'}
          </button>
        </div>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-zinc-950/60 p-6">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">Tempo</span>
            <input type="range" min="30" max="240" value={bpm} onChange={(event) => setBpm(Number(event.target.value))} className="mt-3 w-full accent-sky-300" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">Beats per bar: {beats}</span>
            <input type="range" min="2" max="12" value={beats} onChange={(event) => setBeats(Number(event.target.value))} className="mt-3 w-full accent-sky-300" />
          </label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {Array.from({ length: beats }, (_, index) => (
              <div key={index} className={`aspect-square rounded-2xl border ${beat === index + 1 ? 'border-sky-200 bg-sky-300 text-zinc-950' : 'border-white/10 bg-white/10 text-zinc-300'} flex items-center justify-center text-xl font-black`}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

