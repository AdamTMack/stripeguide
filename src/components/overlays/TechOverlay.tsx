import { motion, AnimatePresence } from 'framer-motion'
import { useOverlayStore } from '../../store/overlayStore'
import { codeExamples } from '../../content/codeExamples'
import { webhookEvents } from '../../content/webhookPayloads'
import CodeBlock from './CodeBlock'
import FlowDiagram from './FlowDiagram'
import WebhookViewer from './WebhookViewer'
import { cn } from '../../lib/cn'

const tabs = [
  { id: 'code' as const, label: 'Code', icon: '{ }' },
  { id: 'flow' as const, label: 'Flow', icon: '→' },
  { id: 'webhooks' as const, label: 'Webhooks', icon: '🔔' },
]

export default function TechOverlay() {
  const { isOpen, activeTab, sceneId, close, setTab } = useOverlayStore()

  const examples = sceneId ? codeExamples[sceneId] ?? [] : []
  const events = sceneId ? webhookEvents[sceneId] ?? [] : []

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg overflow-y-auto border-l border-white/10 bg-slate-900"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/95 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Under the Hood</h3>
                <button
                  onClick={close}
                  className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>
              {/* Tabs */}
              <div className="mt-3 flex gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-sm transition-colors',
                      activeTab === tab.id
                        ? 'bg-stripe-purple/20 text-stripe-purple'
                        : 'text-white/40 hover:text-white/70'
                    )}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'code' && (
                <div className="space-y-6">
                  {examples.length > 0 ? (
                    examples.map((ex) => (
                      <div key={ex.title}>
                        <h4 className="mb-2 text-sm font-medium text-white/50">{ex.title}</h4>
                        <CodeBlock code={ex.code} language={ex.language} annotations={ex.annotations} />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/30">No code examples for this scene yet.</p>
                  )}
                </div>
              )}

              {activeTab === 'flow' && <FlowDiagram />}

              {activeTab === 'webhooks' && (
                events.length > 0 ? (
                  <WebhookViewer events={events} />
                ) : (
                  <p className="text-sm text-white/30">No webhook examples for this scene yet.</p>
                )
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
