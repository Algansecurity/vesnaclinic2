'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Home, MessageCircle, Phone, Search, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-clinic-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-clinic-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-clinic-gold/10 rounded-full blur-2xl animate-float"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full gap-1">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggle />
      </div>

      {/* Main Content */}
      <div className={`max-w-2xl mx-auto text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Logo Section */}
        <div className="mb-12">
          <Link href="/" className="inline-block group">
            <div className="relative w-20 h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Image
                src="/images/logo2.png"
                alt="Vesna Hair Clinic"
                fill
                className="object-contain filter drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-clinic-gold/20 to-clinic-primary/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-clinic-gold to-clinic-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              VESNA HAIR CLINIC
            </h1>
          </Link>
        </div>

        {/* 404 Animation */}
        <div className="mb-12 relative">
          <div className="relative">
            <h2 className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-clinic-gold via-clinic-primary to-clinic-secondary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto] mb-4 leading-none">
              404
            </h2>
            <div className="absolute inset-0 text-8xl sm:text-9xl font-extrabold text-white/5 blur-sm scale-110 -z-10">
              404
            </div>
          </div>
          
          <div className="relative mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 animate-fade-in animation-delay-300">
              {t('404.title')}
            </h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed animate-fade-in animation-delay-500">
              {t('404.description')}
            </p>
          </div>
        </div>

        {/* Modern Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-700">
          <Link href="/">
            <Button className="group w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-clinic-primary to-clinic-secondary hover:from-clinic-secondary hover:to-clinic-accent text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-clinic-primary/50 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-clinic-gold/30">
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
              {t('404.backHome')}
            </Button>
          </Link>
          <Link href="/iletisim">
            <Button className="group w-full sm:w-auto min-w-[200px] bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/20 hover:border-clinic-gold/50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 transform">
              <MessageCircle className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              {t('404.contact')}
            </Button>
          </Link>
        </div>

        {/* Quick Search */}
        <div className="mb-8 animate-fade-in animation-delay-1000">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('404.searchPlaceholder')}
              className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-clinic-gold focus:bg-white/20 transition-all duration-300"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const value = e.currentTarget.value.toLowerCase()
                  if (value.includes('hakkımızda') || value.includes('about') || value.includes('hakkında')) {
                    window.location.href = '/hakkimizda'
                  } else if (value.includes('hizmet') || value.includes('service') || value.includes('services')) {
                    window.location.href = '/hizmetler'
                  } else if (value.includes('önce') || value.includes('sonra') || value.includes('before') || value.includes('after') || value.includes('gallery') || value.includes('galeri')) {
                    window.location.href = '/once-sonra'
                  } else if (value.includes('iletişim') || value.includes('contact') || value.includes('iletisim')) {
                    window.location.href = '/iletisim'
                  } else if (value.includes('home') || value.includes('ana') || value.includes('anasayfa')) {
                    window.location.href = '/'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Enhanced Contact Card */}
        <div className="glass-effect p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl animate-fade-in animation-delay-1200 hover:border-clinic-gold/30 transition-all duration-500 group">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-clinic-gold transition-colors duration-300">
              {t('404.helpTitle')}
            </h4>
            <p className="text-gray-400 text-sm">
              {t('404.helpDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+905431767634"
              className="flex items-center justify-center space-x-3 text-white hover:text-clinic-gold bg-white/10 hover:bg-clinic-primary/20 transition-all duration-300 py-4 px-6 rounded-xl border border-white/10 hover:border-clinic-gold/30 group/phone"
            >
              <Phone className="w-5 h-5 group-hover/phone:animate-bounce" />
              <div className="text-center">
                <div className="text-sm font-semibold">{t('404.phone')}</div>
                <div className="text-xs opacity-80">+90 543 176 7634</div>
              </div>
            </a>
            
            <a
              href="https://wa.me/905431767634"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 text-white hover:text-green-400 bg-white/10 hover:bg-green-500/20 transition-all duration-300 py-4 px-6 rounded-xl border border-white/10 hover:border-green-400/50 group/wa"
            >
              <MessageCircle className="w-5 h-5 group-hover/wa:animate-pulse" />
              <div className="text-center">
                <div className="text-sm font-semibold">WhatsApp</div>
                <div className="text-xs opacity-80">{t('404.instantMessage')}</div>
              </div>
            </a>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="mt-8 animate-fade-in animation-delay-1500">
          <p className="text-gray-500 text-sm">
            {t('404.tip')}
          </p>
        </div>
      </div>
    </div>
  )
} 