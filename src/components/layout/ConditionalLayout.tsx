'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import AppFooter from '@/components/layout/AppFooter';
import { AuthInit } from '@/components/layout/AuthInit';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isDashboardRoute || isAdminRoute) {
    return <><AuthInit />{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AuthInit />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

