export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.28em] text-azure ${className}`}
    >
      <span className="h-px w-8 bg-gold" />
      {children}
    </span>
  )
}
