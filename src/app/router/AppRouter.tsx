import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const ClockPage = lazy(() => import('@/tools/clock/ClockPage'))
const StopwatchPage = lazy(() => import('@/tools/stopwatch/StopwatchPage'))
const TimerPage = lazy(() => import('@/tools/timer/TimerPage'))

function LoadingScreen() {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="text-zinc-400">Loading tool...</div>
    </div>
  )
}

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Navigate to="/tools/clock" replace />} />

        <Route path="/tools/clock" element={<ClockPage />} />

        <Route
          path="/tools/stopwatch"
          element={<StopwatchPage />}
        />

        <Route path="/tools/timer" element={<TimerPage />} />
      </Routes>
    </Suspense>
  )
}
