import Sidebar from './components/layout/Sidebar'
import AppRouter from './app/router/AppRouter'

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <main className="ml-72 p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">
            Modern Utility Toolbox
          </h2>

          <p className="mt-3 text-zinc-400">
            Fast. Modular. Offline-ready.
          </p>
        </div>

        <AppRouter />
      </main>
    </div>
  )
}
