'use client';

import React, { useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const clubTier = user ? (user.isPremium ? 'SILVER' : 'BRONZE') : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* 1. CLUB TIER HEADER */}
      <section className="bg-white rounded-lg p-8  text-center relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 border border-gray-100 rounded-full opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-gray-100 rounded-full opacity-50" />
        
        <div className="relative z-10">
          <p className=" text-gray-800 font-light tracking-tight ">Your current Club tier</p>
          <h1 className="text-4xl  tracking-tight text-[#1e272e] mb-6">{clubTier ?? '—'}</h1>
          
          {/* Progress Line */}
          <div className="max-w-md mx-auto flex items-center justify-between mb-8 relative">
            <div className="absolute h-[2px] bg-gray-200 w-full top-1/2 -translate-y-1/2 z-0" />
            <TierNode active={clubTier === 'BRONZE'} />
            <TierNode active={clubTier === 'SILVER'} color="bg-yellow-400" />
            <TierNode color="bg-gray-200" />
            <TierNode color="bg-gray-200" />
            <TierNode color="bg-gray-200" />
            <TierNode color="bg-blue-600" />
          </div>
          
          <button className="tracking-tight font-light text-gray-800 hover:text-[#1e272e] transition-colors">
            View Dashboard
          </button>
        </div>
      </section>

      {/* 2. MAIN SETTINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Left Column: Credentials & Documents */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Credentials Card */}
          <div className="bg-white rounded-lg ">
            <div className="pt-6 px-6 font-semibold text-[#1e272e]">Credentials</div>
            <div className="p-6 space-y-8">
              <CredentialItem label="USERNAME" value={user?.username ?? '—'} />
              <CredentialItem label={user?.verified ? 'EMAIL (VERIFIED)' : 'EMAIL (UNVERIFIED)'} value={user?.email ?? '—'} action="Change" />
              <CredentialItem label="PASSWORD" value="**********" action="Change" />
              <CredentialItem label="PHONE" value="" action="Add" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium text-gray-700">Set a Trusted Contact</span>
                <button className="border border-[#4ba3f5] text-[#4ba3f5] px-8 py-1.5 rounded text-sm font-bold hover:bg-blue-50">Set</button>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-lg ">
            <div className="pt-6 px-6 font-semibold text-[#1e272e]">Documents</div>
            <div className="p-6 space-y-6">
              <DocumentRow label="Account Statement" />
              <DocumentRow label="Stock lending activity reports" />
              <DocumentRow label="Tax Reports" />
            </div>
          </div>

          {/* Account Closure Action */}
          <div className="bg-white rounded-lg p-6  text-center">
             <button className=" font-light tracking-tight text-gray-500 hover:text-red-500 transition-colors">
               Close your eToro account
             </button>
          </div>
        </div>

        {/* Right Column: Security & Devices */}
        <div className="space-y-3">
          
          {/* Security Card */}
          <div className="bg-white rounded-lg p-6 ">
            <h3 className="font-semibold text-[#1e272e] mb-4">Security</h3>
            <p className="text-xs text-gray-700 tracking-tight  mb-6">
              Secure your account with additional layers of protection. <button className="text-[#4ba3f5] hover:underline">Read more</button>
            </p>
            
            <div className="flex justify-between items-start mb-8">
              <div className="max-w-[180px]">
                <div className="text-sm  text-gray-700 mb-1 tracking-tight font-light leading-tight">Two Factor Authentication</div>
                <div className="text-[10px] text-gray-700 leading-tight tracking-tight">Keep your account secure by requiring a second method of authentication.</div>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative p-1 cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                 <span className="absolute -bottom-5 right-0 text-[10px] text-gray-700 tracking-tight uppercase">Off</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 text-center">
              <button className="text-sm tracking-tight font-light text-gray-700 flex items-center justify-center gap-2 mx-auto">
                Phone verification required
              </button>
            </div>
          </div>

          {/* Connected Devices Card */}
            <div className="bg-white rounded-lg p-6 ">
            <h3 className="font-semibold tracking-tight text-[#1e272e] mb-6">Connected Devices</h3>
            <div className="flex items-center gap-4">
               <Monitor className="text-gray-400 shrink-0" size={24} />
               <div>
                  <div className=" tracking-tight  text-[#1e272e]">Windows 10, Chrome</div>
                  <div className="text-sm text-[#46b445] tracking-tight mb-1">This Device</div>
                  <div className="flex items-center tracking-tighter font-light  gap-2 text-sm text-gray-500">
                     <span className="inline-flex w-4 h-3 rounded-sm overflow-hidden border border-gray-200">
                       <span className="w-1/3 bg-green-600" />
                       <span className="w-1/3 bg-white" />
                       <span className="w-1/3 bg-green-600" />
                     </span> 
                     Nigeria, 102.90.116.149
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

{/* UI HELPERS */}

function TierNode({ active = false, color = "bg-gray-200" }: { active?: boolean, color?: string }) {
  return (
    <div className={`w-4 h-4 rounded-full border-2 border-white z-10 shadow-sm ${active ? 'bg-[#1e272e] ring-4 ring-gray-100' : color}`} />
  );
}

function CredentialItem({ label, value, action }: { label: string, value: string, action?: string }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="text-lg font-light tracking-tight text-[#1e272e] leading-tight">{value}</div>
        <div className="text-xs font-light text-gray-600 uppercase tracking-tight">{label}</div>
      </div>
      {action && (
        <button className="border border-[#4ba3f5] text-[#4ba3f5] px-8 py-1.5 rounded text-sm tracking-tight font-semibold  hover:bg-blue-50 transition-colors">
          {action}
        </button>
      )}
    </div>
  );
}

function DocumentRow({ label }: { label: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className=" tracking-tight font-light text-gray-700">{label}</span>
      <button className="border border-[#4ba3f5] text-[#4ba3f5] px-8 py-1.5 rounded text-sm font-semibold hover:bg-blue-50 transition-colors">
        View
      </button>
    </div>
  );
}