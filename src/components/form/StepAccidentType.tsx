// Full implementation in Step 14
interface StepAccidentTypeProps {
  selected: string
  onSelect: (value: string) => void
}

export default function StepAccidentType({ selected, onSelect }: StepAccidentTypeProps) {
  return (
    <div className="px-8 py-8">
      <p className="font-sans text-navy text-center text-sm">
        Step 1: Accident Type (coming in Step 14)
      </p>
    </div>
  )
}
