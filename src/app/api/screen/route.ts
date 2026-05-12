import { NextRequest, NextResponse } from 'next/server'
import { screenLead } from '@/lib/middleware'
import type { LeadFormData } from '@/types/lead'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as Record<string, unknown>)['accidentType'] !== 'string' ||
    typeof (body as Record<string, unknown>)['accidentTiming'] !== 'string' ||
    typeof (body as Record<string, unknown>)['description'] !== 'string'
  ) {
    return NextResponse.json(
      { error: 'Missing required fields: accidentType, accidentTiming, description' },
      { status: 400 },
    )
  }

  const formData = body as LeadFormData

  try {
    const result = await screenLead(formData)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'AI screening failed'
    console.error('[/api/screen]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
