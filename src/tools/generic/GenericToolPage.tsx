import { useMemo, useState } from 'react'
import { Copy, Dice5, RefreshCw, Sparkles } from 'lucide-react'
import type { ToolDefinition } from '@/app/tools.registry'

interface GenericToolPageProps {
  tool: ToolDefinition
}

type ResultMap = Record<string, string>

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo at ipsum facilisis volutpat. Donec luctus, nibh non feugiat luctus, sem arcu gravida mi, a varius risus neque id nibh.'

function numberList(value: string) {
  return value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? []
}

function toTitleCase(value: string) {
  return value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
}

function parseHexColor(value: string) {
  const hex = value.trim().replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null

  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const lightness = (max + min) / 2
  const delta = max - min
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  const hue = delta === 0
    ? 0
    : max === r / 255
      ? 60 * (((g / 255 - b / 255) / delta) % 6)
      : max === g / 255
        ? 60 * ((b / 255 - r / 255) / delta + 2)
        : 60 * ((r / 255 - g / 255) / delta + 4)

  return {
    HEX: `#${hex.toUpperCase()}`,
    RGB: `rgb(${r}, ${g}, ${b})`,
    HSL: `hsl(${Math.round((hue + 360) % 360)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`,
  }
}

function randomToken(length = 32) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length)
}

function passwordStrength(value: string) {
  const checks = [value.length >= 12, /[a-z]/.test(value), /[A-Z]/.test(value), /\d/.test(value), /[^a-zA-Z0-9]/.test(value)]
  const score = checks.filter(Boolean).length
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent']

  return {
    Score: `${score}/5`,
    Strength: labels[score],
    Advice: score >= 4 ? '十分に強いパスワードです。' : '12文字以上で、大文字・小文字・数字・記号を混ぜてください。',
  }
}

function convertFileSize(bytes: number) {
  return {
    Bytes: `${bytes} B`,
    Kilobytes: `${(bytes / 1024).toFixed(2)} KB`,
    Megabytes: `${(bytes / 1024 ** 2).toFixed(2)} MB`,
    Gigabytes: `${(bytes / 1024 ** 3).toFixed(2)} GB`,
  }
}

function convertTimestamp(value: string) {
  const [first = Date.now()] = numberList(value)
  const milliseconds = first > 10_000_000_000 ? first : first * 1000
  const date = new Date(milliseconds)

  return {
    Unix: `${Math.floor(milliseconds / 1000)}`,
    ISO: Number.isNaN(date.getTime()) ? '有効な日時を入力してください' : date.toISOString(),
    Local: Number.isNaN(date.getTime()) ? '有効な日時を入力してください' : date.toLocaleString(),
  }
}

function inspectUnicode(value: string) {
  const characters = Array.from(value || 'A')
  return Object.fromEntries(
    characters.slice(0, 12).map((character, index) => [
      `U+${index + 1}`,
      `${character}  U+${character.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`,
    ]),
  )
}

