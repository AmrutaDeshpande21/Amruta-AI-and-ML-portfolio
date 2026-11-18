import { useEffect, useState } from 'react'
import { fallbackProjects, moreCaseStudies, type Project } from '../data/profile'
import { supabase } from '../lib/supabase'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Work() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    if (!supabase) return
    let alive = true
    supabase
      .from('projects')
      .select('id,title,status,summary,tags,flow,link')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (alive && !error && data && data.length) setProjects(data as Project[])
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <SectionHeading id="work-title" eyebrow="Work" title="Selected work" />
      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1} className="lg:col-span-2">
            <GlassCard as="article" className="h-full p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl">{p.title}</h3>
                <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                  {p.status}
                </span>
              </div>
              <p className="mt-4 text-muted">{p.summary}</p>
              <ol aria-label="Project flow" className="mt-6 grid gap-3 sm:grid-cols-3">
                {p.flow.map((s, idx) => (
                  <li key={s.name} className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <span aria-hidden="true" className="text-violet">{idx + 1}</span>{s.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">{s.detail}</p>
                  </li>
                ))}
              </ol>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-sm">{t}</li>
                ))}
              </ul>
              {p.link && (
                <a href={p.link} className="btn-ghost mt-6" target="_blank" rel="noreferrer">View project</a>
              )}
            </GlassCard>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <GlassCard className="flex h-full flex-col justify-center border-dashed p-6 sm:p-8">
            <h3 className="text-xl">More case studies coming</h3>
            <p className="mt-3 text-sm text-muted">{moreCaseStudies}</p>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
