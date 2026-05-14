import { useMemo, useState } from 'react'

export default function TextCounterPage() {
  const [text, setText] = useState('Useful tools make small work feel lighter.')
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length ?? (text.trim() ? 1 : 0)

    return [
      ['Characters', text.length],
      ['Characters without spaces', text.replace(/\s/g, '').length],
      ['Words', words],
      ['Lines', lines],
      ['Sentences', sentences],
      ['Estimated tokens', Math.ceil(text.length / 4)],
      ['Reading time', `${Math.max(1, Math.ceil(words / 220))} min`],
    ]
  }, [text])

  return (
    <section className="glass-panel p-4 sm:p-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Text Counter</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300">文字数、単語数、行数、概算トークン数をリアルタイムで集計します。</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <textarea value={text} onChange={(event) => setText(event.target.value)} className="min-h-80 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none focus:border-sky-300/60" />
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="text-sm text-zinc-400">{label}</div>
              <div className="mt-2 text-3xl font-black text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
