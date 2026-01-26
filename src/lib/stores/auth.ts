import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/lib/types';
import { apiFetch } from '@/lib/api/client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCheckedAuth: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => Promise<boolean>;
  fetchMe: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasCheckedAuth: false,
      isLoading: false,

      login: async (emailOrUsername: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data, res } = await apiFetch<{ user: User } | { error: string }>(
            '/api/auth/login',
            { method: 'POST', body: { emailOrUsername, password } }
          );
          if (!res.ok) {
            set({ isLoading: false });
            return false;
          }
          const { user } = data as { user: User };
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          await apiFetch('/api/auth/logout', { method: 'POST' });
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const { data, res } = await apiFetch<{ user: User } | { error: string }>(
            '/api/auth/signup',
            { method: 'POST', body: userData }
          );
          if (!res.ok) {
            set({ isLoading: false });
            return false;
          }
          const { user } = data as { user: User };
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },

      fetchMe: async () => {
        try {
          const { data, res } = await apiFetch<{ user: User } | { error: string }>('/api/auth/me');
          if (res.ok) {
            const { user } = data as { user: User };
            set({ user, isAuthenticated: true, hasCheckedAuth: true });
          } else {
            set({ user: null, isAuthenticated: false, hasCheckedAuth: true });
          }
        } catch {
          set({ user: null, isAuthenticated: false, hasCheckedAuth: true });
        }
      },

      updateProfile: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    { name: 'etoro-auth', partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }) }
  )
);
