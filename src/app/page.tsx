import Link from 'next/link'
import { ArrowRight, Star, Shield, TrendingUp, Users, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-etoro-green via-etoro-green-light to-white">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-etoro-green/10 text-etoro-green text-sm font-medium mb-6">
                Trusted by 40+ million users worldwide
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Yep, it's<br />
                <span className="etoro-text-gradient">all in one app</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Invest in thousands of stocks, crypto, ETFs… all in one easy-to-use app
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-etoro-green hover:bg-etoro-green-dark text-white px-8 py-4">
                  Join eToro
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="etoro-secondary" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://marketing.etorostatic.com/cache1/hp/v_254/images/covers/half-cover/en-gb/mobile.webp?v=6"
                  alt="eToro Mobile App"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-etoro-green text-white p-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">Terms and Conditions apply.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-12 bg-etoro-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {[
              'Best Trading Platform Forbes Advisor\'s 2024',
              'Best UK Online Broker Forbes Advisor\'s 2024',
              'Best for Cryptocurrency Trading Investopedia 2024',
              'Best Social Trading Platform Forbes Advisor\'s 2024',
            ].map((award, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{award}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why choose eToro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to invest with confidence, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-etoro-green/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-etoro-green" />
                </div>
                <CardTitle>Smart Portfolios</CardTitle>
                <CardDescription>
                  Access top trends with expertly curated portfolios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose from a variety of theme-based portfolios managed by experts, 
                  offering instant diversification across multiple assets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-etoro-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-etoro-blue" />
                </div>
                <CardTitle>CopyTrader™</CardTitle>
                <CardDescription>
                  Automatically copy the moves of top investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find successful traders and automatically copy their trades in real-time. 
                  Learn from the best while potentially growing your portfolio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Bank-Grade Security</CardTitle>
                <CardDescription>
                  Your funds and data are always protected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We work with top-tier financial institutions and use industry-leading 
                  security measures to keep your investments safe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Asset Classes Section */}
      <section className="py-20 bg-etoro-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Diversify your portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Invest in a variety of asset classes — including 20 global stock exchanges 
              and 100 cryptocurrencies — while managing all of your holdings in one place
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { name: 'Apple', icon: '🍎', color: 'bg-gray-800' },
              { name: 'Bitcoin', icon: '₿', color: 'bg-orange-500' },
              { name: 'Ethereum', icon: 'Ξ', color: 'bg-blue-600' },
              { name: 'iShares', icon: '📊', color: 'bg-blue-800' },
              { name: 'Netflix', icon: '📺', color: 'bg-red-600' },
              { name: 'Airbnb', icon: '🏠', color: 'bg-pink-500' },
            ].map((asset, index) => (
              <div
                key={index}
                className={`${asset.color} text-white px-6 py-3 rounded-lg font-semibold shadow-md`}
              >
                <span className="mr-2">{asset.icon}</span>
                {asset.name}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="etoro-primary" size="lg">
              Explore Top Markets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Trade on the go
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Take control of your investments anywhere, anytime with our mobile app. 
                Get real-time alerts, manage your portfolio, and never miss an opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="etoro-primary" size="lg" className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download App
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://picsum.photos/seed/etoro-mobile/400/600.jpg"
                alt="eToro Mobile App"
                className="mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-etoro-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to start investing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of investors who trust eToro for their financial journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-etoro-green hover:bg-gray-100">
              Join Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-etoro-green">
              Try Demo Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}