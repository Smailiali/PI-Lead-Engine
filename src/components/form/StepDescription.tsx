// Full implementation in Step 14
interface StepDescriptionProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export default function StepDescription({ value, onChange, onNext }: StepDescriptionProps) {
  return (
    <div className="px-8 py-8">
      <p className="font-sans text-navy text-center text-sm">
        Step 3: Description (coming in Step 14)
      </p>
    </div>
  )
}
