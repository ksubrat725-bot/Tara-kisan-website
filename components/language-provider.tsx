"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Lang = "hi" | "en"

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Hindi is the default — this is a local Bihar business.
  const [lang, setLang] = useState<Lang>("hi")

  const toggle = () => setLang((prev) => (prev === "hi" ? "en" : "hi"))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}

/**
 * Small helper: pick the value for the current language from a
 * `{ hi, en }` pair. Keeps component copy readable and colocated.
 */
export function pick<T>(lang: Lang, pair: { hi: T; en: T }): T {
  return pair[lang]
}
