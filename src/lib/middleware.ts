import { prisma } from '@/lib/prisma'
import { callClaude } from '@/lib/anthropic'
import type { LeadFormData, UTMParams } from '@/types/lead'
import type { AIScreeningResult } from '@/types/screening'
import type { Lead } from '@prisma/client'

// ---------------------------------------------------------------------------
// AI Screening prompt and logic
// ---------------------------------------------------------------------------

const SCREENING_SYSTEM_PROMPT = `You are an experienced personal injury case intake specialist at a law firm. Given the following case details submitted by a potential client, evaluate the case and provide a structured assessment. Be realistic and practical. Not every case is strong. Respond ONLY in JSON with no markdown or preamble.

Score guidelines:
- 8-10: Strong case, clear liability, documented injuries, recent accident
- 5-7: Moderate case, needs more information, some concerns
- 1-4: Weak case, statute of limitations issues, no clear liability, minor or no injuries

Value range guidelines:
- Minor soft tissue, short treatment: $10K-$50K
- Moderate injuries, some treatment: $50K-$150K
- Serious injuries, surgery, long recovery: $150K-$500K
- Catastrophic, permanent disability, wrongful death: $500K+

Return a JSON object with exactly these fields:
{
  "score": <number 1-10>,
  "caseType": <string, e.g. "Motor Vehicle Accident">,
  "viability": <"Strong" | "Moderate" | "Weak">,
  "valueRange": <string, e.g. "$50K-$150K">,
  "urgency": <"High" | "Medium" | "Low">,
  "redFlags": <string[]>,
  "recommendation": <string>
}`

export async function screenLead(formData: LeadFormData): Promise<AIScreeningResult> {
  const userMessage = `
Accident Type: ${formData.accidentType}
When it happened: ${formData.accidentTiming}
Client description: ${formData.description}
`.trim()

  return callClaude<AIScreeningResult>(SCREENING_SYSTEM_PROMPT, userMessage)
}

// ---------------------------------------------------------------------------
// Main lead processing pipeline
// ---------------------------------------------------------------------------

export async function processLead(
  formData: LeadFormData,
  utmParams: UTMParams,
  source: string,
): Promise<Lead> {
  const startTime = Date.now()

  // Step 1: Create WebhookLog with status "received"
  const webhookLog = await prisma.webhookLog.create({
    data: {
      source,
      eventType: source === 'ghl' ? 'ContactCreate' : 'FormSubmission',
      payload: JSON.stringify({ formData, utmParams }),
      status: 'received',
    },
  })

  let lead: Lead | null = null

  try {
    // Step 2: Create the Lead
    lead = await prisma.lead.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email ?? null,
        accidentType: formData.accidentType,
        accidentTiming: formData.accidentTiming,
        description: formData.description,
        utmSource: utmParams.utmSource ?? null,
        utmMedium: utmParams.utmMedium ?? null,
        utmCampaign: utmParams.utmCampaign ?? null,
        utmContent: utmParams.utmContent ?? null,
        utmTerm: utmParams.utmTerm ?? null,
        gclid: utmParams.gclid ?? null,
      },
    })

    // Step 3: Update WebhookLog to "processed" and link to lead
    await prisma.webhookLog.update({
      where: { id: webhookLog.id },
      data: {
        status: 'processed',
        leadId: lead.id,
        payload: JSON.stringify({ formData, utmParams, leadId: lead.id }),
      },
    })

    // Step 4: Run AI screening
    const screening = await screenLead(formData)

    // Step 5: Update Lead with AI screening results
    lead = await prisma.lead.update({
      where: { id: lead.id },
      data: {
        aiScore: screening.score,
        aiCaseType: screening.caseType,
        aiViability: screening.viability,
        aiValueRange: screening.valueRange,
        aiUrgency: screening.urgency,
        aiRedFlags: JSON.stringify(screening.redFlags),
        aiRecommendation: screening.recommendation,
        aiScreenedAt: new Date(),
      },
    })

    // Step 6: Update WebhookLog to "screened" then "stored"
    await prisma.webhookLog.update({
      where: { id: webhookLog.id },
      data: { status: 'screened' },
    })

    await prisma.webhookLog.update({
      where: { id: webhookLog.id },
      data: {
        status: 'stored',
        processingTime: Date.now() - startTime,
      },
    })

    return lead
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)

    // On any failure: log error to WebhookLog
    await prisma.webhookLog.update({
      where: { id: webhookLog.id },
      data: {
        status: 'error',
        errorMessage,
        processingTime: Date.now() - startTime,
        ...(lead ? { leadId: lead.id } : {}),
      },
    })

    throw err
  }
}
