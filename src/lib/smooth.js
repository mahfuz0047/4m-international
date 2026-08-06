// Module singleton so any component (e.g. the nav) can drive the shared
// Lenis instance without prop-drilling or context.
let _lenis = null

export const setLenis = (l) => { _lenis = l }
export const getLenis = () => _lenis

// A scroll target stashed while navigating between routes (e.g. clicking
// "Companies" from a sub-page). The Home page consumes it on mount.
let _pending = null
export const setPending = (t) => { _pending = t }
export const getPending = () => _pending

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth-scroll to an element id ("#contact") accounting for the fixed nav (72px)
// and adding breathing room below it (offset total ~130px from viewport top).
export const scrollToTarget = (target) => {
  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset: -130, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export const scrollToTop = () => {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
