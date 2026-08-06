import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './smooth'

/**
 * Sets up scroll-reveal for every [data-reveal] element on the current page.
 * Call once per page/route so freshly mounted content gets wired up.
 */
export function useReveals(deps = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-reveal]')
      els.forEach((el) => gsap.set(el, { opacity: 0, y: 30 }))
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
      })
    })
    const id = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => {
      clearTimeout(id)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
