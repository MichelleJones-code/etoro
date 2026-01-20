'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function DiversifySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    const element = sectionRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#f7f7f7' }}
    >
      <div className="container mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div
            className="flex flex-col items-start justify-center md:space-y-8 lg:max-w-xl"
            style={{ minHeight: '400px' }}
          >
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                Diversify your portfolio
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Invest in a variety of asset classes — including 20 global stock exchanges and 100
                cryptocurrencies — while managing all of your holdings in one place
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 bg-transparent rounded-full text-base md:text-lg font-semibold hover:text-white transition-all"
                style={{ borderColor: '#16c635', color: '#16c635' }}
              >
                Explore Top Markets
              </button>
            </div>
          </div>

          {/* Right Column - Abstract Card Arrangement */}
          <div className="flex-1 relative h-87.5 sm:h-112.5 md:h-125 lg:h-150">
            {/* Bitcoin - Top Left */}
            <div
              className={`absolute top-0 left-0 z-20 w-20 sm:w-28 md:w-32 lg:w-40 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <Image
                src="/images/bitcoin.svg"
                alt="Bitcoin"
                width={160}
                height={160}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* Apple - Top Center */}
            <div
              className={`absolute top-4 sm:top-8 left-16 sm:left-20 md:left-24 lg:left-32 z-30 w-16 sm:w-24 md:w-28 lg:w-36 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Image
                src="/images/apple.svg"
                alt="Apple"
                width={160}
                height={160}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* iShares - Top Right */}
            <div
              className={`absolute top-2 sm:top-4 right-0 z-10 w-20 sm:w-28 md:w-32 lg:w-40 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <Image
                src="/images/ishares-colored.svg"
                alt="iShares"
                width={144}
                height={144}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* Ethereum - Middle Left */}
            <div
              className={`absolute top-28 sm:top-32 md:top-40 left-4 sm:left-6 md:left-8 z-25 w-16 sm:w-24 md:w-28 lg:w-36 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Image
                src="/images/ethereum.svg"
                alt="Ethereum"
                width={144}
                height={144}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* Netflix - Center */}
            <div
              className={`absolute top-32 sm:top-40 md:top-48 left-1/2 transform -translate-x-1/2 z-40 w-20 sm:w-28 md:w-32 lg:w-40 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <Image
                src="/images/netflix.svg"
                alt="Netflix"
                width={160}
                height={160}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* SPDR - Middle Right */}
            <div
              className={`absolute top-30 sm:top-36 md:top-44 right-4 sm:right-6 md:right-8 z-15 w-16 sm:w-24 md:w-28 lg:w-36 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <Image
                src="/images/spdr-colored.svg"
                alt="SPDR"
                width={144}
                height={144}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>

            {/* Airbnb - Bottom Left */}
            <div
              className={`absolute bottom-4 sm:bottom-6 md:bottom-8 left-2 sm:left-4 z-20 w-20 sm:w-28 md:w-32 lg:w-40 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <Image src="/images/airbnb.svg" alt="Airbnb" width={160} height={160} className="w-full h-auto drop-shadow-lg" />
            </div>

            {/* Ethereum (alternative) - Bottom Center */}
            <div
              className={`absolute bottom-2 sm:bottom-4 left-1/3 z-35 w-16 sm:w-24 md:w-28 lg:w-36 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <Image
                src="/images/ethereum (1).svg"
                alt="Ethereum"
                width={144}
                height={144}
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
