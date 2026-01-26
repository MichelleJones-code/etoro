'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  ShieldAlert,
  Activity,
  MoreVertical,
  Search,
} from 'lucide-react';
import { apiFetch } from '@/lib/api/client';

type RecentUser = { id: string; name: string; email: string; joined: string; kycStatus: string };
type RecentActivityItem = { id: string; time: string; msg: string; isAlert?: boolean };
type HealthItem = { label: string; status: string; uptime: string; isWarning?: boolean };

type DashboardData = {
  totalUsers: number;
  totalDeposits: number;
  activeInvestments: number;
  flaggedCount: number;
  recentUsers: RecentUser[];
  recentActivity: RecentActivityItem[];
  systemHealth?: HealthItem[];
};

function formatTimeAgo(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

function formatDeposits(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function kycToStatus(kyc: string): string {
  if (kyc === 'approved') return 'Verified';
  if (kyc === 'rejected') return 'Rejected';
  if (kyc === 'pending') return 'Pending';
  return '—';
}

function kycToVerificationPercent(kyc: string): string {
  if (kyc === 'approved') return '100%';
  if (kyc === 'pending') return '50%';
  return '0%';
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: res, res: http } = await apiFetch<DashboardData>('/api/admin/dashboard');
        if (http.ok) setData(res);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto py-12 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  const totalUsers = data?.totalUsers ?? 0;
  const totalDeposits = data?.totalDeposits ?? 0;
  const activeInvestments = data?.activeInvestments ?? 0;
  const flaggedCount = data?.flaggedCount ?? 0;
  const recentUsers = data?.recentUsers ?? [];
  const recentActivity = data?.recentActivity ?? [];
  const systemHealth = data?.systemHealth ?? [
    { label: 'API Services', status: 'Healthy', uptime: '99.98%' },
    { label: 'Crypto Node', status: 'Syncing', uptime: '94.12%', isWarning: true },
    { label: 'Fiat Gateway', status: 'Healthy', uptime: '100%' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      {/* 1. TOP HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Admin Console</h1>
          <p className="text-sm text-gray-500">System overview and user management</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users or tx IDs..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#19be00] outline-none w-64"
            />
          </div>
          <button className="bg-[#1e272e] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* 2. SYSTEM STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={totalUsers.toLocaleString()} trend="—" icon={<Users className="text-blue-500" />} isUp />
        <StatCard title="Total Deposits" value={formatDeposits(totalDeposits)} trend="—" icon={<DollarSign className="text-green-500" />} isUp />
        <StatCard title="Active Investments" value={activeInvestments.toLocaleString()} trend="—" icon={<Activity className="text-orange-500" />} isUp />
        <StatCard title="Flagged Accounts" value={flaggedCount.toString()} trend={flaggedCount > 0 ? 'Critical' : '—'} icon={<ShieldAlert className="text-red-500" />} isWarning={flaggedCount > 0} />
      </div>

      {/* 3. MAIN CONTENT: USER TABLE & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent User Management Table */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-[#1e272e]">Recent Registrations</h2>
            <Link href="/admin/users" className="text-sm text-[#4ba3f5] font-bold">
              View All
            </Link>
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Verification</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No recent registrations.
                  </td>
                </tr>
              ) : (
                recentUsers.map((u) => (
                  <UserRow
                    key={u.id}
                    id={u.id}
                    name={u.name}
                    email={u.email}
                    status={kycToStatus(u.kycStatus)}
                    verification={kycToVerificationPercent(u.kycStatus)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* System Health / Logs */}
        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <h2 className="font-bold text-[#1e272e] mb-6">System Health</h2>
          <div className="space-y-6">
            {systemHealth.map((h) => (
              <HealthItem
                key={h.label}
                label={h.label}
                status={h.status}
                uptime={h.uptime}
                isWarning={h.isWarning}
              />
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-50">
            <div className="text-xs font-bold text-gray-400 uppercase mb-4">Live Event Log</div>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <div className="text-xs text-gray-500">No recent activity.</div>
              ) : (
                recentActivity.map((a) => (
                  <LogEntry
                    key={a.id}
                    time={formatTimeAgo(a.time)}
                    msg={a.msg}
                    isAlert={a.isAlert}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isUp, isWarning }: { title: string; value: string; trend: string; icon: React.ReactNode; isUp?: boolean; isWarning?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${isWarning ? 'bg-red-50 text-red-600' : isUp ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
          {trend}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-[#1e272e]">{value}</div>
    </div>
  );
}

function UserRow({ id, name, email, status, verification }: { id: string; name: string; email: string; status: string; verification: string }) {
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-6 py-4">
        <Link href={`/admin/users/${id}`} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100" />
          <div>
            <div className="text-sm font-bold text-[#1e272e]">{name}</div>
            <div className="text-xs text-gray-400">{email}</div>
          </div>
        </Link>
      </td>
      <td className="px-6 py-4">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
            status === 'Verified' ? 'bg-green-100 text-green-700' : status === 'Rejected' ? 'bg-red-100 text-red-700' : status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="w-24 mx-auto bg-gray-100 h-1.5 rounded-full">
          <div className="bg-[#4ba3f5] h-full rounded-full" style={{ width: verification }} />
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/admin/users/${id}`}>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={16} />
          </button>
        </Link>
      </td>
    </tr>
  );
}

function HealthItem({ label, status, uptime, isWarning }: { label: string; status: string; uptime: string; isWarning?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-sm font-bold text-gray-700">{label}</div>
        <div className="text-[10px] text-gray-400 font-medium">Uptime: {uptime}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isWarning ? 'bg-orange-400' : 'bg-[#46b445]'}`} />
        <span className="text-xs font-bold text-gray-600">{status}</span>
      </div>
    </div>
  );
}

function LogEntry({ time, msg, isAlert }: { time: string; msg: string; isAlert?: boolean }) {
  return (
    <div className="flex gap-3 text-xs">
      <span className="text-gray-400 whitespace-nowrap">{time}</span>
      <span className={isAlert ? 'text-red-500 font-medium' : 'text-gray-600'}>{msg}</span>
    </div>
  );
}
