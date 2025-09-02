import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json')

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function readMessages() {
  try {
    ensureDataDirectory()
    if (fs.existsSync(messagesFilePath)) {
      const data = fs.readFileSync(messagesFilePath, 'utf8')
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error reading messages:', error)
    return []
  }
}

function writeMessages(messages: any[]) {
  try {
    ensureDataDirectory()
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2))
    return true
  } catch (error) {
    console.error('Error writing messages:', error)
    return false
  }
}

// GET - Retrieve all messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') // 'all', 'read', 'unread'
    
    let messages = readMessages()
    
    // Filter by status
    if (status === 'read') {
      messages = messages.filter((msg: any) => msg.isRead)
    } else if (status === 'unread') {
      messages = messages.filter((msg: any) => !msg.isRead)
    }
    
    // Sort by timestamp (newest first)
    messages.sort((a: any, b: any) => {
      const aTime = new Date(a.timestamp || a.createdAt || 0).getTime()
      const bTime = new Date(b.timestamp || b.createdAt || 0).getTime()
      return bTime - aTime
    })
    
    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedMessages = messages.slice(startIndex, endIndex)
    
    return NextResponse.json({
      success: true,
      data: {
        messages: paginatedMessages,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(messages.length / limit),
          totalMessages: messages.length,
          hasNext: endIndex < messages.length,
          hasPrev: page > 1
        }
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Mesajlar alınırken hata oluştu'
    }, { status: 500 })
  }
}

// PUT - Update message status (mark as read/unread)
export async function PUT(request: NextRequest) {
  try {
    const { messageId, isRead } = await request.json()
    
    if (!messageId) {
      return NextResponse.json({
        success: false,
        error: 'Mesaj ID gerekli'
      }, { status: 400 })
    }
    
    const messages = readMessages()
    const messageIndex = messages.findIndex((msg: any) => msg.id === messageId)
    
    if (messageIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Mesaj bulunamadı'
      }, { status: 404 })
    }
    
    messages[messageIndex].isRead = isRead
    messages[messageIndex].readAt = isRead ? new Date().toISOString() : null
    
    const success = writeMessages(messages)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Mesaj durumu güncellendi'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Mesaj güncellenirken hata oluştu'
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

// DELETE - Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')
    
    if (!messageId) {
      return NextResponse.json({
        success: false,
        error: 'Mesaj ID gerekli'
      }, { status: 400 })
    }
    
    const messages = readMessages()
    const filteredMessages = messages.filter((msg: any) => msg.id !== messageId)
    
    if (messages.length === filteredMessages.length) {
      return NextResponse.json({
        success: false,
        error: 'Mesaj bulunamadı'
      }, { status: 404 })
    }
    
    const success = writeMessages(filteredMessages)
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Mesaj silindi'
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'Mesaj silinirken hata oluştu'
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