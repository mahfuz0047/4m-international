import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveals } from '../lib/useReveals'
import { getPending, setPending, getLenis, scrollToTarget } from '../lib/smooth'

import Hero from '../components/Hero'
import Stats from '../components/Stats'
import About from '../components/About'
import Concerns from '../components/Concerns'
import Values from '../components/Values'
import Founder from '../components/Founder'
import Presence from '../components/Presence'
import Contact from '../components/Contact'

export default function Home() {
  const hasRestored = useRef(false)
  useReveals([])

  // Save scroll position before leaving (captured by window pagehide event)
  useEffect(() => {
    const saveScroll = () => {
      const l = getLenis()
      const pos = l ? l.scroll() : window.scrollY
      sessionStorage.setItem('homeScrollPos', String(pos))
    }

    window.addEventListener('pagehide', saveScroll)
    return () => window.removeEventListener('pagehide', saveScroll)
  }, [])

  // Restore scroll position on mount (when returning from sub-page)
  useEffect(() => {
    if (hasRestored.current) return
    hasRestored.current = true

    const t = getPending()
    if (t) {
      // Cross-route scroll target (nav click from sub-page)
      const id = setTimeout(() => {
        setPending(null)
        const l = getLenis()
        if (l) l.resize()
        ScrollTrigger.refresh()
        scrollToTarget(t)
      }, 450)
      return () => clearTimeout(id)
    } else {
      // Restore saved scroll position (back button from company page)
      const saved = sessionStorage.getItem('homeScrollPos')
      if (saved) {
        const pos = parseInt(saved, 10)
        const id = setTimeout(() => {
          const l = getLenis()
          if (l) {
            l.resize()
            l.scrollTo(pos, { immediate: true })
          } else {
            window.scrollTo(0, pos)
          }
          ScrollTrigger.refresh()
        }, 100)
        return () => clearTimeout(id)
      }
    }
  }, [])

  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Concerns />
      <Values />
      <Founder />
      <Presence />
      <Contact />
    </main>
  )
}
