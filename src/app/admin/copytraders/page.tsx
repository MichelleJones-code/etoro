'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, 
  TrendingUp, Users, ShieldCheck, Edit3, 
  Trash2, Award, Star
} from 'lucide-react';

const initialTraders = [
  { id: 1, name: 'JeppeKirkBonde', return1M: '+4.12%', risk: 4, copiers: '24,102', status: 'Featured', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jeppe' },
  { id: 2, name: 'CPHequities', return1M: '+2.85%', risk: 3, copiers: '8,450', status: 'Verified', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CPH' },
  { id: 3, name: 'Wesl3y', return1M: '+12.40%', risk: 7, copiers: '12,001', status: 'Trending', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wes' },
  { id: 4, name: 'Rubymza', return1M: '-1.20%', risk: 5, copiers: '3,210', status: 'Standard', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ruby' },
];

export default function AdminCopyTradersPage() {
  const [traders, setTraders] = useState(initialTraders);

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & GLOBAL ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">CopyTrader™ Management</h1>
          <p className="text-sm text-gray-500">Manage master traders, verification badges, and risk levels.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#19be00] hover:bg-[#15a300] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all">
          <Plus size={18} /> Add New Master Trader
        </button>
      </div>

      {/* 2. PERFORMANCE INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><TrendingUp size={24} /></div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform Avg. Return</div>
            <div className="text-2xl font-black text-[#1e272e]">+5.24%</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-lg text-[#46b445]"><Users size={24} /></div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Active Copiers</div>
            <div className="text-2xl font-black text-[#1e272e]">142,804</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4">
          <div className="bg-yellow-50 p-3 rounded-lg text-yellow-600"><Star size={24} /></div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Masters</div>
            <div className="text-2xl font-black text-[#1e272e]">84</div>
          </div>
        </div>
      </div>

      {/* 3. TRADERS TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search trader username..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#19be00]"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500"><Filter size={20} /></button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">Trader</th>
              <th className="px-6 py-4">Status / Badge</th>
              <th className="px-6 py-4 text-center">Return (1M)</th>
              <th className="px-6 py-4 text-center">Risk Score</th>
              <th className="px-6 py-4 text-center">Copiers</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {traders.map((trader) => (
              <tr key={trader.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={trader.image} alt={trader.name} className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200" />
                    <span className="text-sm font-bold text-[#1e272e] group-hover:text-[#19be00] cursor-pointer transition-colors">
                      {trader.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusTag status={trader.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-sm font-black ${trader.return1M.startsWith('+') ? 'text-[#46b445]' : 'text-red-500'}`}>
                    {trader.return1M}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${getRiskColor(trader.risk)}`}>
                      {trader.risk}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-bold text-gray-600 text-sm">
                  {trader.copiers}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#4ba3f5] hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={16}/></button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                    <button className="p-2 text-gray-400 hover:text-gray-600"><MoreVertical size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{/* UI HELPERS */}

function StatusTag({ status }: { status: string }) {
  const styles: any = {
    Featured: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Verified: 'bg-blue-100 text-blue-700 border-blue-200',
    Trending: 'bg-green-100 text-green-700 border-green-200',
    Standard: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded border ${styles[status]}`}>
      {status}
    </span>
  );
}

function getRiskColor(risk: number) {
  if (risk <= 3) return 'bg-green-100 text-green-700';
  if (risk <= 6) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}