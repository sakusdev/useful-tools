import { useEffect, useState } from 'react'
import { Copy, Fingerprint } from 'lucide-react'

type Hashes = Record<'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512', string>

const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

function copyText(value: string) {
  if (navigator.clipboard) void navigator.clipboard.writeText(value)
}

async function digestText(text: string, algorithm: (typeof algorithms)[number]) {
  const bytes = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest(algorithm, bytes)
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState('Useful Tools')
  const [hashes, setHashes] = useState<Hashes>({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  })

  useEffect(() => {
    let active = true

    async function run() {
      const entries = await Promise.all(algorithms.map(async (algorithm) => [algorithm, await digestText(input, algorithm)] as const))
      if (active) setHashes(Object.fromEntries(entries) as Hashes)
    }

    void run()
    return () => {
      active = false
    }
  }, [input])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
        <Fingerprint size={14} /> Security Tool
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Hash Generator</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">入力テキストから SHA 系ハッシュを即時計算します。処理はすべてブラウザ内で完結します。</p>

      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="mt-6 min-h-48 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none ring-sky-400/30 transition placeholder:text-zinc-500 focus:border-sky-300/60 focus:ring-4"
        placeholder="Hash input"
      />

      <div className="mt-6 grid gap-3">
        {algorithms.map((algorithm) => (
          <div key={algorithm} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {algorithm}
              <button type="button" onClick={() => copyText(hashes[algorithm])} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20">
                <Copy size={13} /> Copy
              </button>
            </div>
            <code className="break-all text-sm leading-6 text-zinc-100">{hashes[algorithm]}</code>
          </div>
        ))}
      </div>
    </section>
  )
}
