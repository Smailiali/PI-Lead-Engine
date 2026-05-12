import { prisma } from '@/lib/prisma'
import AttributionChart from '@/components/admin/AttributionChart'

export const dynamic = 'force-dynamic'

export default async function AttributionPage() {
  const leads = await prisma.lead.findMany({
    select: {
      utmSource: true,
      utmCampaign: true,
      aiScore: true,
    },
  })

  // Campaign data — top 10 by lead count
  const campaignMap = new Map<string, { leads: number; totalScore: number; scoredCount: number }>()

  for (const lead of leads) {
    const key = lead.utmCampaign ?? '(direct)'
    const entry = campaignMap.get(key) ?? { leads: 0, totalScore: 0, scoredCount: 0 }
    entry.leads++
    if (lead.aiScore !== null) {
      entry.totalScore += lead.aiScore
      entry.scoredCount++
    }
    campaignMap.set(key, entry)
  }

  const campaignData = Array.from(campaignMap.entries())
    .map(([campaign, { leads, totalScore, scoredCount }]) => ({
      campaign,
      leads,
      avgScore: scoredCount > 0 ? Math.round((totalScore / scoredCount) * 10) / 10 : null,
    }))
    .sort((a, b) => b.leads - a.leads)
    .slice(0, 10)

  // Source summary data
  const sourceMap = new Map<string, { leads: number; totalScore: number; scoredCount: number; strong: number; moderate: number; weak: number }>()

  for (const lead of leads) {
    const key = lead.utmSource ?? 'direct'
    const entry = sourceMap.get(key) ?? { leads: 0, totalScore: 0, scoredCount: 0, strong: 0, moderate: 0, weak: 0 }
    entry.leads++
    if (lead.aiScore !== null) {
      entry.totalScore += lead.aiScore
      entry.scoredCount++
      if (lead.aiScore >= 8) entry.strong++
      else if (lead.aiScore >= 5) entry.moderate++
      else entry.weak++
    }
    sourceMap.set(key, entry)
  }

  const sourceData = Array.from(sourceMap.entries())
    .map(([source, { leads, totalScore, scoredCount, strong, moderate, weak }]) => ({
      source,
      leads,
      avgScore: scoredCount > 0 ? Math.round((totalScore / scoredCount) * 10) / 10 : null,
      strong,
      moderate,
      weak,
    }))
    .sort((a, b) => b.leads - a.leads)

  return (
    <div className="px-6 lg:px-10 py-8 flex flex-col gap-8">
      <div>
        <h1 className="font-sans text-2xl font-bold text-admin-text">Attribution</h1>
        <p className="font-sans text-sm text-admin-muted mt-1">
          Lead volume and quality broken down by source and campaign.
        </p>
      </div>

      <AttributionChart campaignData={campaignData} sourceData={sourceData} />
    </div>
  )
}
