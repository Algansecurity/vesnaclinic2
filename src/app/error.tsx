'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bir Hata Oluştu
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Beklenmedik bir sorun yaşandı. Lütfen sayfayı yenilemeyi deneyin.
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={reset}
            variant="gradient"
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Tekrar Dene
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            Ana Sayfaya Dön
          </Button>
        </div>
        
        {error.digest && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hata Kodu: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 