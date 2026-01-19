import type { MarketData, CopyTrader, AcademyCourse, NewsArticle, Position } from '@/lib/types'

// Market data generators
export function generateMockMarketData(symbol: string, name: string, type: MarketData['type']): MarketData {
  const basePrice = Math.random() * 1000 + 10
  const previousClose = basePrice * (1 + (Math.random() - 0.5) * 0.1)
  const currentPrice = previousClose * (1 + (Math.random() - 0.5) * 0.02)
  const change = currentPrice - previousClose
  const changePercent = (change / previousClose) * 100

  return {
    symbol,
    name,
    type,
    price: currentPrice,
    change,
    changePercent,
    volume: Math.floor(Math.random() * 1000000000) + 1000000,
    marketCap: type !== 'currency' ? currentPrice * (Math.random() * 1000000000 + 100000000) : undefined,
    dayHigh: currentPrice * (1 + Math.random() * 0.05),
    dayLow: currentPrice * (1 - Math.random() * 0.05),
    previousClose,
    open: previousClose * (1 + (Math.random() - 0.5) * 0.02),
    timestamp: new Date().toISOString(),
  }
}

export function generateMockStocks(): MarketData[] {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'V', name: 'Visa Inc.' },
    { symbol: 'JNJ', name: 'Johnson & Johnson' },
  ]

  return stocks.map(stock => generateMockMarketData(stock.symbol, stock.name, 'stock'))
}

export function generateMockCryptos(): MarketData[] {
  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
  ]

  return cryptos.map(crypto => generateMockMarketData(crypto.symbol, crypto.name, 'crypto'))
}

export function generateMockETFs(): MarketData[] {
  const etfs = [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust' },
    { symbol: 'IVV', name: 'iShares Core S&P 500 ETF' },
    { symbol: 'VOO', name: 'Vanguard S&P 500 ETF' },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF' },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
  ]

  return etfs.map(etf => generateMockMarketData(etf.symbol, etf.name, 'etf'))
}

export function generateMockCommodities(): MarketData[] {
  const commodities = [
    { symbol: 'GOLD', name: 'Gold' },
    { symbol: 'SILVER', name: 'Silver' },
    { symbol: 'OIL', name: 'Crude Oil' },
    { symbol: 'NATGAS', name: 'Natural Gas' },
    { symbol: 'COPPER', name: 'Copper' },
  ]

  return commodities.map(commodity => generateMockMarketData(commodity.symbol, commodity.name, 'commodity'))
}

