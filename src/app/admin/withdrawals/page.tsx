'use client';

import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Search, 
  Filter, 
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const pendingWithdrawals = [
  { id: 'WD-9921', user: 'Roy Banks', email: 'roybanks298@gmail.com', amount: '$120.00', method: 'PayPal', date: 'Jan 21, 2026', status: 'Pending', risk: 'Low' },
  { id: 'WD-9918', user: 'Sarah Connor', email: 's.connor@sky.net', amount: '$2,500.00', method: 'Bank Transfer', date: 'Jan 20, 2026', status: 'Pending', risk: 'Medium' },
  { id: 'WD-9915', user: 'James Smith', email: 'jsmith@web.com', amount: '$5,000.00', method: 'Crypto (BTC)', date: 'Jan 19, 2026', status: 'Flagged', risk: 'High' },
];

export default function WithdrawalsAdminPage() {
  return (
    <div className="space-y-6">
      {/* 1. ANALYTICS MINI-CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase mb-2">Total Pending</div>
          <div className="text-3xl font-black text-[#1e272e]">$7,620.00</div>
          <div className="text-[10px] text-orange-500 font-bold mt-1">3 REQUESTS NEED REVIEW</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase mb-2">Avg. Processing Time</div>
          <div className="text-3xl font-black text-[#1e272e]">4.2 hrs</div>
          <div className="text-[10px] text-[#46b445] font-bold mt-1">TARGET: 6.0 hrs</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase mb-2">Approved Today</div>
          <div className="text-3xl font-black text-[#1e272e]">$12,840.00</div>
          <div className="text-[10px] text-gray-400 font-bold mt-1">24 TRANSACTIONS</div>
        </div>
      </div>

      {/* 2. WITHDRAWAL REQUESTS TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="font-bold text-[#1e272e] text-lg">Withdrawal Requests</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search ID or Email..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#19be00]"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Filter size={18} className="text-gray-500" /></button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pendingWithdrawals.map((wd) => (
              <tr key={wd.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs text-gray-500">{wd.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-[#1e272e]">{wd.user}</div>
                  <div className="text-[10px] text-gray-400">{wd.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-black text-[#1e272e]">{wd.amount}</div>
                  <div className="text-[10px] text-gray-400">{wd.date}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                    <ArrowUpRight size={14} className="text-gray-400" /> {wd.method}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <RiskBadge risk={wd.risk} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#19be00] text-white rounded text-xs font-bold hover:bg-[#15a300] transition-colors">
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded text-xs font-bold hover:bg-red-50 transition-colors">
                      <XCircle size={14} /> Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="p-6 bg-gray-50/30 border-t border-gray-50">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-[#46b445]" /> Secure Administrative Audit Log Active
          </div>
        </div>
      </div>
    </div>
  );
}

{/* UI HELPERS */}

function RiskBadge({ risk }: { risk: string }) {
  const styles: any = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-orange-100 text-orange-700',
    High: 'bg-red-100 text-red-700 animate-pulse',
  };
  return (
    <div className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full ${styles[risk]}`}>
       {risk === 'High' && <AlertCircle size={10} />}
       <span className="text-[10px] font-black uppercase tracking-tighter">{risk} Risk</span>
    </div>
  );
}