import { motion, useReducedMotion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { Github, Linkedin } from '../components/BrandIcons'
import { profile } from '../data/profile'

export default function Hero() {
  const reduce = useReducedMotion()
  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }
  const icons = [
    { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
    { label: 'GitHub', href: profile.github, Icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, Icon: Linkedin },
  ]
  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-screen items-center">
      <motion.div
        className="mx-auto w-full max-w-6xl px-5 pt-28 sm:px-8"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: 0.1 } } }}
      >
        <motion.p variants={item} className="eyebrow">
          {profile.role}
        </motion.p>
        <h1 id="hero-title" className="mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl">
          <motion.span variants={item} className="block">{profile.headline[0]}</motion.span>
          <motion.span variants={item} className="text-grad block pb-2">{profile.headline[1]}</motion.span>
        </h1>
        <motion.p variants={item} className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          {profile.intro}
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
          <a href="#work" className="btn-primary">See my work</a>
          <a href={profile.resume} download className="btn-ghost"><Download className="h-4 w-4" aria-hidden="true" />Download resume</a>
          <a href="#contact" className="btn-ghost">Get in touch</a>
        </motion.div>
        <motion.ul variants={item} aria-label="Social links" className="mt-8 flex gap-3">
          {icons.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 transition hover:border-cyan/40 hover:bg-white/10"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </motion.ul>
        <motion.p variants={item} className="mt-6 text-sm text-muted">{profile.location}</motion.p>
      </motion.div>
    </section>
  )
}
