import React from 'react';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar';
import { AdminHeader } from '@/components/admin/layout/AdminHeader';

/**
 * AdminLayout handles the structural shell for all /admin routes.
 * It uses a flex container to keep the sidebar fixed to the left
 * and a nested flex column for the header and scrollable content.
 * Wrapped in AdminAuthGuard so only authenticated admins can access.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* 1. FIXED LEFT SIDEBAR */}
      <AdminSidebar />

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* 3. STICKY TOP HEADER */}
        <AdminHeader />

        {/* 4. SCROLLABLE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        {/* 5. OPTIONAL ADMIN FOOTER / STATUS BAR */}
        <footer className="h-8 bg-white border-t border-gray-200 px-6 flex items-center justify-between text-[10px] text-gray-400 font-medium select-none">
          <div className="flex items-center gap-4">
            <span>Server: aws-us-east-1</span>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> API: 12ms
            </span>
          </div>
          <div>© 2026 Admin Management System • v2.4.1-stable</div>
        </footer>
      </div>
    </div>
    </AdminAuthGuard>
  );
}