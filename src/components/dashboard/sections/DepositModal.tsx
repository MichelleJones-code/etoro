import React from 'react';
import { X, CreditCard, Landmark, Wallet as WalletIcon } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1e272e]">Deposit Funds</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
              <input 
                type="number" 
                defaultValue="1000"
                className="w-full border border-gray-200 rounded-md py-3 pl-8 pr-4 text-lg font-bold text-[#1e272e] focus:border-[#46b445] focus:ring-1 focus:ring-[#46b445] outline-none"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Payment Method</label>
            <div className="space-y-3">
              <PaymentOption icon={<CreditCard size={20}/>} label="Credit / Debit Card" active />
              <PaymentOption icon={<Landmark size={20}/>} label="Bank Transfer" />
              <PaymentOption icon={<WalletIcon size={20}/>} label="PayPal" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex flex-col gap-3">
          <button className="w-full bg-[#19be00] hover:bg-[#15a300] text-white font-bold py-4 rounded-md transition-all shadow-md">
            Submit Deposit
          </button>
          <p className="text-[10px] text-center text-gray-400">
            Secure 256-bit SSL encrypted payment.
          </p>
        </div>
      </div>
    </div>
  );
};

function PaymentOption({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all ${
      active ? 'border-[#46b445] bg-green-50/30' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={active ? 'text-[#46b445]' : 'text-gray-400'}>{icon}</div>
        <span className={`text-sm font-semibold ${active ? 'text-[#1e272e]' : 'text-gray-600'}`}>{label}</span>
      </div>
      {active && <div className="w-4 h-4 rounded-full bg-[#46b445] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>}
    </div>
  );
}