export type SceneId = string

export type Emotion = 'neutral' | 'excited' | 'thinking' | 'celebrating' | 'warning' | 'winking'

export interface Branch {
  label: string
  target: SceneId
  emoji?: string
}

export interface SceneNode {
  id: SceneId
  /** Next scene (linear progression). Ignored if branches are provided. */
  next?: SceneId
  /** Branching choices shown to user */
  branches?: Branch[]
  /** Act number for progress calculation */
  act: number
  /** Scene component loaded via React.lazy */
  component: () => Promise<{ default: React.ComponentType }>
}

export interface NarrativeState {
  currentScene: SceneId
  history: SceneId[]
  choices: Record<string, string>
  /** Scenes the user has visited (for progress) */
  visited: Set<SceneId>
}
