import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const flowSteps = [
  { emoji: '\uD83D\uDC64', label: 'Customer' },
  { emoji: '\uD83D\uDCBB', label: 'Your App' },
  { emoji: '\uD83D\uDFEA', label: 'Stripe' },
  { emoji: '\uD83C\uDFE6', label: 'Bank' },
]

function FlowArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      className="hidden items-center md:flex"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        width="48"
        height="24"
        viewBox="0 0 48 24"
        fill="none"
        className="text-white/30"
      >
        <path
          d="M0 12H44M44 12L36 4M44 12L36 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

function FlowBox({
  emoji,
  label,
  index,
}: {
  emoji: string
  label: string
  index: number
}) {
  const delay = 0.3 + index * 0.2

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: -30, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-lg backdrop-blur-sm md:h-24 md:w-24 md:text-4xl"
        whileHover={{ scale: 1.05, borderColor: 'rgba(99, 91, 255, 0.5)' }}
        transition={{ duration: 0.2 }}
      >
        {emoji}
      </motion.div>
      <span className="text-sm font-medium text-white/70">{label}</span>
    </motion.div>
  )
}

export default function BigPictureScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('big-picture')
  const [currentLine, setCurrentLine] = useState(0)
  const [lineComplete, setLineComplete] = useState(false)
  const [showFlow, setShowFlow] = useState(false)
  const [flowAnimated, setFlowAnimated] = useState(false)

  const isLastLine = currentLine >= lines.length - 1
  const allDialogDone = isLastLine && lineComplete

  const handleLineComplete = useCallback(() => {
    setLineComplete(true)

    // After the last dialog line completes, trigger the flow animation
    if (currentLine >= lines.length - 1) {
      setShowFlow(true)
      // Allow time for the staggered flow boxes to finish animating
      const totalAnimTime = 0.3 + flowSteps.length * 0.2 + 0.5
      setTimeout(() => setFlowAnimated(true), totalAnimTime * 1000)
    }
  }, [currentLine, lines.length])

  const handleAdvance = useCallback(() => {
    if (!lineComplete) return
    if (isLastLine) return
    setLineComplete(false)
    setCurrentLine((prev) => prev + 1)
  }, [lineComplete, isLastLine])

  return (
    <Scene>
      <div className="flex flex-col items-center gap-8">
        {/* Guide dialog */}
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

        {/* Flow visualization */}
        <AnimatePresence>
          {showFlow && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Horizontal flow for md+ screens */}
              <div className="hidden items-center gap-2 md:flex">
                {flowSteps.map((step, index) => (
                  <div key={step.label} className="flex items-center gap-2">
                    <FlowBox
                      emoji={step.emoji}
                      label={step.label}
                      index={index}
                    />
                    {index < flowSteps.length - 1 && (
                      <FlowArrow delay={0.5 + index * 0.2} />
                    )}
                  </div>
                ))}
              </div>

              {/* Vertical flow for small screens */}
              <div className="flex flex-col items-center gap-4 md:hidden">
                {flowSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className="flex flex-col items-center gap-4"
                  >
                    <FlowBox
                      emoji={step.emoji}
                      label={step.label}
                      index={index}
                    />
                    {index < flowSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + index * 0.2,
                        }}
                      >
                        <svg
                          width="24"
                          height="32"
                          viewBox="0 0 24 32"
                          fill="none"
                          className="text-white/30"
                        >
                          <path
                            d="M12 0V28M12 28L4 20M12 28L20 20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <AnimatePresence>
          {lineComplete && !allDialogDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button variant="secondary" onClick={handleAdvance}>
                Next
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {flowAnimated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button onClick={goNext}>Continue</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}
