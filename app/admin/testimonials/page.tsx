'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquareQuote, 
  Plus, 
  Edit2, 
  Trash2, 
  Star, 
  ArrowLeft, 
  Sparkles,
  Quote
} from 'lucide-react'
import Link from 'next/link'

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from as any)('testimonials').select('*').order('sort_order')
    setItems(data || [])
    setLoading(false)
  }

  function startEdit(item: any) {
    setEditing(item.id)
    setForm({ client_name: item.client_name, client_role: item.client_role || '', client_company: item.client_company || '', content: item.content, rating: item.rating })
  }

  async function save(id: string) {
    if (!form.client_name || !form.content) return
    setSaving(true)
    await (supabase.from as any)('testimonials').update(form).eq('id', id)
    await load()
    setEditing(null)
    setSaving(false)
  }

  async function add() {
    if (!form.client_name || !form.content) return
    setSaving(true)
    await (supabase.from as any)('testimonials').insert({ ...form, sort_order: items.length + 1 })
    await load()
    setShowAdd(false)
    setForm({})
    setSaving(false)
  }

  async function del(id: string) {
    if (!confirm('Delete this testimonial?')) return
    await (supabase.from as any)('testimonials').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const emptyForm = { client_name: '', client_role: '', client_company: '', content: '', rating: 5 }

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
              Testimonials
            </h1>
          </div>
          <p className="text-white/40 font-body">Manage reviews, ratings, and testimonials from clients.</p>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => { setShowAdd(true); setForm(emptyForm) }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-white/5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Review
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
              <TestimonialForm 
                form={form} 
                setForm={setForm} 
                saving={saving} 
                onSave={add} 
                onCancel={() => setShowAdd(false)} 
                title="Add Testimonial" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials List */}
        {loading ? (
          <div className="p-12 text-center text-white/30 text-sm">Loading testimonials...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-sm bg-white/[0.02] border border-white/10 rounded-2xl">
            No testimonials found. Add one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map(item => (
              <div 
                key={item.id} 
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 p-6 md:p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Hover gradient glow */}
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />

                {editing === item.id ? (
                  <div className="w-full">
                    <TestimonialForm 
                      form={form} 
                      setForm={setForm} 
                      saving={saving} 
                      onSave={() => save(item.id)} 
                      onCancel={() => setEditing(null)} 
                      title="Edit Testimonial" 
                    />
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* Top Header Row: Rating and Edit/Delete Actions */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < (item.rating || 5) 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-white/15'
                              }`} 
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => startEdit(item)} 
                            className="p-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/50 hover:text-white transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => del(item.id)} 
                            className="p-2 rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400/50 hover:text-red-400 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content of Testimonial */}
                      <div className="relative mb-6">
                        <Quote className="absolute -top-3 -left-3 w-8 h-8 text-white/[0.03] -z-10" />
                        <p className="text-white/70 leading-relaxed font-body text-sm italic">
                          &ldquo;{item.content}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Client info */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="font-heading font-semibold text-white text-sm">
                          {item.client_name}
                        </h4>
                        <p className="text-[11px] text-white/40 mt-0.5">
                          {item.client_role}
                          {item.client_company ? ` · ${item.client_company}` : ''}
                        </p>
                      </div>
                      
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40">
                        <MessageSquareQuote className="w-4 h-4" />
                      </div>
                    </div>
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

function TestimonialForm({ form, setForm, saving, onSave, onCancel, title }: any) {
  return (
    <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
      <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
        <Sparkles className="w-5 h-5 text-amber-400" />
        {title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 relative z-10">
        <Field label="Client Name *">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.client_name} 
            onChange={e => setForm({ ...form, client_name: e.target.value })} 
            placeholder="e.g. Elena Rostova" 
          />
        </Field>
        <Field label="Role / Designation">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.client_role} 
            onChange={e => setForm({ ...form, client_role: e.target.value })} 
            placeholder="e.g. VP of Product" 
          />
        </Field>
        <Field label="Company Name">
          <input 
            className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
            value={form.client_company} 
            onChange={e => setForm({ ...form, client_company: e.target.value })} 
            placeholder="e.g. Vespera Global" 
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 relative z-10">
        <Field label="Rating (1-5 stars)">
          <select 
            value={form.rating} 
            onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} 
            className="w-full bg-[#111] border-b border-white/15 px-2 py-2.5 text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
          >
            {[5, 4, 3, 2, 1].map(stars => (
              <option key={stars} value={stars} className="bg-[#111]">
                {stars} {stars === 1 ? 'Star' : 'Stars'}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mb-8 relative z-10">
        <Field label="Testimonial Text *">
          <textarea 
            className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-28 resize-none font-body text-sm" 
            value={form.content} 
            onChange={e => setForm({ ...form, content: e.target.value })} 
            placeholder="What did the client say about your service?" 
          />
        </Field>
      </div>

      <div className="flex gap-3 relative z-10">
        <button 
          onClick={onSave} 
          className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Testimonial'}
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
