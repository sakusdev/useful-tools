import { Home, Search, Star, Settings } from 'lucide-react'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4 gap-2 px-4 py-3">
        <button className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Home size={22} />
          <span className="text-xs">Home</span>
        </button>

        <button className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Search size={22} />
          <span className="text-xs">Search</span>
        </button>

        <button className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Star size={22} />
          <span className="text-xs">Favorites</span>
        </button>

        <button className="flex flex-col items-center gap-1 rounded-2xl p-2 text-zinc-300 transition active:scale-95">
          <Settings size={22} />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </nav>
  )
}
