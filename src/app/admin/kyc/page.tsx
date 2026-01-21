'use client';

import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Search, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

const pendingKYC = [
  { id: 'KYC-501', user: 'Roy Banks', email: 'roybanks298@gmail.com', type: 'Passport', submitted: '2 hours ago', riskScore: 'Low' },
  { id: 'KYC-498', user: 'Sarah Connor', email: 's.connor@sky.net', type: 'ID Card', submitted: '5 hours ago', riskScore: 'Medium' },
  { id: 'KYC-495', user: 'James Smith', email: 'jsmith@web.com', type: 'Driving License', submitted: '1 day ago', riskScore: 'High' },
];

export default function KYCRequestsPage() {
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
            <div className="text-xl font-black text-orange-500">14 Requests</div>
          </div>
          <Clock className="text-orange-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Doc Type</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4 text-center">Submitted</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {pendingKYC.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#1e272e] font-bold text-xs">
                      {req.user.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1e272e]">{req.user}</div>
                      <div className="text-[10px] text-gray-400">{req.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{req.type}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    req.riskScore === 'Low' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {req.riskScore} Risk
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-500">{req.submitted}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/kyc/${req.id}`}>
                    <button className="bg-[#1e272e] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-black transition-all">
                      Review Docs
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}