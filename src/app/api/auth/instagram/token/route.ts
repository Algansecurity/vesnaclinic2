import { NextRequest, NextResponse } from 'next/server'

// Instagram API Configuration
const INSTAGRAM_APP_ID = '612009118618172'
const INSTAGRAM_APP_SECRET = '5e0b7588acd1b0667af36465c1a3d7a8'
const REDIRECT_URI = 'https://vesnahairclinic.com/auth/instagram/callback'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 }
      )
    }

    console.log('🔑 Authorization code alındı:', code.substring(0, 20) + '...')

    // Step 1: Short-lived access token al
    const tokenUrl = 'https://api.instagram.com/oauth/access_token'
    const tokenData = new FormData()
    tokenData.append('client_id', INSTAGRAM_APP_ID)
    tokenData.append('client_secret', INSTAGRAM_APP_SECRET)
    tokenData.append('grant_type', 'authorization_code')
    tokenData.append('redirect_uri', REDIRECT_URI)
    tokenData.append('code', code)

    console.log('📡 Short-lived token isteniyor...')

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      body: tokenData,
    })

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text()
      console.error('❌ Token error:', tokenError)
      return NextResponse.json(
        { error: `Token request failed: ${tokenError}` },
        { status: 400 }
      )
    }

    const tokenResult = await tokenResponse.json()
    console.log('✅ Short-lived token alındı:', tokenResult.access_token?.substring(0, 30) + '...')

    // Step 2: Long-lived token cevir (60 gun gecerli)
    const longLivedUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_APP_SECRET}&access_token=${tokenResult.access_token}`

    console.log('🔄 Long-lived token cevriliyor...')

    const longLivedResponse = await fetch(longLivedUrl, {
      method: 'GET',
    })

    if (!longLivedResponse.ok) {
      const longLivedError = await longLivedResponse.text()
      console.error('❌ Long-lived token error:', longLivedError)
      // Short-lived token'ı döndür, en azından geçici çalışır
      return NextResponse.json({
        access_token: tokenResult.access_token,
        user_id: tokenResult.user_id,
        expires_in: 3600, // 1 saat
        token_type: 'short-lived'
      })
    }

    const longLivedResult = await longLivedResponse.json()
    console.log('🎉 Long-lived token başarıyla alındı!')
    console.log('⏰ Expires in:', longLivedResult.expires_in, 'seconds')

    // Token environment dosyasina kaydetmek icin bilgilendir
    console.log('💾 Bu token .env dosyasina kaydedin:')
    console.log('INSTAGRAM_ACCESS_TOKEN=' + longLivedResult.access_token)

    return NextResponse.json({
      access_token: longLivedResult.access_token,
      user_id: tokenResult.user_id,
      expires_in: longLivedResult.expires_in,
      token_type: 'long-lived',
      success: true,
      message: 'Token başarıyla alındı ve long-lived token\'a çevrildi!',
      instructions: 'Bu token\'ı .env dosyasına INSTAGRAM_ACCESS_TOKEN olarak kaydedin'
    })

  } catch (error) {
    console.error('💥 Token alma hatası:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}