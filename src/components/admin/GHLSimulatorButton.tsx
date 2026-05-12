'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SimulateResult {
  leadId: string
  leadName: string
  aiScore: number | null
  caseType: string | null
  error?: string
}

interface ToastState {
  leadName: string
  aiScore: number | null
  caseType: string | null
}

export default function GHLSimulatorButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function runSimulation() {
    if (loading) return
    setLoading(true)
    setError(null)
    setToast(null)

    try {
      const res = await fetch('/api/simulate', { method: 'POST' })
      const data = (await res.json()) as SimulateResult

      if (!res.ok || data.error) {
        throw new Error(data.error ?? 'Simulation failed')
      }

      setToast({
        leadName: data.leadName,
        aiScore: data.aiScore,
        caseType: data.caseType,
      })

      // Refresh server component data so new logs appear
      router.refresh()

      // Auto-dismiss toast after 5s
      setTimeout(() => setToast(null), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed')
    } finally {
      setLoading(false)
    }
  }

  const scoreColor =
    toast?.aiScore != null
      ? toast.aiScore >= 8
        ? 'text-admin-green'
        : toast.aiScore >= 5
          ? 'text-admin-amber'
          : 'text-admin-red'
      : 'text-admin-muted'

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={runSimulation}
        disabled={loading}
        className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-admin-gold text-admin-bg font-sans font-bold text-sm hover:bg-yellow-400 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Simulating...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
            </svg>
            Simulate GHL Webhook
          </>
        )}
      </button>

      {/* Success toast */}
      {toast && (
        <div className="flex items-start gap-3 bg-admin-card border border-admin-green/30 rounded-xl px-4 py-3 animate-slide-in">
          <div className="w-2 h-2 rounded-full bg-admin-green flex-shrink-0 mt-1.5" />
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="font-sans text-sm font-semibold text-admin-text">
              Lead created: {toast.leadName}
            </p>
            <p className="font-sans text-xs text-admin-muted">
              {toast.caseType ?? 'Unknown case type'}
              {toast.aiScore != null && (
                <> &bull; Score: <span className={scoreColor}>{toast.aiScore}/10</span></>
              )}
            </p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="ml-auto flex-shrink-0 text-admin-muted hover:text-admin-text transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-admin-red/10 border border-admin-red/20 rounded-xl px-4 py-3">
          <p className="font-sans text-sm text-admin-red">{error}</p>
        </div>
      )}
    </div>
  )
}
