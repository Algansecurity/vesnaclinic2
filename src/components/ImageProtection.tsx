'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ImageProtection() {
  const { t } = useLanguage()

  useEffect(() => {
    // F12 ve Developer Tools engelleme (Desktop için)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Mobil cihazlarda klavye kontrollerini esnek tut
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      // F12 engelleme (tüm cihazlarda)
      if (e.keyCode === 123) {
        e.preventDefault()
        if (!isMobile && !isSmallScreen) {
          showWarning(t('security.devToolsBlocked'))
        }
        return false
      }
      
      // Mobilde daha az kısıtlayıcı ol
      if (isMobile || isSmallScreen) {
        // Sadece kritik kontrolleri koru
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
          e.preventDefault()
          return false
        }
        return
      }
      
      // Desktop için tam koruma
      // Ctrl+Shift+I engelleme
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        showWarning(t('security.devToolsBlocked'))
        return false
      }
      
      // Ctrl+Shift+J engelleme (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        showWarning(t('security.consoleBlocked'))
        return false
      }
      
      // Ctrl+U engelleme (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        showWarning(t('security.viewSourceBlocked'))
        return false
      }
      
      // Ctrl+S engelleme (Save)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        showWarning(t('security.saveBlocked'))
        return false
      }
      
      // Ctrl+A engelleme (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault()
        showWarning(t('security.selectAllBlocked'))
        return false
      }
      
      // Ctrl+C engelleme (Copy)
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault()
        showWarning(t('security.copyBlocked'))
        return false
      }
      
      // Ctrl+V engelleme (Paste)
      if (e.ctrlKey && e.keyCode === 86) {
        e.preventDefault()
        return false
      }
      
      // Ctrl+X engelleme (Cut)
      if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault()
        showWarning(t('security.cutBlocked'))
        return false
      }
    }

    // Sağ tık menüsü engelleme
    const handleContextMenu = (e: MouseEvent) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      e.preventDefault()
      
      // Mobilde uyarı gösterme (daha az rahatsız edici)
      if (!isMobile && !isSmallScreen) {
        showWarning(t('security.contextMenuBlocked'))
      }
      
      return false
    }

    // Drag & Drop engelleme
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      showWarning(t('security.dragDropBlocked'))
      return false
    }

    // Metin seçimi engelleme (sadece desktop için)
    const handleSelectStart = (e: Event) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      // Mobilde metin seçimine izin ver (form alanları vb. için)
      if (isMobile || isSmallScreen) {
        return true
      }
      
      // Desktop'ta engelle
      e.preventDefault()
      return false
    }

    // Developer Tools açıldığında algılama (sadece desktop için)
    const detectDevTools = () => {
      // Mobil cihaz kontrolü
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth <= 768
      
      // Mobil veya küçük ekranlarda bu kontrolü devre dışı bırak
      if (isMobile || isSmallScreen) {
        return
      }
      
      const threshold = 160
      const interval = setInterval(() => {
        // Tekrar mobil kontrolü (ekran boyutu değişebilir)
        if (window.innerWidth <= 768) {
          clearInterval(interval)
          return
        }
        
        const widthThreshold = window.outerWidth - window.innerWidth > threshold
        const heightThreshold = window.outerHeight - window.innerHeight > threshold
        
        if (widthThreshold || heightThreshold) {
          showWarning(t('security.devToolsDetected'))
          // Sayfayı yeniden yönlendirme (isteğe bağlı)
          // window.location.reload()
        }
      }, 500)
      
      // Window resize olduğunda interval'i temizle ve yeniden başlat
      const handleResize = () => {
        clearInterval(interval)
        // Kısa bir gecikme sonrası yeniden başlat
        setTimeout(detectDevTools, 1000)
      }
      
      window.addEventListener('resize', handleResize, { once: true })
    }

    // Konsol mesajları
    const consoleWarning = () => {
      console.clear()
      console.log(`%c${t('security.consoleStop')}`, 'color: red; font-size: 50px; font-weight: bold;')
      console.log(`%c${t('security.consoleFeature')}`, 'color: red; font-size: 16px;')
      console.log(`%c${t('security.consoleScam')}`, 'color: red; font-size: 16px;')
      console.log(`%c${t('security.consoleClinic')}`, 'color: #D4AF37; font-size: 18px; font-weight: bold;')
      
      // Konsol komutlarını engelleme
      setTimeout(() => {
        console.clear()
      }, 1000)
    }

    // Uyarı mesajı gösterme
    const showWarning = (message: string) => {
      // Toast benzeri bildirim oluştur
      const notification = document.createElement('div')
      notification.textContent = message
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a24);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
      `
      
      // Animasyon CSS'i ekle
      if (!document.querySelector('#protection-styles')) {
        const style = document.createElement('style')
        style.id = 'protection-styles'
        style.textContent = `
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `
        document.head.appendChild(style)
      }
      
      document.body.appendChild(notification)
      
      // 3 saniye sonra kaldır
      setTimeout(() => {
        notification.remove()
      }, 3000)
    }

    // Event listener'ları ekle
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('selectstart', handleSelectStart)

    // Başlangıç fonksiyonları
    detectDevTools()
    consoleWarning()

    // Periyodik konsol temizleme
    const consoleInterval = setInterval(consoleWarning, 3000)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('selectstart', handleSelectStart)
      clearInterval(consoleInterval)
    }
  }, [t])

  return null
} 