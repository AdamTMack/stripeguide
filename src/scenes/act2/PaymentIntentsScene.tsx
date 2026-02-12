import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogues = getDialogue('payment-intents')

interface OrderStep {
  label: string
  icon: string
  description: string
}

const ORDER_STEPS: OrderStep[] = [
  {
    label: 'Order Placed',
    icon: '\uD83D\uDCCB',
    description: 'Intent created',
  },
  {
    label: 'Being Prepared',
    icon: '\uD83D\uDC68\u200D\uD83C\uDF73',
    description: 'Payment processing',
  },
  {
    label: 'Quality Check',
    icon: '\u2705',
    description: 'Verification if needed',
  },
  {
    label: 'Served',
    icon: '\uD83C\uDF7D\uFE0F',
    description: 'Payment succeeded',
  },
]

function OrderTimeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex items-start justify-center gap-2 sm:gap-4">
      {ORDER_STEPS.map((step, i) => {
        const isActive = i === activeStep
        const isDone = i < activeStep
        const isFuture = i > activeStep

        return (
          <div key={step.label} className="flex items-start">
            {/* Step */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
            >
              {/* Circle with icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  borderColor: isDone
                    ? 'rgba(52, 211, 153, 0.6)'
                    : isActive
                      ? 'rgba(139, 92, 246, 0.8)'
                      : 'rgba(255, 255, 255, 0.1)',
                  backgroundColor: isDone
                    ? 'rgba(52, 211, 153, 0.1)'
                    : isActive
                      ? 'rgba(139, 92, 246, 0.1)'
                      : 'rgba(255, 255, 255, 0.03)',
                }}
                transition={{ duration: 0.4 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-2xl"
              >
                {step.icon}
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  color: isDone
                    ? 'rgba(52, 211, 153, 0.9)'
                    : isActive
                      ? 'rgba(255, 255, 255, 1)'
                      : 'rgba(255, 255, 255, 0.3)',
                }}
                className="max-w-[80px] text-center text-xs font-medium"
              >
                {step.label}
              </motion.span>

              {/* Description */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center text-[10px] text-violet-300/60"
                  >
                    {step.description}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Connector arrow (not after last) */}
            {i < ORDER_STEPS.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className="mt-6 flex items-center px-1"
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <motion.line
                    x1="0"
                    y1="6"
                    x2="16"
                    y2="6"
                    stroke={isDone ? '#34d399' : isFuture ? '#334155' : '#8b5cf6'}
                    strokeWidth="2"
                    strokeDasharray={isDone ? '0' : '4 3'}
                  />
                  <polygon
                    points="16,2 23,6 16,10"
                    fill={isDone ? '#34d399' : isFuture ? '#334155' : '#8b5cf6'}
                  />
                </svg>
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function PaymentIntentsScene() {
  const { goNext } = useSceneNavigation()
  const [dialogIndex, setDialogIndex] = useState(0)
  const [dialogDone, setDialogDone] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Animate through steps automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % ORDER_STEPS.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

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
      <AnimatedText
        as="h2"
        className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-violet-400/60"
      >
        The Modern Way
      </AnimatedText>
      <AnimatedText
        as="h1"
        className="mb-4 text-center text-4xl font-bold text-white"
        delay={0.15}
        gradient
      >
        Payment Intents
      </AnimatedText>

      {/* Restaurant analogy subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-10 text-center text-sm text-white/40"
      >
        Like ordering at a restaurant &mdash; your payment moves through clear steps
      </motion.p>

      {/* Order timeline visualization */}
      <div className="mb-12">
        <OrderTimeline activeStep={activeStep} />
      </div>

      {/* Comparison note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mx-auto mb-10 flex max-w-md items-center gap-3 rounded-xl border border-violet-500/10 bg-violet-500/5 px-4 py-3"
      >
        <span className="text-sm text-violet-300/80">
          Instead of &ldquo;send card, get money,&rdquo; you declare an <strong className="text-white">intent</strong> and track its journey.
        </span>
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
    </Scene>
  )
}
