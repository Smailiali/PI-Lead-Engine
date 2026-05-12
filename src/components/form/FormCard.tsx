import type { LucideIcon } from 'lucide-react'

interface FormCardProps {
  icon: LucideIcon
  title: string
  description?: string
  selected: boolean
  onClick: () => void
}

export default function FormCard({ icon: Icon, title, description, selected, onClick }: FormCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left rounded-xl border-2 p-4 flex items-start gap-3
        cursor-pointer transition-all duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
        ${
          selected
            ? 'border-gold bg-gold/5 shadow-sm'
            : 'border-gray-200 bg-white hover:border-gold/40 hover:bg-gold/[0.02]'
        }
      `}
    >
      {/* Icon */}
      <span className={`flex-shrink-0 mt-0.5 ${selected ? 'text-gold' : 'text-gray-400'}`}>
        <Icon className="w-5 h-5" />
      </span>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span
          className={`font-sans font-semibold text-sm leading-tight ${
            selected ? 'text-navy' : 'text-gray-700'
          }`}
        >
          {title}
        </span>
        {description && (
          <span className="font-sans text-xs text-gray-400 leading-relaxed">{description}</span>
        )}
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
          <svg
            className="w-3 h-3 text-navy"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      )}
    </button>
  )
}
