export default function App() {
  const tools = [
    {
      name: 'Clock',
      description: 'Modern realtime clock',
    },
    {
      name: 'Stopwatch',
      description: 'Precision stopwatch utility',
    },
    {
      name: 'Timer',
      description: 'Countdown timer tool',
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-zinc-800 bg-zinc-900">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Useful Tools</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Modular modern utility toolbox.
          </p>
        </div>
      </aside>

      <main className="ml-72 p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight">
            Modern Utility Toolbox
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-semibold">{tool.name}</h3>

              <p className="mt-2 text-sm text-zinc-400">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
