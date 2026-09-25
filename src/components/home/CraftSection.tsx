import { ArrowRight } from 'lucide-react'
import { craftPillars } from '../../data/home'
import { ButtonLink } from '../ui/Button'
import { Img } from '../ui/Img'

export function CraftSection() {
  return (
    <section aria-labelledby="craft-title" className="py-16 sm:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="hand mb-2">Our little theory</p>
            <h2 id="craft-title" className="text-[2.3rem] leading-[1.02] font-light sm:text-6xl">
              More than a café. <em className="font-normal text-terracotta">A slower way</em> to start the day.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="leading-relaxed text-muted">
              Good coffee, honest food and a room you don’t want to leave. That’s the whole theory — we just try to do each part properly.
            </p>
            <ButtonLink to="/our-story" variant="text" className="mt-4">
              Read our story <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 md:grid-cols-3 md:gap-6 lg:gap-10">
          {craftPillars.map((pillar, i) => (
            <li key={pillar.title} className={i === 1 ? 'md:mt-16' : ''}>
              <div className="relative overflow-hidden rounded-2xl">
                <Img
                  name={pillar.image}
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="aspect-[4/3] w-full object-cover md:aspect-[4/5]"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-paper/92 px-3 py-1 text-[11px] font-semibold tracking-wide text-roast backdrop-blur-sm">
                  {pillar.label}
                </span>
              </div>
              <div className="mt-5 flex gap-4">
                <span className="font-serif text-sm text-terracotta tabular-nums">0{i + 1}</span>
                <div>
                  <h3 className="eyebrow font-sans text-[13px] text-espresso">{pillar.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
