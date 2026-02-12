import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import { useSceneNavigation } from '../../engine/useSceneNavigation'

function FloatingOrb({
  size,
  color,
  x,
  y,
  delay,
}: {
  size: number
  color: string
  x: string
  y: string
  delay: number
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: color,
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.3, 0.15, 0.3],
        scale: [0.5, 1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  )
}

export default function LandingScene() {
  const { goNext } = useSceneNavigation()

  return (
    <Scene className="overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <FloatingOrb
          size={400}
          color="rgba(99, 91, 255, 0.15)"
          x="10%"
          y="20%"
          delay={0}
        />
        <FloatingOrb
          size={300}
          color="rgba(128, 233, 255, 0.1)"
          x="60%"
          y="10%"
          delay={1.5}
        />
        <FloatingOrb
          size={350}
          color="rgba(255, 128, 181, 0.08)"
          x="70%"
          y="60%"
          delay={3}
        />
        <FloatingOrb
          size={250}
          color="rgba(0, 212, 170, 0.08)"
          x="20%"
          y="70%"
          delay={2}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Stripe-inspired top accent */}
        <motion.div
          className="mb-8 h-1 w-16 rounded-full bg-stripe-purple"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Main title */}
        <AnimatedText
          as="h1"
          className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          delay={0.3}
          gradient
        >
          Understanding Stripe Payments
        </AnimatedText>

        {/* Subtitle */}
        <AnimatedText
          as="p"
          className="mt-6 text-lg text-white/50 md:text-xl"
          delay={0.6}
        >
          A visual, interactive guide
        </AnimatedText>

        {/* CTA Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(99, 91, 255, 0.3)',
                '0 0 40px rgba(99, 91, 255, 0.5)',
                '0 0 20px rgba(99, 91, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="rounded-xl"
          >
            <Button size="lg" onClick={goNext}>
              Let's Begin
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom hint */}
        <motion.p
          className="mt-8 text-sm text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          Press Space or Arrow Right to navigate
        </motion.p>
      </div>
    </Scene>
  )
}
