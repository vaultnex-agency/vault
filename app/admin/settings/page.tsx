'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Save, 
  Sparkles, 
  ArrowLeft,
  Search,
  Mail,
  Phone,
  Layout
} from 'lucide-react'
import Link from 'next/link'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from('site_settings') as any).select('*')
    const map: Record<string, any> = {}
    data?.forEach((row: any) => { map[row.key] = row.value })
    setSettings(map)
    setLoading(false)
  }

  async function saveSetting(key: string, value: any) {
    setSaving(key)
    await (supabase.from('site_settings') as any).upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) {
    return <div className="p-12 text-center text-white/30 text-sm">Loading settings...</div>
  }

  const hero = settings.hero || {}
  const about = settings.about || {}
  const seo = settings.seo || {}
  const contact = settings.contact || {}

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
              Global Settings
            </h1>
          </div>
          <p className="text-white/40 font-body">Manage configuration, meta details, and communications settings.</p>
        </motion.div>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Hero Section settings */}
        <SettingsCard 
          title="Hero Content" 
          description="Adjust homepage introductory headlines and action links."
          icon={Layout}
          onSave={() => saveSetting('hero', hero)} 
          saving={saving === 'hero'} 
          saved={saved === 'hero'}
        >
          <div className="space-y-6">
            <Field label="Main Headline">
              <textarea 
                className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-24 resize-none font-body text-sm leading-relaxed" 
                rows={2} 
                value={hero.headline || ''} 
                onChange={e => setSettings(p => ({ ...p, hero: { ...p.hero, headline: e.target.value } }))} 
              />
            </Field>
            <Field label="Subheadline">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={hero.subheadline || ''} 
                onChange={e => setSettings(p => ({ ...p, hero: { ...p.hero, subheadline: e.target.value } }))} 
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label="Primary CTA Text">
                <input 
                  className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                  value={hero.cta_primary || ''} 
                  onChange={e => setSettings(p => ({ ...p, hero: { ...p.hero, cta_primary: e.target.value } }))} 
                />
              </Field>
              <Field label="Secondary CTA Text">
                <input 
                  className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                  value={hero.cta_secondary || ''} 
                  onChange={e => setSettings(p => ({ ...p, hero: { ...p.hero, cta_secondary: e.target.value } }))} 
                />
              </Field>
            </div>
          </div>
        </SettingsCard>

        {/* About Section settings */}
        <SettingsCard 
          title="About Narrative" 
          description="Update the about segment narrative of your agency."
          icon={Settings}
          onSave={() => saveSetting('about', about)} 
          saving={saving === 'about'} 
          saved={saved === 'about'}
        >
          <Field label="Narrative Bio Content">
            <textarea 
              className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-36 resize-none font-body text-sm leading-relaxed" 
              rows={4} 
              value={about.content || ''} 
              onChange={e => setSettings(p => ({ ...p, about: { ...p.about, content: e.target.value } }))} 
            />
          </Field>
        </SettingsCard>

        {/* SEO Settings */}
        <SettingsCard 
          title="Search Optimization (SEO)" 
          description="Update global search title, description, and social preview assets."
          icon={Search}
          onSave={() => saveSetting('seo', seo)} 
          saving={saving === 'seo'} 
          saved={saved === 'seo'}
        >
          <div className="space-y-6">
            <Field label="Meta Title">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={seo.title || ''} 
                onChange={e => setSettings(p => ({ ...p, seo: { ...p.seo, title: e.target.value } }))} 
              />
            </Field>
            <Field label="Meta Description">
              <textarea 
                className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors h-24 resize-none font-body text-sm leading-relaxed" 
                rows={3} 
                value={seo.description || ''} 
                onChange={e => setSettings(p => ({ ...p, seo: { ...p.seo, description: e.target.value } }))} 
              />
            </Field>
            <Field label="OpenGraph (OG) Image URL">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={seo.og_image || ''} 
                onChange={e => setSettings(p => ({ ...p, seo: { ...p.seo, og_image: e.target.value } }))} 
                placeholder="/og-image.jpg" 
              />
            </Field>
          </div>
        </SettingsCard>

        {/* Contact Details */}
        <SettingsCard 
          title="Communication Channels" 
          description="Maintain contact email and whatsapp targets for visitor interactions."
          icon={Mail}
          onSave={() => saveSetting('contact', contact)} 
          saving={saving === 'contact'} 
          saved={saved === 'contact'}
        >
          <div className="space-y-6">
            <Field label="General Inbound Email">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={contact.email || ''} 
                onChange={e => setSettings(p => ({ ...p, contact: { ...p.contact, email: e.target.value } }))} 
                placeholder="vaultnex01@gmail.com" 
              />
            </Field>
            <Field label="WhatsApp Recipients (comma-separated)">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={(contact.whatsapp || []).join(', ')} 
                onChange={e => setSettings(p => ({ ...p, contact: { ...p.contact, whatsapp: e.target.value.split(',').map((s: string) => s.trim()) } }))} 
                placeholder="e.g. 918113824528, 918714422242" 
              />
            </Field>
            <Field label="Phone Contacts (comma-separated)">
              <input 
                className="w-full bg-transparent border-b border-white/15 px-0 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors text-sm" 
                value={(contact.phone || []).join(', ')} 
                onChange={e => setSettings(p => ({ ...p, contact: { ...p.contact, phone: e.target.value.split(',').map((s: string) => s.trim()) } }))} 
                placeholder="e.g. 918113824528, 918714422242" 
              />
            </Field>
          </div>
        </SettingsCard>
      </div>

    </div>
  )
}

function SettingsCard({ title, description, icon: Icon, children, onSave, saving, saved }: any) {
  return (
    <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="absolute -inset-px opacity-100 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
      
      <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-white/40 mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          {saved && (
            <span className="text-xs text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              ✓ Saved
            </span>
          )}
          <button 
            onClick={onSave} 
            disabled={saving}
            className="px-4 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6 relative z-10">
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: any) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
        {label}
      </label>
      {children}
    </div>
  )
}
