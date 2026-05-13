import { NavLink } from 'react-router-dom'
import { tools } from '@/app/tools.registry'

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">Useful Tools</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Modular utility toolbox
        </p>
      </div>

      <nav className="px-3 pb-6">
        {tools.map((tool) => (
          <NavLink
            key={tool.id}
            to={tool.path}
            className={({ isActive }) =>
              `mb-2 block rounded-2xl px-4 py-3 transition ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-zinc-300 hover:bg-zinc-800'
              }`
            }
          >
            <div className="font-medium">{tool.name}</div>

            <div className="text-xs opacity-70">
              {tool.description}
            </div>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
