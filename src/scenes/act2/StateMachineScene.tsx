import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Scene from '../../components/ui/Scene'
import Button from '../../components/ui/Button'
import AnimatedText from '../../components/ui/AnimatedText'
import GuidePresence from '../../components/guide/GuidePresence'
import { useSceneNavigation } from '../../engine/useSceneNavigation'
import { getDialogue } from '../../content/dialogues'

const dialogues = getDialogue('state-machine')

/** State node definition */
interface StateNode {
  id: string
  label: string
  x: number
  y: number
  color: string
}

/** Arrow connection definition */
interface StateArrow {
  from: string
  to: string
  label?: string
}

const STATES: StateNode[] = [
  { id: 'requires_payment_method', label: 'requires_payment_method', x: 50, y: 50, color: '#94a3b8' },
  { id: 'requires_confirmation', label: 'requires_confirmation', x: 280, y: 50, color: '#a78bfa' },
  { id: 'requires_action', label: 'requires_action', x: 510, y: 50, color: '#fbbf24' },
  { id: 'processing', label: 'processing', x: 395, y: 170, color: '#60a5fa' },
  { id: 'succeeded', label: 'succeeded', x: 280, y: 280, color: '#34d399' },
  { id: 'canceled', label: 'canceled', x: 560, y: 220, color: '#f87171' },
]

const ARROWS: StateArrow[] = [
  { from: 'requires_payment_method', to: 'requires_confirmation' },
  { from: 'requires_confirmation', to: 'requires_action', label: 'SCA needed' },
  { from: 'requires_confirmation', to: 'processing', label: 'no SCA' },
  { from: 'requires_action', to: 'processing', label: 'verified' },
  { from: 'requires_action', to: 'canceled', label: 'failed / canceled' },
  { from: 'processing', to: 'succeeded' },
  { from: 'requires_action', to: 'requires_payment_method', label: 'retry' },
]

/** The happy-path order for auto-highlighting */
const HAPPY_PATH = [
  'requires_payment_method',
  'requires_confirmation',
  'requires_action',
  'processing',
  'succeeded',
]

/** Calculate center of a node for arrow endpoints */
function nodeCenter(node: StateNode): { cx: number; cy: number } {
  return { cx: node.x + 65, cy: node.y + 18 }
}

function StatePill({
  node,
  isActive,
  delay,
}: {
  node: StateNode
  isActive: boolean
  delay: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {/* Glow when active */}
      {isActive && (
        <motion.rect
          x={node.x - 4}
          y={node.y - 4}
          width={134}
          height={44}
          rx={22}
          fill={node.color}
          fillOpacity={0.15}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Pill background */}
      <rect
        x={node.x}
        y={node.y}
        width={126}
        height={36}
        rx={18}
        fill={isActive ? node.color : '#1e293b'}
        fillOpacity={isActive ? 0.25 : 1}
        stroke={isActive ? node.color : '#334155'}
        strokeWidth={isActive ? 2 : 1}
      />

      {/* Label text */}
      <text
        x={node.x + 63}
        y={node.y + 22}
        textAnchor="middle"
        fontSize={9}
        fontFamily="ui-monospace, monospace"
        fill={isActive ? '#ffffff' : '#94a3b8'}
        fontWeight={isActive ? 600 : 400}
      >
        {node.label}
      </text>
    </motion.g>
  )
}

function Arrow({
  from,
  to,
  label,
  delay,
  isActive,
}: {
  from: StateNode
  to: StateNode
  label?: string
  delay: number
  isActive: boolean
}) {
  const start = nodeCenter(from)
  const end = nodeCenter(to)

  // Calculate angle for arrowhead
  const dx = end.cx - start.cx
  const dy = end.cy - start.cy
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len

  // Offset start and end to pill edges
  const sx = start.cx + ux * 68
  const sy = start.cy + uy * 20
  const ex = end.cx - ux * 68
  const ey = end.cy - uy * 20

  // Midpoint for label
  const mx = (sx + ex) / 2
  const my = (sy + ey) / 2

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <line
        x1={sx}
        y1={sy}
        x2={ex}
        y2={ey}
        stroke={isActive ? '#8b5cf6' : '#334155'}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray={isActive ? '0' : '4 3'}
      />
      {/* Arrowhead */}
      <polygon
        points={`${ex},${ey} ${ex - ux * 8 - uy * 4},${ey - uy * 8 + ux * 4} ${ex - ux * 8 + uy * 4},${ey - uy * 8 - ux * 4}`}
        fill={isActive ? '#8b5cf6' : '#334155'}
      />
      {/* Label */}
      {label && (
        <text
          x={mx}
          y={my - 6}
          textAnchor="middle"
          fontSize={8}
          fill={isActive ? '#c4b5fd' : '#475569'}
        >
          {label}
        </text>
      )}
    </motion.g>
  )
}

