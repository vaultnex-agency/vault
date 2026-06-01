export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VAULTNEX',
    description:
      'Building Future-Ready Digital Experiences. A premium creative digital agency helping businesses establish a strong online presence through branding, web design, and digital experiences.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vaultnex.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vaultnex.com'}/logo.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8113824528',
        contactType: 'customer service',
        availableLanguage: ['English', 'Malayalam', 'Hindi'],
      },
    ],
    email: 'vaultnex01@gmail.com',
    sameAs: [],
    serviceArea: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Agency Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landing Page Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Website Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Setup' } },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
