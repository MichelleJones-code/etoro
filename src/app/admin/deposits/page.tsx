'use client';

import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Hash, 
  ExternalLink, 
  Search, 
  Filter, 
  ArrowDownLeft,
  FileText,
  AlertCircle
} from 'lucide-react';

const pendingDeposits = [
  { id: 'DP-4401', user: 'Roy Banks', amount: '$500.00', method: 'Crypto (USDT)', date: 'Jan 21, 2026', status: 'Pending', hash: '0x74a...f21b', hasProof: true },
  { id: 'DP-4398', user: 'Sarah Connor', amount: '$10,000.00', method: 'Bank Wire', date: 'Jan 20, 2026', status: 'Awaiting Proof', hash: null, hasProof: false },
  { id: 'DP-4395', user: 'James Smith', amount: '$1,200.00', method: 'Credit Card', date: 'Jan 19, 2026', status: 'Flagged', hash: 'CC-882190', hasProof: true },
];

export default function DepositsAdminPage() {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* 1. STATUS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard label="Pending Deposits" value="12" subValue="$14,250.00" color="text-orange-500" />
        <SummaryCard label="Approved Today" value="48" subValue="$62,400.00" color="text-[#46b445]" />
        <SummaryCard label="Flagged/Risk" value="2" subValue="$1,200.00" color="text-red-500" />
        <SummaryCard label="Avg. Verification" value="18m" subValue="Real-time" color="text-[#4ba3f5]" />
      </div>

      {/* 2. DEPOSITS TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-[#1e272e] text-lg">Incoming Deposits</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search User or ID..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Filter size={18} /></button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">Deposit ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Method & Hash</th>
              <th className="px-6 py-4 text-center">Proof</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pendingDeposits.map((dp) => (
              <tr key={dp.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{dp.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-[#1e272e]">{dp.user}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-black text-[#19be00]">{dp.amount}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">{dp.date}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                    <ArrowDownLeft size={14} className="text-[#46b445]" /> {dp.method}
                  </div>
                  {dp.hash ? (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-gray-400 bg-gray-50 w-fit px-1.5 py-0.5 rounded border border-gray-100">
                      <Hash size={10} /> {dp.hash} <ExternalLink size={10} className="cursor-pointer hover:text-[#4ba3f5]" />
                    </div>
                  ) : (
                    <div className="text-[10px] italic text-red-400">Hash not provided</div>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {dp.hasProof ? (
                    <button 
                      onClick={() => setSelectedProof('https://via.placeholder.com/400x600?text=Proof+of+Payment')}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-blue-50 text-[#4ba3f5] px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={12} /> View Proof
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-300">No File</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#19be00] text-white rounded text-xs font-bold hover:bg-[#15a300]">
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded text-xs font-bold hover:bg-red-50">
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. PROOF PREVIEW MODAL */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <span className="text-sm font-bold text-[#1e272e] flex items-center gap-2">
                <FileText size={18} /> Payment Confirmation Image
              </span>
              <button onClick={() => setSelectedProof(null)} className="text-gray-400 hover:text-gray-600"><XCircle /></button>
            </div>
            <div className="p-4 flex justify-center bg-[#f0f0f0]">
              <img src={selectedProof} alt="Proof" className="max-h-[60vh] rounded" />
            </div>
            <div className="p-6 flex gap-3">
              <button className="flex-1 bg-[#19be00] text-white py-2 rounded font-bold">Approve Deposit</button>
              <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{/* UI HELPERS */}

function SummaryCard({ label, value, subValue, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="text-xs font-bold text-gray-400 uppercase mb-2">{label}</div>
      <div className={`text-3xl font-black ${color}`}>{value}</div>
      <div className="text-[10px] font-bold text-gray-500 mt-1">{subValue}</div>
    </div>
  );
}