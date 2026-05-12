'use client'

import ClickToCall from '@/components/shared/ClickToCall'

interface StickyMobileCTAProps {
  phoneNumber?: string
}

export default function StickyMobileCTA({ phoneNumber = '(800) 555-0199' }: StickyMobileCTAProps) {
  function scrollToForm() {
    document.getElementById('intake-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Phone */}
        <ClickToCall
          phoneNumber={phoneNumber}
          className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-sans font-semibold text-sm rounded-lg py-3 hover:bg-navy-light transition-colors duration-150"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          Call Now
        </ClickToCall>

        {/* Free consultation */}
        <button
          onClick={scrollToForm}
          className="flex-1 bg-gold text-navy font-sans font-bold text-sm rounded-lg py-3 hover:bg-gold-dark active:scale-[0.98] transition-all duration-150"
        >
          Free Consultation
        </button>
      </div>
    </div>
  )
}
