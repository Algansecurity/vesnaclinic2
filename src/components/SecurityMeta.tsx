import Head from 'next/head'

export default function SecurityMeta() {
  return (
    <Head>
      {/* Content Security Policy */}
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';" />
      
      {/* Prevent caching of sensitive content */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      
      {/* Prevent content type sniffing */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      
      {/* Prevent clickjacking */}
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      
      {/* XSS Protection */}
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Referrer Policy */}
      <meta name="referrer" content="no-referrer" />
      
      {/* Robots meta for sensitive pages */}
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      
      {/* Prevent translation */}
      <meta name="google" content="notranslate" />
      
      {/* Disable right-click and selection via meta */}
      <meta name="msapplication-config" content="none" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Custom security headers */}
      <meta name="security" content="vesna-hair-clinic-protected" />
      <meta name="copyright" content="© Vesna Hair Clinic. All rights reserved." />
      
      {/* Additional meta tags for protection */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#D4AF37" />
    </Head>
  )
} 