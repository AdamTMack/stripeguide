import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative inline-flex cursor-pointer items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-purple focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        variant === 'primary' &&
          'bg-stripe-purple text-white shadow-lg shadow-stripe-purple/25 hover:bg-stripe-purple/90',
        variant === 'secondary' &&
          'border border-white/10 bg-white/5 text-white hover:bg-white/10',
        variant === 'ghost' && 'text-white/60 hover:text-white',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
