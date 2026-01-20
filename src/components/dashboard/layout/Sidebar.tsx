import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users,
  Settings,
  LogOut,
  Home,
  Eye,
  PieChart,
  Search,
  Wallet
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { DepositFundsModal } from '@/components/dashboard/sections/DepositFundsModal';
import { useAuthStore } from '@/lib/stores/auth';

interface NavItemProps {
  label: string;
  href?: string;
  active?: boolean;
  badge?: string;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  collapsed?: boolean;
  onClick?: () => void;
}

const NavItem = ({ label, href, active = false, badge = "", variant = 'primary', icon: Icon, collapsed = false, onClick }: NavItemProps) => {
  const isSecondary = variant === 'secondary';
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const itemRef = React.useRef<HTMLDivElement>(null);
  
  const content = (
    <>
      {collapsed && Icon && <Icon size={20} className="shrink-0" />}
      {!collapsed && isSecondary && Icon && <Icon size={18} className="shrink-0" />}
      {!collapsed && <span className={`${isSecondary ? ' font-light' : 'text-[23px] leading-8 font-light'}`}>{label}</span>}
      {badge && (
        <span className={`bg-[#348525] text-[9px] text-gray-700 px-1 py-0.5 rounded-full ${collapsed ? 'absolute top-1 right-1' : ''}`}>
          {badge}
        </span>
      )}
    </>
  );

  const className = collapsed
    ? `relative flex items-center justify-center py-3 cursor-pointer transition-all duration-200 ${
        active 
          ? 'text-white bg-white/5' 
          : 'text-white hover:bg-white/5 hover:text-white'
      }`
    : `flex items-center space-x-2 px-8 py-1 cursor-pointer transition-all duration-200 ${
        isSecondary ? 'px-7' : ''
      } ${
        active 
          ? isSecondary
            ? 'text-white border-l-[3px] border-l-[#19be00]! font-medium' 
            : 'text-white border-l-[3px] border-l-[#19be00]! font-semibold' 
          : 'text-white hover:bg-white/5 hover:text-white border-l-transparent border-transparent'
      }`;

  if (collapsed) {
    // Collapsed state: show only icon with tooltip on hover
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top + rect.height / 2,
          left: rect.right + 8
        });
      }
      setShowTooltip(true);
    };

    const itemContent = href ? (
      <Link href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    ) : (
      <div className={className} onClick={onClick}>
        {content}
      </div>
    );
    
    return (
      <>
        <div
          ref={itemRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {itemContent}
        </div>
        {/* Tooltip - positioned outside sidebar using fixed positioning with slide animation */}
        {showTooltip && (
          <div 
            className="fixed pl-5 pr-4 py-2.5 bg-[#1e272e] text-white text-base rounded shadow-lg whitespace-nowrap z-[9999] pointer-events-none"
            style={{
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
              transform: 'translateY(-50%)',
              animation: 'slideOutFromSidebar 0.25s ease-out forwards'
            }}
          >
            {label}
          </div>
        )}
      </>
    );
  }
  
  // Expanded state: show text label, with icon for secondary items
  if (href) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        <div className="flex items-center gap-4">
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div className={className} onClick={onClick}>
      <div className="flex items-center gap-4">
        {content}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    router.push('/dashboard/login');
  };

  // Determine active state based on pathname
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(path);
  };

  return (
    <aside className={`
      bg-[#1e272e] text-white h-screen flex flex-col shrink-0 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-[350px]'}
    `}>
      {/* Brand Logo & Menu Toggle */}
      <div className={`pt-5 pb-6 flex items-center transition-all duration-300 ease-in-out ${
        isCollapsed ? 'px-4 justify-center' : 'px-7 justify-between'
      }`}>
        <div 
          className={`flex items-center gap-0.5 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          <img 
            src="/dash/logo.svg" 
            alt="eToro Logo" 
            className=""
          />
        </div>
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-white cursor-pointer transition-all duration-300 ease-in-out flex-shrink-0"
        >
          <img 
            src="/dash/icon-expand-collapse.svg" 
            alt="Menu" 
            className={`w-6 transition-transform duration-300 ease-in-out ${
              isCollapsed ? 'scale-x-[-1]' : 'scale-x-[1]'
            }`}
          />
        </button>
      </div>

      {/* Primary Navigation */}
      <div className="relative h-[70%] overflow-hidden flex-1">
        {/* Top fade overlay - fixed at top */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#1e272e] to-transparent z-10 pointer-events-none" />
        
        {isCollapsed ? (
          /* Collapsed navigation - evenly spread icons */
          <nav className="flex flex-col justify-between h-full pb-5 overflow-hidden transition-all duration-300 ease-in-out">
            <div className="flex-1 flex flex-col justify-evenly items-center py-4">
              <NavItem label="Home" href="/dashboard" active={isActive('/dashboard')} collapsed={isCollapsed} icon={Home} />
              <NavItem label="Watchlist" href="/dashboard/watchlists" active={isActive('/dashboard/watchlists')} collapsed={isCollapsed} icon={Eye} />
              <NavItem label="Portfolio" href="/dashboard/portfolio" active={isActive('/dashboard/portfolio')} collapsed={isCollapsed} icon={PieChart} />
              <NavItem label="Discover" href="/dashboard/discover" active={isActive('/dashboard/discover')} collapsed={isCollapsed} icon={Search} />
              <NavItem label="Wallet" href="/dashboard/wallet" active={isActive('/dashboard/wallet')} collapsed={isCollapsed} icon={Wallet} />
              <NavItem label="CopyTrader" href="/dashboard/discover" active={isActive('/dashboard/discover/copytrader')} badge="New" variant="secondary" icon={Users} collapsed={isCollapsed} />
              <NavItem label="Settings" href="/dashboard/settings" active={isActive('/dashboard/settings')} variant="secondary" icon={Settings} collapsed={isCollapsed} />
              <NavItem label="Logout" onClick={handleLogout} variant="secondary" icon={LogOut} collapsed={isCollapsed} />
            </div>
          </nav>
        ) : (
          /* Expanded navigation - normal layout */
          <nav className="overflow-y-auto sidebar-scrollbar pb-5 h-full transition-all duration-300 ease-in-out">
            {/* User Profile Progress Card */}
            <div className={`px-8 pt-4 mb-6 transition-all duration-300 ease-in-out ${
              isCollapsed ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[500px]'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-13 rounded-sm overflow-hidden bg-gray-600 border border-gray-500">
                  <img 
                    src="/dash/us.png" 
                    alt="Roy Banks" 
                    className="w-full"
                  />
                </div>
                <span className="font-semibold text-lg tracking-tight text-white">Roy Banks</span>
              </div>
              
              <div className="space-y-1.5 pt-4">
                <div className="flex justify-between font-light tracking-tight text-sm ">
                  <span>30% Complete</span>
                </div>
                <div className="w-full bg-zinc-900 h-[2.5px] rounded-full overflow-hidden">
                  <div className="bg-[#4ba3f5] h-full w-[30%]"></div>
                </div>
                <button className="font-extralight">
                  Complete Profile
                </button>
              </div>
            </div>

            <NavItem label="Home" href="/dashboard" active={isActive('/dashboard')} collapsed={isCollapsed} icon={Home} />
            <NavItem label="Watchlist" href="/dashboard/watchlists" active={isActive('/dashboard/watchlists')} collapsed={isCollapsed} icon={Eye} />
            <NavItem label="Portfolio" href="/dashboard/portfolio" active={isActive('/dashboard/portfolio')} collapsed={isCollapsed} icon={PieChart} />
            <NavItem label="Discover" href="/dashboard/discover" active={isActive('/dashboard/discover')} collapsed={isCollapsed} icon={Search} />
            <NavItem label="Wallet" href="/dashboard/wallet" active={isActive('/dashboard/wallet')} collapsed={isCollapsed} icon={Wallet} />
            
            {/* Section Heading */}
            <div className={`mt-8 px-8 pb-2 text-gray-500 tracking-tight transition-all duration-300 ease-in-out ${
              isCollapsed ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-[50px]'
            }`}>
              More
            </div>
            <NavItem label="CopyTrader" href="/dashboard/discover" active={isActive('/dashboard/discover/copytrader')} badge="New" variant="secondary" icon={Users} collapsed={isCollapsed} />
            <NavItem label="Settings" href="/dashboard/settings" active={isActive('/dashboard/settings')} variant="secondary" icon={Settings} collapsed={isCollapsed} />
            <NavItem label="Logout" onClick={handleLogout} variant="secondary" icon={LogOut} collapsed={isCollapsed} />
          </nav>
        )}
        
        {/* Bottom fade overlay - fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1e272e] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Sidebar Footer Actions */}
      <div className={`bg-[#1e272e] mt-2 border-gray-800/50 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'px-2' : 'px-8'
      }`}>
        <button 
          onClick={() => setIsDepositModalOpen(true)}
          className={`w-full mx-auto flex items-center justify-center tracking-tight font-light bg-[#4ba3f5] hover:bg-[#3d8ad4] text-white py-2.5 rounded-md transition-all duration-300 ease-in-out mb-4 shadow-lg shadow-black/20 ${
            isCollapsed ? '' : 'text-lg'
          }`}
          title={isCollapsed ? 'Deposit Funds' : undefined}
        >
          {isCollapsed ? (
            <Wallet size={20} />
          ) : (
            'Deposit Funds'
          )}
        </button>
      </div>
      <DepositFundsModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </aside>
  );
};