import { NextResponse } from 'next/server'
import { generateMockGHLPayload, validateGHLPayload, transformGHLToLead } from '@/lib/ghl'
import { processLead } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import type { LeadFormData, UTMParams } from '@/types/lead'

export async function POST() {
  const mockPayload = generateMockGHLPayload()

  // Run through the same validation + transform as the real webhook route
  let payload
  try {
    payload = validateGHLPayload(mockPayload)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Mock payload validation failed'
    console.error('[/api/simulate]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }

  const transformed = transformGHLToLead(payload)

  const formData: LeadFormData = {
    firstName: transformed.firstName ?? '',
    lastName: transformed.lastName ?? '',
    phone: transformed.phone ?? '',
    email: transformed.email ?? undefined,
    accidentType: transformed.accidentType ?? 'Unknown',
    accidentTiming: transformed.accidentTiming ?? 'Unknown',
    description: transformed.description ?? '',
  }

  const utmParams: UTMParams = {
    utmSource: transformed.utmSource ?? undefined,
    utmMedium: transformed.utmMedium ?? undefined,
    utmCampaign: transformed.utmCampaign ?? undefined,
    utmContent: transformed.utmContent ?? undefined,
    utmTerm: transformed.utmTerm ?? undefined,
    gclid: transformed.gclid ?? undefined,
  }

  try {
    const lead = await processLead(formData, utmParams, 'simulator')

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        ghlContactId: transformed.ghlContactId ?? null,
        ghlSource: transformed.ghlSource ?? null,
      },
    })

    return NextResponse.json({
      leadId: lead.id,
      leadName: `${lead.firstName} ${lead.lastName}`,
      aiScore: lead.aiScore,
      caseType: lead.aiCaseType,
      simulatedPayload: mockPayload,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Simulation failed'
    console.error('[/api/simulate]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
