import { motion } from 'framer-motion'
import type { WebhookEvent } from '../../content/webhookPayloads'
import CodeBlock from './CodeBlock'

interface WebhookViewerProps {
  events: WebhookEvent[]
}

export default function WebhookViewer({ events }: WebhookViewerProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-white/50">Webhook Events</h4>
      {events.map((event, i) => (
        <motion.div
          key={event.type}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          className="rounded-lg border border-white/10 bg-white/[0.02]"
        >
          <div className="border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stripe-green" />
              <code className="text-sm font-medium text-stripe-green">{event.type}</code>
            </div>
            <p className="mt-1 text-xs text-white/50">{event.description}</p>
            <p className="text-xs text-white/30">{event.when}</p>
          </div>
          <div className="p-2">
            <CodeBlock code={event.payload} language="json" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
