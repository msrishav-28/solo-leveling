import React from 'react';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('System boundary captured an error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void p-6 text-foreground">
        <div className="pointer-events-none fixed inset-0 bg-grid-threat opacity-40" />
        <div className="pointer-events-none fixed inset-0 bg-vignette" />
        <div className="pointer-events-none fixed inset-0 bg-noise" />
        <div className="glass scanline relative z-10 w-full max-w-xl p-8 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-threat">Critical System Fault</div>
          <h1 className="font-display text-glow-threat mt-5 text-4xl text-threat sm:text-6xl">Gate Collapse</h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground/65">
            The interface hit an unrecoverable state. Reloading will restart the current system session.
          </p>
          {this.state.error?.message && (
            <pre className="mt-6 overflow-auto border border-threat/20 bg-black/40 p-4 text-left font-mono text-xs text-threat/75">
              {this.state.error.message}
            </pre>
          )}
          <Button className="mt-8" variant="destructive" onClick={() => window.location.reload()}>
            Reload System
          </Button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
