'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export function FinalCTA({ data = {} }: { data?: any }) {
  const ref = useScrollReveal()

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
    >
      {/* Radial background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative', textAlign: 'center' }}>
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <span className="section-label" style={{ justifyContent: 'center' }}>
            Let&apos;s Build Together
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              marginBlock: '2.5rem',
              maxWidth: '18ch',
              marginInline: 'auto',
            }}
          >
            {data?.title ? data.title : (
              <>Ready to build something <span style={{ color: 'rgba(255,255,255,0.4)' }}>remarkable?</span></>
            )}
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: '#B8B8B8',
              maxWidth: '42ch',
              marginInline: 'auto',
              marginBottom: '3rem',
              lineHeight: 1.7,
            }}
          >
            {data?.description || "Book a free 30-minute consultation and let's explore what we can build together for your brand."}
          </p>

          <a href={data?.button_link || "#contact"} className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            {data?.button_text || "Book a Free Consultation"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
