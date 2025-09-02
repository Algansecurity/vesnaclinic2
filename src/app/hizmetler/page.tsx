'use client'

import { useEffect, useState, memo, useMemo, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import { Scissors, Zap, Sparkles, Shield, Users, Eye, Phone, MessageCircle, Star, Heart, CheckCircle, Timer, Target, Atom, Dna, X, Clock, TrendingUp, Users as UsersIcon, Activity, Zap as ZapIcon, UserCheck, Droplet, Focus, Smile, Minus, ChevronUp, Waves } from 'lucide-react'

// Dynamic imports for performance
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20 bg-gray-900 animate-pulse" />,
})

const ServicesPage = memo(function ServicesPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true) // Start visible for performance
  const [activeService, setActiveService] = useState(0)
  const [selectedService, setSelectedService] = useState<number | null>(null)

  // Removed unnecessary useEffect

  const services = useMemo(() => [
    {
      titleKey: "services.fue.title",
      descKey: "services.fue.desc",
      icon: <Image src="/images/fue.png" alt="FUE" width={80} height={80} className="w-20 h-20 object-contain" />,
      image: "/images/fue.jpg",
      popular: true,
      duration: "6-8 saat",
      recoveryKey: "services.recovery.fue",
      success: "%98",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-500/20 to-cyan-600/20"
    },
    {
      titleKey: "services.dhi.title",
      descKey: "services.dhi.desc",
      icon: <Image src="/images/dhi.png" alt="DHI" width={80} height={80} className="w-20 h-20 object-contain" />,
      image: "/images/dhi.jpg",
      popular: false,
      duration: "6-8 saat",
      recoveryKey: "services.recovery.dhi",
      success: "%99",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-500/20 to-pink-600/20"
    },
    {
      titleKey: "services.hybrid.title",
      descKey: "services.hybrid.desc",
      icon: <Image src="/images/dhi+fue.png" alt="Hybrid FUE+DHI" width={56} height={56} className="w-14 h-14 object-contain" />,
      image: "/images/hybrid.jpg",
      popular: false,
      duration: "7-9 saat",
      recoveryKey: "services.recovery.hybrid",
      success: "%99",
      color: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-500/20 to-purple-600/20"
    },
    {
      titleKey: "services.beard.title",
      descKey: "services.beard.desc",
      icon: <Image src="/images/sakal.png" alt="Sakal" width={56} height={56} className="w-14 h-14 object-contain" />,
      image: "/images/sakal-ekimi.jpg",
      popular: false,
      duration: "4-6 saat",
      recoveryKey: "services.recovery.beard",
      success: "%98",
      color: "from-red-500 to-pink-600",
      bgColor: "from-red-500/20 to-pink-600/20"
    },
    {
      titleKey: "services.eyebrow.title",
      descKey: "services.eyebrow.desc",
      icon: <Image src="/images/kaş.png" alt="Kaş" width={80} height={80} className="w-20 h-20 object-contain" />,
      image: "/images/kas-ekimi.jpg",
      popular: false,
      duration: "2-3 saat",
      recoveryKey: "services.recovery.eyebrow",
      success: "%98",
      color: "from-pink-500 to-purple-600",
      bgColor: "from-pink-500/20 to-purple-600/20"
    },
    {
      titleKey: "services.stemCell.title",
      descKey: "services.stemCell.desc",
      icon: <Image src="/images/kokhucre.png" alt="Kök Hücre" width={56} height={56} className="w-14 h-14 object-contain" />,
      image: "/images/kok-hucre-tedavisi.jpg",
      popular: false,
      duration: "1-2 saat",
      recoveryKey: "services.recovery.stemCell",
      success: "%100",
      color: "from-teal-500 to-cyan-600",
      bgColor: "from-teal-500/20 to-cyan-600/20"
    },
    {
      titleKey: "services.exosome.title",
      descKey: "services.exosome.desc",
      icon: <Image src="/images/eksozom.png" alt="Eksozom" width={56} height={56} className="w-14 h-14 object-contain" />,
      image: "/images/eksozom-tedavisi.jpg",
      popular: false,
      duration: "1 saat",
      recoveryKey: "services.recovery.exosome",
      success: "%100",
      color: "from-violet-500 to-purple-600",
      bgColor: "from-violet-500/20 to-purple-600/20"
    },
    {
      titleKey: "services.mesotherapy.title",
      descKey: "services.mesotherapy.desc",
      icon: <Image src="/images/mezo.png" alt="Mezoterapi" width={56} height={56} className="w-14 h-14 object-contain" />,
      image: "/images/mezoterapi.jpg",
      popular: false,
      duration: "1 saat",
      recoveryKey: "services.recovery.mesotherapy",
      success: "%100",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-500/20 to-red-600/20"
    },
    {
      titleKey: "services.prp.title",
      descKey: "services.prp.desc",
      icon: <Image src="/images/prp.png" alt="PRP" width={80} height={80} className="w-20 h-20 object-contain" />,
      image: "/images/prp-tedavisi.jpg",
      popular: false,
      duration: "1 saat",
      recoveryKey: "services.recovery.prp",
      success: "%100",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-500/20 to-emerald-600/20"
    }
  ], [])



  const process = [
    { icon: Target, titleKey: 'services.process.step1.title', descKey: 'services.process.step1.desc' },
    { icon: Scissors, titleKey: 'services.process.step2.title', descKey: 'services.process.step2.desc' },
    { icon: Zap, titleKey: 'services.process.step3.title', descKey: 'services.process.step3.desc' },
    { icon: Heart, titleKey: 'services.process.step4.title', descKey: 'services.process.step4.desc' },
    { icon: Shield, titleKey: 'services.process.step5.title', descKey: 'services.process.step5.desc' },
    { icon: CheckCircle, titleKey: 'services.process.step6.title', descKey: 'services.process.step6.desc' }
  ]

  const openModal = (index: number) => {
    setSelectedService(index)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedService(null)
    document.body.style.overflow = 'auto'
  }

  const ServiceModal = ({ serviceIndex }: { serviceIndex: number }) => {
    const service = services[serviceIndex]
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`relative p-4 md:p-8 bg-gradient-to-r ${service.color} text-white`}>
            <div className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-row md:flex-col gap-2 items-end">
              <div className="scale-75 md:scale-75 origin-top-right order-2 md:order-1">
                <LanguageToggle />
              </div>
              
              <button
                onClick={closeModal}
                className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group order-1 md:order-2"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110" />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 pr-24 md:pr-16">
              <div className="p-3 md:p-4 bg-white/20 rounded-2xl">
                {service.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                  {t(service.titleKey)}
                </h2>
                <p className="text-white/90 text-base md:text-lg">
                  {t(`${service.titleKey}.tagline`)}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">{t('modal.description')}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t(`${service.titleKey}.fullDesc`)}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Clock className="w-6 h-6 text-clinic-gold mx-auto mb-2" />
                <div className="text-white font-bold">{service.duration}</div>
                <div className="text-gray-300 text-sm">{t('services.duration')}</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-white font-bold">{service.success}</div>
                <div className="text-gray-300 text-sm">{t('services.success')}</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <Timer className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-white font-bold">{t(service.recoveryKey)}</div>
                <div className="text-gray-300 text-sm">{t('services.recovery')}</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-bold">{t(`${service.titleKey}.results`)}</div>
                <div className="text-gray-300 text-sm">{t('modal.results')}</div>
              </div>
            </div>

            {/* Advantages */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">{t('modal.advantages')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                    <div className="w-6 h-6 bg-clinic-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">
                        {t(`${service.titleKey}.advantage${num}.title`)}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {t(`${service.titleKey}.advantage${num}.desc`)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">{t('modal.process')}</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-start gap-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                      {num}
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">
                        {t(`${service.titleKey}.process${num}.title`)}
                      </div>
                      <div className="text-gray-300">
                        {t(`${service.titleKey}.process${num}.desc`)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is suitable */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">{t('modal.suitable')}</h3>
              <div className="bg-gradient-to-r from-clinic-primary/20 to-clinic-secondary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <UsersIcon className="w-6 h-6 text-clinic-gold" />
                  <span className="text-white font-semibold">{t('modal.idealCandidates')}</span>
                </div>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-clinic-gold rounded-full flex-shrink-0"></div>
                      {t(`${service.titleKey}.suitable${num}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+905431767634" className="flex-1">
                <Button 
                  variant="primary"
                  size="lg"
                  className="w-full text-black font-bold hover:scale-105 transition-transform duration-300"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  {t('buttons.callNow')}
                </Button>
              </a>
              
              <a href="https://wa.me/905431767634" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full text-white font-bold border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  {t('buttons.whatsapp')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Etkileyici background effects */}
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
                  />
                </div>
                
                {/* Büyük başlık */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-clinic-gold/20 to-clinic-primary/20 px-6 py-3 rounded-full border border-clinic-gold/30 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-clinic-gold" />
                    <span className="text-clinic-gold text-lg font-medium">{t('services.badge')}</span>
                  </div>
                  

                </div>


              </div>
            </div>
          </div>
        </section>

        {/* Services Grid - Yaratıcı tasarım */}
        <section className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('services.gridTitle')}</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t('services.gridSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group transform transition-all duration-700 hover:scale-105"
                  onMouseEnter={() => setActiveService(index)}
                >
                  <div className="relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 p-8 h-full overflow-visible">
                    {service.popular && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-clinic-gold to-clinic-primary text-black px-4 py-2 rounded-full text-xs font-bold shadow-2xl z-50 transform rotate-12 whitespace-nowrap">
                        ⭐ {t('services.popular')}
                      </div>
                    )}
                    
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                          {service.icon}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-clinic-gold transition-colors duration-300 text-center">
                        {t(service.titleKey)}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300 text-center">
                        {t(service.descKey)}
                      </p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-clinic-gold font-bold text-sm">{t('services.duration')}</div>
                          <div className="text-white text-xs">{service.duration}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-clinic-gold font-bold text-sm">{t('services.recovery')}</div>
                          <div className="text-white text-xs">{t(service.recoveryKey)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-clinic-gold font-bold text-sm">{t('services.success')}</div>
                          <div className="text-white text-xs">{service.success}</div>
                        </div>
                      </div>
                      
                      {/* Button */}
                      <div className="text-center">
                        <Button 
                          variant="secondary" 
                          className="w-full bg-clinic-gold/20 hover:bg-clinic-gold hover:text-black border-clinic-gold text-clinic-gold group-hover:scale-105 transition-all duration-300"
                          onClick={() => openModal(index)}
                        >
                          {t('services.details')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Moved back to bottom and updated with 6 steps */}
        <section className="py-20 bg-gradient-to-r from-clinic-primary/10 to-clinic-secondary/10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('services.processTitle')}</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t('services.processSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {process.map((step, index) => (
                <div key={index} className="group relative">
                  {/* Connector line */}
                  {index < process.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-clinic-gold to-clinic-primary transform -translate-y-1/2 z-0"></div>
                  )}
                  
                  <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 hover:scale-105 text-center h-full flex flex-col justify-between min-h-[200px]">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-full flex items-center justify-center text-black font-bold text-lg shadow-2xl">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-clinic-primary/20 to-clinic-secondary/20 rounded-2xl text-clinic-gold group-hover:scale-110 transition-transform duration-500">
                        <step.icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-clinic-gold transition-colors duration-300 leading-tight whitespace-pre-line">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300 leading-relaxed">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Merak Edilenler */}
        <section className="py-20 bg-gradient-to-r from-clinic-primary/5 to-clinic-secondary/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('faq.title')}</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t('faq.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FAQ Items */}
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 group">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                      ?
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-clinic-gold transition-colors duration-300">
                        {t(`faq.question${num}`)}
                      </h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {t(`faq.answer${num}`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('services.ctaTitle')}</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('services.ctaSubtitle')}
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

      {/* Service Modal */}
      {selectedService !== null && <ServiceModal serviceIndex={selectedService} />}
    </div>
  )
})

export default ServicesPage 