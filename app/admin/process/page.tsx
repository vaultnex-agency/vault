'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Plus, Edit2, Trash2, Check, X, GripVertical } from 'lucide-react'

export default function ProcessAdmin() {
  const [steps, setSteps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [saving, setSaving] = useState(false)
  
  const [form, setForm] = useState({ num: '', title: '', desc: '' })

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from('site_settings') as any).select('value').eq('key', 'process').single()
    if (data && data.value && Array.isArray(data.value)) {
      setSteps(data.value)
    } else {
      setSteps([])
    }
    setLoading(false)
  }

  async function saveAll(newSteps: any[]) {
    setSaving(true)
    await (supabase.from('site_settings') as any).upsert({ 
      key: 'process', 
      value: newSteps, 
      updated_at: new Date().toISOString() 
    }, { onConflict: 'key' })
    setSteps(newSteps)
    setSaving(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    let newSteps = [...steps]
    if (editing === 'new') {
      newSteps.push(form)
    } else if (typeof editing === 'number') {
      newSteps[editing] = form
    }
    await saveAll(newSteps)
    setEditing(null)
  }

  async function del(index: number) {
    if (!confirm('Delete this step?')) return
    let newSteps = steps.filter((_, i) => i !== index)
    await saveAll(newSteps)
  }

  if (loading) return <div className="p-10 text-white/50">Loading process steps...</div>

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-2">Process & Methodology</h1>
          <p className="text-white/50 text-sm">Manage the 'How we build' steps shown on the homepage.</p>
        </div>
        {!editing && (
          <button
            onClick={() => {
              setEditing('new')
              setForm({ num: String(steps.length + 1).padStart(2, '0'), title: '', desc: '' })
            }}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Step
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">{editing === 'new' ? 'Add Step' : 'Edit Step'}</h2>
            <button type="button" onClick={() => setEditing(null)} className="text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Number (e.g. 01)</label>
                <input
                  type="text"
                  required
                  value={form.num}
                  onChange={e => setForm({ ...form, num: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Description</label>
              <textarea
                required
                rows={4}
                value={form.desc}
                onChange={e => setForm({ ...form, desc: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white/90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : <><Check className="w-4 h-4" /> Save Step</>}
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-6 bg-black/40 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 shrink-0 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
              <span className="text-white font-heading font-bold text-xl">{step.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-white mb-1">{step.title}</h3>
              <p className="text-white/50 text-sm truncate">{step.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditing(i)
                  setForm(step)
                }}
                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => del(i)}
                className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {steps.length === 0 && !editing && (
          <div className="text-center py-20 border border-white/5 border-dashed rounded-xl">
            <p className="text-white/40">No process steps added yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
