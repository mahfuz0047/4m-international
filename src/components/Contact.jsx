import { useState } from 'react'
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react'
import { contact } from '../data/site'
import { Eyebrow } from './ui/Eyebrow'

const FIELDS = [
  { k: 'name', label: 'Name', type: 'text', required: true },
  { k: 'email', label: 'Email', type: 'email', required: true },
  { k: 'phone', label: 'Phone', type: 'tel' },
  { k: 'company', label: 'Company', type: 'text' },
]

const empty = { name: '', email: '', phone: '', company: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      er.email = 'Enter a valid email address.'
    if (!form.message.trim()) er.message = 'Tell us a little about your enquiry.'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      if (contact.formEndpoint) {
        const res = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('request failed')
      } else {
        const body = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Company: ${form.company}`,
          '',
          form.message,
        ].join('\r\n')
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          'Enquiry from 4M International website',
        )}&body=${encodeURIComponent(body)}`
      }
      setStatus('sent')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-ink placeholder:text-ink-mute outline-none transition-colors focus:border-azure focus:bg-surface'

  const details = [
    { icon: EnvelopeSimple, label: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, '')}` },
    { icon: MapPin, label: contact.address.join(', '), href: null },
  ]

  return (
    <section id="contact" className="relative scroll-mt-20 bg-paper">
      <div className="shell py-24 md:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left: invitation + details */}
          <div className="lg:col-span-5">
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h2
              data-reveal
              className="mt-5 max-w-[14ch] text-balance font-display text-4xl text-ink md:text-5xl lg:text-6xl"
            >
              {contact.title}
            </h2>
            <p data-reveal className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              {contact.body}
            </p>

            <ul data-reveal className="mt-10 space-y-5">
              {details.map((d, i) => {
                const Icon = d.icon
                const content = (
                  <span className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-azure">
                      <Icon size={18} weight="bold" />
                    </span>
                    <span className="pt-2.5 text-base text-ink">{d.label}</span>
                  </span>
                )
                return (
                  <li key={i}>
                    {d.href ? (
                      <a href={d.href} className="group block transition-colors hover:text-azure">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <div className="flex h-full min-h-[320px] flex-col items-start justify-center rounded-2xl border border-line bg-surface p-10 shadow-xl shadow-ink/5">
                <CheckCircle size={48} weight="fill" className="text-azure" />
                <h3 className="mt-5 font-display text-3xl text-ink">Thank you.</h3>
                <p className="mt-3 max-w-[40ch] text-ink-soft">
                  Your message is on its way. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-azure link-sweep"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                noValidate
                className="rounded-2xl border border-line bg-surface p-6 shadow-xl shadow-ink/5 md:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {FIELDS.map((f) => (
                    <div key={f.k} className="flex flex-col gap-2">
                      <label htmlFor={f.k} className="text-sm text-ink-soft">
                        {f.label}
                        {f.required && <span className="text-azure"> *</span>}
                      </label>
                      <input
                        id={f.k}
                        type={f.type}
                        value={form[f.k]}
                        onChange={set(f.k)}
                        className={inputCls}
                        placeholder={f.label}
                        aria-invalid={!!errors[f.k]}
                      />
                      {errors[f.k] && (
                        <span className="text-sm text-red-600">{errors[f.k]}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-ink-soft">
                    Message<span className="text-azure"> *</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputCls} resize-none`}
                    placeholder="How can we help?"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <span className="text-sm text-red-600">{errors.message}</span>
                  )}
                </div>

                {status === 'error' && (
                  <p className="mt-4 text-sm text-red-600">
                    Something went wrong. Please email us directly at {contact.email}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-azure px-7 py-3.5 text-sm font-medium text-white shadow-sm shadow-azure/20 transition-all duration-300 hover:bg-azure-bright active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <ArrowRight
                    weight="bold"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
