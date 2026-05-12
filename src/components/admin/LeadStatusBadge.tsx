import type { LeadStatus } from '@/types/lead'

const STYLES: Record<LeadStatus, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  qualified: 'bg-green-500/10 text-green-400 border-green-500/20',
  signed: 'bg-admin-gold/10 text-admin-gold border-admin-gold/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  signed: 'Signed',
  rejected: 'Rejected',
}

interface LeadStatusBadgeProps {
  status: string
}

export default function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const s = status as LeadStatus
  const style = STYLES[s] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  const label = LABELS[s] ?? status

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold font-sans ${style}`}
    >
      {label}
    </span>
  )
}
