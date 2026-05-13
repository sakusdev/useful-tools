import { useState } from 'react'

export default function JsonFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function formatJson() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch {
      setError('Invalid JSON')
      setOutput('')
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-4xl font-black">JSON Formatter</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON here"
        className="mt-6 h-56 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm outline-none"
      />

      <button
        onClick={formatJson}
        className="mt-4 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition active:scale-95"
      >
        Format JSON
      </button>

      {error && <div className="mt-4 text-red-400">{error}</div>}

      {output && (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
          {output}
        </pre>
      )}
    </div>
  )
}
