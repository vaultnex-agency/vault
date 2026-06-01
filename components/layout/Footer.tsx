'use client'

import Link from 'next/link'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

const SERVICES_LINKS = [
  'Landing Pages',
  'Business Websites',
  'Portfolio Websites',
  'E-commerce Websites',
  'Logo Design',
  'Brand Identity',
]

export function Footer({ data = {}, contact = {} }: { data?: any, contact?: any }) {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingBlock: '4rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container-site">
        {/* Top */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
          className="md:grid-cols-3"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.125rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#fff',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              VAULTNEX
            </Link>
            <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.7, maxWidth: '32ch' }}>
              Building Future-Ready Digital Experiences for ambitious brands across India.
            </p>
            <a
              href={`mailto:${contact?.email || 'vaultnex01@gmail.com'}`}
              style={{
                display: 'block',
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
              }}
            >
              {contact?.email || 'vaultnex01@gmail.com'}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>
              Navigation
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: '#B8B8B8', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem' }}>
              Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SERVICES_LINKS.map((s) => (
                <span key={s} style={{ fontSize: '0.875rem', color: '#B8B8B8' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            {data?.copyright || `© ${year} VAULTNEX. All rights reserved.`}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {(data?.links && Array.isArray(data.links) ? data.links.filter((l:any)=>l.label) : [{label: 'Privacy Policy', url: '#'}, {label: 'Terms of Service', url: '#'}]).map((item: any) => (
              <a
                key={item.label}
                href={item.url || '#'}
                style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
