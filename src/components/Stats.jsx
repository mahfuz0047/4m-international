import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '../data/site'
import { prefersReducedMotion } from '../lib/smooth'

export default function Stats() {
  const root = useRef(null)

  useEffect(() => {
    const nums = gsap.utils.toArray('.stat-num', root.current)
    const fmt = (v, plain) =>
      plain ? String(Math.round(v)) : Math.round(v).toLocaleString()

    if (prefersReducedMotion()) {
      nums.forEach((el) =>
        (el.textContent = fmt(Number(el.dataset.value), el.dataset.plain === '1')),
      )
      return
    }

    const ctx = gsap.context(() => {
      nums.forEach((el) => {
        const end = Number(el.dataset.value)
        const plain = el.dataset.plain === '1'
        const obj = { v: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: end,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => (el.textContent = fmt(obj.v, plain)),
            }),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative border-y border-line bg-surface">
      <div className="shell py-16 md:py-20">
        <p
          data-reveal
          className="max-w-[40ch] text-balance font-display text-xl text-ink md:text-2xl"
        >
          A diversified group, built on disciplined fundamentals.
        </p>
        <div className="mt-12 flex items-end gap-8 md:gap-16 lg:gap-24">
          {stats.map((s, i) => (
            <div data-reveal key={i} className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span
                  className="stat-num font-display font-medium text-azure"
                  style={{ fontSize: 'clamp(2rem, 8vw, 7rem)' }}
                  data-value={s.value}
                  data-plain={s.plain ? '1' : '0'}
                >
                  0
                </span>
                {s.suffix && (
                  <span className="font-display text-3xl font-medium text-azure md:text-5xl">
                    {s.suffix}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-mute">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
