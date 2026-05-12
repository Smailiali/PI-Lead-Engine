import { NextRequest, NextResponse } from 'next/server'
import { processLead } from '@/lib/middleware'
import type { LeadFormData, UTMParams } from '@/types/lead'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Request body must be an object' }, { status: 400 })
  }

  const b = body as Record<string, unknown>

  // Validate required form fields
  const requiredFields = ['firstName', 'lastName', 'phone', 'accidentType', 'accidentTiming', 'description'] as const
  for (const field of requiredFields) {
    if (typeof b[field] !== 'string' || (b[field] as string).trim() === '') {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
    }
  }

  const formData: LeadFormData = {
    firstName: (b['firstName'] as string).trim(),
    lastName: (b['lastName'] as string).trim(),
    phone: (b['phone'] as string).trim(),
    email: typeof b['email'] === 'string' ? b['email'].trim() || undefined : undefined,
    accidentType: (b['accidentType'] as string).trim(),
    accidentTiming: (b['accidentTiming'] as string).trim(),
    description: (b['description'] as string).trim(),
  }

  const utmParams: UTMParams = {
    utmSource: typeof b['utmSource'] === 'string' ? b['utmSource'] : undefined,
    utmMedium: typeof b['utmMedium'] === 'string' ? b['utmMedium'] : undefined,
    utmCampaign: typeof b['utmCampaign'] === 'string' ? b['utmCampaign'] : undefined,
    utmContent: typeof b['utmContent'] === 'string' ? b['utmContent'] : undefined,
    utmTerm: typeof b['utmTerm'] === 'string' ? b['utmTerm'] : undefined,
    gclid: typeof b['gclid'] === 'string' ? b['gclid'] : undefined,
  }

  try {
    const lead = await processLead(formData, utmParams, 'form')

    return NextResponse.json({
      leadId: lead.id,
      screening: {
        score: lead.aiScore,
        caseType: lead.aiCaseType,
        viability: lead.aiViability,
        urgency: lead.aiUrgency,
        valueRange: lead.aiValueRange,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to process lead'
    console.error('[/api/submit]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
