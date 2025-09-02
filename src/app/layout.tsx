import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ConditionalImageProtection from '@/components/ConditionalImageProtection'
import WhatsAppFloat from '@/components/WhatsAppFloat'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vesna Hair Clinic - Hayalinizdeki Saçlara Kavuşun',
  description: 'Profesyonel saç ekimi ve saç bakım hizmetleri. Hayalinizdeki saçlara birlikte ulaşalım.',
  keywords: 'saç ekimi, saç transplantasyonu, saç bakımı, hair transplant, Vesna Hair Clinic',
  authors: [{ name: 'Vesna Hair Clinic' }],
  creator: 'Vesna Hair Clinic',
  publisher: 'Vesna Hair Clinic',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vesnahairclinic.com'),
  alternates: {
    canonical: '/',
  },
    icons: {
        icon: '/images/logo2.png',
        shortcut: '/images/logo2.png',
        apple: '/images/logo2.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/logo2.png',
    },
  },
  openGraph: {
    title: 'Vesna Hair Clinic - Hayalinizdeki Saçlara Kavuşun',
    description: 'Profesyonel saç ekimi ve saç bakım hizmetleri. Hayalinizdeki saçlara birlikte ulaşalım.',
    url: 'https://vesnahairclinic.com',
    siteName: 'Vesna Hair Clinic',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vesna Hair Clinic - Hayalinizdeki Saçlara Kavuşun',
    description: 'Profesyonel saç ekimi ve saç bakım hizmetleri. Hayalinizdeki saçlara birlikte ulaşalım.',
    images: ['/images/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#111827" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body 
        className={`${inter.className} bg-gray-900 text-white antialiased`} 
        style={{
          width: '100%',
          minHeight: '100vh',
          overflowX: 'hidden',
          margin: '0',
          padding: '0',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <LanguageProvider>
          <ConditionalImageProtection />
          <WhatsAppFloat />
          <div 
            style={{
              width: '100%',
              minHeight: '100vh',
              overflowX: 'hidden',
              margin: '0',
              padding: '0',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
} 