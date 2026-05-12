'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AIAssessmentCard from '@/components/admin/AIAssessmentCard'
import AttributionCard from '@/components/admin/AttributionCard'
import LeadStatusBadge from '@/components/admin/LeadStatusBadge'
import type { LeadStatus, WebhookLogEntry } from '@/types/lead'

interface Lead {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string | null
  accidentType: string
  accidentTiming: string
  description: string
  status: string
  aiScore: number | null
  aiCaseType: string | null
  aiViability: string | null
  aiValueRange: string | null
  aiUrgency: string | null
  aiRedFlags: string | null
  aiRecommendation: string | null
  aiScreenedAt: Date | string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  gclid: string | null
  landingPage: string | null
  referrer: string | null
  ghlContactId: string | null
  ghlSource: string | null
  createdAt: Date | string
  webhookLogs: WebhookLogEntry[]
}

const STATUS_FLOW: LeadStatus[] = ['new', 'contacted', 'qualified', 'signed', 'rejected']

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10',
  contacted: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10',
  qualified: 'border-green-500/30 text-green-400 hover:bg-green-500/10',
  signed: 'border-admin-gold/30 text-admin-gold hover:bg-admin-gold/10',
  rejected: 'border-admin-red/30 text-admin-red hover:bg-admin-red/10',
}

const WEBHOOK_STATUS_COLORS: Record<string, string> = {
  received: 'text-blue-400',
  processed: 'text-amber-400',
  screened: 'text-purple-400',
  stored: 'text-admin-green',
  error: 'text-admin-red',
}

function WebhookLogRow({ log }: { log: WebhookLogEntry }) {
  const [expanded, setExpanded] = useState(false)
  const isError = log.status === 'error'

  return (
    <div className={`border-b border-admin-border last:border-0 ${isError ? 'border-l-2 border-l-admin-red' : ''}`}>
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] text-left transition-colors"
      >
        <span className="font-sans text-xs text-admin-muted w-32 flex-shrink-0">
          {new Date(log.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })}
        </span>
        <span className="font-sans text-xs bg-admin-border px-2 py-0.5 rounded text-admin-text flex-shrink-0">
          {log.source}
        </span>
        <span className={`font-sans text-xs font-semibold flex-shrink-0 ${WEBHOOK_STATUS_COLORS[log.status] ?? 'text-admin-muted'}`}>
          {log.status}
        </span>
        {log.processingTime && (
          <span className="font-sans text-xs text-admin-muted">{log.processingTime}ms</span>
        )}
        {isError && log.errorMessage && (
          <span className="font-sans text-xs text-admin-red truncate flex-1">{log.errorMessage}</span>
        )}
        <svg
          className={`w-4 h-4 text-admin-muted ml-auto flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="px-5 pb-4">
          <pre className="bg-admin-bg rounded-lg p-4 text-xs text-admin-muted overflow-x-auto font-mono leading-relaxed">
            {JSON.stringify(JSON.parse(log.payload), null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default function LeadDetail({ lead: initialLead }: { lead: Lead }) {
  const [lead, setLead] = useState(initialLead)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()

  async function updateStatus(status: LeadStatus) {
    if (status === lead.status || updating) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        const updated = await res.json() as Lead
        setLead(updated)
        router.refresh()
      }
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="px-6 lg:px-10 py-8 flex flex-col gap-8">
      {/* Back */}
      <Link
        href="/admin"
        className="flex items-center gap-2 font-sans text-sm text-admin-muted hover:text-admin-text transition-colors w-fit"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        All Leads
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-sans text-2xl font-bold text-admin-text">
              {lead.firstName} {lead.lastName}
            </h1>
            <LeadStatusBadge status={lead.status} />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-sans text-admin-muted">
            <a href={`tel:${lead.phone}`} className="hover:text-admin-text transition-colors">
              {lead.phone}
            </a>
            {lead.email && <span>{lead.email}</span>}
            <span>
              {new Date(lead.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap text-xs font-sans">
            <span className="bg-admin-border text-admin-text px-2.5 py-1 rounded">{lead.accidentType}</span>
            <span className="bg-admin-border text-admin-muted px-2.5 py-1 rounded">{lead.accidentTiming}</span>
          </div>
        </div>

        {/* Status buttons */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FLOW.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              disabled={updating}
              className={`
                font-sans text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
                ${lead.status === s
                  ? 'opacity-100 ' + STATUS_COLORS[s] + ' bg-white/5'
                  : 'border-admin-border text-admin-muted hover:text-admin-text hover:border-admin-muted'
                }
              `}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-admin-card border border-admin-border rounded-xl px-6 py-5">
        <p className="font-sans text-xs text-admin-muted uppercase tracking-wider mb-2">Client Description</p>
        <p className="font-sans text-sm text-admin-text leading-relaxed">{lead.description}</p>
      </div>

      {/* Two-column: AI + Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIAssessmentCard
          score={lead.aiScore}
          caseType={lead.aiCaseType}
          viability={lead.aiViability}
          valueRange={lead.aiValueRange}
          urgency={lead.aiUrgency}
          redFlags={lead.aiRedFlags}
          recommendation={lead.aiRecommendation}
          screenedAt={lead.aiScreenedAt}
        />
        <AttributionCard
          utmSource={lead.utmSource}
          utmMedium={lead.utmMedium}
          utmCampaign={lead.utmCampaign}
          utmContent={lead.utmContent}
          utmTerm={lead.utmTerm}
          gclid={lead.gclid}
          landingPage={lead.landingPage}
          referrer={lead.referrer}
          ghlContactId={lead.ghlContactId}
          ghlSource={lead.ghlSource}
        />
      </div>

      {/* Webhook logs */}
      {lead.webhookLogs.length > 0 && (
        <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-admin-border">
            <p className="font-sans text-sm font-semibold text-admin-text">
              Webhook Logs
              <span className="ml-2 font-normal text-admin-muted">({lead.webhookLogs.length})</span>
            </p>
          </div>
          {lead.webhookLogs.map((log) => (
            <WebhookLogRow key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  )
}
