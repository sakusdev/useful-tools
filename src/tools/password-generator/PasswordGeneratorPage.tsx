import { useMemo, useState } from 'react'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [refresh, setRefresh] = useState(0)

  const password = useMemo(() => {
    let result = ''

    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }

    return result
  }, [length, refresh])

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-4xl font-black">Password Generator</h1>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-2xl font-bold break-all">
        {password}
      </div>

      <div className="mt-6">
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />

        <div className="mt-2 text-zinc-400">
          Length: {length}
        </div>
      </div>

      <button
        onClick={() => setRefresh((v) => v + 1)}
        className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition active:scale-95"
      >
        Generate
      </button>
    </div>
  )
}
