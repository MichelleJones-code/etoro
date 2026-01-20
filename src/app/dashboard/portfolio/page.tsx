'use client';

import React from 'react';
import { PieChart, List, History, Clock, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PortfolioFooter } from '@/components/dashboard/sections/PortfolioFooter';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      
      {/* 1. TOP NAV / FILTERS */}
      <div className="p-6 border-b border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center  gap-6">
          <button className="flex items-center gap-2 text-xl font-bold text-[#1e272e]">
            Stocks & Crypto Portfolio
          </button>
         
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Realized P/L</div>
            <div className="text-sm font-bold text-gray-800">$0.00</div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><Clock size={20} /></button>
        </div>
      </div>

    

      {/* 3. POSITIONS TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm tracking-tight font-light text-gray-800 border-b border-gray-50 sticky top-0 bg-white">
              <th className="px-6 py-4 font-semibold text-center">Market</th>
              <th className="px-6 py-4 font-semibold text-center">Amount</th>
              <th className="px-6 py-4 font-semibold text-center">Units</th>
              <th className="px-6 py-4 font-semibold text-center">Avg. Open</th>
              <th className="px-6 py-4 text-center">Invested</th>
              <th className="px-6 py-4 font-semibold text-center">P/L ($)</th>
              <th className="px-6 py-4 font-semibold text-center">Value</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {/* Empty State / Sample Row */}
            <tr className="  hover:bg-gray-50/50 transition-colors">
              <td colSpan={8} className="py-20 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <PieChart size={76} />
                  </div>
                  <div>
                    <p className="text-[#1e272e]  text-3xl font-bold">Your portfolio is empty</p>
                    <p className="text-gray-600 font-light tracking-tight">Start exploring investment opportunities by copying people and investing in markets or SmartPortfolios</p>
                  </div>
                
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. PERSISTENT FOOTER */}
      <PortfolioFooter />
    </div>
  );
}

{/* UI HELPERS */}

function PortfolioStatCard({ label, value, percent, trend }: any) {
  return (
    <div className="flex flex-col">
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-[#1e272e]">{value}</span>
        <span className={`text-[11px] font-bold ${
          trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'
        }`}>
          {percent}
        </span>
      </div>
    </div>
  );
}