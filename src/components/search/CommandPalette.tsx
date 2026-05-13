import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { tools } from '@/app/tools.registry'

export default function CommandPalette() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return tools.filter((tool) =>
      tool.name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query])

  return (
    <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3">
        <Search className="text-zinc-500" size={20} />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      {query.length > 0 && (
        <div className="mt-4 space-y-2">
          {filtered.map((tool) => (
            <div
              key={tool.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3"
            >
              <div className="font-semibold">{tool.name}</div>
              <div className="text-sm text-zinc-400">
                {tool.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
