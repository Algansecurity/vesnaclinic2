'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProtectedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  watermark?: string
  showOverlay?: boolean
}

export default function ProtectedImage({ 
  src, 
  alt, 
  className = '',
  width = 400,
  height = 300,
  fill = false,
  sizes,
  watermark = 'Vesna Hair Clinic',
  showOverlay = true
}: ProtectedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div 
      className={`relative image-container ${className}`}
      style={fill ? { width: '100%', height: '100%' } : { width, height }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Ana resim */}
      <Image
        src={src}
        alt={alt}
        {...(fill 
          ? { fill: true, sizes } 
          : { width, height }
        )}
        className="object-cover rounded-lg"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
        draggable={false}
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      />

      {/* Watermarks - 5 adet text + filigran resmi */}
      {isLoaded && (
        <>
          {/* Filigran resmi - Tüm fotoğrafı kaplasın */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/images/filigran.png"
              alt="Filigran"
              width={1536}
              height={1536}
              className="w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] xl:w-[40rem] xl:h-[40rem] opacity-50 object-contain select-none"
              draggable={false}
              style={{
                userSelect: 'none',
                pointerEvents: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none'
              }}
            />
          </div>

          {/* Sol alt köşe - Ana watermark */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 pointer-events-none">
            <div 
              className="text-white/40 font-bold text-[8px] sm:text-[10px] transform rotate-12 select-none"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: '1.2',
                fontWeight: '700'
              }}
            >
              {watermark}
            </div>
          </div>

          {/* Sağ üst köşe - İkinci watermark */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 pointer-events-none">
            <div 
              className="text-white/40 font-bold text-[8px] sm:text-[9px] transform -rotate-12 select-none"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: '1.2',
                fontWeight: '700'
              }}
            >
              {watermark}
            </div>
          </div>

          {/* Sol üst köşe - Üçüncü watermark */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 pointer-events-none">
            <div 
              className="text-white/40 font-bold text-[8px] sm:text-[9px] transform rotate-45 select-none"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: '1.2',
                fontWeight: '700'
              }}
            >
              {watermark}
            </div>
          </div>

          {/* Sağ alt köşe - Dördüncü watermark */}
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 pointer-events-none">
            <div 
              className="text-white/40 font-bold text-[8px] sm:text-[9px] transform -rotate-45 select-none"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: '1.2',
                fontWeight: '700'
              }}
            >
              {watermark}
            </div>
          </div>

          {/* Merkez - Beşinci watermark */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div 
              className="text-white/40 font-bold text-[8px] sm:text-[9px] transform rotate-0 select-none"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: '1.2',
                fontWeight: '700'
              }}
            >
              {watermark}
            </div>
          </div>
        </>
      )}

      {/* Koruma overlay'i */}
      {showOverlay && (
        <div 
          className="absolute inset-0 z-10 bg-transparent"
          style={{
            cursor: 'default',
            userSelect: 'none',
            pointerEvents: 'auto'
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        />
      )}

      {/* Gradient overlay (estetik) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-lg" />

      {/* Yükleme durumu */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
          <div className="w-8 h-8 border-2 border-clinic-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
} 