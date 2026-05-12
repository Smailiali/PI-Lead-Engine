import FormCard from '@/components/form/FormCard'

const TIMINGS = [
  {
    icon: '📅',
    title: 'This Week',
    value: 'This week',
    description: 'Within the last 7 days',
  },
  {
    icon: '🗓️',
    title: 'This Month',
    value: 'This month',
    description: 'Within the last 30 days',
  },
  {
    icon: '⏳',
    title: '1 to 3 Months Ago',
    value: '1-3 months ago',
    description: 'Still within a good window',
  },
  {
    icon: '🕐',
    title: 'More Than 3 Months Ago',
    value: 'More than 3 months ago',
    description: 'We can still help in many cases',
  },
]

interface StepAccidentTimingProps {
  selected: string
  onSelect: (value: string) => void
}

export default function StepAccidentTiming({ selected, onSelect }: StepAccidentTimingProps) {
  return (
    <div className="px-8 py-7">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-navy leading-snug">When did this happen?</h2>
        <p className="font-sans text-sm text-gray-400 mt-1">
          Timing affects your case. California has a 2-year statute of limitations.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TIMINGS.map(({ icon, title, value, description }) => (
          <FormCard
            key={value}
            icon={icon}
            title={title}
            description={description}
            selected={selected === value}
            onClick={() => onSelect(value)}
          />
        ))}
      </div>
    </div>
  )
}
