'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Instagram, MessageCircle, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'


const navigationKeys = ['nav.home', 'nav.about', 'nav.services', 'nav.beforeAfter', 'nav.contact']
const navigationHrefs = ['/', '/hakkimizda', '/hizmetler', '/once-sonra', '/iletisim']

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-out will-change-transform",
        isScrolled 
          ? "backdrop-blur-xl bg-black/70 shadow-2xl border-b border-white/10" 
          : "backdrop-blur-lg bg-black/50 shadow-xl"
      )}
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Gradient overlay - optimized */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40 transition-opacity duration-300"></div>
      
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 transition-all duration-300">
          {/* Logo - Mobile Optimized */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group hover:scale-105 transition-transform duration-300">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
              <Image
                src="/images/logo2.png"
                alt="Vesna Hair Clinic"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-black leading-tight transition-all duration-300 text-white hover:text-white relative group-hover:scale-105 overflow-hidden"
                  style={{
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #ffffff 0%, #fef08a 25%, #ffffff 50%, #fef08a 75%, #ffffff 100%)'
                    e.currentTarget.style.backgroundSize = '200% 100%'
                    e.currentTarget.style.backgroundClip = 'text'
                    e.currentTarget.style.webkitBackgroundClip = 'text'
                    e.currentTarget.style.webkitTextFillColor = 'transparent'
                    e.currentTarget.style.animation = 'shimmer 1.5s ease-in-out infinite'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none'
                    e.currentTarget.style.backgroundClip = 'unset'
                    e.currentTarget.style.webkitBackgroundClip = 'unset'
                    e.currentTarget.style.webkitTextFillColor = 'white'
                    e.currentTarget.style.animation = 'none'
                  }}
              >
                VESNA HAIR CLINIC
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationKeys.map((key, index) => (
              <Link
                key={key}
                href={navigationHrefs[index]}
                className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium text-sm xl:text-base group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-clinic-primary/20 to-clinic-gold/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2 blur-sm"></div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -m-2 border border-clinic-gold/30 group-hover:scale-105"></div>
                <span className="relative z-10 px-3 py-2 block group-hover:text-clinic-gold group-hover:scale-105 transition-all duration-300 group-hover:drop-shadow-lg">
                  {t(key)}
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-clinic-gold to-clinic-primary group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                <div className="absolute top-0 right-0 w-1 h-1 bg-clinic-gold rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Contact Info & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Phone Number */}
            <a 
              href="tel:+905431767634" 
              className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-white hover:text-clinic-gold transition-all duration-300 group"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span className="text-sm sm:text-base font-medium">
                +90 543 176 7634
              </span>
            </a>

            {/* Language Toggle */}
            <div className="flex items-center">
              <LanguageToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-clinic-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <nav className="px-2 pt-2 pb-4 space-y-1 bg-black/80 backdrop-blur-xl rounded-b-2xl border-t border-white/10">
              {navigationKeys.map((key, index) => (
                <Link
                  key={key}
                  href={navigationHrefs[index]}
                  className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{t(key)}</span>
                </Link>
              ))}
              
              {/* Mobile Contact Links */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="tel:+905431767634"
                  className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-clinic-gold hover:text-clinic-primary transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>+90 543 176 7634</span>
                </a>
                
                <div className="flex items-center space-x-4 px-3 py-3">
                  <a
                    href="https://wa.me/905431767634"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors duration-200"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </a>
                  <a
                    href="https://instagram.com/vesnahairclinic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
})

export default Header 