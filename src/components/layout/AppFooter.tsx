'use client'

const footerLinks = {
  topInstruments: [
    { id: 1, title: 'Bitcoin (BTC)', href: '#' },
    { id: 2, title: 'Ethereum (ETH)', href: '#' },
    { id: 3, title: 'Apple (AAPL)', href: '#' },
    { id: 4, title: 'Tesla (TSLA)', href: '#' },
    { id: 5, title: 'Amazon (AMZN)', href: '#' }
  ],
  support: [
    { id: 1, title: 'Help Center', href: '#' },
    { id: 2, title: 'Contact Us', href: '#' },
    { id: 3, title: 'Customer Service', href: '#' },
    { id: 4, title: 'FAQ', href: '#' },
    { id: 5, title: 'System Status', href: '#' }
  ],
  learnMore: [
    { id: 1, title: 'About eToro', href: '#' },
    { id: 2, title: 'How it works', href: '#' },
    { id: 3, title: 'Trading Academy', href: '#' },
    { id: 4, title: 'Popular Investors', href: '#' },
    { id: 5, title: 'News & Insights', href: '#' }
  ],
  aboutUs: [
    { id: 1, title: 'Company', href: '#' },
    { id: 2, title: 'Careers', href: '#' },
    { id: 3, title: 'Press', href: '#' },
    { id: 4, title: 'Partnerships', href: '#' },
    { id: 5, title: 'Blog', href: '#' }
  ],
  privacyRegulation: [
    { id: 1, title: 'Terms & Conditions', href: '#' },
    { id: 2, title: 'Privacy Policy', href: '#' },
    { id: 3, title: 'Cookie Policy', href: '#' },
    { id: 4, title: 'Regulation', href: '#' }
  ],
  partnersPromotions: [
    { id: 1, title: 'Affiliates', href: '#' },
    { id: 2, title: 'Partners', href: '#' },
    { id: 3, title: 'Promotions', href: '#' },
    { id: 4, title: 'Refer a Friend', href: '#' }
  ]
}

const socialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/eToro', icon: 'X' },
  { name: 'Facebook', url: 'https://www.facebook.com/eToro', icon: 'F' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/etoro/', icon: 'in' },
  { name: 'Instagram', url: 'https://www.instagram.com/etoro_official/', icon: 'IG' }
]

export default function AppFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Top Instruments */}
          <div>
            <h4 className="text-white font-semibold mb-4">Top instruments</h4>
            <ul className="space-y-2">
              {footerLinks.topInstruments.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-emerald-500 transition-colors text-sm">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-emerald-500 transition-colors text-sm">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h4 className="text-white font-semibold mb-4">Learn more</h4>
            <ul className="space-y-2">
              {footerLinks.learnMore.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-emerald-500 transition-colors text-sm">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="hover:text-emerald-500 transition-colors text-sm">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Privacy and Regulation */}
            <div>
              <h4 className="text-white font-semibold mb-4">Privacy and Regulation</h4>
              <ul className="space-y-2">
                {footerLinks.privacyRegulation.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="hover:text-emerald-500 transition-colors text-sm">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partners and Promotions */}
            <div>
              <h4 className="text-white font-semibold mb-4">Partners and Promotions</h4>
              <ul className="space-y-2">
                {footerLinks.partnersPromotions.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="hover:text-emerald-500 transition-colors text-sm">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & App Download */}
            <div>
              <h4 className="text-white font-semibold mb-4">Find Us On</h4>

              {/* Social Links */}
              <div className="flex space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    title={social.name}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  >
                    <span className="text-xs font-bold">{social.icon}</span>
                  </a>
                ))}
              </div>

              {/* App Store Buttons */}
              <div className="space-y-2">
                <a
                  href="https://apps.apple.com"
                  className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.3-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com"
                  className="inline-flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400 space-y-4">
            <p>
              eToro (Europe) Ltd., a Financial Services Company authorised and regulated by the Cyprus
              Securities Exchange Commission (CySEC) under the license # 109/10. Registered in Cyprus
              under Company No. HE 200585. Registered Office: 4 Profiti Ilia Str., Kanika Business
              Centre, 7th floor, Germasogeia, 4046, Limassol, Cyprus.
            </p>
            <p>
              <strong>Risk Warning:</strong> Your capital is at risk. Past performance is not an
              indication of future results. Crypto investments are risky and do not benefit from
              protections available to clients receiving MiFID regulated investment services.
            </p>
            <p className="text-center">
              © 2006-2026 eToro - Your Social Investment Network, All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
