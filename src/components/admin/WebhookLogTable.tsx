'use client'

import { useState } from 'react'
import Link from 'next/link'

interface WebhookLog {
  id: string
  source: string
  eventType: string
  payload: string
  status: string
  errorMessage: string | null
  processingTime: number | null
  leadId: string | null
  createdAt: Date | string
}

interface WebhookLogTableProps {
  logs: WebhookLog[]
}

const SOURCE_STYLES: Record<string, string> = {
  form: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ghl: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  simulator: 'bg-admin-gold/10 text-admin-gold border-admin-gold/20',
}

const STATUS_STYLES: Record<string, string> = {
  received: 'text-blue-400',
  processed: 'text-amber-400',
  screened: 'text-purple-400',
  stored: 'text-admin-green',
  error: 'text-admin-red',
}

function SourceBadge({ source }: { source: string }) {
  const style = SOURCE_STYLES[source] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-semibold font-sans ${style}`}>
      {source}
    </span>
  )
}

function LogRow({ log }: { log: WebhookLog }) {
  const [expanded, setExpanded] = useState(false)
  const isError = log.status === 'error'

  const prettyPayload = (() => {
    try {
      return JSON.stringify(JSON.parse(log.payload), null, 2)
    } catch {
      return log.payload
    }
  })()

  return (
    <div className={`border-b border-admin-border/50 last:border-0 ${isError ? 'border-l-2 border-l-admin-red' : ''}`}>
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] text-left transition-colors group"
      >
        {/* Timestamp */}
        <span className="font-sans text-xs text-admin-muted w-40 flex-shrink-0">
          {new Date(log.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>

        {/* Source badge */}
        <span className="flex-shrink-0">
          <SourceBadge source={log.source} />
        </span>

        {/* Event type */}
        <span className="font-sans text-xs text-admin-muted flex-shrink-0 hidden sm:block">
          {log.eventType}
        </span>

        {/* Status */}
        <span className={`font-sans text-xs font-semibold flex-shrink-0 ${STATUS_STYLES[log.status] ?? 'text-admin-muted'}`}>
          {log.status}
        </span>

        {/* Processing time */}
        {log.processingTime != null && (
          <span className="font-sans text-xs text-admin-muted flex-shrink-0">
            {log.processingTime}ms
          </span>
        )}

        {/* Lead link */}
        {log.leadId && (
          <Link
            href={`/admin/leads/${log.leadId}`}
            onClick={(e) => e.stopPropagation()}
            className="font-sans text-xs text-admin-blue hover:underline flex-shrink-0 hidden md:block"
          >
            View Lead
          </Link>
        )}

        {/* Error message */}
        {isError && log.errorMessage && (
          <span className="font-sans text-xs text-admin-red truncate flex-1 text-right pr-2">
            {log.errorMessage}
          </span>
        )}

        {/* Expand chevron */}
        <svg
          className={`w-4 h-4 text-admin-muted ml-auto flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Expanded payload */}
      {expanded && (
        <div className="px-5 pb-4">
          {isError && log.errorMessage && (
            <div className="mb-3 rounded-lg bg-admin-red/10 border border-admin-red/20 px-4 py-2.5">
              <p className="font-sans text-xs font-semibold text-admin-red mb-0.5">Error</p>
              <p className="font-sans text-sm text-admin-red/80">{log.errorMessage}</p>
            </div>
          )}
          <pre className="bg-admin-bg rounded-xl p-4 text-xs text-admin-muted overflow-x-auto font-mono leading-relaxed max-h-96">
            {prettyPayload}
          </pre>
        </div>
      )}
    </div>
  )
}

export default function WebhookLogTable({ logs }: WebhookLogTableProps) {
  if (logs.length === 0) {
    return (
      <div className="bg-admin-card border border-admin-border rounded-xl flex flex-col items-center justify-center py-20 gap-3">
        <svg className="w-10 h-10 text-admin-border" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
        <p className="font-sans text-sm text-admin-muted">No webhook logs yet.</p>
        <p className="font-sans text-xs text-admin-muted">Use the simulator above to generate your first entry.</p>
      </div>
    )
  }

  return (
    <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="px-5 py-3 border-b border-admin-border grid grid-cols-[160px_80px_1fr_80px] gap-3">
        {['Timestamp', 'Source', 'Status', 'Time'].map((h) => (
          <span key={h} className="font-sans text-xs font-semibold text-admin-muted uppercase tracking-wider">
            {h}
          </span>
        ))}
      </div>

      <div>
        {logs.map((log) => (
          <LogRow key={log.id} log={log} />
        ))}
      </div>
    </div>
  )
}
