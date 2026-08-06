import { LinkedinLogo, FacebookLogo, InstagramLogo, ArrowUp } from '@phosphor-icons/react'
import { brand, nav, companies, contact, socials, year } from '../data/site'
import { scrollToTop } from '../lib/smooth'
import { useSectionNav } from '../lib/useSectionNav'

const ICONS = {
  linkedin: LinkedinLogo,
  facebook: FacebookLogo,
  instagram: InstagramLogo,
}

export default function Footer() {
  const { goSection } = useSectionNav()
  return (
    <footer className="relative border-t border-line bg-surface-2 text-ink">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={brand.logo} alt="" className="h-12 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-medium text-ink">
                  {brand.name}
                </span>
                <span className="mt-1 text-[9.5px] uppercase tracking-[0.26em] text-ink-mute">
                  {brand.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-[34ch] text-ink-soft">
              A diversified group of companies across healthcare, agriculture,
              technology, hardware, and trade.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => {
                const Icon = ICONS[s.icon]
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-colors hover:border-azure hover:text-azure"
                  >
                    {Icon && <Icon size={18} weight="fill" />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Companies */}
          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-[0.2em] text-ink-mute">
              Companies
            </h4>
            <ul className="mt-5 space-y-3">
              {companies.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => goSection('#companies')}
                    className="link-sweep text-left text-ink-soft transition-colors hover:text-ink"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore + Contact */}
          <div className="md:col-span-4">
            <h4 className="text-sm uppercase tracking-[0.2em] text-ink-mute">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.target}>
                  <button
                    onClick={() => goSection(n.target)}
                    className="link-sweep text-left text-ink-soft transition-colors hover:text-ink"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-7 space-y-1 text-ink-soft">
              <a href={`mailto:${contact.email}`} className="block hover:text-azure">
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="block hover:text-azure"
              >
                {contact.phone}
              </a>
              <p className="pt-2">{contact.address.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-mute">
            © {year} {brand.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-azure"
          >
            Back to top
            <ArrowUp
              weight="bold"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
