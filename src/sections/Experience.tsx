import { experience } from '../data/profile'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="section">
      <SectionHeading id="exp-title" eyebrow="Experience" title="Where I’ve worked" />
      <ol className="relative space-y-6 border-l border-white/15 pl-6 sm:pl-8">
        {experience.map((e, i) => (
          <li key={e.role + e.org} className="relative">
            <span aria-hidden="true" className="absolute -left-[31px] top-7 h-3 w-3 rounded-full bg-grad-brand shadow-[0_0_14px_#8b6cff] sm:-left-[39px]" />
            <Reveal delay={i * 0.08}>
              <GlassCard className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan">{e.period}</p>
                <h3 className="mt-2 text-xl">{e.role}</h3>
                <p className="text-sm text-muted">{e.org}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
