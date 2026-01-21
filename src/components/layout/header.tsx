'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Globe, User, ChevronDown, HelpCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/stores/auth'
import { SearchInput } from '@/components/ui/form'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    label: 'Trading',
    children: [
      { label: 'Trade Markets on eToro', href: '/trading/markets' },
      { label: 'Trading Platform', href: '/trading/platforms' },
      { label: 'Crypto on eToro', href: '/crypto' },
      { label: 'CFD Trading', href: '/trading/cfd' },
      { label: 'Local Trading', href: '/trading/currency-accounts' },
      { label: 'Demo Account', href: '/trading/demo-account' },
      { label: 'Fees', href: '/trading/fees' },
      { label: 'Market Hours and Events', href: '/trading/market-hours-and-events' },
      { label: 'Professional Account', href: '/trading/professional' },
    ],
  },
  {
    label: 'Investing',
    children: [
      { label: 'Stocks', href: '/stocks' },
      { label: 'Copy Top Investors', href: '/copytrader' },
      { label: 'Investment Portfolios', href: '/investing/portfolios' },
      { label: 'Popular Investor Program', href: '/copytrader/popular-investor' },
      { label: 'Staking Crypto', href: '/crypto/staking' },
      { label: 'eToro Earnings Reports Calendar', href: '/investing/earnings-reports' },
      { label: 'Delta', href: '/investing/delta' },
      { label: 'ESG', href: '/investing/esg' },
    ],
  },
  {
    label: 'Top Markets',
    children: [
      { label: 'Cryptocurrencies', href: '/discover/markets/cryptocurrencies' },
      { label: 'Stocks', href: '/discover/markets/stocks' },
      { label: 'Commodities', href: '/discover/markets/commodities' },
      { label: 'Currencies', href: '/discover/markets/currencies' },
      { label: 'All Markets', href: '/discover/markets' },
    ],
  },
  {
    label: 'Education',
    children: [
      { label: 'eToro Academy', href: '/academy' },
      { label: 'News and Analysis', href: '/news-and-analysis' },
      { label: 'In Depth Analysis', href: '/news-and-analysis/in-depth-analysis' },
      { label: 'Digest & Invest', href: '/digest-and-invest' },
      { label: 'Loud Investing', href: '/academy/loudinvesting' },
      { label: 'Retail Investor Beat', href: '/investing/retail-investor-beat' },
      { label: 'Account Security', href: '/trading/avoid-scam-spam-guide' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'eToro Unlocked', href: 'https://go.etoro.com/en/unlocked/club-subscription' },
      { label: 'About', href: '/about' },
      { label: 'Help Center', href: 'https://help.etoro.com/s/?language=en_GB' },
      { label: 'Investor Relations', href: 'https://investors.etoro.com/' },
      { label: 'Media Center', href: '/about/media-center' },
      { label: 'Careers', href: '/about/careers' },
      { label: 'eToro Club', href: '/about/club' },
      { label: 'eToro Money', href: '/money' },
      { label: 'Socially Responsible', href: '/about/corporate-social-responsibility' },
    ],
  },
]

const languages = [
  { code: 'en', name: 'English (UK)' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh-tw', name: '繁體中文' },
  { code: 'pl', name: 'Polski' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'nb-no', name: 'Norsk' },
  { code: 'pt-pt', name: 'Português' },
  { code: 'sv', name: 'Svenska' },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const languageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const dropdownElement = dropdownRefs.current[openDropdown]
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
          setOpenDropdown(null)
        }
      }
      if (isLanguageOpen && languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown, isLanguageOpen])

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white border-b border-etoro-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-14 py-2">
        {/* Top Bar */}
        <div className="flex items- justify-between  h-16">
          <div className='flex items-center space-x-12'>
          <Link href="/" className="flex items-center space-x-2">
           
          <img src="/images/logo.svg" alt="eToro" className="" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                ref={(el) => { dropdownRefs.current[item.label] = el }}
              >
                <button className="flex items-center text-[17px]   tracking-tight space-x-1 text-gray-700 hover:text-etoro-green transition-colors ">
                  <span>{item.label}</span>
               
                </button>

                {/* Dropdown Menu */}
                {openDropdown === item.label && item.children && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-etoro-gray-200 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href || '#'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-etoro-gray-50 hover:text-etoro-green transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          </div>
          
          <div className="flex items-center space-x-3">
          <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-etoro-green flex tracking-tight items-center gap-x-3 text-lg transition-colors"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
            
            <button

              className="p-2 text-gray-600 hover:text-etoro-green flex tracking-tight items-center gap-x-3 text-lg transition-colors"
            >
                <Globe className="w-5 h-5" />
              English (UK)
            </button>

            <Link
              href="/dashboard"
              className="p-2 text-gray-600 hover:text-etoro-green flex tracking-tight items-center gap-x-3 text-lg transition-colors"
            >
              Login
            </Link>

           


           



         
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-etoro-green transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-etoro-gray-200 py-4">
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-etoro-green transition-colors font-medium"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>

                  {openDropdown === item.label && item.children && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href || '#'}
                          className="block py-2 text-sm text-gray-600 hover:text-etoro-green transition-colors"
                          onClick={() => {
                            setOpenDropdown(null)
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-etoro-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="w-full justify-center"
                    >
                      Logout ({user?.firstName})
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="w-full bg-etoro-green hover:bg-etoro-green-dark">
                        Join Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-full bg-white border-b border-etoro-gray-200 p-4 z-40">
            <div className="container mx-auto">
              <div className="max-w-2xl mx-auto">
                <SearchInput
                  placeholder="Search stocks, crypto, ETFs, traders..."
                  value=""
                  onChange={() => {}}
                  showClearButton
                  onClear={() => setIsSearchOpen(false)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="mt-2 text-sm text-gray-600 hover:text-etoro-green"
                >
                  Press ESC to close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}