import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { companies } from '../data/site'
import { prefersReducedMotion } from '../lib/smooth'
import { Eyebrow } from './ui/Eyebrow'
import { Button } from './ui/Button'
import Img from './Img'

function CompanyPanel({ c, i }) {
  const right = i % 2 === 1
  return (
    <article className="company-panel relative min-h-[100dvh] overflow-hidden bg-paper">
      <Img
        img={c.image}
        alt={c.name}
        className="panel-img absolute inset-0 size-full object-cover will-change-transform"
      />
      {/* light wash from the bottom keeps the photo bright while navy type stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper/70 to-transparent" />

      <div className="relative flex min-h-[100dvh] items-end">
        <div className="shell w-full pb-20 pt-28 md:pb-28">
          <div
            className={`panel-body max-w-[640px] ${right ? 'ml-auto text-right' : 'text-left'}`}
          >
            <span className="mt-5 block text-sm font-medium uppercase tracking-[0.25em] text-azure">
              {c.sector}
            </span>
            <h3 className="mt-3 font-display text-4xl font-medium text-ink md:text-6xl lg:text-7xl">
              {c.name}
            </h3>
            <p className="mt-3 font-display text-xl text-ink-soft md:text-2xl">
              {c.tagline}
            </p>
            <p
              className={`mt-5 max-w-[46ch] text-base leading-relaxed text-ink-soft md:text-lg ${
                right ? 'ml-auto' : ''
              }`}
            >
              {c.description}
            </p>
            <div
              className={`mt-6 flex flex-wrap gap-2 ${right ? 'justify-end' : ''}`}
            >
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-soft backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className={`mt-8 flex ${right ? 'justify-end' : ''}`}>
              {c.url ? (
                <Button href={c.url} newTab variant="ghost" icon={ArrowUpRight}>
                  Visit website
                </Button>
              ) : (
                <Button routerTo={`/companies/${c.id}`} variant="ghost" icon={ArrowRight}>
                  Learn more
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Concerns() {
  const root = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.company-panel')
      // Panels scroll normally (no sticky stacking, no fades) — content only
      // leaves the screen at the top edge, like regular page content. The one
      // remaining flourish: the photo settles from a slight zoom on the way in.
      panels.forEach((panel) => {
        const image = panel.querySelector('.panel-img')
        gsap.fromTo(
          image,
          { scale: 1.16 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="companies" ref={root} className="relative scroll-mt-20 bg-paper">
      <div className="shell pb-12 pt-24 md:pt-36">
        <Eyebrow>Our Concerns</Eyebrow>
        <h2
          data-reveal
          className="mt-5 max-w-[20ch] font-display text-4xl text-ink md:text-6xl"
        >
          Five companies. One founder.
        </h2>
        <p data-reveal className="mt-6 max-w-[55ch] text-lg text-ink-soft">
          Each business stands on its own, with its own market and team. Every one
          was founded and is led by the same person, under 4M International.
        </p>
      </div>

      <div className="relative">
        {companies.map((c, i) => (
          <CompanyPanel key={c.id} c={c} i={i} />
        ))}
      </div>
    </section>
  )
}
