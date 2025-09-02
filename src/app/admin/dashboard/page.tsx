'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  BarChart3,
  Settings, 
  Users, 
  FileText,
  Image as ImageIcon, 
  Edit3, 
  Save, 
  Upload,
  Trash2,
  Plus,
  Eye,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  ChevronRight,
  Home,
  MessageSquare,
  Info,
  Camera,
  Sparkles,
  LogOut,
  Shield
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  
  // Dashboard stats
  const [stats, setStats] = useState({
    totalMessages: 156,
    pendingMessages: 12,
    thisMonthMessages: 45,
    totalViews: 2847
  })

  // Homepage content
  const [homepageContent, setHomepageContent] = useState({
    heroTitle: 'Doğal Saç Ekimi ile Hayalinizdeki Görünüme Kavuşun',
    heroSubtitle: 'Vesna Hair Clinic olarak, en son teknoloji ile güvenli ve etkili saç ekimi hizmetleri sunuyoruz.',
    whyUsTitle: 'Neden Vesna Hair Clinic?',
    whyUsItems: [
      'FDA onaylı teknolojiler',
      'Deneyimli uzman ekip',
      'Doğal sonuçlar',
      '24/7 destek hizmeti'
    ]
  })

  // Contact page content
  const [contactContent, setContactContent] = useState({
    address: 'İstanbul/Ataşehir',
    phone: '+90 543 176 7634',
    email: 'info@vesnahairclinic.com',
    workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
    whatsapp: '+90 543 176 7634'
  })

  // About page content
  const [aboutContent, setAboutContent] = useState({
    title: 'Vesna Hair Clinic Hakkında',
    description: 'Vesna Hair Clinic olarak, saç ekimi alanında son teknoloji yöntemlerle hizmet veren uzman bir ekibiz.',
    mission: 'Hastalarımıza en kaliteli ve güvenli saç ekimi hizmetini sunmak',
    vision: 'Türkiye\'nin en güvenilir saç ekimi kliniği olmak',
    experience: '10+ yıl deneyim',
    successRate: '%98 başarı oranı'
  })

  // Before/After gallery
  const [beforeAfterGallery, setBeforeAfterGallery] = useState([
    {
      id: 1,
      title: 'Muhteşem Dönüşüm',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '12 ay',
      satisfaction: 98
    },
    {
      id: 2,
      title: 'Doğal Sonuçlar',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '10 ay',
      satisfaction: 97
    },
    {
      id: 3,
      title: 'Hayal Kurduğu Saçlar',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '8 ay',
      satisfaction: 96
    },
    {
      id: 4,
      title: 'Mükemmel Sonuç',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '14 ay',
      satisfaction: 99
    },
    {
      id: 5,
      title: 'Yoğun ve Doğal',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '16 ay',
      satisfaction: 98
    },
    {
      id: 6,
      title: 'Etkileyici Değişim',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '12 ay',
      satisfaction: 97
    },
    {
      id: 7,
      title: 'Kusursuz Çizgi',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '18 ay',
      satisfaction: 99
    },
    {
      id: 8,
      title: 'Genç ve Dinamik',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '11 ay',
      satisfaction: 98
    },
    {
      id: 9,
      title: 'Tam İstediği Gibi',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '15 ay',
      satisfaction: 96
    }
  ])

  // Load initial data
  useEffect(() => {
    const checkAuth = () => {
      const hasAdminToken = document.cookie.includes('admin-token')
      const hasSession = localStorage.getItem('admin-session')
      
      if (!hasAdminToken && !hasSession) {
        router.push('/admin')
        return
      }
      
      loadData()
    }
    
    const loadData = async () => {
      try {
        // Load stats
        const statsResponse = await fetch('/api/admin/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          if (statsData.success) {
            setStats(statsData.data)
          }
        }
        
        // Load content
        const contentResponse = await fetch('/api/admin/content')
        if (contentResponse.ok) {
          const contentData = await contentResponse.json()
          if (contentData.success) {
            const data = contentData.data
            if (data.homepage) setHomepageContent(data.homepage)
            if (data.contact) setContactContent(data.contact)
            if (data.about) setAboutContent(data.about)
            if (data.gallery) setBeforeAfterGallery(data.gallery)
          }
      }
    } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = () => {
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    localStorage.removeItem('admin-session')
    localStorage.removeItem('admin-email')
    router.push('/admin')
  }

  const saveContent = async (type: string, content: any) => {
    setIsLoading(true)
    setSaveStatus('Kaydediliyor...')
    
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data: content
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSaveStatus('✅ Başarıyla kaydedildi!')
        
        // Sayfayı yeniden yükle
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        setSaveStatus('❌ ' + (result.error || 'Kaydetme hatası!'))
      }
      
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      setSaveStatus('❌ Bağlantı hatası!')
      setTimeout(() => setSaveStatus(''), 3000)
    }
    
    setIsLoading(false)
  }

  const addBeforeAfter = () => {
    const newItem = {
      id: Date.now(),
      title: 'Yeni Dönüşüm',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.jpg',
      duration: '12 ay',
      satisfaction: 95
    }
    
    const newGallery = [...beforeAfterGallery, newItem]
    setBeforeAfterGallery(newGallery)
    saveContent('gallery', newGallery)
  }

  const removeBeforeAfter = (id: number) => {
    const newGallery = beforeAfterGallery.filter(item => item.id !== id)
    setBeforeAfterGallery(newGallery)
    saveContent('gallery', newGallery)
  }

  const updateBeforeAfter = (id: number, field: string, value: any) => {
    const newGallery = beforeAfterGallery.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    })
    setBeforeAfterGallery(newGallery)
    saveContent('gallery', newGallery)
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'homepage', label: 'Anasayfa', icon: Home },
    { id: 'contact', label: 'İletişim', icon: Phone },
    { id: 'about', label: 'Hakkımızda', icon: Info },
    { id: 'gallery', label: 'Önce/Sonra', icon: Camera },
    { id: 'settings', label: 'Ayarlar', icon: Settings }
  ]

        return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logo2.png"
              alt="Vesna Hair Clinic"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Vesna Hair Clinic</p>
                    </div>
            </div>

          <div className="flex items-center space-x-4">
            {saveStatus && (
              <span className="text-sm text-green-400 animate-pulse">{saveStatus}</span>
            )}
                <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300"
                >
              <LogOut className="w-4 h-4" />
              <span>Çıkış</span>
                </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                <button 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-clinic-gold/20 text-clinic-gold border border-clinic-gold/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
          <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                <div className="text-sm text-gray-400">
                  Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
              </div>
            </div>
            
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-clinic-gold/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Toplam Mesaj</p>
                      <p className="text-2xl font-bold text-white">{stats.totalMessages}</p>
                        </div>
                    <MessageSquare className="w-8 h-8 text-blue-400" />
                      </div>
                      </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-clinic-gold/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Bekleyen Mesaj</p>
                      <p className="text-2xl font-bold text-white">{stats.pendingMessages}</p>
                      </div>
                    <Clock className="w-8 h-8 text-orange-400" />
                    </div>
                  </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-clinic-gold/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Bu Ay</p>
                      <p className="text-2xl font-bold text-white">{stats.thisMonthMessages}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-clinic-gold/30 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Toplam Görüntüleme</p>
                      <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
            </div>
                    <Eye className="w-8 h-8 text-purple-400" />
                        </div>
                      </div>
                        </div>

              {/* Grid: Quick Actions + Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-clinic-gold" />
                    Hızlı İşlemler
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-clinic-gold/20 to-yellow-500/10 hover:from-clinic-gold/30 hover:to-yellow-500/20 border border-clinic-gold/30 text-clinic-gold rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Camera className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-medium">Galeri Yönet</p>
                          <p className="text-xs text-yellow-400">9 fotoğraf mevcut</p>
                   </div>
                </div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('homepage')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 border border-blue-500/30 text-blue-300 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Home className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-medium">Anasayfa Düzenle</p>
                          <p className="text-xs text-blue-400">Hero ve içerik</p>
            </div>
                    </div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 border border-green-500/30 text-green-300 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-medium">İletişim Düzenle</p>
                          <p className="text-xs text-green-400">Adres, telefon, e-posta</p>
                  </div>
                </div>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
            </div>
          </div>

                {/* Recent Messages */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-clinic-gold" />
                    Son Mesajlar
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">Ahmet Yılmaz</p>
                        <span className="text-xs text-gray-400">2 saat önce</span>
            </div>
                      <p className="text-sm text-gray-300">Saç ekimi hakkında bilgi almak istiyorum...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="inline-flex items-center px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-1"></div>
                          Yanıt Bekliyor
                        </span>
                        <button className="text-xs text-clinic-gold hover:text-clinic-gold/80">Yanıtla</button>
                      </div>
                        </div>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-white">Zeynep Kaya</p>
                        <span className="text-xs text-gray-400">5 saat önce</span>
                      </div>
                      <p className="text-sm text-gray-300">Randevu almak istiyorum, müsait zamanlar...</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="inline-flex items-center px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                          Yanıtlandı
                        </span>
                        <button className="text-xs text-clinic-gold hover:text-clinic-gold/80">Detay</button>
                    </div>
                  </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <button className="w-full p-3 bg-clinic-gold/20 hover:bg-clinic-gold/30 text-clinic-gold rounded-xl transition-all duration-300 text-sm font-medium">
                      Tüm Mesajları Görüntüle
                    </button>
                   </div>
                </div>
            </div>
          </div>
          )}

          {/* Homepage Tab */}
          {activeTab === 'homepage' && (
          <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Anasayfa İçerik Düzenleme</h2>
                <button
                  onClick={() => saveContent('homepage', homepageContent)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-clinic-gold hover:bg-clinic-gold/80 text-gray-900 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</span>
                </button>
              </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hero Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-clinic-gold" />
                    Hero Bölümü
                </h3>
                  
                <div className="space-y-4">
                                     <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Ana Başlık</label>
                      <textarea
                        value={homepageContent.heroTitle}
                        onChange={(e) => setHomepageContent({...homepageContent, heroTitle: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                        rows={2}
                     />
                   </div>
                    
                   <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Alt Başlık</label>
                     <textarea 
                        value={homepageContent.heroSubtitle}
                        onChange={(e) => setHomepageContent({...homepageContent, heroSubtitle: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                        rows={3}
                     />
                   </div>
                </div>
              </div>

                {/* Why Us Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-400" />
                    Neden Biz Bölümü
                </h3>
                  
                <div className="space-y-4">
                                     <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Başlık</label>
                     <input 
                        type="text"
                        value={homepageContent.whyUsTitle}
                        onChange={(e) => setHomepageContent({...homepageContent, whyUsTitle: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                     />
                   </div>
                    
                   <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Özellikler</label>
                      {homepageContent.whyUsItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                     <input 
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...homepageContent.whyUsItems]
                              newItems[index] = e.target.value
                              setHomepageContent({...homepageContent, whyUsItems: newItems})
                            }}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:outline-none transition-all duration-300"
                          />
                          <button
                            onClick={() => {
                              const newItems = homepageContent.whyUsItems.filter((_, i) => i !== index)
                              setHomepageContent({...homepageContent, whyUsItems: newItems})
                            }}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                   </div>
                      ))}
                      <button
                        onClick={() => {
                          const newItems = [...homepageContent.whyUsItems, 'Yeni özellik']
                          setHomepageContent({...homepageContent, whyUsItems: newItems})
                        }}
                        className="flex items-center space-x-2 px-3 py-2 text-clinic-gold hover:bg-clinic-gold/20 rounded-lg transition-all duration-300"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Özellik Ekle</span>
                      </button>
                   </div>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">İletişim Bilgileri</h2>
                <button
                  onClick={() => saveContent('contact', contactContent)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-clinic-gold hover:bg-clinic-gold/80 text-gray-900 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-400" />
                    Lokasyon Bilgileri
                </h3>
                  
                                     <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Adres</label>
                    <textarea
                      value={contactContent.address}
                      onChange={(e) => setContactContent({...contactContent, address: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                      rows={3}
                     />
                   </div>
                  
                   <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Çalışma Saatleri</label>
                     <input 
                      type="text"
                      value={contactContent.workingHours}
                      onChange={(e) => setContactContent({...contactContent, workingHours: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                    />
                </div>
              </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-green-400" />
                    İletişim Detayları
                </h3>
                  
                                     <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                       <input 
                      type="text"
                      value={contactContent.phone}
                      onChange={(e) => setContactContent({...contactContent, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
                       <input 
                      type="email"
                      value={contactContent.email}
                      onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                       />
                     </div>
                  
                   <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
                       <input 
                      type="text"
                      value={contactContent.whatsapp}
                      onChange={(e) => setContactContent({...contactContent, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                       />
                     </div>
                   </div>
                  </div>
                </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Hakkımızda Sayfası</h2>
                <button
                  onClick={() => saveContent('about', aboutContent)}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-clinic-gold hover:bg-clinic-gold/80 text-gray-900 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</span>
                </button>
             </div>

              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Genel Bilgiler</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Başlık</label>
                      <input
                        type="text"
                        value={aboutContent.title}
                        onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                      />
          </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Deneyim</label>
                      <input
                        type="text"
                        value={aboutContent.experience}
                        onChange={(e) => setAboutContent({...aboutContent, experience: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                      />
            </div>
          </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Açıklama</label>
                    <textarea
                      value={aboutContent.description}
                      onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                      rows={4}
                    />
        </div>
      </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Misyon</h3>
                    <textarea
                      value={aboutContent.mission}
                      onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                      rows={3}
                    />
      </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Vizyon</h3>
                    <textarea
                      value={aboutContent.vision}
                      onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                      rows={3}
                    />
            </div>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Önce/Sonra Galeri</h2>
                <div className="flex items-center space-x-3">
                <button
                    onClick={() => saveContent('gallery', beforeAfterGallery)}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isLoading ? 'Kaydediliyor...' : 'Kaydet'}</span>
                </button>
              <button
                    onClick={addBeforeAfter}
                    className="flex items-center space-x-2 px-6 py-3 bg-clinic-gold hover:bg-clinic-gold/80 text-gray-900 rounded-lg font-medium transition-all duration-300"
              >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Ekle</span>
              </button>
          </div>
        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beforeAfterGallery.map((item) => (
                  <div key={item.id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-clinic-gold/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <button
                        onClick={() => removeBeforeAfter(item.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-300"
              >
                        <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
                    <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                        <p className="text-xs text-gray-400 mb-1">ÖNCE</p>
                        <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={item.beforeImage}
                            alt="Before"
                            fill
                            className="object-cover"
                     />
                  </div>
                   </div>
                   <div>
                        <p className="text-xs text-gray-400 mb-1">SONRA</p>
                        <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                          <Image
                            src={item.afterImage}
                            alt="After"
                            fill
                            className="object-cover"
                     />
                   </div>
                  </div>
                </div>
              
                    <div className="space-y-2">
                    <input 
                        type="text"
                        value={item.title}
                        onChange={(e) => updateBeforeAfter(item.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:outline-none transition-all duration-300 text-sm"
                        placeholder="Başlık"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                    <input 
                          type="text"
                          value={item.duration}
                          onChange={(e) => updateBeforeAfter(item.id, 'duration', e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:outline-none transition-all duration-300 text-sm"
                          placeholder="Süre"
                        />
                        
                    <input 
                          type="number"
                          value={item.satisfaction}
                          onChange={(e) => updateBeforeAfter(item.id, 'satisfaction', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:outline-none transition-all duration-300 text-sm"
                          placeholder="Memnuniyet %"
                          min="1"
                          max="100"
                    />
                  </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-300 text-sm">
                          <Upload className="w-3 h-3" />
                          <span>Önce</span>
                        </button>
                        <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all duration-300 text-sm">
                          <Upload className="w-3 h-3" />
                          <span>Sonra</span>
                        </button>
                   </div>
                   </div>
                  </div>
                ))}
                  </div>
                </div>
              )}
              
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Genel Ayarlar</h2>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Site Ayarları</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Site Başlığı</label>
                    <input 
                      type="text"
                      defaultValue="Vesna Hair Clinic"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                    />
            </div>
            
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Site Açıklaması</label>
                    <input
                      type="text"
                      defaultValue="Türkiye'nin en güvenilir saç ekimi kliniği"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-clinic-gold focus:ring-2 focus:ring-clinic-gold/50 focus:outline-none transition-all duration-300"
                    />
            </div>
          </div>
        </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Güvenlik</h3>
                <div className="space-y-4">
                  <button className="flex items-center space-x-2 px-4 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all duration-300">
                    <Shield className="w-4 h-4" />
                    <span>Şifre Değiştir</span>
              </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-300">
                    <LogOut className="w-4 h-4" />
                    <span>Tüm Oturumları Sonlandır</span>
                  </button>
            </div>
          </div>
        </div>
      )}
        </main>
      </div>
    </div>
  )
} 