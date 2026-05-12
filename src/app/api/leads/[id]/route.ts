import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { LeadStatus } from '@/types/lead'

const VALID_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'signed', 'rejected']

// ---------------------------------------------------------------------------
// GET /api/leads/[id]
// ---------------------------------------------------------------------------

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        webhookLogs: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json(lead)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch lead'
    console.error(`[/api/leads/${id}]`, message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/leads/[id]
// ---------------------------------------------------------------------------

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Request body must be an object' }, { status: 400 })
  }

  const { status } = body as Record<string, unknown>

  if (typeof status !== 'string' || !VALID_STATUSES.includes(status as LeadStatus)) {
    return NextResponse.json(
      { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 },
    )
  }

  try {
    const existing = await prisma.lead.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: { status },
      include: {
        webhookLogs: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    return NextResponse.json(updated)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update lead'
    console.error(`[/api/leads/${id} PATCH]`, message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
