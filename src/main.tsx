import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { registerSW } from '@/pwa/registerSW'

registerSW()

const redirect = sessionStorage.getItem('redirect-path')

if (redirect) {
  sessionStorage.removeItem('redirect-path')
  window.history.replaceState(null, '', `/useful-tools${redirect}`)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/useful-tools">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
