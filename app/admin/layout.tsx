import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — VAULTNEX',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#050505] selection:bg-white/30 font-body">
      {/* Cinematic ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-white/[0.02] rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Sidebar loaded client-side to allow auth checks */}
      <AdminSidebarWrapper />

      {/* Main content */}
      <div className="flex-1 overflow-auto relative z-10 custom-scrollbar">
        {children}
      </div>
    </div>
  )
}

// Client boundary for sidebar
import { AdminSidebar } from '@/components/admin/AdminSidebar'

function AdminSidebarWrapper() {
  return <AdminSidebar />
}


