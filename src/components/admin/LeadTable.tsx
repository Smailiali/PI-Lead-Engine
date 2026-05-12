'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import LeadStatusBadge from '@/components/admin/LeadStatusBadge'
import type { LeadStatus } from '@/types/lead'

interface Lead {
  id: string
  firstName: string
  lastName: string
  phone: string
  accidentType: string
  aiScore: number | null
  utmSource: string | null
  utmCampaign: string | null
  status: string
  createdAt: Date | string
  _count?: { webhookLogs: number }
}

interface LeadTableProps {
  leads: Lead[]
}

type SortKey = 'createdAt' | 'aiScore'
type SortDir = 'asc' | 'desc'

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'signed', 'rejected']

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span className="text-admin-muted font-sans text-xs">N/A</span>
  const color =
    score >= 8
      ? 'bg-admin-green/10 text-admin-green border-admin-green/20'
      : score >= 5
        ? 'bg-admin-amber/10 text-admin-amber border-admin-amber/20'
        : 'bg-admin-red/10 text-admin-red border-admin-red/20'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-bold font-sans ${color}`}>
      {score}/10
    </span>
  )
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg
      className={`w-3 h-3 inline ml-1 transition-transform ${active ? 'text-admin-blue' : 'text-admin-muted'} ${active && dir === 'asc' ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

export default function LeadTable({ leads }: LeadTableProps) {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sources = useMemo(() => {
    const s = new Set(leads.map((l) => l.utmSource ?? 'direct'))
    return ['all', ...Array.from(s).sort()]
  }, [leads])

  const filtered = useMemo(() => {
    return leads
      .filter((l) => statusFilter === 'all' || l.status === statusFilter)
      .filter((l) =>
        sourceFilter === 'all'
          ? true
          : sourceFilter === 'direct'
            ? !l.utmSource
            : l.utmSource === sourceFilter,
      )
      .sort((a, b) => {
        if (sortKey === 'createdAt') {
          const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          return sortDir === 'desc' ? -diff : diff
        }
        const aScore = a.aiScore ?? -1
        const bScore = b.aiScore ?? -1
        return sortDir === 'desc' ? bScore - aScore : aScore - bScore
      })
  }, [leads, statusFilter, sourceFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-admin-card border border-admin-border text-admin-text font-sans text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-admin-blue"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-admin-card border border-admin-border text-admin-text font-sans text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-admin-blue"
        >
          {sources.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'All Sources' : s}
            </option>
          ))}
        </select>

        <span className="font-sans text-xs text-admin-muted ml-auto">
          {filtered.length} of {leads.length} leads
        </span>
      </div>

      {/* Table */}
      <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-admin-border">
                <th className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider">
                  Accident
                </th>
                <th
                  className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider cursor-pointer hover:text-admin-text select-none"
                  onClick={() => toggleSort('aiScore')}
                >
                  AI Score
                  <SortIcon active={sortKey === 'aiScore'} dir={sortDir} />
                </th>
                <th className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider">
                  Source
                </th>
                <th className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider">
                  Status
                </th>
                <th
                  className="text-left px-5 py-3 text-admin-muted font-semibold text-xs uppercase tracking-wider cursor-pointer hover:text-admin-text select-none"
                  onClick={() => toggleSort('createdAt')}
                >
                  Date
                  <SortIcon active={sortKey === 'createdAt'} dir={sortDir} />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-admin-muted">
                    No leads match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => router.push(`/admin/leads/${lead.id}`)}
                    className="border-b border-admin-border/50 last:border-0 hover:bg-white/[0.03] cursor-pointer transition-colors duration-100"
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-admin-text font-medium">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-admin-muted text-xs mt-0.5">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 text-admin-muted">{lead.accidentType}</td>
                    <td className="px-5 py-3.5">
                      <ScoreBadge score={lead.aiScore} />
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-admin-text">{lead.utmSource ?? 'Direct'}</p>
                      {lead.utmCampaign && (
                        <p className="text-admin-muted text-xs mt-0.5 truncate max-w-[120px]">
                          {lead.utmCampaign}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <LeadStatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-3.5 text-admin-muted whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
