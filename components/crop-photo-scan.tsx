"use client"

import { useRef, useState } from "react"
import { Camera, Upload, Loader2, ShieldAlert, CheckCircle2, ClipboardList, MapPin, RotateCcw, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { business } from "@/lib/business"

type Cause = { name: string; type: string; likelihood: "high" | "medium" | "low"; reasoning: string }
type Result = {
  imageIsCrop: boolean
  cropIdentified: string
  cropConfidence: "high" | "medium" | "low"
  visualObservations: string
  possibleCauses: Cause[]
  differentialQuestions: string[]
  safeImmediateActions: string[]
  urgency: "low" | "moderate" | "high"
  retakeNeeded: boolean
}

const copy = {
  hi: {
    kicker: "AI फसल स्कैन",
    heading: "फोटो लें, संभावित कारण जानें",
    sub: "फसल की पत्ती या तने की साफ़ फोटो लें। AI कई संभावित कारण बताएगा — पक्का निदान केंद्र पर ही होगा। कोई दवा का नाम या मात्रा यहाँ नहीं बताई जाती।",
    takePhoto: "फोटो लें",
    upload: "गैलरी से चुनें",
    analyzing: "फोटो जाँची जा रही है…",
    cropLabel: "फसल",
    causesLabel: "संभावित कारण",
    checksLabel: "खेत में यह जाँचें",
    actionsLabel: "अभी सुरक्षित रूप से यह करें",
    routeHeading: "केंद्र पर पुष्टि कराएँ",
    routeSub: "यह फोटो और सूची लेकर तारा किसान सेवा केंद्र पर आएँ या फोन करें। सही पहचान के बाद ही किसी उत्पाद की सलाह दी जाएगी।",
    call: "कॉल करें",
    retry: "दूसरी फोटो लें",
    notCrop: "यह फोटो साफ़ फसल की नहीं लग रही। कृपया पत्ती या तने की नज़दीक से, दिन की रोशनी में फोटो लें।",
    error: "फोटो जाँचने में समस्या हुई। कृपया फिर से कोशिश करें।",
    likelihoods: { high: "अधिक संभावित", medium: "संभावित", low: "कम संभावित" },
    disclaimer: "ये सिर्फ़ संभावित कारण हैं, पक्का निदान नहीं। रोग, पोषक तत्व की कमी, कीट और दवा से नुकसान — फोटो में एक जैसे दिख सकते हैं।",
  },
  en: {
    kicker: "AI crop scan",
    heading: "Take a photo, see possible causes",
    sub: "Take a clear photo of the affected leaf or stem. The AI will suggest possible causes — final confirmation happens at the center. No pesticide name or dose is ever given here.",
    takePhoto: "Take photo",
    upload: "Choose from gallery",
    analyzing: "Checking the photo…",
    cropLabel: "Crop",
    causesLabel: "Possible causes",
    checksLabel: "Check these in the field",
    actionsLabel: "Safe to do right now",
    routeHeading: "Confirm at the center",
    routeSub: "Bring this photo and checklist to Tara Kisan Seva Kendra, or call. A specific input will only be recommended after confirming the cause in person.",
    call: "Call now",
    retry: "Try another photo",
    notCrop: "That photo doesn't look like a clear crop shot. Please retake it close-up, in daylight.",
    error: "Something went wrong analyzing the photo. Please try again.",
    likelihoods: { high: "Likely", medium: "Possible", low: "Less likely" },
    disclaimer: "These are possible causes only, not a confirmed diagnosis. Disease, nutrient gaps, pests and chemical injury often look alike in a photo.",
  },
}

const urgencyColor: Record<string, string> = {
  low: "bg-primary",
  moderate: "bg-accent text-accent-foreground",
  high: "bg-destructive text-white",
}

const likelihoodColor: Record<string, string> = {
  high: "bg-primary",
  medium: "bg-accent",
  low: "bg-muted-foreground/60",
}

// Resizes and compresses the photo in the browser before upload, so large
// phone-camera images (often 3-8MB) don't hit the server's request-size limit.
function compressImage(file: File, maxDimension = 1280, quality = 0.75): Promise<{ base64: string; mediaType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > height && width > maxDimension) {
        height = Math.round((height * maxDimension) / width)
        width = maxDimension
      } else if (height > maxDimension) {
        width = Math.round((width * maxDimension) / height)
        height = maxDimension
      }
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not process the photo."))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL("image/jpeg", quality)
      resolve({ base64: dataUrl.split(",")[1], mediaType: "image/jpeg" })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Could not load the photo."))
    }
    img.src = url
  })
}

