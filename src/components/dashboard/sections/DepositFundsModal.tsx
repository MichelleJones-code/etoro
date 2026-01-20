import React, { useState, useMemo } from 'react';
import { X, Bitcoin, Coins, CheckCircle2, Copy, FileText } from 'lucide-react';
import QRCode from 'react-qr-code';

interface DepositFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CryptoMethod = 'BTC' | 'ETH' | 'USDT';

const CRYPTO_WALLETS: Record<CryptoMethod, { label: string; address: string; network: string }> = {
  BTC: {
    label: 'Bitcoin (BTC)',
    address: 'bc1qexamplebtcwalletaddress0000000000000',
    network: 'Bitcoin',
  },
  ETH: {
    label: 'Ethereum (ETH)',
    address: '0xExampleEthereumWalletAddress000000000000000000',
    network: 'Ethereum (ERC20)',
  },
  USDT: {
    label: 'Tether (USDT)',
    address: '0xExampleUsdtWalletAddress00000000000000000000',
    network: 'Ethereum (ERC20)',
  },
};

type Step = 1 | 2 | 3;

export const DepositFundsModal: React.FC<DepositFundsModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState<string>('100');
  const [selectedMethod, setSelectedMethod] = useState<CryptoMethod>('BTC');
  const [txHash, setTxHash] = useState<string>('');
  const [proofFileName, setProofFileName] = useState<string>('');

  const walletInfo = CRYPTO_WALLETS[selectedMethod];

  const qrValue = useMemo(() => {
    const cleanAmount = parseFloat(amount || '0');
    const normalizedAmount = isNaN(cleanAmount) || cleanAmount <= 0 ? '' : cleanAmount.toString();

    // Generic URI-style payload; actual wallets will interpret based on scheme
    return `${selectedMethod.toLowerCase()}:${walletInfo.address}${
      normalizedAmount ? `?amount=${normalizedAmount}` : ''
    }`;
  }, [amount, selectedMethod, walletInfo.address]);

  const handleClose = () => {
    // Reset state when closing to start fresh next time
    setStep(1);
    setAmount('100');
    setSelectedMethod('BTC');
    setTxHash('');
    setProofFileName('');
    onClose();
  };

  const handleProceed = () => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!txHash && !proofFileName) {
      return;
    }
    setStep(3);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletInfo.address);
    } catch {
      // Silently fail in non-secure contexts
    }
  };

  const handleProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofFileName(file.name);
    } else {
      setProofFileName('');
    }
  };

  if (!isOpen) return null;

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
                How much money would you like to deposit?
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
                    placeholder="$ 100"
                  />
                </div>
                <p className="text-xs text-gray-500 font-light tracking-tight">
                  You will be depositing into your USD balance using crypto.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Select crypto payment method
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <CryptoMethodCard
                    icon={<Bitcoin className="w-5 h-5" />}
                    label="Bitcoin"
                    code="BTC"
                    network="Bitcoin"
                    active={selectedMethod === 'BTC'}
                    onClick={() => setSelectedMethod('BTC')}
                  />
                  <CryptoMethodCard
                    icon={<Coins className="w-5 h-5" />}
                    label="Ethereum"
                    code="ETH"
                    network="ERC20"
                    active={selectedMethod === 'ETH'}
                    onClick={() => setSelectedMethod('ETH')}
                  />
                  <CryptoMethodCard
                    icon={<Coins className="w-5 h-5" />}
                    label="Tether"
                    code="USDT"
                    network="ERC20"
                    active={selectedMethod === 'USDT'}
                    onClick={() => setSelectedMethod('USDT')}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl mb-4 text-center font-light tracking-tight text-gray-900">
                Complete your crypto payment
              </h2>
              <p className="text-xs text-center text-gray-500 mb-4">
                Send the exact amount to the wallet address below, then upload your transaction hash
                or proof of payment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* QR Code */}
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                    <QRCode value={qrValue || walletInfo.address} size={144} />
                  </div>
                  <p className="text-xs text-gray-500 text-center max-w-xs">
                    Scan this code with your {walletInfo.label} wallet to pay
                    {amount ? ` ${amount} USD` : ''}.
                  </p>
                </div>

                {/* Wallet + Proof */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      Wallet address
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                        <p className="text-[11px] text-gray-400 mb-0.5">{walletInfo.network}</p>
                        <p className="text-xs font-mono text-gray-800 break-all">
                          {walletInfo.address}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Transaction Hash */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      Transaction hash
                    </p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FileText className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        className="w-full border border-gray-200 rounded-md py-2.5 pl-9 pr-3 text-xs text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                        placeholder="Paste your blockchain transaction hash (optional if you upload proof)"
                      />
                    </div>
                  </div>

                  {/* Proof Upload */}
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                      Upload proof (screenshot or receipt)
                    </p>
                    <label className="flex items-center justify-between gap-2 border border-dashed border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                          +
                        </span>
                        <div>
                          <p className="text-xs text-gray-800">
                            {proofFileName || 'Click to upload image or PDF'}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            Max 5MB, formats: JPG, PNG, PDF
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        onChange={handleProofChange}
                      />
                    </label>
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
                Deposit submitted
              </h2>
              <p className="text-sm text-center text-gray-600 max-w-sm">
                Your crypto deposit has been received and is currently under review. Once it is
                confirmed on the blockchain, your USD balance will be updated.
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
              className="px-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-base"
            >
              Continue
            </button>
          )}
          {step === 2 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-20 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2 text-base"
            >
              Submit deposit
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

interface CryptoMethodCardProps {
  icon: React.ReactNode;
  label: string;
  code: CryptoMethod;
  network: string;
  active: boolean;
  onClick: () => void;
}

const CryptoMethodCard: React.FC<CryptoMethodCardProps> = ({
  icon,
  label,
  code,
  network,
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
          <p className="text-sm font-semibold text-gray-900">
            {label} <span className="text-xs text-gray-500">({code})</span>
          </p>
          <p className="text-[11px] text-gray-400">{network}</p>
        </div>
      </div>
    </button>
  );
};


