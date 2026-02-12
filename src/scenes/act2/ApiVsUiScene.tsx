import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogue = getDialogue('api-vs-ui')

const apiItems = [
  { name: 'Checkout Sessions', desc: 'Higher-level, more features', icon: '🏗️' },
  { name: 'Payment Intents', desc: 'Lower-level, full control', icon: '⚙️' },
]

const uiItems = [
  { name: 'Hosted Checkout', desc: 'Stripe-hosted page', icon: '🌐' },
  { name: 'Embedded Checkout', desc: 'Iframe in your site', icon: '📐' },
  { name: 'Payment Element', desc: 'Components in your form', icon: '🧩' },
]

const columnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

const itemVariantsRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function ApiVsUiScene() {
  const { goNext } = useSceneNavigation()
  const [dialogueIdx, setDialogueIdx] = useState(0)
  const [showColumns, setShowColumns] = useState(false)

  const handleDialogueComplete = () => {
    if (dialogueIdx < dialogue.length - 1) {
      setDialogueIdx(dialogueIdx + 1)
    }
    setShowColumns(true)
  }

  return (
    <Scene>
      <div className="flex flex-col items-center gap-10">
        <AnimatedText as="h2" className="text-3xl font-bold text-white md:text-4xl" gradient>
          Two Separate Choices
        </AnimatedText>

        {/* Two-column layout */}
        {showColumns && (
          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row md:gap-4">
            {/* API Layer column */}
            <motion.div
              variants={columnVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 rounded-2xl border border-indigo-400/20 bg-indigo-500/5 p-6"
            >
              <motion.div variants={itemVariants} className="mb-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-indigo-400" />
                <h3 className="text-lg font-semibold text-indigo-300">API Layer</h3>
              </motion.div>
              <motion.p variants={itemVariants} className="mb-5 text-sm text-white/40">
                How your server talks to Stripe
              </motion.p>
              {apiItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="mb-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl font-bold text-white/50 md:h-14 md:w-14">
                vs
              </div>
            </motion.div>

            {/* UI Layer column */}
            <motion.div
              variants={columnVariants}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.4 }}
              className="flex-1 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6"
            >
              <motion.div variants={itemVariantsRight} className="mb-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <h3 className="text-lg font-semibold text-emerald-300">UI Layer</h3>
              </motion.div>
              <motion.p variants={itemVariantsRight} className="mb-5 text-sm text-white/40">
                What the customer sees and interacts with
              </motion.p>
              {uiItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariantsRight}
                  className="mb-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Tension-building callout */}
        {showColumns && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-center text-sm text-white/40 italic"
          >
            But which combinations actually work together? Not all of them do...
          </motion.p>
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
