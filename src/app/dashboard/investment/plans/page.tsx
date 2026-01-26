'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { InvestPlanModal } from '@/components/dashboard/sections/InvestPlanModal';
import type { InvestmentPlan } from '@/lib/types';
import { apiFetch } from '@/lib/api/client';

function PlanCard({
  plan,
  onInvest,
}: {
  plan: InvestmentPlan;
  onInvest: () => void;
}) {
  return (
    <div className="bg-white rounded-lg py-6 px-6 border border-gray-200  transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#1e272e]">{plan.name}</h3>
        {plan.riskLevel && (
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              plan.riskLevel === 'low'
                ? 'bg-green-100 text-green-700'
                : plan.riskLevel === 'medium'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'
            }`}
          >
            {plan.riskLevel}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">{plan.description}</p>
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-[#19be00]" />
          <span className="text-gray-600">ROI</span>
          <span className="font-bold text-[#1e272e]">{plan.roiPercent}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">Duration</span>
          <span className="font-semibold text-[#1e272e]">{plan.durationMonths} mo</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">Min</span>
          <span className="font-semibold text-[#1e272e]">${plan.minAmount.toLocaleString()}</span>
        </div>
      </div>
      <button
        onClick={onInvest}
        className="w-full py-2.5 rounded-full border border-[#00b066] bg-white text-[#00b066] font-semibold text-sm hover:bg-[#00b066] hover:text-white transition-colors"
      >
        Invest
      </button>
    </div>
  );
}

export default function InvestmentPlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalPlan, setModalPlan] = useState<InvestmentPlan | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, res } = await apiFetch<InvestmentPlan[]>('/api/investment/plans');
        if (res.ok && Array.isArray(data)) setPlans(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 text-xs tracking-tight font-semibold text-gray-600 mb-6">
        <Link href="/dashboard" className="hover:text-[#1e272e] transition-colors">Dashboard</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/dashboard/investment" className="hover:text-[#1e272e] transition-colors">Investment</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1e272e] font-semibold">Plans</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-[#1e272e] tracking-tight mb-2">Investment Plans</h1>
      <p className="text-gray-600 font-light tracking-tight mb-8">
        Choose a plan that fits your goals. Returns are paid out over the plan duration.
      </p>

      {/* Plan cards grid */}
      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading plans...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onInvest={() => setModalPlan(plan)}
            />
          ))}
        </div>
      )}

      <InvestPlanModal
        isOpen={modalPlan != null}
        onClose={() => setModalPlan(null)}
        plan={modalPlan}
        onSuccess={() => router.push('/dashboard/investment')}
      />
    </div>
  );
}
