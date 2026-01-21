'use client'

export default function EarnInterestSection() {
  return (
    <section className="relative py-12 md:py-20 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xl font-bold tracking-tight leading-tight">
                Earn up to <span className=" text-[#13c636]">3.55%* annual interest</span>
                <span className="font-bold text-emerald-600"> </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl max-w-xl text-gray-900 leading-tight tracking-tight">
                Start receiving monthly interest payments straight to your cash balance, with no
                commitment.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="/auth/login" className="inline-block w-full sm:w-auto px-6 md:px-9 py-3 md:py-2 bg-[#13c636] text-white tracking-tight rounded-full text-base md:text-lg  hover:bg-emerald-700 transition-all text-center">
                Join eToro
              </a>

              <a href="/auth/login" className="inline-block w-full sm:w-auto px-6 md:px-9 py-3 md:py-2 border-2 border-[#13c636]! bg-transparent text-[#13c636] rounded-full text-base md:text-lg tracking-tight hover:bg-emerald-600 hover:text-white transition-all text-center">
                Learn More
              </a>
            </div>

            {/* Disclaimer */}
            <p className="text-xs md:text-base tracking-tight font-light text-gray-900">
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
