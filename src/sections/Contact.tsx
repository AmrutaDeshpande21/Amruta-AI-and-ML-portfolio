import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { z } from 'zod'
import { Github, Linkedin } from '../components/BrandIcons'
import { display, profile } from '../data/profile'
import { supabase } from '../lib/supabase'
import GlassCard from '../components/GlassCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  message: z.string().trim().min(10, 'Your message should be at least 10 characters.').max(2000),
})

type Status = 'idle' | 'sending' | 'success' | 'error'
const field =
  'mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/60'

const placeholders = { name: 'Your name', email: 'you@example.com', message: 'Tell me about the role or project…' }

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: 'GitHub', value: display(profile.github), href: profile.github, Icon: Github },
    { label: 'LinkedIn', value: display(profile.linkedin), href: profile.linkedin, Icon: Linkedin },
  ]

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('website')) {
      // Honeypot filled: pretend success, send nothing.
      setStatus('success')
      return
    }
    const parsed = schema.safeParse({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message') })
    if (!parsed.success) {
      const errs: Record<string, string> = {}
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message))
      setErrors(errs)
      setStatus('idle')
      return
    }
    setErrors({})
    if (!supabase) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const { error } = await supabase.from('messages').insert(parsed.data)
    if (error) setStatus('error')
    else {
      setStatus('success')
      form.reset()
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section pb-32">
      <SectionHeading id="contact-title" eyebrow="Contact" title="Let’s build something useful">
        {profile.contactText}
      </SectionHeading>
      <div className="grid items-stretch gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3 [&>*]:h-full">
          <GlassCard className="h-full p-6 sm:p-8">
            <form onSubmit={onSubmit} noValidate aria-describedby="form-status">
              {/* Honeypot: hidden from users and assistive tech */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              {(['name', 'email', 'message'] as const).map((f) => (
                <div key={f} className="mb-5">
                  <label htmlFor={f} className="text-sm font-medium capitalize">{f}</label>
                  {f === 'message' ? (
                    <textarea id={f} name={f} rows={5} placeholder={placeholders[f]} className={field} aria-invalid={!!errors[f]} aria-describedby={errors[f] ? `${f}-err` : undefined} />
                  ) : (
                    <input id={f} name={f} type={f === 'email' ? 'email' : 'text'} placeholder={placeholders[f]} autoComplete={f} className={field} aria-invalid={!!errors[f]} aria-describedby={errors[f] ? `${f}-err` : undefined} />
                  )}
                  {errors[f] && <p id={`${f}-err`} className="mt-1 text-sm text-pink">{errors[f]}</p>}
                </div>
              ))}
              <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <div id="form-status" role="status" aria-live="polite" className="mt-4">
                {status === 'success' && (
                  <p className="rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-3 text-sm text-cyan">
                    ✓ Message sent. Thank you — I’ll get back to you within a day or two.
                  </p>
                )}
                {status === 'error' && (
                  <p className="rounded-xl border border-pink/40 bg-pink/10 px-4 py-3 text-sm text-pink">
                    Sorry, your message couldn’t be sent. Please try again or email me at {profile.email}.
                  </p>
                )}
              </div>
            </form>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2 [&>*]:h-full">
          <GlassCard as="aside" className="h-full p-6 sm:p-8">
            <div className="flex h-full flex-col gap-3">
              <h3 className="text-xl">Reach me directly</h3>
              <p className="text-sm text-muted">I usually reply within a day or two.</p>
              <ul className="mt-2 grid gap-3">
                {links.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan/40 hover:bg-white/10"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-muted">{label}</span>
                        <span className="block truncate font-medium">{value}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-auto flex items-center gap-2 pt-4 text-sm text-muted">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {profile.location}
              </p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
