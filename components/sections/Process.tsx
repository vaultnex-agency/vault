'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STEPS = [
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

export function Process({ data = [] }: { data?: any[] }) {
  const activeSteps = data && data.length > 0 ? data : STEPS
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="process" ref={containerRef} className="relative py-32 md:py-48 bg-black border-t border-white/10">
      <div className="container-site">
        
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left: Sticky Header */}
          <div className="lg:w-1/3 relative">
            <div className="sticky top-40">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium font-body mb-6 block">
                Methodology
              </span>
              <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1] tracking-tight text-white mb-6">
                How we <br className="hidden lg:block"/> build.
              </h2>
              <p className="text-white/40 font-body leading-relaxed">
                A systematic approach to digital dominance. We leave nothing to chance.
              </p>
            </div>
          </div>

          {/* Right: Scrolling Steps */}
          <div className="lg:w-2/3 flex flex-col gap-12">
            {activeSteps.map((step: any, i: number) => (
              <StepCard key={step.num || i} step={step} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.9', 'start 0.4']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, y }}
      className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-sm"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        <span className="text-white/20 font-heading text-6xl md:text-8xl font-bold leading-none">
          {step.num}
        </span>
        <div className="flex flex-col justify-center">
          <h3 className="text-white font-heading text-2xl md:text-3xl font-bold tracking-tight mb-4">
            {step.title}
          </h3>
          <p className="text-white/50 font-body leading-relaxed md:text-lg">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
