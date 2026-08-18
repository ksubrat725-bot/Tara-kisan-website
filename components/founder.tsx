"use client"

import Image from "next/image"
import { GraduationCap, Sprout, FlaskConical, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

const content = {
  hi: {
    kicker: "संस्थापक की profile",
    heading: business.founder.hi,
    sub: "कृषि सेवा को horticulture research और स्थानीय किसानों की जरूरतों से जोड़ने का प्रयास।",
    qualLabel: "शैक्षणिक योग्यता",
    qualTitle: "M.Sc. Horticulture",
    qualSchool: "Lovely Professional University, Phagwara, Punjab",
    interestLabel: "Research interest",
    interest: "Dry flower technology, embedded drying और ornamental horticulture.",
    paperTag: "Research paper · Fourth author",
    paperTitle: "Studies on Effect of Different Substrates of Embedded Drying on Chrysanthemum",
    paperSpecies: "(Chrysanthemum morifolium Ramat.)",
    paperDesc:
      "इस अध्ययन में chrysanthemum को dry flower बनाने के लिए silica gel, borax, alum powder, river sand और sawdust जैसे drying substrates तथा temperature treatments की तुलना की गई।",
    authorsLabel: "Authors",
    authors: "Peeyoosh Kombey, Vimal Chaudhary, Rahul, ",
    authorSelf: "Subrat Kumar",
    authorSelfSuffix: " (4th author)",
    link: "Research paper देखें",
  },
  en: {
    kicker: "Founder profile",
    heading: business.founder.en,
    sub: "Bringing horticulture research together with the everyday needs of local farmers.",
    qualLabel: "Education",
    qualTitle: "M.Sc. Horticulture",
    qualSchool: "Lovely Professional University, Phagwara, Punjab",
    interestLabel: "Research interest",
    interest: "Dry flower technology, embedded drying and ornamental horticulture.",
    paperTag: "Research paper · Fourth author",
    paperTitle: "Studies on Effect of Different Substrates of Embedded Drying on Chrysanthemum",
    paperSpecies: "(Chrysanthemum morifolium Ramat.)",
    paperDesc:
      "This study compares drying substrates — silica gel, borax, alum powder, river sand and sawdust — along with temperature treatments for turning chrysanthemum into dry flowers.",
    authorsLabel: "Authors",
    authors: "Peeyoosh Kombey, Vimal Chaudhary, Rahul, ",
    authorSelf: "Subrat Kumar",
    authorSelfSuffix: " (4th author)",
    link: "View research paper",
  },
}

export function Founder() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section id="founder" className="scroll-mt-20 bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Profile card */}
          <article className="rounded-3xl bg-primary p-8 text-primary-foreground">
            <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-full border-4 border-accent">
              <Image
                src="/placeholder-user.jpg"
                alt={t.heading}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              {t.qualLabel}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold">{t.qualTitle}</h3>
            <p className="mt-1 text-sm text-primary-foreground/80">{t.qualSchool}</p>

            <div className="mt-6 border-t border-primary-foreground/15 pt-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent">
                <Sprout className="h-4 w-4" aria-hidden="true" />
                {t.interestLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{t.interest}</p>
            </div>
          </article>

          {/* Research paper card */}
          <article className="rounded-3xl border border-border bg-card p-8">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              {t.paperTag}
            </p>
            <h3 className="mt-3 text-balance font-serif text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {t.paperTitle} <em className="italic">{t.paperSpecies}</em>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.paperDesc}</p>

            <p className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.authorsLabel}: </span>
              {t.authors}
              <span className="font-semibold text-foreground">{t.authorSelf}</span>
              {t.authorSelfSuffix}
            </p>

            <a
              href="https://www.researchgate.net/publication/372189641_Studies_on_Effect_of_Different_Substrates_of_Embedded_Drying_on_Chrysanthemum_Chrysanthemum_morifolium_Ramat"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              {t.link}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
