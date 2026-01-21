'use client';

import React from 'react';
import { 
  Link2, 
  Unlink, 
  UserPlus, 
  AlertTriangle, 
  ExternalLink, 
  Search, 
  Filter,
  ArrowRight
} from 'lucide-react';

const activeCopytrades = [
  { id: 'CT-102', copier: 'Roy Banks', master: 'JeppeKirkBonde', invested: '$1,500.00', currentVal: '$1,582.40', profit: '+$82.40', startDate: 'Jan 15, 2026', stopLoss: '95%' },
  { id: 'CT-105', copier: 'James Smith', master: 'Wesl3y', invested: '$5,000.00', currentVal: '$4,850.00', profit: '-$150.00', startDate: 'Jan 10, 2026', stopLoss: '90%' },
  { id: 'CT-108', copier: 'Elena Fisher', master: 'CPHequities', invested: '$10,000.00', currentVal: '$10,240.00', profit: '+$240.00', startDate: 'Jan 18, 2026', stopLoss: '80%' },
];

export default function ManageCopytradesPage() {
  return (
    <div className="space-y-6">
      {/* 1. SECTION HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Active Copy Relationships</h1>
          <p className="text-sm text-gray-500">Monitor and manage investors following master traders.</p>
        </div>
        <div className="flex gap-3">
           <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Assets Under Copy</div>
              <div className="text-xl font-black text-[#1e272e]">$16,672.40</div>
           </div>
        </div>
      </div>

      {/* 2. TABLE ACTIONS */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search copier or master username..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#19be00]"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            <Filter size={16} /> Filter by Master
          </button>
        </div>
      </div>

      {/* 3. COPYTRADE TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">Relationship ID</th>
              <th className="px-6 py-4">Investors (Copier → Master)</th>
              <th className="px-6 py-4 text-center">Invested Amount</th>
              <th className="px-6 py-4 text-center">Current Value</th>
              <th className="px-6 py-4 text-center">P/L ($)</th>
              <th className="px-6 py-4 text-center">Stop Loss</th>
              <th className="px-6 py-4 text-right">Intervention</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activeCopytrades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{trade.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#1e272e]">{trade.copier}</span>
                    <ArrowRight size={14} className="text-gray-300" />
                    <span className="text-sm font-bold text-[#46b445]">{trade.master}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Started: {trade.startDate}</div>
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium text-gray-600">{trade.invested}</td>
                <td className="px-6 py-4 text-center text-sm font-bold text-[#1e272e]">{trade.currentVal}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-sm font-black ${trade.profit.startsWith('+') ? 'text-[#46b445]' : 'text-red-500'}`}>
                    {trade.profit}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full inline-block">
                    {trade.stopLoss}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-100 text-red-600 rounded text-[11px] font-bold hover:bg-red-50 transition-all" title="Force Stop Copy">
                      <Unlink size={14} /> Stop Copy
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500"><ExternalLink size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Risk Warning Footer */}
        <div className="p-4 bg-orange-50/50 border-t border-orange-100 flex items-center gap-2 text-xs text-orange-700 font-medium">
          <AlertTriangle size={14} />
          <span>Force-stopping a copytrade will instantly close all mirrored positions at the current market price for the investor.</span>
        </div>
      </div>
    </div>
  );
}