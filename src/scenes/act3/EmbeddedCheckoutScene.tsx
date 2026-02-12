import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import EmbeddedCheckoutDemo from '../../components/demos/EmbeddedCheckoutDemo'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function EmbeddedCheckoutScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('embedded-checkout')
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
          Embedded Checkout
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
            {/* Mockup of embedded checkout */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-xs text-white/40">
                  yoursite.com/checkout
                </div>
              </div>
              <div className="bg-white/[0.02] p-8">
                <div className="flex gap-8">
                  {/* Your site content */}
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-24 rounded bg-white/10" />
                    <div className="h-3 w-full rounded bg-white/5" />
                    <div className="h-3 w-2/3 rounded bg-white/5" />
                  </div>
                  {/* Stripe iframe */}
                  <motion.div
                    className="w-64 rounded-lg border-2 border-dashed border-stripe-purple/30 p-4"
                    animate={{ borderColor: ['rgba(99,91,255,0.3)', 'rgba(99,91,255,0.6)', 'rgba(99,91,255,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="space-y-3">
                      <div className="text-xs text-stripe-purple/60">Stripe iframe</div>
                      <div className="h-8 rounded border border-white/10 bg-white/5" />
                      <div className="flex gap-2">
                        <div className="h-8 flex-1 rounded border border-white/10 bg-white/5" />
                        <div className="h-8 w-16 rounded border border-white/10 bg-white/5" />
                      </div>
                      <div className="h-8 rounded bg-stripe-purple/80" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-stripe-cyan/10 px-3 py-1 text-stripe-cyan">Stays on your site</span>
              <span className="rounded-full bg-stripe-green/10 px-3 py-1 text-stripe-green">Low code</span>
              <span className="rounded-full bg-stripe-purple/10 px-3 py-1 text-stripe-purple">Checkout Sessions only</span>
            </div>

            {/* Live demo */}
            <EmbeddedCheckoutDemo />

            <Button onClick={goNext}>Continue</Button>
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
