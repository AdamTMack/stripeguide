import { motion } from 'framer-motion'
import type { Emotion } from '../../engine/types'
import { cn } from '../../lib/cn'

const emotionColors: Record<Emotion, string> = {
  neutral: 'from-stripe-purple to-stripe-cyan',
  excited: 'from-stripe-purple to-stripe-pink',
  thinking: 'from-stripe-cyan to-stripe-blue',
  celebrating: 'from-stripe-yellow to-stripe-orange',
  warning: 'from-stripe-orange to-stripe-pink',
  winking: 'from-stripe-green to-stripe-cyan',
}

const emotionEmojis: Record<Emotion, string> = {
  neutral: '',
  excited: '!',
  thinking: '?',
  celebrating: '*',
  warning: '!',
  winking: '~',
}

interface GlowOrbProps {
  emotion?: Emotion
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function GlowOrb({ emotion = 'neutral', size = 'md', className }: GlowOrbProps) {
  const sizeMap = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-16 w-16' }
  const glowSize = { sm: 'h-12 w-12', md: 'h-20 w-20', lg: 'h-28 w-28' }

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      {/* Outer glow */}
      <motion.div
        className={cn(
          'absolute rounded-full bg-gradient-to-br opacity-20 blur-xl',
          glowSize[size],
          emotionColors[emotion]
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Core orb */}
      <motion.div
        className={cn(
          'relative rounded-full bg-gradient-to-br shadow-lg',
          sizeMap[size],
          emotionColors[emotion]
        )}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {emotionEmojis[emotion] && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/80">
            {emotionEmojis[emotion]}
          </span>
        )}
      </motion.div>
    </div>
  )
}
