import { useMemo, useState } from 'react'
import { Copy, Link as LinkIcon, RotateCcw } from 'lucide-react'

function copyText(value: string) {
  if (navigator.clipboard) void navigator.clipboard.writeText(value)
}

export default function UrlCodecPage() {
  const [input, setInput] = useState('https://example.com/search?q=useful tools&lang=ja')

  const result = useMemo(() => {
    let decoded = ''
    let error = ''

    try {
      decoded = decodeURIComponent(input)
    } catch {
      error = 'Invalid percent-encoding. % の後ろに2桁の16進数が必要です。'
    }

    return {
      encoded: encodeURIComponent(input),
      decoded,
      error,
    }
  }, [input])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
            <LinkIcon size={14} /> Developer Tool
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">URL Encoder / Decoder</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">URLに含める文字列を安全にエンコードし、既存のURLエスケープを読みやすい文字列へ戻します。</p>
        </div>
        <button
          type="button"
          onClick={() => setInput('')}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 font-semibold text-zinc-200 hover:bg-white/10"
        >
          <RotateCcw size={18} /> Clear
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-300">Input</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="mt-3 min-h-64 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none ring-sky-400/30 transition placeholder:text-zinc-500 focus:border-sky-300/60 focus:ring-4"
            placeholder="URL or text"
          />
        </label>

        <div className="space-y-3">
          {[
            ['Encoded', result.encoded],
            ['Decoded', result.error || result.decoded],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {label}
                <button type="button" onClick={() => copyText(value)} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20">
                  <Copy size={13} /> Copy
                </button>
              </div>
              <pre className={`whitespace-pre-wrap break-words text-sm leading-6 ${result.error && label === 'Decoded' ? 'text-red-300' : 'text-zinc-100'}`}>{value || '-'}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
