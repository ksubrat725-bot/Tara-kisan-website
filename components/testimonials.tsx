"use client"

import { Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const content = {
  hi: {
    kicker: "किसानों की बात",
    heading: "किसानों का भरोसा",
    items: [
      {
        quote: "सही बीज और खाद की सलाह से इस बार धान की पैदावार पहले से काफ़ी अच्छी हुई।",
        name: "राजेश यादव",
        location: "सिंहेश्वर, मधेपुरा",
      },
      {
        quote: "सब्ज़ी में रोग लग गया था, केंद्र पर दिखाया तो सही दवा मिली और फसल बच गई।",
        name: "सुनीता देवी",
        location: "गौरीपुर, मधेपुरा",
      },
      {
        quote: "अपनी भाषा में सलाह मिलती है, इसलिए समझना आसान होता है। दाम भी सही रहते हैं।",
        name: "मोहन साह",
        location: "मधेपुरा, बिहार",
      },
    ],
  },
  en: {
    kicker: "Farmer voices",
    heading: "Trusted by farmers",
    items: [
      {
        quote: "With the right seed and fertilizer advice, my paddy yield this season was much better than before.",
        name: "Rajesh Yadav",
        location: "Singheshwar, Madhepura",
      },
      {
        quote: "My vegetables had a disease; I showed it at the center, got the right medicine and saved the crop.",
        name: "Sunita Devi",
        location: "Gouri Pur, Madhepura",
      },
      {
        quote: "I get advice in my own language, so it is easy to understand — and the prices are fair.",
        name: "Mohan Sah",
        location: "Madhepura, Bihar",
      },
    ],
  },
}

export function Testimonials() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.items.map((item) => (
            <figure key={item.name} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                {`"${item.quote}"`}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
