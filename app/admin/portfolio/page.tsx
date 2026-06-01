'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Star, 
  EyeOff, 
  Link as LinkIcon, 
  Wrench,
  Sparkles,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from as any)('portfolio_projects').select('*').order('sort_order')
    setProjects(data || [])
    setLoading(false)
  }

  function startEdit(project: any) {
    setEditing(project.id)
    setForm({
      title: project.title,
      category: project.category || '',
      slug: project.slug,
      problem: project.problem || '',
      solution: project.solution || '',
      result: project.result || '',
      tools: (project.tools || []).join(', '),
      is_featured: project.is_featured,
      is_active: project.is_active,
    })
  }

  function startNew() {
    setEditing('new')
    setForm({ title: '', category: '', slug: '', problem: '', solution: '', result: '', tools: '', is_featured: false, is_active: true })
  }

  async function handleSave() {
    if (!form.title) return
    setSaving(true)
    const payload = {
      title: form.title,
      category: form.category,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      problem: form.problem,
      solution: form.solution,
      result: form.result,
      tools: form.tools.split(',').map((t: string) => t.trim()).filter(Boolean),
      is_featured: form.is_featured,
      is_active: form.is_active,
    }

    if (editing === 'new') {
      await (supabase.from as any)('portfolio_projects').insert({ ...payload, sort_order: projects.length + 1 })
    } else {
      await (supabase.from as any)('portfolio_projects').update(payload).eq('id', editing)
    }
    await load()
    setEditing(null)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return
    await (supabase.from as any)('portfolio_projects').delete().eq('id', id)
    setProjects(prev => prev.filter(p => p.id !== id))
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
              Portfolio
            </h1>
          </div>
          <p className="text-white/40 font-body">Manage and showcase your premium agency projects.</p>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={startNew}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-white/5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </div>

      {/* Forms & Table */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {editing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
                <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
                
                <h3 className="font-heading text-xl font-bold text-white mb-8 flex items-center gap-2 relative z-10">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  {editing === 'new' ? 'Add New Project' : 'Edit Project Details'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                  <Field label="Project Title *">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.title} 
                      onChange={e => setForm({ ...form, title: e.target.value })} 
                      placeholder="e.g. Aura Smart Home Branding" 
                    />
                  </Field>
                  <Field label="Category">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.category} 
                      onChange={e => setForm({ ...form, category: e.target.value })} 
                      placeholder="e.g. Website & Branding" 
                    />
                  </Field>
                  <Field label="URL Slug">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.slug} 
                      onChange={e => setForm({ ...form, slug: e.target.value })} 
                      placeholder="e.g. aura-smart-home" 
                    />
                  </Field>
                  <Field label="Tools / Stack (comma-separated)">
                    <input 
                      className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors" 
                      value={form.tools} 
                      onChange={e => setForm({ ...form, tools: e.target.value })} 
                      placeholder="e.g. Next.js, Tailwind, Framer Motion" 
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                  <Field label="The Challenge / Problem">
                    <textarea 
                      className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-28 resize-none font-body text-sm" 
                      value={form.problem} 
                      onChange={e => setForm({ ...form, problem: e.target.value })} 
                      placeholder="Describe the challenge..." 
                    />
                  </Field>
                  <Field label="The Solution">
                    <textarea 
                      className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-28 resize-none font-body text-sm" 
                      value={form.solution} 
                      onChange={e => setForm({ ...form, solution: e.target.value })} 
                      placeholder="Describe your design or development solution..." 
                    />
                  </Field>
                  <Field label="The Outcome / Result">
                    <textarea 
                      className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-28 resize-none font-body text-sm" 
                      value={form.result} 
                      onChange={e => setForm({ ...form, result: e.target.value })} 
                      placeholder="Detail the metrics, conversion rate, or success..." 
                    />
                  </Field>
                </div>

                <div className="flex flex-wrap gap-6 mb-8 relative z-10">
                  <label className="flex items-center gap-3 cursor-pointer text-sm text-white/60 hover:text-white transition-colors select-none">
                    <input 
                      type="checkbox" 
                      checked={form.is_featured} 
                      onChange={e => setForm({ ...form, is_featured: e.target.checked })} 
                      className="w-4 h-4 rounded border-white/20 bg-transparent text-white focus:ring-0 focus:ring-offset-0"
                    />
                    Feature on homepage
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-sm text-white/60 hover:text-white transition-colors select-none">
                    <input 
                      type="checkbox" 
                      checked={form.is_active} 
                      onChange={e => setForm({ ...form, is_active: e.target.checked })} 
                      className="w-4 h-4 rounded border-white/20 bg-transparent text-white focus:ring-0 focus:ring-offset-0"
                    />
                    Active (visible on website)
                  </label>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button 
                    onClick={handleSave} 
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Project'}
                  </button>
                  <button 
                    onClick={() => setEditing(null)} 
                    className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List of projects */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-white">Active Projects</h2>
            <span className="text-sm text-white/40">{projects.length} Items</span>
          </div>

          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-12 text-center text-white/30 text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center text-white/30 text-sm">No projects found. Add one to get started.</div>
            ) : (
              projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.01] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/70">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-white text-base">{project.title}</span>
                        {project.is_featured && (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Featured
                          </span>
                        )}
                        {!project.is_active && (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/10">
                            <EyeOff className="w-2.5 h-2.5" />
                            Hidden
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-white/40 mb-2">{project.category || 'No Category'}</p>
                      
                      {project.tools && project.tools.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Wrench className="w-3.5 h-3.5 text-white/20" />
                          {project.tools.map((tool: string) => (
                            <span key={tool} className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <button 
                      onClick={() => startEdit(project)} 
                      className="p-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 hover:text-white transition-all cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)} 
                      className="p-2.5 rounded-lg border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
        {label}
      </label>
      {children}
    </div>
  )
}
