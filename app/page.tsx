import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CrystalCanvas } from '@/components/crystalline/CrystalCanvas'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { Pricing } from '@/components/sections/Pricing'
import { Team } from '@/components/sections/Team'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Contact } from '@/components/sections/Contact'

import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch all frontend data in parallel
  const [
    { data: siteSettings },
    { data: services },
    { data: projects },
    { data: testimonials },
    { data: pricing },
    { data: team }
  ] = await Promise.all([
    supabase.from('site_settings').select('*'),
    supabase.from('services').select('*').order('sort_order'),
    supabase.from('portfolio_projects').select('*').order('sort_order'),
    supabase.from('testimonials').select('*').order('sort_order'),
    supabase.from('pricing_packages').select('*').order('sort_order'),
    supabase.from('team_members').select('*').order('sort_order')
  ])

  // Convert settings array to object
  const settings = siteSettings?.reduce((acc: any, row: any) => ({ ...acc, [row.key]: row.value }), {}) || {}

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Crystalline background */}
      <CrystalCanvas />

      {/* Navigation */}
      <Header settings={settings} />

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero data={settings.hero} />
        <About data={settings.about} />
        <Services data={services || []} />
        <FeaturedWork data={projects || []} />
        <Process data={settings.process || []} />
        <Testimonials data={testimonials || []} />
        <Pricing data={pricing || []} />
        <Team data={team || []} />
        <FinalCTA data={settings.cta} />
        <Contact data={settings.contact} />
      </main>

      {/* Footer */}
      <Footer data={settings.footer} contact={settings.contact} />
    </>
  )
}
