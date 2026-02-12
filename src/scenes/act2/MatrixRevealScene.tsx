import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'
import { matrixData, apiOptions, uiOptions } from '../../content/comparisonData'

const dialogue = getDialogue('matrix-reveal')

/**
 * Animation stages:
 * 0 - Nothing visible (initial)
 * 1 - API row labels appear (vertical axis)
 * 2 - UI column headers appear (horizontal axis)
 * 3..8 - Cells reveal one by one (6 cells total)
 * 9 - Insight text appears
 */
const TOTAL_CELLS = apiOptions.length * uiOptions.length
const STAGE_ROW_LABELS = 1
const STAGE_COL_HEADERS = 2
const STAGE_FIRST_CELL = 3
const STAGE_INSIGHT = STAGE_FIRST_CELL + TOTAL_CELLS

function getCellData(apiLabel: string, uiLabel: string) {
  return matrixData.find((c) => c.apiLabel === apiLabel && c.uiLabel === uiLabel)
}

export default function MatrixRevealScene() {
  const { goNext } = useSceneNavigation()
  const [stage, setStage] = useState(0)

  // Staged reveal: advance through stages with timed delays
  useEffect(() => {
    if (stage >= STAGE_INSIGHT) return

    const delays: Record<number, number> = {
      0: 600,    // Pause before row labels
      1: 800,    // Row labels visible, pause before col headers
      2: 700,    // Col headers visible, pause before first cell
    }
    // Cells reveal with 400ms between each
    const delay = delays[stage] ?? 400

    const timer = setTimeout(() => setStage((s) => s + 1), delay)
    return () => clearTimeout(timer)
  }, [stage])

  const isCellVisible = (rowIdx: number, colIdx: number) => {
    const cellOrder = rowIdx * uiOptions.length + colIdx
    return stage >= STAGE_FIRST_CELL + cellOrder
  }

  return (
    <Scene>
      <div className="flex flex-col items-center gap-8">
        <AnimatedText as="h2" className="text-3xl font-bold text-white md:text-4xl" gradient>
          The Compatibility Matrix
        </AnimatedText>

        {/* Matrix container */}
        <div className="w-full overflow-x-auto">
          <div className="mx-auto min-w-[540px] max-w-2xl">
            {/* Grid: 1 label column + 3 data columns */}
            <div
              className="grid gap-px"
              style={{
                gridTemplateColumns: `160px repeat(${uiOptions.length}, 1fr)`,
                gridTemplateRows: `auto repeat(${apiOptions.length}, 1fr)`,
              }}
            >
              {/* Top-left empty corner */}
              <div className="p-3" />

              {/* Column headers (UI options) */}
              {uiOptions.map((ui, colIdx) => (
                <AnimatePresence key={ui}>
                  {stage >= STAGE_COL_HEADERS && (
                    <motion.div
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: colIdx * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-end justify-center p-3"
                    >
                      <span className="text-center text-xs font-semibold leading-tight text-emerald-400 sm:text-sm">
                        {ui}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}

              {/* Rows */}
              {apiOptions.map((api, rowIdx) => (
                <>
                  {/* Row label (API option) */}
                  <AnimatePresence key={`label-${api}`}>
                    {stage >= STAGE_ROW_LABELS && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: rowIdx * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center p-3"
                      >
                        <span className="text-sm font-semibold text-indigo-300">{api}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cells */}
                  {uiOptions.map((ui, colIdx) => {
                    const cell = getCellData(api, ui)
                    const visible = isCellVisible(rowIdx, colIdx)

                    return (
                      <div key={`${api}-${ui}`} className="flex items-center justify-center p-2">
                        <AnimatePresence>
                          {visible && cell && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 20,
                              }}
                              className={`flex h-20 w-full flex-col items-center justify-center rounded-xl border sm:h-24 ${
                                cell.supported
                                  ? 'border-green-500/30 bg-green-500/10'
                                  : 'border-red-500/20 bg-red-500/5'
                              }`}
                            >
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 15,
                                  delay: 0.1,
                                }}
                                className="text-2xl"
                              >
                                {cell.supported ? '✅' : '❌'}
                              </motion.span>
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className={`mt-1 px-1 text-center text-[10px] leading-tight sm:text-xs ${
                                  cell.supported ? 'text-green-300/70' : 'text-red-300/50'
                                }`}
                              >
                                {cell.note}
                              </motion.span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Key insight */}
        <AnimatePresence>
          {stage >= STAGE_INSIGHT && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl"
            >
              <div className="relative overflow-hidden rounded-2xl border border-indigo-400/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 px-6 py-5">
                {/* Animated gradient shimmer */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
                />
                <p className="relative text-center text-base font-semibold text-white md:text-lg">
                  The API choice and UI choice are completely independent decisions!
                </p>
                <p className="relative mt-2 text-center text-sm text-white/50">
                  Checkout Sessions works with all three UIs. Payment Intents pairs only with Payment
                  Element.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <GuidePresence
          text={dialogue[0]?.text ?? ''}
          emotion={dialogue[0]?.emotion}
        />

        {stage >= STAGE_INSIGHT && <Button onClick={goNext}>Continue to Act 3</Button>}
      </div>
    </Scene>
  )
}
