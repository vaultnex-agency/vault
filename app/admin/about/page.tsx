'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { 
  Info, 
  Save, 
  Sparkles, 
  ArrowLeft,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default function AdminAboutPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    (supabase.from('site_settings') as any).select('value').eq('key', 'about').single().then(({ data }: any) => {
      setContent(data?.value?.content || '')
      setLoading(false)
    })
  }, [])

  async function save() {
    setSaving(true)
    await (supabase.from('site_settings') as any).upsert({ key: 'about', value: { content }, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return <div className="p-12 text-center text-white/30 text-sm">Loading about settings...</div>
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
              About Section
            </h1>
          </div>
          <p className="text-white/40 font-body">Refine the messaging and narrative of your agency.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {saved && (
            <span className="text-xs text-emerald-400 font-medium px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              ✓ Saved
            </span>
          )}
          <button 
            onClick={save} 
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-white/5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative h-fit"
        >
          <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
          
          <h2 className="font-heading text-lg font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
            <Sparkles className="w-5 h-5 text-purple-400" />
            About Narrative
          </h2>

          <div className="space-y-6 relative z-10">
            <Field label="About Narrative Text">
              <textarea 
                className="w-full bg-transparent border border-white/10 rounded-xl p-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-48 resize-none font-body text-sm leading-relaxed" 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                placeholder="VAULTNEX is a digital design partner..." 
              />
              <p className="text-[10px] text-white/30">Write a narrative summary that describes your unique value proposition.</p>
            </Field>
          </div>
        </motion.div>

        {/* Live preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-[#050505] p-8 md:p-12 relative flex flex-col justify-center min-h-[300px] overflow-hidden"
        >
          <div className="absolute top-6 left-8 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/30 font-semibold select-none">
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </div>

          <div className="relative z-10">
            <p className="font-heading text-xl sm:text-2xl font-light text-white leading-relaxed max-w-xl select-none">
              {content || 'Your narrative description preview goes here...'}
            </p>
          </div>
        </motion.div>
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
