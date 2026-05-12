import type { LeadSummaryStats } from '@/types/lead'

interface SummaryStatsProps {
  stats: LeadSummaryStats
}

function scoreColor(score: number | null) {
  if (score === null) return 'text-admin-muted'
  if (score >= 8) return 'text-admin-green'
  if (score >= 5) return 'text-admin-amber'
  return 'text-admin-red'
}

export default function SummaryStats({ stats }: SummaryStatsProps) {
  const cards = [
    {
      label: 'Total Leads',
      value: stats.totalLeads.toString(),
      sub: 'all time',
      valueClass: 'text-admin-text',
    },
    {
      label: 'Leads This Week',
      value: stats.leadsThisWeek.toString(),
      sub: 'last 7 days',
      valueClass: 'text-admin-text',
    },
    {
      label: 'Avg AI Score',
      value: stats.avgAiScore !== null ? `${stats.avgAiScore}/10` : 'N/A',
      sub: 'across all leads',
      valueClass: scoreColor(stats.avgAiScore),
    },
    {
      label: 'Top Source',
      value: stats.topSource ?? 'Direct',
      sub: stats.topSource
        ? `${stats.leadsBySource[stats.topSource] ?? 0} leads`
        : 'no tracked source',
      valueClass: 'text-admin-text',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, valueClass }) => (
        <div
          key={label}
          className="bg-admin-card border border-admin-border rounded-xl px-5 py-5 flex flex-col gap-1"
        >
          <p className="font-sans text-xs text-admin-muted uppercase tracking-wider">{label}</p>
          <p className={`font-sans text-2xl font-bold truncate ${valueClass}`}>{value}</p>
          <p className="font-sans text-xs text-admin-muted">{sub}</p>
        </div>
      ))}
    </div>
  )
}
