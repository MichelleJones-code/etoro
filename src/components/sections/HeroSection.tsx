'use client'

export default function HeroSection() {
  return (
    <section className="relative  flex items-center bg-white my-5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Content - Smaller */}
          <div className="flex flex-col justify-center space-y-6 lg:w-2/5">
            {/* Massive Headline */}
            <div className="space-y-3">
              <h1 className="font-mono text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter">
                Yep, it&apos;s
              </h1>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.85]">
                all in one
                <br />
                <span className="">app</span>
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 leading-normal font-normal">
              Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app
            </p>

            {/* Interactive Elements */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
              <button
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-8 text-base font-medium text-white transition-all hover:scale-[1.02] shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: '#16c635' }}
              >
                <span>Join eToro</span>
              </button>
            </div>
          </div>

          {/* Right Column - Bigger Image */}
          <div className="lg:w-3/5">
            <img
              src="/images/hero-image.webp"
              alt="eToro App Interface"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <p className="text-sm text-gray-600 mt-4 font-light float-right">
              **<span className="underline">Terms and Conditions</span> apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
