import SceneRenderer from './engine/SceneRenderer'
import ProgressBar from './components/navigation/ProgressBar'
import NavPanel from './components/navigation/NavPanel'
import NavPanelTrigger from './components/navigation/NavPanelTrigger'
import PeekButton from './components/overlays/PeekButton'
import TechOverlay from './components/overlays/TechOverlay'
import ErrorBoundary from './components/ui/ErrorBoundary'
import { useSceneNavigation } from './engine/useSceneNavigation'

function NavButtons() {
  const { goBack, canGoBack } = useSceneNavigation()

  if (!canGoBack) return null

  return (
    <button
      onClick={goBack}
      aria-label="Go back"
      className="fixed bottom-6 left-4 z-30 rounded-full border border-white/10 bg-slate-900/90 px-3 py-2 text-sm text-white/50 backdrop-blur-sm transition-colors hover:text-white"
    >
      &larr; Back
    </button>
  )
}

export default function App() {
  // Registers keyboard listeners (arrow keys)
  useSceneNavigation()

  return (
    <ErrorBoundary>
      <div className="relative h-full w-full bg-slate-950 text-white">
        <ProgressBar />
        <SceneRenderer />
        <NavButtons />
        <NavPanelTrigger />
        <PeekButton />
        <TechOverlay />
        <NavPanel />
      </div>
    </ErrorBoundary>
  )
}
