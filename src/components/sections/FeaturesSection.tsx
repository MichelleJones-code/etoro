'use client'

import { ArrowRight, Check } from 'lucide-react'

const features = [
  {
    id: 'copytrader',
    title: 'CopyTrader™',
    description: 'Automatically copy the moves of other investors. Find investors you believe in and replicate their actions in real time.',
    icon: '👥',
    benefits: [
      'Copy top-performing traders',
      'Full control over your portfolio',
      'No extra fees'
    ],
    ctaText: 'Start Copying',
    highlighted: true
  },
  {
    id: 'interest',
    title: 'Earn up to 3.55%* annual interest',
    description: 'Start receiving monthly interest payments straight to your cash balance, with no commitment.',
    icon: '💰',
    benefits: [
      'Competitive interest rates',
      'Monthly payments',
      'No commitment required'
    ],
    ctaText: 'Join eToro',
    highlighted: false
  },
  {
    id: 'crypto',
    title: 'Crypto trading at its best',
    description: 'Trade and manage 70+ cryptoassets on a trusted global platform with top-tier security and transparent fees.',
    icon: '₿',
    benefits: [
      '70+ cryptocurrencies available',
      'Top-tier security',
      'Fixed transparent fees'
    ],
    ctaText: 'Invest in Crypto',
    highlighted: false
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-4xl tracking-tight text-gray-900 mb-4">
          Trusted worldwide

          </h2>
          <p className="text-lg md:text-xl text-gray-800 tracking-tight max-w-3xl mx-auto">
          Discover why millions of investors from over 100 countries joined eToro

</p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Feature Icon and Title */}
              <div className="flex flex-col items-center space-y-10 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-lg">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl text-center tracking-tight font-medium text-gray-900">
                  {feature.title}
                </h3>
              </div>

              {/* Feature Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>


            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  )
}
