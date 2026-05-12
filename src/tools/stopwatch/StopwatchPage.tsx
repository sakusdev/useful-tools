import { useEffect, useRef, useState } from 'react'

export default function StopwatchPage() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [running])

  const seconds = (time / 1000).toFixed(2)

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold">Stopwatch</h1>

      <div className="mt-8 text-6xl font-black tracking-tight">
        {seconds}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setRunning(true)}
          className="rounded-2xl bg-white px-6 py-3 text-black"
        >
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
          className="rounded-2xl border border-zinc-700 px-6 py-3"
        >
          Stop
        </button>

        <button
          onClick={() => {
            setRunning(false)
            setTime(0)
          }}
          className="rounded-2xl border border-zinc-700 px-6 py-3"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
