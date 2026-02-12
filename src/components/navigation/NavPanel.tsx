import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavPanelStore } from '../../store/navPanelStore'
import { useNarrativeStore } from '../../store/narrativeStore'
import { useOverlayStore } from '../../store/overlayStore'
import { actGroups, branchTargetIds, branchMeta } from '../../engine/sceneStructure'
import { sceneTitles, actTitles } from '../../content/sceneTitles'
import { cn } from '../../lib/cn'

export default function NavPanel() {
  const isOpen = useNavPanelStore((s) => s.isOpen)
  const close = useNavPanelStore((s) => s.close)
  const currentScene = useNarrativeStore((s) => s.currentScene)
  const visited = useNarrativeStore((s) => s.visited)
  const goTo = useNarrativeStore((s) => s.goTo)
  const currentRef = useRef<HTMLButtonElement>(null)

  // Close tech overlay when nav panel opens
  useEffect(() => {
    if (isOpen) useOverlayStore.getState().close()
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, close])

  // Auto-scroll to current scene
  useEffect(() => {
    if (isOpen && currentRef.current) {
      // Small delay so the spring animation has started
      const t = setTimeout(() => {
        currentRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 150)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  const handleNavigate = (sceneId: string) => {
    goTo(sceneId)
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-label="Scene navigator"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[55vh] min-h-[40vh] flex-col overflow-hidden rounded-t-2xl border-t border-white/10 bg-slate-900"
          >
            {/* Handle + Header */}
            <div className="shrink-0 border-b border-white/10 bg-slate-900/95 px-5 pb-3 pt-3 backdrop-blur-sm">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Scenes</h3>
                <button
                  onClick={close}
                  className="rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close scene navigator"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-4 pb-8 pt-2">
              {actGroups.map((group) => (
                <div key={group.act} className="mb-4">
                  {/* Act label */}
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/30">
                    <span>Act {group.act}</span>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="normal-case tracking-normal">{actTitles[group.act]}</span>
                  </div>

                  {/* Scene items */}
                  <div className="space-y-0.5">
                    {group.scenes.map((scene) => {
                      const isCurrent = scene.id === currentScene
                      const isVisited = visited.has(scene.id)
                      const isBranch = branchTargetIds.has(scene.id)
                      const branch = branchMeta.get(scene.id)

                      return (
                        <button
                          key={scene.id}
                          ref={isCurrent ? currentRef : undefined}
                          onClick={() => handleNavigate(scene.id)}
                          aria-current={isCurrent ? 'step' : undefined}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                            isBranch && 'ml-6',
                            isCurrent
                              ? 'border-l-2 border-stripe-purple bg-stripe-purple/10 text-white'
                              : isVisited
                                ? 'text-white/70 hover:bg-white/5 hover:text-white'
                                : 'text-white/30 hover:bg-white/5 hover:text-white/50',
                          )}
                        >
                          {/* Status dot */}
                          <span
                            className={cn(
                              'h-2 w-2 shrink-0 rounded-full',
                              isCurrent
                                ? 'bg-stripe-purple shadow-[0_0_6px_rgba(99,91,255,0.5)]'
                                : isVisited
                                  ? 'bg-stripe-green'
                                  : 'border border-white/20 bg-transparent',
                            )}
                          />

                          {/* Branch emoji */}
                          {branch && <span className="text-xs">{branch.emoji}</span>}

                          {/* Title */}
                          <span className="truncate">
                            {sceneTitles[scene.id] ?? scene.id}
                          </span>

                          {/* Current badge */}
                          {isCurrent && (
                            <span className="ml-auto shrink-0 text-xs text-stripe-purple">
                              current
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
