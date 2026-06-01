import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { StructuredData } from '@/components/seo/StructuredData'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vaultnex.com'),
  title: {
    default: 'VAULTNEX — Premium Digital Agency',
    template: '%s | VAULTNEX',
  },
  description:
    'Building Future-Ready Digital Experiences. Websites, branding, and digital systems crafted to help businesses grow online.',
  keywords: ['digital agency', 'web design', 'branding', 'web development', 'SEO', 'VAULTNEX'],
  authors: [{ name: 'VAULTNEX' }],
  creator: 'VAULTNEX',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'VAULTNEX',
    title: 'VAULTNEX — Premium Digital Agency',
    description:
      'Building Future-Ready Digital Experiences. Websites, branding, and digital systems crafted to help businesses grow online.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VAULTNEX — Premium Digital Agency',
    description: 'Building Future-Ready Digital Experiences.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="bg-black text-white antialiased">
        <StructuredData />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
