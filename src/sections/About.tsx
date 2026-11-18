import { credentials, profile, yearsExperience } from '../data/profile'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <SectionHeading id="about-title" eyebrow="About" title={profile.aboutTitle} />
      <div className="grid items-center gap-10 md:grid-cols-[1fr_260px]">
        <Reveal className="max-w-2xl space-y-4 text-muted">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
        <Reveal delay={0.1} className="order-first mx-auto w-52 md:order-none md:w-full">
          <div className="rounded-glass bg-grad-brand p-[2px] shadow-[0_0_60px_rgba(139,108,255,.35)]">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={280}
              height={280}
              loading="lazy"
              className="aspect-square w-full rounded-[20px] object-cover"
            />
          </div>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {credentials.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.1}>
            <GlassCard className="h-full p-6">
              <p className="text-grad font-heading text-3xl font-bold">
                {c.value === 'years' ? `${yearsExperience}+` : c.value}
              </p>
              <p className="mt-2 text-sm text-muted">{c.label}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
