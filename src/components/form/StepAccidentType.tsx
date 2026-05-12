import FormCard from '@/components/form/FormCard'

const ACCIDENT_TYPES = [
  { icon: '🚗', title: 'Car Accident', value: 'Car Accident' },
  { icon: '🚛', title: 'Truck Accident', value: 'Truck Accident' },
  { icon: '🏍️', title: 'Motorcycle Accident', value: 'Motorcycle Accident' },
  { icon: '⚠️', title: 'Slip & Fall', value: 'Slip & Fall' },
  { icon: '🕊️', title: 'Wrongful Death', value: 'Wrongful Death' },
  { icon: '❓', title: 'Other', value: 'Other' },
]

interface StepAccidentTypeProps {
  selected: string
  onSelect: (value: string) => void
}

export default function StepAccidentType({ selected, onSelect }: StepAccidentTypeProps) {
  return (
    <div className="px-8 py-7 animate-step-in">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-navy leading-snug">
          What type of accident were you in?
        </h2>
        <p className="font-sans text-sm text-gray-400 mt-1">Select the option that best describes your situation.</p>
      </div>

      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
        {ACCIDENT_TYPES.map(({ icon, title, value }) => (
          <FormCard
            key={value}
            icon={icon}
            title={title}
            selected={selected === value}
            onClick={() => onSelect(value)}
          />
        ))}
      </div>
    </div>
  )
}
