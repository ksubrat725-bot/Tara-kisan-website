"use client"

import Image from "next/image"
import { Play } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const copy = {
  hi: {
    kicker: "किसान वीडियो केंद्र",
    heading: "खेत से सीधे आपके मोबाइल तक",
    videoEyebrow: "बिहार कृषि video",
    videoTitle: "Integrated Farming System — ICAR RCER, Patna",
    videoDesc: "पूर्वी भारत के किसानों के लिए farm resources को जोड़ने और on-farm recycling पर ICAR RCER Patna का educational video.",
    videoLink: "YouTube पर देखें",
    stories: [
      {
        img: "/images/soil-hands.png",
        title: "फोटो स्कैन करके समस्या समझें",
        desc: "किसान साफ़ फोटो लेकर फसल की समस्या की पहचान के लिए जानकारी भेज सकते हैं।",
        status: "Video coming soon",
      },
      {
        img: "/images/farmer-crops.png",
        title: "किसान की समस्या, सही सलाह",
        desc: "रोग के लक्षण, फसल की अवस्था और सुरक्षित सलाह पर farmer-focused video story.",
        status: "Video coming soon",
      },
    ],
  },
  en: {
    kicker: "Farmer video center",
    heading: "Straight from the field to your phone",
    videoEyebrow: "Bihar agriculture video",
    videoTitle: "Integrated Farming System — ICAR RCER, Patna",
    videoDesc: "An educational video by ICAR RCER Patna on connecting farm resources and on-farm recycling for farmers in eastern India.",
    videoLink: "Watch on YouTube",
    stories: [
      {
        img: "/images/soil-hands.png",
        title: "Scan a photo to understand the problem",
        desc: "Farmers can take a clear photo and send it in to help identify a crop problem.",
        status: "Video coming soon",
      },
      {
        img: "/images/farmer-crops.png",
        title: "A farmer's problem, the right advice",
        desc: "A farmer-focused video story on symptoms, crop stage and safe advice.",
        status: "Video coming soon",
      },
    ],
  },
}

export function Videos() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="videos" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t.heading}
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-primary lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="aspect-video w-full lg:aspect-auto">
              <iframe
                src="https://www.youtube.com/embed/KGAynYmsSY0?rel=0"
                title="ICAR RCER Patna integrated farming system video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full min-h-[240px] w-full border-0"
              />
            </div>
            <div className="flex flex-col justify-center p-8 text-primary-foreground">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{t.videoEyebrow}</p>
              <h3 className="mt-2 font-serif text-xl font-semibold leading-snug sm:text-2xl">{t.videoTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{t.videoDesc}</p>
              <a
                href="https://www.youtube.com/watch?v=KGAynYmsSY0"
                target="_blank"
                rel="noreferrer"
                className="mt-5 w-fit text-sm font-medium text-accent hover:underline"
              >
                {t.videoLink} ↗
              </a>
            </div>
          </div>

          {t.stories.map((s) => (
            <article key={s.title} className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative aspect-video w-full bg-primary/20">
                <Image src={s.img} alt={s.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {s.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
