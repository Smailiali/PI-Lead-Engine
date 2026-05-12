import { CalendarDays, Calendar, Clock, CalendarX } from 'lucide-react'
import FormCard from '@/components/form/FormCard'
import type { LucideIcon } from 'lucide-react'

const TIMINGS: { icon: LucideIcon; title: string; value: string; description: string }[] = [
  {
    icon: CalendarDays,
    title: 'This Week',
    value: 'This week',
    description: 'Within the last 7 days',
  },
  {
    icon: Calendar,
    title: 'This Month',
    value: 'This month',
    description: 'Within the last 30 days',
  },
  {
    icon: Clock,
    title: '1 to 3 Months Ago',
    value: '1-3 months ago',
    description: 'Still within a good window',
  },
  {
    icon: CalendarX,
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
    <div className="px-8 py-7 animate-step-in">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-navy leading-snug">When did this happen?</h2>
        <p className="font-sans text-sm text-gray-400 mt-1">
          Timing affects your case. California has a 2-year statute of limitations.
        </p>
      </div>

      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
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
