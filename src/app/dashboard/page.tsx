'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  Image as ImageIcon, 
  BarChart2 
} from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const kycStatus = user?.kycStatus ?? 'none';
  const avatarSrc = user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'default'}`;

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 sm:px-6 lg:px-0">
      
      {/* 1. VERIFICATION PROGRESS CARD */}
      <section className="bg-white rounded-xl pr-4 sm:pr-6 lg:pr-10 overflow-hidden flex items-center flex-col lg:flex-row">
        {/* Progress Details */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 lg:p-12">
          {kycStatus === 'approved' ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-[#46b445] w-8 h-8" />
                <span className="text-[#46b445] font-bold text-lg">Identity verified</span>
              </div>
              <p className="font-light text-gray-600">Your account is verified. You&apos;re ready to trade.</p>
            </>
          ) : kycStatus === 'pending' ? (
            <>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-7 h-7 rounded-full border-2 border-amber-400 flex items-center justify-center text-xs font-bold text-amber-600">!</div>
                <span className="font-semibold text-amber-700">Under review</span>
              </div>
              <h1 className="text-2xl tracking-tight font-bold text-[#1e272e] mb-4">Verification in progress</h1>
              <p className="font-light tracking-tight leading-relaxed mb-8 max-w-md">
                We&apos;re reviewing your documents. We&apos;ll notify you once verification is complete.
              </p>
              <Link href="/dashboard/kyc">
                <span className="inline-block text-sm text-gray-500 cursor-default">View submission</span>
              </Link>
            </>
          ) : (
            <>
              {/* Step Bubbles */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#46b445] w-6 h-6" />
                  <div className="h-[1px] w-10 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">2</div>
                  <div className="h-[1px] w-10 bg-gray-200" />
                </div>
                <div className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">3</div>
              </div>

              <h1 className="text-2xl tracking-tight font-bold text-[#1e272e] mb-4">
                You&apos;re almost ready to trade
              </h1>
              <p className="font-light tracking-tight leading-tight leading-relaxed mb-8 max-w-md">
                Verifying your identity helps us prevent someone else from creating an account in your name.
              </p>

              <Link href="/dashboard/kyc">
                <button className="bg-[#19be00] hover:bg-[#15a300] tracking-tight text-white font-bold py-2 px-5 rounded-full transition-all active:scale-95">
                  Verify Your Account
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Video Thumbnail Section - hide when approved */}
        {kycStatus !== 'approved' && (
        <>
        <div className="w-full h-48 sm:h-56 lg:h-48 rounded-2xl max-w-xs mx-auto lg:mx-0 relative group cursor-pointer overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
            alt="Verification Video" 
            className="w-full h-full object-cover min-h-[200px] sm:min-h-[240px] lg:min-h-[280px] group-hover:scale-105 transition-transform duration-500"
          />
          {/* Green Border Frame (Visible in screenshot) */}
          <div className="absolute inset-4  pointer-events-none z-10" />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 lg:p-8">
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="fill-[#1e272e] text-[#1e272e] ml-1 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            
            <div className="relative z-20">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-2">
                <span className="bg-[#46b445] px-1.5 py-0.5 rounded text-white italic">e</span>
                <span className="text-white opacity-90">toro</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black leading-[0.9] text-white">
                LET'S TALK <br/>
                <span className="text-[#46b445]">VERIFICATION</span>
              </h3>
            </div>
          </div>
        </div>
        </>
        )}
      </section>

      {/* 2. LOWER CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Social Feed Post */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm overflow-hidden bg-gray-100 shrink-0">
                <img 
                  src={avatarSrc} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <textarea 
                  placeholder="What's on your mind?"
                  className="w-full border-none focus:ring-0 text-gray-700 resize-none pt-2 placeholder-gray-400 text-[15px] outline-none"
                  rows={2}
                ></textarea>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-6">
                  <button className="flex items-center gap-2 text-sm text-gray-500 font-semibold hover:text-[#46b445] transition-colors">
                    <ImageIcon size={18} /> Upload
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-500 font-semibold hover:text-[#46b445] transition-colors">
                    <BarChart2 size={18} /> Poll
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 h-fit">
          <h2 className="text-lg font-bold text-[#1e272e] mb-6">Got questions?</h2>
          <div className="space-y-1">
            <FAQItem label="What do I need for verification?" />
            <FAQItem label="How can I change my details?" />
            <FAQItem label="What is 'Copy Trading'?" />
          </div>
        </div>

      </div>
    </div>
  );
}

{/* FAQ Component Utility */}
function FAQItem({ label }: { label: string }) {
  return (
    <div className="group flex items-center justify-between py-4 cursor-pointer border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-[#46b445] font-bold text-xl leading-none">+</span>
        <span className="text-[14px] font-medium text-gray-600 group-hover:text-[#1e272e] transition-colors">
          {label}
        </span>
      </div>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
    </div>
  );
}