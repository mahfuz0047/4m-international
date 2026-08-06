import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { List, X } from '@phosphor-icons/react'
import { nav, brand, contact } from '../data/site'
import { useSectionNav } from '../lib/useSectionNav'
import { Button } from './ui/Button'

function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3" aria-label={brand.name}>
      <img src={brand.logo} alt="" className="h-12 w-auto" />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-[17px] font-medium tracking-tight text-ink">
          {brand.name}
        </span>
        <span className="mt-1 text-[9.5px] uppercase tracking-[0.26em] text-ink-mute">
          {brand.tagline}
        </span>
      </span>
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const frosted = scrolled || open
  const { goSection, goHome } = useSectionNav()
  const { pathname } = useLocation()

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScrolled(self.scroll() > 60),
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    setScrolled(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (t) => {
    setOpen(false)
    goSection(t)
  }

  return (
    <>
      <header
        className={`fixed z-50 border-0 transition-all duration-500 ${
          frosted
            ? 'inset-x-4 top-4 rounded-full bg-white/70 shadow-sm shadow-ink/5 backdrop-blur-xl backdrop-saturate-150'
            : 'inset-x-0 top-0 rounded-none bg-transparent'
        }`}
      >
        <div className={`shell flex h-[72px] items-center ${frosted ? 'px-6' : ''} ${frosted ? 'justify-between' : 'justify-between'}`}>
          <Logo onClick={goHome} />

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <button
                key={n.target}
                onClick={() => go(n.target)}
                className="link-sweep text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button onClick={() => go('#contact')} className="hidden sm:inline-flex">
              Get in touch
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-md border border-line text-ink lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — sibling of <header> so position:fixed maps to the viewport */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[72px] z-40 bg-white/90 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-between py-10">
          <nav className="flex flex-col">
            {nav.map((n) => (
              <button
                key={n.target}
                onClick={() => go(n.target)}
                className="border-b border-line py-5 text-left font-display text-3xl text-ink"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex flex-col gap-4">
            <Button onClick={() => go('#contact')} className="w-full">
              Get in touch
            </Button>
            <a href={`mailto:${contact.email}`} className="text-sm text-ink-soft">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
