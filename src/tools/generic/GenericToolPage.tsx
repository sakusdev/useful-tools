import { useMemo, useState } from 'react'
import { Copy, Sparkles } from 'lucide-react'
import type { ToolDefinition } from '@/app/tools.registry'

interface GenericToolPageProps {
  tool: ToolDefinition
}

function transformValue(toolId: string, value: string) {
  if (toolId.includes('case-converter')) {
    return {
      Uppercase: value.toUpperCase(),
      Lowercase: value.toLowerCase(),
      'Title Case': value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()),
    }
  }

  if (toolId.includes('url-encoder')) return { Encoded: encodeURIComponent(value) }
  if (toolId.includes('url-decoder')) {
    try {
      return { Decoded: decodeURIComponent(value) }
    } catch {
      return { Error: 'URL をデコードできません' }
    }
  }

  if (toolId.includes('text-counter') || toolId.includes('token-counter')) {
    return {
      Characters: String(value.length),
      Words: String(value.trim() ? value.trim().split(/\s+/).length : 0),
      Lines: String(value ? value.split('\n').length : 0),
    }
  }

  if (toolId.includes('percentage-calculator')) {
    const numbers = value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
    const [a = 0, b = 0] = numbers
    return { Result: b === 0 ? '2つの数値を入力してください' : `${a} は ${b} の ${(a / b * 100).toFixed(2)}%` }
  }

  return {
    Preview: value || '入力するとここに結果プレビューが表示されます',
    Status: 'このツールは汎用フォールバック画面で利用できます。専用 UI は順次追加予定です。',
  }
}

export default function GenericToolPage({ tool }: GenericToolPageProps) {
  const [input, setInput] = useState('')
  const results = useMemo(() => transformValue(tool.id, input), [input, tool.id])

  async function copyText(value: string) {
    if (!navigator.clipboard) return
    await navigator.clipboard.writeText(value)
  }

  return (
    <section className="glass-panel overflow-hidden p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
            <Sparkles size={14} /> Generic Tool Shell
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{tool.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">{tool.description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
          {tool.category}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-300">Input</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={`${tool.name} に使うテキストや数値を入力`}
            className="mt-3 min-h-64 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none ring-sky-400/30 transition placeholder:text-zinc-500 focus:border-sky-300/60 focus:ring-4"
          />
        </label>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-zinc-300">Output</div>
          {Object.entries(results).map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {label}
                <button
                  type="button"
                  onClick={() => copyText(value)}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20"
                >
                  <Copy size={13} /> Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-zinc-100">{value}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
