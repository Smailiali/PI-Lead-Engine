'use client'

import GoldButton from '@/components/shared/GoldButton'

const MIN_CHARS = 20
const MAX_CHARS = 1000

interface StepDescriptionProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export default function StepDescription({ value, onChange, onNext }: StepDescriptionProps) {
  const count = value.length
  const canProceed = count >= MIN_CHARS

  return (
    <div className="px-8 py-7">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-navy leading-snug">
          Tell us briefly what happened
        </h2>
        <p className="font-sans text-sm text-gray-400 mt-1">
          Describe the accident and any injuries. The more detail you share, the better we can assess your case.
        </p>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Describe the accident and any injuries you have experienced. Include details about how it happened, who was involved, and any medical treatment you received..."
          rows={6}
          className={`
            w-full rounded-xl border-2 px-4 py-3 font-sans text-sm text-navy
            placeholder:text-gray-300 resize-none leading-relaxed
            focus:outline-none transition-colors duration-150
            ${canProceed ? 'border-gold/60 focus:border-gold' : 'border-gray-200 focus:border-gold/40'}
          `}
        />

        {/* Character count */}
        <div className="flex items-center justify-between mt-2 px-1">
          {!canProceed && count > 0 ? (
            <p className="font-sans text-xs text-amber-500">
              {MIN_CHARS - count} more character{MIN_CHARS - count !== 1 ? 's' : ''} needed
            </p>
          ) : count === 0 ? (
            <p className="font-sans text-xs text-gray-300">Minimum {MIN_CHARS} characters</p>
          ) : (
            <p className="font-sans text-xs text-green-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Looks good
            </p>
          )}
          <span className={`font-sans text-xs ${count >= MAX_CHARS * 0.9 ? 'text-amber-500' : 'text-gray-300'}`}>
            {count} / {MAX_CHARS}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <GoldButton
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          fullWidth
        >
          Continue
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </GoldButton>
      </div>
    </div>
  )
}
