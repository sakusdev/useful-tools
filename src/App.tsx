import Sidebar from '@/components/layout/Sidebar'
import BottomNav from '@/components/layout/BottomNav'
import FloatingSearch from '@/components/search/FloatingSearch'
import AppRouter from '@/app/router/AppRouter'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <BottomNav />

      <main className="page-transition min-h-screen pb-32 lg:ml-72 lg:pb-0">
        <div className="mx-auto max-w-7xl p-6 lg:p-10">
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight lg:text-6xl">
              Modern Utility Toolbox
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-zinc-400">
              Fast. Modular. Offline-ready.
            </p>
          </div>

          <FloatingSearch />

          <AppRouter />
        </div>
      </main>
    </div>
  )
}
