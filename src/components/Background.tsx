import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { hasWebGL } from '../lib/env'

const NeuralBackground = lazy(() => import('./NeuralBackground'))

class Boundary extends Component<{ children: ReactNode; onFail: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFail()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function Background() {
  const [enable3d, setEnable3d] = useState(false)

  useEffect(() => {
    // Reduced motion still renders the scene; the network itself disables mouse and pulse motion.
    if (!hasWebGL()) return
    // Defer so the 3D bundle never blocks first paint.
    const start = () => setEnable3d(true)
    const w = window as any
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 400)
    return () => (w.cancelIdleCallback ? w.cancelIdleCallback(id) : clearTimeout(id))
  }, [])

  return (
    <>
      {/* Static fallback / base layer, always rendered */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-20"
        style={{
          background:
            'radial-gradient(60% 50% at 75% 30%, rgba(139,108,255,.22), transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(61,224,255,.12), transparent 70%), #070815',
        }}
      />
      <div aria-hidden="true" className="blob -left-40 top-10 h-[28rem] w-[28rem] bg-violet" />
      <div aria-hidden="true" className="blob -right-32 bottom-0 h-[26rem] w-[26rem] bg-pink" style={{ opacity: 0.22 }} />
      {enable3d && (
        <Boundary onFail={() => setEnable3d(false)}>
          <Suspense fallback={null}>
            <NeuralBackground />
          </Suspense>
        </Boundary>
      )}
    </>
  )
}
