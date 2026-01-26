'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useAuthStore } from '@/lib/stores/auth';

export default function SignupPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!termsAccepted || !privacyAccepted) {
      setError('Please accept the Terms and Privacy Policy to continue.');
      return;
    }
    const ok = await register({ email, username, password, firstName, lastName });
    if (ok) {
      router.push('/dashboard');
    } else {
      setError('Sign up failed. Email or username may already be in use. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#edf1f4] flex flex-col">
      <main className="flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl p-8 md:p-12">
          <h1 className="text-2xl tracking-tight font-bold text-center text-gray-800 mb-4">
            Join eToro
          </h1>
          <div className="mb-8">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition text-sm font-medium"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
            )}

            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-sm font-light text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pb-2 outline-none text-gray-700 bg-transparent"
                required
              />
            </div>

            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-sm font-light text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pb-2 outline-none text-gray-700 bg-transparent"
                required
              />
            </div>

            <div className="relative border-b border-gray-300 focus-within:border-green-500 transition-colors">
              <label className="block text-sm font-light text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pb-2 pt-2 outline-none text-gray-700 bg-transparent placeholder-gray-400"
                required
              />
            </div>

            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-sm font-light text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pb-2 outline-none text-gray-700 bg-transparent"
                required
              />
            </div>

            <div className="relative border-b border-green-400 transition-colors">
              <label className="block text-sm font-light text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pb-2 outline-none text-gray-700 bg-transparent"
                required
              />
            </div>

            <div className="flex items-start gap-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#46b445] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm tracking-tight text-gray-600">
                I accept the eToro AUS and eToro Service (by eToro AM) -{' '}
                <a
                  href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/369.pdf"
                  className="text-[#46b445] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Financial Product Terms
                </a>
                ,{' '}
                <a
                  href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/281.pdf"
                  className="text-[#46b445] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Product Disclosure Statement
                </a>{' '}
                and{' '}
                <a
                  href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/238.pdf"
                  className="text-[#46b445] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Financial Services Guide
                </a>{' '}
                (ASIC Regulated)
              </label>
            </div>

            <div className="flex items-start gap-x-3">
              <input
                type="checkbox"
                id="privacy"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#46b445] cursor-pointer"
              />
              <label htmlFor="privacy" className="text-sm tracking-tight text-gray-600">
                Acknowledge that my information will be used in accordance with the{' '}
                <a
                  href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/370.pdf"
                  className="text-[#46b445] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="https://www.etoro.com/sapi/kyc/api/v1/tnc/documents/155.pdf"
                  className="text-[#46b445] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cookie Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#19be00] hover:bg-[#15a300] disabled:opacity-70 text-white font-bold py-3 rounded-full transition-colors text-lg shadow-md"
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#46b445] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <div className="fixed bottom-6 right-6">
        <button
          type="button"
          className="bg-[#19be00] p-2 rounded-full shadow-lg hover:scale-110 transition"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
