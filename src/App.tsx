import Sidebar from '@/components/layout/Sidebar'
import AppRouter from '@/app/router/AppRouter'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <main className="page-transition min-h-screen lg:ml-72">
        <div className="mx-auto max-w-7xl p-6 lg:p-10">
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tight lg:text-5xl">
              Modern Utility Toolbox
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-400">
              Fast. Modular. Offline-ready.
            </p>
          </div>

          <AppRouter />
        </div>
      </main>
    </div>
  )
}
