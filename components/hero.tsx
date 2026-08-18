"use client"

import Image from "next/image"
import { ArrowRight, PhoneCall, Store, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

const content = {
  hi: {
    badge: "सिंहेश्वर, बिहार का किसान सेवा केंद्र",
    heading: "सही बीज, सही सलाह — हर फसल में अच्छी पैदावार",
    sub: "तारा किसान सेवा केंद्र में मिलते हैं प्रमाणित बीज, खाद, कीटनाशक और फसल की सही सलाह — बिहार के किसानों के लिए, आपकी अपनी भाषा में।",
    exploreCrops: "फसल जानकारी देखें",
    call: "कॉल करें",
    shopSoon: "दुकान जल्द खुल रही है",
    shopSoonSub: "लगभग 1 वर्ष में",
    appSoon: "मोबाइल ऐप",
    appSoonSub: "1 महीने में लाइव",
  },
  en: {
    badge: "A farmer service center in Singheshwar, Bihar",
    heading: "Right seeds, right advice — a better harvest every season",
    sub: "Tara Kisan Seva Kendra offers certified seeds, fertilizers, crop protection and trusted advisory for Bihar's farmers — in your own language.",
    exploreCrops: "Explore crops",
    call: "Call now",
    shopSoon: "Shop opening soon",
    shopSoonSub: "in about 1 year",
    appSoon: "Mobile app",
    appSoonSub: "live in 1 month",
  },
}

export function Hero() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t.badge}
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            {t.heading}
          </h1>

          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.sub}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button render={<a href="#crops" />} nativeButton={false} size="lg" className="rounded-full">
              {t.exploreCrops}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<a href={business.phoneHref} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full bg-transparent"
            >
              <PhoneCall className="h-4 w-4" />
              {t.call}
            </Button>
          </div>

          <div className="mt-10 grid w-full gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Store className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.shopSoon}</p>
                <p className="text-xs text-muted-foreground">{t.shopSoonSub}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
                <Smartphone className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.appSoon}</p>
                <p className="text-xs text-muted-foreground">{t.appSoonSub}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/hero-field.png"
              alt={lang === "hi" ? "सुनहरी शाम में बिहार के हरे-भरे खेत" : "Lush green Bihar farmland at golden hour"}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden max-w-[230px] rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="font-serif text-base font-semibold text-foreground">
              {business.founder[lang]}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {lang === "hi" ? "संस्थापक · " : "Founder · "}
              {business.phoneDisplay}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
