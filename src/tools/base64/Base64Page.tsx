import { useState } from 'react'

export default function Base64Page() {
  const [input, setInput] = useState('')

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-4xl font-black">Base64 Encoder</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text"
        className="mt-6 h-48 w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-4 outline-none"
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="mb-2 text-sm text-zinc-400">Encoded</div>
          <div className="break-all text-sm text-zinc-300">
            {btoa(input || '')}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="mb-2 text-sm text-zinc-400">Decoded</div>
          <div className="break-all text-sm text-zinc-300">
            {(() => {
              try {
                return atob(input || '')
              } catch {
                return 'Invalid Base64'
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
