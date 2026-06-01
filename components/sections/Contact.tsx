'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const WHATSAPP_NUMBERS = ['8113824528', '8714422242', '7306613586']
const PHONE_NUMBERS = ['8113824528', '8714422242', '7306613586']
const EMAIL = 'vaultnex01@gmail.com'

const SERVICES_LIST = [
  'Landing Page',
  'Business Website',
  'Portfolio Website',
  'E-commerce Website',
  'Logo Design',
  'Brand Identity',
  'Website Redesign',
  'Other',
]

export function Contact({ data = {} }: { data?: any }) {
  const activeEmail = data?.email || EMAIL
  const activePhone = Array.isArray(data?.phone) ? data.phone[0] : (data?.phone || PHONE_NUMBERS[0])
  
  let activeWhatsApp = WHATSAPP_NUMBERS
  if (Array.isArray(data?.whatsapp) && data.whatsapp.length > 0) {
    activeWhatsApp = data.whatsapp
  } else if (data?.whatsapp) {
    activeWhatsApp = [data.whatsapp]
  } else if (Array.isArray(data?.phone) && data.phone.length > 0) {
    activeWhatsApp = data.phone
  } else if (data?.phone) {
    activeWhatsApp = [data.phone]
  }
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const labelRef = useScrollReveal()
  const headRef = useScrollReveal({ delay: 100 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        const data = await res.json()
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <section
      id="contact"
      className="section-padding relative"
      style={{ zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container-site">
        <span ref={labelRef as React.RefObject<HTMLSpanElement>} className="section-label">
          Get In Touch
        </span>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(3rem, 6vw, 5rem)',
          }}
          className="lg:grid-cols-2"
        >
          {/* Left: Info */}
          <div ref={headRef as React.RefObject<HTMLDivElement>}>
            <h2 className="text-display-sm" style={{ marginBottom: '2rem' }}>
              Start Your
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>Next Project</span>
            </h2>

            <p
              style={{
                fontSize: '0.9375rem',
                color: '#B8B8B8',
                lineHeight: 1.7,
                maxWidth: '40ch',
                marginBottom: '3rem',
              }}
            >
              Have a project in mind? Reach out and let&apos;s discuss how we can help your brand
              grow online.
            </p>

            {/* Contact Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* WhatsApp */}
              <div>
                <div style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
                  WhatsApp
                </div>
                {activeWhatsApp.map((num) => (
                  <a
                    key={num}
                    href={`https://wa.me/${num.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9375rem',
                      color: '#B8B8B8',
                      textDecoration: 'none',
                      marginBottom: '0.375rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
                  >
                    <WhatsAppIcon />
                    {num}
                  </a>
                ))}
              </div>

              {/* Email */}
              <div>
                <div style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
                  Email
                </div>
                <a
                  href={`mailto:${activeEmail}`}
                  style={{
                    fontSize: '0.9375rem',
                    color: '#B8B8B8',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B8B8B8')}
                >
                  {activeEmail}
                </a>
              </div>

              {/* Response time */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.02)',
                  maxWidth: '280px',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>
                  Typical response time
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600 }}>
                  Within 24 hours
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {status === 'success' ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.375rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: '#B8B8B8', fontSize: '0.9375rem' }}>
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <FormField label="Your Name *">
                    <input
                      type="text"
                      id="contact-name"
                      className="input-field"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </FormField>
                  <FormField label="Email Address">
                    <input
                      type="email"
                      id="contact-email"
                      className="input-field"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </FormField>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <FormField label="Phone Number">
                    <input
                      type="tel"
                      id="contact-phone"
                      className="input-field"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </FormField>
                  <FormField label="Service Interested In">
                    <select
                      id="contact-service"
                      className="input-field"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      style={{
                        background: 'transparent',
                        color: form.service ? '#fff' : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="" style={{ background: '#111' }}>Select a service</option>
                      {SERVICES_LIST.map((s) => (
                        <option key={s} value={s} style={{ background: '#111' }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Your Message *">
                  <textarea
                    id="contact-message"
                    className="input-field"
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </FormField>

                {status === 'error' && (
                  <p style={{ color: 'rgba(255, 100, 100, 0.8)', fontSize: '0.875rem' }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', opacity: status === 'loading' ? 0.6 : 1 }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                  {status !== 'loading' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.6875rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '0.75rem',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
