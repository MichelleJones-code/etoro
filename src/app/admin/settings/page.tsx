'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Percent, 
  UserCircle, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Save,
  Key,
  Database
} from 'lucide-react';

type TabType = 'payments' | 'fees' | 'account';

export default function GlobalSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('payments');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#1e272e]">Global Settings</h1>
          <p className="text-sm text-gray-500">Configure platform-wide financial gateways, fee structures, and security.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#19be00] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#15a300] transition-all">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      {/* 1. NAVIGATION TABS */}
      <div className="flex border-b border-gray-200 gap-8 bg-white px-6 pt-4 rounded-t-xl border-x border-t">
        <TabButton 
          label="Payment Methods" 
          icon={<CreditCard size={18} />} 
          active={activeTab === 'payments'} 
          onClick={() => setActiveTab('payments')} 
        />
        <TabButton 
          label="Fees & Limits" 
          icon={<Percent size={18} />} 
          active={activeTab === 'fees'} 
          onClick={() => setActiveTab('fees')} 
        />
        <TabButton 
          label="Admin Account" 
          icon={<UserCircle size={18} />} 
          active={activeTab === 'account'} 
          onClick={() => setActiveTab('account')} 
        />
      </div>

      {/* 2. TAB CONTENT */}
      <div className="bg-white p-8 rounded-b-xl border border-gray-100 min-h-[500px]">
        {activeTab === 'payments' && <PaymentMethodsTab />}
        {activeTab === 'fees' && <FeesTab />}
        {activeTab === 'account' && <AdminAccountTab />}
      </div>
    </div>
  );
}

{/* --- TAB 1: PAYMENT METHODS (CRYPTO CRUD) --- */}
function PaymentMethodsTab() {
  const [methods, setMethods] = useState([
    { id: 1, name: 'USDT (ERC20)', address: '0x742d...f44e', status: 'Active' },
    { id: 2, name: 'Bitcoin (BTC)', address: 'bc1qxy...z58m', status: 'Active' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[#1e272e] flex items-center gap-2">
          <Database size={20} className="text-[#4ba3f5]" /> Crypto Gateways
        </h3>
        <button className="text-xs font-bold text-[#19be00] flex items-center gap-1 hover:underline">
          <Plus size={14} /> Add New Currency
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {methods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-white border border-gray-200 flex items-center justify-center font-bold text-xs">
                {method.name.split(' ')[0][0]}
              </div>
              <div>
                <div className="text-sm font-bold text-[#1e272e]">{method.name}</div>
                <div className="text-xs font-mono text-gray-400">{method.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Active</span>
              <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

{/* --- TAB 2: FEES & LIMITS --- */}
function FeesTab() {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-[#1e272e]">Withdrawal Fees</h3>
          <div className="space-y-4">
            <FeeInput label="Flat Withdrawal Fee ($)" defaultValue="5.00" />
            <FeeInput label="Percentage Fee (%)" defaultValue="0.00" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-[#1e272e]">System Fees</h3>
          <div className="space-y-4">
            <FeeInput label="KYC Verification Fee ($)" defaultValue="0.00" />
            <FeeInput label="Minimum Deposit ($)" defaultValue="50.00" />
          </div>
        </div>
      </div>
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
        <ShieldCheck className="text-[#4ba3f5] shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Fee changes take effect immediately. Existing pending withdrawals will be processed using the rate at the time of request.
        </p>
      </div>
    </div>
  );
}

{/* --- TAB 3: ADMIN ACCOUNT --- */}
function AdminAccountTab() {
  return (
    <div className="max-w-md space-y-8 animate-in fade-in duration-300">
      <div className="space-y-6">
        <h3 className="font-bold text-[#1e272e] flex items-center gap-2">
          <Key size={20} className="text-gray-400" /> Security Credentials
        </h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#19be00]" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase">New Password</label>
            <input type="password" placeholder="Enter new password" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#19be00]" />
          </div>
          <button className="bg-[#1e272e] text-white w-full py-2.5 rounded-lg text-sm font-bold">Update Password</button>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h3 className="font-bold text-[#1e272e] mb-4">Maintenance Mode</h3>
        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg">
          <div className="text-sm font-semibold text-red-700">Disable User Logins</div>
          <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-not-allowed">
            <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

{/* --- UI HELPERS --- */}

function TabButton({ label, icon, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${
        active ? 'text-[#1e272e]' : 'text-gray-400 hover:text-gray-600'
      }`}
    >
      {icon} {label}
      {active && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#19be00]" />}
    </button>
  );
}

function FeeInput({ label, defaultValue }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      <input 
        type="text" 
        defaultValue={defaultValue} 
        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold text-[#1e272e] focus:border-[#19be00] outline-none" 
      />
    </div>
  );
}