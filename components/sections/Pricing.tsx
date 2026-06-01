'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

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
    featured: false,
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
    featured: true,
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
    featured: false,
  },
]

export function Pricing({ data = [] }: { data?: any[] }) {
  const activePackages = data && data.length > 0 ? data : PACKAGES
  const labelRef = useScrollReveal()
  const headRef = useScrollReveal({ delay: 100 })

  return (
    <section
      id="pricing"
      className="section-padding relative"
      style={{ zIndex: 10, background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container-site">
        <span ref={labelRef as React.RefObject<HTMLSpanElement>} className="section-label">
          Pricing
        </span>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <h2
            ref={headRef as React.RefObject<HTMLHeadingElement>}
            className="text-display-sm"
            style={{ maxWidth: '22ch' }}
          >
            Transparent Pricing.{' '}
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Zero Surprises.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {activePackages.map((pkg, index) => (
            <PricingCard key={pkg.name || index} pkg={pkg} index={index} />
          ))}
        </div>

        <p
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          All prices exclude GST. Need something custom?{' '}
          <a href="#contact" style={{ color: '#B8B8B8', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Let&apos;s talk.
          </a>
        </p>
      </div>
    </section>
  )
}

function PricingCard({
  pkg,
  index,
}: {
  pkg: any
  index: number
}) {
  const ref = useScrollReveal({ delay: index * 80 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
        background: pkg.featured ? 'rgba(255,255,255,0.05)' : '#000',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Featured badge */}
      {pkg.is_popular || pkg.featured ? (
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.25rem 0.625rem',
            background: '#fff',
            color: '#000',
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '1px',
          }}
        >
          Popular
        </div>
      ) : null}

      <div style={{ marginBottom: '2rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9375rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
          }}
        >
          {pkg.name}
        </h3>

        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '0.75rem',
          }}
        >
          {pkg.price}
        </div>

        <p style={{ fontSize: '0.8125rem', color: '#B8B8B8', lineHeight: 1.6 }}>
          {pkg.description}
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          marginBottom: '1.5rem',
        }}
      />

      {/* Features */}
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          marginBottom: '2.5rem',
          flex: 1,
        }}
      >
        {(pkg.features && Array.isArray(pkg.features) ? pkg.features : (typeof pkg.features === 'string' ? pkg.features.split(',') : [])).map((feature: string, i: number) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              fontSize: '0.875rem',
              color: '#B8B8B8',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <path
                d="M2.5 7L5.5 10L11.5 4"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className={pkg.is_popular || pkg.featured ? 'btn-primary' : 'btn-outline'}
        style={{ textAlign: 'center', justifyContent: 'center' }}
      >
        {pkg.cta}
      </a>
    </div>
  )
}
