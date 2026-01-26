'use client';

import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth';

interface HeaderProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) => {
  const user = useAuthStore((s) => s.user);
  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : (user?.username?.slice(0, 2) || '??').toUpperCase();

  return (
    <header className="py-4 bg-white flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen?.(!isMobileMenuOpen)}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors mr-2"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </button>
     
      <div className="flex-grow w-full max-w-full lg:max-w-sm mx-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-900 group-focus-within:text-[#46b445] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full bg-[#e4e5e67d]  rounded-sm py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:sca focus:bg-white focus:border-gray-300 focus:ring-0 transition-all"
          />
        </div>
      </div>

      {/* Right Section: Actions & Settings */}
      <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
    

        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <Bell size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </div>

        {/* User Initials / Profile Circle */}
        <div className="flex items-center pl-2 border-l border-gray-200">
          <div className="h-8 w-8 rounded-full bg-[#edf1f4] flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};