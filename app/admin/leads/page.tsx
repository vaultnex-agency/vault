'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Inbox, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowLeft,
  X,
  ExternalLink,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string | null
  phone: string | null
  service: string | null
  message: string | null
  status: string
  created_at: string
}

const STATUS_OPTIONS = ['new', 'read', 'replied', 'archived']

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Lead | null>(null)

  useEffect(() => {
    loadLeads()
  }, [])

  async function loadLeads() {
    const { data } = await supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await (supabase.from('contact_leads') as any).update({ status }).eq('id', id)
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null)
  }

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase()) ||
      l.message?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || l.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin" className="text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white">
              Leads Board
            </h1>
          </div>
          <p className="text-white/40 font-body">
            {leads.length} total leads — {leads.filter(l => l.status === 'new').length} new incoming.
          </p>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="search"
            placeholder="Search name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {['all', ...STATUS_OPTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === s
                  ? 'bg-white text-black font-bold shadow-md shadow-white/5'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Table/List */}
        <div className={`rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-xl ${selected ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-white">Contact Submissions</h2>
            <span className="text-sm text-white/40">{filtered.length} Displayed</span>
          </div>

          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-12 text-center text-white/30 text-sm">Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-white/30 text-sm">No leads match the filters.</div>
            ) : (
              filtered.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelected(lead.id === selected?.id ? null : lead)}
                  className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                    selected?.id === lead.id 
                      ? 'bg-white/[0.06]' 
                      : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${lead.status === 'new' ? 'text-amber-400' : 'text-white/40'}`}>
                      <Inbox className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base mb-1">
                        {lead.name}
                      </h4>
                      <p className="text-sm text-white/40 flex flex-wrap gap-2 items-center">
                        <span>{lead.email || 'No Email'}</span>
                        {lead.service && (
                          <>
                            <span className="text-white/10">•</span>
                            <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                              {lead.service}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0">
                    <StatusBadge status={lead.status} />
                    <span className="text-xs text-white/30 font-medium">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Lead Side Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="font-heading text-lg font-bold text-white">Lead Details</h3>
                <button 
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 relative z-10">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1 block">Name</label>
                  <p className="text-lg font-medium text-white">{selected.name}</p>
                </div>

                {selected.email && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1 block">Email</label>
                    <a 
                      href={`mailto:${selected.email}`} 
                      className="text-sm text-white/70 hover:text-white flex items-center gap-1.5 transition-colors underline decoration-white/20 hover:decoration-white"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {selected.email}
                    </a>
                  </div>
                )}

                {selected.phone && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1 block">Phone</label>
                    <span className="text-sm text-white/70 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      {selected.phone}
                    </span>
                  </div>
                )}

                {selected.service && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1 block">Requested Service</label>
                    <span className="text-sm text-white/70">
                      {selected.service}
                    </span>
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1 block">Date Submitted</label>
                  <span className="text-sm text-white/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(selected.created_at).toLocaleDateString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-2 block">Status</label>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s} className="bg-[#111]">
                        {s.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {selected.message && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-2 block">Message</label>
                    <p className="text-sm text-white/75 bg-white/5 border border-white/5 rounded-xl p-4 leading-relaxed font-body whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  {selected.email && (
                    <a 
                      href={`mailto:${selected.email}`} 
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white text-black font-semibold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Reply
                    </a>
                  )}
                  {selected.phone && (
                    <a 
                      href={`https://wa.me/91${selected.phone.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white font-semibold text-xs transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    read: 'bg-white/5 text-white/50 border border-white/10',
    replied: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    archived: 'bg-white/5 text-white/30 border border-white/5',
  }
  
  return (
    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${colors[status] || colors.new}`}>
      {status}
    </span>
  )
}
