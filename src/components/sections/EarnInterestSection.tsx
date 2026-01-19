'use client'

export default function EarnInterestSection() {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div
            className="flex flex-col items-start justify-center md:space-y-8 lg:max-w-xl"
            style={{ minHeight: '400px' }}
          >
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                <span className="font-bold text-black">Earn up to</span>
                <span className="font-bold" style={{ color: '#16c635' }}>
                  {' '}
                  3.55%* annual interest
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Start receiving monthly interest payments straight to your cash balance, with no
                commitment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-white rounded-full text-base md:text-lg font-semibold transition-all"
                style={{ backgroundColor: '#16c635' }}
              >
                Join eToro
              </button>

              <button
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 bg-transparent rounded-full text-base md:text-lg font-semibold hover:text-white transition-all"
                style={{ borderColor: '#16c635', color: '#16c635' }}
              >
                Learn More
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs md:text-sm text-gray-500">
              *Credit and other risks apply, please read the Terms and Conditions
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-end justify-end max-w-xl lg:max-w-2xl ml-auto">
            <img
              src="/images/earn-interest.png"
              alt="Earn Interest"
              className="w-full h-auto"
              style={{ maxWidth: '850px', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
