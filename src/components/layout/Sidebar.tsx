import { NavLink } from 'react-router-dom'
import { groupedTools, tools } from '@/app/tools.registry'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur-2xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
      <div className="p-5 lg:p-6">
        <h1 className="text-2xl font-black tracking-tight text-white">Useful Tools</h1>
        <p className="mt-2 text-sm text-zinc-400">{tools.length}+ 個のモジュラー utility toolbox</p>
      </div>

      <nav className="flex gap-3 overflow-x-auto px-4 pb-5 lg:block lg:h-[calc(100vh-112px)] lg:space-y-4 lg:overflow-y-auto lg:px-3">
        {groupedTools.map((group) => (
          <section key={group.id} className="min-w-[260px] lg:min-w-0">
            <h2 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-zinc-500">{group.name}</h2>
            <div className="space-y-2">
              {group.tools.map((tool) => (
                <NavLink
                  key={tool.id}
                  to={tool.path}
                  className={({ isActive }) =>
                    `block rounded-2xl border px-4 py-3 transition ${
                      isActive
                        ? 'border-sky-200 bg-white text-zinc-950 shadow-lg shadow-sky-950/30'
                        : 'border-white/10 bg-white/[0.04] text-zinc-300 hover:border-sky-300/50 hover:bg-sky-400/10'
                    }`
                  }
                >
                  <div className="font-semibold">{tool.name}</div>
                  <div className="mt-1 line-clamp-2 text-xs opacity-70">{tool.description}</div>
                </NavLink>
              ))}
            </div>
          </section>
        ))}
      </nav>
    </aside>
  )
}
