"use client"

import { Button } from "@/components/ui/button"
import { PhoneCall, MapPin, Clock, User, MessageCircle, Navigation } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

const copy = {
  hi: {
    kicker: "संपर्क करें",
    heading: "किसी भी फसल सलाह के लिए हमसे जुड़ें",
    sub: "फोन करें, WhatsApp पर संदेश भेजें या सीधे केंद्र पर आएँ।",
    call: "कॉल करें",
    whatsapp: "WhatsApp",
    directions: "Google Maps पर रास्ता देखें",
    founder: "संस्थापक",
    phone: "फोन",
    address: "पता",
    hours: "समय",
  },
  en: {
    kicker: "Contact us",
    heading: "Reach out for any crop advice",
    sub: "Call us, message on WhatsApp, or visit the center directly.",
    call: "Call now",
    whatsapp: "WhatsApp",
    directions: "Get directions on Google Maps",
    founder: "Founder",
    phone: "Phone",
    address: "Address",
    hours: "Hours",
  },
}

export function ContactCta() {
  const { lang } = useLanguage()
  const t = copy[lang]

  const details = [
    { icon: User, label: t.founder, value: business.founder[lang] },
    { icon: PhoneCall, label: t.phone, value: business.phoneDisplay, href: business.phoneHref },
    { icon: MapPin, label: t.address, value: business.address[lang] },
    { icon: Clock, label: t.hours, value: business.hours[lang] },
  ]

  return (
    <section id="contact" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-secondary/60 px-6 py-12 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t.heading}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button render={<a href={business.phoneHref} />} nativeButton={false} size="lg" className="rounded-full">
                  <PhoneCall className="h-4 w-4" />
                  {t.call}
                </Button>
                <Button
                  render={<a href={business.whatsappHref} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-transparent"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.whatsapp}
                </Button>
              </div>

              <a
                href={business.mapsDir}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                {t.directions}
              </a>
            </div>

            <dl className="grid gap-4 sm:grid-cols-2">
              {details.map((d) => (
                <div key={d.label} className="rounded-2xl border border-border bg-card p-5">
                  <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <d.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    {d.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground">
                    {d.href ? (
                      <a href={d.href} className="hover:text-primary">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
