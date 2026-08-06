import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { setLenis, getLenis, getPending, prefersReducedMotion } from './lib/smooth'

import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import CompanyPage from './pages/CompanyPage'

gsap.registerPlugin(ScrollTrigger)

// Dev-only: lets the preview pause its rAF loop so screenshots can capture a
// stable frame (this preview throttles continuous animation in hidden tabs).
if (typeof window !== 'undefined' && import.meta.env.DEV) window.gsap = gsap

// On route change: jump to top (unless a section target is pending) and
// re-measure scroll triggers for the new content.
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const l = getLenis()
    if (!getPending()) {
      if (l) l.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    }
    const id = setTimeout(() => {
      if (l) l.resize()
      ScrollTrigger.refresh()
    }, 250)
    return () => clearTimeout(id)
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 })
    setLenis(lenis)
    if (import.meta.env.DEV) window.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      setLenis(null)
      gsap.ticker.remove(raf)
    }
  }, [])

  return (
    <>
      <Nav />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies/:slug" element={<CompanyPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
