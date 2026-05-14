import { useMemo, useState } from 'react'

function parseDateInput(value: string) {
  const numeric = Number(value)
  if (Number.isFinite(numeric) && value.trim() !== '') {
    return new Date(numeric > 10_000_000_000 ? numeric : numeric * 1000)
  }

  return new Date(value)
}

export default function TimestampConverterPage() {
  const [input, setInput] = useState(String(Math.floor(Date.now() / 1000)))
  const date = useMemo(() => parseDateInput(input), [input])
  const valid = !Number.isNaN(date.getTime())
  const now = new Date()

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Timestamp Converter</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">Unix秒、Unixミリ秒、ISO日時を相互に確認します。</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none focus:border-sky-300/60" />
        <button type="button" onClick={() => setInput(String(Math.floor(Date.now() / 1000)))} className="rounded-2xl bg-white px-5 py-3 font-bold text-zinc-950 hover:bg-sky-100">Now</button>
      </div>

      {!valid ? (
        <div className="mt-6 rounded-3xl border border-red-400/30 bg-red-400/10 p-4 text-red-200">日時として解釈できません。</div>
      ) : (
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {[
            ['Unix seconds', Math.floor(date.getTime() / 1000)],
            ['Unix milliseconds', date.getTime()],
            ['ISO 8601', date.toISOString()],
            ['Local time', date.toLocaleString()],
            ['UTC string', date.toUTCString()],
            ['Difference from now', `${Math.round((date.getTime() - now.getTime()) / 1000)} sec`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{label}</div>
              <div className="mt-2 break-all text-lg font-bold text-white">{value}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
