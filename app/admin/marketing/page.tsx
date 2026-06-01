'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Check, Megaphone, MapPin, Link as LinkIcon } from 'lucide-react'

export default function MarketingAdmin() {
  const [cta, setCta] = useState({ title: '', description: '', button_text: '', button_link: '' })
  const [contact, setContact] = useState({ email: '', phone: '', address: '', instagram: '', twitter: '', linkedin: '' })
  const [footer, setFooter] = useState({ copyright: '', links: [{ label: '', url: '' }, { label: '', url: '' }] })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await (supabase.from('site_settings') as any).select('*').in('key', ['cta', 'contact', 'footer'])
    if (data) {
      data.forEach((row: any) => {
        if (row.key === 'cta') setCta(row.value)
        if (row.key === 'contact') setContact(row.value)
        if (row.key === 'footer') setFooter(row.value)
      })
    }
    setLoading(false)
  }

  async function saveSection(key: string, value: any) {
    setSaving(key)
    await (supabase.from('site_settings') as any).upsert({ 
      key, 
      value, 
      updated_at: new Date().toISOString() 
    }, { onConflict: 'key' })
    setTimeout(() => setSaving(null), 1000)
  }

  if (loading) return <div className="p-10 text-white/50">Loading settings...</div>

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-2">Marketing & Footer</h1>
        <p className="text-white/50 text-sm">Manage your Final CTA, Contact information, and Footer links.</p>
      </div>

      {/* Final CTA Section */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Final Call to Action</h2>
            <p className="text-white/50 text-xs">The bottom section before the footer</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Headline</label>
            <input
              type="text"
              value={cta.title}
              onChange={e => setCta({ ...cta, title: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Description</label>
            <textarea
              rows={3}
              value={cta.description}
              onChange={e => setCta({ ...cta, description: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Button Text</label>
              <input
                type="text"
                value={cta.button_text}
                onChange={e => setCta({ ...cta, button_text: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Button Link (e.g. #contact)</label>
              <input
                type="text"
                value={cta.button_link}
                onChange={e => setCta({ ...cta, button_link: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={() => saveSection('cta', cta)}
              className="flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              {saving === 'cta' ? <Check className="w-4 h-4 text-green-400" /> : 'Save CTA'}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Contact & Socials</h2>
            <p className="text-white/50 text-xs">Used in Contact section and Footer</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={e => setContact({ ...contact, email: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Phone</label>
            <input
              type="text"
              value={contact.phone}
              onChange={e => setContact({ ...contact, phone: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Physical Address</label>
            <input
              type="text"
              value={contact.address}
              onChange={e => setContact({ ...contact, address: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Twitter/X URL</label>
            <input
              type="text"
              value={contact.twitter}
              onChange={e => setContact({ ...contact, twitter: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">LinkedIn URL</label>
            <input
              type="text"
              value={contact.linkedin}
              onChange={e => setContact({ ...contact, linkedin: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Instagram URL</label>
            <input
              type="text"
              value={contact.instagram}
              onChange={e => setContact({ ...contact, instagram: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
        <div className="flex justify-end pt-6">
          <button
            onClick={() => saveSection('contact', contact)}
            className="flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
          >
            {saving === 'contact' ? <Check className="w-4 h-4 text-green-400" /> : 'Save Contact'}
          </button>
        </div>
      </section>

      {/* Footer Details */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-8 mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white">Footer Links</h2>
            <p className="text-white/50 text-xs">Copyright and legal links</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Copyright Text</label>
            <input
              type="text"
              value={footer.copyright}
              onChange={e => setFooter({ ...footer, copyright: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {footer.links?.map((link, i) => (
              <div key={i} className="space-y-4 p-4 border border-white/5 bg-black/20 rounded-lg">
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Link {i+1} Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={e => {
                      const newLinks = [...footer.links]
                      newLinks[i].label = e.target.value
                      setFooter({ ...footer, links: newLinks })
                    }}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Link {i+1} URL</label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={e => {
                      const newLinks = [...footer.links]
                      newLinks[i].url = e.target.value
                      setFooter({ ...footer, links: newLinks })
                    }}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => saveSection('footer', footer)}
              className="flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
            >
              {saving === 'footer' ? <Check className="w-4 h-4 text-green-400" /> : 'Save Footer'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
