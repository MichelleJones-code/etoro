'use client'

import { ArrowRight, Check } from 'lucide-react'

const features = [
  {
    id: 'copytrader',
    title: 'CopyTrader™',
    description:
      'Automatically copy the moves of other investors. Find investors you believe in and replicate their actions in real time.',
    icon: '👥',
    benefits: ['Copy top-performing traders', 'Full control over your portfolio', 'No extra fees'],
    ctaText: 'Start Copying',
    highlighted: true,
  },
  {
    id: 'interest',
    title: 'Earn up to 3.55%* annual interest',
    description:
      'Start receiving monthly interest payments straight to your cash balance, with no commitment.',
    icon: '💰',
    benefits: ['Competitive interest rates', 'Monthly payments', 'No commitment required'],
    ctaText: 'Join eToro',
    highlighted: false,
  },
  {
    id: 'crypto',
    title: 'Crypto trading at its best',
    description:
      'Trade and manage 70+ cryptoassets on a trusted global platform with top-tier security and transparent fees.',
    icon: '₿',
    benefits: ['70+ cryptocurrencies available', 'Top-tier security', 'Fixed transparent fees'],
    ctaText: 'Invest in Crypto',
    highlighted: false,
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to invest smarter
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From copy trading to crypto wallets, get all the tools you need in one place
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {features.map(feature => (
            <div
              key={feature.id}
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Feature Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: '#16c635' }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">{feature.title}</h3>
              </div>

              {/* Feature Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

              {/* Benefits List */}
              <ul className="space-y-2 mb-6">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#16c635' }} />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  feature.highlighted ? 'text-white' : 'border-2'
                }`}
                style={
                  feature.highlighted
                    ? { backgroundColor: '#16c635' }
                    : { borderColor: '#16c635', color: '#16c635' }
                }
              >
                {feature.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-12 md:mt-16 grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Interest Feature */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#16c635' }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h14a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm7-1a1 1 0 100 2h6a1 1 0 100-2h-6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Earn up to <span style={{ color: '#16c635' }}>3.55%</span> annual interest
                </h3>
                <p className="text-gray-600 mb-4">
                  Start receiving monthly interest payments straight to your cash balance, with no
                  commitment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    style={{ backgroundColor: '#16c635' }}
                  >
                    Join eToro
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                    Learn More
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  *Credit and other risks apply, please read the Terms and Conditions
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Feature */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#16c635' }}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h14a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm7-1a1 1 0 100 2h6a1 1 0 100-2h-6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  eToro Money Crypto Wallet
                </h3>
                <p className="text-gray-600 mb-4">
                  Store, buy, sell, and transfer crypto assets with our secure and easy-to-use
                  wallet.
                </p>
                <div className="flex gap-3">
                  <button
                    className="text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    style={{ backgroundColor: '#16c635' }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
