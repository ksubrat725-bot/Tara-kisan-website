"use client"

import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const copy = {
  hi: {
    kicker: "सीखें, समझें, अपनाएँ",
    heading: "ज्ञान केंद्र",
    articles: [
      {
        num: "01",
        tag: "मिट्टी की सेहत",
        title: "Soil test: खाद देने से पहले सबसे जरूरी कदम",
        desc: "मिट्टी की जांच से pH और पोषक तत्वों की जरूरत समझें—अनुमान से खाद न डालें।",
        href: "https://icar.gov.in/en/node/17260",
        linkLabel: "ICAR संदर्भ",
      },
      {
        num: "02",
        tag: "धान–गेहूँ प्रणाली",
        title: "धान के बाद गेहूँ: समय और नमी का ध्यान",
        desc: "पूर्वी भारत के लिए resource-conserving practices पर शोध और तकनीकी संसाधन देखें।",
        href: "https://icarrcer.org.in/agricultural-technologies-developed-by-icar-rcer-patna/",
        linkLabel: "ICAR RCER",
      },
      {
        num: "03",
        tag: "बिहार शोध",
        title: "मक्का के लिए सटीक पोषण प्रबंधन",
        desc: "BAU Sabour से जुड़ा शोध crop-stage आधारित nitrogen management की उपयोगिता बताता है।",
        href: "https://journaljsrr.com/index.php/JSRR/article/view/2252",
        linkLabel: "Research paper",
      },
    ],
  },
  en: {
    kicker: "Learn, understand, apply",
    heading: "Knowledge center",
    articles: [
      {
        num: "01",
        tag: "Soil health",
        title: "Soil testing: the most important step before fertilizing",
        desc: "Understand pH and nutrient needs from a soil test — don't apply fertilizer by guesswork.",
        href: "https://icar.gov.in/en/node/17260",
        linkLabel: "ICAR reference",
      },
      {
        num: "02",
        tag: "Rice-wheat system",
        title: "Wheat after paddy: watch the timing and moisture",
        desc: "Research and technical resources on resource-conserving practices for eastern India.",
        href: "https://icarrcer.org.in/agricultural-technologies-developed-by-icar-rcer-patna/",
        linkLabel: "ICAR RCER",
      },
      {
        num: "03",
        tag: "Bihar research",
        title: "Precision nutrient management for maize",
        desc: "Research from BAU Sabour on the value of crop-stage based nitrogen management.",
        href: "https://journaljsrr.com/index.php/JSRR/article/view/2252",
        linkLabel: "Research paper",
      },
    ],
  },
}

export function Knowledge() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="knowledge" className="scroll-mt-20 bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t.heading}
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t.articles.map((a) => (
            <article key={a.num} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-serif text-2xl font-semibold text-primary/40">{a.num}</span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">{a.tag}</p>
              <h3 className="mt-2 text-balance font-serif text-lg font-semibold leading-snug text-foreground">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              <a
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {a.linkLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
