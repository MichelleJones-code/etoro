import HeroSection from '@/components/sections/HeroSection'
import ClubSubscriptionSection from '@/components/sections/ClubSubscriptionSection'
import EarnInterestSection from '@/components/sections/EarnInterestSection'
import DiversifySection from '@/components/sections/DiversifySection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TrustSection from '@/components/sections/TrustSection'
import TradingBestSection from '@/components/sections/TradingBest'
import CopyTopSection from '@/components/sections/CopyTop'

export default function Home() {
  return (
    <main className="min-h-screen bg-white ">
      {/* Hero Section */}
      <HeroSection />

      {/* Club Subscription Section */}
      <ClubSubscriptionSection />

      {/* Earn Interest Section */}
      <EarnInterestSection />

      {/* Diversify Portfolio Section */}
      <DiversifySection />

      <TradingBestSection />

      <CopyTopSection />

      {/* Features Section */}
      <FeaturesSection />

    </main>
  )
}