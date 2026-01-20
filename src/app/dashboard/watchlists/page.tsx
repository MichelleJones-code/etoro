import React from 'react';
import { Plus, Settings2, LayoutGrid, ChevronDown, MoreHorizontal } from 'lucide-react';
import { PortfolioFooter } from '@/components/dashboard/sections/PortfolioFooter';
import { DiscoverSection } from '@/components/dashboard/sections/DiscoverSection';

// Sample Data based on screenshot
const watchlistData = [
  { id: 'NVDA', name: 'NVIDIA Corporation', price: '186.23', change: '-0.82', percent: '-0.44%', logo: 'https://logo.clearbit.com/nvidia.com', rangeMin: '86.50', rangeMax: '211.80', rangeCurrent: 186, sentiment: 95, sentimentLabel: 'Strong Buy' },
  { id: 'ADA', name: 'Cardano', price: '0.36930', change: '-0.02470', percent: '-6.27%', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.png', rangeMin: '0.33', rangeMax: '1.16', rangeCurrent: 0.37, sentiment: 62.5, sentimentLabel: 'Hold' },
  { id: 'XRP', name: 'XRP', price: '2.01970', change: '-0.03580', percent: '-1.74%', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', rangeMin: '1.59', rangeMax: '3.67', rangeCurrent: 2.02, sentiment: 62.5, sentimentLabel: 'Buy' },
  { id: 'ETH', name: 'Ethereum', price: '3212.5200', change: '-127.5800', percent: '-3.82%', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', rangeMin: '1370.96', rangeMax: '4955.11', rangeCurrent: 3212, sentiment: 50, sentimentLabel: 'Hold' },
  { id: 'BTC', name: 'Bitcoin', price: '93039.06', change: '-2339.04', percent: '-2.45%', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', rangeMin: '73667.64', rangeMax: '126279.62', rangeCurrent: 93039, sentiment: 50, sentimentLabel: 'Hold' },
];

export default function WatchlistPage() {
  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      {/* 1. Header Section */}
      <div className="p-6 border-b border-gray-100 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-xl font-bold text-[#1e272e] hover:bg-gray-50 px-2 py-1 rounded transition-colors">
            Watchlist <ChevronDown size={20} className="text-gray-400" />
          </button>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Plus size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Settings2 size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><LayoutGrid size={20} /></button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <FilterButton label="All" active />
          <FilterButton label="Market Open" />
          <FilterButton label="People" />
          <FilterButton label="Stocks" />
          <FilterButton label="Crypto" />
        </div>
      </div>

      {/* 2. Watchlist Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase text-gray-400 font-bold border-b border-gray-50">
              <th className="px-6 py-3 font-bold">Markets</th>
              <th className="px-6 py-3 font-bold text-center">Change 1D</th>
              <th className="px-6 py-3 font-bold text-center">Invest</th>
              <th className="px-6 py-3 font-bold text-center">52W Range</th>
              <th className="px-6 py-3 font-bold text-center">Sentiment</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {watchlistData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                {/* Market Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.logo} alt={item.id} className="w-8 h-8 rounded bg-gray-100 p-1 object-contain" />
                    <div>
                      <div className="font-bold text-sm text-[#1e272e]">{item.id}</div>
                      <div className="text-[11px] text-gray-400 font-medium">{item.name}</div>
                    </div>
                  </div>
                </td>
                
                {/* Price & Change */}
                <td className="px-6 py-4 text-center">
                  <div className="font-bold text-sm text-[#1e272e]">{item.price}</div>
                  <div className="text-[11px] font-bold text-red-500">
                    {item.change} ({item.percent})
                  </div>
                </td>

                {/* Invest Action */}
                <td className="px-6 py-4 text-center">
                  <button className="bg-[#19be00] hover:bg-[#15a300] text-white font-bold py-2 px-8 rounded text-sm transition-all active:scale-95 shadow-sm">
                    Buy
                  </button>
                </td>

                {/* 52W Range */}
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center max-w-[140px] mx-auto">
                    <div className="flex justify-between w-full text-[10px] text-gray-500 font-bold mb-1">
                      <span>{item.rangeMin}</span>
                      <span>{item.rangeMax}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full relative">
                      <div 
                        className="absolute h-3 w-3 bg-[#1e272e] rounded-full -top-1 border-2 border-white shadow-sm"
                        style={{ left: `${((item.rangeCurrent - Number(item.rangeMin)) / (Number(item.rangeMax) - Number(item.rangeMin))) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Sentiment */}
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center max-w-[120px] mx-auto">
                    <div className="text-[10px] font-bold text-gray-500 mb-1">
                      {item.sentiment}% <span className={item.sentimentLabel.includes('Buy') ? 'text-green-500' : 'text-orange-400'}>{item.sentimentLabel}</span>
                    </div>
                    <div className="flex w-full h-1.5 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: `${item.sentiment}%` }}></div>
                      <div className="bg-orange-400 h-full" style={{ width: `${(100 - item.sentiment) / 2}%` }}></div>
                      <div className="bg-red-500 h-full" style={{ width: `${(100 - item.sentiment) / 2}%` }}></div>
                    </div>
                  </div>
                </td>

                {/* Context Menu */}
                <td className="px-6 py-4 text-right">
                  <MoreHorizontal className="text-gray-300 cursor-pointer hover:text-gray-600 transition-colors inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
        <button className="w-full py-4 text-sm font-bold text-gray-400 hover:text-gray-600 flex items-center justify-center gap-2 border-t border-gray-50">
          <Plus size={16} /> Add Markets
        </button>
        <DiscoverSection />
      </div>

      
      <PortfolioFooter />
      
    </div>
  );
}

{/* UI Helpers */}
function FilterButton({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <button className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
      active ? 'bg-[#1e272e] text-white border-[#1e272e]' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
    }`}>
      {label}
    </button>
  );
}

