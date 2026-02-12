import { motion } from 'framer-motion'
import type { Emotion } from '../../engine/types'
import GlowOrb from './GlowOrb'

interface GuideAvatarProps {
  emotion?: Emotion
  speaking?: boolean
}

export default function GuideAvatar({ emotion = 'neutral', speaking }: GuideAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3"
    >
      <GlowOrb emotion={emotion} size="md" />
      {speaking && (
        <motion.div
          className="flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-stripe-purple"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
