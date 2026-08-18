"use client"

import { ShieldPlus, CircleDot, Zap, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const copy = {
  hi: {
    kicker: "फसल सुरक्षा catalogue",
    heading: "दवा व सुरक्षा सामग्री",
    sub: "अपनी फसल और समस्या के अनुसार category चुनें। सही product, active ingredient, label dose और उपलब्धता के लिए केंद्र से सलाह लें।",
    items: [
      { icon: ShieldPlus, title: "कीटनाशी", desc: "कीट के प्रकार और crop stage की पहचान के बाद उपयुक्त विकल्प की जानकारी।" },
      { icon: CircleDot, title: "फफूंदनाशी", desc: "पत्ती धब्बा, झुलसा और अन्य fungal symptoms के लिए consultation category।" },
      { icon: Zap, title: "खरपतवार नियंत्रण", desc: "Weed type, फसल अवस्था और खेत की स्थिति के अनुसार सही सलाह।" },
      { icon: Sparkles, title: "पोषण व micronutrients", desc: "NPK, zinc, sulphur और crop nutrition के लिए soil-test based guidance।" },
    ],
    priceTag: "मूल्य: ₹0 · जल्द आ रहा है",
    noticeTitle: "महत्वपूर्ण:",
    notice: "यह online catalogue अभी preview में है। कोई दवा बिना label पढ़े, safety gear और विशेषज्ञ की सलाह के बिना न खरीदें या प्रयोग न करें। Final price और availability दुकान खुलने पर अपडेट होंगे।",
  },
  en: {
    kicker: "Crop protection catalogue",
    heading: "Medicines & protection supplies",
    sub: "Choose a category based on your crop and problem. Ask the center for the right product, active ingredient, label dose and availability.",
    items: [
      { icon: ShieldPlus, title: "Insecticides", desc: "Guidance on suitable options once the pest type and crop stage are identified." },
      { icon: CircleDot, title: "Fungicides", desc: "A consultation category for leaf spot, blight and other fungal symptoms." },
      { icon: Zap, title: "Weed control", desc: "Advice matched to weed type, crop stage and field condition." },
      { icon: Sparkles, title: "Nutrition & micronutrients", desc: "Soil-test based guidance for NPK, zinc, sulphur and crop nutrition." },
    ],
    priceTag: "Price: ₹0 · Coming soon",
    noticeTitle: "Important:",
    notice: "This online catalogue is currently a preview. Do not buy or use any input without reading the label, using safety gear, and taking expert advice. Final pricing and availability will be updated once the shop opens.",
  },
}

export function MedicineCatalog() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="medicines" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item) => (
            <div key={item.title} className="relative flex min-h-[210px] flex-col rounded-2xl border border-border bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <span className="mt-4 inline-block w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {t.priceTag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-accent bg-accent/10 p-5 text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">{t.noticeTitle}</span> {t.notice}
        </div>
      </div>
    </section>
  )
}
