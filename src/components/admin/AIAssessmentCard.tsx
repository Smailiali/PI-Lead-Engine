interface AIAssessmentCardProps {
  score: number | null
  caseType: string | null
  viability: string | null
  valueRange: string | null
  urgency: string | null
  redFlags: string | null
  recommendation: string | null
  screenedAt: Date | string | null
}

function ScoreDisplay({ score }: { score: number }) {
  const color =
    score >= 8 ? 'text-admin-green' : score >= 5 ? 'text-admin-amber' : 'text-admin-red'
  const ring =
    score >= 8
      ? 'border-admin-green/30'
      : score >= 5
        ? 'border-admin-amber/30'
        : 'border-admin-red/30'
  return (
    <div className={`w-20 h-20 rounded-full border-4 ${ring} flex flex-col items-center justify-center flex-shrink-0`}>
      <span className={`font-sans text-2xl font-bold leading-none ${color}`}>{score}</span>
      <span className="font-sans text-[10px] text-admin-muted mt-0.5">/ 10</span>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="font-sans text-xs text-admin-muted uppercase tracking-wider">{label}</p>
      <p className="font-sans text-sm text-admin-text">{value ?? 'N/A'}</p>
    </div>
  )
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const styles: Record<string, string> = {
    High: 'bg-admin-red/10 text-admin-red border-admin-red/20',
    Medium: 'bg-admin-amber/10 text-admin-amber border-admin-amber/20',
    Low: 'bg-admin-green/10 text-admin-green border-admin-green/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold font-sans ${styles[urgency] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
      {urgency} Priority
    </span>
  )
}

export default function AIAssessmentCard({
  score,
  caseType,
  viability,
  valueRange,
  urgency,
  redFlags,
  recommendation,
  screenedAt,
}: AIAssessmentCardProps) {
  const parsedRedFlags: string[] = (() => {
    if (!redFlags) return []
    try {
      return JSON.parse(redFlags) as string[]
    } catch {
      return [redFlags]
    }
  })()

  if (score === null) {
    return (
      <div className="bg-admin-card border border-admin-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 min-h-[200px]">
        <div className="w-8 h-8 rounded-full border-4 border-admin-gold border-t-transparent animate-spin" />
        <p className="font-sans text-sm text-admin-muted">AI screening pending...</p>
      </div>
    )
  }

  return (
    <div className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-admin-border flex items-center justify-between">
        <p className="font-sans text-sm font-semibold text-admin-text">AI Assessment</p>
        {screenedAt && (
          <p className="font-sans text-xs text-admin-muted">
            {new Date(screenedAt).toLocaleString('en-US', {
              month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
            })}
          </p>
        )}
      </div>

      <div className="px-6 py-5 flex flex-col gap-5">
        {/* Score + case type */}
        <div className="flex items-center gap-5">
          <ScoreDisplay score={score} />
          <div className="flex flex-col gap-1.5">
            <p className="font-sans font-semibold text-admin-text">{caseType ?? 'Unknown'}</p>
            {urgency && <UrgencyBadge urgency={urgency} />}
          </div>
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-admin-border">
          <Field label="Viability" value={viability} />
          <Field label="Value Range" value={valueRange} />
        </div>

        {/* Red flags */}
        {parsedRedFlags.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-admin-border">
            <p className="font-sans text-xs text-admin-muted uppercase tracking-wider">Red Flags</p>
            <ul className="flex flex-col gap-1.5">
              {parsedRedFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-admin-red flex-shrink-0 mt-1.5" />
                  <span className="font-sans text-sm text-admin-text">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="flex flex-col gap-2 pt-2 border-t border-admin-border">
            <p className="font-sans text-xs text-admin-muted uppercase tracking-wider">Recommendation</p>
            <p className="font-sans text-sm text-admin-text leading-relaxed">{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
