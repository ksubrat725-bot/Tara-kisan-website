"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"

// Registers the service worker on mount, and — when the browser signals
// the site is installable — shows a small bottom banner so farmers don't
// need to know about browser menus to install the app.
export function PwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {})
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowBanner(false)
  }

  if (!showBanner || dismissed) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 shadow-lg sm:mx-auto sm:mb-4 sm:max-w-md sm:rounded-2xl sm:border">
      <div className="flex items-center gap-3">
        <img src="/icon-192.png" alt="" className="h-10 w-10 rounded-lg" />
        <div>
          <p className="text-sm font-semibold text-foreground">तारा किसान ऐप इंस्टॉल करें</p>
          <p className="text-xs text-muted-foreground">होम स्क्रीन पर जोड़ें, बिना इंटरनेट भी खुलेगा</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={install}
          className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          इंस्टॉल करें
        </button>
        <button onClick={() => setDismissed(true)} aria-label="बंद करें" className="p-1 text-muted-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
