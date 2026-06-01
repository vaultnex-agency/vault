'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function About({ data = {} }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-black"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-12 bg-white/30" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium font-body">
                The Vaultnex Ethos
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-tight text-white"
            >
              {data?.content ? (
                <span>{data.content}</span>
              ) : (
                <>We engineer <span className="font-bold italic">digital dominance</span> for brands that refuse to blend in.</>
              )}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-12">
              {[
                {
                  title: 'Strategy First',
                  desc: 'Every pixel serves a purpose. We combine deep market research with conversion-focused UX to build systems that scale.',
                  delay: 0.2
                },
                {
                  title: 'Relentless Execution',
                  desc: 'From bleeding-edge WebGL animations to lightning-fast Next.js architectures, we do not compromise on code quality.',
                  delay: 0.3
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-white font-semibold tracking-wide text-sm font-body uppercase">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed font-body text-[15px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            
          </div>

          {/* Right: Parallax Image */}
          <div className="lg:col-span-5 relative h-[600px] w-full hidden md:block rounded-sm overflow-hidden">
             {/* Fallback color while image loads */}
            <div className="absolute inset-0 bg-white/5" />
            
            <motion.div 
              style={{ y }} 
              className="absolute -inset-[10%] w-[120%] h-[120%]"
            >
               {/* High-end abstract architecture/agency stock image */}
              <img
                src="https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Vaultnex Studio"
                className="w-full h-full object-cover grayscale opacity-60 mix-blend-lighten"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
