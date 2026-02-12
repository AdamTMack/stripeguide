import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'
import { uiComparisonData } from '../../content/comparisonData'

export default function UiComparisonScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('ui-comparison')
  const [showTable, setShowTable] = useState(false)

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          Side-by-Side Comparison
        </AnimatedText>

        <GuidePresence
          text={lines[0]?.text ?? ''}
          emotion={lines[0]?.emotion}
          onComplete={() => setShowTable(true)}
        />

        {showTable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 font-medium text-white/50">Feature</th>
                  <th className="px-4 py-3 font-medium text-stripe-cyan">Hosted</th>
                  <th className="px-4 py-3 font-medium text-stripe-purple">Embedded</th>
                  <th className="px-4 py-3 font-medium text-stripe-pink">Payment Element</th>
                </tr>
              </thead>
              <tbody>
                {uiComparisonData.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-white/5"
                  >
                    <td className="px-4 py-3 font-medium text-white/70">{row.feature}</td>
                    <td className="px-4 py-3 text-white/60">{row.hosted}</td>
                    <td className="px-4 py-3 text-white/60">{row.embedded}</td>
                    <td className="px-4 py-3 text-white/60">{row.paymentElement}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8">
              <Button onClick={goNext}>Continue to Summary</Button>
            </div>
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
