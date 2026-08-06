import { useEffect, useRef } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { companies } from '../data/site'
import { useReveals } from '../lib/useReveals'
import { useSectionNav } from '../lib/useSectionNav'
import Img from '../components/Img'

export default function HardwarePage() {
  const company = companies.find((c) => c.id === 'hardware-sanitary')
  const offeredRef = useRef(null)
  const { goSection } = useSectionNav()
  useReveals([])

  useEffect(() => {
    if (!offeredRef.current) return
    const items = offeredRef.current.querySelectorAll('.offering-item')
    items.forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        delay: i * 0.08,
      })
    })
  }, [])

  if (!company?.page) return null

  return (
    <main>
      {/* Back link */}
      <div className="fixed left-4 top-20 z-40 lg:left-8">
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={18} weight="bold" />
          Back
        </Link>
      </div>

      {/* Hero with industrial grid background */}
      <section className="relative min-h-[70vh] overflow-hidden bg-paper pt-32">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f97316" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="shell relative z-10">
          <div className="max-w-[600px]">
            <span className="inline-block px-4 py-2 rounded-sm bg-orange-100 text-orange-700 text-sm font-medium mb-6 uppercase tracking-wider">
              Hardware & Sanitaryware
            </span>
            <h1 className="font-display text-6xl lg:text-7xl text-ink leading-tight font-medium">
              {company.name}
            </h1>
            <p className="mt-8 text-xl text-ink-soft max-w-[500px] font-medium">
              {company.page.intro[0]}
            </p>
          </div>
        </div>
      </section>

      {/* Structured two-column section */}
      <section className="relative py-20 md:py-32 bg-surface border-t-2 border-b-2 border-orange-100">
        <div className="shell">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-5xl text-ink">
                Built to last
              </h2>
              <div className="space-y-6">
                {company.page.intro.map((p, i) => (
                  <p key={i} className="text-lg text-ink-soft leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-orange-50 rounded-xl" />
              <div className="relative h-[450px] rounded-lg overflow-hidden border-4 border-orange-200">
                <Img
                  img={company.page.gallery[0]}
                  alt="Hardware display"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings in strict grid */}
      <section ref={offeredRef} className="relative py-20 md:py-32 bg-paper">
        <div className="shell">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">
            Our offerings
          </h2>
          <p className="text-ink-soft mb-16 max-w-[500px]">
            Comprehensive solutions for construction, household, and commercial needs
          </p>

          <div className="grid md:grid-cols-2 gap-0 border border-orange-200">
            {company.page.offerings.map((offering, i) => (
              <div
                key={i}
                className="offering-item p-8 border-r border-b border-orange-200 last:border-b-0 md:last:border-r-0"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-orange-600">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink mb-3">
                  {offering.title}
                </h3>
                <p className="text-ink-soft mb-4">{offering.body}</p>
                <div className="text-sm text-ink-mute space-y-2">
                  {i === 0 && (
                    <>
                      <p>From hand tools and power equipment to fasteners and safety gear, our comprehensive hardware range serves professionals and homeowners alike. We stock branded and reliable options for every project scale and budget.</p>
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <p>Complete bathroom and sanitary solutions including fixtures, ceramics, and accessories that blend functionality with modern design. Our range accommodates all budget segments while maintaining quality standards across the board.</p>
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <p>Comprehensive piping systems and plumbing fixtures for residential, commercial, and industrial applications. We supply PVC, copper, and steel solutions with expert guidance on material selection for optimal performance and longevity.</p>
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <p>Bulk supply agreements tailored for contractors and retailers who need consistent, reliable inventory. Our logistics ensure timely delivery and competitive pricing for high-volume orders, supporting your business growth.</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery in strict grid */}
      <section className="relative py-20 md:py-32 bg-surface border-t-2 border-orange-100">
        <div className="shell">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">
            Products & supplies
          </h2>
          <p className="text-ink-soft mb-16">
            From everyday essentials to complete installation systems
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {company.page.gallery.map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg bg-orange-50 border-2 border-orange-100 aspect-square hover:border-orange-300 transition-all duration-300"
              >
                <Img
                  img={img}
                  alt={`Product ${i + 1}`}
                  className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with orange accent */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-orange-50 to-paper border-t-4 border-orange-200">
        <div className="shell text-center">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">
            Let's build something great
          </h2>
          <p className="text-lg text-ink-soft mb-10 max-w-[600px] mx-auto">
            Whether you're a contractor, retailer, or homeowner, we have the right solution.
          </p>
          <button
            onClick={() => goSection('#contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            Start a project
          </button>
        </div>
      </section>
    </main>
  )
}
