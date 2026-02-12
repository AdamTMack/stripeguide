import { create } from 'zustand'

interface NavPanelStore {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useNavPanelStore = create<NavPanelStore>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}))
