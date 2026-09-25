import { ArrowRight } from 'lucide-react'
import { todaysSpecials } from '../../data/products'
import { ProductCard } from '../product/ProductCard'
import { ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'

export function TodaysSpecials() {
  return (
    <section aria-labelledby="specials-title" className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="specials-title"
          accent="Fresh today"
          title="Today’s Specials"
          intro="A few things we’re especially excited about today."
          action={
            <span className="hidden md:block">
              <ButtonLink to="/menu" variant="outline">
                View Full Menu <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </span>
          }
        />
        <div className="scroll-row -mx-4 mt-10 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {todaysSpecials.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addLabel="Add to Order"
              className="w-[78%] shrink-0 snap-start sm:w-auto"
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 78vw"
            />
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <ButtonLink to="/menu" variant="outline" className="w-full">
            View Full Menu <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
