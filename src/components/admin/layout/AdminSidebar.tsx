'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  AlertTriangle,
  ChevronDown,
  Copy,
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';

interface AdminNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  count?: number;
}

const AdminNavItem = ({ icon, label, href, active = false, count }: AdminNavItemProps) => {
  return (
    <Link href={href}>
      <div 
        className={`
          flex items-center justify-between px-4 py-3 cursor-pointer transition-all
          ${active 
            ? 'bg-[#19be00]/10 text-[#19be00] border-r-4 border-[#19be00]' 
            : 'text-gray-400 hover:bg-white/5 hover:text-white border-r-4 border-transparent'}
        `}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-semibold">{label}</span>
        </div>
        {count && (
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
};

interface AdminNavItemWithDropdownProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  children: Array<{ label: string; href: string; active?: boolean }>;
}

const AdminNavItemWithDropdown = ({ icon, label, active = false, count, children }: AdminNavItemWithDropdownProps) => {
  const pathname = usePathname();
  const isAnyChildActive = children.some(child => pathname === child.href);
  const [isOpen, setIsOpen] = useState(isAnyChildActive);

  useEffect(() => {
    if (isAnyChildActive) {
      setIsOpen(true);
    }
  }, [isAnyChildActive]);

  return (
    <div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between px-4 py-3 cursor-pointer transition-all
          ${active || isOpen || isAnyChildActive
            ? 'bg-[#19be00]/10 text-[#19be00] border-r-4 border-[#19be00]' 
            : 'text-gray-400 hover:bg-white/5 hover:text-white border-r-4 border-transparent'}
        `}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-semibold">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {count && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {count}
            </span>
          )}
          <ChevronDown 
            size={16} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      {isOpen && (
        <div className="bg-[#1e293b] border-l-2 border-[#19be00]/20">
          {children.map((child, index) => (
            <Link key={index} href={child.href}>
              <div
                className={`
                  flex items-center px-4 py-2.5 pl-12 cursor-pointer transition-all
                  ${pathname === child.href
                    ? 'bg-[#19be00]/10 text-[#19be00] border-r-4 border-[#19be00]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border-r-4 border-transparent'}
                `}
              >
                <span className="text-sm font-medium">{child.label}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-[#0f172a] text-white h-screen flex flex-col shrink-0 border-r border-gray-800">
      <div className="p-6 mb-4">
        <Link href="/admin">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#19be00] p-1.5 rounded-lg">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Admin<span className="text-[#19be00]">Core</span></span>
          </div>
        </Link>
      </div>

      <nav className="grow overflow-y-auto space-y-1">
        <div className="px-4 py-2 text-[10px] uppercase text-gray-500 font-bold tracking-widest">General</div>
        <AdminNavItem 
          icon={<LayoutDashboard size={20}/>} 
          label="System Overview" 
          href="/admin"
          active={pathname === '/admin'}
        />
        <AdminNavItem 
          icon={<Users size={20}/>} 
          label="User Management" 
          href="/admin/users"
          active={pathname === '/admin/users' || pathname?.startsWith('/admin/users/')}
        />
        
        <div className="px-4 py-2 mt-6 text-[10px] uppercase text-gray-400 font-bold tracking-widest">Compliance</div>
        <AdminNavItem 
          icon={<ShieldCheck size={20}/>} 
          label="KYC Requests" 
          href="/admin/kyc"
          count={14}
          active={pathname === '/admin/kyc' || pathname?.startsWith('/admin/kyc/')}
        />
        
        
        <div className="px-4 py-2 mt-6 text-[10px] uppercase text-gray-400 font-bold tracking-widest">Financials</div>
        <AdminNavItemWithDropdown 
          icon={<CreditCard size={20}/>} 
          label="Transactions"
          active={pathname === '/admin/withdrawals' || pathname === '/admin/deposits'}
          children={[
            { label: 'Withdrawals', href: '/admin/withdrawals' },
            { label: 'Deposits', href: '/admin/deposits' }
          ]}
        />
        
        
        
        <AdminNavItemWithDropdown 
          icon={<Copy size={20}/>} 
          label="Copytrades"
          active={pathname === '/admin/copytraders' || pathname === '/admin/copytraders/manage'}
          children={[
            { label: 'Manage Copytraders', href: '/admin/copytraders/manage' },
            { label: 'Ongoing copytrades', href: '/admin/copytraders' }
          ]}
        />
      </nav>

      <div className="p-4 border-t border-gray-800">
        <AdminNavItem 
          icon={<Settings size={20}/>} 
          label="Global Settings" 
          href="/admin/settings"
          active={pathname === '/admin/settings'}
        />
        <AdminNavItem 
          icon={<LogOut size={20}/>} 
          label="Logout" 
          href="/admin"
        />
      </div>
    </aside>
  );
};