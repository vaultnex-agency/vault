'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const TEAM = [
  {
    name: 'Arjun V.',
    role: 'Founder & Creative Director',
    bio: 'Passionate about crafting digital experiences that leave a lasting impression.',
    initials: 'AV',
  },
  {
    name: 'Meera K.',
    role: 'Lead Designer',
    bio: 'Turning complex ideas into elegant, intuitive visual systems.',
    initials: 'MK',
  },
  {
    name: 'Dev R.',
    role: 'Web Developer',
    bio: 'Building fast, accessible, and beautiful websites from the ground up.',
    initials: 'DR',
  },
]

export function Team({ data = [] }: { data?: any[] }) {
  const activeMembers = data && data.length > 0 ? data : TEAM
  const labelRef = useScrollReveal()
  const headRef = useScrollReveal({ delay: 100 })

  return (
    <section
      id="team"
      className="section-padding relative"
      style={{ zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container-site">
        <span ref={labelRef as React.RefObject<HTMLSpanElement>} className="section-label">
          The Team
        </span>

        <h2
          ref={headRef as React.RefObject<HTMLHeadingElement>}
          className="text-display-sm"
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', maxWidth: '24ch' }}
        >
          The People Behind{' '}
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>VAULTNEX</span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {activeMembers.map((member, index) => (
            <TeamCard key={member.name || index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({
  member,
  index,
}: {
  member: any
  index: number
}) {
  const ref = useScrollReveal({ delay: index * 100 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        padding: 'clamp(2rem, 3vw, 2.5rem)',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          {member.initials || (member.name ? member.name.substring(0, 2).toUpperCase() : '')}
        </span>
      </div>

      {/* Info */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.0625rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            marginBottom: '0.25rem',
          }}
        >
          {member.name}
        </h3>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '0.875rem',
          }}
        >
          {member.role}
        </div>
        <p style={{ fontSize: '0.875rem', color: '#B8B8B8', lineHeight: 1.65 }}>{member.bio}</p>
      </div>
    </div>
  )
}
