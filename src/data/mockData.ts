import type { MarketData, CopyTrader, AcademyCourse, NewsArticle, Position, Review, TradeHistory } from '@/lib/types'

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
      username: 'ESDRASVasquez',
      bio: '5+ years of experience in tech stocks and growth investing. Focus on long-term value creation.',
      country: 'USA',
      yearlyGain: 52.48,
    },
    {
      username: 'JeppeKirkBonde',
      bio: 'Specializing in cryptocurrencies and blockchain projects. Active trader with strong technical analysis skills.',
      country: 'UK',
      yearlyGain: 34.21,
    },
    {
      username: 'CPHequities',
      bio: 'Low-risk dividend and blue-chip stock investor. Conservative approach with steady returns.',
      country: 'Germany',
      yearlyGain: 28.93,
    },
    {
      username: 'Wesl3y',
      bio: 'Technical analysis based swing trading. Focus on short to medium-term opportunities.',
      country: 'Australia',
      yearlyGain: 41.67,
    },
    {
      username: 'Rubymza',
      bio: 'Macroeconomic analysis and international markets. Diversified portfolio approach.',
      country: 'Singapore',
      yearlyGain: 36.52,
    },
    {
      username: 'BalanceInvesting',
      bio: 'Balanced portfolio management with focus on risk-adjusted returns and diversification.',
      country: 'USA',
      yearlyGain: 31.84,
    },
  ]

  return traders.map((trader, index) => ({
    id: (index + 1).toString(),
    username: trader.username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${trader.username}`,
    verified: index < 3, // First 3 are verified
    followers: Math.floor(Math.random() * 50000) + 1000,
    copiers: Math.floor(Math.random() * 1000) + 100,
    copiedPortfolios: Math.floor(Math.random() * 500) + 50,
    weeklyGain: (Math.random() - 0.2) * 20, // -2% to +18%
    yearlyGain: trader.yearlyGain || (Math.random() - 0.1) * 100, // Use provided return or random
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

// Reviews generator
export function generateMockReviews(traderId: string): Review[] {
  const comments = [
    'Great trader! I\'ve been copying for 3 months and seeing consistent returns.',
    'Very professional approach. The risk management is excellent.',
    'One of the best traders I\'ve copied. Highly recommended!',
    'Good performance but sometimes takes too many risks.',
    'Solid returns over the past year. Will continue copying.',
    'The trader is responsive and shares good insights.',
    'Not the best performance recently, but still learning.',
    'Excellent win rate and consistent profits.',
    'I appreciate the transparency in trading decisions.',
    'Good for beginners looking to learn from experienced traders.',
  ]

  const usernames = [
    'TraderJohn', 'CryptoQueen', 'InvestorMike', 'StockGuru', 'MarketMaster',
    'TradingPro', 'FinanceFan', 'PortfolioKing', 'WealthBuilder', 'SmartInvestor',
  ]

  return Array.from({ length: Math.floor(Math.random() * 8) + 5 }, (_, index) => {
    const username = usernames[index % usernames.length]
    return {
      id: `${traderId}-review-${index + 1}`,
      userId: `user-${index + 1}`,
      username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars mostly, occasional 3
      comment: comments[index % comments.length],
      timestamp: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: Math.floor(Math.random() * 20),
    }
  })
}

// Trade history generator
export function generateMockTradeHistory(traderId: string): TradeHistory[] {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'BTC', 'ETH', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX']
  const actions: ('buy' | 'sell')[] = ['buy', 'sell']
  
  return Array.from({ length: 30 }, (_, index) => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]
    const action = actions[Math.floor(Math.random() * actions.length)]
    const amount = Math.random() * 100 + 1
    const price = Math.random() * 500 + 50
    const totalValue = amount * price

    return {
      id: `${traderId}-trade-${index + 1}`,
      symbol,
      action,
      amount: Math.round(amount * 100) / 100,
      price: Math.round(price * 100) / 100,
      totalValue: Math.round(totalValue * 100) / 100,
      timestamp: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: Math.random() > 0.1 ? 'completed' : (Math.random() > 0.5 ? 'pending' : 'cancelled'),
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}