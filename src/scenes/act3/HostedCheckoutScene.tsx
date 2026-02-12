import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function HostedCheckoutScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('hosted-checkout')
  const [lineIndex, setLineIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  const handleComplete = () => {
    if (lineIndex < lines.length - 1) {
      setLineIndex((i) => i + 1)
    } else {
      setShowContent(true)
    }
  }

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          Hosted Checkout
        </AnimatedText>

        <GuidePresence
          text={lines[lineIndex]?.text ?? ''}
          emotion={lines[lineIndex]?.emotion}
          onComplete={handleComplete}
        />

        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Mockup of hosted checkout redirect */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-xs text-white/40">
                  checkout.stripe.com/c/cs_test_...
                </div>
              </div>
              <div className="bg-white/[0.02] p-8">
                <div className="mx-auto max-w-sm space-y-4">
                  <div className="h-4 w-32 rounded bg-white/10" />
                  <div className="h-10 rounded-lg border border-white/10 bg-white/5" />
                  <div className="flex gap-3">
                    <div className="h-10 flex-1 rounded-lg border border-white/10 bg-white/5" />
                    <div className="h-10 w-20 rounded-lg border border-white/10 bg-white/5" />
                  </div>
                  <motion.div
                    className="h-10 rounded-lg bg-stripe-purple"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-stripe-green/10 px-3 py-1 text-stripe-green">Least code</span>
              <span className="rounded-full bg-stripe-cyan/10 px-3 py-1 text-stripe-cyan">Stripe-hosted</span>
              <span className="rounded-full bg-stripe-purple/10 px-3 py-1 text-stripe-purple">Checkout Sessions only</span>
            </div>

            <Button onClick={goNext}>Continue</Button>
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
