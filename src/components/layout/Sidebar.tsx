import { NavLink } from 'react-router-dom'
import { tools } from '@/app/tools.registry'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="p-5 lg:p-6">
        <h1 className="text-2xl font-black tracking-tight text-white">
          Useful Tools
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Modular utility toolbox
        </p>
      </div>

      <nav className="flex gap-3 overflow-x-auto px-4 pb-5 lg:block lg:overflow-visible lg:px-3">
        {tools.map((tool) => (
          <NavLink
            key={tool.id}
            to={tool.path}
            className={({ isActive }) =>
              `min-w-[220px] rounded-2xl border px-4 py-3 transition lg:mb-3 lg:block lg:min-w-0 ${
                isActive
                  ? 'border-white bg-white text-black'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
              }`
            }
          >
            <div className="font-semibold">{tool.name}</div>

            <div className="mt-1 text-xs opacity-70">
              {tool.description}
            </div>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
