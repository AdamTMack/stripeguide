import { motion } from 'framer-motion'
import { useNarrativeStore } from '../../store/narrativeStore'
import { totalScenes } from '../../engine/sceneGraph'

export default function ProgressBar() {
  const visited = useNarrativeStore((s) => s.visited)
  const progress = (visited.size / totalScenes) * 100

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-1 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-stripe-purple to-stripe-cyan"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
