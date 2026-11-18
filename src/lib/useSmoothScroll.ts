import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion, scrollState } from './env'

export function useSmoothScroll() {
  useEffect(() => {
    // Lenis drives the real window scroll, so window.scrollY always matches its animated value.
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollState.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // Page height can change after load (fonts, images, lazy content): recompute then too.
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    update()

    const cleanupBase = () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
    if (prefersReducedMotion()) return cleanupBase

    const lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      cleanupBase()
    }
  }, [])
}
