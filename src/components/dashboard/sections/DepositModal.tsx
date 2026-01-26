'use client';

import React, { useState } from 'react';
import { X, CreditCard, Landmark, Wallet as WalletIcon, CheckCircle2, Loader2 } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'card' | 'bank' | 'paypal';

export const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [amount, setAmount] = useState('1000');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setStep(1);
    setAmount('1000');
    setSelectedMethod('card');
    setLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    const num = parseFloat(amount || '0');
    if (!amount || isNaN(num) || num <= 0) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1e272e]">Deposit Funds</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-md py-3 pl-8 pr-4 text-lg font-bold text-[#1e272e] focus:border-[#46b445] focus:ring-1 focus:ring-[#46b445] outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Payment Method</label>
                <div className="space-y-3">
                  <PaymentOption icon={<CreditCard size={20} />} label="Credit / Debit Card" active={selectedMethod === 'card'} onClick={() => setSelectedMethod('card')} />
                  <PaymentOption icon={<Landmark size={20} />} label="Bank Transfer" active={selectedMethod === 'bank'} onClick={() => setSelectedMethod('bank')} />
                  <PaymentOption icon={<WalletIcon size={20} />} label="PayPal" active={selectedMethod === 'paypal'} onClick={() => setSelectedMethod('paypal')} />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircle2 className="w-14 h-14 text-[#46b445] mb-4" />
              <h3 className="text-lg font-bold text-[#1e272e] mb-2">Deposit submitted</h3>
              <p className="text-sm text-center text-gray-600">
                Your deposit request has been received and is being processed. Your balance will be updated shortly.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex flex-col gap-3">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#19be00] hover:bg-[#15a300] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-md transition-all shadow-md flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {loading ? 'Processing...' : 'Submit Deposit'}
              </button>
              <p className="text-[10px] text-center text-gray-400">
                Secure 256-bit SSL encrypted payment.
              </p>
            </>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-[#1e272e] hover:bg-black text-white font-bold py-4 rounded-md transition-all"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function PaymentOption({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full p-4 border rounded-md transition-all text-left ${
        active ? 'border-[#46b445] bg-green-50/30' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={active ? 'text-[#46b445]' : 'text-gray-400'}>{icon}</div>
        <span className={`text-sm font-semibold ${active ? 'text-[#1e272e]' : 'text-gray-600'}`}>{label}</span>
      </div>
      {active && (
        <div className="w-4 h-4 rounded-full bg-[#46b445] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      )}
    </button>
  );
}