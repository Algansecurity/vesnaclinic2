'use client'

import { useEffect, useState, useMemo, useCallback, memo } from 'react'
import { Button } from '@/components/ui/Button'
import { Users, Award, Phone, MessageCircle, TrendingUp, Send, ChevronDown, CheckCircle, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Hero = memo(function Hero() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true) // Değiştirildi: başlangıçta true
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState('+90')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)

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

  // Basitleştirildi: Timer kaldırıldı
  // useEffect(() => {
  //   const timer = setTimeout(() => setIsVisible(true), 100)
  //   return () => clearTimeout(timer)
  // }, [])

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

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Combine country code with phone number
      const phoneWithCountryCode = selectedCountryCode + formData.phone
      const fullName = formData.name + ' ' + formData.surname
      const message = formData.message || 'Ücretsiz muayene randevusu talebi'
      
      // Netlify Forms kullanarak form gönderimi (statik hosting uyumlu)
      const formData_netlify = new FormData()
      formData_netlify.append('form-name', 'vesna-hero-contact')
      formData_netlify.append('name', fullName)
      formData_netlify.append('email', formData.email)
      formData_netlify.append('phone', phoneWithCountryCode)
      formData_netlify.append('message', message)
      formData_netlify.append('subject', `🆕 Vesna Hero Form - ${fullName} (${phoneWithCountryCode})`)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData_netlify as any).toString()
      })
      
      if (response.ok) {
        // Telegram bildirimi de gönder
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
        alert('❌ Mesaj gönderilemedi. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Form submit error:', error)
      alert('❌ Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedCountryCode, formData])

  // Telegram bildirimi fonksiyonu (client-side)
  const sendTelegramNotification = async (contactData: any) => {
    const TELEGRAM_BOT_TOKEN = '7868956697:AAF4Uy6fHEjKdDJDfNzuHGiuOkNyFQDhRvE'
    const TELEGRAM_CHAT_ID_1 = '-1002319826988' // Ana grup
    const TELEGRAM_CHAT_ID_2 = '1381793841' // Önder Dağhan
    
    const telegramMessage = `
🏥 *Vesna Hair Clinic* - Ana Sayfa Formu

👤 *Ad Soyad:* ${contactData.name}
📧 *E-posta:* ${contactData.email}
📞 *Telefon:* ${contactData.phone}

💬 *Mesaj:*
${contactData.message}

📅 *Tarih:* ${new Date().toLocaleString('tr-TR')}

📱 *Hızlı Arama:* [${contactData.phone}](tel:${contactData.phone})
🌐 *Kaynak:* Ana Sayfa Hero Formu

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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Telefon numarası için sadece rakam kabul et ve ülkeye göre sınırla
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '')
      
      // Ülke koduna göre maksimum karakter sayısı
      let maxLength = 10 // Varsayılan
      switch (selectedCountryCode) {
        case '+90': // Türkiye
          maxLength = 10
          break
        case '+1': // ABD/Kanada
          maxLength = 10
          break
        case '+44': // İngiltere
          maxLength = 10
          break
        case '+49': // Almanya
          maxLength = 11
          break
        case '+33': // Fransa
          maxLength = 9
          break
        case '+39': // İtalya
          maxLength = 10
          break
        case '+34': // İspanya
          maxLength = 9
          break
        case '+31': // Hollanda
          maxLength = 9
          break
        case '+7': // Rusya
          maxLength = 10
          break
        case '+86': // Çin
          maxLength = 11
          break
        case '+81': // Japonya
          maxLength = 11
          break
        case '+82': // Güney Kore
          maxLength = 9
          break
        case '+91': // Hindistan
          maxLength = 10
          break
        case '+971': // BAE
          maxLength = 9
          break
        case '+966': // Suudi Arabistan
          maxLength = 9
          break
        case '+20': // Mısır
          maxLength = 10
          break
        case '+212': // Fas
          maxLength = 9
          break
        case '+213': // Cezayir
          maxLength = 9
          break
        case '+216': // Tunus
          maxLength = 8
          break
        case '+218': // Libya
          maxLength = 9
          break
        default:
          maxLength = 10
      }
      
      // Maksimum karakter sınırını uygula
      const limitedValue = numericValue.slice(0, maxLength)
      
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
  }, [selectedCountryCode, formData])

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false)
  }, [])

  const stats = useMemo(() => [
    { icon: Users, value: '3800+', label: t('stats.customers') },
    { icon: Award, value: '8+', label: t('stats.experience') },
    { icon: TrendingUp, value: '%98', label: t('stats.satisfaction') },
  ], [t])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 py-8 overflow-hidden" style={{width: '100%', maxWidth: '100%', overflowX: 'hidden', margin: '0', padding: '0'}}>
      {/* Netlify Forms için gizli form - Hero */}
      <form name="vesna-hero-contact" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
        <input type="text" name="subject" />
      </form>
      
      {/* Background Image - Optimize edildi */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70"></div>
      
      {/* Basitleştirilmiş Background Elements - Sadece 2 element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 w-24 h-24 bg-clinic-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-4 w-32 h-32 bg-clinic-secondary/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl w-full">
        <div className="text-center text-white flex flex-col justify-center min-h-screen py-20">
          {/* Main Content - Animasyon basitleştirildi */}
          <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-3 sm:mb-4 mt-16 sm:mt-20"
                style={{
                  background: 'linear-gradient(90deg, #fef08a 0%, #fde047 20%, #f59e0b 40%, #fde047 60%, #fef08a 80%, #ffffff 100%)',
                  backgroundSize: '200% 100%', // Animasyon kaldırıldı
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
            >
              VESNA HAIR CLINIC
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
              {t('hero.subtitle')}
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2">
              <a href="tel:+905431767634" className="w-full sm:w-auto">
                <Button 
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto min-w-[200px] text-gray-900 font-bold shadow-xl"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('hero.cta.consultation')}
                </Button>
              </a>
              
              <a href="https://wa.me/905431767634" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  variant="secondary"
                  size="md"
                  className="w-full sm:w-auto min-w-[200px] text-white font-bold"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('hero.cta.whatsapp')}
                </Button>
              </a>
            </div>
          </div>
          
          {/* Free Consultation Form */}
          <div className={`mt-8 sm:mt-12 max-w-xl mx-auto w-full px-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-white">
                {t('hero.form.title')}
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('hero.form.name')}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      placeholder={t('hero.form.surname')}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                              console.log('Button clicked, current state:', showCountryDropdown)
                              setShowCountryDropdown(!showCountryDropdown)
                            }}
                            className="flex items-center justify-center h-full px-1 text-white text-xs font-bold bg-gradient-to-r from-clinic-gold/40 to-clinic-primary/40 hover:from-clinic-gold/50 hover:to-clinic-primary/50 transition-all duration-300 border-r border-white/30 rounded-l-xl cursor-pointer w-[55px]"
                            style={{ height: '45px' }}
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
                                      console.log('Country selected:', country.code)
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
                        onChange={handleInputChange}
                        placeholder={t('hero.form.phone')}
                        className="form-input pl-[70px] pr-4"
                        style={{ height: '45px' }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('hero.form.email')}
                      className="form-input"
                      style={{ height: '45px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('hero.form.message')}
                    className="form-textarea"
                    rows={4}
                    required
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] text-gray-900 font-bold"
                    loading={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t('hero.form.submit')}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="stats-card group">
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-clinic-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-content">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-clinic-gold to-clinic-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h3 className="heading-tertiary mb-4 text-white">Başarılı! 🎉</h3>
              <p className="text-body text-center mb-6 text-gray-300">
                ✅ Mesajınız başarıyla gönderildi! Hem admin panele hem de e-mail adresimize ulaştı. 
                En kısa sürede size dönüş yapacağız.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:+905431767634" className="flex-1 sm:flex-none">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full text-gray-900 font-bold"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </Button>
                </a>
                <Button
                  onClick={closeSuccessModal}
                  variant="secondary"
                  size="md"
                  className="flex-1 sm:flex-none"
                >
                  Tamam
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed WhatsApp Button */}
    </section>
  )
})

export default Hero
