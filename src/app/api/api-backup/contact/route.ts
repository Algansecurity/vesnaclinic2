import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactSchema, rateLimit, getClientIP, sanitizeInput, logSecurityEvent } from '@/lib/utils'
import nodemailer from 'nodemailer'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

// Save message to file for admin dashboard
function saveMessage(messageData: any) {
  try {
    const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json')
    const dataDir = path.join(process.cwd(), 'data')
    
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    let messages = []
    if (fs.existsSync(messagesFilePath)) {
      const data = fs.readFileSync(messagesFilePath, 'utf8')
      messages = JSON.parse(data)
    }
    
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      timestamp: new Date().toISOString(),
      isRead: false
    }
    
    messages.push(newMessage)
    
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2))
    console.log('✅ Message saved to admin dashboard')
    return true
  } catch (error) {
    console.error('❌ Error saving message:', error)
    return false
  }
}

// E-mail transporter yapılandırması
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: 'vesnahairclinic@gmail.com',
    pass: 'Onder1998'
  },
  tls: {
    rejectUnauthorized: false
  }
})

// E-mail gönderme fonksiyonu
async function sendNotificationEmail(contactData: any) {
  const { name, email, phone, message } = contactData
  
  const mailOptions = {
    from: 'vesnahairclinic@gmail.com',
    to: 'vesnahairclinic@gmail.com',
    subject: `🆕 Yeni İletişim Formu Mesajı - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); border-radius: 15px;">
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 28px; font-weight: bold;">
              🏥 Vesna Hair Clinic
            </h1>
            <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 14px;">
              Yeni İletişim Formu Mesajı
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
              👤 Müşteri Bilgileri
            </h2>
            
            <div style="display: grid; gap: 15px;">
              <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <strong style="color: #374151; min-width: 120px;">👤 Ad Soyad:</strong>
                <span style="color: #1f2937; font-size: 16px;">${name}</span>
              </div>
              
              <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px; border-left: 4px solid #10b981;">
                <strong style="color: #374151; min-width: 120px;">📧 E-posta:</strong>
                <span style="color: #1f2937; font-size: 16px;">${email}</span>
              </div>
              
              <div style="display: flex; align-items: center; padding: 10px; background: white; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <strong style="color: #374151; min-width: 120px;">📞 Telefon:</strong>
                <span style="color: #1f2937; font-size: 16px;">${phone}</span>
              </div>
            </div>
          </div>
          
          <div style="background: #fef3c7; padding: 25px; border-radius: 10px; border-left: 5px solid #f59e0b;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
              💬 Mesaj İçeriği
            </h3>
            <p style="color: #451a03; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap; background: white; padding: 15px; border-radius: 8px;">
              ${message}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 10px;">
            <p style="color: #64748b; margin: 0 0 15px 0; font-size: 14px;">
              📅 Gönderim Zamanı: ${new Date().toLocaleString('tr-TR')}
            </p>
            
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
              <a href="mailto:${email}?subject=Vesna Hair Clinic Yanıt&body=Merhaba ${name},%0D%0A%0D%0AMesajınız için teşekkürler." 
                 style="background: linear-gradient(45deg, #10b981, #059669); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                📧 Hemen Yanıtla
              </a>
              
              <a href="tel:${phone}" 
                 style="background: linear-gradient(45deg, #3b82f6, #1d4ed8); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                📞 Ara
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              Bu mesaj Vesna Hair Clinic web sitesindeki iletişim formu aracılığıyla gönderilmiştir.
            </p>
          </div>
        </div>
      </div>
    `
  }
  
  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ E-mail başarıyla gönderildi:', email)
    return true
  } catch (error) {
    console.error('❌ E-mail gönderme hatası:', error)
    return false
  }
}

