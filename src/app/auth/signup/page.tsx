'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#edf1f4] flex flex-col ">

   

      {/* Main Login Card */}
      <main className="  flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl p-8 md:p-12">
          <h1 className="text-2xl tracking-tight font-bold text-center text-gray-800 mb-4">Join eToro</h1>
          <div className="">
            <button className="px-24 mb-8 mx-auto flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition text-sm font-medium">
              <FcGoogle size={20} /> Continue with Google
            </button>
          </div>

          <form className="space-y-6">
            {/* Username Field */}
            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-sm  font-light text-gray-700 mb-1">Email</label>
              <input 
                type="text" 
                defaultValue="roybanks298"
                className="w-full pb-2 outline-none text-gray-700 bg-transparent"
              />
            </div>

            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-sm  font-light text-gray-700 mb-1">Username</label>
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

          

            <div className="flex items-start gap-x-3">
              <input 
                type="checkbox" 
                id="keep-logged" 
                className="size-12 accent-[#46b445] cursor-pointer" 
                defaultChecked 
              />
              <label htmlFor="keep-logged" className="text-sm tracking-tight text-gray-600 cursor-pointer">
              I accept the eToro AUS and eToro Service (by eToro AM) - <a href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/369.pdf" className="link" target="_blank">Financial Product Terms</a>, <a href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/281.pdf" className="link" target="_blank">Product Disclosure Statement</a> and <a href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/238.pdf" className="link" target="_blank">Financial Services Guide</a> (ASIC Regulated)
              </label>
            </div>

            <div className="flex items-start gap-x-3">
              <input 
                type="checkbox" 
                id="keep-logged" 
                className="w-8 h-8 accent-[#46b445] cursor-pointer" 
                defaultChecked 
              />
              <label htmlFor="keep-logged" className="tracking-tight text-sm text-gray-600 cursor-pointer">
            Acknowledge that my information will be used in accordance with the <a href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/370.pdf" className="link" target="_blank">Privacy Policy</a> and <a href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/155.pdf" className="link" target="_blank">Cookie Policy</a>
              </label>
            </div>

            <button className="w-full bg-[#19be00] hover:bg-[#15a300] text-white font-bold py-3 rounded-full transition-colors text-lg shadow-md">
              Sign in
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-[#46b445] font-semibold hover:underline">Sign in</a>
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