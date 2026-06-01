'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  Sparkles,
  ArrowLeft,
  Settings
} from 'lucide-react'
import Link from 'next/link'

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ category: '', title: '', description: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from as any)('services').select('*').order('sort_order')
    setServices(data || [])
    setLoading(false)
  }

  async function handleSave(id: string) {
    setSaveState('saving')
    await (supabase.from as any)('services').update({
      category: form.category,
      title: form.title,
      description: form.description,
    }).eq('id', id)
    await load()
    setEditingId(null)
    setSaveState('saved')
    setTimeout(() => setSaveState('idle'), 2000)
  }

  async function handleAdd() {
    if (!form.title || !form.category) return
    setSaveState('saving')
    await (supabase.from as any)('services').insert({
      category: form.category,
      title: form.title,
      description: form.description,
      sort_order: services.length + 1,
    })
    await load()
    setShowAdd(false)
    setForm({ category: '', title: '', description: '' })
    setSaveState('saved')
    setTimeout(() => setSaveState('idle'), 2000)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return
    await (supabase.from as any)('services').delete().eq('id', id)
    setServices(prev => prev.filter(s => s.id !== id))
  }

  async function toggleActive(id: string, current: boolean) {
    await (supabase.from as any)('services').update({ is_active: !current }).eq('id', id)
    setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: !current } : s))
  }

  const CATEGORIES = ['Website Services', 'Branding Services', 'Growth Services']
  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = services.filter(s => s.category === cat)
    return acc
  }, {} as Record<string, any[]>)

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
              Services
            </h1>
          </div>
          <p className="text-white/40 font-body">Manage your professional service offerings.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {saveState === 'saved' && (
            <span className="text-xs text-emerald-400 font-medium px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              ✓ Saved successfully
            </span>
          )}
          <button 
            onClick={() => { setShowAdd(true); setForm({ category: 'Website Services', title: '', description: '' }) }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-white/5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </motion.div>
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
              <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
                <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
                
                <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Add New Service
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                  <Field label="Category">
                    <select 
                      value={form.category} 
                      onChange={e => setForm({ ...form, category: e.target.value })} 
                      className="w-full bg-[#111] border-b border-white/15 px-2 py-2.5 text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c} className="bg-[#111] text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Service Title *">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.title} 
                      onChange={e => setForm({ ...form, title: e.target.value })} 
                      placeholder="e.g. Custom E-Commerce Development" 
                    />
                  </Field>
                </div>

                <div className="mb-8 relative z-10">
                  <Field label="Description">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.description} 
                      onChange={e => setForm({ ...form, description: e.target.value })} 
                      placeholder="Describe what is included in this service..." 
                    />
                  </Field>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button 
                    onClick={handleAdd} 
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    disabled={saveState === 'saving'}
                  >
                    {saveState === 'saving' ? 'Adding...' : 'Add Service'}
                  </button>
                  <button 
                    onClick={() => setShowAdd(false)} 
                    className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grouped Services Lists */}
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="p-12 text-center text-white/30 text-sm">Loading services...</div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/40 pl-2">
                  {category}
                </h2>
                
                <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-xl divide-y divide-white/5">
                  {items.length === 0 ? (
                    <div className="p-8 text-center text-white/20 text-xs">No services under this category.</div>
                  ) : (
                    items.map((service) => (
                      <div key={service.id} className="p-6 transition-colors hover:bg-white/[0.01]">
                        {editingId === service.id ? (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <Field label="Category">
                                <select 
                                  value={form.category} 
                                  onChange={e => setForm({ ...form, category: e.target.value })} 
                                  className="w-full bg-[#111] border-b border-white/15 px-2 py-2.5 text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                                >
                                  {CATEGORIES.map(c => (
                                    <option key={c} value={c} className="bg-[#111]">
                                      {c}
                                    </option>
                                  ))}
                                </select>
                              </Field>

                              <Field label="Title">
                                <input 
                                  className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white focus:outline-none focus:border-white transition-colors" 
                                  value={form.title} 
                                  onChange={e => setForm({ ...form, title: e.target.value })} 
                                />
                              </Field>
                            </div>

                            <Field label="Description">
                              <input 
                                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white focus:outline-none focus:border-white transition-colors" 
                                value={form.description} 
                                onChange={e => setForm({ ...form, description: e.target.value })} 
                              />
                            </Field>

                            <div className="flex gap-3 pt-2">
                              <button 
                                onClick={() => handleSave(service.id)} 
                                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                                disabled={saveState === 'saving'}
                              >
                                {saveState === 'saving' ? 'Saving...' : 'Save Changes'}
                              </button>
                              <button 
                                onClick={() => setEditingId(null)} 
                                className="px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 text-white text-xs transition-all cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${service.is_active ? 'text-white' : 'text-white/20'}`}>
                                <Layers className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className={`font-semibold text-base mb-1 ${service.is_active ? 'text-white' : 'text-white/40 line-through'}`}>
                                  {service.title}
                                </h3>
                                <p className="text-sm text-white/40 max-w-2xl">{service.description || 'No description provided.'}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 self-end sm:self-center">
                              <button 
                                onClick={() => toggleActive(service.id, service.is_active)} 
                                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                                  service.is_active 
                                    ? 'border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400' 
                                    : 'border-white/10 hover:border-white/20 hover:bg-white/5 text-white/30 hover:text-white/60'
                                }`}
                                title={service.is_active ? 'Deactivate Service' : 'Activate Service'}
                              >
                                {service.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                              
                              <button 
                                onClick={() => { setEditingId(service.id); setForm({ category: service.category, title: service.title, description: service.description || '' }) }} 
                                className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 hover:text-white transition-all cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              <button 
                                onClick={() => handleDelete(service.id)} 
                                className="p-2.5 rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>
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
