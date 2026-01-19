'use client'

export default function ClubSubscriptionSection() {
  return (
    <section
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000021, #000000)' }}
    >
      <div className="container mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div
            className=" flex flex-col items-start justify-center md:space-y-8  lg:max-w-xl"
            style={{ minHeight: '400px' }}
          >
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-xl font-semibold text-white">eToro Unlocked</h2>
              <p className="text-lg md:text-4xl text-gray-300 leading-relaxed">
                <span className="font-bold">
                  Elevate your <span style={{ color: '#16c635' }}>experience</span>
                </span>
                <br />
                <span className="font-light text-lg">with an eToro Club subscription</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 md:space-y-4">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-[#16c635]bg-transparent text-[#16c635] rounded-full text-base md:text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all">
                Get all the details
              </button>

              <p className="text-xs md:text-sm text-gray-400">
                Subscriptions is an optional service. Trading remains unchanged.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-end justify-end max-w-xl lg:max-w-2xl ml-auto">
            <img
              src="/images/club-subscription-global.webp"
              alt="eToro Club Subscription"
              className="w-full h-auto"
              style={{ maxWidth: '850px', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
