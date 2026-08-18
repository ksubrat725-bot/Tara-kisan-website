"use client"

import { Leaf, FlaskConical, Sprout, Bug, CloudSun, HandCoins } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const content = {
  hi: {
    kicker: "हमारी सेवाएँ",
    heading: "खेती की हर ज़रूरत, एक ही जगह",
    sub: "बीज से लेकर बाज़ार तक — तारा किसान सेवा केंद्र हर कदम पर किसानों के साथ है।",
    items: [
      { icon: Sprout, title: "प्रमाणित बीज", desc: "धान, गेहूँ, मक्का और सब्ज़ियों के उन्नत व प्रमाणित बीज उचित दाम पर।" },
      { icon: Leaf, title: "खाद व उर्वरक", desc: "यूरिया, डीएपी, पोटाश और जैविक खाद — सही मात्रा और सही समय की सलाह के साथ।" },
      { icon: Bug, title: "कीटनाशक व दवाइयाँ", desc: "फसल के रोग और कीटों से बचाव के लिए भरोसेमंद कीटनाशक और सलाह।" },
      { icon: FlaskConical, title: "मिट्टी जाँच सलाह", desc: "मिट्टी की सेहत के अनुसार खाद और फसल चुनने में मार्गदर्शन।" },
      { icon: CloudSun, title: "मौसम व फसल सलाह", desc: "बुआई, सिंचाई और कटाई का सही समय — आपकी फसल के अनुसार।" },
      { icon: HandCoins, title: "उचित दाम व मार्गदर्शन", desc: "सरकारी योजनाओं और बाज़ार भाव की जानकारी, आसान भाषा में।" },
    ],
  },
  en: {
    kicker: "Our services",
    heading: "Everything your farm needs, in one place",
    sub: "From seed to market — Tara Kisan Seva Kendra stands with farmers at every step.",
    items: [
      { icon: Sprout, title: "Certified Seeds", desc: "Improved, certified seeds for paddy, wheat, maize and vegetables at fair prices." },
      { icon: Leaf, title: "Fertilizers", desc: "Urea, DAP, potash and organic manure — with advice on the right dose and timing." },
      { icon: Bug, title: "Crop Protection", desc: "Trusted pesticides and guidance to protect crops from pests and disease." },
      { icon: FlaskConical, title: "Soil Test Advisory", desc: "Guidance on fertilizer and crop choice based on your soil health." },
      { icon: CloudSun, title: "Weather & Crop Advice", desc: "The right time to sow, irrigate and harvest — tailored to your crop." },
      { icon: HandCoins, title: "Fair Prices & Guidance", desc: "Government scheme and market-rate information, in simple language." },
    ],
  },
}

export function Services() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section id="services" className="scroll-mt-20 bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
