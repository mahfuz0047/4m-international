import { founder } from '../data/site'
import Img from './Img'
import { Eyebrow } from './ui/Eyebrow'

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative scroll-mt-20 border-y border-line bg-surface"
    >
      <div className="shell py-24 md:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-xl shadow-ink/5">
              <Img
                img={founder.image}
                alt={founder.name || 'Founder of 4M International'}
                className="size-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1.5 brand-mark" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow>{founder.eyebrow}</Eyebrow>
            <blockquote
              data-reveal
              className="mt-6 font-display text-2xl font-medium leading-relaxed text-ink md:text-3xl"
            >
              “{founder.message}”
            </blockquote>
            <div data-reveal className="mt-8">
              {founder.name && (
                <p className="font-display text-xl text-ink">{founder.name}</p>
              )}
              <p className="text-ink-soft">{founder.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
