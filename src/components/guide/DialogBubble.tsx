import { motion } from 'framer-motion'
import { useTypewriter } from '../../hooks/useTypewriter'

interface DialogBubbleProps {
  text: string
  onComplete?: () => void
  speed?: number
}

export default function DialogBubble({ text, onComplete, speed = 30 }: DialogBubbleProps) {
  const { displayed, isComplete, skip } = useTypewriter({
    text,
    speed,
    onComplete,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-2xl cursor-pointer rounded-2xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-sm"
      onClick={() => !isComplete && skip()}
    >
      <p className="text-lg leading-relaxed text-white/90 md:text-xl">
        {displayed}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="ml-0.5 inline-block h-5 w-0.5 bg-stripe-purple align-middle"
          />
        )}
      </p>
      {!isComplete && (
        <span className="mt-2 block text-xs text-white/30">click to skip</span>
      )}
    </motion.div>
  )
}
