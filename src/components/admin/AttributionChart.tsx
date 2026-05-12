'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface CampaignData {
  campaign: string
  leads: number
  avgScore: number | null
}

interface SourceData {
  source: string
  leads: number
  avgScore: number | null
  strong: number
  moderate: number
  weak: number
}

interface AttributionChartProps {
  campaignData: CampaignData[]
  sourceData: SourceData[]
}

function barColor(avgScore: number | null): string {
  if (avgScore === null) return '#334155'
  if (avgScore >= 8) return '#22c55e'
  if (avgScore >= 5) return '#f59e0b'
  return '#ef4444'
}

function ScoreCell({ score }: { score: number | null }) {
  if (score === null) return <span className="text-admin-muted">N/A</span>
  const color =
    score >= 8 ? 'text-admin-green' : score >= 5 ? 'text-admin-amber' : 'text-admin-red'
  return <span className={`font-semibold ${color}`}>{score.toFixed(1)}</span>
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number; payload: CampaignData }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-admin-card border border-admin-border rounded-lg px-4 py-3 shadow-xl">
      <p className="font-sans text-xs text-admin-muted mb-1">{label}</p>
      <p className="font-sans text-sm text-admin-text font-semibold">{d.leads} leads</p>
      {d.avgScore !== null && (
        <p className="font-sans text-xs text-admin-muted mt-0.5">
          Avg score: {d.avgScore.toFixed(1)}
        </p>
      )}
    </div>
  )
}

export default function AttributionChart({ campaignData, sourceData }: AttributionChartProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Bar chart */}
      <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-admin-border">
          <p className="font-sans text-sm font-semibold text-admin-text">Leads by Campaign</p>
          <p className="font-sans text-xs text-admin-muted mt-0.5">
            Top {campaignData.length} campaigns — bar color reflects average AI score quality
          </p>
        </div>

        {campaignData.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="font-sans text-sm text-admin-muted">No campaign data yet.</p>
          </div>
        ) : (
          <div className="px-6 py-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={campaignData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="campaign"
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'var(--font-inter)' }}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  tickFormatter={(v: string) => (v.length > 14 ? v.slice(0, 13) + '…' : v)}
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'var(--font-inter)' }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="leads" radius={[4, 4, 0, 0]}>
                  {campaignData.map((entry, i) => (
                    <Cell key={i} fill={barColor(entry.avgScore)} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-4 justify-center">
              {[
                { color: 'bg-admin-green', label: 'Strong (8-10)' },
                { color: 'bg-admin-amber', label: 'Moderate (5-7)' },
                { color: 'bg-admin-red', label: 'Weak (1-4)' },
                { color: 'bg-admin-border', label: 'No score' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                  <span className="font-sans text-xs text-admin-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Source summary table */}
      <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-admin-border">
          <p className="font-sans text-sm font-semibold text-admin-text">Lead Quality by Source</p>
        </div>

        {sourceData.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="font-sans text-sm text-admin-muted">No source data yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="border-b border-admin-border">
                  {['Source', 'Leads', 'Avg Score', 'Strong', 'Moderate', 'Weak'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sourceData.map((row) => (
                  <tr key={row.source} className="border-b border-admin-border/50 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-admin-text font-medium capitalize">{row.source}</td>
                    <td className="px-5 py-3 text-admin-text">{row.leads}</td>
                    <td className="px-5 py-3">
                      <ScoreCell score={row.avgScore} />
                    </td>
                    <td className="px-5 py-3 text-admin-green">{row.strong}</td>
                    <td className="px-5 py-3 text-admin-amber">{row.moderate}</td>
                    <td className="px-5 py-3 text-admin-red">{row.weak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
