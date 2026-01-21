'use client'

import { useEffect, useRef, useState } from 'react'

export default function TradingBestSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: '#f7f7f7' }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center justify-between">
        <div className="w-full max-w-sm lg:max-w-sm mx-auto lg:mx-0">
            <img src="/images/crypto2x.jpg" alt="Diversify" className="w-full max-w-sm object-cover" />
          </div>
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left max-w-xl">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-light tracking-tight text-black leading-tight">
                Crypto trading at its best
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-tight tracking-tight font-light">
              Trade and manage 70+ cryptoassets on a trusted global platform that offers top-tier security, powerful tools, user-friendly features, and fixed transparent fees. Eligible eToro Club members can also sell their crypto for GBP or EUR, unlocking even more flexibility to trade, invest, or explore new opportunities.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <a href="/auth/login" className="inline-block w-full sm:w-auto px-6 md:px-8 py-3 md:py-2 border-2 border-[#13c636]! bg-transparent text-[#13c636] rounded-full text-base tracking-tight hover:bg-[#13c636] hover:text-white transition-all text-center">
                Invest in Crypto
              </a>
            </div>

            <p className="text-base md:text-lg lg:text-sm text-gray-800 leading-tight tracking-tight font-light">
            Crypto assets are unregulated & highly speculative. No consumer protection. Capital at risk.

              </p>
          </div>

          {/* Right Column - Abstract Card Arrangement */}
          
        </div>
      </div>
    </section>
  )
}
