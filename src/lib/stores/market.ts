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
}

// Initial portfolio data
const initialPortfolio: Portfolio = {
  totalValue: 10000,
  availableBalance: 7500,
  investedValue: 2500,
  totalPL: 125.50,
  totalPLPercent: 1.26,
  positions: [],
  transactions: [],
}

export const useMarketStore = create<MarketState>((set, get) => ({
  marketData: {},
  portfolio: initialPortfolio,
  watchlist: ['AAPL', 'GOOGL', 'BTC', 'ETH'],
  orders: [],
  transactions: [],
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
}))