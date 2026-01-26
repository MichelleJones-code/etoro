'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import type { InvestmentPlan } from '@/lib/types';
import { apiFetch } from '@/lib/api/client';

interface InvestPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: InvestmentPlan | null;
  onSuccess?: () => void;
}

export const InvestPlanModal: React.FC<InvestPlanModalProps> = ({
  isOpen,
  onClose,
  plan,
  onSuccess,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setAmount('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  const handleConfirm = async () => {
    const num = parseFloat(amount) || 0;
    if (!plan || num < plan.minAmount) return;
    if (plan.maxAmount != null && num > plan.maxAmount) return;
    setIsSubmitting(true);
    setError('');
    try {
      const { data, res } = await apiFetch<{ investment?: unknown } | { error?: string }>(
        `/api/investment/plans/${plan.id}/invest`,
        { method: 'POST', body: { amount: num } }
      );
      if (!res.ok) {
        setError((data as { error?: string }).error || 'Investment failed');
        return;
      }
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError('Investment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !plan) return null;

  const numericAmount = parseFloat(amount) || 0;
  const isValidAmount =
    numericAmount >= plan.minAmount &&
    (plan.maxAmount == null || numericAmount <= plan.maxAmount);
  const minLabel = `$${plan.minAmount.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/70 via-black/70 to-black backdrop-brightness-50">
      <div className="bg-white max-w-[39rem] w-full rounded-lg shadow-2xl overflow-auto">
        {/* Header */}
        <div className="px-7 pt-10 w-full flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="py-6 space-y-6 px-10 sm:px-16 md:px-20">
          {!submitted ? (
            <>
              <h2 className="text-xl mb-2 text-center font-light tracking-tight text-gray-900">
                Invest in {plan.name}
              </h2>
              <p className="text-sm text-center text-gray-500 mb-6">
                {plan.description}
              </p>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
              )}

              {/* Plan summary */}
              <div className="flex flex-wrap gap-4 justify-center py-4 border-y border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-[#19be00]" />
                  <span className="text-gray-600">ROI</span>
                  <span className="font-semibold text-[#1e272e]">{plan.roiPercent}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-[#1e272e]">{plan.durationMonths} months</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Min</span>
                  <span className="font-semibold text-[#1e272e]">{minLabel}</span>
                </div>
                {plan.maxAmount != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Max</span>
                    <span className="font-semibold text-[#1e272e]">${plan.maxAmount.toLocaleString()}</span>
                  </div>
                )}
                {plan.riskLevel && (
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    plan.riskLevel === 'low' ? 'bg-green-100 text-green-700' :
                    plan.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {plan.riskLevel}
                  </span>
                )}
              </div>

              {/* Amount input */}
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 tracking-tight font-light">
                    Amount
                  </span>
                  <input
                    type="text"
                    value={amount === '' ? '' : `$ ${amount}`}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9.]/g, '');
                      setAmount(raw || '');
                    }}
                    className={`w-full text-right border rounded-md py-3 pl-24 pr-4 text-lg font-semibold text-gray-900 focus:ring-2 outline-none ${
                      isValidAmount || !amount
                        ? 'border-gray-300 focus:border-[#19be00] focus:ring-[#19be00]/20'
                        : 'border-red-500 focus:border-red-600 focus:ring-red-100'
                    }`}
                    placeholder={`$ ${plan.minAmount.toLocaleString()}`}
                  />
                </div>
                <p className={`text-xs font-light tracking-tight ${isValidAmount || !amount ? 'text-gray-500' : 'text-red-600'}`}>
                  {!amount
                    ? `Enter amount between ${minLabel}${plan.maxAmount != null ? ` and $${plan.maxAmount.toLocaleString()}` : ' and above'}`
                    : !isValidAmount
                      ? numericAmount < plan.minAmount
                        ? `Minimum is ${minLabel}`
                        : `Maximum is $${plan.maxAmount!.toLocaleString()}`
                      : `You will receive ~${((numericAmount * plan.roiPercent) / 100).toFixed(2)} in returns over ${plan.durationMonths} months`}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-4">
                <CheckCircle2 className="w-14 h-14 text-[#46b445]" />
              </div>
              <h2 className="text-xl mb-2 text-center font-light tracking-tight text-gray-900">
                Investment started
              </h2>
              <p className="text-sm text-center text-gray-600 max-w-sm">
                You have invested ${numericAmount.toLocaleString()} in {plan.name}. Returns will accrue over {plan.durationMonths} months.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 pb-8 flex justify-center gap-3">
          {!submitted ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 font-semibold py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!isValidAmount || isSubmitting}
                className={`px-10 font-semibold py-3 rounded-full transition-colors ${
                  isValidAmount && !isSubmitting
                    ? 'bg-[#19be00] hover:bg-[#15a300] text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Confirm'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="px-16 bg-[#1e272e] hover:bg-black text-white font-semibold py-3 rounded-full transition-colors text-base"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
