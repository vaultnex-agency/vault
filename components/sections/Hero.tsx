'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

// Free abstract tech videos (Pexels CDN — no attribution required for bg use)
const VIDEO_URL = 'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4' // Clean white/grey abstract
const VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/2759484/2759484-hd_1920_1080_30fps.mp4' // White wave fallback

export function Hero({ data = {} }: { data?: any }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-black">

      {/* ─── VIDEO BACKGROUND ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.05)' }}
        >
          <source src={data?.video_url || VIDEO_URL} type="video/mp4" />
          <source src={data?.video_fallback || VIDEO_FALLBACK} type="video/mp4" />
        </video>

        {/* Dark overlay — keeps text readable */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Radial vignette on edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-20 flex flex-col justify-between min-h-screen">

        {/* Main body */}
        <div
          className="flex-1 flex flex-col justify-center"
          style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)' }}
        >

          {/* Badge */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.22em] font-medium text-white/60"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
              {data?.badge || 'Premium Digital Agency · India'}
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(3.8rem, 9.5vw, 9rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#fff',
              }}
            >
              {data?.headline || 'VAULTNEX'}
            </motion.h1>
          </div>

          {/* Sub headline */}
          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.2rem, 3vw, 2.8rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '22ch',
                lineHeight: 1.2,
              }}
            >
              {data?.subheadline || 'We build websites that turn visitors into clients.'}
            </motion.p>
          </div>

          {/* Description + CTAs */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'rgba(255,255,255,0.38)',
                maxWidth: '36ch',
                lineHeight: 1.8,
              }}
            >
              {data?.description || 'Brands that work with us see a measurable leap in their online presence — from zero to unforgettable.'}
            </p>

            <div className="flex items-center gap-5 flex-wrap">
              {/* Primary CTA */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-white text-black font-semibold rounded-full transition-all duration-300 hover:bg-white/90 hover:pl-8 hover:pr-6"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.01em',
                  padding: '14px 28px',
                }}
              >
                Start a Project
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Secondary CTA */}
              <a
                href="#work"
                className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                View Our Work
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ─── STATS BAR ─── */}
        <motion.div
          className="relative z-30 border-t border-white/[0.07]"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(24px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-6"
            style={{ padding: '1.25rem clamp(1.5rem, 5vw, 5rem)' }}
          >
            {(data?.stats || [
              { value: '50+', label: 'Projects Delivered' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '3+', label: 'Years Active' },
              { value: '₹4,999', label: 'Starting Price' },
            ]).map((s: any, i: number) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#fff',
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.32)',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}

            {/* Scroll pill */}
            <div className="hidden lg:flex items-center gap-3">
              <div
                className="relative overflow-hidden rounded-full"
                style={{ width: '28px', height: '44px', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70"
                  animate={{ top: ['20%', '65%', '20%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                Scroll
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
