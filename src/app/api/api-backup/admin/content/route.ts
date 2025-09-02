import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const contentFilePath = path.join(process.cwd(), 'data', 'content.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Default content structure
const defaultContent = {
  homepage: {
    heroTitle: 'Doğal Saç Ekimi ile Hayalinizdeki Görünüme Kavuşun',
    heroSubtitle: 'Vesna Hair Clinic olarak, en son teknoloji ile güvenli ve etkili saç ekimi hizmetleri sunuyoruz.',
    whyUsTitle: 'Neden Vesna Hair Clinic?',
    whyUsItems: [
      'FDA onaylı teknolojiler',
      'Deneyimli uzman ekip',
      'Doğal sonuçlar',
      '24/7 destek hizmeti'
    ]
  },
  contact: {
    address: 'İstanbul/Ataşehir',
    phone: '+90 532 666 29 80',
    email: 'info@vesnahairclinic.com',
    workingHours: 'Pazartesi - Cumartesi: 09:00 - 18:00',
    whatsapp: '+90 532 666 29 80'
  },
  about: {
    title: 'Vesna Hair Clinic Hakkında',
    description: 'Vesna Hair Clinic olarak, saç ekimi alanında son teknoloji yöntemlerle hizmet veren uzman bir ekibiz.',
    mission: 'Hastalarımıza en kaliteli ve güvenli saç ekimi hizmetini sunmak',
    vision: 'Türkiye\'nin en güvenilir saç ekimi kliniği olmak',
    experience: '10+ yıl deneyim',
    successRate: '%98 başarı oranı'
  },
  gallery: [
    {
      id: 1,
      title: 'Muhteşem Dönüşüm',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.JPEG',
      duration: '12 ay',
      satisfaction: 98
    },
    {
      id: 2,
      title: 'Doğal Sonuçlar',
      beforeImage: '/images/kaanbefore.JPEG',
      afterImage: '/images/kaanafter.JPEG',
      duration: '10 ay',
      satisfaction: 97
    }
  ]
}

function readContent() {
  try {
    ensureDataDirectory()
    if (fs.existsSync(contentFilePath)) {
      const data = fs.readFileSync(contentFilePath, 'utf8')
      return JSON.parse(data)
    }
    return defaultContent
  } catch (error) {
    console.error('Error reading content:', error)
    return defaultContent
  }
}

function writeContent(content: any) {
  try {
    ensureDataDirectory()
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2))
    return true
  } catch (error) {
    console.error('Error writing content:', error)
    return false
  }
}

// GET - Retrieve content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    const content = readContent()
    
    if (type && content[type]) {
      return NextResponse.json({
        success: true,
        data: content[type]
      })
    }
    
    return NextResponse.json({
      success: true,
      data: content
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'İçerik alınırken hata oluştu'
    }, { status: 500 })
  }
}

// POST - Save content
export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()
    
    if (!type || !data) {
      return NextResponse.json({
        success: false,
        error: 'Tip ve veri gerekli'
      }, { status: 400 })
    }
    
    const currentContent = readContent()
    
    // İletişim bilgileri için özel kontrol
    if (type === 'contact') {
      // Telefon numaralarını düzelt
      if (data.phone) {
        data.phone = data.phone.replace(/\s+/g, '').replace(/^0/, '+90')
      }
      if (data.whatsapp) {
        data.whatsapp = data.whatsapp.replace(/\s+/g, '').replace(/^0/, '+90')
      }
    }
    
    // Hakkımızda sayfası için özel kontrol
    if (type === 'about') {
      // Yüzde işaretlerini düzelt
      if (data.successRate && !data.successRate.startsWith('%')) {
        data.successRate = '%' + data.successRate.replace(/[^0-9]/g, '')
      }
      
      // Deneyim yılını düzelt
      if (data.experience && !data.experience.endsWith('yıl deneyim')) {
        data.experience = data.experience.replace(/[^0-9+]/g, '') + '+ yıl deneyim'
      }
    }
    
    // Anasayfa için özel kontrol
    if (type === 'homepage') {
      // whyUsItems dizisini düzelt
      if (Array.isArray(data.whyUsItems)) {
        data.whyUsItems = data.whyUsItems.map((item: string) => {
          if (typeof item === 'string') {
            return item.trim()
          }
          return item
        }).filter((item: string) => item)
      }
      
      // Başlıkları düzelt
      if (data.heroTitle) {
        data.heroTitle = data.heroTitle.trim()
      }
      if (data.heroSubtitle) {
        data.heroSubtitle = data.heroSubtitle.trim()
      }
      if (data.whyUsTitle) {
        data.whyUsTitle = data.whyUsTitle.trim()
      }
    }
    
    currentContent[type] = data
    
    const success = writeContent(currentContent)
    
    if (success) {
      // Revalidate all dynamic pages
      revalidatePath('/')
      revalidatePath('/hakkimizda')
      revalidatePath('/hizmetler')
      revalidatePath('/once-sonra')
      revalidatePath('/iletisim')
      
      return NextResponse.json({
        success: true,
        message: 'İçerik başarıyla kaydedildi'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'İçerik kaydedilirken hata oluştu'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Sunucu hatası'
    }, { status: 500 })
  }
}

// PUT - Update specific content
export async function PUT(request: NextRequest) {
  try {
    const { type, field, value: originalValue } = await request.json()
    
    if (!type || !field || originalValue === undefined) {
      return NextResponse.json({
        success: false,
        error: 'Tip, alan ve değer gerekli'
      }, { status: 400 })
    }
    
    const currentContent = readContent()
    
    if (!currentContent[type]) {
      currentContent[type] = {}
    }
    
    // İletişim bilgileri için özel kontrol
    let finalValue = originalValue
    if (type === 'contact') {
      if (field === 'phone' || field === 'whatsapp') {
        finalValue = originalValue.replace(/\s+/g, '').replace(/^0/, '+90')
      }
    }
    
    // Hakkımızda sayfası için özel kontrol
    if (type === 'about') {
      if (field === 'successRate' && !originalValue.startsWith('%')) {
        finalValue = '%' + originalValue.replace(/[^0-9]/g, '')
      }
      if (field === 'experience' && !originalValue.endsWith('yıl deneyim')) {
        finalValue = originalValue.replace(/[^0-9+]/g, '') + '+ yıl deneyim'
      }
    }
    
    // Anasayfa için özel kontrol
    if (type === 'homepage') {
      if (field === 'whyUsItems' && Array.isArray(originalValue)) {
        finalValue = originalValue.map((item: string) => {
          if (typeof item === 'string') {
            return item.trim()
          }
          return item
        }).filter((item: string) => item)
      } else if (typeof originalValue === 'string') {
        finalValue = originalValue.trim()
      }
    }
    
    currentContent[type][field] = finalValue
    
    const success = writeContent(currentContent)
    
    if (success) {
      // Revalidate all dynamic pages
      revalidatePath('/')
      revalidatePath('/hakkimizda')
      revalidatePath('/hizmetler')
      revalidatePath('/once-sonra')
      revalidatePath('/iletisim')
      
      return NextResponse.json({
        success: true,
        message: 'İçerik başarıyla güncellendi'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'İçerik güncellenirken hata oluştu'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Sunucu hatası'
    }, { status: 500 })
  }
} 