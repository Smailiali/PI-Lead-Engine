import { prisma } from '@/lib/prisma'
import SummaryStats from '@/components/admin/SummaryStats'
import LeadTable from '@/components/admin/LeadTable'
import type { LeadStatus, LeadSummaryStats } from '@/types/lead'

const VALID_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'signed', 'rejected']

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { webhookLogs: true } } },
  })

  // Compute summary stats
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const leadsThisWeek = leads.filter((l) => l.createdAt >= oneWeekAgo).length

  const scoredLeads = leads.filter((l) => l.aiScore !== null)
  const avgAiScore =
    scoredLeads.length > 0
      ? Math.round(
          (scoredLeads.reduce((sum, l) => sum + (l.aiScore ?? 0), 0) / scoredLeads.length) * 10,
        ) / 10
      : null

  const leadsBySource: Record<string, number> = {}
  for (const lead of leads) {
    const src = lead.utmSource ?? 'direct'
    leadsBySource[src] = (leadsBySource[src] ?? 0) + 1
  }

  const leadsByStatus = VALID_STATUSES.reduce(
    (acc, s) => {
      acc[s] = leads.filter((l) => l.status === s).length
      return acc
    },
    {} as Record<LeadStatus, number>,
  )

  const topSource =
    Object.entries(leadsBySource).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null

  const stats: LeadSummaryStats = {
    totalLeads: leads.length,
    leadsThisWeek,
    avgAiScore,
    leadsBySource,
    leadsByStatus,
    topSource,
  }

  return (
    <div className="px-6 lg:px-10 py-8 flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-sans text-2xl font-bold text-admin-text">Lead Dashboard</h1>
        <p className="font-sans text-sm text-admin-muted mt-1">
          All incoming leads with AI screening and attribution data.
        </p>
      </div>

      {/* Stats */}
      <SummaryStats stats={stats} />

      {/* Table */}
      <LeadTable leads={leads} />
    </div>
  )
}
