import { useRef, type HTMLAttributes, type ReactNode } from 'react'

// Glass card with a violet glow that follows the cursor (CSS vars --mx/--my).
export default function GlassCard({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'li' | 'aside' } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const T = Tag as any
  return (
    <T ref={ref} onPointerMove={onMove} className={`glass ${className}`} {...rest}>
      <div className="relative">{children}</div>
    </T>
  )
}
