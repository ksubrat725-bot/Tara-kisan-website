"use client"

import { AlertTriangle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const copy = {
  hi: {
    kicker: "समय पर पहचान, बेहतर बचाव",
    heading: "रोग पहचान केंद्र",
    sub: "पहले सही बीमारी पहचानें। केवल अनुमोदित उत्पाद को उसके label और विशेषज्ञ की सलाह के अनुसार ही लगाएँ।",
    diseases: [
      { tag: "धान", title: "पत्ती झुलसा", desc: "पत्तियों पर पानी जैसे धब्बे, जो बढ़कर पीले/सूखे किनारे बना सकते हैं।" },
      { tag: "गेहूँ", title: "पीला रतुआ", desc: "पत्ती पर पीली धारियों में पाउडर जैसे फफोले; खेत की नियमित निगरानी ज़रूरी।" },
      { tag: "मक्का", title: "तना छेदक", desc: "नई पत्तियों में छेद, बीच की पत्ती में नुकसान या सूखी मध्य कोंपल जैसे संकेत।" },
    ],
    checklistTitle: "सही सलाह के लिए चार बातें",
    checklistEyebrow: "पहले यह बताइए",
    checklist: [
      "कौन-सी फसल और किस अवस्था में है?",
      "लक्षण कब से हैं और कितने खेत में हैं?",
      "पत्ते/कीट की स्पष्ट तस्वीर लें।",
      "पहले क्या दवा या खाद लगाई है?",
    ],
    noteTitle: "सुरक्षित खेती",
    note: "दवा का नाम, मात्रा और समय खेत देखकर तय होना चाहिए। दुकान पर फोटो, soil card और पिछली spray की जानकारी लाएँ।",
  },
  en: {
    kicker: "Early identification, better protection",
    heading: "Disease identification center",
    sub: "Identify the correct problem first. Use only approved products, exactly as per label and expert advice.",
    diseases: [
      { tag: "Paddy", title: "Leaf blight", desc: "Water-soaked spots on leaves that can spread into yellow or dry-edged patches." },
      { tag: "Wheat", title: "Yellow rust", desc: "Powdery, yellow-striped blisters on leaves; needs regular field monitoring." },
      { tag: "Maize", title: "Stem borer", desc: "Holes in young leaves, damage to the central shoot, or a dried-out central whorl." },
    ],
    checklistTitle: "Four things for the right advice",
    checklistEyebrow: "Tell us this first",
    checklist: [
      "Which crop, and at what growth stage?",
      "Since when, and how much of the field is affected?",
      "Take a clear photo of the leaf or pest.",
      "What fertilizer or spray was used before?",
    ],
    noteTitle: "Safe farming",
    note: "The name, dose and timing of any input should be decided after seeing the actual field. Bring photos, your soil card, and details of the last spray to the center.",
  },
}

export function DiseaseId() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="diseases" className="scroll-mt-20 bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {t.diseases.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {d.tag}
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.checklistEyebrow}</p>
            <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">{t.checklistTitle}</h3>
            <ol className="mt-4 space-y-2">
              {t.checklist.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground">
                  <span className="font-serif font-semibold text-primary">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" />
            <div>
              <p className="font-semibold text-foreground">{t.noteTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
