import { journey } from '../data/profile'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="section">
      <SectionHeading id="journey-title" eyebrow="Journey" title="How I got here" />
      <ol className="relative space-y-6 border-l border-white/15 pl-6 sm:pl-8">
        {journey.map((j, i) => (
          <li key={j.step} className="relative">
            <span aria-hidden="true" className="absolute -left-[31px] top-7 h-3 w-3 rounded-full bg-pink shadow-[0_0_14px_#ff7ad9] sm:-left-[39px]" />
            <Reveal delay={i * 0.08}>
              <GlassCard className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pink">{j.step}</p>
                <h3 className="mt-2 text-xl">{j.title}</h3>
                <p className="mt-2 text-sm text-muted">{j.text}</p>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
