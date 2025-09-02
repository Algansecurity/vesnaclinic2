import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('=== ADMIN LOGIN ATTEMPT ===')
    
    const body = await request.json()
    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email ve şifre zorunludur' },
        { status: 400 }
      )
    }

    // HIZLI ÇÖZÜM: Direct login check - Multiple admin accounts
    const adminAccounts = [
      {
        email: 'admin@vesnaclinic.com',
        password: 'admin123',
        name: 'Ana Admin',
        id: 'admin-1'
      },
      {
        email: 'superadmin@vesnahairclinic.com',
        password: 'VesnaHair2025!',
        name: 'Süper Admin',
        id: 'admin-2'
      },
      {
        email: 'yonetici@vesnahairclinic.com',
        password: 'Vesna_Admin_2025',
        name: 'Yönetici',
        id: 'admin-3'
      }
    ]

    const matchingAdmin = adminAccounts.find(
      admin => admin.email === email && admin.password === password
    )

    if (matchingAdmin) {
      console.log('DIRECT LOGIN SUCCESS - Bypassing database for:', matchingAdmin.email)
      
      const tokenPayload = {
        id: matchingAdmin.id,
        email: matchingAdmin.email,
        role: 'ADMIN',
        loginTime: Date.now()
      }

      const token = jwt.sign(
        tokenPayload,
        'vesna-hair-clinic-super-secret-key-2025',
        { expiresIn: '24h' }
      )

      const response = NextResponse.json({
        success: true,
        data: {
          id: matchingAdmin.id,
          email: matchingAdmin.email,
          name: matchingAdmin.name,
          role: 'ADMIN'
        },
        message: 'Başarıyla giriş yapıldı'
      })

      response.cookies.set('admin-token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      })

      return response
    }

    // Check if admin table exists and create default admin if needed
    try {
      const adminCount = await prisma.admin.count()
      console.log('Admin count:', adminCount)
      
      if (adminCount === 0) {
        console.log('No admin found, creating default admin...')
        const hashedPassword = await bcrypt.hash('admin123', 10)
        const newAdmin = await prisma.admin.create({
          data: {
            email: 'admin@vesnaclinic.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'ADMIN'
          }
        })
        console.log('Default admin created:', newAdmin.email)
      }
    } catch (dbError) {
      console.error('Database error while checking/creating admin:', dbError)
      return NextResponse.json(
        { error: 'Veritabanı hatası' },
        { status: 500 }
      )
    }

    // Find admin user
    let admin
    try {
      admin = await prisma.admin.findUnique({
        where: { email: email.toLowerCase().trim() }
      })
      console.log('Admin found:', admin ? 'YES' : 'NO')
    } catch (dbError) {
      console.error('Error finding admin:', dbError)
      return NextResponse.json(
        { error: 'Kullanıcı arama hatası' },
        { status: 500 }
      )
    }

    if (!admin) {
      console.log('Admin not found for email:', email)
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      )
    }

    // Check password
    let isPasswordValid = false
    try {
      isPasswordValid = await bcrypt.compare(password, admin.password)
      console.log('Password validation result:', isPasswordValid)
    } catch (bcryptError) {
      console.error('Password comparison error:', bcryptError)
      return NextResponse.json(
        { error: 'Şifre doğrulama hatası' },
        { status: 500 }
      )
    }

    if (!isPasswordValid) {
      console.log('Invalid password for admin:', email)
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const tokenPayload = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      loginTime: Date.now()
    }

    let token
    try {
      token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
        { 
          expiresIn: '24h',
          issuer: 'vesna-clinic',
          audience: 'admin-panel'
        }
      )
      console.log('JWT token generated successfully')
    } catch (jwtError) {
      console.error('JWT generation error:', jwtError)
      return NextResponse.json(
        { error: 'Token oluşturma hatası' },
        { status: 500 }
      )
    }

    console.log('Login successful for admin:', email)

    // Set secure cookie and return response
    const response = NextResponse.json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      message: 'Başarıyla giriş yapıldı'
    })

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    })

    return response
  } catch (error) {
    console.error('=== CRITICAL LOGIN ERROR ===')
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack',
      name: error instanceof Error ? error.name : 'Unknown',
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { error: 'Sistem hatası oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  } finally {
    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.error('Database disconnect error:', disconnectError)
    }
  }
} 