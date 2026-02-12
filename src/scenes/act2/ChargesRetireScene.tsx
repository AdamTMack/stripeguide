import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogues = getDialogue('charges-retire')

const CONFETTI_COLORS = [
  '#a78bfa', // violet
  '#f472b6', // pink
  '#fbbf24', // amber
  '#34d399', // emerald
  '#60a5fa', // blue
  '#fb923c', // orange
  '#c084fc', // purple
  '#f87171', // red
]

interface ConfettiPiece {
  id: number
  x: number
  color: string
  size: number
  delay: number
  duration: number
  rotation: number
  drift: number
}

function useConfetti(count: number): ConfettiPiece[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 60,
    }))
  }, [count])
}

function Confetti() {
  const pieces = useConfetti(40)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            opacity: 1,
            y: -20,
            x: `${piece.x}%`,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            y: '110vh',
            x: `${piece.x + (piece.drift / 100) * 100}%`,
            rotate: piece.rotation + 360,
            scale: [0, 1, 0.8],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size * 1.4,
            backgroundColor: piece.color,
            borderRadius: piece.size > 7 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

export default function ChargesRetireScene() {
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
    <Scene className="overflow-hidden">
      {/* Confetti overlay */}
      <Confetti />

      {/* Celebration content */}
      <div className="relative z-10">
        <AnimatedText
          as="h2"
          className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-purple-400/60"
        >
          End of an Era
        </AnimatedText>

        {/* Gold watch + retirement banner */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          className="mb-6 flex justify-center"
        >
          <span className="text-7xl" role="img" aria-label="gold watch">
            {'\u231A'}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-4 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold text-white">
            Happy Retirement, Charges!
          </h1>
          <p className="text-lg text-white/50">
            2011 &mdash; 2024 &bull; Thanks for the memories
          </p>
        </motion.div>

        {/* Decorative retirement card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mx-auto mb-10 max-w-sm rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 text-center"
        >
          <p className="mb-3 text-sm text-purple-300/70">
            From all of us at the API layer:
          </p>
          <p className="text-base italic text-white/70">
            &ldquo;You were simple, elegant, and got the job done. Enjoy the
            beach.&rdquo;
          </p>
          <div className="mt-4 flex justify-center gap-2 text-2xl">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >
              {'\uD83C\uDF89'}
            </motion.span>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            >
              {'\uD83C\uDF8A'}
            </motion.span>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            >
              {'\uD83E\uDD42'}
            </motion.span>
          </div>
        </motion.div>

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
      </div>
    </Scene>
  )
}
