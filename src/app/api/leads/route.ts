import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { LeadStatus, LeadSummaryStats } from '@/types/lead'

const VALID_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'signed', 'rejected']

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const status = searchParams.get('status')
  const source = searchParams.get('source')
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  // Build where clause from query params
  const where: Record<string, unknown> = {}

  if (status && VALID_STATUSES.includes(status as LeadStatus)) {
    where['status'] = status
  }

  if (source) {
    where['utmSource'] = source
  }

  if (from || to) {
    where['createdAt'] = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    }
  }

  try {
    const [leads, totalLeads] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { webhookLogs: true } },
        },
      }),
      prisma.lead.count(),
    ])

    // Summary stats — always computed across all leads (ignores filters)
    const allLeads = await prisma.lead.findMany({
      select: {
        status: true,
        utmSource: true,
        aiScore: true,
        createdAt: true,
      },
    })

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const leadsThisWeek = allLeads.filter((l) => l.createdAt >= oneWeekAgo).length

    const scoredLeads = allLeads.filter((l) => l.aiScore !== null)
    const avgAiScore =
      scoredLeads.length > 0
        ? Math.round(
            (scoredLeads.reduce((sum, l) => sum + (l.aiScore ?? 0), 0) / scoredLeads.length) * 10,
          ) / 10
        : null

    const leadsBySource: Record<string, number> = {}
    for (const lead of allLeads) {
      const src = lead.utmSource ?? 'direct'
      leadsBySource[src] = (leadsBySource[src] ?? 0) + 1
    }

    const leadsByStatus = VALID_STATUSES.reduce(
      (acc, s) => {
        acc[s] = allLeads.filter((l) => l.status === s).length
        return acc
      },
      {} as Record<LeadStatus, number>,
    )

    const topSource =
      Object.entries(leadsBySource).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null

    const stats: LeadSummaryStats = {
      totalLeads,
      leadsThisWeek,
      avgAiScore,
      leadsBySource,
      leadsByStatus,
      topSource,
    }

    return NextResponse.json({ leads, stats })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch leads'
    console.error('[/api/leads]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
