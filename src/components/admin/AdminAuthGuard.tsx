'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasCheckedAuth = useAuthStore((s) => s.hasCheckedAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hasCheckedAuth) return;
    if (!isAuthenticated) {
      router.replace('/auth/login?next=' + encodeURIComponent(pathname || '/admin'));
      return;
    }
    if (user?.role !== 'admin') {
      router.replace('/dashboard');
    }
  }, [hasCheckedAuth, isAuthenticated, user?.role, pathname, router]);

  if (!hasCheckedAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }
  if (hasCheckedAuth && !isAuthenticated) {
    return null;
  }
  if (hasCheckedAuth && isAuthenticated && user?.role !== 'admin') {
    return null;
  }
  return <>{children}</>;
}
