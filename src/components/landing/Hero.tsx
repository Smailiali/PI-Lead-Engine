'use client'

import ClickToCall from '@/components/shared/ClickToCall'
import IntakeForm from '@/components/form/IntakeForm'

interface HeroProps {
  phoneNumber?: string
}

export default function Hero({ phoneNumber = '(800) 555-0199' }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-navy overflow-hidden pt-16">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-90 pointer-events-none" />

      {/* Subtle radial glow top-left */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Copy */}
          <div className="flex flex-col gap-8 lg:py-24">
            {/* Trust badge */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold fill-gold" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-sm font-sans tracking-wide">
                4.9 Rating &nbsp;&bull;&nbsp; 500+ Cases Won
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] text-white leading-[1.1] tracking-tight">
                Injured?{' '}
                <span className="text-gold">You Deserve</span>{' '}
                More Than Just A Settlement.
              </h1>

              {/* Gold accent bar */}
              <div className="mt-6 h-[3px] w-16 bg-gold rounded-full" />
            </div>

            {/* Subline */}
            <p className="font-sans text-lg text-white/75 leading-relaxed max-w-lg">
              We&apos;ve recovered over{' '}
              <span className="text-white font-semibold">$250 million</span> for clients just like
              you. Your consultation is free, and you pay nothing unless we win.
            </p>

            {/* Phone CTA */}
            <div className="flex flex-col gap-2">
              <p className="font-sans text-sm text-white/50 uppercase tracking-widest">
                Call us now, available 24/7
              </p>
              <ClickToCall
                phoneNumber={phoneNumber}
                className="font-serif text-3xl sm:text-4xl text-gold hover:text-gold-dark transition-colors duration-200"
              />
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { value: '$250M+', label: 'Recovered' },
                { value: '500+', label: 'Cases Won' },
                { value: '15+', label: 'Years' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-serif text-2xl text-gold">{value}</span>
                  <span className="font-sans text-xs text-white/50 uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Intake form */}
          <div className="w-full lg:py-16">
            <IntakeForm />
          </div>

        </div>
      </div>
    </section>
  )
}
