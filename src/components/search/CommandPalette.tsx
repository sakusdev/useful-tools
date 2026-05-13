import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { tools } from '@/app/tools.registry'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => inputRef.current?.focus())

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, open])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return tools.slice(0, 12)

    return tools
      .filter((tool) => [tool.name, tool.category, tool.description, ...tool.tags].join(' ').toLowerCase().includes(normalized))
      .slice(0, 24)
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/60 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="ツール検索"
            className="mx-auto mt-16 max-h-[78vh] max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/95 shadow-2xl shadow-sky-950/30 backdrop-blur-2xl"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <Search className="text-sky-300" size={22} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ツール名・カテゴリ・キーワードで検索..."
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-zinc-500 sm:text-lg"
              />
              <button type="button" onClick={onClose} className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4">
              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-zinc-400">
                  一致するツールが見つかりませんでした。
                </div>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {filtered.map((tool) => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      onClick={onClose}
                      className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-sky-300/60 hover:bg-sky-400/10"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-bold text-white">{tool.name}</div>
                        <div className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-zinc-300">{tool.category}</div>
                      </div>
                      <div className="mt-2 text-sm leading-5 text-zinc-400">{tool.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
