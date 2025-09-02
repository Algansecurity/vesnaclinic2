import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const token = request.cookies.get('admin-token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim - Token bulunamadı' },
        { status: 401 }
      )
    }

    try {
      // Verify JWT token
      const secretKey = 'vesna-hair-clinic-super-secret-key-2025'
      const decoded = jwt.verify(token, secretKey) as any
      
      if (!decoded || !decoded.email || !decoded.role) {
        return NextResponse.json(
          { error: 'Geçersiz token' },
          { status: 401 }
        )
      }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError)
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      )
    }

    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true,
        createdAt: true
      }
    })

    // Format contacts for admin dashboard
    const formattedContacts = contacts.map(contact => ({
      id: contact.id.toString(),
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      createdAt: contact.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      isRead: false // Default to unread, can be enhanced later
    }))

    return NextResponse.json({
      success: true,
      data: formattedContacts
    })
  } catch (error) {
    console.error('Admin contacts error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check admin authentication
    const token = request.cookies.get('admin-token')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim - Token bulunamadı' },
        { status: 401 }
      )
    }

    try {
      // Verify JWT token
      const secretKey = 'vesna-hair-clinic-super-secret-key-2025'
      const decoded = jwt.verify(token, secretKey) as any
      
      if (!decoded || !decoded.email || !decoded.role) {
        return NextResponse.json(
          { error: 'Geçersiz token' },
          { status: 401 }
        )
      }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError)
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID gerekli' },
        { status: 400 }
      )
    }

    await prisma.contact.delete({
      where: { id: id }
    })

    return NextResponse.json({
      success: true,
      message: 'Mesaj başarıyla silindi'
    })
  } catch (error) {
    console.error('Delete contact error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 