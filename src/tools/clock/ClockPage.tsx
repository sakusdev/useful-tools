import { useEffect, useState } from 'react'

export default function ClockPage() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold">Clock</h1>

      <div className="mt-8 text-6xl font-black tracking-tight">
        {time.toLocaleTimeString()}
      </div>

      <p className="mt-4 text-zinc-400">
        {time.toLocaleDateString()}
      </p>
    </div>
  )
}
