'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { 
  MonitorPlay, 
  Save, 
  Sparkles, 
  ArrowLeft,
  Eye
} from 'lucide-react'
import Link from 'next/link'

export default function AdminHeroPage() {
  const [hero, setHero] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    (supabase.from('site_settings') as any).select('value').eq('key', 'hero').single().then(({ data }: any) => {
      setHero(data?.value || {})
      setLoading(false)
    })
  }, [])

  async function save() {
    setSaving(true)
    await (supabase.from('site_settings') as any).upsert({ key: 'hero', value: hero, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) {
    return <div className="p-12 text-center text-white/30 text-sm">Loading hero settings...</div>
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
              Hero Section
            </h1>
          </div>
          <p className="text-white/40 font-body">Customize the primary introduction of your homepage.</p>
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
            <Sparkles className="w-5 h-5 text-amber-400" />
            Hero Editor
          </h2>

          <div className="space-y-6 relative z-10">
            <Field label="Main Headline">
              <textarea 
                className="w-full bg-transparent border border-white/10 rounded-xl p-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-28 resize-none font-body text-sm" 
                value={hero.headline || ''} 
                onChange={e => setHero({ ...hero, headline: e.target.value })} 
                placeholder="Building Future-Ready&#10;Digital Experiences" 
              />
              <p className="text-[10px] text-white/30">Press Enter/return to create a line break on the homepage.</p>
            </Field>

            <Field label="Sub-headline">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={hero.subheadline || ''} 
                onChange={e => setHero({ ...hero, subheadline: e.target.value })} 
                placeholder="Websites, branding, and digital systems..." 
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Primary CTA Button text">
                <input 
                  className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                  value={hero.cta_primary || ''} 
                  onChange={e => setHero({ ...hero, cta_primary: e.target.value })} 
                  placeholder="Get Your Website Now" 
                />
              </Field>
              <Field label="Secondary CTA Button text">
                <input 
                  className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                  value={hero.cta_secondary || ''} 
                  onChange={e => setHero({ ...hero, cta_secondary: e.target.value })} 
                  placeholder="View Work" 
                />
              </Field>
            </div>
          </div>
        </motion.div>

        {/* Live preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-[#050505] p-8 md:p-12 relative flex flex-col justify-center min-h-[400px] overflow-hidden"
        >
          {/* Subtle grid background preview */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="absolute top-6 left-8 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/30 font-semibold select-none">
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div className="font-heading text-4xl sm:text-5xl font-bold tracking-tight leading-tight select-none">
              {(hero.headline || 'Headline').split('\n').map((line: string, i: number) => (
                <div key={i} className={i === 1 ? 'text-white/40' : 'text-white'}>
                  {line}
                </div>
              ))}
            </div>

            <p className="text-sm text-white/50 max-w-md leading-relaxed select-none">
              {hero.subheadline || 'Subheadline goes here...'}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <span className="px-5 py-3 rounded-full bg-white text-black text-xs font-bold pointer-events-none select-none">
                {hero.cta_primary || 'Primary Button'}
              </span>
              <span className="px-5 py-3 rounded-full border border-white/15 bg-transparent text-white text-xs font-bold pointer-events-none select-none">
                {hero.cta_secondary || 'Secondary Button'}
              </span>
            </div>
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
