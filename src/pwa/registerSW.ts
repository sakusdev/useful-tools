export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/useful-tools/sw.js')
      } catch (error) {
        console.error('SW registration failed', error)
      }
    })
  }
}
