import { create } from 'zustand'
import type { SceneId } from '../engine/types'
import { sceneMap } from '../engine/sceneGraph'

interface NarrativeStore {
  currentScene: SceneId
  history: SceneId[]
  choices: Record<string, string>
  visited: Set<SceneId>
  direction: number

  goTo: (sceneId: SceneId) => void
  goNext: () => void
  goBack: () => void
  choose: (key: string, value: string, target: SceneId) => void
  canGoBack: () => boolean
  canGoNext: () => boolean
}

export const useNarrativeStore = create<NarrativeStore>((set, get) => ({
  currentScene: 'landing',
  history: [],
  choices: {},
  visited: new Set<SceneId>(['landing']),
  direction: 1,

  goTo: (sceneId) => {
    const { currentScene, history, visited } = get()
    set({
      currentScene: sceneId,
      history: [...history, currentScene],
      visited: new Set([...visited, sceneId]),
      direction: 1,
    })
  },

  goNext: () => {
    const { currentScene } = get()
    const node = sceneMap.get(currentScene)
    if (node?.next) {
      get().goTo(node.next)
    }
  },

  goBack: () => {
    const { history, visited } = get()
    if (history.length === 0) return
    const prev = history[history.length - 1]
    set({
      currentScene: prev,
      history: history.slice(0, -1),
      visited: new Set([...visited, prev]),
      direction: -1,
    })
  },

  choose: (key, value, target) => {
    const { choices } = get()
    set({ choices: { ...choices, [key]: value } })
    get().goTo(target)
  },

  canGoBack: () => get().history.length > 0,

  canGoNext: () => {
    const node = sceneMap.get(get().currentScene)
    return !!node?.next
  },
}))
