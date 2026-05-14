import { useMemo, useState } from 'react'
import { Copy } from 'lucide-react'

function copyText(value: string) {
  if (navigator.clipboard) void navigator.clipboard.writeText(value)
}

function words(value: string) {
  return value.trim().match(/[A-Za-z0-9]+/g) ?? []
}

function titleCase(value: string) {
  return words(value).map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')
}

export default function CaseConverterPage() {
  const [input, setInput] = useState('Modern Utility Toolbox')
  const outputs = useMemo(() => {
    const parts = words(input)

    return {
      Uppercase: input.toUpperCase(),
      Lowercase: input.toLowerCase(),
      'Title Case': titleCase(input),
      'Sentence case': input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(),
      'kebab-case': parts.map((word) => word.toLowerCase()).join('-'),
      snake_case: parts.map((word) => word.toLowerCase()).join('_'),
      camelCase: parts.map((word, index) => index === 0 ? word.toLowerCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()).join(''),
      PascalCase: parts.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(''),
    }
  }, [input])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Case Converter</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">見出し、ファイル名、変数名に使うケースへまとめて変換します。</p>
      <textarea value={input} onChange={(event) => setInput(event.target.value)} className="mt-6 min-h-40 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none focus:border-sky-300/60" />
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {Object.entries(outputs).map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
              {label}
              <button type="button" onClick={() => copyText(value)} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20">
                <Copy size={13} /> Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-zinc-100">{value}</pre>
          </div>
        ))}
      </div>
    </section>
  )
}
