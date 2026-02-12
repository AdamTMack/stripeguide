import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface ChoiceButtonProps {
  label: string
  emoji?: string
  onClick: () => void
  index?: number
  className?: string
}

export default function ChoiceButton({
  label,
  emoji,
  onClick,
  index = 0,
  className,
}: ChoiceButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(99, 91, 255, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'group flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-left transition-colors hover:bg-white/10',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-stripe-purple',
        className
      )}
    >
      {emoji && <span className="text-2xl">{emoji}</span>}
      <span className="text-lg font-medium text-white/90 group-hover:text-white">
        {label}
      </span>
      <motion.span
        className="ml-auto text-white/30 group-hover:text-white/60"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        &rarr;
      </motion.span>
    </motion.button>
  )
}
