import { useState } from 'react'

/**
 * Photo with graceful fallback.
 * `img` is { src, fb }. We try the real file first (the one you drop into
 * /public/images), and fall back to a grayscale placeholder until it exists.
 */
export default function Img({ img, alt = '', className = '', eager = false }) {
  const [src, setSrc] = useState(img.src)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => {
        if (src !== img.fb) setSrc(img.fb)
      }}
    />
  )
}
