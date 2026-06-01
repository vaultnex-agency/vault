'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Inbox, 
  MonitorPlay, 
  Info, 
  Layers, 
  Image as ImageIcon, 
  MessageSquareQuote, 
  Tag, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Workflow,
  Megaphone
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Inbox },
  { href: '/admin/hero', label: 'Hero', icon: MonitorPlay },
  { href: '/admin/about', label: 'About', icon: Info },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon },
  { href: '/admin/process', label: 'Process', icon: Workflow },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/pricing', label: 'Pricing', icon: Tag },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return null

  return (
    <aside className="w-64 shrink-0 h-screen border-r border-white/10 bg-black/40 backdrop-blur-2xl flex flex-col sticky top-0 z-40">
      
      {/* Branding */}
      <div className="p-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-heading font-bold text-sm tracking-tighter">VX</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-white tracking-tight group-hover:text-white/80 transition-colors">
              VAULTNEX
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">Command Center</span>
          </div>
        </Link>
      </div>

      <div className="h-px bg-white/5 mx-6 mb-6" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`} />
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto">
        <div className="h-px bg-white/5 mb-4" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400" />
          Secure Logout
        </button>
      </div>

    </aside>
  )
}
