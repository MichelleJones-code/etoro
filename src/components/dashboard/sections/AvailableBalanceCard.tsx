'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

interface AvailableBalanceCardProps {
  title?: string;
  actionLabel: string;
  actionIcon: LucideIcon;
  onAction: () => void;
}

export function AvailableBalanceCard({
  title = 'Available Balance',
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
}: AvailableBalanceCardProps) {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, res } = await apiFetch<{ availableBalance?: number } | { error?: string }>(
          '/api/wallet'
        );
        if (!cancelled && res.ok && typeof (data as { availableBalance?: number }).availableBalance === 'number') {
          setAvailableBalance((data as { availableBalance: number }).availableBalance);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-white rounded-lg px-8 py-10">
      <div className="flex justify-between items-start mb-2">
        <span className="tracking-tight font-light text-gray-900">{title}</span>
        <div className="flex flex-col items-end">
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            USD <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center mt-4 justify-between gap-2">
        <div className="text-5xl font-bold text-[#1e272e] mb-6">
          <span className="text-2xl">$</span>
          {isLoading ? '—' : availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-gray-500 font-light">
          Last update at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2.5 rounded-full mb-8"></div>

      <button
        type="button"
        onClick={onAction}
        className="flex items-center gap-2 border border-[#46b445] text-[#46b445] font-bold py-2 px-4 rounded-full text-sm hover:bg-green-50 transition-colors"
      >
        <ActionIcon size={18} /> {actionLabel}
      </button>
    </section>
  );
}
