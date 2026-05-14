import { useEffect, useRef, useState } from 'react'
import { Mic, Pause, Play } from 'lucide-react'

export default function AudioVisualizerPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | OscillatorNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [mode, setMode] = useState<'idle' | 'tone' | 'mic'>('idle')
  const [error, setError] = useState('')

  function draw(analyser: AnalyserNode) {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const buffer = new Uint8Array(analyser.frequencyBinCount)

    const render = () => {
      analyser.getByteFrequencyData(buffer)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#09090b'
      context.fillRect(0, 0, canvas.width, canvas.height)
      const bars = 96
      const width = canvas.width / bars
      for (let index = 0; index < bars; index += 1) {
        const value = buffer[Math.floor(index * buffer.length / bars)] / 255
        const height = Math.max(4, value * canvas.height)
        const hue = 190 + value * 80
        context.fillStyle = `hsl(${hue}, 90%, ${55 + value * 20}%)`
        context.fillRect(index * width, canvas.height - height, Math.max(2, width - 2), height)
      }
      animationRef.current = requestAnimationFrame(render)
    }

    render()
  }

  function stop() {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    sourceRef.current?.disconnect()
    if (sourceRef.current instanceof OscillatorNode) sourceRef.current.stop()
    streamRef.current?.getTracks().forEach((track) => track.stop())
    sourceRef.current = null
    streamRef.current = null
    setMode('idle')
  }

  async function startTone() {
    stop()
    const context = contextRef.current ?? new AudioContext()
    contextRef.current = context
    await context.resume()
    const analyser = context.createAnalyser()
    const gain = context.createGain()
    const oscillator = context.createOscillator()
    analyser.fftSize = 2048
    oscillator.frequency.value = 220
    gain.gain.value = 0.08
    oscillator.connect(gain).connect(analyser).connect(context.destination)
    oscillator.start()
    sourceRef.current = oscillator
    setMode('tone')
    draw(analyser)
  }

  async function startMic() {
    try {
      stop()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const context = contextRef.current ?? new AudioContext()
      contextRef.current = context
      await context.resume()
      const analyser = context.createAnalyser()
      analyser.fftSize = 2048
      const source = context.createMediaStreamSource(stream)
      source.connect(analyser)
      sourceRef.current = source
      streamRef.current = stream
      setMode('mic')
      setError('')
      draw(analyser)
    } catch {
      setError('Microphone access was blocked or is unavailable. Use the demo tone instead.')
    }
  }

  useEffect(() => stop, [])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Audio Visualizer</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Visualize microphone input or a generated demo tone with live frequency bars.</p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
        <canvas ref={canvasRef} width={1200} height={420} className="block h-72 w-full" />
      </div>
      {error && <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</div>}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={startTone} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-zinc-950 hover:bg-sky-100">
          <Play size={18} /> Demo Tone
        </button>
        <button type="button" onClick={startMic} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-semibold text-zinc-200 hover:bg-white/10">
          <Mic size={18} /> Microphone
        </button>
        <button type="button" onClick={stop} disabled={mode === 'idle'} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-semibold text-zinc-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50">
          <Pause size={18} /> Stop
        </button>
      </div>
    </section>
  )
}

