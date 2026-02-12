import { create } from 'zustand'

type OverlayTab = 'code' | 'flow' | 'webhooks'

interface OverlayStore {
  isOpen: boolean
  activeTab: OverlayTab
  sceneId: string | null

  open: (sceneId: string, tab?: OverlayTab) => void
  close: () => void
  setTab: (tab: OverlayTab) => void
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  isOpen: false,
  activeTab: 'code',
  sceneId: null,

  open: (sceneId, tab = 'code') => set({ isOpen: true, sceneId, activeTab: tab }),
  close: () => set({ isOpen: false }),
  setTab: (tab) => set({ activeTab: tab }),
}))
