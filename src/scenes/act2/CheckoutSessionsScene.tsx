import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogue = getDialogue('checkout-sessions')

export default function CheckoutSessionsScene() {
  const { goNext } = useSceneNavigation()
  const [dialogueIdx, setDialogueIdx] = useState(0)
  const [showStack, setShowStack] = useState(false)

  const handleDialogueComplete = () => {
    if (dialogueIdx < dialogue.length - 1) {
      setDialogueIdx(dialogueIdx + 1)
    }
    if (dialogueIdx >= 0) {
      setShowStack(true)
    }
  }

  return (
    <Scene>
      <div className="flex flex-col items-center gap-10">
        <AnimatedText as="h2" className="text-3xl font-bold text-white md:text-4xl" gradient>
          Checkout Sessions
        </AnimatedText>

        {/* Stack diagram */}
        {showStack && (
          <div className="flex w-full max-w-lg flex-col items-center gap-0">
            {/* Top layer: Checkout Sessions */}
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative z-10 w-full rounded-t-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 px-8 py-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/30 text-lg">
                  🏗️
                </div>
                <span className="text-lg font-semibold text-indigo-300">Checkout Sessions API</span>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                Higher-level abstraction. Handles tax, discounts, shipping, adaptive pricing, and more
                — all built in.
              </p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {['Tax', 'Discounts', 'Shipping', 'Pricing'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Connector arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="z-10 flex flex-col items-center"
            >
              <div className="h-4 w-px bg-white/20" />
              <span className="text-xs text-white/40">wraps</span>
              <div className="h-4 w-px bg-white/20" />
            </motion.div>

            {/* Bottom layer: Payment Intents */}
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full rounded-b-2xl border border-white/10 bg-white/5 px-8 py-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-lg">
                  ⚙️
                </div>
                <span className="text-lg font-semibold text-white/80">Payment Intents API</span>
              </div>
              <p className="text-sm leading-relaxed text-white/40">
                The foundation. Handles the core payment lifecycle, state machine, and SCA
                authentication.
              </p>
            </motion.div>

            {/* Annotation */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-4 text-center text-sm text-white/50"
            >
              Checkout Sessions uses Payment Intents under the hood — you get everything it does,
              plus more.
            </motion.p>
          </div>
        )}

        <GuidePresence
          text={dialogue[dialogueIdx]?.text ?? ''}
          emotion={dialogue[dialogueIdx]?.emotion}
          onComplete={handleDialogueComplete}
        />

        <Button onClick={goNext}>Continue</Button>
      </div>
    </Scene>
  )
}
