import { Home, Search, Sparkles, Star } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface BottomNavProps {
  onSearch: () => void
}

export default function BottomNav({ onSearch }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-zinc-950/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl lg:hidden">
      <div className="grid grid-cols-4 gap-1 px-3 py-2">
        <NavLink to="/tools/clock" className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Home size={22} />
          <span className="text-[11px]">ホーム</span>
        </NavLink>

        <button type="button" onClick={onSearch} className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Search size={22} />
          <span className="text-[11px]">検索</span>
        </button>

        <NavLink to="/tools/password-generator" className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Star size={22} />
          <span className="text-[11px]">安全</span>
        </NavLink>

        <NavLink to="/tools/prompt-generator" className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Sparkles size={22} />
          <span className="text-[11px]">AI</span>
        </NavLink>
      </div>
    </nav>
  )
}
