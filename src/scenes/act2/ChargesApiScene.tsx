import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogues = getDialogue('charges-api')

/** Sepia-toned card icon */
function CardIcon() {
  return (
    <svg
      width="64"
      height="48"
      viewBox="0 0 64 48"
      fill="none"
      className="drop-shadow-lg"
    >
      <rect width="64" height="48" rx="8" fill="#d4a574" />
      <rect x="0" y="14" width="64" height="8" fill="#b8865a" />
      <rect x="8" y="30" width="24" height="4" rx="2" fill="#e8c9a0" />
      <rect x="8" y="38" width="16" height="3" rx="1.5" fill="#e8c9a0" />
    </svg>
  )
}

/** Sepia-toned money icon */
function MoneyIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="drop-shadow-lg"
    >
      <circle cx="28" cy="28" r="28" fill="#a8b060" />
      <circle cx="28" cy="28" r="22" stroke="#8a9448" strokeWidth="2" fill="none" />
      <text
        x="28"
        y="36"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="#5c6630"
      >
        $
      </text>
    </svg>
  )
}

export default function ChargesApiScene() {
  const { goNext } = useSceneNavigation()
  const [dialogIndex, setDialogIndex] = useState(0)
  const [dialogDone, setDialogDone] = useState(false)

  const handleDialogComplete = useCallback(() => {
    if (dialogIndex < dialogues.length - 1) {
      setDialogIndex((i) => i + 1)
    } else {
      setDialogDone(true)
    }
  }, [dialogIndex])

  const currentLine = dialogues[dialogIndex]

  return (
    <Scene>
      {/* Nostalgic warm header */}
      <AnimatedText
        as="h2"
        className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-amber-400/60"
      >
        The Early Days
      </AnimatedText>
      <AnimatedText
        as="h1"
        className="mb-12 text-center text-4xl font-bold text-amber-100"
        delay={0.15}
      >
        The Charges API
      </AnimatedText>

      {/* Card -> Arrow -> Money animation */}
      <div className="mb-14 flex items-center justify-center gap-6">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="rounded-xl border border-amber-800/40 bg-amber-950/30 p-4">
            <CardIcon />
          </div>
          <span className="text-xs font-medium text-amber-300/60">Card</span>
        </motion.div>

        {/* Animated arrow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col items-center gap-1"
        >
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
            <motion.line
              x1="0"
              y1="12"
              x2="64"
              y2="12"
              stroke="#d4a574"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            />
            <motion.polygon
              points="64,6 78,12 64,18"
              fill="#d4a574"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.6 }}
            />
          </svg>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-[10px] font-mono text-amber-400/50"
          >
            POST /v1/charges
          </motion.span>
        </motion.div>

        {/* Money */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="rounded-xl border border-amber-800/40 bg-amber-950/30 p-4">
            <MoneyIcon />
          </div>
          <span className="text-xs font-medium text-amber-300/60">Money</span>
        </motion.div>
      </div>

      {/* Guide dialogue */}
      {currentLine && (
        <div className="mb-8">
          <GuidePresence
            text={currentLine.text}
            emotion={currentLine.emotion}
            onComplete={handleDialogComplete}
          />
        </div>
      )}

      {/* Continue button */}
      {dialogDone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button onClick={goNext}>Continue</Button>
        </motion.div>
      )}
    </Scene>
  )
}
