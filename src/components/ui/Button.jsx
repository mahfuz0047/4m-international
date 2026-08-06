import { Link } from 'react-router-dom'
import { scrollToTarget, getLenis } from '../../lib/smooth'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium tracking-tight whitespace-nowrap transition-all duration-300 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure'

const variants = {
  // solid blue — primary action on light backgrounds
  primary: 'bg-azure text-white hover:bg-azure-bright shadow-sm shadow-azure/20',
  // outline on light backgrounds
  ghost: 'border border-ink/15 text-ink hover:border-azure hover:text-azure',
  // outline on photos / dark scrims
  onPhoto: 'border border-white/45 text-white hover:bg-white hover:text-ink',
}

export function Button({
  children,
  to,
  href,
  routerTo,
  newTab = false,
  variant = 'primary',
  onClick,
  className = '',
  icon: Icon,
  type = 'button',
}) {
  const cls = `${base} ${variants[variant]} ${className}`
  const inner = (
    <>
      {children}
      {Icon && (
        <Icon
          weight="bold"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  // Internal route navigation (React Router)
  if (routerTo) {
    const handleClick = (e) => {
      const l = getLenis()
      const pos = l ? l.scroll() : window.scrollY
      sessionStorage.setItem('homeScrollPos', String(pos))
      onClick && onClick()
    }
    return (
      <Link to={routerTo} className={cls} onClick={handleClick}>
        {inner}
      </Link>
    )
  }

  if (to) {
    return (
      <button
        type="button"
        className={cls}
        onClick={(e) => {
          e.preventDefault()
          scrollToTarget(to)
          onClick && onClick()
        }}
      >
        {inner}
      </button>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  )
}
