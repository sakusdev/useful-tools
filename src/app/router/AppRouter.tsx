import { lazy, Suspense } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { tools } from '@/app/tools.registry'
import GenericToolPage from '@/tools/generic/GenericToolPage'

const implementedToolPages: Partial<Record<string, LazyExoticComponent<ComponentType>>> = {
  clock: lazy(() => import('@/tools/clock/ClockPage')),
  stopwatch: lazy(() => import('@/tools/stopwatch/StopwatchPage')),
  timer: lazy(() => import('@/tools/timer/TimerPage')),
  'json-formatter': lazy(() => import('@/tools/json-formatter/JsonFormatterPage')),
  'base64-encoder': lazy(() => import('@/tools/base64/Base64Page')),
  'password-generator': lazy(() => import('@/tools/password-generator/PasswordGeneratorPage')),
  'url-encoder': lazy(() => import('@/tools/url/UrlCodecPage')),
  'url-decoder': lazy(() => import('@/tools/url/UrlCodecPage')),
  'uuid-generator': lazy(() => import('@/tools/uuid/UuidGeneratorPage')),
  'hash-generator': lazy(() => import('@/tools/hash/HashGeneratorPage')),
  'sha256-generator': lazy(() => import('@/tools/hash/HashGeneratorPage')),
  'regex-tester': lazy(() => import('@/tools/regex/RegexTesterPage')),
  'text-counter': lazy(() => import('@/tools/text/TextCounterPage')),
  'case-converter': lazy(() => import('@/tools/text/CaseConverterPage')),
  'timestamp-converter': lazy(() => import('@/tools/timestamp/TimestampConverterPage')),
  'unix-time-converter': lazy(() => import('@/tools/timestamp/TimestampConverterPage')),
}

function LoadingScreen() {
  return (
    <div className="glass-panel flex min-h-[360px] items-center justify-center p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      <span className="ml-4 text-zinc-300">ツールを読み込み中...</span>
    </div>
  )
}

function ToolRoute({ toolId }: { toolId: string }) {
  const tool = tools.find((item) => item.id === toolId)

  if (!tool) return <Navigate to="/tools/clock" replace />

  const ImplementedTool = implementedToolPages[tool.id]

  if (ImplementedTool) return <ImplementedTool />

  return <GenericToolPage tool={tool} />
}

export default function AppRouter() {
  const location = useLocation()

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.99 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/tools/clock" replace />} />
            {tools.map((tool) => (
              <Route key={tool.id} path={tool.path} element={<ToolRoute toolId={tool.id} />} />
            ))}
            <Route path="*" element={<Navigate to="/tools/clock" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  )
}
