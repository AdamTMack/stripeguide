import { scenes } from './sceneGraph'
import type { Branch, SceneNode } from './types'

export interface ActGroup {
  act: number
  scenes: SceneNode[]
}

/** Scenes grouped by act, in scene-graph order */
export const actGroups: ActGroup[] = (() => {
  const groups: ActGroup[] = []
  let currentAct = -1
  for (const scene of scenes) {
    if (scene.act !== currentAct) {
      groups.push({ act: scene.act, scenes: [] })
      currentAct = scene.act
    }
    groups[groups.length - 1].scenes.push(scene)
  }
  return groups
})()

/** Set of scene IDs that are branch targets (not on the main linear path) */
export const branchTargetIds = new Set(
  scenes.flatMap((s) => s.branches?.map((b) => b.target) ?? []),
)

/** Map from branch target ID → Branch metadata (label, emoji) */
export const branchMeta = new Map<string, Branch>(
  scenes.flatMap(
    (s) => s.branches?.map((b) => [b.target, b] as const) ?? [],
  ),
)
