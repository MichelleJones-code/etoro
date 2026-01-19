'use client'

export default function CryptoTradingSection() {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Image */}
          <div className="flex items-end justify-start max-w-md lg:max-w-lg">
            <img
              src="/images/crypto2x.jpg"
              alt="Crypto Trading"
              className="w-full h-auto"
              style={{ maxWidth: '550px', height: 'auto' }}
            />
          </div>

          {/* Right Column - Text Content */}
          <div
            className="flex flex-col items-start justify-center md:space-y-8 lg:max-w-xl"
            style={{ minHeight: '400px' }}
          >
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold text-black">
                Crypto trading at its best
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Trade and manage 70+ cryptoassets on a trusted global platform that offers top-tier
                security, powerful tools, user-friendly features, and fixed transparent fees.
                Eligible eToro Club members can also{' '}
                <span className="underline">sell their crypto for GBP or EUR</span>, unlocking even
                more flexibility to trade, invest, or explore new opportunities.
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 md:space-y-4">
              <button
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 bg-transparent rounded-full text-base md:text-lg font-semibold hover:text-white transition-all"
                style={{ borderColor: '#16c635', color: '#16c635' }}
              >
                Invest in Crypto
              </button>

              <p className="text-xs md:text-sm text-gray-500">
                Crypto assets are unregulated & highly speculative. No consumer protection. Capital
                at risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
