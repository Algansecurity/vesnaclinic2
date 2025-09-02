'use client'

import { memo, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import ProtectedImage from '@/components/ProtectedImage'
import { 
  Phone, MessageCircle, Star,
  Users, Award, Heart, Sparkles, Timer
} from 'lucide-react'

// Dynamic imports for performance
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20 bg-gray-900 animate-pulse" />,
})

const BeforeAfterPage = memo(function BeforeAfterPage() {
  const { t } = useLanguage()

  // Sade ve etkileyici before/after verileri
  const beforeAfterData = useMemo(() => [
    {
      id: 1,
      titleKey: 'beforeAfter.result1',
      beforeImage: '/images/awdawda2.jpg',
      afterImage: '/images/kaanafter.jpg',
      duration: '10 ay',
      satisfaction: 98
    },
    {
      id: 2,
      titleKey: 'beforeAfter.result2',
      beforeImage: '/images/zenci.jpg',
      afterImage: '/images/zenciafter.jpg',
      duration: '8 ay',
      satisfaction: 97
    },
    {
      id: 3,
      titleKey: 'beforeAfter.result3',
      beforeImage: '/images/sari.jpg',
      afterImage: '/images/sarisonra.jpg',
      duration: '7 ay',
      satisfaction: 96
    },
    {
      id: 4,
      titleKey: 'beforeAfter.result4',
      beforeImage: '/images/kel.jpg',
      afterImage: '/images/kelafter.jpg',
      duration: '10 ay',
      satisfaction: 99
    },
    {
      id: 5,
      titleKey: 'beforeAfter.result5',
      beforeImage: '/images/dsd.jpg',
      afterImage: '/images/dsdafter.jpg',
      duration: '8 ay',
      satisfaction: 98
    },
    {
      id: 6,
      titleKey: 'beforeAfter.result6',
      beforeImage: '/images/dilcibefore2.jpg',
      afterImage: '/images/dilciafter.jpg',
      duration: '9 ay',
      satisfaction: 97
    },
    {
      id: 7,
      titleKey: 'beforeAfter.result7',
      beforeImage: '/images/zenc2.jpg',
      afterImage: '/images/zenc22.jpg',
      duration: '7 ay',
      satisfaction: 99
    },
    {
      id: 8,
      titleKey: 'beforeAfter.result8',
      beforeImage: '/images/sarıbebe.jpg',
      afterImage: '/images/sarf.jpg',
      duration: '11 ay',
      satisfaction: 98
    },
    {
      id: 9,
      titleKey: 'beforeAfter.result9',
      beforeImage: '/images/kir.jpg',
      afterImage: '/images/kirafter.jpg',
      duration: '10 ay',
      satisfaction: 96
    }
  ], [])

  const successStats = useMemo(() => [
    { icon: Users, value: '3800+', label: t('beforeAfter.stat1'), color: 'text-blue-400' },
    { icon: Heart, value: '%98', label: t('beforeAfter.stat2'), color: 'text-red-400' },
    { icon: Award, value: '8+', label: t('beforeAfter.stat3'), color: 'text-yellow-400' },
    { icon: Sparkles, value: '7/24', label: t('beforeAfter.stat4'), color: 'text-green-400' }
  ], [t])



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Çok etkileyici background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-clinic-primary/20 to-clinic-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-clinic-secondary/15 to-clinic-accent/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-clinic-gold/10 to-clinic-primary/15 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-clinic-gold/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-clinic-primary/5 to-transparent"></div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section - Typography sorunları düzeltildi */}
        <section className="pt-32 pb-8 text-center relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="space-y-8">
              {/* Ana başlık - font sizing düzeltildi */}
              <div className="space-y-6">
                {/* Typography düzeltildi - Yan yana ÖNCE SONRA */}
                <div className="flex flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-clinic-gold to-clinic-primary leading-[1.3] tracking-tight py-2">
                    {t('beforeAfter.before')}
                  </h1>
                  <div className="w-px h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 bg-gradient-to-b from-transparent via-clinic-gold to-transparent"></div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-clinic-primary via-clinic-secondary to-clinic-accent leading-[1.3] tracking-tight py-2">
                    {t('beforeAfter.after')}
                  </h1>
                </div>

              </div>


            </div>
          </div>
        </section>

        {/* Galeri Section - Responsive düzeltildi */}
        <section className="pt-8 pb-16 md:pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('beforeAfter.realResults')}</span>
              </h2>

            </div>

            {/* Grid layout - responsive düzeltildi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {beforeAfterData.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group transform transition-all duration-700 hover:scale-105"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-clinic-gold/40 transition-all duration-500">
                    {/* Before/After container - TÜM cihazlarda aynı boyut */}
                    <div className="relative">
                      <div className="grid grid-cols-2">
                        {/* ÖNCE */}
                        <div className="relative group overflow-hidden aspect-[3/4]">
                          <ProtectedImage
                            src={item.beforeImage}
                            alt="Önce"
                            fill
                            className="object-cover object-center transition-all duration-500 group-hover:brightness-110"
                            watermark="© Vesna Clinic"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg leading-relaxed">
                            {t('beforeAfter.before')}
                          </div>
                        </div>
                        
                        {/* SONRA */}
                        <div className="relative group overflow-hidden aspect-[3/4]">
                          <ProtectedImage
                            src={item.afterImage}
                            alt="Sonra"
                            fill
                            className="object-cover object-center transition-all duration-500 group-hover:brightness-110"
                            watermark="© Vesna Clinic"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-2 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg leading-relaxed">
                            {t('beforeAfter.after')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card footer - mobilde de görünür */}
                    <div className="p-4 md:p-6 bg-black/20 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm md:text-lg font-semibold text-white group-hover:text-clinic-gold transition-colors duration-300">
                          {t(item.titleKey)}
                        </h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <div className="flex items-center gap-2 text-white/70">
                          <Timer className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="text-clinic-gold font-medium">
                          %{item.satisfaction} {t('beforeAfter.satisfied')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* İstatistikler - Güzel tasarımla galeri altında */}
            <div className="mt-20 mb-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-clinic-gold/20 to-clinic-primary/20 px-6 py-3 rounded-full border border-clinic-gold/30 backdrop-blur-sm mb-6">
                  <Sparkles className="w-5 h-5 text-clinic-gold" />
                  <span className="text-clinic-gold text-lg font-medium">Başarı İstatistiklerimiz</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {successStats.map((stat, index) => (
                  <div key={index} className="group transform transition-all duration-700 hover:scale-110">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 p-6 md:p-8 text-center shadow-2xl">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-clinic-gold/5 to-clinic-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className={`p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                            <stat.icon className="w-8 h-8 md:w-10 md:h-10" />
                          </div>
                        </div>
                        
                        {/* Value */}
                        <div className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-clinic-gold mb-2 group-hover:from-clinic-gold group-hover:to-clinic-primary transition-all duration-500">
                          {stat.value}
                        </div>
                        
                        {/* Label */}
                        <div className="text-white/70 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">
                          {stat.label}
                        </div>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-clinic-gold/10 to-clinic-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Typography sorunları düzeltildi */}
        <section className="py-24 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-clinic-primary/20 via-clinic-gold/10 to-clinic-secondary/20"></div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-clinic-gold/20 px-4 md:px-6 py-2 rounded-full border border-clinic-gold/30">
                <Sparkles className="w-4 h-4 text-clinic-gold" />
                <span className="text-clinic-gold text-sm font-medium">{t('beforeAfter.nextYou')}</span>
              </div>
              
              {/* Typography düzeltildi - Türkçe karakterler için optimized */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.3] tracking-tight py-2">
                  {t('beforeAfter.ctaTitle1')}
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary leading-[1.3] tracking-tight py-2">
                  {t('beforeAfter.ctaTitle2')}
                </h2>
              </div>
              
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4 leading-relaxed">
                {t('beforeAfter.ctaSubtitle')} 
                <span className="text-clinic-gold font-semibold"> {t('beforeAfter.ctaSubtitleHighlight')} </span>
              </p>
              
              {/* Butonlar - responsive düzeltildi */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-8">
                <a href="tel:+905431767634" className="group w-full sm:w-auto">
                  <Button className="w-full bg-gradient-to-r from-clinic-gold to-clinic-primary hover:from-clinic-primary hover:to-clinic-secondary text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-clinic-gold/25 text-base md:text-lg">
                    <Phone className="w-5 h-5 mr-3" />
                    {t('beforeAfter.callNow')}
                  </Button>
                </a>
                
                <a href="https://wa.me/905431767634" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto">
                  <Button className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-clinic-gold text-white hover:bg-clinic-gold/20 font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:scale-105 text-base md:text-lg">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    {t('beforeAfter.whatsapp')}
                  </Button>
                </a>
              </div>

              {/* Güven göstergeleri - responsive düzeltildi */}
              <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center space-y-2">
                  <Users className="w-10 h-10 md:w-12 md:h-12 text-clinic-gold mx-auto" />
                  <h4 className="text-white font-semibold text-base md:text-lg">{t('beforeAfter.trust1')}</h4>
                  <p className="text-white/60 text-sm">{t('beforeAfter.trust1Desc')}</p>
                </div>
                <div className="text-center space-y-2">
                  <Award className="w-10 h-10 md:w-12 md:h-12 text-clinic-gold mx-auto" />
                  <h4 className="text-white font-semibold text-base md:text-lg">{t('beforeAfter.trust2')}</h4>
                  <p className="text-white/60 text-sm">{t('beforeAfter.trust2Desc')}</p>
                </div>
                <div className="text-center space-y-2">
                  <Heart className="w-10 h-10 md:w-12 md:h-12 text-clinic-gold mx-auto" />
                  <h4 className="text-white font-semibold text-base md:text-lg">{t('beforeAfter.trust3')}</h4>
                  <p className="text-white/60 text-sm">{t('beforeAfter.trust3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
})

export default BeforeAfterPage 