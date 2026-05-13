import { Routes, Route, Navigate } from 'react-router-dom'
import ClockPage from '@/tools/clock/ClockPage'
import StopwatchPage from '@/tools/stopwatch/StopwatchPage'
import TimerPage from '@/tools/timer/TimerPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tools/clock" replace />} />
      <Route path="/tools/clock" element={<ClockPage />} />
      <Route path="/tools/stopwatch" element={<StopwatchPage />} />
      <Route path="/tools/timer" element={<TimerPage />} />
    </Routes>
  )
}
