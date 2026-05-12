import { useEffect, useState } from 'react'

export default function TimerPage() {
  const [seconds, setSeconds] = useState(300)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setRunning(false)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold">Timer</h1>

      <div className="mt-8 text-6xl font-black tracking-tight">
        {String(minutes).padStart(2, '0')}:
        {String(remainingSeconds).padStart(2, '0')}
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
          Pause
        </button>
      </div>
    </div>
  )
}
