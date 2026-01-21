import React from 'react';
import { 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  ShieldAlert, 
  Activity,
  MoreVertical,
  Search
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      {/* 1. TOP HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Admin Console</h1>
          <p className="text-sm text-gray-500">System overview and user management</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search users or tx IDs..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#19be00] outline-none w-64"
            />
          </div>
          <button className="bg-[#1e272e] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* 2. SYSTEM STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,842" trend="+12%" icon={<Users className="text-blue-500" />} isUp />
        <StatCard title="Total Deposits" value="$1.2M" trend="+5.4%" icon={<DollarSign className="text-green-500" />} isUp />
        <StatCard title="Active Trades" value="1,402" trend="-2.1%" icon={<Activity className="text-orange-500" />} isUp={false} />
        <StatCard title="Flagged Accounts" value="14" trend="Critical" icon={<ShieldAlert className="text-red-500" />} isWarning />
      </div>

      {/* 3. MAIN CONTENT: USER TABLE & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent User Management Table */}
        <div className="xl:col-span-2 bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-[#1e272e]">Recent Registrations</h2>
            <button className="text-sm text-[#4ba3f5] font-bold">View All</button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Verification</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <UserRow name="Roy Banks" email="roybanks298@gmail.com" status="Active" verification="30%" />
              <UserRow name="Sarah Connor" email="s.connor@sky.net" status="Pending" verification="100%" />
              <UserRow name="James Smith" email="jsmith@web.com" status="Banned" verification="0%" />
            </tbody>
          </table>
        </div>

        {/* System Health / Logs */}
        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <h2 className="font-bold text-[#1e272e] mb-6">System Health</h2>
          <div className="space-y-6">
            <HealthItem label="API Services" status="Healthy" uptime="99.98%" />
            <HealthItem label="Crypto Node" status="Syncing" uptime="94.12%" isWarning />
            <HealthItem label="Fiat Gateway" status="Healthy" uptime="100%" />
          </div>
          <div className="mt-8 pt-6 border-t border-gray-50">
             <div className="text-xs font-bold text-gray-400 uppercase mb-4">Live Event Log</div>
             <div className="space-y-3">
                <LogEntry time="2m ago" msg="New deposit of $500.00 by ID #881" />
                <LogEntry time="5m ago" msg="BTC withdrawal request flagged for review" isAlert />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

{/* UI HELPERS */}

function StatCard({ title, value, trend, icon, isUp, isWarning }: any) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${
          isWarning ? 'bg-red-50 text-red-600' : isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-[#1e272e]">{value}</div>
    </div>
  );
}

function UserRow({ name, email, status, verification }: any) {
  return (
    <tr className="hover:bg-gray-50/50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100" />
          <div>
            <div className="text-sm font-bold text-[#1e272e]">{name}</div>
            <div className="text-xs text-gray-400">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
          status === 'Active' ? 'bg-green-100 text-green-700' : status === 'Banned' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
        }`}>{status}</span>
      </td>
      <td className="px-6 py-4">
        <div className="w-24 mx-auto bg-gray-100 h-1.5 rounded-full">
          <div className="bg-[#4ba3f5] h-full rounded-full" style={{ width: verification }} />
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16}/></button>
      </td>
    </tr>
  );
}

function HealthItem({ label, status, uptime, isWarning }: any) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-sm font-bold text-gray-700">{label}</div>
        <div className="text-[10px] text-gray-400 font-medium">Uptime: {uptime}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isWarning ? 'bg-orange-400' : 'bg-[#46b445]'}`} />
        <span className="text-xs font-bold text-gray-600">{status}</span>
      </div>
    </div>
  );
}

function LogEntry({ time, msg, isAlert }: any) {
  return (
    <div className="flex gap-3 text-xs">
      <span className="text-gray-400 whitespace-nowrap">{time}</span>
      <span className={`${isAlert ? 'text-red-500 font-medium' : 'text-gray-600'}`}>{msg}</span>
    </div>
  );
}