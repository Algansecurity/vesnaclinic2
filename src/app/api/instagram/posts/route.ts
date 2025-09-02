import { NextRequest, NextResponse } from 'next/server'

// Instagram API Configuration - Vesna Hair Clinic App
const INSTAGRAM_APP_ID = '612009118618172'
const INSTAGRAM_APP_SECRET = '5e0b7588acd1b0667af36465c1a3d7a8'
const INSTAGRAM_ACCESS_TOKEN = 'IGAATp6LzNX6NBZAFBrY3dDODlFVXpSTTEwTXJFX1cwcEpBb2ZANX0ZAqenlLWjEtVGhtMkJNaGRIRGZAnUHNjYzRXaHVXQWticVB4aEZAPRy1admFhblpidXdLUmk3MzBLQlEzWXJnM0tMNnJiVmVnTHhFRV9NUHBmN2czR0NVMHlqUQZDZD'

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Instagram API çağrısı başlatılıyor...')
    console.log('📋 Token uzunluğu:', INSTAGRAM_ACCESS_TOKEN.length)
    
    // Cache-busting için timestamp ekle
    const timestamp = Date.now()

    // Step 1: Kullanıcı bilgilerini kontrol et
    console.log('🔍 User info test ediliyor...')
    const userInfoUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    const userInfoResponse = await fetch(userInfoUrl)
    
    if (!userInfoResponse.ok) {
      console.error('❌ User info hatası:', userInfoResponse.status)
      const errorData = await userInfoResponse.json()
      console.error('❌ Error details:', errorData)
      return NextResponse.json({ 
        error: 'Instagram kullanıcı bilgileri alınamadı',
        details: errorData
      }, { status: 401 })
    }

    const userInfo = await userInfoResponse.json()
    console.log('✅ Instagram kullanıcısı:', userInfo)

    // Step 2: Media listesini al
    console.log('📸 Medya listeleniyor...')
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&limit=8&access_token=${INSTAGRAM_ACCESS_TOKEN}&_t=${timestamp}`
    
    const mediaResponse = await fetch(mediaUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    
    if (!mediaResponse.ok) {
      console.error('❌ Media API hatası:', mediaResponse.status)
      const errorData = await mediaResponse.json()
      console.error('❌ Error details:', errorData)
      return NextResponse.json({ 
        error: 'Instagram medya listesi alınamadı',
        details: errorData
      }, { status: 401 })
    }

    const mediaData = await mediaResponse.json()
    console.log('📊 Ham medya verisi:', {
      totalPosts: mediaData.data?.length || 0,
      firstPost: mediaData.data?.[0] || null
    })

    // Step 3: Veriyi filtrele ve düzenle
    let posts = []
    if (mediaData.data && Array.isArray(mediaData.data)) {
      posts = mediaData.data
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
        .slice(0, 8) // Sadece ilk 8 post
    }

    console.log('✅ Filtrelenmiş veri:', {
      totalFiltered: posts.length,
      mediaTypes: posts.map((p: any) => p.media_type)
    })

    return NextResponse.json({
      success: true,
      data: posts,
      user: userInfo,
      lastUpdate: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      }
    })

  } catch (error) {
    console.error('❌ Instagram API genel hatası:', error)
    return NextResponse.json({ 
      error: 'Instagram API bağlantı hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}