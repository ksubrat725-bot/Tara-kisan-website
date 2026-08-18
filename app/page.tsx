import { LanguageProvider } from "@/components/language-provider"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { CropsCatalog } from "@/components/crops-catalog"
import { DiseaseId } from "@/components/disease-id"
import { CropPhotoScan } from "@/components/crop-photo-scan"
import { CropSearch } from "@/components/crop-search"
import { MedicineCatalog } from "@/components/medicine-catalog"
import { HowItWorks } from "@/components/how-it-works"
import { WhyChoose } from "@/components/why-choose"
import { Founder } from "@/components/founder"
import { Knowledge } from "@/components/knowledge"
import { Videos } from "@/components/videos"
import { Testimonials } from "@/components/testimonials"
import { ContactCta } from "@/components/contact-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <CropsCatalog />
        <DiseaseId />
        <CropPhotoScan />
        <CropSearch />
        <MedicineCatalog />
        <HowItWorks />
        <WhyChoose />
        <Founder />
        <Knowledge />
        <Videos />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </LanguageProvider>
  )
}
