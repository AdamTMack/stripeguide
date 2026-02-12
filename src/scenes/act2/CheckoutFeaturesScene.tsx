import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'
import { checkoutFeatures } from '../../content/comparisonData'

const dialogue = getDialogue('checkout-features')

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function CheckoutFeaturesScene() {
  const { goNext } = useSceneNavigation()
  const [showCards, setShowCards] = useState(false)

  return (
    <Scene>
      <div className="flex flex-col items-center gap-10">
        <AnimatedText as="h2" className="text-3xl font-bold text-white md:text-4xl" gradient>
          Built-in Features
        </AnimatedText>

        <AnimatedText
          as="p"
          className="text-center text-lg text-white/60"
          delay={0.2}
        >
          Everything Checkout Sessions gives you out of the box
        </AnimatedText>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          onAnimationComplete={() => setShowCards(true)}
        >
          {checkoutFeatures.map((feature, i) => (
            <motion.div
              key={feature.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-indigo-400/30 hover:bg-white/[0.07]"
            >
              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:from-indigo-500/5 group-hover:to-purple-500/5 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-xl">
                  {feature.icon}
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-white">
                  {feature.name}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* "No extra code" callout */}
        {showCards && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-lg border border-green-500/20 bg-green-500/10 px-5 py-3"
          >
            <p className="text-center text-sm font-medium text-green-400">
              All included with Checkout Sessions — zero extra code required
            </p>
          </motion.div>
        )}

        <GuidePresence
          text={dialogue[0]?.text ?? ''}
          emotion={dialogue[0]?.emotion}
        />

        <Button onClick={goNext}>Continue</Button>
      </div>
    </Scene>
  )
}
