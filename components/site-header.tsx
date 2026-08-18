"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, PhoneCall, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

const nav = {
  hi: [
    { label: "फसल जानकारी", href: "#crops" },
    { label: "रोग पहचान", href: "#diseases" },
    { label: "फोटो स्कैन", href: "#scan" },
    { label: "उत्पाद", href: "#medicines" },
    { label: "ज्ञान केंद्र", href: "#knowledge" },
    { label: "संपर्क", href: "#contact" },
  ],
  en: [
    { label: "Crops", href: "#crops" },
    { label: "Diseases", href: "#diseases" },
    { label: "Photo scan", href: "#scan" },
    { label: "Products", href: "#medicines" },
    { label: "Knowledge", href: "#knowledge" },
    { label: "Contact", href: "#contact" },
  ],
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { lang, toggle } = useLanguage()
  const links = nav[lang]

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/images/tara-kisan-logo.png"
            alt={business.name[lang]}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
              {business.name[lang]}
            </span>
            <span className="text-[11px] text-muted-foreground">{business.tagline[lang]}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
            aria-label="Switch language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {lang === "hi" ? "English" : "हिंदी"}
          </button>

          <Button
            render={<a href={business.phoneHref} />}
            nativeButton={false}
            size="sm"
            className="hidden rounded-full sm:inline-flex"
          >
            <PhoneCall className="h-4 w-4" />
            {lang === "hi" ? "कॉल करें" : "Call"}
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button
              render={<a href={business.phoneHref} onClick={() => setOpen(false)} />}
              nativeButton={false}
              className="mt-2 rounded-full"
            >
              <PhoneCall className="h-4 w-4" />
              {business.phoneDisplay}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
