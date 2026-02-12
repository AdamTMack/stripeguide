import { useCallback, useEffect } from 'react'
import { useNarrativeStore } from '../store/narrativeStore'
import { useNavPanelStore } from '../store/navPanelStore'
import { sceneMap } from './sceneGraph'

export function useSceneNavigation() {
  const { currentScene, goNext, goBack, goTo, choose, canGoBack, canGoNext } =
    useNarrativeStore()

  const scene = sceneMap.get(currentScene)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Toggle nav panel with 'm'
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        useNavPanelStore.getState().toggle()
        return
      }

      // Suppress scene navigation while nav panel is open
      if (useNavPanelStore.getState().isOpen) return

      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (canGoNext()) {
          e.preventDefault()
          goNext()
        }
      } else if (e.key === 'ArrowLeft') {
        if (canGoBack()) {
          e.preventDefault()
          goBack()
        }
      }
    },
    [canGoBack, canGoNext, goBack, goNext],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    currentScene,
    scene,
    goNext,
    goBack,
    goTo,
    choose,
    canGoBack: canGoBack(),
    canGoNext: canGoNext(),
    hasBranches: !!scene?.branches?.length,
    branches: scene?.branches ?? [],
  }
}
