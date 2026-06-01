'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    title: 'Brand Identity',
    category: 'Design',
    desc: 'Timeless visual systems, logos, and typography that make your brand unmistakable in a crowded market.',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Digital Products',
    category: 'Development',
    desc: 'High-performance web applications and SaaS platforms built with Next.js, React, and Supabase.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'E-Commerce',
    category: 'Conversion',
    desc: 'Custom Shopify and headless commerce solutions optimized for extremely high conversion rates.',
    image: 'https://images.pexels.com/photos/2736834/pexels-photo-2736834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Websites',
    category: 'Experience',
    desc: 'Immersive, award-winning marketing sites with WebGL and fluid animations.',
    image: 'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

export function Services({ data = [] }: { data?: any[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const activeServices = data && data.length > 0 
    ? data.filter(s => s.is_active !== false) 
    : SERVICES

  return (
    <section id="services" className="relative py-32 bg-black min-h-screen flex flex-col justify-center border-t border-white/10">
      
      {/* Background Image Reveal */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.img
              key={hoveredIndex}
              src={activeServices[hoveredIndex]?.cover_image || activeServices[hoveredIndex]?.image || SERVICES[hoveredIndex % SERVICES.length].image}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container-site relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium font-body block mb-6">
              Our Capabilities
            </span>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-tight text-white max-w-2xl">
              We specialize in the extraordinary.
            </h2>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-white text-black font-semibold rounded-full px-6 py-3 hover:scale-105 transition-transform">
            Start a Project
          </a>
        </div>

        {/* Interactive List */}
        <div className="border-t border-white/20">
          {activeServices.map((service, i) => (
            <div
              key={i}
              className="group relative border-b border-white/20 py-8 md:py-12 cursor-pointer transition-colors hover:bg-white/[0.02]"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 relative z-10 px-4 md:px-8">
                
                {/* Title & Category */}
                <div className="flex items-center gap-8 md:w-1/2">
                  <span className="text-white/30 font-body text-sm w-8">0{i + 1}</span>
                  <h3 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:w-1/2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="text-white/50 font-body text-sm md:text-base max-w-sm group-hover:text-white/80 transition-colors">
                    {service.desc}
                  </p>
                  <span className="text-[10px] tracking-widest uppercase text-white/30 border border-white/10 rounded-full px-4 py-2 self-start md:self-auto group-hover:bg-white group-hover:text-black transition-all">
                    {service.category || 'Service'}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
