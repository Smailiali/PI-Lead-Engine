import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import SocialProofBar from '@/components/landing/SocialProofBar'
import HowItWorks from '@/components/landing/HowItWorks'
import PracticeAreas from '@/components/landing/PracticeAreas'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'
import StickyMobileCTA from '@/components/landing/StickyMobileCTA'

const PHONE_NUMBER = '(800) 555-0199'

export default function LandingPage() {
  return (
    <main className="pb-16 md:pb-0">
      <Navbar />
      <Hero phoneNumber={PHONE_NUMBER} />
      <SocialProofBar />
      <HowItWorks />
      <PracticeAreas />
      <Testimonials />
      <FAQ />
      <Footer phoneNumber={PHONE_NUMBER} />
      <StickyMobileCTA phoneNumber={PHONE_NUMBER} />
    </main>
  )
}
