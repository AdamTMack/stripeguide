import { Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNarrativeStore } from '../store/narrativeStore'
import { lazyComponents } from './sceneGraph'
import { smoothTransition, fadeVariants } from '../lib/transitions'

function SceneLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        className="h-8 w-8 rounded-full bg-stripe-purple"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </div>
  )
}

export default function SceneRenderer() {
  const currentScene = useNarrativeStore((s) => s.currentScene)
  const direction = useNarrativeStore((s) => s.direction)

  const LazyScene = lazyComponents.get(currentScene)

  if (!LazyScene) {
    return (
      <div className="flex h-full items-center justify-center text-red-400">
        Scene not found: {currentScene}
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentScene}
        custom={direction}
        variants={fadeVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={smoothTransition}
        className="h-full w-full"
      >
        <Suspense fallback={<SceneLoader />}>
          <LazyScene />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
