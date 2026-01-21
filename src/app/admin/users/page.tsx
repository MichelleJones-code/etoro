import React from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Mail, 
  Download,
  ChevronDown
} from 'lucide-react';

const users = [
  { id: 1, name: 'Roy Banks', email: 'roybanks298@gmail.com', status: 'Active', tier: 'Bronze', balance: '$0.00', joined: 'Jan 19, 2026', kyc: 'Pending' },
  { id: 2, name: 'Sarah Connor', email: 's.connor@sky.net', status: 'Active', tier: 'Silver', balance: '$12,450.00', joined: 'Jan 10, 2026', kyc: 'Verified' },
  { id: 3, name: 'James Smith', email: 'jsmith@web.com', status: 'Banned', tier: 'Bronze', balance: '$450.00', joined: 'Dec 15, 2025', kyc: 'Rejected' },
  { id: 4, name: 'Elena Fisher', email: 'elena.f@uncharted.com', status: 'Pending', tier: 'Gold', balance: '$50,000.00', joined: 'Jan 02, 2026', kyc: 'Verified' },
];

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      {/* 1. TOP ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19be00]/20 focus:border-[#19be00] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            <Filter size={16} /> Filters
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <button className="bg-[#19be00] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#15a300] transition-colors">
            Add New User
          </button>
        </div>
      </div>

      {/* 2. USER TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] uppercase text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Club Tier</th>
              <th className="px-6 py-4">KYC</th>
              <th className="px-6 py-4">Total Balance</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#1e272e] border border-gray-200">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1e272e] group-hover:text-[#19be00] transition-colors cursor-pointer">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700">{user.tier}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.kyc === 'Verified' ? 'bg-[#46b445]' : user.kyc === 'Pending' ? 'bg-orange-400' : 'bg-red-500'
                    }`} />
                    <span className="text-xs font-semibold text-gray-600">{user.kyc}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-[#1e272e]">{user.balance}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{user.joined}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#4ba3f5] hover:bg-blue-50 rounded-lg transition-all" title="Message User">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Ban User">
                      <UserX size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Showing 1 to 4 of 1,284 users</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded bg-white disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-[#19be00] bg-[#19be00] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* SUB-COMPONENTS */}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Active: 'bg-green-100 text-green-700',
    Pending: 'bg-orange-100 text-orange-700',
    Banned: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}