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
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    category: 'Productivity',
    description: 'Focus timer workflow',
    path: '/tools/pomodoro',
  },
  {
    id: 'world-clock',
    name: 'World Clock',
    category: 'Time',
    description: 'Multi timezone clock',
    path: '/tools/world-clock',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    category: 'Developer',
    description: 'Beautify JSON instantly',
    path: '/tools/json-formatter',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    category: 'Developer',
    description: 'Test regular expressions',
    path: '/tools/regex-tester',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    category: 'Developer',
    description: 'Generate UUIDs',
    path: '/tools/uuid-generator',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder',
    category: 'Developer',
    description: 'Encode and decode text',
    path: '/tools/base64',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    category: 'Developer',
    description: 'Encode URLs safely',
    path: '/tools/url-encoder',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    category: 'Security',
    description: 'Generate secure passwords',
    path: '/tools/password-generator',
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    category: 'Utility',
    description: 'Generate QR codes',
    path: '/tools/qr-generator',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'Utility',
    description: 'Convert measurements',
    path: '/tools/unit-converter',
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    category: 'Design',
    description: 'HEX RGB HSL conversion',
    path: '/tools/color-picker',
  },
  {
    id: 'palette-generator',
    name: 'Palette Generator',
    category: 'Design',
    description: 'Generate color palettes',
    path: '/tools/palette-generator',
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    category: 'Developer',
    description: 'Live markdown rendering',
    path: '/tools/markdown-preview',
  },
  {
    id: 'cron-builder',
    name: 'Cron Builder',
    category: 'Developer',
    description: 'Build cron expressions',
    path: '/tools/cron-builder',
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'Developer',
    description: 'Inspect JWT payloads',
    path: '/tools/jwt-decoder',
  },
  {
    id: 'device-info',
    name: 'Device Info',
    category: 'System',
    description: 'Browser and device data',
    path: '/tools/device-info',
  },
  {
    id: 'network-info',
    name: 'Network Info',
    category: 'System',
    description: 'Inspect connection details',
    path: '/tools/network-info',
  },
]
