import { useEffect, useRef } from 'react'
import { ArrowLeft, Globe } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { companies } from '../data/site'
import { useReveals } from '../lib/useReveals'
import { useSectionNav } from '../lib/useSectionNav'
import Img from '../components/Img'

export default function TradingPage() {
  const company = companies.find((c) => c.id === 'trading')
  const galleryRef = useRef(null)
  const { goSection } = useSectionNav()
  useReveals([])

  useEffect(() => {
    if (!galleryRef.current) return
    const images = galleryRef.current.querySelectorAll('.gallery-card')
    images.forEach((img, i) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top 75%',
          once: true,
        },
        opacity: 0,
        x: (i % 2 === 0 ? -40 : 40),
        duration: 0.8,
        delay: i * 0.15,
      })
    })
  }, [])

  if (!company?.page) return null

  return (
    <main>
      {/* Back link */}
      <div className="fixed left-4 top-20 z-40 lg:left-8">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={18} weight="bold" />
          Back
        </button>
      </div>

      {/* Hero with dynamic gradient */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-blue-50 via-paper to-cyan-50 pt-32">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

        <div className="shell relative z-10">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Globe size={16} weight="bold" />
              Trading & Distribution
            </div>
            <h1 className="font-display text-6xl lg:text-7xl text-ink leading-tight">
              {company.name}
            </h1>
            <p className="mt-8 text-xl text-ink-soft max-w-[550px]">
              Connecting global suppliers with local markets across borders and continents.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic intro with flow */}
      <section className="relative py-20 md:py-32 bg-paper">
        <div className="shell">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-6 leading-tight">
                Sourcing the world
              </h2>
              <div className="space-y-4 text-ink-soft">
                {company.page.intro.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="h-64 rounded-xl overflow-hidden border-2 border-blue-100 bg-blue-50">
                  <Img
                    img={company.page.gallery[0]}
                    alt="Global logistics"
                    className="size-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-xl overflow-hidden border-2 border-cyan-100 bg-cyan-50 mt-8">
                  <Img
                    img={company.page.gallery[1]}
                    alt="Distribution network"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings with dynamic cards */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-blue-50/30 via-paper to-cyan-50/30">
        <div className="shell">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-16">
            Global capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.page.offerings.map((offering, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-xl bg-white border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <h3 className="font-display text-xl text-ink mb-3 group-hover:text-blue-600 transition-colors">
                    {offering.title}
                  </h3>
                  <p className="text-sm text-ink-soft mb-3">{offering.body}</p>
                  <div className="text-xs text-ink-mute space-y-2">
                    {i === 0 && (
                      <>
                        <p>We maintain established relationships with reliable international suppliers and shipping partners. Our import/export expertise covers documentation, compliance, and customs procedures, enabling seamless cross-border transactions with full transparency and tracking.</p>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <p>Through strategic vendor partnerships and market intelligence, we identify and source products that meet quality standards and price competitiveness. Our procurement team negotiates bulk agreements, ensuring you get the best value at scale.</p>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <p>Our nationwide distribution network reaches every corner of Bangladesh with efficient logistics. Real-time tracking systems and multiple warehousing hubs ensure on-time delivery and inventory availability across your markets.</p>
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <p>Dedicated wholesale supply programs with flexible payment terms and volume discounts support retailers and businesses at any scale. Our supply chain reliability means you can focus on sales while we manage inventory and delivery.</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-400 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staggered gallery */}
      <section ref={galleryRef} className="relative py-20 md:py-32 bg-paper">
        <div className="shell">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-16">
            Scale & reach
          </h2>

          <div className="space-y-8">
            {company.page.gallery.map((img, i) => (
              <div
                key={i}
                className="gallery-card group"
              >
                <div
                  className={`flex gap-12 items-center ${
                    i % 2 === 1 ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative h-72 rounded-xl overflow-hidden border-3 border-blue-200 bg-blue-50">
                        <Img
                          img={img}
                          alt={`Trading operation ${i + 1}`}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-display font-bold text-xl mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-display text-2xl text-ink mb-4">
                      {['Container shipping', 'Warehouse network', 'Last-mile delivery'][i]}
                    </h3>
                    <p className="text-ink-soft text-lg leading-relaxed">
                      {['Moving goods across oceans with trusted partners and transparent tracking.',
                        'Strategic hubs across the country ensuring efficient distribution.',
                        'Reliable delivery systems reaching every corner of local markets.'][i]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with dynamic gradient */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white">
        <div className="shell text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Ready to expand globally?
          </h2>
          <p className="text-xl mb-10 max-w-[600px] mx-auto text-blue-50">
            Partner with us to source products at scale and reach markets worldwide.
          </p>
          <button
            onClick={() => goSection('#contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-blue-50 text-blue-600 font-medium rounded-full transition-colors"
          >
            Explore partnerships
          </button>
        </div>
      </section>
    </main>
  )
}
