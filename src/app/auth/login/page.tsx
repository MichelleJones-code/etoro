'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#edf1f4] flex flex-col ">

   

      {/* Main Login Card */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl p-8 md:p-12">
          <h1 className="text-xl tracking-tighter text-center text-gray-800 mb-8">Sign in</h1>

          <form className="space-y-6">
            {/* Username Field */}
            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Username or Email</label>
              <input 
                type="text" 
                defaultValue="roybanks298"
                className="w-full pb-2 outline-none text-gray-700 bg-transparent"
              />
            </div>

            {/* Password Field */}
            <div className="relative border-b border-gray-300 focus-within:border-green-500 transition-colors">
              <input 
                type="password" 
                placeholder="Password"
                className="w-full pb-2 pt-4 outline-none text-gray-700 bg-transparent placeholder-gray-400"
              />
            </div>

            <div className="text-sm">
              <a href="#" className="text-[#46b445] font-medium hover:underline">Forgot password?</a>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="keep-logged" 
                className="w-5 h-5 accent-[#46b445] cursor-pointer" 
                defaultChecked 
              />
              <label htmlFor="keep-logged" className="text-sm text-gray-600 cursor-pointer">
                Keep me logged in for 30 days
              </label>
            </div>

            <button className="w-full bg-[#19be00] hover:bg-[#15a300] text-white font-bold py-3 rounded-full transition-colors text-lg shadow-md">
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition text-sm font-medium">
              <FcGoogle size={20} /> Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition text-sm font-medium">
              <FaApple size={20} /> Sign in with Apple
            </button>
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition text-sm font-medium">
              <FaFacebook size={20} className="text-[#1877F2]" /> Sign in with Facebook
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-[#46b445] font-semibold hover:underline">Sign up</a>
          </p>
        </div>
      </main>

      {/* Accessibility Button (Floating) */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-[#19be00] p-2 rounded-full shadow-lg hover:scale-110 transition">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}