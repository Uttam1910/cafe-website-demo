import { ArrowRight, Coffee } from 'lucide-react'
import { Link } from 'react-router'
import { Img } from '../ui/Img'

export function VisitBand() {
  return (
    <section aria-label="Reservations and loyalty" className="py-16 sm:py-24">
      <div className="container-page grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Link
          to="/reservations"
          className="group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden rounded-3xl p-7 text-paper sm:min-h-[440px] sm:p-10"
        >
          <Img
            name="interior-wood"
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt=""
            className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <span className="font-hand text-2xl text-sand">a cozy table, saved for you</span>
          <h2 className="mt-1 text-4xl text-paper sm:text-5xl">Book a Table</h2>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            Reserve now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>

        <Link
          to="/loyalty"
          className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-terracotta p-7 text-paper sm:min-h-[440px] sm:p-10"
        >
          <div>
            <span className="eyebrow text-paper/80">The Morning Club</span>
            <h2 className="mt-3 max-w-sm text-4xl leading-[1.05] text-paper sm:text-5xl">More coffee. More rewards.</h2>
            <p className="mt-4 max-w-xs text-[15px] text-paper/80">Collect a stamp every visit. Your eighth brings a free pastry.</p>
          </div>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <ol className="grid grid-cols-4 gap-2.5" aria-label="Example stamp card: 4 of 8 visits">
              {Array.from({ length: 8 }, (_, i) => (
                <li
                  key={i}
                  className={`grid size-11 place-items-center rounded-full border-[1.5px] border-dashed ${
                    i < 4 ? 'border-paper bg-paper text-terracotta' : 'border-paper/50'
                  }`}
                >
                  {i < 4 && <Coffee className="size-4" aria-hidden />}
                </li>
              ))}
            </ol>
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              Join the club <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
