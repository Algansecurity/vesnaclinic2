import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'
    
    const variants = {
      primary: 'btn-primary focus:ring-clinic-primary',
      secondary: 'btn-secondary focus:ring-white',
      outline: 'border-2 border-clinic-primary text-clinic-primary hover:bg-clinic-primary hover:text-gray-900 focus:ring-clinic-primary backdrop-blur-md',
      ghost: 'text-clinic-primary hover:bg-clinic-primary/10 focus:ring-clinic-primary',
      gradient: 'bg-gradient-to-r from-clinic-gold to-clinic-primary hover:from-clinic-primary hover:to-clinic-secondary text-black font-bold shadow-xl focus:ring-clinic-primary'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    }
    
    const widthClass = fullWidth ? 'w-full' : ''
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          className
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3">
          </div>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps } 