import { useMemo, useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

function copyText(value: string) {
  if (navigator.clipboard) void navigator.clipboard.writeText(value)
}

export default function UuidGeneratorPage() {
  const [refresh, setRefresh] = useState(0)
  const [count, setCount] = useState(5)
  const uuids = useMemo(() => Array.from({ length: count }, () => crypto.randomUUID()), [count, refresh])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">Developer Tool</div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">UUID Generator</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">ブラウザの安全な乱数で UUID v4 を生成します。</p>
        </div>
        <button type="button" onClick={() => setRefresh((value) => value + 1)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-zinc-950 hover:bg-sky-100">
          <RefreshCw size={18} /> Generate
        </button>
      </div>

      <label className="mt-6 block max-w-sm">
        <span className="text-sm font-semibold text-zinc-300">Count: {count}</span>
        <input type="range" min="1" max="20" value={count} onChange={(event) => setCount(Number(event.target.value))} className="mt-3 w-full accent-sky-300" />
      </label>

      <div className="mt-6 grid gap-3">
        {uuids.map((uuid) => (
          <div key={uuid} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all text-sm text-zinc-100">{uuid}</code>
            <button type="button" onClick={() => copyText(uuid)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              <Copy size={16} /> Copy
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
