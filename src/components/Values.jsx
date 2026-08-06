import { values } from '../data/site'
import { Eyebrow } from './ui/Eyebrow'

export default function Values() {
  return (
    <section
      id="values"
      className="relative scroll-mt-20 border-t border-line bg-surface-2"
    >
      <div className="shell py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{values.eyebrow}</Eyebrow>
              <h2
                data-reveal
                className="mt-5 font-display text-4xl text-ink md:text-5xl"
              >
                {values.title}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {values.items.map((v) => (
                <li
                  data-reveal
                  key={v.k}
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-8 md:gap-8 md:py-10"
                >
                  <span className="font-display text-2xl font-medium text-gold-deep">
                    {v.k}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink md:text-3xl">
                      {v.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-ink-soft md:text-lg">
                      {v.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
