import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://shg-designs.netlify.app'),
  title: 'SHG Designs | Digital Infrastructure & Web Solutions',
  description:
    'SHG Designs - a Sesigo Hive Group brand, delivers premium websites, domains, business emails, payment gateways, and custom CMS solutions for forward-thinking businesses.',
  keywords: ['web design', 'digital infrastructure', 'domains', 'business email', 'CMS', 'payment gateway', 'Botswana', 'Gaborone'],
  authors: [{ name: 'SHG Designs' }],
  openGraph: {
    title: 'SHG Designs | Digital Infrastructure & Web Solutions',
    description: 'Premium digital infrastructure for modern businesses.',
    type: 'website',
    url: 'https://shg-designs.netlify.app',
    siteName: 'SHG Designs',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
