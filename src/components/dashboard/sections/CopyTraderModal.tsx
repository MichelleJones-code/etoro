'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Percent, Settings } from 'lucide-react';
import type { CopyTrader } from '@/lib/types';
import { apiFetch } from '@/lib/api/client';

interface CopyTraderModalProps {
  isOpen: boolean;
  onClose: () => void;
  trader: CopyTrader | null;
}

type Step = 1 | 2 | 3;

export const CopyTraderModal: React.FC<CopyTraderModalProps> = ({ isOpen, onClose, trader }) => {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<string>('1000');
  const [allocationPercent, setAllocationPercent] = useState<string>('10');
  const [autoCopy, setAutoCopy] = useState<boolean>(true);
  const [copyOpenPositions, setCopyOpenPositions] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setStep(1);
    setAmount('1000');
    setAllocationPercent('10');
    setAutoCopy(true);
    setCopyOpenPositions(false);
    setError('');
    onClose();
  };

  const handleProceed = () => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }
    if (numericAmount < (trader?.minCopyAmount || 100)) {
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!trader) return;
    setIsSubmitting(true);
    setError('');
    try {
      const { data, res } = await apiFetch<{ relationship?: unknown } | { error?: string }>(
        `/api/copytraders/${trader.id}/copy`,
        {
          method: 'POST',
          body: {
            amount: parseFloat(amount) || 1000,
            allocationPercent: parseFloat(allocationPercent) || 10,
            autoCopy,
            copyOpenPositions,
          },
        }
      );
      if (!res.ok) {
        setError((data as { error?: string }).error || 'Failed to start copying');
        return;
      }
      setStep(3);
    } catch {
      setError('Failed to start copying. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !trader) return null;

  const minAmount = trader.minCopyAmount || 100;
  const numericAmount = parseFloat(amount) || 0;
  const isValidAmount = numericAmount >= minAmount;

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
          {step === 1 && (
            <>
              <h2 className="text-xl mb-6 text-center font-light tracking-tight text-gray-900">
                How much money would you like to copy with?
              </h2>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 tracking-tight font-light">
                    Amount
                  </span>
                  <input
                    type="text"
                    value={`$ ${amount}`}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9.]/g, '');
                      setAmount(rawValue || '');
                    }}
                    className={`w-full text-right border rounded-md py-3 pl-24 pr-4 text-lg font-semibold text-gray-900 focus:ring-2 outline-none ${
                      isValidAmount ? 'border-gray-300 focus:border-blue-600 focus:ring-blue-100' : 'border-red-500 focus:border-red-600 focus:ring-red-100'
                    }`}
                    placeholder="$ 1000"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-light tracking-tight ${isValidAmount ? 'text-gray-500' : 'text-red-600'}`}>
                    {isValidAmount 
                      ? `Minimum copy amount: $${minAmount.toLocaleString()}`
                      : `Deposit $${(minAmount - numericAmount).toLocaleString()} more to copy this trader`}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {((numericAmount || 0) / 100).toFixed(0)}% Allocation
                    </span>
                  </div>
                </div>
              </div>

              {/* Trader Info */}
              <div className="flex items-center pt-4 pb-2 gap-2 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <img 
                    src={trader.avatar} 
                    alt={trader.username}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.innerHTML = `<span class="text-gray-600 text-sm font-bold">${trader.username.charAt(0).toUpperCase()}</span>`;
                      }
                    }}
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center gap-1">
                      {trader.username}
                      {trader.verified && (
                        <span className="text-blue-500" title="Verified">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-light -mt-1 text-gray-500">
                      {trader.copiers.toLocaleString()} copiers
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="tracking-tight text-gray-900 font-semibold">
                      {trader.yearlyGain > 0 ? '+' : ''}{trader.yearlyGain.toFixed(2)}%
                    </span>
                    <div className="text-xs tracking-tight text-gray-500">
                      Yearly return
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl mb-4 text-center font-light tracking-tight text-gray-900">
                Configure your copy settings
              </h2>
              <p className="text-xs text-center text-gray-500 mb-4">
                Customize how you want to copy this trader&apos;s portfolio.
              </p>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
              )}

              <div className="space-y-4">
                {/* Allocation Percentage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Allocation Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={`${allocationPercent}%`}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9.]/g, '');
                        const numValue = Math.min(100, Math.max(1, parseFloat(rawValue) || 1));
                        setAllocationPercent(numValue.toString());
                      }}
                      className="w-full text-right border border-gray-200 rounded-md py-2.5 pr-3 text-sm font-semibold text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      placeholder="10%"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">
                    Percentage of your copy amount to allocate to this trader
                  </p>
                </div>

                {/* Auto Copy Toggle */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Auto Copy Settings
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Auto Copy New Trades</p>
                        <p className="text-[10px] text-gray-400">Automatically copy new trades as they happen</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoCopy}
                        onChange={(e) => setAutoCopy(e.target.checked)}
                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Copy Open Positions</p>
                        <p className="text-[10px] text-gray-400">Include existing open positions when starting to copy</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={copyOpenPositions}
                        onChange={(e) => setCopyOpenPositions(e.target.checked)}
                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Copy Amount</span>
                    <span className="font-semibold text-gray-900">${parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Allocation</span>
                    <span className="font-semibold text-gray-900">{allocationPercent}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="font-semibold text-gray-900">Total Allocation</span>
                    <span className="font-semibold text-gray-900">
                      ${((parseFloat(amount) * parseFloat(allocationPercent)) / 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-4">
                <CheckCircle2 className="w-14 h-14 text-green-500" />
              </div>
              <h2 className="text-xl mb-2 text-center font-light tracking-tight text-gray-900">
                Copy started successfully
              </h2>
              <p className="text-sm text-center text-gray-600 max-w-sm">
                You are now copying {trader.username}. Your portfolio will automatically mirror their trades based on your settings.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 pb-8 flex justify-center">
          {step === 1 && (
            <button
              type="button"
              onClick={handleProceed}
              disabled={!isValidAmount}
              className={`px-20 font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-base ${
                isValidAmount
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-20 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-base"
            >
              {isSubmitting ? 'Processing...' : 'Start Copying'}
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={handleClose}
              className="px-16 bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-full transition-colors text-base"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

