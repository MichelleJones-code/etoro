'use client'

const socialProof = [
  {
    id: 'users',
    title: 'Social',
    value: '40M+',
    description: 'Users globally',
    icon: '👥'
  },
  {
    id: 'reliable',
    title: 'Reliable',
    value: '17+',
    description: 'Years in fintech',
    icon: '🏆'
  },
  {
    id: 'secured',
    title: 'Secured',
    value: 'Tier 1',
    description: 'Security practices',
    icon: '🔒'
  },
  {
    id: 'global',
    title: 'Global',
    value: '100+',
    description: 'Countries served',
    icon: '🌍'
  }
]

const awards = [
  'Best Trading Platform Forbes Advisor\'s 2024',
  'Best UK Online Broker Forbes Advisor\'s 2024',
  'Best for Cryptocurrency Trading Investopedia 2024',
  'Best Social Trading Platform Forbes Advisor\'s 2024'
]

export default function TrustSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted worldwide
          </h3>
          <p className="text-gray-600">
            Discover why millions of investors from over 100 countries joined eToro
          </p>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {socialProof.map((item) => (
            <div key={item.id} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
              </div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h4>
              <p className="text-xl md:text-2xl font-bold text-emerald-600 mb-1">
                {item.value}
              </p>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Bank Partners Section */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Your funds are held in top-tier institutions
            </h3>
            <p className="text-gray-600">
              The eToro Group works with globally renowned banking partners
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Bank logos would go here - using placeholder boxes for now */}
            {[1, 2, 3, 4, 5].map((bank) => (
              <div
                key={bank}
                className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400 text-sm">Bank {bank}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Awards Section */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              Recognized by industry leaders
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 md:p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {award}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
