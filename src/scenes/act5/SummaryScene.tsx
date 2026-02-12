import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { useNarrativeStore } from '../../store/narrativeStore'
import { getDialogue } from '../../content/dialogues'
import { generateSummary } from '../../lib/summaryGenerator'

export default function SummaryScene() {
  const { goNext } = useSceneNavigation()
  const choices = useNarrativeStore((s) => s.choices)
  const lines = getDialogue('summary')
  const [showSummary, setShowSummary] = useState(false)

  const summary = generateSummary(choices)

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          Your Integration Plan
        </AnimatedText>

        <GuidePresence
          text={lines[0]?.text ?? ''}
          emotion={lines[0]?.emotion}
          onComplete={() => setShowSummary(true)}
        />

        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-stripe-purple/20 bg-stripe-purple/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-stripe-purple">
                Based on your choices...
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm text-white/50">Recommended API</div>
                  <div className="text-lg font-medium">{summary.recommendedApi}</div>
                </div>
                <div>
                  <div className="text-sm text-white/50">Recommended UI</div>
                  <div className="text-lg font-medium">{summary.recommendedUi}</div>
                </div>
                <div>
                  <div className="text-sm text-white/50">Complexity</div>
                  <div className="text-lg font-medium">{summary.complexity}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-white/50">Summary</div>
                  <div className="text-base text-white/80">{summary.description}</div>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-3 text-sm font-semibold text-white/60">Next Steps</h3>
              <ol className="space-y-2">
                {summary.nextSteps.map((step, i) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stripe-purple/20 text-xs font-medium text-stripe-purple">
                      {i + 1}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </div>

            <Button onClick={goNext}>Try a Test Payment</Button>
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
