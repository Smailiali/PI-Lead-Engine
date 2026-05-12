'use client'

import { Car, Truck, AlertTriangle, HeartCrack } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const areas: { icon: LucideIcon; title: string; value: string; description: string }[] = [
  {
    icon: Car,
    title: 'Car Accidents',
    value: 'Car Accident',
    description:
      'From minor fender-benders to catastrophic collisions, we fight to get you maximum compensation for your injuries and damages.',
  },
  {
    icon: Truck,
    title: 'Truck Accidents',
    value: 'Truck Accident',
    description:
      'Commercial truck accidents cause devastating injuries. We take on trucking companies and their insurers on your behalf.',
  },
  {
    icon: AlertTriangle,
    title: 'Slip & Fall',
    value: 'Slip & Fall',
    description:
      'Property owners have a duty to keep their premises safe. When they fail, we hold them accountable for your injuries.',
  },
  {
    icon: HeartCrack,
    title: 'Wrongful Death',
    value: 'Wrongful Death',
    description:
      'When negligence takes a loved one, we pursue justice and maximum compensation for your family during an unimaginable time.',
  },
]

function scrollToForm(accidentType: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('preselectedAccidentType', accidentType)
  }
  const formEl = document.getElementById('intake-form')
  formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-warm-gray py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm text-gold uppercase tracking-widest font-semibold mb-3">
            What We Handle
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-navy">Cases We Handle</h2>
          <div className="mt-5 mx-auto h-[3px] w-12 bg-gold rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map(({ icon: Icon, title, value, description }) => (
            <div
              key={value}
              className="bg-navy rounded-xl p-7 flex flex-col gap-5 group hover:ring-2 hover:ring-gold/50 transition-all duration-200 cursor-pointer"
              onClick={() => scrollToForm(value)}
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-gold" />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-serif text-xl text-white">{title}</h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed">{description}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  scrollToForm(value)
                }}
                className="mt-auto w-full py-2.5 px-4 rounded-lg bg-gold text-navy font-sans font-bold text-sm hover:bg-gold-dark active:scale-[0.98] transition-all duration-150"
              >
                Free Consultation
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