// Telegram bot fonksiyonu - Çoklu chat ID desteği
async function sendTelegramNotification(contactData: any) {
  const { name, email, phone, message } = contactData
  
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const TELEGRAM_CHAT_ID_1 = process.env.TELEGRAM_CHAT_ID_1 || process.env.TELEGRAM_CHAT_ID // 0552 495 34 76
  const TELEGRAM_CHAT_ID_2 = process.env.TELEGRAM_CHAT_ID_2 // 0532 666 29 80
  const TELEGRAM_CHAT_ID_3 = "1381793841" // Önder Dağhan hesabı
  
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID_1) {
    console.log('⚠️ Telegram bot ayarları eksik - bildirim gönderilemiyor')
    return false
  }

  const telegramMessage = `
🏥 *Vesna Hair Clinic* - Yeni İletişim Formu

👤 *Ad Soyad:* ${name}
📧 *E-posta:* ${email}
📞 *Telefon:* ${phone}

💬 *Mesaj:*
${message}

📅 *Tarih:* ${new Date().toLocaleString('tr-TR')}

📱 *Hızlı Arama:* [${phone}](tel:${phone})
🔗 [Admin Paneli](http://localhost:3000/admin/dashboard)

📞 *Klinik Telefonu:*
• +90 532 666 29 80
  `

  const chatIds = [TELEGRAM_CHAT_ID_1]
  if (TELEGRAM_CHAT_ID_2) {
    chatIds.push(TELEGRAM_CHAT_ID_2)
  }
  // Önder Dağhan hesabını da ekle
  chatIds.push(TELEGRAM_CHAT_ID_3)

  let successCount = 0
  
  for (const chatId of chatIds) {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        }
      )
      
      console.log(`✅ Telegram bildirimi gönderildi (Chat ID: ${chatId})`)
      successCount++
    } catch (error) {
      console.error(`❌ Telegram bildirim hatası (Chat ID: ${chatId}):`, error)
    }
  }

  if (successCount > 0) {
    console.log(`✅ ${successCount}/${chatIds.length} Telegram bildirimi başarıyla gönderildi`)
    return true
  } else {
    console.error('❌ Hiçbir Telegram bildirimi gönderilemedi')
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)
    
    // Apply rate limiting (5 requests per minute)
    if (!rateLimit(clientIP, 5, 60000)) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { ip: clientIP })
      return NextResponse.json(
        { error: 'Çok fazla istek gönderiyorsunuz. Lütfen bir dakika bekleyin.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate input with Zod schema
    const validationResult = contactSchema.safeParse(body)
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ')
      return NextResponse.json(
        { error: `Geçersiz veri: ${errors}` },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = validationResult.data

    // Sanitize inputs to prevent XSS
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message)
    }

    // Check for duplicate submissions (same email within 5 minutes)
    const recentSubmission = await prisma.contact.findFirst({
      where: {
        email: sanitizedData.email,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
        }
      }
    })

    if (recentSubmission) {
      return NextResponse.json(
        { error: 'Bu email adresinden kısa süre önce bir mesaj gönderildi. Lütfen bekleyin.' },
        { status: 429 }
      )
    }

    // Save to database with additional metadata
    const contact = await prisma.contact.create({
      data: {
        ...sanitizedData,
        createdAt: new Date()
      }
    })

    // Save message for admin dashboard
    saveMessage(sanitizedData)

    // Log successful submission
    console.log(`[CONTACT] New submission from ${sanitizedData.email} (IP: ${clientIP})`)

    // Send email notification
    sendNotificationEmail(sanitizedData)
      .then(() => {
        console.log('✅ E-mail başarıyla gönderildi: vesnahairclinic@gmail.com')
      })
      .catch((emailError) => {
        console.error('❌ E-mail gönderme hatası:', emailError)
        // Continue even if email fails - don't block the form submission
      })

    // Send Telegram notification
    sendTelegramNotification(sanitizedData)
      .then(() => {
        console.log('✅ Telegram bildirimi başarıyla gönderildi')
      })
      .catch((telegramError) => {
        console.error('❌ Telegram bildirim hatası:', telegramError)
        // Continue even if Telegram fails - don't block the form submission
      })

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla kaydedildi',
      data: {
        id: contact.id,
        createdAt: contact.createdAt
      }
    })
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Log error for monitoring
    logSecurityEvent('CONTACT_FORM_ERROR', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if this is an authenticated request
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to last 100 contacts for performance
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true,
        isRead: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
} 