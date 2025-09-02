'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { memo } from 'react'
import { ChevronRight } from 'lucide-react'

// WhatsApp SVG Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
)

const Footer = memo(function Footer() {
  const { t } = useLanguage()

  const navigationKeys = ['nav.home', 'nav.about', 'nav.services', 'nav.beforeAfter', 'nav.contact']
  const navigationHrefs = ['/', '/hakkimizda', '/hizmetler', '/once-sonra', '/iletisim']

  return (
    <footer className="relative bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-clinic-primary/10 to-clinic-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-clinic-secondary/10 to-clinic-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <img
                    src="/images/logo2.png"
                    alt="Vesna Hair Clinic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">VESNA HAIR CLINIC</h3>
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/vesnaclinic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-clinic-gold transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/905431767634"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-clinic-gold transition-colors duration-300"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {navigationKeys.map((key, index) => (
                <li key={key}>
                  <Link
                    href={navigationHrefs[index]}
                    className="text-gray-400 hover:text-clinic-gold transition-colors duration-300 text-sm flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificates - Sağlık & TURSAB */}
          <div className="flex flex-col items-start justify-start -ml-8 sm:-ml-12 lg:-ml-16">
            <div className="flex flex-row items-start justify-start gap-4 sm:gap-6">
              {/* TURSAB Sertifikası - Sol tarafta */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/tursab.png"
                  alt="TURSAB Sertifikası"
                  className="w-full h-full object-contain filter brightness-95 hover:brightness-110 transition-all duration-300"
                />
              </div>
              
              {/* Sağlık Bakanlığı Sertifikası - Sağ tarafta */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 hover:scale-105 transition-transform duration-300">
                <img
                  src="/saglik.png"
                  alt="Sağlık Bakanlığı Sertifikası"
                  className="w-full h-full object-contain filter brightness-95 hover:brightness-110 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+905431767634"
                  className="text-gray-400 hover:text-clinic-gold transition-colors duration-300 text-sm flex items-center group"
                >
                  <Phone className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  +90 543 176 7634
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vesnahairclinic.com"
                  className="text-gray-400 hover:text-clinic-gold transition-colors duration-300 text-sm flex items-center group"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  info@vesnahairclinic.com
                </a>
              </li>
              <li className="flex items-start group">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-gray-400 group-hover:text-clinic-gold transition-colors duration-300" />
                <div className="text-gray-400 text-sm">
                  <div>İstanbul/Ataşehir</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Vesna Hair Clinic. {t('footer.rights')}
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
})

export default Footer 