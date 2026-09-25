import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { signatureDrinks } from '../../data/products'
import { formatINR } from '../../utils/format'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

export function SignatureDrinks() {
  const row = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = row.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="drinks-title" className="overflow-hidden bg-sage-dark py-16 text-paper sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="drinks-title"
          tone="light"
          accent="Signature drinks"
          title="Pour Something Good"
          intro="Crafted slowly with our house blend, real ingredients and a little bit of theory."
          action={
            <div className="flex items-center gap-2">
              <Link to="/menu?category=coffee" className="mr-3 hidden items-center gap-2 text-sm font-semibold text-paper underline-offset-4 hover:underline sm:inline-flex">
                All drinks <ArrowRight className="size-4" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Scroll drinks left"
                className="grid size-11 place-items-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-espresso"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Scroll drinks right"
                className="grid size-11 place-items-center rounded-full border border-paper/30 transition-colors hover:bg-paper hover:text-espresso"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          }
        />
        <ul ref={row} className="scroll-row -mx-4 mt-10 gap-5! px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          {signatureDrinks.map((p, i) => (
            <li key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[36%] lg:w-[23%]">
              <Link to={`/menu/${p.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[999px_999px_18px_18px] bg-roast">
                  <Img
                    name={p.image}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 36vw, 62vw"
                    alt={p.name}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-[18%] left-1/2 -translate-x-1/2 font-serif text-sm text-paper/80 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-xl text-paper group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {p.name}
                  </h3>
                  <span className="text-sm font-semibold text-sand tabular-nums">{formatINR(p.price)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-paper/70">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
