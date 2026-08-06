import { MapPin, ArrowUpRight } from '@phosphor-icons/react'
import { presence } from '../data/site'
import Img from './Img'
import { Button } from './ui/Button'

export default function Presence() {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    presence.mapQuery,
  )}`
  return (
    <section className="relative scroll-mt-20 bg-paper">
      <div className="shell py-24 md:py-36">
        <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-3xl border border-line shadow-xl shadow-ink/5 aspect-[3/4] lg:aspect-auto lg:h-[600px]">
            <Img
              img={presence.image}
              alt="Dhaka, Bangladesh"
              className="size-full object-cover"
            />
          </div>
          <div className="relative">
            <div className="max-w-[520px]">
                <h2
                  data-reveal
                  className="font-display text-4xl text-ink md:text-5xl"
                >
                  {presence.title}
                </h2>
                <p data-reveal className="mt-5 text-lg leading-relaxed text-ink-soft">
                  {presence.body}
                </p>
                <div data-reveal className="mt-7 flex items-start gap-3">
                  <MapPin weight="fill" className="mt-1 size-5 shrink-0 text-azure" />
                  <address className="text-lg not-italic leading-relaxed text-ink">
                    {presence.address.map((l, i) => (
                      <span key={i} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
                <div data-reveal className="mt-8">
                  <Button href={mapHref} newTab icon={ArrowUpRight}>
                    View on map
                  </Button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}
