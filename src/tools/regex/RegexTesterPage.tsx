import { useMemo, useState } from 'react'
import { SearchCheck } from 'lucide-react'

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b')
  const [flags, setFlags] = useState('gi')
  const [text, setText] = useState('Contact us at hello@example.com or support@example.net.')

  const result = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags)
      const matches = Array.from(text.matchAll(regex))
      return {
        error: '',
        matches: matches.map((match) => ({
          value: match[0],
          index: match.index ?? 0,
        })),
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Invalid regular expression',
        matches: [],
      }
    }
  }, [flags, pattern, text])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
        <SearchCheck size={14} /> Developer Tool
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Regex Tester</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">正規表現のマッチ結果、位置、件数をリアルタイムで確認できます。</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_160px]">
        <label>
          <span className="text-sm font-semibold text-zinc-300">Pattern</span>
          <input value={pattern} onChange={(event) => setPattern(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none focus:border-sky-300/60" />
        </label>
        <label>
          <span className="text-sm font-semibold text-zinc-300">Flags</span>
          <input value={flags} onChange={(event) => setFlags(event.target.value)} className="mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/80 px-4 py-3 text-white outline-none focus:border-sky-300/60" />
        </label>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <textarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-72 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none focus:border-sky-300/60" />
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
          <div className="text-sm font-semibold text-zinc-300">Matches: {result.matches.length}</div>
          {result.error ? (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{result.error}</div>
          ) : (
            <div className="mt-4 space-y-2">
              {result.matches.length === 0 ? (
                <div className="text-sm text-zinc-400">No matches</div>
              ) : (
                result.matches.map((match, index) => (
                  <div key={`${match.index}-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-3">
                    <div className="text-xs uppercase tracking-wide text-zinc-500">Index {match.index}</div>
                    <code className="mt-1 block break-all text-sm text-zinc-100">{match.value}</code>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
