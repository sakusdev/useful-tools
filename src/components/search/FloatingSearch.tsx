import { Search } from 'lucide-react'

interface FloatingSearchProps {
  onClick?: () => void
}

export default function FloatingSearch({ onClick }: FloatingSearchProps) {
  return (
    <button
      onClick={onClick}
      className="sticky top-4 z-40 mb-6 flex w-full items-center gap-3 rounded-3xl border border-zinc-800 bg-zinc-900/80 px-5 py-4 text-left shadow-2xl backdrop-blur-2xl transition hover:border-zinc-700 active:scale-[0.99]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-300">
        <Search size={20} />
      </div>

      <div>
        <div className="font-semibold text-white">Search Tools</div>
        <div className="text-sm text-zinc-400">
          Quickly find utilities and developer tools
        </div>
      </div>
    </button>
  )
}
