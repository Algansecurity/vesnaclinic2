import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export interface AuthUser {
  id: string
  email: string
  role: string
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get('admin-token')?.value
  return token || null
}

export function authenticateAdmin(request: NextRequest): AuthUser | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  
  return verifyToken(token)
}

export function requireAuth(request: NextRequest): { user: AuthUser | null; error: string | null } {
  const user = authenticateAdmin(request)
  
  if (!user) {
    return { user: null, error: 'Yetkisiz erişim' }
  }
  
  return { user, error: null }
} 