function toolResults(toolId: string, value: string, generated: string): ResultMap {
  const numbers = numberList(value)

  if (toolId.includes('case-converter')) {
    return {
      Uppercase: value.toUpperCase(),
      Lowercase: value.toLowerCase(),
      'Title Case': toTitleCase(value),
      'Kebab Case': value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      'Snake Case': value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''),
    }
  }

  if (toolId.includes('text-counter') || toolId.includes('token-counter')) {
    return {
      Characters: String(value.length),
      Words: String(value.trim() ? value.trim().split(/\s+/).length : 0),
      Lines: String(value ? value.split('\n').length : 0),
      'Estimated Tokens': String(Math.ceil(value.length / 4)),
    }
  }

  if (toolId.includes('url-encoder')) return { Encoded: encodeURIComponent(value) }
  if (toolId.includes('url-decoder')) {
    try {
      return { Decoded: decodeURIComponent(value) }
    } catch {
      return { Error: 'URL をデコードできません。% エスケープを確認してください。' }
    }
  }

  if (toolId.includes('query-string-parser')) {
    const query = value.replace(/^.*\?/, '')
    const params = new URLSearchParams(query)
    return { JSON: JSON.stringify(Object.fromEntries(params.entries()), null, 2) }
  }

  if (toolId.includes('percentage-calculator')) {
    const [a = 0, b = 0] = numbers
    return {
      Result: b === 0 ? '例: 25 200 のように2つの数値を入力してください。' : `${a} は ${b} の ${(a / b * 100).toFixed(2)}%`,
      Formula: 'first / second * 100',
    }
  }

  if (toolId.includes('bmi-calculator')) {
    const [kg = 0, cm = 0] = numbers
    const meters = cm / 100
    const bmi = meters > 0 ? kg / meters ** 2 : 0
    return { BMI: bmi ? bmi.toFixed(1) : '例: 68 172（kg cm）', Category: bmi >= 25 ? 'Overweight' : bmi >= 18.5 ? 'Normal' : bmi ? 'Underweight' : '-' }
  }

  if (toolId.includes('tip-calculator')) {
    const [amount = 0, percent = 15, people = 1] = numbers
    const tip = amount * (percent / 100)
    return { Tip: tip.toFixed(2), Total: (amount + tip).toFixed(2), 'Per Person': ((amount + tip) / Math.max(people, 1)).toFixed(2) }
  }

  if (toolId.includes('age-calculator')) {
    const date = new Date(value)
    const now = new Date()
    const age = Number.isNaN(date.getTime()) ? null : now.getFullYear() - date.getFullYear() - (now < new Date(now.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0)
    return { Age: age === null ? '例: 1998-04-12 のように入力してください。' : `${age} years`, Birthday: Number.isNaN(date.getTime()) ? '-' : date.toDateString() }
  }

  if (toolId.includes('file-size-converter')) return convertFileSize(numbers[0] ?? 0)
  if (toolId.includes('timestamp-converter') || toolId.includes('unix-time-converter')) return convertTimestamp(value)
  if (toolId.includes('color-converter') || toolId.includes('color-picker')) return parseHexColor(value || '#38bdf8') ?? { Error: '6桁の HEX カラーを入力してください。例: #38bdf8' }
  if (toolId.includes('password-strength')) return passwordStrength(value)
  if (toolId.includes('unicode-inspector')) return inspectUnicode(value)

  if (toolId.includes('env-parser')) {
    const env = Object.fromEntries(value.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
      const [key, ...rest] = line.split('=')
      return [key, rest.join('=')]
    }))
    return { JSON: JSON.stringify(env, null, 2) }
  }

  if (toolId.includes('ascii-table')) {
    return { Table: Array.from({ length: 95 }, (_, index) => `${index + 32}: ${String.fromCharCode(index + 32)}`).join('\n') }
  }

  if (toolId.includes('lorem-ipsum')) return { Lorem: Array.from({ length: Math.max(1, numbers[0] ?? 2) }, () => lorem).join('\n\n') }
  if (toolId.includes('uuid-generator')) return { UUID: generated || crypto.randomUUID() }
  if (toolId.includes('random-token')) return { Token: generated || randomToken(32) }
  if (toolId.includes('coin-flip')) return { Result: generated || (Math.random() > 0.5 ? 'Heads' : 'Tails') }
  if (toolId.includes('dice-roller')) return { Result: generated || String(Math.floor(Math.random() * 6) + 1) }
  if (toolId.includes('random-picker')) {
    const items = value.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
    return { Pick: generated || (items.length ? items[Math.floor(Math.random() * items.length)] : '候補を改行またはカンマ区切りで入力してください。') }
  }

  if (toolId.includes('device-info') || toolId.includes('browser-info') || toolId.includes('user-agent-viewer')) {
    return {
      UserAgent: navigator.userAgent,
      Platform: navigator.platform,
      Language: navigator.language,
      Online: navigator.onLine ? 'online' : 'offline',
    }
  }

  if (toolId.includes('screen-info')) {
    return { Width: `${screen.width}px`, Height: `${screen.height}px`, 'Device Pixel Ratio': String(window.devicePixelRatio) }
  }

  if (toolId.includes('storage-inspector')) {
    return { LocalStorage: `${localStorage.length} keys`, SessionStorage: `${sessionStorage.length} keys` }
  }

  return {
    Input: value || '入力エリアに値を入れると、このツールのプレビューとして保持・コピーできます。',
    Implementation: '共通ツールシェル、コピー、レスポンシブ入力、検索・ルーティング連携まで実装済みです。専用アルゴリズムはこのシェルに追加して拡張できます。',
  }
}

function placeholderFor(toolId: string, name: string) {
  if (toolId.includes('bmi-calculator')) return '68 172'
  if (toolId.includes('tip-calculator')) return '5000 15 2'
  if (toolId.includes('percentage-calculator')) return '25 200'
  if (toolId.includes('age-calculator')) return '1998-04-12'
  if (toolId.includes('color')) return '#38bdf8'
  if (toolId.includes('random-picker')) return 'React, Vite, TypeScript, TailwindCSS'
  if (toolId.includes('timestamp') || toolId.includes('unix')) return String(Math.floor(Date.now() / 1000))
  return `${name} に使うテキストや数値を入力`
}

export default function GenericToolPage({ tool }: GenericToolPageProps) {
  const [input, setInput] = useState('')
  const [generated, setGenerated] = useState('')
  const results = useMemo(() => toolResults(tool.id, input, generated), [generated, input, tool.id])
  const isGenerator = /uuid-generator|random-token|coin-flip|dice-roller|random-picker/.test(tool.id)

  function regenerate() {
    if (tool.id.includes('uuid-generator')) setGenerated(crypto.randomUUID())
    else if (tool.id.includes('random-token')) setGenerated(randomToken(32))
    else if (tool.id.includes('coin-flip')) setGenerated(Math.random() > 0.5 ? 'Heads' : 'Tails')
    else if (tool.id.includes('dice-roller')) setGenerated(String(Math.floor(Math.random() * 6) + 1))
    else if (tool.id.includes('random-picker')) {
      const items = input.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
      setGenerated(items.length ? items[Math.floor(Math.random() * items.length)] : '')
    }
  }

  async function copyText(value: string) {
    if (!navigator.clipboard) return
    await navigator.clipboard.writeText(value)
  }

  return (
    <section className="glass-panel overflow-hidden p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200">
            <Sparkles size={14} /> Smart Tool
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{tool.name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">{tool.description}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">{tool.category}</div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <label className="block">
          <span className="text-sm font-semibold text-zinc-300">Input</span>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={placeholderFor(tool.id, tool.name)}
            className="mt-3 min-h-52 w-full resize-y rounded-3xl border border-white/10 bg-zinc-950/80 p-4 text-base text-white outline-none ring-sky-400/30 transition placeholder:text-zinc-500 focus:border-sky-300/60 focus:ring-4 sm:min-h-64"
          />
          {isGenerator && (
            <button
              type="button"
              onClick={regenerate}
              className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-zinc-950 hover:bg-sky-100"
            >
              {tool.id.includes('dice') ? <Dice5 size={18} /> : <RefreshCw size={18} />}
              Generate
            </button>
          )}
        </label>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-zinc-300">Output</div>
          {Object.entries(results).map(([label, value]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {label}
                <button
                  type="button"
                  onClick={() => copyText(value)}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20"
                >
                  <Copy size={13} /> Copy
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-zinc-100">{value}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
