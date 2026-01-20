import HeroSection from '@/components/sections/HeroSection'
import ClubSubscriptionSection from '@/components/sections/ClubSubscriptionSection'
import EarnInterestSection from '@/components/sections/EarnInterestSection'
import AwardsSection from '@/components/sections/AwardsSection'
import DiversifySection from '@/components/sections/DiversifySection'
import CryptoTradingSection from '@/components/sections/CryptoTradingSection'
import CopyTraderSection from '@/components/sections/CopyTraderSection'
import AcademySection from '@/components/sections/AcademySection'
import BalanceSection from '@/components/sections/BalanceSection'
import BanksSection from '@/components/sections/BanksSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TrustSection from '@/components/sections/TrustSection'
import SponsorshipSection from '@/components/sections/SponsorshipSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Club Subscription Section */}
      <ClubSubscriptionSection />

      {/* Awards Carousel */}
      <AwardsSection />

      {/* Earn Interest Section */}
      <EarnInterestSection />

      {/* Diversify Portfolio Section */}
      <DiversifySection />

      {/* Crypto Trading Section */}
      <CryptoTradingSection />

      {/* CopyTrader Section */}
      <CopyTraderSection />

      {/* Academy Section */}
      <AcademySection />

      {/* Balance Section */}
      <BalanceSection />

      {/* Banks Section */}
      <BanksSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Sponsorship Section */}
      <SponsorshipSection />
    </main>
  )
}
