export interface ToolDefinition {
  id: string
  name: string
  category: string
  description: string
  path: string
}

export const tools: ToolDefinition[] = [
  {
    id: 'clock',
    name: 'Clock',
    category: 'Time',
    description: 'Realtime digital clock',
    path: '/tools/clock',
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    category: 'Time',
    description: 'Precision stopwatch utility',
    path: '/tools/stopwatch',
  },
  {
    id: 'timer',
    name: 'Timer',
    category: 'Time',
    description: 'Countdown timer utility',
    path: '/tools/timer',
  },
]