export default function StateMachineScene() {
  const { goNext } = useSceneNavigation()
  const [dialogIndex, setDialogIndex] = useState(0)
  const [dialogDone, setDialogDone] = useState(false)
  const [activeStateIndex, setActiveStateIndex] = useState(0)

  // Auto-cycle through happy path
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStateIndex((prev) => (prev + 1) % HAPPY_PATH.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const activeStateId = HAPPY_PATH[activeStateIndex]

  const handleDialogComplete = useCallback(() => {
    if (dialogIndex < dialogues.length - 1) {
      setDialogIndex((i) => i + 1)
    } else {
      setDialogDone(true)
    }
  }, [dialogIndex])

  const currentLine = dialogues[dialogIndex]

  // Determine which arrows are on the active path
  const activeArrows = new Set<string>()
  if (activeStateIndex > 0) {
    for (let i = 0; i < activeStateIndex; i++) {
      activeArrows.add(`${HAPPY_PATH[i]}->${HAPPY_PATH[i + 1]}`)
    }
  }

  return (
    <Scene>
      <AnimatedText
        as="h2"
        className="mb-2 text-center text-sm font-medium uppercase tracking-widest text-violet-400/60"
      >
        The Lifecycle
      </AnimatedText>
      <AnimatedText
        as="h1"
        className="mb-8 text-center text-4xl font-bold text-white"
        delay={0.15}
      >
        PaymentIntent State Machine
      </AnimatedText>

      {/* SVG state machine diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-10 flex justify-center"
      >
        <svg
          viewBox="0 0 700 340"
          className="w-full max-w-2xl"
          style={{ overflow: 'visible' }}
        >
          {/* Render arrows first (behind nodes) */}
          {ARROWS.map((arrow, i) => {
            const fromNode = STATES.find((s) => s.id === arrow.from)!
            const toNode = STATES.find((s) => s.id === arrow.to)!
            const arrowKey = `${arrow.from}->${arrow.to}`
            return (
              <Arrow
                key={arrowKey}
                from={fromNode}
                to={toNode}
                label={arrow.label}
                delay={0.5 + i * 0.08}
                isActive={activeArrows.has(arrowKey)}
              />
            )
          })}

          {/* Render state nodes */}
          {STATES.map((node, i) => (
            <StatePill
              key={node.id}
              node={node}
              isActive={node.id === activeStateId}
              delay={0.4 + i * 0.1}
            />
          ))}
        </svg>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mx-auto mb-10 flex max-w-lg flex-wrap justify-center gap-3"
      >
        {[
          { color: '#94a3b8', label: 'Awaiting input' },
          { color: '#a78bfa', label: 'Ready to confirm' },
          { color: '#fbbf24', label: 'Needs verification' },
          { color: '#60a5fa', label: 'Processing' },
          { color: '#34d399', label: 'Succeeded' },
          { color: '#f87171', label: 'Canceled' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-white/50">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Guide dialogue */}
      {currentLine && (
        <div className="mb-8">
          <GuidePresence
            text={currentLine.text}
            emotion={currentLine.emotion}
            onComplete={handleDialogComplete}
          />
        </div>
      )}

      {/* Continue button */}
      {dialogDone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button onClick={goNext}>Continue</Button>
        </motion.div>
      )}
    </Scene>
  )
}
