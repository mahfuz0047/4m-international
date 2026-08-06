import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToTarget, scrollToTop, setPending, getLenis } from './smooth'

/**
 * Navigation helpers that work from any route. On the homepage they smooth-scroll
 * to a section; from a sub-page they navigate home first, then scroll.
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const saveHomeScroll = () => {
    if (pathname === '/') {
      const l = getLenis()
      const pos = l ? l.scroll() : window.scrollY
      sessionStorage.setItem('homeScrollPos', String(pos))
    }
  }

  const goSection = (target) => {
    if (pathname === '/') {
      scrollToTarget(target)
    } else {
      setPending(target)
      saveHomeScroll()
      navigate('/')
    }
  }

  const goHome = () => {
    if (pathname === '/') scrollToTop()
    else {
      saveHomeScroll()
      navigate('/')
    }
  }

  return { goSection, goHome, saveHomeScroll }
}
