import { skills } from '../data/profile'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <SectionHeading id="skills-title" eyebrow="Skills" title="What I work with" />
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <GlassCard className="h-full p-6">
              <h3 className="text-xl">{s.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-sm">{it}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
