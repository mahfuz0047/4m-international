import { useEffect, useRef } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { companies } from '../data/site'
import { useReveals } from '../lib/useReveals'
import { useSectionNav } from '../lib/useSectionNav'
import Img from '../components/Img'

export default function AgroPage() {
  const company = companies.find((c) => c.id === 'agro')
  const galleryRef = useRef(null)
  const { goSection } = useSectionNav()
  useReveals([])

  useEffect(() => {
    if (!galleryRef.current) return
    const images = galleryRef.current.querySelectorAll('.gallery-img')
    images.forEach((img, i) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top 80%',
          once: true,
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.1,
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

      {/* Hero with organic gradient */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-b from-[#e8f5e9] via-paper to-paper pt-32">
        <div className="absolute -top-20 -right-40 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100/20 rounded-full blur-3xl" />

        <div className="shell relative z-10">
          <div className="max-w-[600px]">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
              Agriculture & Agro-processing
            </span>
            <h1 className="font-display text-6xl lg:text-7xl text-ink leading-tight">
              {company.name}
            </h1>
            <p className="mt-8 text-xl text-ink-soft max-w-[500px]">
              {company.page.intro[0]}
            </p>
          </div>
        </div>
      </section>

      {/* Mission with side image */}
      <section className="relative py-20 md:py-32 bg-paper">
        <div className="shell">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">
                From soil to table
              </h2>
              <div className="space-y-4 text-lg text-ink-soft">
                {company.page.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-green-200 bg-green-50">
              <Img
                img={company.page.gallery[0]}
                alt="Crop cultivation"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Offerings in organic flow */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-paper via-[#f1f8f4] to-paper">
        <div className="shell">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-16">
            What we do
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {company.page.offerings.map((offering, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-white border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-10 group-hover:opacity-20 transition-opacity" />
                <h3 className="font-display text-2xl text-ink mb-3 relative z-10">
                  {offering.title}
                </h3>
                <p className="text-ink-soft mb-4">{offering.body}</p>
                <div className="text-sm text-ink-mute space-y-2">
                  {i === 0 && (
                    <>
                      <p>We cultivate a diverse range of staple and cash crops using sustainable farming practices. Our well-managed agricultural land spans multiple hectares, employing modern techniques to maximize yield while preserving soil health and environmental sustainability.</p>
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <p>Our state-of-the-art processing facilities transform raw produce into value-added products. From cleaning and sorting to packaging, we ensure quality standards meet both domestic and export requirements, reducing post-harvest losses significantly.</p>
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <p>We maintain responsible livestock and poultry operations that prioritize animal welfare and product quality. Our biosecurity protocols and veterinary oversight ensure healthy, disease-free production that meets food safety regulations.</p>
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <p>Our robust distribution network moves fresh produce and processed foods from farm to market with efficiency and care. We've invested in cold chain infrastructure to preserve quality and minimize spoilage, serving retailers and consumers nationwide.</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery in organic masonry */}
      <section ref={galleryRef} className="relative py-20 md:py-32 bg-paper">
        <div className="shell">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-16">
            In the field
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {company.page.gallery.map((img, i) => (
              <div
                key={i}
                className="gallery-img group relative overflow-hidden rounded-2xl bg-green-50 border border-green-100 aspect-[3/4] md:aspect-auto"
              >
                <Img
                  img={img}
                  alt={`Gallery ${i + 1}`}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[#e8f5e9] to-paper">
        <div className="shell text-center">
          <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">
            Ready to partner with us?
          </h2>
          <p className="text-lg text-ink-soft mb-10 max-w-[600px] mx-auto">
            Discover how modern farming and agro-processing can strengthen your supply chain.
          </p>
          <button
            onClick={() => goSection('#contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-colors"
          >
            Get in touch
          </button>
        </div>
      </section>
    </main>
  )
}
