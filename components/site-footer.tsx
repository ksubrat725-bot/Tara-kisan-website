"use client"

import Image from "next/image"
import { PhoneCall, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

const copy = {
  hi: {
    about: "बिहार के किसानों के लिए सही बीज, खाद और भरोसेमंद फसल सलाह — आपकी अपनी भाषा में।",
    quick: "त्वरित लिंक",
    links: [
      { label: "सेवाएँ", href: "#services" },
      { label: "फसल जानकारी", href: "#crops" },
      { label: "सवाल खोजें", href: "#ask" },
      { label: "संपर्क", href: "#contact" },
    ],
    contact: "संपर्क",
    rights: "सर्वाधिकार सुरक्षित।",
  },
  en: {
    about: "Right seeds, inputs and trusted crop advice for Bihar's farmers — in your own language.",
    quick: "Quick links",
    links: [
      { label: "Services", href: "#services" },
      { label: "Crops", href: "#crops" },
      { label: "Ask", href: "#ask" },
      { label: "Contact", href: "#contact" },
    ],
    contact: "Contact",
    rights: "All rights reserved.",
  },
}

export function SiteFooter() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/tara-kisan-logo.png"
                alt={business.name[lang]}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-contain"
              />
              <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
                {business.name[lang]}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.about}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {business.founderLabel[lang]}: <span className="text-foreground">{business.founder[lang]}</span>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.quick}</h3>
            <ul className="mt-4 space-y-2.5">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">{t.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{business.address[lang]}</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={business.phoneHref} className="hover:text-foreground">
                  {business.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {business.name[lang]}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
