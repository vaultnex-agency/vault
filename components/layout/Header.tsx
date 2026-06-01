'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export function Header({ settings = {} }: { settings?: any }) {
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      const y = window.scrollY
      const down = y > lastScrollY.current
      if (y > 80) {
        if (down) {
          header.style.transform = 'translateY(-100%)'
        } else {
          header.style.transform = 'translateY(0)'
          header.style.background = 'rgba(0,0,0,0.8)'
          header.style.backdropFilter = 'blur(24px)'
          header.style.borderBottom = '1px solid rgba(255,255,255,0.06)'
        }
      } else {
        header.style.transform = 'translateY(0)'
        header.style.background = 'transparent'
        header.style.backdropFilter = 'none'
        header.style.borderBottom = '1px solid transparent'
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.3s ease' }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: '0 clamp(1.5rem, 4vw, 4rem)', height: '68px' }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold tracking-tighter hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', letterSpacing: '-0.03em' }}
          >
            {settings?.brand_name || 'VAULTNEX'}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 border border-white/20 text-white text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Get Started
            </a>
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${mobileOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          background: 'rgba(0,0,0,0.96)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div
          className="flex flex-col justify-center h-full px-10 gap-8 transition-all duration-500"
          style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-bold text-white/70 hover:text-white transition-colors tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.03em' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 self-start inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full"
          >
            Get Started →
          </a>
        </div>
      </div>
    </>
  )
}
