'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/Header'

// Dynamic import for better code splitting
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-pulse" />,
})
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20 bg-gray-900 animate-pulse" />,
})

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  )
} 