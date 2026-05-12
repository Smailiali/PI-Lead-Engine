'use client'

import ClickToCall from '@/components/shared/ClickToCall'

interface HeroProps {
  phoneNumber?: string
}

export default function Hero({ phoneNumber = '(800) 555-0199' }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-navy overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-90 pointer-events-none" />

      {/* Subtle radial glow top-left */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-0 min-h-screen flex items-center">
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
                Call us now — available 24/7
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

          {/* Right — Intake form (placeholder until Step 13-14) */}
          <div className="w-full lg:py-16">
            <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-[480px] flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <p className="font-sans text-navy font-semibold text-center">
                Free Case Review Form
              </p>
              <p className="font-sans text-sm text-gray-400 text-center max-w-xs">
                Multi-step intake form coming in Step 13. Drop your info and get an AI-powered case assessment in seconds.
              </p>
              <div className="w-full mt-2 space-y-3">
                {['What type of accident?', 'When did it happen?', 'Tell us what happened', 'Your contact info'].map((label, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-navy text-xs font-bold font-sans">{i + 1}</span>
                    </div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg" />
                    <span className="text-xs text-gray-400 font-sans whitespace-nowrap">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
