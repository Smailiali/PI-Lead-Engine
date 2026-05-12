// Full implementation in Step 14
interface StepAccidentTimingProps {
  selected: string
  onSelect: (value: string) => void
}

export default function StepAccidentTiming({ selected, onSelect }: StepAccidentTimingProps) {
  return (
    <div className="px-8 py-8">
      <p className="font-sans text-navy text-center text-sm">
        Step 2: Accident Timing (coming in Step 14)
      </p>
    </div>
  )
}
