import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import ClickToCall from '@/components/shared/ClickToCall'
import { Phone, FileText, Scale } from 'lucide-react'
import type { ReactNode } from 'react'

const PHONE_NUMBER = '(800) 555-0199'

interface ThankYouPageProps {
  searchParams: { id?: string }
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const styles: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold font-sans ${styles[urgency] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}
    >
      {urgency} Priority
    </span>
  )
}

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color = score >= 8 ? 'bg-green-500' : score >= 5 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-sans text-sm font-bold text-navy w-8 text-right">{score}/10</span>
    </div>
  )
}

const NEXT_STEPS: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <Phone className="w-5 h-5 text-gold" />,
    title: 'We will call you within 24 hours',
    description: 'An intake specialist will review your case and reach out to discuss your options.',
  },
  {
    icon: <FileText className="w-5 h-5 text-gold" />,
    title: 'Review your case details',
    description: 'We will go through the specifics of your accident and injuries together.',
  },
  {
    icon: <Scale className="w-5 h-5 text-gold" />,
    title: 'Discuss your legal options',
    description:
      'If you have a strong case, we will explain exactly how we can help and what to expect.',
  },
]

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { id } = searchParams

  if (!id) {
    return <ErrorState message="No case ID found. Did you submit the form?" />
  }

  const lead = await prisma.lead.findUnique({ where: { id } }).catch(() => null)

  if (!lead) {
    return <ErrorState message="We could not find your case. Please contact us directly." />
  }

  const hasScreening = lead.aiScore !== null && lead.aiCaseType !== null

  return (
    <main className="min-h-screen bg-warm-gray">
      {/* Top confirmation banner */}
      <div className="bg-navy py-14 px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-5">
          {/* Checkmark */}
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-white">
              Thank You, {lead.firstName}.
            </h1>
            <p className="font-sans text-white/60 mt-3 text-lg">
              Your case is being reviewed by our team.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-sans text-sm text-white/70">
              Case #{id.slice(-8).toUpperCase()} submitted successfully
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 flex flex-col gap-8">
        {/* AI Assessment card */}
        {hasScreening ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-navy/5 border-b border-gray-100 px-7 py-5 flex items-center justify-between">
              <div>
                <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mb-1">
                  AI Case Assessment
                </p>
                <p className="font-serif text-xl text-navy">{lead.aiCaseType}</p>
              </div>
              {lead.aiUrgency && <UrgencyBadge urgency={lead.aiUrgency} />}
            </div>

            <div className="px-7 py-6 flex flex-col gap-6">
              {/* Score */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Case Strength
                  </p>
                  <p className="font-sans text-xs text-gray-400">{lead.aiViability}</p>
                </div>
                <ScoreBar score={lead.aiScore!} />
              </div>

              {/* Value range */}
              {lead.aiValueRange && (
                <div className="flex items-center justify-between py-4 border-t border-gray-100">
                  <p className="font-sans text-sm text-gray-500">Estimated Case Value</p>
                  <p className="font-serif text-xl text-gold">{lead.aiValueRange}</p>
                </div>
              )}

              {/* Recommendation */}
              {lead.aiRecommendation && (
                <div className="bg-navy/[0.03] rounded-xl p-4 border border-navy/10">
                  <p className="font-sans text-xs font-semibold text-navy/50 uppercase tracking-wider mb-2">
                    Our Assessment
                  </p>
                  <p className="font-sans text-sm text-navy/80 leading-relaxed">
                    {lead.aiRecommendation}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 py-8 flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full border-4 border-gold border-t-transparent animate-spin" />
            <p className="font-sans text-sm text-gray-500">Your case is being analyzed...</p>
          </div>
        )}

        {/* What happens next */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 py-6">
          <p className="font-serif text-xl text-navy mb-6">What Happens Next</p>
          <div className="flex flex-col gap-5">
            {NEXT_STEPS.map(({ icon, title, description }, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center">
                  {icon}
                </div>
                <div className="flex flex-col gap-0.5 pt-1">
                  <p className="font-sans text-sm font-semibold text-navy">{title}</p>
                  <p className="font-sans text-sm text-gray-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent CTA */}
        <div className="bg-navy rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-white">Need to speak with someone now?</p>
            <p className="font-sans text-sm text-white/50 mt-0.5">
              We are available 24 hours a day, 7 days a week.
            </p>
          </div>
          <ClickToCall
            phoneNumber={PHONE_NUMBER}
            className="flex-shrink-0 bg-gold text-navy font-sans font-bold px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors duration-150 whitespace-nowrap"
          >
            Call Now
          </ClickToCall>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link
            href="/"
            className="font-sans text-sm text-gray-400 hover:text-navy transition-colors duration-150 underline underline-offset-4"
          >
            Return to home
          </Link>
        </div>
      </div>
    </main>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <main className="min-h-screen bg-warm-gray flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <p className="font-serif text-2xl text-navy">Something went wrong</p>
          <p className="font-sans text-sm text-gray-400 mt-2">{message}</p>
        </div>
        <ClickToCall
          phoneNumber={PHONE_NUMBER}
          className="bg-gold text-navy font-sans font-bold px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors duration-150"
        >
          Call Us Directly
        </ClickToCall>
        <Link href="/" className="font-sans text-sm text-gray-400 hover:text-navy transition-colors duration-150 underline underline-offset-4">
          Return to home
        </Link>
      </div>
    </main>
  )
}
