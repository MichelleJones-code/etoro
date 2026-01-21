'use client'

import { ArrowRight, Bitcoin, TrendingUp, PieChart } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative  flex items-center bg-white py-10 overflow-hidden">
      <div className="container mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 space-x-0 lg:space-x-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center ">
            {/* Massive Headline */}
            <div className="">
              <h1 className="font-home text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-slate-900 uppercase tracking-tighter">
                Yep, it&apos;s
              </h1>
              <h2 className="font-home font-extrabold  tracking-tight uppercase text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-slate-900">
                all in one app
              </h2>
            </div>

              <p className=" text-slate-900 max-w-xl text-lg sm:text-xl lg:text-2xl">
              Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app
            </p>

            {/* Interactive Elements */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mt-10">
              <a href="/auth/login" className="group relative inline-flex py-3 items-center justify-center overflow-hidden rounded-full bg-green-500 px-10 text-lg font-medium text-white transition-all hover:bg-emerald-700 hover:scale-[1.02] shadow-xl shadow-emerald-600/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                <span className="mr-2">Join eToro</span>
                
              </a>

           
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="w-full max-w-full lg:max-w-[45rem]">
            <img
              src="/images/hero-image.webp"
              alt=" App Interface"
              className="w-full max-w-full lg:max-w-[45rem] rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
