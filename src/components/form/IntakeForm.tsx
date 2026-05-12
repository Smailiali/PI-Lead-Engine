'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FormProgressBar from '@/components/form/FormProgressBar'
import StepAccidentType from '@/components/form/StepAccidentType'
import StepAccidentTiming from '@/components/form/StepAccidentTiming'
import StepDescription from '@/components/form/StepDescription'
import StepContactInfo from '@/components/form/StepContactInfo'
import { extractUTMFromURL } from '@/lib/utm'
import type { LeadFormData, UTMParams } from '@/types/lead'

const TOTAL_STEPS = 4

type FormState = Omit<LeadFormData, 'email'> & { email: string }

const INITIAL_FORM_STATE: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  accidentType: '',
  accidentTiming: '',
  description: '',
}

export default function IntakeForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE)
  const [utmParams, setUtmParams] = useState<UTMParams>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)

  // Capture UTM params and preselected accident type on mount
  useEffect(() => {
    const params = extractUTMFromURL(window.location.href)
    setUtmParams(params)

    const preselected = sessionStorage.getItem('preselectedAccidentType')
    if (preselected) {
      setForm((prev) => ({ ...prev, accidentType: preselected }))
      sessionStorage.removeItem('preselectedAccidentType')
    }
  }, [])

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function goNext() {
    if (currentStep >= TOTAL_STEPS || animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep((s) => s + 1)
      setAnimating(false)
    }, 200)
  }

  function goBack() {
    if (currentStep <= 1 || animating) return
    setError(null)
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep((s) => s - 1)
      setAnimating(false)
    }, 200)
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const payload: Record<string, string | undefined> = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      accidentType: form.accidentType,
      accidentTiming: form.accidentTiming,
      description: form.description.trim(),
      ...utmParams,
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await res.json()) as { leadId?: string; error?: string }

      if (!res.ok || !data.leadId) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      router.push(`/thank-you?id=${data.leadId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div id="intake-form" className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Progress bar header */}
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <p className="font-sans text-xs text-gray-400 text-center mb-5 uppercase tracking-widest">
          Free Case Review · Takes Less Than 2 Minutes
        </p>
        <FormProgressBar currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div
        className={`transition-opacity duration-200 ${animating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {currentStep === 1 && (
          <StepAccidentType
            selected={form.accidentType}
            onSelect={(value) => {
              updateField('accidentType', value)
              setTimeout(goNext, 300)
            }}
          />
        )}

        {currentStep === 2 && (
          <StepAccidentTiming
            selected={form.accidentTiming}
            onSelect={(value) => {
              updateField('accidentTiming', value)
              setTimeout(goNext, 300)
            }}
          />
        )}

        {currentStep === 3 && (
          <StepDescription
            value={form.description}
            onChange={(value) => updateField('description', value)}
            onNext={goNext}
          />
        )}

        {currentStep === 4 && (
          <StepContactInfo
            values={{ firstName: form.firstName, lastName: form.lastName, phone: form.phone, email: form.email }}
            onChange={(field, value) => updateField(field, value)}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </div>

      {/* Back button — steps 2+ */}
      {currentStep > 1 && (
        <div className="px-8 pb-6">
          <button
            onClick={goBack}
            disabled={loading}
            className="font-sans text-sm text-gray-400 hover:text-navy transition-colors duration-150 flex items-center gap-1 disabled:opacity-40"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        </div>
      )}
    </div>
  )
}
