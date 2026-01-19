import HeroSection from '@/components/sections/HeroSection'
import ClubSubscriptionSection from '@/components/sections/ClubSubscriptionSection'
import EarnInterestSection from '@/components/sections/EarnInterestSection'
import DiversifySection from '@/components/sections/DiversifySection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Club Subscription Section */}
      <ClubSubscriptionSection />

      {/* Earn Interest Section */}
      <EarnInterestSection />

      {/* Diversify Portfolio Section */}
      <DiversifySection />
    </main>
  )
}