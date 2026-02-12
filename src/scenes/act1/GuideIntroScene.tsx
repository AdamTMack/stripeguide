import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function GuideIntroScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('guide-intro')
  const [currentLine, setCurrentLine] = useState(0)
  const [lineComplete, setLineComplete] = useState(false)

  const isLastLine = currentLine >= lines.length - 1
  const allLinesShown = isLastLine && lineComplete

  const handleLineComplete = useCallback(() => {
    setLineComplete(true)
  }, [])

  const handleAdvance = useCallback(() => {
    if (!lineComplete) return
    if (isLastLine) return
    setLineComplete(false)
    setCurrentLine((prev) => prev + 1)
  }, [lineComplete, isLastLine])

  return (
    <Scene>
      <div className="flex flex-col items-center gap-8">
        {/* Guide presence with current dialog line */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <GuidePresence
              text={lines[currentLine].text}
              emotion={lines[currentLine].emotion}
              onComplete={handleLineComplete}
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {lines.map((_, index) => (
            <motion.div
              key={index}
              className="h-2 w-2 rounded-full"
              animate={{
                backgroundColor:
                  index <= currentLine
                    ? 'rgba(99, 91, 255, 1)'
                    : 'rgba(255, 255, 255, 0.2)',
                scale: index === currentLine ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>

        {/* Action buttons */}
        <AnimatePresence>
          {lineComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {allLinesShown ? (
                <Button onClick={goNext}>Continue</Button>
              ) : (
                <Button variant="secondary" onClick={handleAdvance}>
                  Next
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}
