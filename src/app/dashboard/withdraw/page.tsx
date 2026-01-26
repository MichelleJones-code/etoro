'use client';

import React, { useState, useEffect } from 'react';
import { Minus } from 'lucide-react';
import { AvailableBalanceCard } from '@/components/dashboard/sections/AvailableBalanceCard';
import { WithdrawalModal } from '@/components/dashboard/sections/WithdrawalModal';
import { apiFetch } from '@/lib/api/client';
import { formatCurrency } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type WithdrawalRow = { id: string; type: string; amount: number; currency: string; description: string; timestamp: string; status: string };

export default function WithdrawPage() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRow[]>([]);

  const fetchWithdrawals = React.useCallback(async () => {
    try {
      const { data, res } = await apiFetch<{ transactions?: WithdrawalRow[] } | { error?: string }>('/api/transactions?type=withdraw');
      if (res.ok && Array.isArray((data as { transactions?: WithdrawalRow[] }).transactions)) {
        setWithdrawals((data as { transactions: WithdrawalRow[] }).transactions);
      }
    } catch {
      // keep current
    }
  }, []);

  useEffect(() => {
    fetchWithdrawals();
  }, [fetchWithdrawals]);

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
      <AvailableBalanceCard
        title="Available Balance"
        actionLabel="Withdraw Funds"
        actionIcon={Minus}
        onAction={() => setIsWithdrawalModalOpen(true)}
      />

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onSuccess={fetchWithdrawals}
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