export function generateMockCurrencies(): MarketData[] {
  const currencies = [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar' },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar' },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen' },
    { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc' },
    { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar' },
  ]

  return currencies.map(currency => generateMockMarketData(currency.symbol, currency.name, 'currency'))
}

// CopyTrader data generator
export function generateMockCopyTraders(): CopyTrader[] {
  const traders = [
    {
      username: 'ProInvestor2024',
      bio: '5+ years of experience in tech stocks and growth investing',
      country: 'USA',
    },
    {
      username: 'CryptoWhale',
      bio: 'Specializing in cryptocurrencies and blockchain projects',
      country: 'UK',
    },
    {
      username: 'ConservativeGrowth',
      bio: 'Low-risk dividend and blue-chip stock investor',
      country: 'Germany',
    },
    {
      username: 'SwingTraderPro',
      bio: 'Technical analysis based swing trading',
      country: 'Australia',
    },
    {
      username: 'GlobalMacro',
      bio: 'Macroeconomic analysis and international markets',
      country: 'Singapore',
    },
  ]

  return traders.map((trader, index) => ({
    id: (index + 1).toString(),
    username: trader.username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${trader.username}`,
    verified: Math.random() > 0.3,
    followers: Math.floor(Math.random() * 50000) + 1000,
    copiers: Math.floor(Math.random() * 1000) + 100,
    copiedPortfolios: Math.floor(Math.random() * 500) + 50,
    weeklyGain: (Math.random() - 0.2) * 20, // -2% to +18%
    yearlyGain: (Math.random() - 0.1) * 100, // -10% to +90%
    riskScore: Math.floor(Math.random() * 10) + 1,
    minCopyAmount: Math.floor(Math.random() * 900) + 100,
    bio: trader.bio,
    stats: {
      winRate: Math.random() * 40 + 60, // 60% to 100%
      avgProfit: Math.random() * 50 + 5, // 5% to 55%
      profitFactor: Math.random() * 2 + 1.2, // 1.2 to 3.2
      maxDrawdown: Math.random() * 30 + 5, // 5% to 35%
      trades: Math.floor(Math.random() * 1000) + 100,
      daysActive: Math.floor(Math.random() * 1000) + 100,
    },
    recentActivity: Array.from({ length: 5 }, (_, i) => ({
      symbol: ['AAPL', 'BTC', 'ETH', 'GOOGL', 'MSFT'][Math.floor(Math.random() * 5)],
      action: Math.random() > 0.5 ? 'buy' : 'sell',
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    })),
  }))
}

// Academy courses generator
export function generateMockAcademyCourses(): AcademyCourse[] {
  const courses = [
    {
      title: 'Investing 101',
      description: 'Learn the basics of investing and financial markets',
      category: 'Beginner',
      level: 'beginner' as const,
      duration: 45,
      lessons: 12,
    },
    {
      title: 'Technical Analysis',
      description: 'Master chart patterns and technical indicators',
      category: 'Technical Analysis',
      level: 'intermediate' as const,
      duration: 60,
      lessons: 18,
    },
    {
      title: 'Cryptocurrency Trading',
      description: 'Everything you need to know about crypto trading',
      category: 'Cryptocurrency',
      level: 'beginner' as const,
      duration: 50,
      lessons: 15,
    },
    {
      title: 'Risk Management',
      description: 'Protect your capital with proper risk management',
      category: 'Risk Management',
      level: 'intermediate' as const,
      duration: 40,
      lessons: 10,
    },
    {
      title: 'Advanced Options Trading',
      description: 'Complex strategies for experienced traders',
      category: 'Options',
      level: 'advanced' as const,
      duration: 80,
      lessons: 20,
    },
    {
      title: 'Portfolio Management',
      description: 'Build and manage a diversified investment portfolio',
      category: 'Portfolio',
      level: 'intermediate' as const,
      duration: 55,
      lessons: 14,
    },
  ]

  return courses.map((course, index) => ({
    id: (index + 1).toString(),
    ...course,
    thumbnail: `https://picsum.photos/seed/course${index}/400/300.jpg`,
    progress: Math.random() * 100,
    enrolled: Math.random() > 0.5,
    completed: Math.random() > 0.8,
  }))
}

// News articles generator
export function generateMockNewsArticles(): NewsArticle[] {
  const headlines = [
    'Tech Stocks Rally as AI Optimism Grows',
    'Bitcoin Surges Past New Milestone',
    'Federal Reserve Holds Rates Steady',
    'Oil Prices Rise on Supply Concerns',
    'Apple Announces Record Quarterly Earnings',
    'Cryptocurrency Market Shows Strong Recovery',
    'Global Markets React to Economic Data',
    'ESG Investing Reaches New Heights',
  ]

  return headlines.map((title, index) => ({
    id: (index + 1).toString(),
    title,
    summary: `Brief summary of ${title.toLowerCase()} and its market implications...`,
    content: `Full article content about ${title.toLowerCase()}. This would include detailed analysis, quotes from experts, and comprehensive coverage of the market impact.`,
    author: `Author ${index + 1}`,
    category: ['Markets', 'Crypto', 'Stocks', 'Economy'][Math.floor(Math.random() * 4)],
    tags: ['trading', 'investing', 'markets', 'finance'],
    imageUrl: `https://picsum.photos/seed/news${index}/800/400.jpg`,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    relatedSymbols: ['AAPL', 'GOOGL', 'MSFT', 'BTC', 'ETH'].slice(0, Math.floor(Math.random() * 3) + 1),
  }))
}

// Positions generator
export function generateMockPositions(): Position[] {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'BTC', 'ETH']
  
  return Array.from({ length: 5 }, (_, index) => {
    const symbol = symbols[index]
    const amount = Math.random() * 100 + 1
    const openPrice = Math.random() * 500 + 50
    const currentPrice = openPrice * (1 + (Math.random() - 0.5) * 0.2)
    const unrealizedPL = (currentPrice - openPrice) * amount

    return {
      id: (index + 1).toString(),
      symbol,
      type: 'buy',
      amount,
      openPrice,
      currentPrice,
      unrealizedPL,
      realizedPL: 0,
      leverage: 1,
      takeProfit: currentPrice * 1.1,
      stopLoss: currentPrice * 0.9,
      openTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'open' as const,
    }
  })
}