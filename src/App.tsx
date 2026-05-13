import { useEffect, useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import FloatingSearch from '@/components/search/FloatingSearch'
import CommandPalette from '@/components/search/CommandPalette'
import AppRouter from '@/app/router/AppRouter'

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_34rem),#09090b] text-white">
      <Sidebar />
      <BottomNav onSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-h-screen pb-28 lg:ml-80 lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:p-6 lg:p-10">
          <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:mb-8 sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-sky-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-200">
              PWA Utility Toolbox
            </p>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">Modern Utility Toolbox</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              モバイルファースト、グラスモーフィズム、スムーズな画面遷移に対応した 100+ ツールのネイティブアプリ風 PWA です。
            </p>
          </div>

          <FloatingSearch onClick={() => setSearchOpen(true)} />
          <AppRouter />
        </div>
      </main>
    </div>
  )
}
