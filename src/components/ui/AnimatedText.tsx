import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface AnimatedTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  gradient?: boolean
}

export default function AnimatedText({
  children,
  className,
  as: Tag = 'p',
  delay = 0,
  gradient,
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag className={cn(gradient && 'text-gradient', className)}>
        {children}
      </Tag>
    </motion.div>
  )
}
