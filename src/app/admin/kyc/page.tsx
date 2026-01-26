'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api/client';

const docTypeLabel: Record<string, string> = {
  passport: 'Passport',
  id: 'ID Card',
  driving: 'Driving License',
};

function formatSubmitted(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString();
}

type KYCItem = {
  id: string;
  status: string;
  documentType: string;
  submittedAt: string;
  user: { fullName: string; email?: string } | null;
};

export default function KYCRequestsPage() {
  const [items, setItems] = useState<KYCItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, res } = await apiFetch<{ items: KYCItem[] }>('/api/admin/kyc?status=pending');
        if (res.ok && Array.isArray((data as { items?: KYCItem[] }).items)) {
          setItems((data as { items: KYCItem[] }).items);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Identity Verifications</h1>
          <p className="text-sm text-gray-500">Review and approve user identity documents.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100">
          <div className="text-right">
            <div className="text-[10px] font-bold text-gray-400 uppercase">Pending Queue</div>
            <div className="text-xl font-black text-orange-500">{items.length} Requests</div>
          </div>
          <Clock className="text-orange-500" />
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
                <th className="px-6 py-4">Doc Type</th>
                <th className="px-6 py-4 text-center">Submitted</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No pending verifications.
                  </td>
                </tr>
              ) : (
                items.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1e272e] font-bold text-xs">
                          {(req.user?.fullName || '?').charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1e272e]">{req.user?.fullName || '—'}</div>
                          <div className="text-[10px] text-gray-400">{req.user?.email || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {docTypeLabel[req.documentType] || req.documentType}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {formatSubmitted(req.submittedAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/kyc/${req.id}`}>
                        <span className="inline-block bg-[#1e272e] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-black transition-all cursor-pointer">
                          Review Docs
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}