import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SceneProps {
  children: ReactNode
  className?: string
  centered?: boolean
}

export default function Scene({ children, className, centered = true }: SceneProps) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-y-auto px-6 py-12 md:px-12 lg:px-24',
        centered && 'flex flex-col items-center justify-center',
        className
      )}
    >
      <div className="mx-auto w-full max-w-4xl">{children}</div>
    </div>
  )
}
