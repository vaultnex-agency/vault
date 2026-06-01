'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Sparkles,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'

export default function AdminTeamPage() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from as any)('team_members').select('*').order('sort_order')
    setMembers(data || [])
    setLoading(false)
  }

  async function save(id?: string) {
    if (!form.name || !form.role) return
    setSaving(true)
    if (id) {
      await (supabase.from as any)('team_members').update(form).eq('id', id)
      setEditing(null)
    } else {
      await (supabase.from as any)('team_members').insert({ ...form, sort_order: members.length + 1 })
      setShowAdd(false)
      setForm({})
    }
    await load()
    setSaving(false)
  }

  async function del(id: string) {
    if (!confirm('Delete this team member?')) return
    await (supabase.from as any)('team_members').delete().eq('id', id)
    setMembers(prev => prev.filter(m => m.id !== id))
  }

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
              Team Members
            </h1>
          </div>
          <p className="text-white/40 font-body">Manage the creative minds behind the agency.</p>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => { setShowAdd(true); setForm({ name: '', role: '', bio: '', linkedin_url: '', twitter_url: '' }) }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-white/5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </motion.button>
      </div>

      {/* Add / Edit forms */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <TeamForm 
                form={form} 
                setForm={setForm} 
                saving={saving} 
                onSave={() => save()} 
                onCancel={() => setShowAdd(false)} 
                title="Add Team Member" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Members Cards Grid */}
        {loading ? (
          <div className="p-12 text-center text-white/30 text-sm">Loading team members...</div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-sm bg-white/[0.02] border border-white/10 rounded-2xl">
            No team members found. Add one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(m => (
              <div 
                key={m.id} 
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Hover gradient glow */}
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
                
                {editing === m.id ? (
                  <div className="w-full">
                    <TeamForm 
                      form={form} 
                      setForm={setForm} 
                      saving={saving} 
                      onSave={() => save(m.id)} 
                      onCancel={() => setEditing(null)} 
                      title="Edit Member" 
                    />
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* Avatar and Edit/Delete Actions */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-heading text-sm font-bold text-white/70">
                          {m.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => { setEditing(m.id); setForm({ name: m.name, role: m.role, bio: m.bio || '', linkedin_url: m.linkedin_url || '', twitter_url: m.twitter_url || '' }) }} 
                            className="p-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => del(m.id)} 
                            className="p-2 rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400/50 hover:text-red-400 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Member Info */}
                      <h3 className="font-heading text-lg font-semibold text-white mb-1">
                        {m.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider font-semibold text-white/40 mb-4">
                        {m.role}
                      </p>
                      
                      {m.bio && (
                        <p className="text-sm text-white/60 leading-relaxed line-clamp-4 mb-6">
                          {m.bio}
                        </p>
                      )}
                    </div>

                    {/* Social links */}
                    {(m.linkedin_url || m.twitter_url) && (
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        {m.linkedin_url && (
                          <a 
                            href={m.linkedin_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </a>
                        )}
                        {m.twitter_url && (
                          <a 
                            href={m.twitter_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                            aria-label="Twitter"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TeamForm({ form, setForm, saving, onSave, onCancel, title }: any) {
  return (
    <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
      <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
        <Sparkles className="w-5 h-5 text-emerald-400" />
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
        <Field label="Full Name *">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.name} 
            onChange={e => setForm({ ...form, name: e.target.value })} 
            placeholder="e.g. Liam Sterling" 
          />
        </Field>
        <Field label="Role *">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.role} 
            onChange={e => setForm({ ...form, role: e.target.value })} 
            placeholder="e.g. Lead UI Architect" 
          />
        </Field>
      </div>

      <div className="mb-6 relative z-10">
        <Field label="Biography">
          <textarea 
            className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-24 resize-none font-body text-sm" 
            value={form.bio} 
            onChange={e => setForm({ ...form, bio: e.target.value })} 
            placeholder="Write a brief professional bio..." 
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
        <Field label="LinkedIn Profile URL">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.linkedin_url} 
            onChange={e => setForm({ ...form, linkedin_url: e.target.value })} 
            placeholder="https://linkedin.com/in/username" 
          />
        </Field>
        <Field label="Twitter Profile URL">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.twitter_url} 
            onChange={e => setForm({ ...form, twitter_url: e.target.value })} 
            placeholder="https://twitter.com/username" 
          />
        </Field>
      </div>

      <div className="flex gap-3 relative z-10">
        <button 
          onClick={onSave} 
          className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Member'}
        </button>
        <button 
          onClick={onCancel} 
          className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
        {label}
      </label>
      {children}
    </div>
  )
}
