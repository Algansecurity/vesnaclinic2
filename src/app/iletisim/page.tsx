'use client'

import { useState, useEffect, memo, useMemo, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Clock, Users, Award, Heart, Sparkles, Star, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'
import { useLanguage } from '@/contexts/LanguageContext'

// Dynamic imports for performance
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20 bg-gray-900 animate-pulse" />,
})

const ContactPage = memo(function ContactPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState('+90')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [instagramPosts, setInstagramPosts] = useState<any[]>([])
  const [instagramLoading, setInstagramLoading] = useState(true)
  const [instagramError, setInstagramError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)

  // Country codes for phone number selection - memoized for performance
  const countryCodes = useMemo(() => [
    { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Türkiye' },
    { code: '+1', country: 'US', flag: '🇺🇸', name: 'Amerika Birleşik Devletleri' },
    { code: '+44', country: 'GB', flag: '🇬🇧', name: 'Birleşik Krallık' },
    { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Almanya' },
    { code: '+33', country: 'FR', flag: '🇫🇷', name: 'Fransa' },
    { code: '+39', country: 'IT', flag: '🇮🇹', name: 'İtalya' },
    { code: '+34', country: 'ES', flag: '🇪🇸', name: 'İspanya' },
    { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Hollanda' },
    { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Rusya' },
    { code: '+86', country: 'CN', flag: '🇨🇳', name: 'Çin' },
    { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japonya' },
    { code: '+82', country: 'KR', flag: '🇰🇷', name: 'Güney Kore' },
    { code: '+91', country: 'IN', flag: '🇮🇳', name: 'Hindistan' },
    { code: '+971', country: 'AE', flag: '🇦🇪', name: 'Birleşik Arap Emirlikleri' },
    { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Suudi Arabistan' },
    { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Mısır' },
    { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Fas' },
    { code: '+213', country: 'DZ', flag: '🇩🇿', name: 'Cezayir' },
    { code: '+216', country: 'TN', flag: '🇹🇳', name: 'Tunus' },
    { code: '+218', country: 'LY', flag: '🇱🇾', name: 'Libya' },
    { code: '+93', country: 'AF', flag: '🇦🇫', name: 'Afganistan' },
    { code: '+355', country: 'AL', flag: '🇦🇱', name: 'Arnavutluk' },
    { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Arjantin' },
    { code: '+374', country: 'AM', flag: '🇦🇲', name: 'Ermenistan' },
    { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Avustralya' },
    { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Avusturya' },
    { code: '+994', country: 'AZ', flag: '🇦🇿', name: 'Azerbaycan' },
    { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahreyn' },
    { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladeş' },
    { code: '+375', country: 'BY', flag: '🇧🇾', name: 'Belarus' },
    { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belçika' },
    { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brezilya' },
    { code: '+359', country: 'BG', flag: '🇧🇬', name: 'Bulgaristan' },
    { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Kanada' },
    { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Şili' },
    { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Kolombiya' },
    { code: '+385', country: 'HR', flag: '🇭🇷', name: 'Hırvatistan' },
    { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Çek Cumhuriyeti' },
    { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Danimarka' },
    { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ekvador' },
    { code: '+372', country: 'EE', flag: '🇪🇪', name: 'Estonya' },
    { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finlandiya' },
    { code: '+995', country: 'GE', flag: '🇬🇪', name: 'Gürcistan' },
    { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Yunanistan' },
    { code: '+36', country: 'HU', flag: '🇭🇺', name: 'Macaristan' },
    { code: '+354', country: 'IS', flag: '🇮🇸', name: 'İzlanda' },
    { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Endonezya' },
    { code: '+98', country: 'IR', flag: '🇮🇷', name: 'İran' },
    { code: '+964', country: 'IQ', flag: '🇮🇶', name: 'Irak' },
    { code: '+353', country: 'IE', flag: '🇮🇪', name: 'İrlanda' },
    { code: '+972', country: 'IL', flag: '🇮🇱', name: 'İsrail' },
    { code: '+962', country: 'JO', flag: '🇯🇴', name: 'Ürdün' },
    { code: '+7', country: 'KZ', flag: '🇰🇿', name: 'Kazakistan' },
    { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya' },
    { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuveyt' },
    { code: '+996', country: 'KG', flag: '🇰🇬', name: 'Kırgızistan' },
    { code: '+371', country: 'LV', flag: '🇱🇻', name: 'Letonya' },
    { code: '+961', country: 'LB', flag: '🇱🇧', name: 'Lübnan' },
    { code: '+370', country: 'LT', flag: '🇱🇹', name: 'Litvanya' },
    { code: '+352', country: 'LU', flag: '🇱🇺', name: 'Lüksemburg' },
    { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malezya' },
    { code: '+356', country: 'MT', flag: '🇲🇹', name: 'Malta' },
    { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Meksika' },
    { code: '+373', country: 'MD', flag: '🇲🇩', name: 'Moldova' },
    { code: '+976', country: 'MN', flag: '🇲🇳', name: 'Moğolistan' },
    { code: '+382', country: 'ME', flag: '🇲🇪', name: 'Karadağ' },
    { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal' },
    { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'Yeni Zelanda' },
    { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norveç' },
    { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Umman' },
    { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan' },
    { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru' },
    { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Filipinler' },
    { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Polonya' },
    { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portekiz' },
    { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Katar' },
    { code: '+40', country: 'RO', flag: '🇷🇴', name: 'Romanya' },
    { code: '+381', country: 'RS', flag: '🇷🇸', name: 'Sırbistan' },
    { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapur' },
    { code: '+421', country: 'SK', flag: '🇸🇰', name: 'Slovakya' },
    { code: '+386', country: 'SI', flag: '🇸🇮', name: 'Slovenya' },
    { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'Güney Afrika' },
    { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+46', country: 'SE', flag: '🇸🇪', name: 'İsveç' },
    { code: '+41', country: 'CH', flag: '🇨🇭', name: 'İsviçre' },
    { code: '+963', country: 'SY', flag: '🇸🇾', name: 'Suriye' },
    { code: '+992', country: 'TJ', flag: '🇹🇯', name: 'Tacikistan' },
    { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Tayland' },
    { code: '+993', country: 'TM', flag: '🇹🇲', name: 'Türkmenistan' },
    { code: '+380', country: 'UA', flag: '🇺🇦', name: 'Ukrayna' },
    { code: '+598', country: 'UY', flag: '🇺🇾', name: 'Uruguay' },
    { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Özbekistan' },
    { code: '+58', country: 'VE', flag: '🇻🇪', name: 'Venezuela' },
    { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam' },
    { code: '+967', country: 'YE', flag: '🇾🇪', name: 'Yemen' }
  ], [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Instagram postlarını çek - Statik export için doğrudan Instagram API çağrısı
  const fetchInstagramPosts = useCallback(async () => {
    try {
      setInstagramLoading(true)
      setInstagramError(null)
      
      console.log('Instagram API çağrısı başlatılıyor (client-side)...')
      
      // Instagram Access Token
      const INSTAGRAM_ACCESS_TOKEN = 'IGAATp6LzNX6NBZAFBrY3dDODlFVXpSTTEwTXJFX1cwcEpBb2ZANX0ZAqenlLWjEtVGhtMkJNaGRIRGZAnUHNjYzRXaHVXQWticVB4aEZAPRy1admFhblpidXdLUmk3MzBLQlEzWXJnM0tMNnJiVmVnTHhFRV9NUHBmN2czR0NVMHlqUQZDZD'
      
      // Cache-busting için timestamp ekle
      const timestamp = Date.now()
      const mediaUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=8&access_token=${INSTAGRAM_ACCESS_TOKEN}&_t=${timestamp}`
      
      const response = await fetch(mediaUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      console.log('Instagram API response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`Instagram API hatası: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Instagram API response data:', data)
      
      if (data.error) {
        setInstagramError(data.error.message || 'Instagram API hatası')
        console.warn('Instagram API Error:', data.error)
      } else if (data.data && Array.isArray(data.data)) {
        // Veriyi filtrele ve düzenle
        const posts = data.data
          .filter((item: any) => item.media_type && ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(item.media_type))
          .map((item: any) => ({
            id: item.id,
            media_type: item.media_type,
            media_url: item.media_url,
            thumbnail_url: item.thumbnail_url,
            permalink: item.permalink,
            caption: item.caption || '',
            timestamp: item.timestamp
          }))
          .slice(0, 8)
        
        setInstagramPosts(posts)
        setLastUpdate(new Date().toISOString())
        console.log('Instagram posts loaded:', posts.length)
      } else {
        setInstagramError('Instagram\'dan veri alınamadı')
      }
    } catch (error) {
      console.warn('Instagram posts fetch error:', error)
      setInstagramError(error instanceof Error ? error.message : 'Bağlantı hatası')
    } finally {
      setInstagramLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInstagramPosts()
    
    // Otomatik yenileme - 5 dakikada bir
    const interval = setInterval(() => {
      console.log('🔄 Instagram postları otomatik yenileniyor...')
      fetchInstagramPosts()
    }, 5 * 60 * 1000) // 5 dakika
    
    return () => clearInterval(interval)
  }, [fetchInstagramPosts])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown && !(event.target as Element).closest('.country-dropdown')) {
        setShowCountryDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCountryDropdown])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Combine country code with phone number
      const phoneWithCountryCode = selectedCountryCode + formData.phone
      const fullName = formData.name + ' ' + formData.surname
      const message = formData.message || 'İletişim formu mesajı'
      
      // Netlify Forms kullanarak form gönderimi (statik hosting uyumlu)
      const formData_netlify = new FormData()
      formData_netlify.append('form-name', 'vesna-contact')
      formData_netlify.append('name', fullName)
      formData_netlify.append('email', formData.email)
      formData_netlify.append('phone', phoneWithCountryCode)
      formData_netlify.append('message', message)
      formData_netlify.append('subject', `🆕 Vesna Hair Clinic - ${fullName} (${phoneWithCountryCode})`)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData_netlify as any).toString()
      })
      
      if (response.ok) {
        // Telegram bildirimi de gönder (alternatif olarak)
        try {
          await sendTelegramNotification({
            name: fullName,
            email: formData.email,
            phone: phoneWithCountryCode,
            message: message
          })
        } catch (telegramError) {
          console.warn('Telegram bildirimi gönderilemedi:', telegramError)
          // Telegram hatası form gönderimini engellemez
        }
        
        setShowSuccessModal(true)
        setFormData({ name: '', surname: '', phone: '', email: '', message: '' })
      } else {
        alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Form submit error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, selectedCountryCode])

  // Telegram bildirimi fonksiyonu (client-side)
  const sendTelegramNotification = async (contactData: any) => {
    const TELEGRAM_BOT_TOKEN = '7868956697:AAF4Uy6fHEjKdDJDfNzuHGiuOkNyFQDhRvE'
    const TELEGRAM_CHAT_ID_1 = '-1002319826988' // Ana grup
    const TELEGRAM_CHAT_ID_2 = '1381793841' // Önder Dağhan
    
    const telegramMessage = `
🏥 *Vesna Hair Clinic* - Yeni İletişim Formu

👤 *Ad Soyad:* ${contactData.name}
📧 *E-posta:* ${contactData.email}
📞 *Telefon:* ${contactData.phone}

💬 *Mesaj:*
${contactData.message}

📅 *Tarih:* ${new Date().toLocaleString('tr-TR')}

📱 *Hızlı Arama:* [${contactData.phone}](tel:${contactData.phone})
🌐 *Site:* vesnahairclinic.com

📞 *Klinik Telefonu:*
• +90 532 666 29 80
    `

    const chatIds = [TELEGRAM_CHAT_ID_1, TELEGRAM_CHAT_ID_2]
    
    for (const chatId of chatIds) {
      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
          })
        })
        console.log(`✅ Telegram bildirimi gönderildi (Chat ID: ${chatId})`)
      } catch (error) {
        console.error(`❌ Telegram bildirim hatası (Chat ID: ${chatId}):`, error)
      }
    }
  }

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Telefon numarası için sadece rakam kabul et
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '')
      const limitedValue = numericValue.slice(0, 10) // Maksimum 10 karakter
      
      setFormData({
        ...formData,
        [name]: limitedValue
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }, [formData])

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false)
  }, [])

  const contactInfo = useMemo(() => [
    {
      icon: <Phone className="w-8 h-8" />,
      title: t('contact.info.phone.title'),
      content: (
        <a href="tel:+905431767634" className="hover:text-clinic-gold transition-colors text-lg font-semibold block">
          +90 543 176 7634
        </a>
      ),
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-500/20 to-teal-600/20',
      clickable: true,
      href: 'tel:+905431767634'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('contact.info.email.title'),
      content: (
        <a href="mailto:info@vesnahairclinic.com" className="hover:text-clinic-gold transition-colors text-lg font-semibold block">
          info@vesnahairclinic.com
        </a>
      ),
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-500/20 to-indigo-600/20',
      clickable: true,
      href: 'mailto:info@vesnahairclinic.com'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t('contact.info.address.title'),
      content: (
        <div className="text-lg">
          <div className="font-semibold">İstanbul/Ataşehir</div>
        </div>
      ),
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-500/20 to-pink-600/20',
      clickable: true,
      href: 'https://maps.google.com/?q=İstanbul+Ataşehir'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('contact.info.whatsapp.title'),
      content: (
        <a href="https://wa.me/905431767634" target="_blank" rel="noopener noreferrer" className="hover:text-clinic-gold transition-colors text-lg font-semibold block">
          +90 543 176 7634
        </a>
      ),
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-500/20 to-emerald-600/20',
      clickable: true,
      href: 'https://wa.me/905431767634'
    }
  ], [t])



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Netlify Forms için gizli form */}
      <form name="vesna-contact" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
        <input type="text" name="subject" />
      </form>
      
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
                  />
                </div>
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-clinic-gold/20 to-clinic-primary/20 px-6 py-3 rounded-full border border-clinic-gold/30 backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-clinic-gold" />
                  <span className="text-clinic-gold text-lg font-medium">{t('contact.badge')}</span>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards - Yaratıcı tasarım */}
        <section className="pt-8 pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t('contact.infoSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => {
                const CardContent = (
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 hover:border-clinic-gold/40 transition-all duration-500 p-8 text-center h-full cursor-pointer">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                          {info.icon}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-clinic-gold transition-colors duration-300">
                        {info.title}
                      </h3>
                      
                      {/* Content */}
                      <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {info.content}
                      </div>
                      

                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-clinic-gold/10 to-clinic-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  </div>
                )

                return info.clickable ? (
                  <a 
                    key={index}
                    href={info.href}
                    target={info.href?.includes('http') ? '_blank' : undefined}
                    rel={info.href?.includes('http') ? 'noopener noreferrer' : undefined}
                    className="group transform transition-all duration-700 hover:scale-105 block"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div 
                    key={index}
                    className="group transform transition-all duration-700 hover:scale-105"
                  >
                    {CardContent}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-r from-clinic-primary/10 to-clinic-secondary/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-2xl">
                    <Send className="w-8 h-8 text-black" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinic-gold to-clinic-primary">{t('contact.formTitle')}</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  {t('contact.formSubtitle')}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('hero.form.name')}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:border-clinic-gold focus:bg-white/20 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder={t('hero.form.surname')}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:border-clinic-gold focus:bg-white/20 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative country-dropdown">
                    {/* Phone Input with Dropdown */}
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 z-20">
                        <div className="relative h-full">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              console.log('Contact button clicked, current state:', showCountryDropdown)
                              setShowCountryDropdown(!showCountryDropdown)
                            }}
                            className="flex items-center justify-center h-full px-1 text-white text-sm font-bold bg-gradient-to-r from-clinic-gold/40 to-clinic-primary/40 hover:from-clinic-gold/50 hover:to-clinic-primary/50 transition-all duration-300 border-r border-white/30 rounded-l-2xl cursor-pointer w-[60px]"
                            style={{ height: '56px' }}
                          >
                            <span className="text-xs mr-0.5">{countryCodes.find(c => c.code === selectedCountryCode)?.flag}</span>
                            <span className="text-clinic-gold font-bold text-xs">{selectedCountryCode}</span>
                            <ChevronDown className={`w-2 h-2 ml-0.5 text-clinic-gold transition-all duration-300 ${showCountryDropdown ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {/* Dropdown Menu */}
                          {showCountryDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 border-2 border-clinic-gold/60 rounded-xl shadow-2xl z-[9999] max-h-48 overflow-y-auto">
                              <div className="p-1">
                                {countryCodes.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      console.log('Contact country selected:', country.code)
                                      setSelectedCountryCode(country.code)
                                      setShowCountryDropdown(false)
                                    }}
                                    className="w-full px-3 py-2 text-left text-white hover:bg-gradient-to-r hover:from-clinic-gold/30 hover:to-clinic-primary/30 transition-all duration-200 flex items-center text-xs rounded-lg mb-1 last:mb-0"
                                  >
                                    <span className="text-sm mr-2">{country.flag}</span>
                                    <span className="font-bold text-clinic-gold mr-2 min-w-[45px] text-xs">{country.code}</span>
                                    <span className="text-white font-medium text-xs">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Phone Input */}
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('hero.form.phone')}
                        className="w-full pl-[70px] pr-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:border-clinic-gold focus:bg-white/20 transition-all duration-300 text-lg"
                        style={{ height: '56px' }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('hero.form.email')}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:border-clinic-gold focus:bg-white/20 transition-all duration-300 text-lg"
                      style={{ height: '56px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('hero.form.message')}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 backdrop-blur-md focus:outline-none focus:border-clinic-gold focus:bg-white/20 transition-all duration-300 text-lg"
                    rows={4}
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-clinic-gold to-clinic-primary hover:from-clinic-primary hover:to-clinic-secondary text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-clinic-gold/25 text-lg"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-3" />
                    {isSubmitting ? t('form.sending') : t('hero.form.submit')}
                  </Button>
                </div>
              </form>

              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                <a href="tel:+905431767634" className="group">
                  <div className="bg-gradient-to-r from-clinic-gold to-clinic-primary hover:from-clinic-primary hover:to-clinic-secondary rounded-2xl p-6 text-center text-black font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-clinic-gold/25">
                    <Phone className="w-8 h-8 mx-auto mb-3" />
                    <span className="text-lg">{t('contact.quickCall')}</span>
                    <div className="text-sm opacity-80 mt-1">+90 543 176 7634</div>
                  </div>
                </a>
                <a href="https://wa.me/905431767634" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-gradient-to-r from-clinic-secondary to-clinic-accent hover:from-clinic-accent hover:to-clinic-primary rounded-2xl p-6 text-center text-black font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-clinic-secondary/25">
                    <MessageCircle className="w-8 h-8 mx-auto mb-3" />
                    <span className="text-lg">{t('contact.quickWhatsapp')}</span>
                    <div className="text-sm opacity-80 mt-1">{t('contact.quickMessage')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-20 bg-gradient-to-r from-clinic-secondary/10 to-clinic-accent/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">{t('instagram.title')}</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {t('instagram.subtitle')}
              </p>
            </div>

            {/* Instagram Widget Container */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              {/* Refresh Button - Sağ Üst Köşe */}
              <button
                onClick={fetchInstagramPosts}
                disabled={instagramLoading}
                className="absolute top-6 right-6 z-10 p-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg hover:shadow-pink-500/50"
                title="Instagram postlarını yenile"
              >
                <svg 
                  className={`w-5 h-5 transition-transform duration-500 ${instagramLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Decorative Background Elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
              </div>

              <div className="text-center mb-8 relative z-10">
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                    </svg>
                  </div>
                  {/* Profile Info with Enhanced Styling */}
                  <div className="text-left">
                    <div className="relative mb-2">
                      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 drop-shadow-lg">
                        @vesnaclinic
                      </h3>
                      <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                    <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                      Vesna Hair Clinic
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400 font-medium">Aktif</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Son güncelleme bilgisi */}
                {lastUpdate && (
                  <div className="mb-6 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg">
                      <div className="relative">
                        <Clock className="w-5 h-5 text-pink-400" />
                        <div className="absolute inset-0 animate-ping">
                          <Clock className="w-5 h-5 text-pink-400 opacity-20" />
                        </div>
                      </div>
                      <span className="text-white font-medium">
                        Son güncelleme: {new Date(lastUpdate).toLocaleString('tr-TR')}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl p-6 mb-8">
                  <p className="text-lg text-white/90 italic">
                    "{t('instagram.description')}"
                  </p>
                </div>
              </div>

              {/* Error Durumu */}
              {instagramError && (
                <div className="mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-red-300 font-semibold">Instagram bağlantı hatası</p>
                      <p className="text-red-200 text-sm mt-1">{instagramError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instagram Grid - Modern Design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8">
                {instagramLoading ? (
                  // Loading state
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="aspect-square bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm animate-pulse hover:scale-105 transition-all duration-300">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-400/30 to-purple-500/30 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-pink-500/40 to-purple-600/40 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))
                ) : instagramPosts.length > 0 ? (
                  // Gerçek Instagram postları
                  instagramPosts.map((post, index) => (
                    <a 
                      key={post.id || index}
                      href={post.permalink || 'https://instagram.com/vesnaclinic'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 cursor-pointer group relative"
                    >
                      <div className="absolute inset-0">
                        {/* Media gösterimi - post türüne göre */}
                        {post.media_type === 'VIDEO' ? (
                          // VIDEO/REELS için modern tasarım
                          <>
                            <img
                              src={post.thumbnail_url || post.media_url}
                              alt={post.caption?.substring(0, 50) || 'Instagram video'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onLoad={() => console.log('Video thumbnail yüklendi')}
                              onError={(e: any) => {
                                console.log('Video thumbnail yüklenemedi:', post.thumbnail_url || post.media_url)
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            {/* Video Play Button - Modern */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/50">
                                <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                            {/* Reels Badge - Modern */}
                            <div className="absolute top-3 left-3">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full px-2.5 py-1 text-white text-xs font-bold backdrop-blur-sm shadow-lg">
                                {t('common.reels') || 'REELS'}
                              </div>
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        ) : post.media_type === 'CAROUSEL_ALBUM' ? (
                          // CAROUSEL için modern tasarım
                          <>
                            <img
                              src={post.media_url || post.thumbnail_url}
                              alt={post.caption?.substring(0, 50) || 'Instagram carousel'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onLoad={() => console.log('Carousel resmi yüklendi')}
                              onError={(e: any) => {
                                console.log('Carousel resmi yüklenemedi:', post.media_url || post.thumbnail_url)
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            {/* Carousel Badge - Modern */}
                            <div className="absolute top-3 right-3">
                              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-2 backdrop-blur-sm shadow-lg">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z"/>
                                </svg>
                              </div>
                            </div>
                            {/* Multiple Photos Indicator */}
                            <div className="absolute bottom-3 right-3">
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-lg"></div>
                                <div className="w-1.5 h-1.5 bg-white/60 rounded-full shadow-lg"></div>
                                <div className="w-1.5 h-1.5 bg-white/30 rounded-full shadow-lg"></div>
                              </div>
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        ) : (
                          // IMAGE için modern tasarım
                          <>
                            <img
                              src={post.media_url || post.thumbnail_url}
                              alt={post.caption?.substring(0, 50) || (t('instagram.postAlt') || 'Instagram post')}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onLoad={() => console.log('Post resmi yüklendi')}
                              onError={(e: any) => {
                                console.log('Post resmi yüklenemedi:', post.media_url || post.thumbnail_url)
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            {/* Photo Badge - Modern */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1.5 backdrop-blur-sm shadow-lg">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg>
                              </div>
                            </div>
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </>
                        )}
                        
                        {/* Fallback icon */}
                        <div className="w-full h-full hidden items-center justify-center">
                          <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-xs font-medium line-clamp-2 mb-2">
                            {post.caption?.substring(0, 60) || (t('instagram.postAlt') || 'Instagram post')}...
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                                </svg>
                              </div>
                              <span className="text-white text-xs font-semibold">@vesnaclinic</span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                              <span className="text-white text-xs font-medium">{t('common.viewPost') || 'View'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      

                    </a>
                  ))
                ) : (
                  // Fallback - veri yok ise placeholder göster
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="aspect-square bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 cursor-pointer group">
                      <div className="text-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-pink-400 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <p className="text-sm text-white font-semibold mb-1">@vesnaclinic</p>
                        <p className="text-xs text-white/70">{t('instagram.postNumber') || 'Post #'}{index + 1}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Instagram CTA Button */}
              <div className="text-center">
                <a 
                  href="https://instagram.com/vesnaclinic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {t('instagram.followButton')}
                </a>
              </div>


            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Başarılı! 🎉</h3>
              <p className="text-gray-300 text-center mb-6">
                ✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
              </p>
              <div className="flex flex-col gap-3">
                <a href="tel:+905431767634">
                  <Button className="w-full bg-gradient-to-r from-clinic-gold to-clinic-primary text-black font-bold">
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </Button>
                </a>
                <Button
                  onClick={closeSuccessModal}
                  className="w-full bg-white/10 border-2 border-white/30 text-white hover:bg-white/20"
                >
                  Tamam
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default ContactPage 