import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import AppFooter from '@/components/layout/AppFooter'

export const metadata: Metadata = {
  title: 'Invest With eToro™ | Stocks, Crypto & ETFs in One Powerful App',
  description:
    'Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app. Copy top investors, discover new markets, and grow your portfolio with eToro.',
  keywords: ['investing', 'stocks', 'crypto', 'ETFs', 'trading', 'copy trading', 'eToro'],
  openGraph: {
    title: 'Invest With eToro™ | Stocks, Crypto & ETFs',
    description: 'Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </div>
      </body>
    </html>
  )
}
