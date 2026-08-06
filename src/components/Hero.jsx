import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from '@phosphor-icons/react'
import { hero } from '../data/site'
import { prefersReducedMotion } from '../lib/smooth'
import Img from './Img'
import { Button } from './ui/Button'

export default function Hero() {
  const root = useRef(null)
  const bg = useRef(null)
  const content = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        yPercent: 120,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.15,
      })
      gsap.from('.hero-fade', {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.6,
      })
      gsap.to(bg.current, {
        yPercent: 16,
        scale: 1.16,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(content.current, {
        yPercent: -10,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100dvh] w-full overflow-hidden bg-paper">
      <div ref={bg} className="absolute inset-0 will-change-transform">
        <Img img={hero.image} alt="" eager className="size-full object-cover" />
        {/* light washes keep the photo visible while navy type stays legible */}
        <div className="absolute inset-0 bg-gradient-to-tr from-paper via-paper/65 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-paper/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div ref={content} className="relative z-10 flex min-h-[100dvh] items-end">
        <div className="shell w-full pb-20 pt-32 md:pb-28">
          <h1 className="max-w-[18ch] font-display text-[clamp(2.6rem,7.6vw,7rem)] font-medium leading-[1.0] text-ink">
            {hero.title.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-7 max-w-[52ch] text-lg leading-relaxed text-ink-soft md:text-xl">
            {hero.subtitle}
          </p>
          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <Button to="#companies" icon={ArrowRight}>
              Explore the group
            </Button>
            <Button to="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
