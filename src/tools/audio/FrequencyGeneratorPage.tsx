import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const waveforms: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle']

export default function FrequencyGeneratorPage() {
  const [frequency, setFrequency] = useState(440)
  const [volume, setVolume] = useState(0.18)
  const [waveform, setWaveform] = useState<OscillatorType>('sine')
  const [playing, setPlaying] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    if (oscillatorRef.current) oscillatorRef.current.frequency.value = frequency
  }, [frequency])

  useEffect(() => {
    if (oscillatorRef.current) oscillatorRef.current.type = waveform
  }, [waveform])

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.value = volume
  }, [volume])

  function stop() {
    oscillatorRef.current?.stop()
    oscillatorRef.current?.disconnect()
    gainRef.current?.disconnect()
    oscillatorRef.current = null
    gainRef.current = null
    setPlaying(false)
  }

  async function start() {
    const context = contextRef.current ?? new AudioContext()
    contextRef.current = context
    await context.resume()

    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = waveform
    oscillator.frequency.value = frequency
    gain.gain.value = volume
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillatorRef.current = oscillator
    gainRef.current = gain
    setPlaying(true)
  }

  useEffect(() => stop, [])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Frequency Generator</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Generate a test tone with adjustable frequency, volume, and waveform.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center">
          <div className="text-7xl font-black text-white">{frequency}</div>
          <div className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Hz</div>
          <button type="button" onClick={playing ? stop : start} className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-zinc-950 hover:bg-sky-100">
            {playing ? <Pause size={18} /> : <Play size={18} />}
            {playing ? 'Stop' : 'Play'}
          </button>
        </div>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-zinc-950/60 p-6">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">Frequency</span>
            <input type="range" min="20" max="20000" step="1" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} className="mt-3 w-full accent-sky-300" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-zinc-300">Volume</span>
            <input type="range" min="0" max="0.6" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="mt-3 w-full accent-sky-300" />
          </label>
          <div>
            <div className="text-sm font-semibold text-zinc-300">Waveform</div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {waveforms.map((type) => (
                <button key={type} type="button" onClick={() => setWaveform(type)} className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${waveform === type ? 'border-sky-200 bg-sky-300 text-zinc-950' : 'border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[220, 440, 880].map((value) => (
              <button key={value} type="button" onClick={() => setFrequency(value)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/10">
                {value} Hz
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

