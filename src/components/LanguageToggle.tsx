'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center rounded-full overflow-hidden bg-black/80 border border-black/80 shadow-inner">
      <button
        onClick={() => setLanguage('tr')}
        className={`px-5 py-2 text-base font-bold transition-all duration-200 focus:outline-none ${
          language === 'tr'
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-sm'
            : 'bg-transparent text-white hover:bg-white/10'
        }`}
        style={{ borderRadius: 0 }}
      >
        TR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-5 py-2 text-base font-bold transition-all duration-200 focus:outline-none ${
          language === 'en'
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-sm'
            : 'bg-transparent text-white hover:bg-white/10'
        }`}
        style={{ borderRadius: 0 }}
      >
        ENG
      </button>
    </div>
  )
} 