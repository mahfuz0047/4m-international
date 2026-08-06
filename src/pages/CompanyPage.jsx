import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import { companies } from '../data/site'
import { setPending } from '../lib/smooth'
import { useReveals } from '../lib/useReveals'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Button } from '../components/ui/Button'
import Img from '../components/Img'

export default function CompanyPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  useReveals([slug])

  const c = companies.find((x) => x.id === slug)
  // External companies (with their own site) and unknown slugs go home.
  if (!c || !c.page) return <Navigate to="/" replace />

  const shortName = c.name.replace(' Ltd', '')
  const goContact = () => {
    setPending('#contact')
    navigate('/')
  }
  const goCompanies = () => {
    setPending('#companies')
    navigate('/')
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[78vh] w-full overflow-hidden bg-paper">
        <Img
          img={c.image}
          alt={c.name}
          eager
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-paper via-paper/65 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-paper/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
        <div className="relative z-10 flex min-h-[78vh] items-end">
          <div className="shell w-full pb-16 pt-32">
            <button
              onClick={goCompanies}
              className="mb-6 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-azure"
            >
              <ArrowLeft weight="bold" className="size-4" /> Back to 4M International
            </button>
            <span className="block text-sm font-medium uppercase tracking-[0.25em] text-azure">
              {c.sector}
            </span>
            <h1 className="mt-3 max-w-[16ch] font-display text-5xl font-medium text-ink md:text-7xl">
              {c.name}
            </h1>
            <p className="mt-4 max-w-[48ch] text-lg text-ink-soft md:text-xl">
              {c.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={goContact} icon={ArrowRight}>
                Get in touch
              </Button>
              <Button routerTo="/" variant="ghost">
                Explore the group
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-paper">
        <div className="shell py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Overview</Eyebrow>
              </div>
            </div>
            <div className="max-w-[62ch] space-y-6 lg:col-span-8">
              {c.page.intro.map((p, i) => (
                <p data-reveal key={i} className="text-xl leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              <div data-reveal className="flex flex-wrap gap-2 pt-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-y border-line bg-surface">
        <div className="shell py-24 md:py-32">
          <Eyebrow>What we do</Eyebrow>
          <h2
            data-reveal
            className="mt-5 max-w-[20ch] font-display text-4xl text-ink md:text-5xl"
          >
            Capabilities across {shortName}.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {c.page.offerings.map((o, i) => (
              <div
                data-reveal
                key={i}
                className="rounded-2xl border border-line bg-paper p-7"
              >
                <span className="font-display text-lg font-medium text-azure">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-2xl text-ink">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-paper">
        <div className="shell pb-24 md:pb-32">
          <div className="grid gap-5 md:grid-cols-3">
            {c.page.gallery.map((g, i) => (
              <div
                data-reveal
                key={i}
                className="aspect-[4/5] overflow-hidden rounded-2xl border border-line"
              >
                <Img img={g} alt={`${c.name} ${i + 1}`} className="size-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-line bg-surface-2">
        <div className="shell py-20 text-center md:py-28">
          <h2
            data-reveal
            className="mx-auto max-w-[20ch] font-display text-4xl text-ink md:text-5xl"
          >
            Work with {shortName}.
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-[44ch] text-ink-soft">
            Tell us what you need and the 4M International team will connect you with
            the right people.
          </p>
          <div data-reveal className="mt-8 flex justify-center">
            <Button onClick={goContact} icon={ArrowRight}>
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
