import React from 'react';
import { Search, Bell, Globe, Command } from 'lucide-react';

export const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search Bar with Command K shortcut style */}
      <div className="flex-grow max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users, transactions, or IP addresses..."
            className="block w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-12 text-sm focus:bg-white focus:ring-2 focus:ring-[#19be00]/20 focus:border-[#19be00] outline-none transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 font-sans text-[10px] font-medium text-gray-400 border border-gray-200 rounded bg-white">
              <Command size={10} /> K
            </kbd>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] font-bold text-green-700 uppercase">Live: Production</span>
        </div>

        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold text-[#1e272e]">Super Admin</div>
            <div className="text-[10px] text-gray-500">Node #04-West</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#0f172a] flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};