import { useState } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import GuidePresence from '../../components/guide/GuidePresence'
import ChoiceGroup from '../../components/choices/ChoiceGroup'
import AnimatedText from '../../components/ui/AnimatedText'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function UiIntroScene() {
  const { choose, branches } = useSceneNavigation()
  const [dialogDone, setDialogDone] = useState(false)
  const lines = getDialogue('ui-intro')

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          What Your Customer Sees
        </AnimatedText>

        {lines[0] && (
          <GuidePresence
            text={lines[0].text}
            emotion={lines[0].emotion}
            onComplete={() => setDialogDone(true)}
          />
        )}

        {dialogDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-4 text-white/60">Choose a UI option to explore:</p>
            <ChoiceGroup
              branches={branches}
              onChoose={(branch) => choose('ui-choice', branch.label, branch.target)}
            />
          </motion.div>
        )}
      </div>
    </Scene>
  )
}
