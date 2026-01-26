'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, ChevronRight, PieChart, Plus } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

type OngoingItem = {
  id: string;
  planName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  accruedProfit: number;
  nextPayoutDate?: string;
  nextPayoutAmount?: number;
  roiPercent: number;
};

function SummaryCard({
  label,
  value,
  subValue,
  color,
}: {
  label: string;
  value: string;
  subValue?: string;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="text-xs font-bold text-gray-400 uppercase mb-2">{label}</div>
      <div className={`text-3xl font-black ${color}`}>{value}</div>
      {subValue != null && <div className="text-[10px] font-bold text-gray-500 mt-1">{subValue}</div>}
    </div>
  );
}

export default function InvestmentPage() {
  const [ongoing, setOngoing] = useState<OngoingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, res } = await apiFetch<OngoingItem[]>('/api/investment');
        if (res.ok && Array.isArray(data)) setOngoing(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const active = ongoing.filter((o) => o.status === 'active');
  const balance = active.reduce((s, o) => s + o.amount, 0);
  const accrued = ongoing.reduce((s, o) => s + o.accruedProfit, 0);
  const totalInvested = ongoing.reduce((s, o) => s + o.amount, 0);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatPayout = (inv: OngoingItem) => {
    if (inv.nextPayoutDate && inv.nextPayoutAmount != null) {
      return `${formatDate(inv.nextPayoutDate)} · $${inv.nextPayoutAmount.toFixed(2)}`;
    }
    return '—';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* 1. Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Investment Balance"
          value={`$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subValue="Active capital in plans"
          color="text-[#1e272e]"
        />
        <SummaryCard
          label="Ongoing Investments"
          value={active.length.toString()}
          subValue={active.length > 0 ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} total` : undefined}
          color="text-[#4ba3f5]"
        />
        <SummaryCard
          label="Accrued Profits"
          value={`$${accrued.toFixed(2)}`}
          subValue="Total returns to date"
          color="text-[#46b445]"
        />
        <SummaryCard
          label="Total Invested"
          value={`$${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subValue="All time"
          color="text-[#1e272e]"
        />
      </div>

      {/* 2. Browse plans CTA */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#1e272e] tracking-tight">Ongoing Investments</h1>
        <Link
          href="/dashboard/investment/plans"
          className="flex items-center gap-2 border border-[#46b445] text-[#46b445] font-bold py-2 px-4 rounded-full text-sm hover:bg-green-50 transition-colors"
        >
          <Plus size={18} /> Browse Investment Plans
        </Link>
      </div>

      {/* 3. Ongoing investments table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Accrued Profit</th>
                <th className="px-6 py-4">Next Payout</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ongoing.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                        <PieChart size={76} />
                      </div>
                      <div>
                        <p className="text-[#1e272e] text-3xl font-bold">No ongoing investments</p>
                        <p className="text-gray-600 font-light tracking-tight mt-1">
                          Browse plans to get started and grow your wealth.
                        </p>
                      </div>
                      <Link
                        href="/dashboard/investment/plans"
                        className="flex items-center gap-2 bg-[#19be00] hover:bg-[#15a300] text-white font-bold py-2.5 px-6 rounded-full text-sm transition-colors"
                      >
                        <TrendingUp size={18} /> Browse Investment Plans
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                ongoing.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#1e272e]">{inv.planName}</div>
                      <div className="text-[10px] text-gray-400">{inv.roiPercent}% ROI</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-black text-[#19be00]">
                        ${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(inv.startDate)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          inv.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : inv.status === 'completed'
                              ? 'bg-gray-100 text-gray-600'
                              : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#46b445]">
                        +${inv.accruedProfit.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatPayout(inv)}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/investment/${inv.id}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4ba3f5] hover:text-[#3d8ad4]"
                      >
                        View <ChevronRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}
