import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/ui/Button'
import { DemoNote } from '../components/ui/DemoNote'
import { Img } from '../components/ui/Img'
import { cafe } from '../config/cafe'
import type { ImageName } from '../data/images'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const chapters: { n: string; title: string; body: string[]; image: ImageName; caption: string }[] = [
  {
    n: '01',
    title: 'Slow mornings',
    body: [
      'MORNING THEORY began with a simple complaint: mornings had become something to get through. Coffee in a paper cup, breakfast at a desk, nobody looking up.',
      'So we built the opposite — a place where the first cup is poured with care and nobody hurries you out. Stay for ten minutes or the whole afternoon.',
    ],
    image: 'window-seat',
    caption: 'The window counter, 8 am',
  },
  {
    n: '02',
    title: 'Good coffee, properly made',
    body: [
      'Our house blend comes from small estates in Chikmagalur and Coorg, roasted in small batches for sweetness and body. Every morning the team tastes and dials in the espresso before the doors open.',
      'We rotate a single-origin on pour over and run a weekly cupping to decide what comes next.',
    ],
    image: 'barista-pour',
    caption: 'Steaming milk for a flat white',
  },
  {
    n: '03',
    title: 'Baked here, every day',
    body: [
      'Our croissant dough takes three days. Cookies, cakes, focaccia and banana bread are all made in our own small kitchen, in batches small enough that something is always coming out warm.',
      'When things sell out, they sell out. We would rather that than serve yesterday’s bake.',
    ],
    image: 'baker-oven',
    caption: 'First batch into the oven',
  },
]

export function OurStoryPage() {
  useDocumentMeta('Our Story', 'How MORNING THEORY came to be — slow mornings, good coffee, fresh baking and a room designed to stay in.')
  return (
    <>
      <header className="container-page grid grid-cols-1 gap-8 pt-10 pb-12 sm:pt-16 lg:grid-cols-12 lg:items-end lg:pb-16">
        <div className="lg:col-span-8">
          <p className="hand mb-3">Our story</p>
          <h1 className="text-[2.7rem] leading-[1] font-light sm:text-7xl lg:text-[5.4rem]">
            Coffee should make you <em className="text-terracotta">slow down.</em>
          </h1>
        </div>
        <p className="text-lg leading-relaxed text-muted lg:col-span-4">
          A neighbourhood café for people who like their mornings long, their coffee good and their pastries warm.
        </p>
      </header>

      <div className="container-page">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
          <div className="overflow-hidden rounded-3xl sm:col-span-8">
            <Img name="interior-sun" sizes="(min-width: 640px) 66vw, 100vw" priority className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]" />
          </div>
          <div className="hidden flex-col gap-3 sm:col-span-4 sm:flex">
            <div className="flex-1 overflow-hidden rounded-3xl">
              <Img name="latte-art-pour" sizes="33vw" className="size-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden rounded-3xl">
              <Img name="bakery-counter" sizes="33vw" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <section className="container-page py-16 sm:py-24" aria-label="A note from the café">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-[1.9rem] leading-snug font-light text-espresso sm:text-[2.6rem]">
            “We wanted a café that felt like a good morning — unhurried, warm, and a little bit brighter than when you walked in.”
          </p>
          <footer className="mt-6 font-hand text-2xl text-terracotta">— the MORNING THEORY team</footer>
        </blockquote>
      </section>

      {chapters.map((c, i) => (
        <section key={c.n} aria-labelledby={`chapter-${c.n}`} className="container-page grid grid-cols-1 gap-8 pb-16 sm:pb-24 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`}>
            <div className="overflow-hidden rounded-3xl">
              <Img name={c.image} sizes="(min-width: 1024px) 46vw, 100vw" className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]" />
            </div>
            <figcaption className="mt-3 font-hand text-xl text-muted">{c.caption}</figcaption>
          </figure>
          <div className="lg:col-span-5 lg:col-start-auto">
            <p className="font-serif text-sm text-terracotta">{c.n}</p>
            <h2 id={`chapter-${c.n}`} className="mt-2 text-4xl font-light sm:text-5xl">{c.title}</h2>
            {c.body.map((p) => (
              <p key={p} className="mt-5 text-[17px] leading-relaxed text-roast">{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section aria-labelledby="community-title" className="bg-sage-dark py-16 text-paper sm:py-24">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="font-serif text-sm text-sand">04</p>
            <h2 id="community-title" className="mt-2 text-4xl font-light text-paper sm:text-5xl">A room for the neighbourhood</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-paper/80">
              Long tables for catch-ups, a quiet corner for reading, plug points for those who have to work. On some evenings we host latte art throwdowns, book swaps and small music nights.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-paper/80">
              Most of all, we try to remember names — and how you take your coffee.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-6 lg:col-start-7">
            <Img name="friends-table" sizes="(min-width: 1024px) 24vw, 48vw" className="aspect-[3/4] w-full rounded-2xl object-cover" />
            <Img name="chai-hand" sizes="(min-width: 1024px) 24vw, 48vw" className="mt-10 aspect-[3/4] w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center sm:py-24" aria-labelledby="visit-title">
        <p className="hand mb-2">Come as you are</p>
        <h2 id="visit-title" className="text-4xl font-light sm:text-5xl">{cafe.tagline}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/reservations" size="lg">Reserve a Table</ButtonLink>
          <ButtonLink to="/menu" variant="outline" size="lg">
            See the Menu <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <DemoNote className="mt-8 justify-center">MORNING THEORY is a fictional café created for this website demo.</DemoNote>
      </section>
    </>
  )
}
