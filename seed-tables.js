require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const SERVICES = [
  {
    title: 'Brand Identity',
    category: 'Design',
    desc: 'Timeless visual systems, logos, and typography that make your brand unmistakable in a crowded market.',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 1
  },
  {
    title: 'Digital Products',
    category: 'Development',
    desc: 'High-performance web applications and SaaS platforms built with Next.js, React, and Supabase.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 2
  },
  {
    title: 'E-Commerce',
    category: 'Conversion',
    desc: 'Custom Shopify and headless commerce solutions optimized for extremely high conversion rates.',
    image: 'https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 3
  },
  {
    title: 'Websites',
    category: 'Experience',
    desc: 'Immersive, award-winning marketing sites with WebGL and fluid animations.',
    image: 'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 4
  }
]

const PROJECTS = [
  {
    title: 'Decoratio',
    category: 'Website & Branding',
    description: 'Complete digital overhaul for a premium wedding decor brand, focusing on high-ticket conversions.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 1
  },
  {
    title: 'Bloom',
    category: 'E-Commerce',
    description: 'A headless Shopify experience that increased mobile conversions by 40% in 30 days.',
    image: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 2
  },
  {
    title: 'Artisan',
    category: 'Brand Identity',
    description: 'Striking visual language and web presence for a rapidly scaling local coffee roaster.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sort_order: 3
  },
]

const TESTIMONIALS = [
  {
    content: 'Professional design and smooth communication. The team understood our vision perfectly and delivered beyond our expectations.',
    name: 'Ananya Sharma',
    role: 'Founder, Decoratio Events',
    sort_order: 1
  },
  {
    content: 'VAULTNEX transformed our online presence completely. Our customers love the new website and we have seen a significant increase in inquiries.',
    name: 'Rahul Menon',
    role: 'CEO, Bloom Botanicals',
    sort_order: 2
  },
  {
    content: 'From concept to launch, the process was seamless. The brand identity they created is timeless and truly represents who we are.',
    name: 'Priya Nair',
    role: 'Owner, Artisan Coffee Co.',
    sort_order: 3
  },
]

const PACKAGES = [
  {
    name: 'Starter Website',
    price: '₹4,999+',
    description: 'Perfect for individuals and small businesses getting started online',
    features: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Basic SEO setup',
      'Contact form',
      'Social media links',
      '1 revision round',
      'Delivery in 7–10 days',
    ],
    cta: 'Get Started',
    is_popular: false,
    sort_order: 1
  },
  {
    name: 'Business Website',
    price: '₹14,999+',
    description: 'Comprehensive solution for growing businesses ready to scale',
    features: [
      'Up to 15 pages',
      'Custom design & development',
      'Advanced SEO setup',
      'Blog integration',
      'Analytics setup',
      'WhatsApp chat integration',
      '3 revision rounds',
      'Delivery in 14–21 days',
      'Post-launch support',
    ],
    cta: 'Most Popular',
    is_popular: true,
    sort_order: 2
  },
  {
    name: 'Premium Branding + Website',
    price: 'Custom Quote',
    description: 'Full-service creative package for ambitious brands',
    features: [
      'Full brand identity system',
      'Custom website design',
      'Logo & visual identity',
      'Social media branding kit',
      'Business card design',
      'Unlimited revisions',
      'Priority delivery',
      '30-day post-launch support',
    ],
    cta: 'Get a Quote',
    is_popular: false,
    sort_order: 3
  },
]

const TEAM = [
  {
    name: 'Arjun V.',
    role: 'Founder & Creative Director',
    bio: 'Passionate about crafting digital experiences that leave a lasting impression.',
    image: '',
    sort_order: 1
  },
  {
    name: 'Meera K.',
    role: 'Lead Designer',
    bio: 'Turning complex ideas into elegant, intuitive visual systems.',
    image: '',
    sort_order: 2
  },
  {
    name: 'Dev R.',
    role: 'Web Developer',
    bio: 'Building fast, accessible, and beautiful websites from the ground up.',
    image: '',
    sort_order: 3
  },
]

async function seed() {
  console.log("Seeding tables...")

  const { data: s } = await supabase.from('services').select('id')
  if (!s || s.length === 0) {
    await supabase.from('services').insert(SERVICES)
    console.log('Seeded services')
  }

  const { data: p } = await supabase.from('portfolio_projects').select('id')
  if (!p || p.length === 0) {
    await supabase.from('portfolio_projects').insert(PROJECTS)
    console.log('Seeded portfolio_projects')
  }

  const { data: t } = await supabase.from('testimonials').select('id')
  if (!t || t.length === 0) {
    await supabase.from('testimonials').insert(TESTIMONIALS)
    console.log('Seeded testimonials')
  }

  const { data: pr } = await supabase.from('pricing_packages').select('id')
  if (!pr || pr.length === 0) {
    await supabase.from('pricing_packages').insert(PACKAGES)
    console.log('Seeded pricing_packages')
  }

  const { data: tm } = await supabase.from('team_members').select('id')
  if (!tm || tm.length === 0) {
    await supabase.from('team_members').insert(TEAM)
    console.log('Seeded team_members')
  }

  console.log("Seeding complete.")
}

seed().catch(console.error)
