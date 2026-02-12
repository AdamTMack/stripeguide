import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import PaymentElementDemo from '../../components/demos/PaymentElementDemo'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function PaymentElementScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('payment-element')
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
          Payment Element
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
            {/* Mockup of Payment Element in custom form */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-xs text-white/40">
                  yoursite.com/pay
                </div>
              </div>
              <div className="bg-white/[0.02] p-8">
                <div className="mx-auto max-w-md space-y-4">
                  {/* Custom form elements */}
                  <div className="text-sm font-medium text-white/70">Your Custom Checkout</div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50">Email</label>
                    <div className="h-9 rounded-lg border border-white/10 bg-white/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/50">Name</label>
                    <div className="h-9 rounded-lg border border-white/10 bg-white/5" />
                  </div>
                  {/* Payment Element area */}
                  <motion.div
                    className="rounded-lg border-2 border-dashed border-stripe-purple/30 p-4"
                    animate={{ borderColor: ['rgba(99,91,255,0.3)', 'rgba(99,91,255,0.6)', 'rgba(99,91,255,0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="mb-2 text-xs text-stripe-purple/60">&lt;PaymentElement /&gt;</div>
                    <div className="space-y-2">
                      <div className="h-9 rounded border border-white/10 bg-white/5" />
                      <div className="flex gap-2">
                        <div className="h-9 flex-1 rounded border border-white/10 bg-white/5" />
                        <div className="h-9 w-20 rounded border border-white/10 bg-white/5" />
                      </div>
                    </div>
                  </motion.div>
                  <div className="h-10 rounded-lg bg-stripe-purple" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-stripe-pink/10 px-3 py-1 text-stripe-pink">Full control</span>
              <span className="rounded-full bg-stripe-orange/10 px-3 py-1 text-stripe-orange">Moderate code</span>
              <span className="rounded-full bg-stripe-green/10 px-3 py-1 text-stripe-green">Works with both APIs</span>
            </div>

            {/* Live demo */}
            <PaymentElementDemo />

            <Button onClick={goNext}>Continue</Button>
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
