import Hero from '@/components/landing/Hero'
import SocialProofBar from '@/components/landing/SocialProofBar'
import HowItWorks from '@/components/landing/HowItWorks'
import PracticeAreas from '@/components/landing/PracticeAreas'

const PHONE_NUMBER = '(800) 555-0199'

export default function LandingPage() {
  return (
    <main>
      <Hero phoneNumber={PHONE_NUMBER} />
      <SocialProofBar />
      <HowItWorks />
      <PracticeAreas />
      {/* Testimonials — Step 12 */}
      {/* FAQ — Step 12 */}
      {/* Footer — Step 12 */}
      {/* StickyMobileCTA — Step 12 */}
    </main>
  )
}
