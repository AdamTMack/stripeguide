import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import { getDialogue } from '../../content/dialogues'
import { uiComparisonData } from '../../content/comparisonData'
import { useState } from 'react'

export default function CheatSheetScene() {
  const lines = getDialogue('cheat-sheet')
  const [showSheet, setShowSheet] = useState(false)

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          Your Cheat Sheet
        </AnimatedText>

        <GuidePresence
          text={lines[0]?.text ?? ''}
          emotion={lines[0]?.emotion}
          onComplete={() => setShowSheet(true)}
        />

        {showSheet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Quick reference cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="mb-2 font-semibold text-stripe-cyan">Checkout Sessions</h3>
                <p className="text-sm text-white/60">
                  Higher-level API. Wraps Payment Intents. Includes tax, discounts, shipping.
                  Supports all three UI options.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="mb-2 font-semibold text-stripe-purple">Payment Intents</h3>
                <p className="text-sm text-white/60">
                  Lower-level API. Direct payment tracking with state machine.
                  Only works with Payment Element.
                </p>
              </div>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-white/50">Feature</th>
                    <th className="px-4 py-3 text-white/50">Hosted</th>
                    <th className="px-4 py-3 text-white/50">Embedded</th>
                    <th className="px-4 py-3 text-white/50">Payment Element</th>
                  </tr>
                </thead>
                <tbody>
                  {uiComparisonData.map((row) => (
                    <tr key={row.feature} className="border-b border-white/5">
                      <td className="px-4 py-2 text-white/70">{row.feature}</td>
                      <td className="px-4 py-2 text-white/50">{row.hosted}</td>
                      <td className="px-4 py-2 text-white/50">{row.embedded}</td>
                      <td className="px-4 py-2 text-white/50">{row.paymentElement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-stripe-green/20 bg-stripe-green/5 p-5 text-center">
              <p className="text-lg font-medium text-stripe-green">
                You've completed the Stripe Payments Guide!
              </p>
              <p className="mt-1 text-sm text-white/50">
                Bookmark this page or restart anytime.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
