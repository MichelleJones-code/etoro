'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import AppFooter from '@/components/layout/AppFooter';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}

