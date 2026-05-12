const STEPS = [
  { number: 1, label: 'Accident Type' },
  { number: 2, label: 'Timing' },
  { number: 3, label: 'Your Story' },
  { number: 4, label: 'Contact Info' },
]

interface FormProgressBarProps {
  currentStep: number
}

export default function FormProgressBar({ currentStep }: FormProgressBarProps) {
  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="relative flex items-center justify-between">
        {/* Connecting line — sits behind circles */}
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 z-0" />
        <div
          className="absolute top-4 left-0 h-[2px] bg-gold z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map(({ number, label }) => {
          const completed = number < currentStep
          const active = number === currentStep

          return (
            <div key={number} className="relative z-10 flex flex-col items-center gap-2">
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  completed
                    ? 'bg-gold border-gold'
                    : active
                      ? 'bg-white border-gold shadow-[0_0_0_3px_rgba(201,168,76,0.2)]'
                      : 'bg-white border-gray-200'
                }`}
              >
                {completed ? (
                  <svg
                    className="w-4 h-4 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <span
                    className={`font-sans text-xs font-bold ${
                      active ? 'text-gold' : 'text-gray-300'
                    }`}
                  >
                    {number}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`font-sans text-[10px] uppercase tracking-wider whitespace-nowrap ${
                  active ? 'text-gold font-semibold' : completed ? 'text-navy' : 'text-gray-300'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
