'use client';

import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

type OngoingItem = {
  id: string;
  userId: string;
  user: { firstName?: string; lastName?: string; email?: string } | null;
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
};

const STATUS_OPTIONS = ['', 'active', 'completed', 'cancelled'];

export default function AdminOngoingInvestmentsPage() {
  const [items, setItems] = useState<OngoingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [editTarget, setEditTarget] = useState<OngoingItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : '';
      const { data, res } = await apiFetch<OngoingItem[]>(`/api/admin/investment/ongoing${q}`);
      if (res.ok && Array.isArray(data)) setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [statusFilter]);

  function userName(u: OngoingItem['user']) {
    if (!u) return '—';
    return [u.firstName, u.lastName].filter(Boolean).join(' ') || u.email || '—';
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Ongoing Investments</h1>
          <p className="text-sm text-gray-500">View and manage user investment positions.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-600">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s || 'all'} value={s}>{s || 'All'}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Start</th>
                <th className="px-6 py-4">End</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Accrued</th>
                <th className="px-6 py-4">Next payout</th>
                <th className="px-6 py-4">ROI %</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                    No ongoing investments.
                  </td>
                </tr>
              ) : (
                items.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-bold text-[#1e272e]">{userName(o.user)}</div>
                        <div className="text-xs text-gray-500">{o.user?.email || '—'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{o.planName}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1e272e]">${o.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{o.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{o.endDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          o.status === 'active' ? 'bg-green-100 text-green-700' : o.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">${o.accruedProfit.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {o.nextPayoutDate || '—'}
                      {o.nextPayoutAmount != null ? ` / $${o.nextPayoutAmount.toLocaleString()}` : ''}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1e272e]">{o.roiPercent}%</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => { setError(''); setEditTarget(o); }}
                        className="p-2 text-gray-400 hover:text-[#4ba3f5] hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {editTarget && (
        <EditModal
          item={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={() => {
            setEditTarget(null);
            fetchItems();
          }}
          saving={saving}
          setSaving={setSaving}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
}

function EditModal({
  item,
  onClose,
  onSuccess,
  saving,
  setSaving,
  error,
  setError,
}: {
  item: OngoingItem;
  onClose: () => void;
  onSuccess: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
  error: string;
  setError: (v: string) => void;
}) {
  const [status, setStatus] = useState(item.status);
  const [accruedProfit, setAccruedProfit] = useState(item.accruedProfit.toString());
  const [nextPayoutDate, setNextPayoutDate] = useState(item.nextPayoutDate ?? '');
  const [nextPayoutAmount, setNextPayoutAmount] = useState(item.nextPayoutAmount?.toString() ?? '');

  const userName = [item.user?.firstName, item.user?.lastName].filter(Boolean).join(' ') || item.user?.email || '—';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const body = {
        status,
        accruedProfit: Number(accruedProfit),
        nextPayoutDate: nextPayoutDate.trim() || undefined,
        nextPayoutAmount: nextPayoutAmount.trim() ? Number(nextPayoutAmount) : undefined,
      };
      const { res, data } = await apiFetch<{ error?: string }>(
        `/api/admin/investment/ongoing/${item.id}`,
        { method: 'PUT', body }
      );
      if (res.ok) onSuccess();
      else setError((data as { error?: string })?.error || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-[#1e272e] mb-4">Edit ongoing investment</h2>
        <div className="mb-4 text-sm text-gray-600">
          <div><span className="font-medium">User:</span> {userName} ({item.user?.email})</div>
          <div><span className="font-medium">Plan:</span> {item.planName}</div>
          <div><span className="font-medium">Amount:</span> ${item.amount.toLocaleString()}</div>
          <div><span className="font-medium">Start / End:</span> {item.startDate} – {item.endDate}</div>
          <div><span className="font-medium">ROI:</span> {item.roiPercent}%</div>
        </div>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
            >
              <option value="active">active</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Accrued profit</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={accruedProfit}
              onChange={(e) => setAccruedProfit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Next payout date (optional)</label>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={nextPayoutDate}
              onChange={(e) => setNextPayoutDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Next payout amount (optional)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={nextPayoutAmount}
              onChange={(e) => setNextPayoutAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-[#19be00] text-white rounded-lg text-sm font-bold hover:bg-[#15a300] disabled:opacity-70">
              {saving ? 'Saving...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
