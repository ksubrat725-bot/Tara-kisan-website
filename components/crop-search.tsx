"use client"

import { useMemo, useState } from "react"
import { Search, MessageCircleQuestion, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

type QA = {
  keywords: string
  q: { hi: string; en: string }
  a: { hi: string; en: string }
}

const faqs: QA[] = [
  {
    keywords: "धान paddy rice pani sinchai धान की खेती rice",
    q: { hi: "धान की बुआई का सही समय क्या है?", en: "What is the right time to sow paddy?" },
    a: {
      hi: "बिहार में धान की नर्सरी जून के मध्य और रोपाई जुलाई तक करें। खेत में 2–5 सेमी पानी बनाए रखें और प्रमाणित बीज ही बोएँ।",
      en: "In Bihar, raise the paddy nursery by mid-June and transplant by July. Keep 2–5 cm of standing water and use only certified seed.",
    },
  },
  {
    keywords: "गेहूँ wheat gehu बुआई rabi",
    q: { hi: "गेहूँ की बुआई कब और कैसे करें?", en: "When and how should wheat be sown?" },
    a: {
      hi: "गेहूँ की बुआई नवंबर के पहले पखवाड़े में सबसे अच्छी होती है। प्रति एकड़ 40–50 किग्रा बीज और बुआई के समय डीएपी का प्रयोग करें।",
      en: "Wheat is best sown in the first fortnight of November. Use 40–50 kg seed per acre and apply DAP at sowing.",
    },
  },
  {
    keywords: "मक्का maize makka corn",
    q: { hi: "मक्का में कितनी खाद डालें?", en: "How much fertilizer does maize need?" },
    a: {
      hi: "मक्का के लिए प्रति एकड़ लगभग 50 किग्रा यूरिया, 25 किग्रा डीएपी और 15 किग्रा पोटाश — तीन बार में देना अच्छा रहता है।",
      en: "For maize, apply roughly 50 kg urea, 25 kg DAP and 15 kg potash per acre, split across three doses.",
    },
  },
  {
    keywords: "खाद खाद उर्वरक fertilizer urea dap potash khad",
    q: { hi: "यूरिया और डीएपी में क्या अंतर है?", en: "What is the difference between urea and DAP?" },
    a: {
      hi: "यूरिया मुख्य रूप से नाइट्रोजन देता है (पत्तियों की बढ़वार), जबकि डीएपी नाइट्रोजन के साथ फॉस्फोरस देता है (जड़ों की मज़बूती)। बुआई पर डीएपी, बाद में यूरिया।",
      en: "Urea mainly supplies nitrogen (leaf growth), while DAP supplies nitrogen plus phosphorus (root strength). Use DAP at sowing and urea later.",
    },
  },
  {
    keywords: "रोग disease कीट pest keet bimari fungus इल्ली",
    q: { hi: "फसल में रोग या कीट लगने पर क्या करें?", en: "What to do if crops get pests or disease?" },
    a: {
      hi: "पहले प्रभावित पत्ती/तना केंद्र पर दिखाएँ या फोटो भेजें। सही पहचान के बाद ही दवा दें — गलत छिड़काव से नुकसान और खर्च दोनों बढ़ते हैं।",
      en: "First show the affected leaf/stem at the center or send a photo. Spray only after correct identification — wrong spraying increases both damage and cost.",
    },
  },
  {
    keywords: "सब्ज़ी vegetable sabzi tamatar aalu टमाटर आलू",
    q: { hi: "सब्ज़ियों की अच्छी पैदावार के लिए क्या ज़रूरी है?", en: "What helps get a good vegetable yield?" },
    a: {
      hi: "अच्छी जल निकासी, गोबर की सड़ी खाद, प्रमाणित बीज/पौध और समय पर हल्की सिंचाई ज़रूरी है। नर्सरी से रोपाई करने पर पौधे मज़बूत रहते हैं।",
      en: "Good drainage, well-rotted farmyard manure, certified seed/seedlings and timely light irrigation are key. Transplanting from a nursery keeps plants sturdy.",
    },
  },
  {
    keywords: "मिट्टी soil jaanch mitti test",
    q: { hi: "मिट्टी की जाँच क्यों ज़रूरी है?", en: "Why is soil testing important?" },
    a: {
      hi: "मिट्टी जाँच से पता चलता है कि आपकी ज़मीन में कौन-सा पोषक तत्व कम है। इससे आप सिर्फ़ ज़रूरी खाद पर पैसा लगाते हैं और पैदावार बढ़ती है।",
      en: "A soil test shows which nutrients your land lacks, so you spend only on the fertilizer you need and improve your yield.",
    },
  },
  {
    keywords: "मखाना makhana लीची litchi आम mango fruit",
    q: { hi: "बिहार में मखाना और लीची के लिए क्या सलाह है?", en: "Any advice for makhana and litchi in Bihar?" },
    a: {
      hi: "मखाना के लिए 4–6 फुट गहरा ठहरा पानी और लीची के लिए अच्छी जल निकासी वाली दोमट मिट्टी उपयुक्त है। मौसम के अनुसार सलाह केंद्र पर लें।",
      en: "Makhana needs 4–6 ft of standing water, while litchi prefers well-drained loamy soil. Get season-wise guidance at the center.",
    },
  },
]

const copy = {
  hi: {
    kicker: "किसान सवाल-जवाब",
    heading: "अपनी फसल का सवाल यहाँ खोजें",
    sub: "धान, गेहूँ, मक्का, सब्ज़ी, खाद या रोग — जो भी पूछना है, नीचे लिखें।",
    placeholder: "जैसे: धान, खाद, रोग…",
    noResult: "इस सवाल का जवाब यहाँ नहीं मिला। सीधे केंद्र पर पूछें:",
    callBtn: "सलाह के लिए कॉल करें",
    resultsFor: "परिणाम:",
  },
  en: {
    kicker: "Farmer Q&A",
    heading: "Search your crop question here",
    sub: "Paddy, wheat, maize, vegetables, fertilizer or disease — type whatever you need to ask.",
    placeholder: "e.g. paddy, fertilizer, disease…",
    noResult: "No answer found here. Ask the center directly:",
    callBtn: "Call for advice",
    resultsFor: "Results:",
  },
}

export function CropSearch() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter((item) => {
      const haystack = `${item.keywords} ${item.q.hi} ${item.q.en} ${item.a.hi} ${item.a.en}`.toLowerCase()
      return q.split(/\s+/).some((word) => haystack.includes(word))
    })
  }, [query])

  return (
    <section id="ask" className="scroll-mt-20 bg-secondary/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {t.sub}
          </p>
        </div>

        <div className="relative mt-8">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.heading}
            className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-8 space-y-3">
          {results.length > 0 ? (
            results.map((item) => (
              <details
                key={item.q.en}
                className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-start gap-3 font-medium text-foreground">
                  <MessageCircleQuestion className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="flex-1">{item.q[lang]}</span>
                </summary>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-muted-foreground">{item.a[lang]}</p>
              </details>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-muted-foreground">{t.noResult}</p>
              <Button
                render={<a href={business.phoneHref} />}
                nativeButton={false}
                className="mt-4 rounded-full"
              >
                <PhoneCall className="h-4 w-4" />
                {business.phoneDisplay}
              </Button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.callBtn}:{" "}
          <a href={business.phoneHref} className="font-medium text-primary hover:underline">
            {business.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  )
}
