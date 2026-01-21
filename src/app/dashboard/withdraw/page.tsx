'use client';

import React, { useState, useMemo } from 'react';
import { Minus, ChevronDown } from 'lucide-react';
import { WithdrawalModal } from '@/components/dashboard/sections/WithdrawalModal';
import { useMarketStore } from '@/lib/stores/market';
import { formatCurrency, getRelativeTime } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function WithdrawPage() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const availableBalance = useMarketStore((state) => state.portfolio.availableBalance);
  const transactions = useMarketStore((state) => state.transactions);

  // Filter and sort withdrawals
  const withdrawals = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'withdraw')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [transactions]);

  // Extract method and reference ID from description
  const parseWithdrawalInfo = (description: string) => {
    const methodMatch = description.match(/via (\w+(?:\s+\w+)?)/);
    const refMatch = description.match(/Ref: (WD-\d+)/);
    return {
      method: methodMatch ? methodMatch[1] : 'Unknown',
      referenceId: refMatch ? refMatch[1] : 'N/A',
    };
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2.5 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-3 pb-12">
      {/* Account Balance Card */}
      <section className="bg-white rounded-lg px-8 py-10">
        <div className="flex justify-between items-start mb-2">
          <span className="tracking-tight font-light text-gray-900">Available Balance</span>
          <div className="flex flex-col items-end">
            <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50">
              USD <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center mt-4 justify-between gap-2">
          <div className="text-5xl font-bold text-[#1e272e] mb-6">
            <span className="text-2xl">$</span>
            {availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-gray-500 font-light">
            Last update at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}, {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full mb-8"></div>

        <button
          onClick={() => setIsWithdrawalModalOpen(true)}
          className="flex items-center gap-2 border border-[#46b445] text-[#46b445] font-bold py-2 px-4 rounded-full text-sm hover:bg-green-50 transition-colors"
        >
          <Minus size={18} /> Withdraw Funds
        </button>
      </section>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
      />

      {/* Recent Withdrawals Table */}
      <section className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#1e272e] mb-6">Recent Withdrawals</h2>
        
        {withdrawals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No withdrawals yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal) => {
                  const { method, referenceId } = parseWithdrawalInfo(withdrawal.description);
                  return (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="text-sm text-gray-900">
                        {new Date(withdrawal.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        <span className="text-gray-500 ml-2">
                          {new Date(withdrawal.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        {formatCurrency(withdrawal.amount, withdrawal.currency)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700 capitalize">
                        {method}
                      </TableCell>
                      <TableCell>
                        <span className={getStatusBadge(withdrawal.status)}>
                          {withdrawal.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-gray-600">
                        {referenceId}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}

