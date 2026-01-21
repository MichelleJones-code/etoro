import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

const footerLinks = {
  topInstruments: [
    { label: 'Bitcoin (BTC)', href: '/auth/login' },
    { label: 'Ethereum (ETH)', href: '/auth/login' },
    { label: 'Shiba (in Millions)', href: '/auth/login' },
    { label: 'Tesla', href: '/auth/login' },
    { label: 'Apple', href: '/auth/login' },
    { label: 'Nio', href: '/auth/login' },
  ],
  support: [
    { label: 'Help Center', href: 'https://help.etoro.com/s/?language=en_GB' },
    { label: 'How to deposit', href: '/auth/login' },
    { label: 'How to withdraw', href: '/auth/login' },
    { label: 'How to Open an Account', href: '/auth/login' },
    { label: 'How to verify your account', href: '/auth/login' },
    { label: 'Customer Service', href: '/auth/login' },
    { label: 'Client Vulnerability', href: '/auth/login' },
  ],
  learnMore: [
    { label: 'How CopyTrading Works', href: '/auth/login' },
    { label: 'Responsible Trading', href: '/auth/login' },
    { label: 'Interest on Balance', href: '/auth/login' },
    { label: 'What is Leverage & Margin', href: '/auth/login' },
    { label: 'Buy and Sell Explained', href: '/auth/login' },
    { label: 'Tax Report', href: '/auth/login' },
    { label: 'eToro Academy', href: '/auth/login' },
  ],
  downloadApp: [
    { label: 'App Store', href: 'https://etoro.onelink.me/2615279504/3ff5f19f' },
    { label: 'Google Play', href: 'https://etoro.onelink.me/2615279504/3ff5f19f' },
  ],
  aboutUs: [
    { label: 'About eToro', href: '/auth/login' },
    { label: 'eToro Reviews', href: '/auth/login' },
    { label: 'Careers', href: '/auth/login' },
    { label: 'Our offices', href: '/auth/login' },
    { label: 'Accessibility', href: '/auth/login' },
    { label: 'Imprint', href: '/auth/login' },
  ],
  privacyAndRegulation: [
    { label: 'eToro Cookie Policy', href: '/auth/login' },
    { label: 'Privacy Policy', href: '/auth/login' },
    { label: 'Regulation & License', href: '/auth/login' },
    { label: 'General Risk Disclosure', href: '/auth/login' },
    { label: 'Terms & Conditions', href: '/auth/login' },
    { label: 'Key Information Documents', href: '/auth/login' },
  ],
  partnersAndPromotions: [
    { label: 'Invite a friend', href: '/auth/login' },
    { label: 'Affiliate Program', href: 'https://www.etoropartners.com/' },
    { label: 'eToro Club', href: '/auth/login' },
    { label: 'Investment Insurance', href: '/auth/login' },
    { label: 'Partner Smart Portfolios', href: '/auth/login' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/eToro', label: 'Twitter' },
  { icon: Facebook, href: 'https://www.facebook.com/eToro', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/etoro/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/etoro_official/', label: 'Instagram' },
  { icon: Youtube, href: 'https://www.youtube.com/etoro', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-etoro-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Top Instruments */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Top Instruments</h3>
            <ul className="space-y-2">
              {footerLinks.topInstruments.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-etoro-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-etoro-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Learn More</h3>
            <ul className="space-y-2">
              {footerLinks.learnMore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-etoro-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">About Us</h3>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-etoro-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy & Regulation */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Privacy & Regulation</h3>
            <ul className="space-y-2">
              {footerLinks.privacyAndRegulation.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-etoro-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Download App Section */}
        <div className="border-t border-etoro-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold mb-2">Download our app from the stores</h3>
              <div className="flex space-x-4">
                {footerLinks.downloadApp.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="bg-etoro-gray-800 hover:bg-etoro-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold mb-2">Find Us On</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="bg-etoro-gray-800 hover:bg-etoro-gray-700 p-2 rounded-lg transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-etoro-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Regulatory Information */}
            <div className="space-y-2 text-sm text-etoro-gray-400">
              <p>
                eToro (Europe) Ltd., a Financial Services Company authorised and regulated by the Cyprus Securities Exchange Commission (CySEC) under the license # 109/10. 
                Registered in Cyprus under Company No. HE 200585. 
                Registered Office: 4 Profiti Ilia Str., Kanika Business Centre, 7th floor, Germasogeia, 4046, Limassol, Cyprus.
              </p>
              <p>
                eToro (UK) Ltd, a Financial Services Company authorised and regulated by the Financial Conduct Authority (FCA) under the license FRN 583263. 
                Registered Office: 24th floor, One Canada Square, Canary Wharf, London E14 5AB.
              </p>
              <p>
                eToro AUS Capital Limited is authorised by the Australian Securities and Investments Commission (ASIC) to provide financial services under Australian Financial Services License 491139. 
                Registered Office: Level 3, 60 Castlereagh Street, Sydney NSW 2000, Australia.
              </p>
            </div>

            {/* Risk Disclaimer */}
            <div className="space-y-4">
              <div className="text-sm text-etoro-gray-400">
                <p className="mb-2">
                  <strong>Risk Warning:</strong> Past performance is not an indication of future results
                </p>
                <p>
                  You should seek advice from an independent and suitably licensed financial advisor and ensure that you have the risk appetite, 
                  relevant experience and knowledge before you decide to trade. Under no circumstances shall eToro have any liability to any person 
                  or entity for any direct, indirect, special, consequential or incidental damages whatsoever.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/login" className="text-etoro-green hover:text-etoro-green-light text-sm">
                  General Risk Disclosure
                </Link>
                <Link href="/auth/login" className="text-etoro-green hover:text-etoro-green-light text-sm">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-etoro-gray-800 pt-6 text-center text-sm text-etoro-gray-400">
            <p>Copyright © 2006-2026 eToro - Your Social Investment Network, All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}