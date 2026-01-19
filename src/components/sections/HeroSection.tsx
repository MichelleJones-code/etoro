'use client'

import { ArrowRight, Bitcoin, TrendingUp, PieChart } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Massive Headline */}
            <div className="space-y-4">
              <h1 className="font-mono text-slate-500 text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter">
                Yep, it&apos;s
              </h1>
              <h2 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-slate-900 leading-[0.85]">
                all in one
                <br />
                <span className="text-emerald-600">app</span>
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-500 max-w-2xl leading-normal font-normal">
              Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app
            </p>

            {/* Interactive Elements */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              <button className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-2xl bg-emerald-600 px-10 text-lg font-medium text-white transition-all hover:bg-emerald-700 hover:scale-[1.02] shadow-xl shadow-emerald-600/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                <span className="mr-2">Join Now</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} strokeWidth={1.5} />
              </button>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-30">
                    <Bitcoin className="text-orange-500" size={18} strokeWidth={1.5} />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-20">
                    <TrendingUp className="text-emerald-500" size={18} strokeWidth={1.5} />
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm z-10">
                    <PieChart className="text-blue-500" size={18} strokeWidth={1.5} />
                  </div>
                </div>
                <span>Multi-asset platform</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="flex-1">
            <img
              src="/images/hero-image.webp"
              alt="eToro App Interface"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
