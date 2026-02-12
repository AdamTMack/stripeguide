import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Scene error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
            <div className="text-4xl">&#x26A0;&#xFE0F;</div>
            <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
            <p className="text-sm text-white/50">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded-lg bg-stripe-purple px-4 py-2 text-sm text-white hover:bg-stripe-purple/80"
            >
              Try Again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