export function CropPhotoScan() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const [errorMsg, setErrorMsg] = useState("")
  const cameraRef = useRef<HTMLInputElement>(null)

  const analyze = async (file: File) => {
    setStatus("loading")
    setErrorMsg("")
    try {
      const { base64, mediaType } = await compressImage(file)
      setPreview(`data:${mediaType};base64,${base64}`)

      const res = await fetch("/api/analyze-crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType, lang }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || t.error)

      if (data.imageIsCrop === false) {
        setErrorMsg(t.notCrop)
        setStatus("error")
        return
      }
      setResult(data)
      setStatus("done")
    } catch (err: any) {
      setErrorMsg(err?.message || t.error)
      setStatus("error")
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) analyze(file)
  }

  const reset = () => {
    setStatus("idle")
    setPreview(null)
    setResult(null)
    setErrorMsg("")
  }

  return (
    <section id="scan" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t.kicker}</p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{t.sub}</p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
          {status === "idle" && (
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFile}
                className="hidden"
                id="crop-camera-input"
              />
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" id="crop-upload-input" />
              <label htmlFor="crop-camera-input">
                <Button render={<span />} nativeButton={false} size="lg" className="cursor-pointer rounded-full">
                  <Camera className="h-4 w-4" />
                  {t.takePhoto}
                </Button>
              </label>
              <label htmlFor="crop-upload-input">
                <Button render={<span />} nativeButton={false} size="lg" variant="outline" className="cursor-pointer rounded-full bg-transparent">
                  <Upload className="h-4 w-4" />
                  {t.upload}
                </Button>
              </label>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              {preview && <img src={preview} alt="" className="h-40 w-full max-w-xs rounded-2xl object-cover" />}
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
              <p className="font-medium text-foreground">{t.analyzing}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              {preview && <img src={preview} alt="" className="h-40 w-full max-w-xs rounded-2xl object-cover opacity-80" />}
              <ShieldAlert className="h-7 w-7 text-destructive" />
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{errorMsg}</p>
              <Button render={<button type="button" onClick={reset} />} nativeButton={false} className="rounded-full">
                <RotateCcw className="h-4 w-4" />
                {t.retry}
              </Button>
            </div>
          )}

          {status === "done" && result && (
            <div className="space-y-6">
              {preview && <img src={preview} alt="" className="mx-auto h-48 w-full max-w-sm rounded-2xl object-cover" />}

              <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.cropLabel}</p>
                  <p className="mt-1 font-serif text-xl font-semibold text-foreground">{result.cropIdentified}</p>
                  {result.visualObservations && (
                    <p className="mt-1 text-sm text-muted-foreground">{result.visualObservations}</p>
                  )}
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white ${urgencyColor[result.urgency]}`}>
                  {result.urgency}
                </span>
              </div>

              <div className="flex items-start gap-2 rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm leading-relaxed text-muted-foreground">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                <p>{t.disclaimer}</p>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                  {t.causesLabel}
                </h3>
                <div className="space-y-2">
                  {result.possibleCauses?.map((cause, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4">
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${likelihoodColor[cause.likelihood]}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-foreground">{cause.name}</p>
                          <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                            {t.likelihoods[cause.likelihood]}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{cause.reasoning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {result.differentialQuestions?.length > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    {t.checksLabel}
                  </h3>
                  <ul className="space-y-2 rounded-2xl border border-border bg-background p-4">
                    {result.differentialQuestions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.safeImmediateActions?.length > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {t.actionsLabel}
                  </h3>
                  <ul className="space-y-2 rounded-2xl border border-primary/25 bg-primary/5 p-4">
                    {result.safeImmediateActions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl bg-primary p-6 text-center text-primary-foreground">
                <MapPin className="mx-auto h-6 w-6 text-accent" />
                <p className="mt-2 font-serif text-lg font-semibold">{t.routeHeading}</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-primary-foreground/80">{t.routeSub}</p>
                <Button
                  render={<a href={business.phoneHref} />}
                  nativeButton={false}
                  className="mt-4 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t.call}
                </Button>
              </div>

              <Button render={<button type="button" onClick={reset} />} nativeButton={false} variant="outline" className="w-full rounded-full bg-transparent">
                <RotateCcw className="h-4 w-4" />
                {t.retry}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
