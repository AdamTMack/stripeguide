import { motion } from 'framer-motion'

interface FlowStep {
  label: string
  icon: string
}

interface FlowDiagramProps {
  title?: string
  steps?: FlowStep[]
}

const defaultSteps: FlowStep[] = [
  { label: 'Browser', icon: '🌐' },
  { label: 'Your Server', icon: '🖥️' },
  { label: 'Stripe API', icon: '💳' },
  { label: 'Webhook', icon: '🔔' },
]

export default function FlowDiagram({ title = 'Request Flow', steps = defaultSteps }: FlowDiagramProps) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-white/50">{title}</h4>
      <div className="flex flex-col gap-2">
        {steps.map((step, i) => (
          <div key={step.label}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm font-medium text-white/80">{step.label}</span>
              <span className="ml-auto text-xs text-white/30">Step {i + 1}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 + 0.1 }}
                className="ml-7 flex h-4 items-center"
              >
                <div className="h-full w-px bg-stripe-purple/30" />
                <span className="ml-2 text-[10px] text-white/20">&#x2193;</span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
