import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { companies } from '../data/site'
import { useReveals } from '../lib/useReveals'
import Img from '../components/Img'

export default function CompaniesListing() {
  useReveals([])

  return (
    <main>
      {/* Hero section */}
      <section className="relative min-h-[60vh] bg-paper py-20 md:py-32">
        <div className="shell">
          <h1 className="font-display text-5xl text-ink md:text-6xl lg:text-7xl">
            Our Concerns
          </h1>
          <p className="mt-6 max-w-[55ch] text-lg text-ink-soft">
            Five companies, built by one founder, across healthcare, agriculture, technology, hardware, and trade.
          </p>
        </div>
      </section>

      {/* Companies grid */}
      <section className="relative bg-surface py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-2">
            {companies.map((company) => (
              <article
                key={company.id}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-surface-2">
                  <Img
                    img={company.image}
                    alt={company.name}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-azure">
                    {company.sector}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-ink md:text-3xl">
                    {company.name}
                  </h3>
                  <p className="mt-3 text-base text-ink-soft">{company.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {company.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {company.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex gap-3">
                    {company.page ? (
                      <Link
                        to={`/companies/${company.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-azure hover:text-azure-bright transition-colors"
                      >
                        Learn more <ArrowRight size={16} weight="bold" />
                      </Link>
                    ) : (
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-azure hover:text-azure-bright transition-colors"
                      >
                        Visit website <ArrowUpRight size={16} weight="bold" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
