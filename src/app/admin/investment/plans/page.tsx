'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

type Plan = {
  id: string;
  name: string;
  description: string;
  roiPercent: number;
  durationMonths: number;
  minAmount: number;
  maxAmount?: number;
  riskLevel?: string;
};

const RISK_OPTIONS = ['low', 'medium', 'high'] as const;

export default function AdminInvestmentPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<'create' | Plan | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Plan | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchPlans = async () => {
    try {
      const { data, res } = await apiFetch<Plan[]>('/api/admin/investment/plans');
      if (res.ok && Array.isArray(data)) setPlans(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Investment Plans</h1>
          <p className="text-sm text-gray-500">Create and manage investment plans.</p>
        </div>
        <button
          onClick={() => { setError(''); setModalOpen('create'); }}
          className="bg-[#19be00] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#15a300] transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Add plan
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">ROI %</th>
                <th className="px-6 py-4">Duration (mo)</th>
                <th className="px-6 py-4">Min</th>
                <th className="px-6 py-4">Max</th>
                <th className="px-6 py-4">Risk</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No investment plans. Add one to get started.
                  </td>
                </tr>
              ) : (
                plans.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-[#1e272e]">{p.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate" title={p.description}>
                      {p.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1e272e]">{p.roiPercent}%</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{p.durationMonths}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">${p.minAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {p.maxAmount != null ? `$${p.maxAmount.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-6 py-4">
                      {p.riskLevel ? (
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            p.riskLevel === 'low' ? 'bg-green-100 text-green-700' : p.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {p.riskLevel}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { setError(''); setModalOpen(p); }}
                          className="p-2 text-gray-400 hover:text-[#4ba3f5] hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <PlanModal
          plan={modalOpen === 'create' ? null : modalOpen}
          onClose={() => setModalOpen(null)}
          onSuccess={() => {
            setModalOpen(null);
            fetchPlans();
          }}
          saving={saving}
          setSaving={setSaving}
          error={error}
          setError={setError}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          planName={deleteTarget.name}
          error={error}
          onClose={() => { setDeleteTarget(null); setError(''); }}
          onConfirm={async () => {
            setError('');
            const { res, data } = await apiFetch<{ error?: string }>(
              `/api/admin/investment/plans/${deleteTarget.id}`,
              { method: 'DELETE' }
            );
            if (res.ok) {
              setDeleteTarget(null);
              fetchPlans();
            } else {
              setError((data as { error?: string })?.error || 'Delete failed');
            }
          }}
        />
      )}
    </div>
  );
}

function PlanModal({
  plan,
  onClose,
  onSuccess,
  saving,
  setSaving,
  error,
  setError,
}: {
  plan: Plan | null;
  onClose: () => void;
  onSuccess: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
  error: string;
  setError: (v: string) => void;
}) {
  const [name, setName] = useState(plan?.name ?? '');
  const [description, setDescription] = useState(plan?.description ?? '');
  const [roiPercent, setRoiPercent] = useState(plan?.roiPercent?.toString() ?? '');
  const [durationMonths, setDurationMonths] = useState(plan?.durationMonths?.toString() ?? '');
  const [minAmount, setMinAmount] = useState(plan?.minAmount?.toString() ?? '');
  const [maxAmount, setMaxAmount] = useState(plan?.maxAmount?.toString() ?? '');
  const [riskLevel, setRiskLevel] = useState<string>(plan?.riskLevel ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const body = {
        name: name.trim(),
        description: description.trim(),
        roiPercent: Number(roiPercent),
        durationMonths: Number(durationMonths),
        minAmount: Number(minAmount),
        maxAmount: maxAmount.trim() ? Number(maxAmount) : undefined,
        riskLevel: riskLevel || undefined,
      };
      if (plan) {
        const { res, data } = await apiFetch<{ error?: string }>(
          `/api/admin/investment/plans/${plan.id}`,
          { method: 'PUT', body }
        );
        if (res.ok) onSuccess();
        else setError((data as { error?: string })?.error || 'Update failed');
      } else {
        const { res, data } = await apiFetch<{ error?: string }>(
          '/api/admin/investment/plans',
          { method: 'POST', body }
        );
        if (res.ok) onSuccess();
        else setError((data as { error?: string })?.error || 'Create failed');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-lg mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-[#1e272e] mb-4">{plan ? 'Edit plan' : 'Add plan'}</h2>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none min-h-[80px]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ROI %</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={roiPercent}
                onChange={(e) => setRoiPercent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration (months)</label>
              <input
                type="number"
                min="1"
                value={durationMonths}
                onChange={(e) => setDurationMonths(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Min amount</label>
              <input
                type="number"
                min="0"
                step="1"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max amount (optional)</label>
              <input
                type="number"
                min="0"
                step="1"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Risk level</label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/30 focus:border-[#19be00] outline-none"
            >
              <option value="">—</option>
              {RISK_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-[#19be00] text-white rounded-lg text-sm font-bold hover:bg-[#15a300] disabled:opacity-70">
              {saving ? 'Saving...' : plan ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  planName,
  error,
  onClose,
  onConfirm,
}: {
  planName: string;
  error: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-[#1e272e] mb-2">Delete plan</h2>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</div>}
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete &quot;{planName}&quot;? This cannot be undone. The plan can only be deleted if it has no ongoing investments.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              await onConfirm();
              setLoading(false);
            }}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 disabled:opacity-70"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
