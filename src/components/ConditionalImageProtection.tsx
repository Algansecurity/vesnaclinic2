'use client'

import { usePathname } from 'next/navigation'
import ImageProtection from './ImageProtection'

export default function ConditionalImageProtection() {
  const pathname = usePathname()
  
  // Admin panelinde image protection'ı çalıştırma
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  // Diğer sayfalarda normal image protection
  return <ImageProtection />
} 