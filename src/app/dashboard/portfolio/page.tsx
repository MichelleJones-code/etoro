'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PieChart, Clock, TrendingUp, Users } from 'lucide-react';
import { PortfolioFooter } from '@/components/dashboard/sections/PortfolioFooter';
import { apiFetch } from '@/lib/api/client';

type InvItem = { id: string; planName: string; amount: number; status: string; accruedProfit?: number };

type CopyItem = { id: string; masterId: string; masterUsername: string; amount: number; allocationPercent: number; status: string; startDate: string };

export default function PortfolioPage() {
  const [ongoing, setOngoing] = useState<InvItem[]>([]);
  const [copyItems, setCopyItems] = useState<CopyItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [invRes, copyRes] = await Promise.all([
          apiFetch<InvItem[] | { error?: string }>('/api/investment'),
          apiFetch<{ items?: CopyItem[] }>('/api/portfolio/copy'),
        ]);
        if (!cancelled && invRes.res.ok && Array.isArray(invRes.data)) setOngoing(invRes.data as InvItem[]);
        if (!cancelled && copyRes.res.ok && Array.isArray((copyRes.data as { items?: CopyItem[] }).items)) setCopyItems((copyRes.data as { items: CopyItem[] }).items);
      } catch {
        // keep []
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const activeOngoing = ongoing.filter((i) => i.status === 'active');
  const activeCopies = copyItems.filter((c) => c.status === 'active');
  const hasInvestments = ongoing.length > 0;
  const hasCopies = copyItems.length > 0;
  const hasAny = hasInvestments || hasCopies;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      
      {/* 1. TOP NAV / FILTERS */}
      <div className="p-6 border-b border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-xl font-bold text-[#1e272e]">
            Stocks & Crypto Portfolio
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Realized P/L</div>
            <div className="text-sm font-bold text-gray-800">$0.00</div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><Clock size={20} /></button>
        </div>
      </div>

      {/* 2. ONGOING INVESTMENTS */}
      {activeOngoing.length > 0 && (
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <TrendingUp size={16} /> Ongoing plans ({activeOngoing.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {activeOngoing.map((inv) => (
              <Link
                key={inv.id}
                href={`/dashboard/investment/${inv.id}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm font-medium text-[#1e272e] hover:border-[#19be00] hover:bg-green-50/50 transition-colors"
              >
                {inv.planName} — ${inv.amount.toLocaleString()}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2b. COPY TRADES */}
      {activeCopies.length > 0 && (
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Users size={16} /> Copy trades ({activeCopies.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {activeCopies.map((c) => (
              <Link
                key={c.id}
                href={`/dashboard/discover/copytrader/${c.masterId}`}
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm font-medium text-[#1e272e] hover:border-[#19be00] hover:bg-green-50/50 transition-colors"
              >
                {c.masterUsername} — ${c.amount.toLocaleString()}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. POSITIONS TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm tracking-tight font-light text-gray-800 border-b border-gray-50 sticky top-0 bg-white">
              <th className="px-6 py-4 font-semibold text-center">Market</th>
              <th className="px-6 py-4 font-semibold text-center">Amount</th>
              <th className="px-6 py-4 font-semibold text-center">Units</th>
              <th className="px-6 py-4 font-semibold text-center">Avg. Open</th>
              <th className="px-6 py-4 text-center">Invested</th>
              <th className="px-6 py-4 font-semibold text-center">P/L ($)</th>
              <th className="px-6 py-4 font-semibold text-center">Value</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {!hasAny ? (
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td colSpan={8} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="size-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                      <PieChart size={76} />
                    </div>
                    <div>
                      <p className="text-[#1e272e] text-3xl font-bold">Your portfolio is empty</p>
                      <p className="text-gray-600 font-light tracking-tight">Start exploring investment opportunities by copying people and investing in markets or SmartPortfolios</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {ongoing.map((inv) => {
                  const accrued = inv.accruedProfit ?? 0;
                  const value = inv.amount + accrued;
                  return (
                    <tr key={`inv-${inv.id}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#1e272e]">{inv.planName}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">—</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">—</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">—</td>
                      <td className="px-6 py-4 text-sm text-center font-medium text-[#1e272e]">${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-sm text-center font-medium text-[#19be00]">${accrued.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-[#1e272e]">${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="px-6 py-4 text-center">
                        <Link href={`/dashboard/investment/${inv.id}`} className="text-[#46b445] font-semibold text-sm hover:underline">View</Link>
                      </td>
                    </tr>
                  );
                })}
                {copyItems.map((c) => (
                  <tr key={`copy-${c.id}`} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#1e272e]">Copy: {c.masterUsername}</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-[#1e272e]">${c.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-500">—</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-500">—</td>
                    <td className="px-6 py-4 text-sm text-center font-medium text-[#1e272e]">${c.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-500">—</td>
                    <td className="px-6 py-4 text-sm text-center font-semibold text-[#1e272e]">${c.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/dashboard/discover/copytrader/${c.masterId}`} className="text-[#46b445] font-semibold text-sm hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. PERSISTENT FOOTER */}
      <PortfolioFooter />
    </div>
  );
}