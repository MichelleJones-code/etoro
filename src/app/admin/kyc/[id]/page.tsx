'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, X, ShieldCheck, AlertTriangle, ZoomIn, Download } from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

function DocViewer({ title, src }: { title: string; src: string | null }) {
  if (!src) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-700">{title}</span>
        <div className="flex gap-2">
          <a href={src} target="_blank" rel="noreferrer" className="p-1.5 hover:bg-gray-200 rounded transition-colors">
            <ZoomIn size={16} />
          </a>
          <a href={src} download className="p-1.5 hover:bg-gray-200 rounded transition-colors">
            <Download size={16} />
          </a>
        </div>
      </div>
      <div className="p-6 bg-[#f0f0f0] flex justify-center">
        <img src={src} className="max-h-[300px] rounded" alt={title} />
      </div>
    </div>
  );
}

function ComparisonRow({
  label,
  docValue,
  profileValue,
  match,
}: {
  label: string;
  docValue: string;
  profileValue: string;
  match: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <div className="w-1/3 text-[10px] font-bold text-gray-400 uppercase">{label}</div>
      <div className="w-1/3 text-xs font-semibold text-gray-600">{docValue}</div>
      <div
        className={`w-1/3 text-xs font-bold flex items-center justify-end gap-2 ${match ? 'text-[#46b445]' : 'text-red-500'}`}
      >
        {profileValue} {match ? <Check size={14} /> : <AlertTriangle size={14} />}
      </div>
    </div>
  );
}

export default function KYCDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    country: string;
    documentType: string;
    docFrontPath: string | null;
    docBackPath: string | null;
    selfiePath: string | null;
    user: { fullName: string } | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data: res, res: http } = await apiFetch<typeof data | { error?: string }>(
          `/api/admin/kyc/${id}`
        );
        if (http.ok) setData(res as typeof data);
        else setError((res as { error?: string }).error || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleApprove = async () => {
    setActionLoading(true);
    setError('');
    try {
      const { res } = await apiFetch<{ ok?: boolean }>(`/api/admin/kyc/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) router.push('/admin/kyc');
      else setError('Approve failed');
    } catch {
      setError('Approve failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    setError('');
    try {
      const { res } = await apiFetch<{ ok?: boolean }>(`/api/admin/kyc/${id}/reject`, {
        method: 'POST',
      });
      if (res.ok) router.push('/admin/kyc');
      else setError('Reject failed');
    } catch {
      setError('Reject failed');
    } finally {
      setActionLoading(false);
    }
  };

  const docTypeLabel: Record<string, string> = {
    passport: 'Passport',
    id: 'ID Card',
    driving: 'Driving License',
  };

  if (loading || !data) {
    return (
      <div className="p-12 text-center text-gray-500">
        {loading ? 'Loading...' : error || 'Not found'}
      </div>
    );
  }

  const fullName = `${data.firstName} ${data.lastName}`;

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
      )}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-[#19be00]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1e272e]">Verifying: {fullName}</h2>
            <p className="text-sm text-gray-500">
              Submission ID: #{data.id.slice(-6)} • {docTypeLabel[data.documentType] || data.documentType} Verification
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleApprove}
            disabled={actionLoading}
            className="flex items-center gap-2 bg-[#19be00] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#15a300] disabled:opacity-70"
          >
            <Check size={18} /> Approve KYC
          </button>
          <button
            type="button"
            onClick={handleReject}
            disabled={actionLoading}
            className="flex items-center gap-2 border border-red-200 text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50 disabled:opacity-70"
          >
            <X size={18} /> Reject
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <DocViewer title="Identity Document (Front)" src={data.docFrontPath} />
          <DocViewer title="Identity Document (Back)" src={data.docBackPath} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-sm">
              Selfie Verification
            </div>
            <div className="p-6 flex flex-col items-center">
              <img
                src={data.selfiePath || ''}
                alt="Selfie"
                className="w-48 h-48 bg-slate-50 rounded-xl border-4 border-gray-100 mb-4 object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-[#1e272e] mb-4">Profile Data Consistency</h3>
            <div className="space-y-4">
              <ComparisonRow
                label="Full Name"
                docValue={fullName}
                profileValue={data.user?.fullName || fullName}
                match={data.user?.fullName ? data.user.fullName === fullName : true}
              />
              <ComparisonRow
                label="Date of Birth"
                docValue={data.dateOfBirth}
                profileValue={data.dateOfBirth}
                match
              />
              <ComparisonRow
                label="Nationality"
                docValue={data.nationality}
                profileValue={data.nationality}
                match
              />
              <ComparisonRow
                label="Country"
                docValue={data.country}
                profileValue={data.country}
                match
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
