'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Tag, 
  Plus, 
  Edit2, 
  Check, 
  X, 
  Sparkles, 
  ArrowLeft,
  DollarSign,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPricingPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from as any)('pricing_packages').select('*').order('sort_order')
    setPackages(data || [])
    setLoading(false)
  }

  function startEdit(pkg: any) {
    setEditing(pkg.id)
    setForm({ 
      name: pkg.name, 
      price: pkg.price, 
      description: pkg.description || '', 
      features: (pkg.features || []).join('\n'), 
      is_featured: pkg.is_featured, 
      cta_text: pkg.cta_text 
    })
  }

  async function save(id: string) {
    if (!form.name || !form.price) return
    setSaving(true)
    await (supabase.from as any)('pricing_packages').update({
      name: form.name, 
      price: form.price, 
      description: form.description,
      features: form.features.split('\n').map((f: string) => f.trim()).filter(Boolean),
      is_featured: form.is_featured, 
      cta_text: form.cta_text,
    }).eq('id', id)
    await load()
    setEditing(null)
    setSaving(false)
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
              Pricing Packages
            </h1>
          </div>
          <p className="text-white/40 font-body">Manage pricing tiers, featured plans, and call-to-actions.</p>
        </motion.div>
      </div>

      {/* Editor & List */}
      <div className="space-y-6">
        {loading ? (
          <div className="p-12 text-center text-white/30 text-sm">Loading pricing plans...</div>
        ) : (
          packages.map(pkg => (
            <div 
              key={pkg.id} 
              className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              {editing === pkg.id ? (
                <div className="p-6 md:p-8 space-y-6 relative z-10">
                  <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Edit Package: {pkg.name}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Package Name *">
                      <input 
                        className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                        value={form.name} 
                        onChange={e => setForm({ ...form, name: e.target.value })} 
                      />
                    </Field>
                    
                    <Field label="Price Title / Amount *">
                      <input 
                        className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                        value={form.price} 
                        onChange={e => setForm({ ...form, price: e.target.value })} 
                        placeholder="e.g. $4,999 or Custom" 
                      />
                    </Field>

                    <Field label="Short Description">
                      <input 
                        className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                        value={form.description} 
                        onChange={e => setForm({ ...form, description: e.target.value })} 
                      />
                    </Field>

                    <Field label="CTA Button Text">
                      <input 
                        className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                        value={form.cta_text} 
                        onChange={e => setForm({ ...form, cta_text: e.target.value })} 
                      />
                    </Field>
                  </div>

                  <Field label="Features (one per line)">
                    <textarea 
                      className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-48 resize-y font-body text-sm leading-relaxed" 
                      rows={6}
                      value={form.features} 
                      onChange={e => setForm({ ...form, features: e.target.value })} 
                      placeholder="e.g. Dedicated UI/UX Designer&#10;5 Business Days Delivery&#10;Unlimited Revisions" 
                    />
                  </Field>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-3 cursor-pointer text-sm text-white/60 hover:text-white transition-colors select-none">
                      <input 
                        type="checkbox" 
                        checked={form.is_featured} 
                        onChange={e => setForm({ ...form, is_featured: e.target.checked })} 
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-white focus:ring-0 focus:ring-offset-0"
                      />
                      Featured (highlighted) package
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => save(pkg.id)} 
                      className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Plan'}
                    </button>
                    <button 
                      onClick={() => setEditing(null)} 
                      className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${pkg.is_featured ? 'text-amber-400' : 'text-white/40'}`}>
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-heading font-bold text-2xl tracking-tight text-white">{pkg.price}</span>
                        <span className="text-white/70 font-medium text-sm">— {pkg.name}</span>
                        {pkg.is_featured && (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/40 mb-3">{pkg.description || 'No description'}</p>
                      
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mr-1.5">Includes:</span>
                        {(pkg.features || []).map((feat: string, i: number) => (
                          <span key={i} className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded border border-white/[0.03]">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="text-xs text-white/30 font-medium mr-2">CTA: &ldquo;{pkg.cta_text}&rdquo;</span>
                    <button 
                      onClick={() => startEdit(pkg)} 
                      className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 hover:text-white transition-all cursor-pointer"
                      title="Edit Plan"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
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
