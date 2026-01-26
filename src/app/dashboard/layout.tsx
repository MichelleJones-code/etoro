'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/layout/Sidebar';
import { Header } from '@/components/dashboard/layout/Header';
import { Ticker } from '@/components/dashboard/sections/Ticker';
import { useAuthStore } from '@/lib/stores/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasCheckedAuth = useAuthStore((s) => s.hasCheckedAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (hasCheckedAuth && !isAuthenticated) {
      router.replace('/auth/login?next=' + encodeURIComponent(pathname || '/dashboard'));
    }
  }, [hasCheckedAuth, isAuthenticated, pathname, router]);

  if (!hasCheckedAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-200">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  if (hasCheckedAuth && !isAuthenticated) {
    return null;
  }
  const isWatchlistPage = pathname === '/dashboard/watchlists';
  const isWalletPage = pathname === '/dashboard/wallet';
  const isWithdrawPage = pathname === '/dashboard/withdraw';
  const isDiscoverPage = pathname === '/dashboard/discover';
  const isCryptoDetailPage = pathname?.startsWith('/dashboard/discover/crypto/');
  const isCopytraderDetailPage = pathname?.startsWith('/dashboard/discover/copytrader/');
  const isPortfolioPage = pathname === '/dashboard/portfolio';
  const isSettingsPage = pathname === '/dashboard/settings';
  const isKYCPage = pathname === '/dashboard/kyc';
  const isInvestmentPage = pathname === '/dashboard/investment';
  const isInvestmentPlansPage = pathname === '/dashboard/investment/plans';
  const isInvestmentDetailPage = pathname?.startsWith('/dashboard/investment/') && pathname !== '/dashboard/investment/plans';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-slate-200 overflow-x-hidden lg:overflow-hidden">
      {/* 1. Sidebar stays on the left */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* 2. Main wrapper for everything else */}
      <div className="flex flex-col flex-1 min-w-0 w-full lg:w-auto">
        
        {/* 3. Header stays at the top */}
        <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        {/* 4. Ticker sits below the header (hidden on watchlist, wallet, withdraw, discover, crypto detail, copytrader detail, portfolio, settings, and kyc pages) */}
        {!isWatchlistPage && !isWalletPage && !isWithdrawPage && !isDiscoverPage && !isCryptoDetailPage && !isCopytraderDetailPage && !isPortfolioPage && !isSettingsPage && !isKYCPage && !isInvestmentPage && !isInvestmentPlansPage && !isInvestmentDetailPage && <Ticker />}

        {/* 5. Main content area that scrolls */}
        <main className={`flex-1 lg:overflow-y-auto ${isWatchlistPage ? '' : isPortfolioPage ? 'bg-white' : isDiscoverPage ? 'bg-white' : isCryptoDetailPage ? 'bg-white' : isCopytraderDetailPage ? 'bg-white' : isInvestmentDetailPage ? 'bg-white' : isInvestmentPage || isInvestmentPlansPage ? 'bg-white p-4 md:p-8' : isKYCPage ? 'p-4 md:p-8' : 'p-4 md:p-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

