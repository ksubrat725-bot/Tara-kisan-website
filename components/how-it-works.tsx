"use client"

import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

const content = {
  hi: {
    kicker: "कैसे काम करता है",
    heading: "बीज से बिक्री तक — आसान रास्ता",
    steps: [
      { step: "01", title: "अपने खेत की बात बताएँ", desc: "अपनी ज़मीन, फसल और लक्ष्य केंद्र पर या फोन पर बताएँ।" },
      { step: "02", title: "सही सलाह पाएँ", desc: "मिट्टी और मौसम के अनुसार बीज, खाद और बुआई की योजना मिलेगी।" },
      { step: "03", title: "मौसम भर सहयोग", desc: "बुआई से कटाई तक फसल की देखभाल और समय पर सलाह।" },
      { step: "04", title: "उचित दाम पर बिक्री", desc: "बाज़ार भाव और सरकारी योजनाओं की जानकारी के साथ बेहतर मुनाफ़ा।" },
    ],
    imgAlt: "उपजाऊ मिट्टी में हरा अंकुर पकड़े किसान के हाथ",
  },
  en: {
    kicker: "How it works",
    heading: "A simple path from seed to sale",
    steps: [
      { step: "01", title: "Tell us about your farm", desc: "Share your land, crops and goals at the center or over the phone." },
      { step: "02", title: "Get the right advice", desc: "Receive a seed, fertilizer and sowing plan matched to your soil and season." },
      { step: "03", title: "Support all season", desc: "Care and timely guidance for your crop from sowing to harvest." },
      { step: "04", title: "Sell at a fair price", desc: "Better returns with market-rate and government-scheme information." },
    ],
    imgAlt: "Farmer's hands holding a green seedling in fertile soil",
  },
}

export function HowItWorks() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-lg">
            <Image
              src="/images/soil-hands.png"
              alt={t.imgAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>

          <ol className="mt-8 space-y-6">
            {t.steps.map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="font-serif text-lg font-semibold text-accent-foreground/70 tabular-nums">
                  {item.step}
                </span>
                <div className="border-l border-border pl-4">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
