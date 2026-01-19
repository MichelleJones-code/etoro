import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/lib/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: {
    email: string
    username: string
    firstName: string
    lastName: string
    password: string
  }) => Promise<boolean>
  updateProfile: (updates: Partial<User>) => void
}

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@etoro.com',
    username: 'demo_trader',
    firstName: 'Demo',
    lastName: 'Trader',
    verified: true,
    joinDate: '2023-01-15',
    country: 'United States',
    currency: 'USD',
    isPremium: false,
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const user = mockUsers.find(u => u.email === email)
        
        if (user && password === 'demo123') {
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
        
        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      register: async (userData) => {
        set({ isLoading: true })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          verified: false,
          joinDate: new Date().toISOString().split('T')[0],
          country: 'United States',
          currency: 'USD',
          isPremium: false,
        }
        
        mockUsers.push(newUser)
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        })
        
        return true
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          const updatedUser = { ...user, ...updates }
          set({ user: updatedUser })
        }
      },
    }),
    {
      name: 'etoro-auth',
    }
  )
)