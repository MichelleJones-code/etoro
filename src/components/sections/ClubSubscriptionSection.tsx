'use client'

export default function ClubSubscriptionSection() {
  return (
    <section
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000021, #000000)' }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-1 md:space-y-2">
              <h2 className="text-xl sm:text-2xl lg:text-xl text-white">
                eToro Unlocked
              </h2>
              <p className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-gray-100 leading-relaxed">

                Elevate your <span className="text-[#13c636]">experience</span>
               </p>
               <p className="block text-white text-xl">
                with an eToro Club subscription
              </p>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 md:space-y-8">
              <a href="/auth/login" className="inline-block w-full sm:w-auto px-6 md:px-10 py-3 md:py-2 border-2 border-[#13c636]! bg-transparent text-[#13c636] rounded-full text-base md:text-lg tracking-tight hover:bg-emerald-600 hover:text-white transition-all text-center">
                Get all the details
              </a>

              <p className="text-xs md:text-base text-gray-100">
                Subscriptions is an optional service. Trading remains unchanged.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className=" w-full max-w-sm sm:max-w-md lg:max-w-3xl  mx-auto">
            <img
              src="/images/club-subscription-global.webp"
              alt="eToro Club Subscription"
              className="w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
