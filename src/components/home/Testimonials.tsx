import { testimonials } from '../../data/testimonials'
import { DemoNote } from '../ui/DemoNote'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section aria-labelledby="notes-title" className="border-y border-line bg-paper py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading id="notes-title" accent="Overheard at the counter" title="Notes from the neighbourhood" align="center" />
        <ul className="scroll-row -mx-4 mt-12 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {testimonials.map((t) => (
            <li key={t.name} className="flex w-[82%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-line bg-cream p-7 sm:w-auto">
              <blockquote>
                <span aria-hidden className="block font-serif text-5xl leading-none text-terracotta/50">“</span>
                <p className="-mt-3 font-serif text-[1.3rem] leading-snug text-espresso">{t.quote}</p>
              </blockquote>
              <p className="mt-6 text-sm">
                <span className="font-semibold text-espresso">{t.name}</span>
                <span className="text-muted"> · {t.context}</span>
              </p>
            </li>
          ))}
        </ul>
        <DemoNote className="mt-8 justify-center">Fictional guest notes written for this demo — not real reviews.</DemoNote>
      </div>
    </section>
  )
}
