'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { 
  Users, 
  Briefcase, 
  Layers, 
  MessageSquareQuote, 
  ArrowUpRight,
  Plus,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

interface Stats {
  leads: number
  projects: number
  services: number
  testimonials: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ leads: 0, projects: 0, services: 0, testimonials: 0 })
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [leadsRes, projectsRes, servicesRes, testimonialsRes, recentLeadsRes] =
        await Promise.all([
          (supabase.from as any)('contact_leads').select('id', { count: 'exact', head: true }),
          (supabase.from as any)('portfolio_projects').select('id', { count: 'exact', head: true }),
          (supabase.from as any)('services').select('id', { count: 'exact', head: true }),
          (supabase.from as any)('testimonials').select('id', { count: 'exact', head: true }),
          supabase
            .from('contact_leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5),
        ])

      setStats({
        leads: leadsRes.count || 0,
        projects: projectsRes.count || 0,
        services: servicesRes.count || 0,
        testimonials: testimonialsRes.count || 0,
      })
      setRecentLeads(recentLeadsRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const STAT_CARDS = [
    { label: 'Total Leads', value: stats.leads, href: '/admin/leads', icon: Users, color: 'text-blue-400' },
    { label: 'Portfolio Projects', value: stats.projects, href: '/admin/portfolio', icon: Briefcase, color: 'text-emerald-400' },
    { label: 'Active Services', value: stats.services, href: '/admin/services', icon: Layers, color: 'text-purple-400' },
    { label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials', icon: MessageSquareQuote, color: 'text-amber-400' },
  ]

  const QUICK_ACTIONS = [
    { label: 'New Blog Post', href: '/admin/blog/new' },
    { label: 'Add Portfolio', href: '/admin/portfolio/new' },
    { label: 'Add Team Member', href: '/admin/team/new' },
  ]

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white mb-2">
            Overview
          </h1>
          <p className="text-white/40 font-body">Welcome back to the Vaultnex Command Center.</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <a href="/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-all">
            <ExternalLink className="w-4 h-4" />
            View Live Site
          </a>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {STAT_CARDS.map((stat, i) => (
          <Link key={stat.label} href={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient glow */}
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
              
              <div className="flex flex-col">
                <span className="font-heading text-4xl font-bold text-white tracking-tight mb-1">
                  {loading ? '—' : stat.value}
                </span>
                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Leads */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-white">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm text-white/40 hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="flex flex-col">
            {loading ? (
              <div className="p-8 text-center text-white/30 text-sm">Loading data...</div>
            ) : recentLeads.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">No incoming leads yet.</div>
            ) : (
              recentLeads.map((lead, i) => (
                <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors last:border-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white">{lead.name}</span>
                    <span className="text-sm text-white/40">{lead.email || lead.phone || 'No contact info'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {lead.service && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 border border-white/10 rounded-md text-white/50">
                        {lead.service}
                      </span>
                    )}
                    <StatusBadge status={lead.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 h-fit"
        >
          <h2 className="font-heading text-lg font-semibold text-white mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link 
                key={action.label} 
                href={action.href}
                className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all"
              >
                <span className="text-sm font-medium text-white/70 group-hover:text-white">{action.label}</span>
                <Plus className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

      </div>

    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-white text-black',
    read: 'bg-white/10 text-white/70',
    replied: 'bg-emerald-500/20 text-emerald-400',
    archived: 'bg-white/5 text-white/30',
  }
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${colors[status] || colors.new}`}>
      {status}
    </span>
  )
}
