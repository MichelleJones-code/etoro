'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, ExternalLink, QrCode } from 'lucide-react';
import { DepositModal } from '@/components/dashboard/sections/DepositModal';

export default function WalletPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-3 pb-12">
      
      {/* 1. MAIN TOTAL VALUE CARD */}
      <section className="bg-white rounded-lg px-8 py-10 ">
        <div className="flex justify-between items-start mb-2">
          <span className="tracking-tight font-light  text-gray-900">Your Total Value</span>
          <div className="flex flex-col items-end">
             <button className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-sm font-bold text-gray-700 hover:bg-gray-50">
               USD <ChevronDown size={16} />
             </button>
            
          </div>
        </div>

        <div className="flex items-center mt-4 justify-between gap-2">
        <div className="text-5xl font-bold text-[#1e272e] mb-6"><span className="text-2xl">$</span>0.00</div>
        <div className="text-xs text-gray-500 font-light">Last update at 19:33, 19/01/2026</div>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full mb-8"></div>
        
        <button 
          onClick={() => setIsDepositModalOpen(true)}
          className="flex items-center gap-2 border border-[#46b445] text-[#46b445] font-bold py-2 px-4 rounded-full text-sm hover:bg-green-50 transition-colors"
        >
          <Plus size={18} /> Add Funds to USD
        </button>
      </section>

      {/* Deposit Modal */}
      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
      />

      {/* 2. TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-3">
          
          {/* Asset Summary Card */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center pb-6 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="bg-[#19be00] p-1.5 rounded">
                   <div className="w-4 h-4 bg-white rounded-full opacity-80" />
                </div>
                <span className="font-bold text-[#1e272e]">Stocks & Crypto</span>
              </div>
              <span className="font-bold text-[#1e272e]">$0.00</span>
            </div>
            <div className="flex justify-between items-center pt-6 text-sm">
              <span className="text-gray-500 font-medium">Available Cash</span>
              <span className="text-gray-500 font-medium">$0.00</span>
            </div>
          </div>

          {/* Interest Promotion Card */}
          <PromoCard 
            title="Earn 3.25% Interest with eToro Options"
            description="Make your money work harder when you enroll in our high interest cash program via the eToro Options app."
            buttonLabel="Get eToro Options"
            imageSrc="https://images.unsplash.com/photo-1611974714658-66d2f13ee9a2?auto=format&fit=crop&q=80&w=400" 
          />

          {/* Crypto Wallet Promotion Card */}
          <PromoCard 
            title="Move crypto"
            description="Securely store, send and receive the world's most popular crypto in the eToro app."
            buttonLabel="Create Wallet"
            imageSrc="https://images.unsplash.com/photo-1621416848446-99520c33006a?auto=format&fit=crop&q=80&w=400"
          />
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-3">
          
          {/* Refer a Friend Card */}
          <div className="bg-white rounded-lg p-6 flex flex-col items-start min-h-[250px] relative overflow-hidden">
             <h3 className="text-xl font-bold text-[#1e272e] max-w-[180px] mb-2 leading-tight">Refer a friend. You'll both earn $30.</h3>
             <p className="text-gray-500 text-sm mb-6 max-w-[180px]">Invite friends to eToro and enjoy the rewards together.</p>
             <button className="border border-[#46b445] text-[#46b445] font-bold py-2 px-8 rounded-full text-sm hover:bg-green-50 transition-colors">
               Invite
             </button>
             {/* Simple Avatar Collage Simulation */}
             <div className="absolute right-0 bottom-4 w-32 h-32 opacity-80 grayscale">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Friend1" className="absolute top-0 right-4 w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Friend2" className="absolute top-10 right-10 w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Friend3" className="absolute bottom-4 right-2 w-10 h-10 rounded-full border-2 border-white" />
             </div>
          </div>

          {/* App QR Card */}
          <div className="bg-white rounded-lg p-6 flex gap-4">
             <div className="flex-1">
               <h3 className="font-bold text-[#1e272e] mb-2">Your portfolio on the go</h3>
               <p className="text-xs text-gray-500 leading-relaxed">Manage your investments with ease using the eToro app. Scan the code.</p>
             </div>
             <div className="shrink-0">
               <div className="bg-white border border-gray-200 p-2 rounded shadow-sm">
                 <QrCode size={48} strokeWidth={1.5} className="text-gray-800" />
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

{/* PROMO CARD COMPONENT */}
function PromoCard({ title, description, buttonLabel, imageSrc }: { title: string, description: string, buttonLabel: string, imageSrc: string }) {
  return (
    <div className="bg-white rounded-lg  flex overflow-hidden">
      <div className="flex-1 p-8">
        <h3 className="text-xl font-bold text-[#1e272e] mb-3">{title}</h3>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-sm">
          {description}
        </p>
        <button className="bg-[#19be00] hover:bg-[#15a300] text-white font-bold py-3 px-8 rounded-full transition-all text-sm shadow-md">
          {buttonLabel}
        </button>
      </div>
      <div className="w-1/3 relative hidden sm:block">
        <img src={imageSrc} className="absolute inset-0 w-full h-full object-cover" alt="promotion" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
      </div>
    </div>
  );
}