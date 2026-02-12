import { useState } from 'react'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import GuidePresence from '../../components/guide/GuidePresence'
import AnimatedText from '../../components/ui/AnimatedText'
import PaymentElementDemo from '../../components/demos/PaymentElementDemo'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

export default function TestPaymentScene() {
  const { goNext } = useSceneNavigation()
  const lines = getDialogue('test-payment')
  const [showContent, setShowContent] = useState(false)

  return (
    <Scene>
      <div className="flex flex-col gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold md:text-4xl" gradient>
          Live Test Payment
        </AnimatedText>

        <GuidePresence
          text={lines[0]?.text ?? ''}
          emotion={lines[0]?.emotion}
          onComplete={() => setShowContent(true)}
        />

        {showContent && (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/60">
                Use test card <span className="font-mono text-stripe-purple">4242 4242 4242 4242</span> with any future expiry and any CVC.
              </p>
            </div>

            <PaymentElementDemo />

            <Button onClick={goNext}>Continue to Cheat Sheet</Button>
          </div>
        )}
      </div>
    </Scene>
  )
}
