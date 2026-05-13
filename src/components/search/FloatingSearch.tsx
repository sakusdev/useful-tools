import { Search, Sparkles } from 'lucide-react'

interface FloatingSearchProps {
  onClick: () => void
}

export default function FloatingSearch({ onClick }: FloatingSearchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="sticky top-3 z-40 mb-6 flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-zinc-950/75 px-4 py-3 text-left shadow-2xl shadow-black/30 backdrop-blur-2xl transition hover:border-sky-300/50 active:scale-[0.99] sm:px-5 sm:py-4"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200">
        <Search size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="font-semibold text-white">ツールを検索</div>
        <div className="truncate text-sm text-zinc-400">名前・カテゴリ・用途で 100+ ツールを瞬時に検索</div>
      </div>

      <div className="hidden items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300 sm:flex">
        <Sparkles size={14} /> ⌘K
      </div>
    </button>
  )
}
