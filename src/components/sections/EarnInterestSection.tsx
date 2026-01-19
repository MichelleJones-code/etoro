'use client'

export default function EarnInterestSection() {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                <span className="font-bold text-black">Earn up to</span>
                <span className="font-bold text-emerald-600"> 3.55%* annual interest</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Start receiving monthly interest payments straight to your cash balance, with no
                commitment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-emerald-600 text-white rounded-lg text-base md:text-lg font-semibold hover:bg-emerald-700 transition-all">
                Join eToro
              </button>

              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-emerald-600 bg-transparent text-emerald-600 rounded-lg text-base md:text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all">
                Learn More
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs md:text-sm text-gray-500">
              *Credit and other risks apply, please read the Terms and Conditions
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 w-full max-w-md lg:max-w-none mx-auto">
            <img
              src="/images/earn-interest.png"
              alt="Earn Interest"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
