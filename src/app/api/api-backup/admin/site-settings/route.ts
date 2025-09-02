import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst()

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.siteSettings.create({
        data: {
          siteName: 'Vesna Hair Clinic',
          tagline: 'Hayalinizdeki saçlara birlikte ulaşalım',
          description: 'Profesyonel saç ekimi ve saç bakım hizmetleri',
          primaryColor: '#2563eb',
          secondaryColor: '#7c3aed'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Get site settings error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    // Get or create settings
    let settings = await prisma.siteSettings.findFirst()

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data
      })
    } else {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Site ayarları başarıyla güncellendi',
      data: settings
    })
  } catch (error) {
    console.error('Update site settings error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 