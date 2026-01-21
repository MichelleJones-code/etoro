'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/layout/Sidebar';
import { Header } from '@/components/dashboard/layout/Header';
import { Ticker } from '@/components/dashboard/sections/Ticker';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWatchlistPage = pathname === '/dashboard/watchlists';
  const isWalletPage = pathname === '/dashboard/wallet';
  const isWithdrawPage = pathname === '/dashboard/withdraw';
  const isDiscoverPage = pathname === '/dashboard/discover';
  const isCryptoDetailPage = pathname?.startsWith('/dashboard/discover/crypto/');
  const isCopytraderDetailPage = pathname?.startsWith('/dashboard/discover/copytrader/');
  const isPortfolioPage = pathname === '/dashboard/portfolio';
  const isSettingsPage = pathname === '/dashboard/settings';

  return (
    <div className="flex h-screen bg-slate-200 overflow-hidden">
      {/* 1. Sidebar stays on the left */}
      <Sidebar />

      {/* 2. Main wrapper for everything else */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* 3. Header stays at the top */}
        <Header />

        {/* 4. Ticker sits below the header (hidden on watchlist, wallet, withdraw, discover, crypto detail, copytrader detail, portfolio, and settings pages) */}
        {!isWatchlistPage && !isWalletPage && !isWithdrawPage && !isDiscoverPage && !isCryptoDetailPage && !isCopytraderDetailPage && !isPortfolioPage && !isSettingsPage && <Ticker />}

        {/* 5. Main content area that scrolls */}
        <main className={`flex-1 overflow-y-auto ${isWatchlistPage ? '' : isPortfolioPage ? 'bg-white' : isDiscoverPage ? 'bg-white' : isCryptoDetailPage ? 'bg-white' : isCopytraderDetailPage ? 'bg-white' : 'p-4 md:p-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

