'use client'

export default function ClubSubscriptionSection() {
  return (
    <section
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000021, #000000)' }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                eToro Unlocked
              </h2>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed">
                Elevate your experience
                <br />
                with an eToro Club subscription
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 md:space-y-4">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-emerald-600 bg-transparent text-emerald-600 rounded-lg text-base md:text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all">
                Learn More
              </button>

              <p className="text-xs md:text-sm text-gray-400">
                Subscriptions is an optional service. Trading remains unchanged.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 w-full max-w-md lg:max-w-none mx-auto">
            <img
              src="/images/club-subscription-global.webp"
              alt="eToro Club Subscription"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
