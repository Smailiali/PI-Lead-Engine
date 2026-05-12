'use client'

interface StepContactInfoProps {
  values: { firstName: string; lastName: string; phone: string; email: string }
  onChange: (field: 'firstName' | 'lastName' | 'phone' | 'email', value: string) => void
  onSubmit: () => void
  loading: boolean
  error: string | null
}

interface FieldConfig {
  field: 'firstName' | 'lastName' | 'phone' | 'email'
  label: string
  placeholder: string
  type: string
  required: boolean
  autoComplete: string
}

const FIELDS: FieldConfig[] = [
  { field: 'firstName', label: 'First Name', placeholder: 'Maria', type: 'text', required: true, autoComplete: 'given-name' },
  { field: 'lastName', label: 'Last Name', placeholder: 'Rodriguez', type: 'text', required: true, autoComplete: 'family-name' },
  { field: 'phone', label: 'Phone Number', placeholder: '(310) 555-0100', type: 'tel', required: true, autoComplete: 'tel' },
  { field: 'email', label: 'Email Address', placeholder: 'maria@example.com (optional)', type: 'email', required: false, autoComplete: 'email' },
]

function isFormValid(values: StepContactInfoProps['values']): boolean {
  return (
    values.firstName.trim().length > 0 &&
    values.lastName.trim().length > 0 &&
    values.phone.trim().length >= 7
  )
}

export default function StepContactInfo({
  values,
  onChange,
  onSubmit,
  loading,
  error,
}: StepContactInfoProps) {
  const valid = isFormValid(values)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (valid && !loading) onSubmit()
  }

  return (
    <div className="px-8 py-7 animate-step-in">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-navy leading-snug">
          Let&apos;s get you your free case review
        </h2>
        <p className="font-sans text-sm text-gray-400 mt-1">
          We will reach out within 24 hours to discuss your case.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          {FIELDS.slice(0, 2).map(({ field, label, placeholder, type, required, autoComplete }) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label htmlFor={field} className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {label} {required && <span className="text-red-400">*</span>}
              </label>
              <input
                id={field}
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                value={values[field]}
                onChange={(e) => onChange(field, e.target.value)}
                required={required}
                className="rounded-lg border-2 border-gray-200 px-3 py-2.5 font-sans text-sm text-navy placeholder:text-gray-300 focus:outline-none focus:border-gold transition-colors duration-150"
              />
            </div>
          ))}
        </div>

        {/* Phone + Email */}
        {FIELDS.slice(2).map(({ field, label, placeholder, type, required, autoComplete }) => (
          <div key={field} className="flex flex-col gap-1.5">
            <label htmlFor={field} className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {label} {required && <span className="text-red-400">*</span>}
            </label>
            <input
              id={field}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={values[field]}
              onChange={(e) => onChange(field, e.target.value)}
              required={required}
              className="rounded-lg border-2 border-gray-200 px-3 py-2.5 font-sans text-sm text-navy placeholder:text-gray-300 focus:outline-none focus:border-gold transition-colors duration-150"
            />
          </div>
        ))}

        {/* Error message */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="font-sans text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!valid || loading}
          className="mt-2 w-full py-4 px-6 rounded-lg bg-gold text-navy font-sans font-bold text-base hover:bg-gold-dark active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing Your Case...
            </>
          ) : (
            <>
              Get My Free Case Review
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </>
          )}
        </button>

        <p className="font-sans text-xs text-gray-400 text-center">
          100% free. No obligation. We respond within 24 hours.
        </p>
      </form>
    </div>
  )
}
