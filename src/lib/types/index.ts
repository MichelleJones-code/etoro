export type KYCStatus = 'none' | 'pending' | 'approved' | 'rejected';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  verified: boolean;
  joinDate: string;
  country: string;
  currency: string;
  isPremium: boolean;
  role?: UserRole;
  kycStatus?: KYCStatus;
}

export interface MarketData {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'etf' | 'commodity' | 'currency';
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  dayHigh: number;
  dayLow: number;
  previousClose: number;
  open: number;
  timestamp: string;
}

export interface Position {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
  openPrice: number;
  currentPrice: number;
  unrealizedPL: number;
  realizedPL: number;
  leverage: number;
  takeProfit?: number;
  stopLoss?: number;
  openTime: string;
  closeTime?: string;
  status: 'open' | 'closed';
}

export interface Order {
  id: string;
  symbol: string;
  type: 'market' | 'limit' | 'stop' | 'stop-limit';
  direction: 'buy' | 'sell';
  amount: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'filled' | 'cancelled';
  createTime: string;
  fillTime?: string;
}

export interface Watchlist {
  id: string;
  name: string;
  symbols: string[];
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'buy' | 'sell' | 'dividend' | 'fee';
  amount: number;
  currency: string;
  symbol?: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Portfolio {
  totalValue: number;
  availableBalance: number;
  investedValue: number;
  totalPL: number;
  totalPLPercent: number;
  positions: Position[];
  transactions: Transaction[];
}

export interface CopyTrader {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: number;
  copiers: number;
  copiedPortfolios: number;
  weeklyGain: number;
  yearlyGain: number;
  riskScore: number;
  minCopyAmount: number;
  bio: string;
  stats: {
    winRate: number;
    avgProfit: number;
    profitFactor: number;
    maxDrawdown: number;
    trades: number;
    daysActive: number;
  };
  recentActivity: Array<{
    symbol: string;
    action: 'buy' | 'sell';
    timestamp: string;
  }>;
}

export interface AcademyCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  lessons: number;
  thumbnail: string;
  progress?: number;
  enrolled?: boolean;
  completed?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  publishedAt: string;
  relatedSymbols: string[];
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number; // 1-5
  comment: string;
  timestamp: string;
  helpful: number;
}

export interface TradeHistory {
  id: string;
  symbol: string;
  action: 'buy' | 'sell';
  amount: number;
  price: number;
  totalValue: number;
  timestamp: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  roiPercent: number;
  durationMonths: number;
  minAmount: number;
  maxAmount?: number;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface OngoingInvestment {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  accruedProfit: number;
  nextPayoutDate?: string;
  nextPayoutAmount?: number;
  roiPercent: number;
}