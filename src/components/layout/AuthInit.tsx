'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth';

export function AuthInit() {
  const fetchMe = useAuthStore((s) => s.fetchMe);
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  return null;
}
