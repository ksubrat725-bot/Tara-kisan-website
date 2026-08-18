"use client"

import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const content = {
  hi: {
    kicker: "क्यों चुनें",
    heading: "किसान पहले, हर मौसम",
    sub: "तारा किसान सेवा केंद्र का मक़सद है — किसानों तक सही जानकारी, अच्छे बीज और उचित दाम पहुँचाना।",
    reasons: [
      { title: "अपनी भाषा में सलाह", desc: "हिंदी में सरल और भरोसेमंद मार्गदर्शन, किसानों की समझ के अनुसार।" },
      { title: "प्रमाणित व असली उत्पाद", desc: "सिर्फ़ भरोसेमंद कंपनियों के बीज, खाद और दवाइयाँ।" },
      { title: "उचित व पारदर्शी दाम", desc: "हर उत्पाद का सही दाम — कोई छिपा हुआ खर्च नहीं।" },
      { title: "स्थानीय सहयोग", desc: "सिंहेश्वर, बिहार में आपके पास ही, हर मौसम आपके साथ।" },
    ],
    imgAlt: "ताज़ी हरी उपज पकड़े मुस्कुराते बिहार के किसान",
  },
  en: {
    kicker: "Why choose us",
    heading: "Farmers first, every season",
    sub: "Tara Kisan Seva Kendra exists to bring the right knowledge, quality inputs and fair prices to farmers.",
    reasons: [
      { title: "Advice in your language", desc: "Simple, trustworthy guidance in Hindi, matched to how farmers think." },
      { title: "Certified, genuine products", desc: "Only seeds, fertilizers and medicines from trusted companies." },
      { title: "Fair, transparent prices", desc: "An honest price on every product — no hidden costs." },
      { title: "Local support", desc: "Right near you in Singheshwar, Bihar — with you every season." },
    ],
    imgAlt: "A smiling Bihar farmer holding fresh green produce",
  },
}

export function WhyChoose() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/80">{t.sub}</p>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.reasons.map((reason) => (
              <li key={reason.title} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="font-medium">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">{reason.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-primary-foreground/20 shadow-xl">
            <Image
              src="/images/farmer-crops.png"
              alt={t.imgAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
