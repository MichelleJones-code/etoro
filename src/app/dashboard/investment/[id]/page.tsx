'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

type OngoingItem = {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  accruedProfit: number;
  nextPayoutDate?: string;
  nextPayoutAmount?: number;
  roiPercent: number;
  plan?: {
    description?: string;
    roiPercent?: number;
    durationMonths?: number;
    minAmount?: number;
    maxAmount?: number;
    riskLevel?: string;
  } | null;
};

export default function InvestmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [inv, setInv] = useState<OngoingItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data, res } = await apiFetch<OngoingItem | { error?: string }>(`/api/investment/${id}`);
        if (res.ok && !('error' in (data as object))) setInv(data as OngoingItem);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const progress =
    inv && inv.status === 'active'
      ? Math.min(
          100,
          Math.max(
            0,
            ((Date.now() - new Date(inv.startDate).getTime()) /
              (new Date(inv.endDate).getTime() - new Date(inv.startDate).getTime())) *
              100
          )
        )
      : inv?.status === 'completed'
        ? 100
        : 0;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center text-gray-500">Loading...</div>
    );
  }

  if (!inv) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        <p className="text-xl font-semibold text-[#1e272e] mb-2">Investment not found</p>
        <p className="text-gray-600 mb-6">This investment may have been removed or the link is invalid.</p>
        <Link
          href="/dashboard/investment"
          className="text-[#19be00] font-semibold hover:underline"
        >
          Back to Investment
        </Link>
      </div>
    );
  }

  const plan = inv.plan;

  return (
    <div className="w-full bg-white">
      {/* Breadcrumbs */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-1 text-xs tracking-tight font-semibold text-gray-600">
          <Link href="/dashboard/investment" className="hover:text-[#1e272e] transition-colors">
            Investment
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1e272e] font-semibold">{inv.planName}</span>
        </div>
      </div>

      {/* Hero / header */}
      <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-[#1e272e]">{inv.planName}</h1>
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
            </div>
            <p className="text-sm text-gray-600">{inv.roiPercent}% ROI · {formatDate(inv.startDate)} – {formatDate(inv.endDate)}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-right">
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Amount</div>
              <div className="text-xl font-bold text-[#1e272e]">${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Accrued Profit</div>
              <div className="text-xl font-bold text-[#46b445]">+${inv.accruedProfit.toFixed(2)}</div>
            </div>
            {inv.nextPayoutDate && inv.nextPayoutAmount != null && (
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Next Payout</div>
                <div className="text-xl font-bold text-[#1e272e]">${inv.nextPayoutAmount.toFixed(2)}</div>
                <div className="text-xs text-gray-500">{formatDate(inv.nextPayoutDate)}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview + progress */}
      <div className="px-8 py-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-[#1e272e] mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Invested</div>
              <div className="font-bold text-[#1e272e]">${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Start – End</div>
              <div className="font-semibold text-[#1e272e] text-sm">{formatDate(inv.startDate)} – {formatDate(inv.endDate)}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <TrendingUp className="w-5 h-5 text-[#19be00]" />
            </div>
            <div>
              <div className="text-xs text-gray-500">ROI</div>
              <div className="font-bold text-[#46b445]">{inv.roiPercent}%</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Progress</div>
              <div className="font-bold text-[#1e272e]">{progress.toFixed(0)}%</div>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Start</span>
            <span>End</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#19be00] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Next payout (when applicable) */}
      {inv.nextPayoutDate && inv.nextPayoutAmount != null && inv.status === 'active' && (
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#1e272e] mb-4">Next Payout</h2>
          <div className="bg-gray-50 rounded-lg p-4 inline-block">
            <div className="font-semibold text-[#1e272e]">${inv.nextPayoutAmount.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Estimated: {formatDate(inv.nextPayoutDate)}</div>
          </div>
        </div>
      )}

      {/* Plan terms (from plan) */}
      {plan && (
        <div className="px-8 py-6">
          <h2 className="text-lg font-bold text-[#1e272e] mb-4">Plan Terms</h2>
          <div className="bg-gray-50 rounded-lg p-6 max-w-md">
            {plan.description && <p className="text-sm text-gray-600 mb-4">{plan.description}</p>}
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-gray-500">ROI</dt>
              <dd className="font-semibold text-[#1e272e]">{plan.roiPercent ?? inv.roiPercent}%</dd>
              <dt className="text-gray-500">Duration</dt>
              <dd className="font-semibold text-[#1e272e]">{plan.durationMonths} months</dd>
              <dt className="text-gray-500">Min. amount</dt>
              <dd className="font-semibold text-[#1e272e]">${(plan.minAmount ?? 0).toLocaleString()}</dd>
              {plan.maxAmount != null && (
                <>
                  <dt className="text-gray-500">Max. amount</dt>
                  <dd className="font-semibold text-[#1e272e]">${plan.maxAmount.toLocaleString()}</dd>
                </>
              )}
              {plan.riskLevel && (
                <>
                  <dt className="text-gray-500">Risk</dt>
                  <dd className="font-semibold text-[#1e272e] capitalize">{plan.riskLevel}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
