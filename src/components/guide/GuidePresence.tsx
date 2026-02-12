import type { Emotion } from '../../engine/types'
import GuideAvatar from './GuideAvatar'
import DialogBubble from './DialogBubble'

interface GuidePresenceProps {
  text: string
  emotion?: Emotion
  onComplete?: () => void
}

export default function GuidePresence({
  text,
  emotion = 'neutral',
  onComplete,
}: GuidePresenceProps) {
  return (
    <div className="flex flex-col gap-4">
      <GuideAvatar emotion={emotion} speaking />
      <DialogBubble text={text} onComplete={onComplete} />
    </div>
  )
}
