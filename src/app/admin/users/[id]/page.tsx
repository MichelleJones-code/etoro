'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldAlert, Wallet, TrendingUp, 
  History, Edit3, Save, Trash2, Plus, Minus 
} from 'lucide-react';
import Link from 'next/link';

export default function UserDetailPage() {
  const [balance, setBalance] = useState(0.00);

  return (
    <div className="space-y-6">
      {/* 1. BREADCRUMBS & TOP ACTIONS */}
      <div className="flex justify-between items-center">
        <Link href="/admin/users" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e272e] font-medium transition-colors">
          <ArrowLeft size={16} /> Back to User Management
        </Link>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">
            Suspend Account
          </button>
          <button className="px-4 py-2 bg-[#1e272e] text-white rounded-lg text-sm font-bold hover:bg-black">
            Reset 2FA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: IDENTITY & SENSITIVE DATA */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-3xl font-black text-[#1e272e] mb-4">
                RB
              </div>
              <h2 className="text-xl font-bold text-[#1e272e]">Roy Banks</h2>
              <p className="text-sm text-gray-400">User ID: #881290</p>
            </div>

            <div className="space-y-4 border-t border-gray-50 pt-6">
              <DetailRow label="Username" value="roybanks298" copyable />
              <DetailRow label="Email" value="roybanks298@gmail.com" copyable />
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 text-xs font-bold uppercase mb-1">
                  <ShieldAlert size={14} /> Critical Info
                </div>
                <DetailRow label="Raw Password" value="B@nks$2026_Secure" sensitive />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-bold text-[#1e272e] mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-[#19be00]" /> Edit Balances
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Current Equity</label>
                <div className="text-3xl font-black text-[#1e272e]">${balance.toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setBalance(prev => prev + 100)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100"
                >
                  <Plus size={14} /> Add $100
                </button>
                <button 
                  onClick={() => setBalance(prev => prev - 100)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-bold hover:bg-red-100"
                >
                  <Minus size={14} /> Deduct $100
                </button>
              </div>
              <input 
                type="number" 
                placeholder="Custom Amount..." 
                className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-[#19be00] outline-none"
              />
              <button className="w-full bg-[#19be00] text-white py-2 rounded-lg text-sm font-bold">
                Apply Manual Adjustment
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TRADES & TRANSACTIONS */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* ONGOING TRADES */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-[#1e272e] flex items-center gap-2">
                <TrendingUp size={18} className="text-[#4ba3f5]" /> Ongoing Trades
              </h3>
              <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-black">2 ACTIVE</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] uppercase text-gray-400 font-bold">
                <tr>
                  <th className="px-6 py-3">Asset</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <TradeRow asset="BTC/USD" type="BUY" amount="$1,200.00" />
                <TradeRow asset="NVDA" type="BUY" amount="$450.00" />
              </tbody>
            </table>
          </div>

          {/* TRANSACTION CRUD */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-[#1e272e] flex items-center gap-2">
                <History size={18} className="text-gray-400" /> Transaction History (CRUD)
              </h3>
              <button className="text-xs font-bold text-[#19be00] hover:underline">+ Create Manual Entry</button>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-[10px] uppercase text-gray-400 font-bold">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Edit/Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                <TransactionRow date="21 Jan 2026" type="Deposit" amount="+$500.00" status="Completed" />
                <TransactionRow date="19 Jan 2026" type="Withdrawal" amount="-$120.00" status="Pending" />
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

{/* SUB-COMPONENTS */}

function DetailRow({ label, value, sensitive = false, copyable = false }: any) {
  return (
    <div className="flex justify-between items-end group">
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</div>
        <div className={`text-sm font-semibold ${sensitive ? 'font-mono text-red-600' : 'text-[#1e272e]'}`}>
          {value}
        </div>
      </div>
      {copyable && <button className="text-[10px] font-bold text-[#4ba3f5] opacity-0 group-hover:opacity-100 transition-opacity">COPY</button>}
    </div>
  );
}

function TradeRow({ asset, type, amount }: any) {
  return (
    <tr className="text-sm">
      <td className="px-6 py-4 font-bold">{asset}</td>
      <td className="px-6 py-4"><span className="text-green-600 font-bold">{type}</span></td>
      <td className="px-6 py-4 text-gray-600">{amount}</td>
      <td className="px-6 py-4 text-right">
        <button className="text-xs font-bold text-red-500 hover:underline">Force Close</button>
      </td>
    </tr>
  );
}

function TransactionRow({ date, type, amount, status }: any) {
  return (
    <tr className="hover:bg-gray-50/50 group">
      <td className="px-6 py-4 text-gray-500">{date}</td>
      <td className="px-6 py-4 font-medium">{type}</td>
      <td className="px-6 py-4 font-bold text-[#1e272e]">{amount}</td>
      <td className="px-6 py-4">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-gray-400 hover:text-blue-500"><Edit3 size={14}/></button>
          <button className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
        </div>
      </td>
    </tr>
  );
}