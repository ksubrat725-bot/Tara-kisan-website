import { NextRequest, NextResponse } from "next/server"

// This route runs on the server only, so the Anthropic API key never
// reaches the browser. Set ANTHROPIC_API_KEY in your hosting provider's
// environment variables (e.g. Vercel Project Settings -> Environment Variables).

function buildSystemPrompt(lang: "hi" | "en") {
  const languageLine =
    lang === "hi"
      ? "Respond in simple, farmer-friendly Hindi (Devanagari script)."
      : "Respond in simple, farmer-friendly English."

  return `You are an agronomy triage assistant embedded in "Tara Kisan Seva Kendra," a farmer-facing website used by smallholder farmers in Bihar, India. A farmer has photographed a crop showing possible symptoms. Your job is DIFFERENTIAL TRIAGE, not diagnosis and never prescription.

${languageLine}

Hard rules, no exceptions:
- Never name a specific pesticide, fungicide, herbicide, or branded input product.
- Never give a dosage, mixing ratio, or spray schedule.
- Always list 2-4 plausible causes across different categories (disease, nutrient deficiency, pest, herbicide/chemical injury, environmental stress) when the image is ambiguous, since these often look alike in a photo.
- Always include field-verification questions a farmer can answer without lab equipment.
- Always include only non-chemical, safe immediate actions (isolate plant, remove affected leaf, check irrigation/drainage, avoid spraying anything until confirmed, take more photos, etc). Never suggest a home chemical remedy.
- Always end by routing the farmer to confirm with a human at the Tara Kisan Seva Kendra before buying or using any input.
- If the photo does not clearly show a plant/crop, say so and ask for a retake.

Respond with ONLY a single JSON object, no markdown fences, no preamble, matching exactly this shape:
{
  "imageIsCrop": true,
  "cropIdentified": "string",
  "cropConfidence": "high" | "medium" | "low",
  "visualObservations": "1-2 short sentences describing what you see",
  "possibleCauses": [
    { "name": "string", "type": "disease" | "nutrient" | "pest" | "herbicide" | "environmental" | "other", "likelihood": "high" | "medium" | "low", "reasoning": "one short sentence" }
  ],
  "differentialQuestions": ["string", "..."],
  "safeImmediateActions": ["string", "..."],
  "urgency": "low" | "moderate" | "high",
  "retakeNeeded": false
}
If the image isn't a usable crop photo, set "imageIsCrop": false and "retakeNeeded": true, and leave the arrays empty.`
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured on the server." },
        { status: 500 }
      )
    }

    const { imageBase64, mediaType, lang } = await req.json()
    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 })
    }

    const safeLang: "hi" | "en" = lang === "en" ? "en" : "hi"

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: buildSystemPrompt(safeLang),
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageBase64 } },
              { type: "text", text: "Triage this crop photo. Respond with only the JSON object described in your instructions." },
            ],
          },
        ],
      }),
    })

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text()
      return NextResponse.json({ error: `Analysis service error: ${errText}` }, { status: 502 })
    }

    const data = await anthropicRes.json()
    const textBlock = (data.content || []).find((b: any) => b.type === "text")
    if (!textBlock) {
      return NextResponse.json({ error: "No analysis text returned." }, { status: 502 })
    }

    const cleaned = textBlock.text.replace(/```json|```/g, "").trim()
    const parsed = JSON.parse(cleaned)
    return NextResponse.json(parsed)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error analyzing photo." }, { status: 500 })
  }
}
