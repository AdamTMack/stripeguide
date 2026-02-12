import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogues = getDialogue('why-charges-died')

/** Shield / lock icon representing the SCA bouncer */
function ShieldIcon({ blocked }: { blocked: boolean }) {
  return (
    <motion.svg
      width="80"
      height="96"
      viewBox="0 0 80 96"
      fill="none"
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.8 }}
    >
      {/* Shield shape */}
      <motion.path
        d="M40 4 L72 20 V52 C72 72 56 88 40 92 C24 88 8 72 8 52 V20 Z"
        fill={blocked ? '#ef4444' : '#3b82f6'}
        fillOpacity={0.2}
        stroke={blocked ? '#ef4444' : '#3b82f6'}
        strokeWidth="2.5"
      />
      {/* Lock icon inside shield */}
      <rect x="28" y="44" width="24" height="18" rx="3" fill={blocked ? '#ef4444' : '#3b82f6'} fillOpacity={0.6} />
      <path
        d="M33 44 V36 C33 30 36 26 40 26 C44 26 47 30 47 36 V44"
        stroke={blocked ? '#ef4444' : '#3b82f6'}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="40" cy="52" r="2.5" fill="white" />
    </motion.svg>
  )
}

/** Simple arrow showing the old card->money flow, now blocked */
function BlockedFlow() {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Card representation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex h-10 w-14 items-center justify-center rounded-md border border-white/20 bg-white/5 text-lg"
      >
        <span role="img" aria-label="card">
          {'\uD83D\uDCB3'}
        </span>
      </motion.div>

      {/* Dashed line with strikethrough */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative"
      >
        <svg width="60" height="24" viewBox="0 0 60 24">
          <line
            x1="0"
            y1="12"
            x2="48"
            y2="12"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <polygon points="48,7 58,12 48,17" fill="#64748b" />
        </svg>
        {/* Red X over the arrow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className="absolute -top-1 left-1/2 -translate-x-1/2 text-2xl font-bold text-red-500"
        >
          X
        </motion.div>
      </motion.div>

      {/* Money representation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex h-10 w-14 items-center justify-center rounded-md border border-white/20 bg-white/5 text-lg"
      >
        <span role="img" aria-label="money">
          {'\uD83D\uDCB0'}
        </span>
      </motion.div>
    </div>
  )
}

export default function WhyChargesDiedScene() {
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
      {/* Warning header */}
      <AnimatedText
        as="h2"
        className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-red-400/70"
      >
        Regulation Strikes
      </AnimatedText>
      <AnimatedText
        as="h1"
        className="mb-10 text-center text-4xl font-bold text-white"
        delay={0.15}
      >
        Why Charges Had to Go
      </AnimatedText>

      {/* The "bouncer" blocking the old flow */}
      <div className="mb-10 flex flex-col items-center gap-6">
        {/* Old flow, now blocked */}
        <BlockedFlow />

        {/* Shield bouncer in the middle */}
        <motion.div
          className="flex flex-col items-center gap-2"
        >
          <ShieldIcon blocked />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-sm font-semibold text-red-400">
              SCA / PSD2
            </span>
            <span className="text-xs text-white/40">
              Strong Customer Authentication
            </span>
          </motion.div>
        </motion.div>

        {/* Regulation badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex gap-3"
        >
          {['Identity Verification', '3D Secure', 'Two-Factor Auth'].map(
            (label) => (
              <span
                key={label}
                className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300"
              >
                {label}
              </span>
            )
          )}
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
