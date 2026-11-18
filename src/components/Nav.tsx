import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { nav } from '../data/profile'

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [active, setActive] = useState('home')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-grad-brand"
        style={{ scaleX }}
      />
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-3">
        <nav
          aria-label="Primary"
          className="glass !rounded-full !bg-[rgba(14,16,40,0.82)] max-w-full overflow-x-auto px-2 py-1.5 [scrollbar-width:none]"
        >
          <ul className="flex items-center gap-0.5">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`block whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                    active === n.id ? 'bg-white/15 text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
