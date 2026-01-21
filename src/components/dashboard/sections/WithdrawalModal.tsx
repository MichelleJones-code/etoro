import React, { useState } from 'react';
import { X, Landmark, Wallet as WalletIcon, Coins, CheckCircle2, Copy } from 'lucide-react';
import { useMarketStore } from '@/lib/stores/market';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type WithdrawalMethod = 'bank' | 'paypal' | 'crypto';

type Step = 1 | 2 | 3;

const CRYPTO_NETWORKS = ['Bitcoin', 'Ethereum (ERC20)', 'Tron (TRC20)'];

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod>('bank');
  
  // Bank Transfer fields
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [routingNumber, setRoutingNumber] = useState<string>('');
  const [accountHolderName, setAccountHolderName] = useState<string>('');
  
  // PayPal fields
  const [paypalEmail, setPaypalEmail] = useState<string>('');
  
  // Crypto fields
  const [cryptoAddress, setCryptoAddress] = useState<string>('');
  const [cryptoNetwork, setCryptoNetwork] = useState<string>('Bitcoin');
  
  const [referenceId, setReferenceId] = useState<string>('');
  const processWithdrawal = useMarketStore((state) => state.processWithdrawal);
  const availableBalance = useMarketStore((state) => state.portfolio.availableBalance);

  const handleClose = () => {
    // Reset state when closing
    setStep(1);
    setAmount('');
    setSelectedMethod('bank');
    setAccountNumber('');
    setRoutingNumber('');
    setAccountHolderName('');
    setPaypalEmail('');
    setCryptoAddress('');
    setCryptoNetwork('Bitcoin');
    setReferenceId('');
    onClose();
  };

  const handleProceed = () => {
    const numericAmount = parseFloat(amount || '0');
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }
    if (numericAmount > availableBalance) {
      alert('Insufficient balance');
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    // Validate method-specific fields
    if (selectedMethod === 'bank') {
      if (!accountNumber || !routingNumber || !accountHolderName) {
        alert('Please fill in all bank transfer details');
        return;
      }
    } else if (selectedMethod === 'paypal') {
      if (!paypalEmail || !paypalEmail.includes('@')) {
        alert('Please enter a valid PayPal email address');
        return;
      }
    } else if (selectedMethod === 'crypto') {
      if (!cryptoAddress) {
        alert('Please enter a crypto wallet address');
        return;
      }
    }

    try {
      const numericAmount = parseFloat(amount || '0');
      const methodLabel = selectedMethod === 'bank' ? 'Bank Transfer' : selectedMethod === 'paypal' ? 'PayPal' : 'Crypto';
      
      const details: Record<string, string> = {};
      if (selectedMethod === 'bank') {
        details.accountNumber = accountNumber;
        details.routingNumber = routingNumber;
        details.accountHolderName = accountHolderName;
      } else if (selectedMethod === 'paypal') {
        details.email = paypalEmail;
      } else if (selectedMethod === 'crypto') {
        details.address = cryptoAddress;
        details.network = cryptoNetwork;
      }

      const transaction = processWithdrawal(numericAmount, methodLabel, details);
      
      // Extract reference ID from description
      const refMatch = transaction.description.match(/Ref: (WD-\d+)/);
      if (refMatch) {
        setReferenceId(refMatch[1]);
      }
      
      setStep(3);
    } catch (error: any) {
      alert(error.message || 'Failed to process withdrawal');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/70 via-black/70 to-black backdrop-brightness-50">
      <div className="bg-white max-w-[39rem] w-full rounded-lg shadow-2xl overflow-auto max-h-[90vh]">
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
                How much would you like to withdraw?
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
                    className="w-full text-right border border-gray-300 rounded-md py-3 pl-24 pr-4 text-lg font-semibold text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="$ 0.00"
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <p className="text-gray-500 font-light tracking-tight">
                    Available balance: <span className="font-semibold text-gray-900">${availableBalance.toFixed(2)}</span>
                  </p>
                  <button
                    onClick={() => setAmount(availableBalance.toFixed(2))}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Withdraw all
                  </button>
                </div>
              </div>

              {/* Withdrawal Methods */}
              <div className="space-y-3 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Select withdrawal method
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <WithdrawalMethodCard
                    icon={<Landmark className="w-5 h-5" />}
                    label="Bank Transfer"
                    active={selectedMethod === 'bank'}
                    onClick={() => setSelectedMethod('bank')}
                  />
                  <WithdrawalMethodCard
                    icon={<WalletIcon className="w-5 h-5" />}
                    label="PayPal"
                    active={selectedMethod === 'paypal'}
                    onClick={() => setSelectedMethod('paypal')}
                  />
                  <WithdrawalMethodCard
                    icon={<Coins className="w-5 h-5" />}
                    label="Crypto"
                    active={selectedMethod === 'crypto'}
                    onClick={() => setSelectedMethod('crypto')}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl mb-4 text-center font-light tracking-tight text-gray-900">
                {selectedMethod === 'bank' && 'Bank Transfer Details'}
                {selectedMethod === 'paypal' && 'PayPal Details'}
                {selectedMethod === 'crypto' && 'Crypto Wallet Details'}
              </h2>
              <p className="text-xs text-center text-gray-500 mb-4">
                {selectedMethod === 'bank' && 'Enter your bank account information to receive the funds.'}
                {selectedMethod === 'paypal' && 'Enter your PayPal email address to receive the funds.'}
                {selectedMethod === 'crypto' && 'Enter your crypto wallet address to receive the funds.'}
              </p>

              <div className="space-y-4">
                {selectedMethod === 'bank' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="1234567890"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="123456789"
                      />
                    </div>
                  </>
                )}

                {selectedMethod === 'paypal' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      PayPal Email Address
                    </label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                )}

                {selectedMethod === 'crypto' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Network
                      </label>
                      <select
                        value={cryptoNetwork}
                        onChange={(e) => setCryptoNetwork(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-2.5 px-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                      >
                        {CRYPTO_NETWORKS.map((network) => (
                          <option key={network} value={network}>
                            {network}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                        Wallet Address
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={cryptoAddress}
                          onChange={(e) => setCryptoAddress(e.target.value)}
                          className="flex-1 border border-gray-200 rounded-md py-2.5 px-3 text-sm text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none font-mono"
                          placeholder="Enter your wallet address"
                        />
                        {cryptoAddress && (
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(cryptoAddress)}
                            className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600"
                            title="Copy address"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Withdrawal Amount</span>
                    <span className="text-lg font-semibold text-gray-900">${parseFloat(amount || '0').toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Method</span>
                    <span className="capitalize">
                      {selectedMethod === 'bank' ? 'Bank Transfer' : selectedMethod === 'paypal' ? 'PayPal' : 'Crypto'}
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
                Withdrawal submitted
              </h2>
              <p className="text-sm text-center text-gray-600 max-w-sm mb-4">
                Your withdrawal request has been submitted and is being processed. You will receive a confirmation email once it's completed.
              </p>
              {referenceId && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Reference ID</p>
                  <p className="text-sm font-mono font-semibold text-gray-900">{referenceId}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 pb-8 flex justify-center">
          {step === 1 && (
            <button
              type="button"
              onClick={handleProceed}
              className="px-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-base"
            >
              Continue
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-full transition-colors text-base"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-20 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-base"
              >
                Submit Withdrawal
              </button>
            </div>
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

interface WithdrawalMethodCardProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const WithdrawalMethodCard: React.FC<WithdrawalMethodCardProps> = ({
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-1.5 p-3 border rounded-md text-left transition-all ${
        active
          ? 'border-[#46b445] bg-green-50/50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            active ? 'bg-[#46b445] text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900">{label}</p>
        </div>
      </div>
    </button>
  );
};

