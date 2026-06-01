'use client'

import { useState, useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TESTIMONIALS = [
  {
    content:
      'Professional design and smooth communication. The team understood our vision perfectly and delivered beyond our expectations.',
    author: 'Ananya Sharma',
    role: 'Founder, Decoratio Events',
  },
  {
    content:
      'VAULTNEX transformed our online presence completely. Our customers love the new website and we have seen a significant increase in inquiries.',
    author: 'Rahul Menon',
    role: 'CEO, Bloom Botanicals',
  },
  {
    content:
      'From concept to launch, the process was seamless. The brand identity they created is timeless and truly represents who we are.',
    author: 'Priya Nair',
    role: 'Owner, Artisan Coffee Co.',
  },
]

export function Testimonials({ data = [] }: { data?: any[] }) {
  const activeTestimonials = data && data.length > 0 ? data : TESTIMONIALS
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const labelRef = useScrollReveal()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % activeTestimonials.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(1rem)'
    el.style.filter = 'blur(4px)'
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s cubic-bezier(0.16,1,0.3,1)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      el.style.filter = 'blur(0)'
    }, 50)
  }, [active])

  const t = activeTestimonials[active] || activeTestimonials[0]

  return (
    <section
      id="testimonials"
      className="section-padding relative"
      style={{ zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container-site">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
          }}
        >
          <span ref={labelRef as React.RefObject<HTMLSpanElement>} className="section-label">
            Client Testimonials
          </span>

          <div ref={contentRef} style={{ maxWidth: '56ch' }}>
            {/* Quote mark */}
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '5rem',
                lineHeight: 0.8,
                color: 'rgba(255,255,255,0.08)',
                marginBottom: '1rem',
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <blockquote
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: '-0.02em',
                color: '#fff',
                marginBottom: '2rem',
              }}
            >
              {t.content || t.quote}
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {t.author || t.name}
              </span>
              <span style={{ fontSize: '0.8125rem', color: '#B8B8B8' }}>{t.role}</span>
            </div>
          </div>

          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {activeTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i)
                  if (intervalRef.current) clearInterval(intervalRef.current)
                  intervalRef.current = setInterval(() => {
                    setActive((prev) => (prev + 1) % activeTestimonials.length)
                  }, 5000)
                }}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === active ? '2rem' : '0.5rem',
                  height: '2px',
                  background: i === active ? '#fff' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
