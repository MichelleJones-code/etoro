import { create } from 'zustand'
import type { MarketData, Position, Order, Portfolio, Transaction } from '@/lib/types'

interface MarketState {
  marketData: Record<string, MarketData>
  portfolio: Portfolio
  watchlist: string[]
  orders: Order[]
  transactions: Transaction[]
  isLoading: boolean
  selectedMarket: string | null
  
  // Actions
  setMarketData: (symbol: string, data: MarketData) => void
  updateMarketPrice: (symbol: string, newPrice: number) => void
  setWatchlist: (symbols: string[]) => void
  addToWatchlist: (symbol: string) => void
  removeFromWatchlist: (symbol: string) => void
  setSelectedMarket: (symbol: string | null) => void
  placeOrder: (order: Omit<Order, 'id' | 'createTime' | 'status'>) => Promise<void>
  cancelOrder: (orderId: string) => void
  closePosition: (positionId: string) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  processWithdrawal: (amount: number, method: string, details: Record<string, string>) => Transaction
}

// Initial portfolio data
const initialPortfolio: Portfolio = {
  totalValue: 1253427.89,
  availableBalance: 867543.78,
  investedValue: 385884.11,
  totalPL: 125.50,
  totalPLPercent: 1.26,
  positions: [],
  transactions: [],
}

// Initial mock withdrawal transactions
const initialWithdrawals: Transaction[] = [
  {
    id: '1',
    type: 'withdraw',
    amount: 25347.82,
    currency: 'USD',
    description: 'Withdrawal via Bank Transfer - Ref: WD-1725123456789',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '2',
    type: 'withdraw',
    amount: 50123.45,
    currency: 'USD',
    description: 'Withdrawal via Wire Transfer - Ref: WD-1724956789012',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '3',
    type: 'withdraw',
    amount: 15678.93,
    currency: 'USD',
    description: 'Withdrawal via Bank Transfer - Ref: WD-1724789012345',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '4',
    type: 'withdraw',
    amount: 7524.67,
    currency: 'USD',
    description: 'Withdrawal via PayPal - Ref: WD-1724620123456',
    timestamp: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '5',
    type: 'withdraw',
    amount: 35421.89,
    currency: 'USD',
    description: 'Withdrawal via Crypto - Ref: WD-1724451234567',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '6',
    type: 'withdraw',
    amount: 12345.21,
    currency: 'USD',
    description: 'Withdrawal via Bank Transfer - Ref: WD-1724282345678',
    timestamp: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '7',
    type: 'withdraw',
    amount: 30187.56,
    currency: 'USD',
    description: 'Withdrawal via Wire Transfer - Ref: WD-1724113456789',
    timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '8',
    type: 'withdraw',
    amount: 45234.14,
    currency: 'USD',
    description: 'Withdrawal via Bank Transfer - Ref: WD-1723944567890',
    timestamp: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '9',
    type: 'withdraw',
    amount: 18234.73,
    currency: 'USD',
    description: 'Withdrawal via Crypto - Ref: WD-1723775678901',
    timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: '10',
    type: 'withdraw',
    amount: 22678.42,
    currency: 'USD',
    description: 'Withdrawal via Bank Transfer - Ref: WD-1723606789012',
    timestamp: new Date(Date.now() - 68 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
]

export const useMarketStore = create<MarketState>((set, get) => ({
  marketData: {},
  portfolio: initialPortfolio,
  watchlist: ['AAPL', 'GOOGL', 'BTC', 'ETH'],
  orders: [],
  transactions: initialWithdrawals,
  isLoading: false,
  selectedMarket: null,

  setMarketData: (symbol: string, data: MarketData) => {
    set(state => ({
      marketData: {
        ...state.marketData,
        [symbol]: data,
      },
    }))
  },

  updateMarketPrice: (symbol: string, newPrice: number) => {
    set(state => {
      const currentData = state.marketData[symbol]
      if (!currentData) return state

      const change = newPrice - currentData.previousClose
      const changePercent = (change / currentData.previousClose) * 100

      return {
        marketData: {
          ...state.marketData,
          [symbol]: {
            ...currentData,
            price: newPrice,
            change,
            changePercent,
            dayHigh: Math.max(currentData.dayHigh, newPrice),
            dayLow: Math.min(currentData.dayLow, newPrice),
            timestamp: new Date().toISOString(),
          },
        },
      }
    })
  },

  setWatchlist: (symbols: string[]) => {
    set({ watchlist: symbols })
  },

  addToWatchlist: (symbol: string) => {
    set(state => ({
      watchlist: state.watchlist.includes(symbol)
        ? state.watchlist
        : [...state.watchlist, symbol],
    }))
  },

  removeFromWatchlist: (symbol: string) => {
    set(state => ({
      watchlist: state.watchlist.filter(s => s !== symbol),
    }))
  },

  setSelectedMarket: (symbol: string | null) => {
    set({ selectedMarket: symbol })
  },

  placeOrder: async (orderData) => {
    const order: Order = {
      ...orderData,
      id: Date.now().toString(),
      createTime: new Date().toISOString(),
      status: 'pending',
    }

    // Simulate order processing
    setTimeout(() => {
      set(state => ({
        orders: state.orders.map(o =>
          o.id === order.id ? { ...o, status: 'filled', fillTime: new Date().toISOString() } : o
        ),
      }))
    }, 2000)

    set(state => ({
      orders: [...state.orders, order],
    }))
  },

  cancelOrder: (orderId: string) => {
    set(state => ({
      orders: state.orders.map(o =>
        o.id === orderId ? { ...o, status: 'cancelled' } : o
      ),
    }))
  },

  closePosition: (positionId: string) => {
    set(state => {
      const position = state.portfolio.positions.find(p => p.id === positionId)
      if (!position) return state

      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'sell',
        amount: position.amount,
        currency: 'USD',
        symbol: position.symbol,
        description: `Closed position in ${position.symbol}`,
        timestamp: new Date().toISOString(),
        status: 'completed',
      }

      return {
        portfolio: {
          ...state.portfolio,
          positions: state.portfolio.positions.filter(p => p.id !== positionId),
          availableBalance: state.portfolio.availableBalance + (position.amount * position.currentPrice),
        },
        transactions: [...state.transactions, transaction],
      }
    })
  },

  addTransaction: (transactionData) => {
    const transaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    }

    set(state => ({
      transactions: [...state.transactions, transaction],
    }))
  },

  processWithdrawal: (amount: number, method: string, details: Record<string, string>) => {
    const state = get()
    
    // Validate withdrawal amount doesn't exceed available balance
    if (amount > state.portfolio.availableBalance) {
      throw new Error('Insufficient balance')
    }

    // Generate reference ID: WD-{timestamp}
    const referenceId = `WD-${Date.now()}`
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdraw',
      amount,
      currency: 'USD',
      description: `Withdrawal via ${method}`,
      timestamp: new Date().toISOString(),
      status: 'pending', // Will be updated to 'completed' after processing
    }

    // Update balance and add transaction
    set(state => ({
      portfolio: {
        ...state.portfolio,
        availableBalance: state.portfolio.availableBalance - amount,
      },
      transactions: [...state.transactions, transaction],
    }))

    // Simulate processing delay, then update status to completed
    setTimeout(() => {
      set(state => ({
        transactions: state.transactions.map(t =>
          t.id === transaction.id ? { ...t, status: 'completed' as const } : t
        ),
      }))
    }, 2000)

    // Add reference ID to transaction description for display
    return {
      ...transaction,
      description: `${transaction.description} - Ref: ${referenceId}`,
    }
  },
}))