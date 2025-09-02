'use client'

import { useState, useEffect, memo, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { Award, Users, Heart, CheckCircle, Target, Eye, Phone, MessageCircle, Star, Sparkles, Shield, Zap } from 'lucide-react'

// Dynamic import for Footer
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20 bg-gray-900 animate-pulse" />,
})

const AboutPage = memo(function AboutPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true) // Start visible for performance

  // Removed unnecessary useEffect for better performance

  const features = useMemo(() => [
    {
      icon: <Award className="w-8 h-8" />,
      titleKey: 'about.feature1.title',
      descKey: 'about.feature1.desc',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleKey: 'about.feature2.title',
      descKey: 'about.feature2.desc',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titleKey: 'about.feature3.title',
      descKey: 'about.feature3.desc',
      color: 'from-pink-500 to-red-600'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      titleKey: 'about.feature4.title',
      descKey: 'about.feature4.desc',
      color: 'from-green-500 to-emerald-600'
    }
  ], [])

  const stats = useMemo(() => [
    { value: '3800+', labelKey: 'about.stats.operations', icon: Users, color: 'text-blue-400' },
    { value: '8+', labelKey: 'about.stats.experience', icon: Award, color: 'text-yellow-400' },
    { value: '%98', labelKey: 'about.stats.satisfaction', icon: Heart, color: 'text-red-400' },
    { value: '7/24', labelKey: 'about.stats.support', icon: Shield, color: 'text-green-400' }
  ], [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Etkileyici background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-clinic-primary/20 to-clinic-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-clinic-secondary/15 to-clinic-accent/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-clinic-gold/10 to-clinic-primary/15 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
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
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(253, 224, 71, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(253, 224, 71, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      <Header />
      
      <main className="relative z-10">
        {/* Hero Section - Büyük ve etkileyici */}
        <section className="pt-32 pb-8 text-center">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
              <div className="space-y-8">
                {/* Büyük logo */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-clinic-primary to-clinic-secondary rounded-full blur-xl opacity-20 animate-pulse animation-delay-500"></div>
                  <Image
                    src="/images/logo2.png"
                    alt="Vesna Hair Clinic"
                    fill
                    className="relative object-contain filter drop-shadow-2xl"
                    priority
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Büyük başlık */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-clinic-gold/20 to-clinic-primary/20 px-6 py-3 rounded-full border border-clinic-gold/30 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-clinic-gold" />
                    <span className="text-clinic-gold text-lg font-medium">Hakkımızda</span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold via-white to-clinic-primary leading-tight tracking-tight">
                    VESNA HAIR CLINIC
                  </h1>
                  
                  <p className="text-xl sm:text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                    <span className="text-clinic-gold font-semibold">Saç ekimi alanında</span> Türkiye'nin en güvenilir ve deneyimli kliniği
                  </p>
                </div>

                {/* İstatistikler */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                  {stats.map((stat, index) => (
                    <div key={index} className="group">
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-clinic-gold/30 transition-all duration-500 hover:scale-105 hover:bg-white/10">
                        <div className={`flex justify-center mb-3 ${stat.color}`}>
                          <stat.icon className="w-8 h-8" />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-white/60 text-sm">{t(stat.labelKey)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Features Grid */}
        <section className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('about.whyUs')}</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t('about.whyUsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group transform transition-all duration-700 hover:scale-105"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 p-8 text-center h-full">
                    {/* Icon with gradient background */}
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Title and description */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-clinic-gold transition-colors duration-300">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {t(feature.descKey)}
                    </p>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-clinic-gold/10 to-clinic-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-r from-clinic-primary/10 to-clinic-secondary/10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 hover:scale-105 h-full">
                  <div className="flex items-center mb-8">
                    <div className="p-4 bg-gradient-to-r from-clinic-primary to-clinic-secondary rounded-2xl mr-6">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-clinic-gold transition-colors duration-300">
                      {t('about.mission.title')}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {t('about.mission.description')}
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 hover:scale-105 h-full">
                  <div className="flex items-center mb-8">
                    <div className="p-4 bg-gradient-to-r from-clinic-secondary to-clinic-accent rounded-2xl mr-6">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-clinic-gold transition-colors duration-300">
                      {t('about.vision.title')}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {t('about.vision.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-r from-clinic-primary to-clinic-secondary rounded-3xl">
                  <Star className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('about.cta.title')}</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('about.cta.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="tel:+905431767634">
                  <Button 
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] text-black font-bold hover:scale-105 transition-transform duration-300"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    {t('buttons.callNow')}
                  </Button>
                </a>
                
                <a href="https://wa.me/905431767634" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] text-white font-bold border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    {t('buttons.whatsapp')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
})

export default AboutPage 