import { NextRequest, NextResponse } from 'next/server'

// Instagram API Configuration - Vesna Hair Clinic App
const INSTAGRAM_APP_ID = '612009118618172'
const INSTAGRAM_APP_SECRET = '5e0b7588acd1b0667af36465c1a3d7a8'
const INSTAGRAM_ACCESS_TOKEN = 'IGAATp6LzNX6NBZAFBrY3dDODlFVXpSTTEwTXJFX1cwcEpBb2ZANX0ZAqenlLWjEtVGhtMkJNaGRIRGZAnUHNjYzRXaHVXQWticVB4aEZAPRy1admFhblpidXdLUmk3MzBLQlEzWXJnM0tMNnJiVmVnTHhFRV9NUHBmN2czR0NVMHlqUQZDZD'

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Instagram API çağrısı başlatılıyor...')
    console.log('📋 Token uzunluğu:', INSTAGRAM_ACCESS_TOKEN.length)
    
    // İlk önce basit user info çağrısı yapalım - token geçerli mi?
    const userInfoUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    console.log('🔍 User info test ediliyor...')
    
    const userResponse = await fetch(userInfoUrl)
    
    if (!userResponse.ok) {
      const userError = await userResponse.text()
      console.error('❌ User info error:', userError)
      throw new Error(`User info error: ${userResponse.status} - ${userError}`)
    }
    
    const userInfo = await userResponse.json()
    console.log('✅ Instagram kullanıcısı:', userInfo)
    
    // Şimdi medya çağrısı yapalım
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&limit=8&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    console.log('📸 Medya listeleniyor...')
    
    const mediaResponse = await fetch(mediaUrl)
    
    if (!mediaResponse.ok) {
      const mediaError = await mediaResponse.text()
      console.error('❌ Media API error:', mediaError)
      throw new Error(`Media API error: ${mediaResponse.status} - ${mediaError}`)
    }

    const mediaData = await mediaResponse.json()
    console.log('📊 Ham medya verisi:', {
      totalPosts: mediaData.data?.length || 0,
      firstPost: mediaData.data?.[0] || 'Yok'
    })

    // Sadece resim ve video tiplerini filtrele
    const filteredData = {
      ...mediaData,
      data: mediaData.data?.filter((item: any) => 
        item.media_type === 'IMAGE' || item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM'
      ).slice(0, 8) || []
    }

    console.log('✅ Filtrelenmiş veri:', {
      totalFiltered: filteredData.data.length,
      mediaTypes: filteredData.data.map((item: any) => item.media_type)
    })

    return NextResponse.json(filteredData)
  } catch (error) {
    console.error('💥 Instagram API hatası:', error)
    
    // Detaylı hata bilgisi döndür
    return NextResponse.json({
      data: [],
      error: error instanceof Error ? error.message : 'Instagram API bağlantı hatası',
      fallback: true,
      debug: {
        timestamp: new Date().toISOString(),
        tokenLength: INSTAGRAM_ACCESS_TOKEN.length,
        tokenPreview: INSTAGRAM_ACCESS_TOKEN.substring(0, 20) + '...',
        suggestion: 'Instagram Developer Console\'dan yeni token alın'
      }
    }, { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 