"use client"

import { useState } from "react"
import { Wheat, Bean, Carrot, Apple, Droplets, Flame, Leaf } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type Crop = { hi: string; en: string }
type Category = {
  id: string
  icon: typeof Wheat
  label: { hi: string; en: string }
  crops: Crop[]
}

const categories: Category[] = [
  {
    id: "cereals",
    icon: Wheat,
    label: { hi: "अनाज", en: "Cereals" },
    crops: [
      { hi: "धान", en: "Paddy (Rice)" },
      { hi: "गेहूँ", en: "Wheat" },
      { hi: "मक्का", en: "Maize" },
      { hi: "ज्वार", en: "Sorghum" },
      { hi: "बाजरा", en: "Pearl Millet" },
      { hi: "जौ", en: "Barley" },
    ],
  },
  {
    id: "pulses",
    icon: Bean,
    label: { hi: "दालें", en: "Pulses" },
    crops: [
      { hi: "अरहर", en: "Pigeon Pea (Arhar)" },
      { hi: "चना", en: "Chickpea (Gram)" },
      { hi: "मसूर", en: "Lentil" },
      { hi: "मूँग", en: "Green Gram" },
      { hi: "उड़द", en: "Black Gram" },
      { hi: "मटर", en: "Field Pea" },
      { hi: "खेसारी", en: "Grass Pea" },
    ],
  },
  {
    id: "vegetables",
    icon: Carrot,
    label: { hi: "सब्ज़ियाँ", en: "Vegetables" },
    crops: [
      { hi: "आलू", en: "Potato" },
      { hi: "प्याज़", en: "Onion" },
      { hi: "टमाटर", en: "Tomato" },
      { hi: "बैंगन", en: "Brinjal" },
      { hi: "फूलगोभी", en: "Cauliflower" },
      { hi: "पत्तागोभी", en: "Cabbage" },
      { hi: "भिंडी", en: "Okra" },
      { hi: "लौकी", en: "Bottle Gourd" },
      { hi: "करेला", en: "Bitter Gourd" },
      { hi: "परवल", en: "Pointed Gourd" },
      { hi: "कद्दू", en: "Pumpkin" },
      { hi: "हरी मिर्च", en: "Green Chilli" },
    ],
  },
  {
    id: "fruits",
    icon: Apple,
    label: { hi: "फल", en: "Fruits" },
    crops: [
      { hi: "आम", en: "Mango" },
      { hi: "लीची", en: "Litchi" },
      { hi: "केला", en: "Banana" },
      { hi: "अमरूद", en: "Guava" },
      { hi: "पपीता", en: "Papaya" },
      { hi: "आँवला", en: "Amla" },
      { hi: "बेर", en: "Ber" },
      { hi: "मखाना", en: "Makhana (Foxnut)" },
    ],
  },
  {
    id: "oilseeds",
    icon: Droplets,
    label: { hi: "तेलहन", en: "Oilseeds" },
    crops: [
      { hi: "सरसों", en: "Mustard" },
      { hi: "तिल", en: "Sesame" },
      { hi: "सूरजमुखी", en: "Sunflower" },
      { hi: "अलसी", en: "Linseed" },
      { hi: "मूँगफली", en: "Groundnut" },
    ],
  },
  {
    id: "spices",
    icon: Flame,
    label: { hi: "मसाले", en: "Spices" },
    crops: [
      { hi: "हल्दी", en: "Turmeric" },
      { hi: "अदरक", en: "Ginger" },
      { hi: "लहसुन", en: "Garlic" },
      { hi: "धनिया", en: "Coriander" },
      { hi: "जीरा", en: "Cumin" },
      { hi: "मेथी", en: "Fenugreek" },
      { hi: "लाल मिर्च", en: "Red Chilli" },
    ],
  },
  {
    id: "fodder",
    icon: Leaf,
    label: { hi: "चारा", en: "Fodder" },
    crops: [
      { hi: "बरसीम", en: "Berseem" },
      { hi: "ज्वार चारा", en: "Sorghum Fodder" },
      { hi: "मक्का चारा", en: "Maize Fodder" },
      { hi: "नेपियर घास", en: "Napier Grass" },
    ],
  },
]

const copy = {
  hi: {
    kicker: "फसल जानकारी",
    heading: "बिहार में उगाई जाने वाली मुख्य फसलें",
    sub: "श्रेणी चुनें और उससे जुड़ी फसलों की सूची देखें। इन सभी के लिए बीज, खाद और सलाह केंद्र पर उपलब्ध होगी।",
    all: "सभी",
  },
  en: {
    kicker: "Crop information",
    heading: "Main crops grown across Bihar",
    sub: "Pick a category to see its crops. Seeds, inputs and advice for all of these will be available at the center.",
    all: "All",
  },
}

export function CropsCatalog() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [active, setActive] = useState<string>("all")

  const shown = active === "all" ? categories : categories.filter((c) => c.id === active)

  return (
    <section id="crops" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={t.kicker}>
          <button
            type="button"
            role="tab"
            aria-selected={active === "all"}
            onClick={() => setActive("all")}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.all}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => setActive(cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {cat.label[lang]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((cat) => (
            <div key={cat.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <cat.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground">{cat.label[lang]}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.crops.map((crop) => (
                  <li
                    key={crop.en}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                  >
                    {crop[lang]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
