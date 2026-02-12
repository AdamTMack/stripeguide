import { motion } from 'framer-motion'
import { useOverlayStore } from '../../store/overlayStore'
import { useNarrativeStore } from '../../store/narrativeStore'

const scenesWithOverlay = new Set([
  'hosted-checkout',
  'embedded-checkout',
  'payment-element',
  'payment-intents',
  'checkout-sessions',
])

export default function PeekButton() {
  const currentScene = useNarrativeStore((s) => s.currentScene)
  const open = useOverlayStore((s) => s.open)
  const isOpen = useOverlayStore((s) => s.isOpen)

  if (!scenesWithOverlay.has(currentScene) || isOpen) return null

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => open(currentScene)}
      className="fixed right-4 bottom-6 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-2.5 text-sm font-medium text-white/70 shadow-lg backdrop-blur-sm transition-colors hover:border-stripe-purple/30 hover:text-white"
    >
      <span>{'{ }'}</span>
      <span>Peek Under the Hood</span>
    </motion.button>
  )
}
