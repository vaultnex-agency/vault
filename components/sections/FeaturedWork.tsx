'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PROJECTS = [
  {
    id: '01',
    title: 'Decoratio',
    category: 'Website & Branding',
    desc: 'Complete digital overhaul for a premium wedding decor brand, focusing on high-ticket conversions.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '02',
    title: 'Bloom',
    category: 'E-Commerce',
    desc: 'A headless Shopify experience that increased mobile conversions by 40% in 30 days.',
    image: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '03',
    title: 'Artisan',
    category: 'Brand Identity',
    desc: 'Striking visual language and web presence for a rapidly scaling local coffee roaster.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]

export function FeaturedWork({ data = [] }: { data?: any[] }) {
  const activeProjects = data && data.length > 0
    ? data.filter(p => p.is_active !== false)
    : PROJECTS
  return (
    <section id="work" className="relative py-32 bg-black overflow-hidden border-t border-white/10">
      <div className="container-site">
        
        {/* Header */}
        <div className="flex flex-col mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium font-body mb-6"
          >
            Selected Works
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-tight text-white max-w-2xl"
          >
            Proof is in the <span className="text-white/40 italic font-light">execution.</span>
          </motion.h2>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-32 md:gap-48">
          {activeProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  })

  // Slower parallax for image, slight y shift for text
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <div ref={cardRef} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}>
      
      {/* Image Container */}
      <div className="w-full md:w-[60%] relative h-[50vh] md:h-[80vh] overflow-hidden group">
        <motion.div 
          style={{ y: imageY }}
          className="absolute -inset-[15%] w-[130%] h-[130%]"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
        </motion.div>
      </div>

      {/* Text Container */}
      <div className="w-full md:w-[40%] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/30 font-body text-xl mb-4 block">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="font-heading text-[clamp(2.5rem,4vw,4rem)] font-bold tracking-tight text-white mb-6 leading-none">
            {project.title}
          </h3>
          <div className="h-px w-full bg-white/10 mb-8" />
          <span className="text-[11px] tracking-widest uppercase text-white/50 border border-white/10 rounded-full px-4 py-2 inline-block mb-6">
            {project.category || 'Case Study'}
          </span>
          <p className="text-white/60 font-body leading-relaxed text-lg mb-8 max-w-md">
            {project.desc || project.description || ''}
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-white uppercase tracking-widest text-xs font-bold hover:gap-4 transition-all">
            View Case Study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

    </div>
  )
}
