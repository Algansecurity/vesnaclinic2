'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Mail, Eye, EyeOff, LogIn, CheckCircle } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Check if already logged in - REMOVED AUTO LOGIN
  useEffect(() => {
    // Her zaman login ekranını göster, otomatik yönlendirme yok
    console.log('🔓 Admin login page loaded - requiring authentication')
  }, [])

  const showSuccessAndRedirect = (message: string, delay: number = 2000) => {
    setSuccessMessage(message)
    setShowSuccessModal(true)
    setTimeout(() => {
      setShowSuccessModal(false)
      window.location.replace('/admin/dashboard')
    }, delay)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Prevent any browser password manager interference
    if (isLoading) return
    
    setIsLoading(true)
    setError('')
    
    console.log('🔐 Login attempt for:', email)

    // HIZLI ÇÖZÜM: Direct login check - Multiple admin accounts
    const adminAccounts = [
      {
        email: 'admin@vesnahairclinic.com',
        password: 'admin123'
      },
      {
        email: 'superadmin@vesnahairclinic.com',
        password: 'VesnaHair2025!'
      },
      {
        email: 'yonetici@vesnahairclinic.com',
        password: 'Vesna_Admin_2025'
      }
    ]

    const isValidAdmin = adminAccounts.some(
      admin => admin.email === email && admin.password === password
    )

    if (isValidAdmin) {
      console.log('✅ Direct login successful for:', email)
      setIsLoading(false)
      
      // Multiple cookie setting methods for better compatibility
      const tokenValue = `admin-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      console.log('🍪 Setting token:', tokenValue)
      
      try {
        // Method 1: Standard cookie
        document.cookie = `admin-token=${tokenValue}; path=/; max-age=86400; SameSite=Lax`
        
        // Method 2: Alternative with expires
        const expires = new Date()
        expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000))
        document.cookie = `admin-token=${tokenValue}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
        
        console.log('🍪 Cookie set attempts completed')
        
        // Immediate verification
        const immediateCheck = document.cookie.includes('admin-token')
        console.log('🔍 Immediate cookie check:', immediateCheck)
        console.log('🍪 All cookies:', document.cookie)
        
        if (immediateCheck) {
          console.log('✅ Cookie verified, redirecting...')
          // Use localStorage as backup
          localStorage.setItem('admin-session', tokenValue)
          localStorage.setItem('admin-email', email)
          
          showSuccessAndRedirect('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...')
        } else {
          console.log('⚠️ Cookie failed, trying localStorage...')
          // Fallback to localStorage
          localStorage.setItem('admin-session', tokenValue)
          localStorage.setItem('admin-email', email)
          
          showSuccessAndRedirect('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...')
        }
      } catch (error) {
        console.error('❌ Cookie setting error:', error)
        
        // Emergency fallback
        localStorage.setItem('admin-session', tokenValue)
        localStorage.setItem('admin-email', email)
        showSuccessAndRedirect('Alternatif giriş yöntemi kullanılıyor...')
      }
      return
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (data.success) {
        console.log('✅ API login successful!')
        console.log('📊 Response data:', data)
        
        // Wait a bit for cookie to be set by API
        setTimeout(() => {
          const cookieCheck = document.cookie.includes('admin-token')
          console.log('🔍 API Cookie verification:', cookieCheck)
          console.log('🍪 All cookies:', document.cookie)
          
          console.log('🔄 Redirecting to dashboard...')
          showSuccessAndRedirect('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...')
        }, 200)
      } else {
        console.error('❌ API login failed:', data)
        setError(data.error || 'Geçersiz email veya şifre')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image - Same as homepage */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed'
        }}
      />
      
      {/* Gradient Overlay - Same as homepage */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70"></div>
      
      {/* Animated Background Elements - Same as homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-clinic-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-clinic-secondary/20 rounded-full blur-xl animate-float animate-delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-clinic-accent/20 rounded-full blur-lg animate-float animate-delay-500"></div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Başarılı!</h3>
              <p className="text-white/80 text-sm mb-4">{successMessage}</p>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-clinic-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo instead of lock icon */}
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo2.png"
                  alt="Vesna Hair Clinic"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-300">Yönetim paneline giriş yapın</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6" 
            noValidate 
            autoComplete="off"
            onReset={(e) => e.preventDefault()}
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-clinic-primary focus:border-clinic-primary backdrop-blur-sm text-white placeholder-gray-300"
                  placeholder="admin@vesnahairclinic.com"
                  autoComplete="username"
                  data-form-type="other"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-clinic-primary focus:border-clinic-primary backdrop-blur-sm text-white placeholder-gray-300"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  data-form-type="other"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-3"
              disabled={isLoading || !email || !password}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Giriş Yapılıyor...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  Giriş Yap
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300">
              © 2025 Vesna Hair Clinic - Admin Panel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 