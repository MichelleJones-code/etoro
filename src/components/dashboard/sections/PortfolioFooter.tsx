'use client';

import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api/client';

interface FooterStatProps {
  label: string;
  value: string;
  operator?: string;
}

const FooterStat = ({ label, value, operator }: FooterStatProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative py-4 group hover:bg-white/40 transition-colors">
      {operator && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-gray-300 font-light select-none">
          {operator}
        </span>
      )}
      <div className="text-[22px] font-bold text-[#1e272e] tracking-tight">
        {value}
      </div>
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
};

type InvItem = { id: string; amount: number; accruedProfit: number };

export const PortfolioFooter = () => {
  const [cashAvailable, setCashAvailable] = useState<number | null>(null);
  const [investments, setInvestments] = useState<InvItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [walletRes, invRes] = await Promise.all([
          apiFetch<{ availableBalance?: number } | { error?: string }>('/api/wallet'),
          apiFetch<InvItem[] | { error?: string }>('/api/investment'),
        ]);
        if (cancelled) return;
        if (walletRes.res.ok && typeof (walletRes.data as { availableBalance?: number }).availableBalance === 'number') {
          setCashAvailable((walletRes.data as { availableBalance: number }).availableBalance);
        }
        if (invRes.res.ok && Array.isArray(invRes.data)) {
          setInvestments(invRes.data as InvItem[]);
        }
      } catch {
        // keep defaults
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const cash = cashAvailable ?? 0;
  const totalInvested = investments.reduce((s, i) => s + (i.amount ?? 0), 0);
  const accrued = investments.reduce((s, i) => s + (i.accruedProfit ?? 0), 0);
  const portfolioValue = cash + totalInvested + accrued;

  const fmt = (n: number) => (n != null && !Number.isNaN(n) ? `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—');
  const stats = [
    { label: 'Cash Available', value: cashAvailable != null ? fmt(cash) : '—' },
    { label: 'Total Invested', value: fmt(totalInvested), operator: '+' as const },
    { label: 'Profit/Loss', value: fmt(accrued), operator: '+' as const },
    { label: 'Portfolio Value', value: cashAvailable != null ? fmt(portfolioValue) : '—', operator: '=' as const },
  ];

  return (
    <footer className="bg-[#f4f7f9] border-t border-gray-200 w-full sticky bottom-0 z-20">
      <div className="flex divide-x divide-gray-200">
        {stats.map((stat) => (
          <FooterStat
            key={stat.label}
            label={stat.label}
            value={stat.value}
            operator={stat.operator}
          />
        ))}
      </div>
    </footer>
  );
};