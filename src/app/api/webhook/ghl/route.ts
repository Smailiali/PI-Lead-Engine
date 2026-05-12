import { NextRequest, NextResponse } from 'next/server'
import { validateGHLPayload, transformGHLToLead } from '@/lib/ghl'
import { processLead } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'
import type { LeadFormData, UTMParams } from '@/types/lead'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Validate the GHL payload shape
  let payload
  try {
    payload = validateGHLPayload(body)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid GHL payload'
    console.error('[/api/webhook/ghl] Validation error:', message)

    // Log the failed webhook even on validation error
    await prisma.webhookLog.create({
      data: {
        source: 'ghl',
        eventType: 'ContactCreate',
        payload: JSON.stringify(body),
        status: 'error',
        errorMessage: message,
      },
    })

    return NextResponse.json({ error: message }, { status: 400 })
  }

  // Transform GHL fields to our Lead shape
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
    const lead = await processLead(formData, utmParams, 'ghl')

    // Store GHL-specific fields on the lead
    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        ghlContactId: transformed.ghlContactId ?? null,
        ghlSource: transformed.ghlSource ?? null,
      },
    })

    return NextResponse.json({ leadId: lead.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to process GHL webhook'
    console.error('[/api/webhook/ghl]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
