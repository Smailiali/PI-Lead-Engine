// Full implementation in Step 14
interface StepContactInfoProps {
  values: { firstName: string; lastName: string; phone: string; email: string }
  onChange: (field: 'firstName' | 'lastName' | 'phone' | 'email', value: string) => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}

export default function StepContactInfo({ values, onChange, onSubmit, loading, error }: StepContactInfoProps) {
  return (
    <div className="px-8 py-8">
      <p className="font-sans text-navy text-center text-sm">
        Step 4: Contact Info (coming in Step 14)
      </p>
    </div>
  )
}
