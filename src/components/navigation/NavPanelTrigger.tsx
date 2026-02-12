import { motion, AnimatePresence } from 'framer-motion'
import { useNavPanelStore } from '../../store/navPanelStore'
import { useNarrativeStore } from '../../store/narrativeStore'
import { sceneTitles } from '../../content/sceneTitles'

export default function NavPanelTrigger() {
  const toggle = useNavPanelStore((s) => s.toggle)
  const isOpen = useNavPanelStore((s) => s.isOpen)
  const currentScene = useNarrativeStore((s) => s.currentScene)

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          aria-label="Open scene navigator"
          aria-expanded={isOpen}
          className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-2 text-sm text-white/50 backdrop-blur-sm transition-colors hover:border-stripe-purple/30 hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-white/40"
          >
            <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="hidden sm:inline">{sceneTitles[currentScene] ?? 'Scenes'}</span>
          <span className="sm:hidden">Scenes</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
