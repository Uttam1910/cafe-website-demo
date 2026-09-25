import { ArrowRight, Plus } from 'lucide-react'
import { Link } from 'react-router'
import { useCart } from '../../context/cart'
import { bakeryFeature } from '../../data/products'
import { formatINR } from '../../utils/format'
import { defaultSelection } from '../../utils/pricing'
import { ButtonLink } from '../ui/Button'
import { FoodMarker } from '../ui/DietaryBadges'
import { Img } from '../ui/Img'

export function BakerySection() {
  const { addItem } = useCart()
  return (
    <section aria-labelledby="bakery-title" className="bg-sand/60 py-16 sm:py-24">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative lg:col-span-5">
          <div className="overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <Img
              name="croissants-tray"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
            />
          </div>
          <p className="absolute -bottom-5 left-5 rotate-[-4deg] rounded-xl bg-paper px-4 py-2 font-hand text-2xl text-terracotta shadow-sm lg:bottom-8 lg:-left-4" aria-hidden>
            out of the oven at 7:30
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="hand mb-2">Baked in-house, every day</p>
          <h2 id="bakery-title" className="text-[2.3rem] leading-[1.02] font-light sm:text-6xl">
            Fresh from the Oven
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            Our bakers start before sunrise. Laminated croissants, cookies, cakes and loaves — in small batches, so there’s always something warm.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {bakeryFeature.map((p) => (
              <li key={p.id} className="flex items-center gap-4 border-t border-oat py-4">
                <Img name={p.image} sizes="72px" alt="" className="size-[72px] shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-2 font-serif text-[1.08rem] leading-snug text-espresso">
                    <FoodMarker product={p} />
                    <Link to={`/menu/${p.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-4">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold text-roast tabular-nums">{formatINR(p.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => addItem(p, defaultSelection(p))}
                  aria-label={`Add ${p.name} to order`}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-espresso/20 text-espresso transition-colors hover:bg-espresso hover:text-paper"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
          <ButtonLink to="/menu?category=bakery" className="mt-8">
            See Today’s Bakes <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
