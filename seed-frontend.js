require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const processSteps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    desc: 'Before a single pixel is pushed, we immerse ourselves in your business model, target audience, and competitive landscape. We map out a tailored strategy designed to capture market share.'
  },
  {
    num: '02',
    title: 'Brand Identity',
    desc: 'We craft a timeless visual language. From typography to color theory, we ensure your brand commands attention and builds instant trust with your demographic.'
  },
  {
    num: '03',
    title: 'UX/UI Design',
    desc: 'Using Figma, we design high-fidelity interfaces. Every interaction is mapped out to minimize friction and maximize conversions. No guesswork, just data-backed design.'
  },
  {
    num: '04',
    title: 'Development',
    desc: 'We bring the designs to life using modern tech stacks like Next.js and Supabase. Expect blazing fast load times, flawless animations, and a bulletproof backend.'
  },
  {
    num: '05',
    title: 'Launch & Scale',
    desc: 'We don\'t just hand over the keys. We ensure a flawless launch, monitor analytics, and provide ongoing support to scale your digital presence as your business grows.'
  }
]

const finalCTA = {
  title: "Ready to scale?",
  description: "Stop losing clients to competitors with better websites. Let's build a digital presence that actually converts.",
  button_text: "Book Your Strategy Call",
  button_link: "#contact"
}

const contactInfo = {
  email: "hello@vaultnex.com",
  phone: "+91 (800) 123-4567",
  address: "Mumbai, Maharashtra, India",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com"
}

const footerInfo = {
  copyright: "© 2026 VaultNex. All rights reserved.",
  links: [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Service", url: "#" }
  ]
}

async function seed() {
  console.log("Seeding site settings...")
  
  const upsertSetting = async (key, value) => {
    await supabase.from('site_settings').upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key' })
    console.log(`Updated setting: ${key}`)
  }

  // Check if they exist first so we don't overwrite user changes
  const { data: settings } = await supabase.from('site_settings').select('key')
  const keys = settings?.map(s => s.key) || []

  if (!keys.includes('process')) await upsertSetting('process', processSteps)
  if (!keys.includes('cta')) await upsertSetting('cta', finalCTA)
  if (!keys.includes('contact')) await upsertSetting('contact', contactInfo)
  if (!keys.includes('footer')) await upsertSetting('footer', footerInfo)

  console.log("Seeding complete.")
}

seed().catch(console.error)
