import { Car, Truck, Bike, AlertTriangle, HeartCrack, HelpCircle } from 'lucide-react'
import FormCard from '@/components/form/FormCard'
import type { LucideIcon } from 'lucide-react'

const ACCIDENT_TYPES: { icon: LucideIcon; title: string; value: string }[] = [
  { icon: Car, title: 'Car Accident', value: 'Car Accident' },
  { icon: Truck, title: 'Truck Accident', value: 'Truck Accident' },
  { icon: Bike, title: 'Motorcycle Accident', value: 'Motorcycle Accident' },
  { icon: AlertTriangle, title: 'Slip & Fall', value: 'Slip & Fall' },
  { icon: HeartCrack, title: 'Wrongful Death', value: 'Wrongful Death' },
  { icon: HelpCircle, title: 'Other', value: 'Other' },
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
