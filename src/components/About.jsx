import { about } from '../data/site'
import Img from './Img'

export default function About() {
  return (
    <section id="group" className="relative scroll-mt-20 bg-paper">
      <div className="shell py-24 md:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              data-reveal
              className="max-w-[18ch] text-balance font-display text-4xl text-ink md:text-5xl lg:text-6xl"
            >
              {about.title}
            </h2>
            <div className="mt-8 max-w-[60ch] space-y-5">
              {about.body.map((p, i) => (
                <p
                  data-reveal
                  key={i}
                  className="text-lg leading-relaxed text-ink-soft"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div data-reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-xl shadow-ink/5">
              <Img
                img={about.image}
                alt="4M International"
                className="size-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1.5 brand-mark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
