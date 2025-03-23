'use client'

import React, { ReactNode } from 'react'
import GlobalErrorFallback from '@/components/error/GlobalErrorFallback'

interface GlobalErrorBoundaryProps {
  children: ReactNode
}

interface GlobalErrorBoundaryState {
  hasError: boolean
  error: (Error & { digest?: string; status?: number }) | null
}

class GlobalErrorBoundary extends React.Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return {
      hasError: true,
      error: error as Error & { digest?: string; status?: number },
    }
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo): void {}

  resetError = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <GlobalErrorFallback
          error={this.state.error}
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

export default GlobalErrorBoundary
