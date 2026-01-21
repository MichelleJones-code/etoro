'use client';

import React from 'react';
import { Check, X, ShieldCheck, AlertTriangle, ZoomIn, Download } from 'lucide-react';

export default function KYCDetailPage() {
  return (
    <div className="space-y-6">
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-[#19be00]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1e272e]">Verifying: Roy Banks</h2>
            <p className="text-sm text-gray-500">Submission ID: #KYC-501 • Passport Verification</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#19be00] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#15a300]">
            <Check size={18} /> Approve KYC
          </button>
          <button className="flex items-center gap-2 border border-red-200 text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-50">
            <X size={18} /> Reject
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DOCUMENT VIEWERS */}
        <div className="space-y-6">
          <DocViewer title="Identity Document (Front)" src="https://via.placeholder.com/600x400?text=Passport+Front" />
          <DocViewer title="Identity Document (Back)" src="https://via.placeholder.com/600x400?text=Passport+Back" />
        </div>

        {/* SELFIE & DATA COMPARISON */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
             <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-sm">Selfie Verification</div>
             <div className="p-6 flex flex-col items-center">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Roy" className="w-48 h-48 bg-slate-50 rounded-xl border-4 border-gray-100 mb-4" />
                <div className="flex items-center gap-2 text-[#46b445] text-xs font-bold">
                  <ShieldCheck size={14} /> AI Face Match Score: 98.2%
                </div>
             </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-[#1e272e] mb-4">Profile Data Consistency</h3>
            <div className="space-y-4">
              <ComparisonRow label="Full Name" docValue="Roy Banks" profileValue="Roy Banks" match />
              <ComparisonRow label="Date of Birth" docValue="12/05/1992" profileValue="12/05/1992" match />
              <ComparisonRow label="ID Number" docValue="A88129032" profileValue="A88129032" match />
              <ComparisonRow label="Nationality" docValue="United Kingdom" profileValue="Nigeria" match={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* SUB-COMPONENTS */}

function DocViewer({ title, src }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-700">{title}</span>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><ZoomIn size={16} /></button>
          <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><Download size={16} /></button>
        </div>
      </div>
      <div className="p-6 bg-[#f0f0f0] flex justify-center">
        <img src={src} className="max-h-[300px] rounded" alt={title} />
      </div>
    </div>
  );
}

function ComparisonRow({ label, docValue, profileValue, match }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <div className="w-1/3 text-[10px] font-bold text-gray-400 uppercase">{label}</div>
      <div className="w-1/3 text-xs font-semibold text-gray-600">{docValue}</div>
      <div className={`w-1/3 text-xs font-bold flex items-center justify-end gap-2 ${match ? 'text-[#46b445]' : 'text-red-500'}`}>
        {profileValue} {match ? <Check size={14}/> : <AlertTriangle size={14}/>}
      </div>
    </div>
  );
}