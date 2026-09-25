import { ArrowRight, Plus, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CartLineItem } from '../components/order/CartLineItem'
import { OrderSummary } from '../components/order/OrderSummary'
import { OrderTypePanel } from '../components/order/OrderTypePanel'
import { Button } from '../components/ui/Button'
import { DietaryBadges, FoodMarker } from '../components/ui/DietaryBadges'
import { DemoNote } from '../components/ui/DemoNote'
import { Img } from '../components/ui/Img'
import { PageIntro } from '../components/ui/PageIntro'
import { Pills } from '../components/ui/Pills'
import { useCart } from '../context/cart'
import { menuCategories, type MenuFilter } from '../data/menu'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { Product } from '../types'
import { formatINR } from '../utils/format'
import { defaultSelection } from '../utils/pricing'
import { filterProducts } from '../utils/search'

function OrderItem({ product }: { product: Product }) {
  const { addItem } = useCart()
  const customisable = Boolean(product.sizes?.length || product.milkOptions?.length || product.extras?.length)
  return (
    <li className="flex gap-4 rounded-2xl border border-line bg-paper p-3 transition-colors hover:border-oat sm:p-4">
      <Link to={`/order/${product.slug}`} className="shrink-0" tabIndex={-1} aria-hidden>
        <Img name={product.image} sizes="112px" alt="" className="size-24 rounded-xl object-cover sm:size-28" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="flex items-center gap-2 font-serif text-[1.1rem] leading-snug text-espresso">
          <FoodMarker product={product} />
          <Link to={`/order/${product.slug}`} className="hover:underline hover:decoration-1 hover:underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">{product.description}</p>
        <div className="mt-2">
          <DietaryBadges product={product} />
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="font-semibold text-espresso tabular-nums">{formatINR(product.price)}</span>
          <span className="flex items-center gap-1.5">
            {customisable && (
              <Link
                to={`/order/${product.slug}`}
                className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-[13px] font-semibold text-roast hover:bg-sand"
              >
                <SlidersHorizontal className="size-3.5" aria-hidden /> Customise
                <span className="sr-only"> {product.name}</span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => addItem(product, defaultSelection(product))}
              aria-label={`Add ${product.name} to order`}
              className="grid size-9 place-items-center rounded-full bg-espresso text-paper transition-colors hover:bg-terracotta"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </span>
        </div>
      </div>
    </li>
  )
}

export function OrderPage() {
  useDocumentMeta('Order Online', 'Order coffee, bakes and breakfast from MORNING THEORY for pickup or delivery. Frontend demo — no real orders are placed.')
  const { lines, itemCount, totals, details, openDrawer } = useCart()
  const [category, setCategory] = useState<MenuFilter>('all')
  const navigate = useNavigate()
  const items = useMemo(() => filterProducts('', category, []), [category])

  return (
    <>
      <PageIntro accent="Pickup or delivery" title="Order Online" intro="Your coffee is only a few clicks away." />

      <div className={`container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10 lg:pb-24 ${itemCount > 0 ? 'pb-28' : 'pb-16'}`}>
        <div className="lg:col-span-8">
          <section aria-labelledby="how-title" className="rounded-3xl border border-line bg-paper p-4 sm:p-6">
            <h2 id="how-title" className="mb-4 font-serif text-2xl">How would you like it?</h2>
            <OrderTypePanel />
          </section>

          <section aria-labelledby="browse-title" className="mt-10">
            <div className="mb-5 flex items-baseline justify-between">
              <h2 id="browse-title" className="font-serif text-3xl">Browse the menu</h2>
              <span className="text-sm text-muted" aria-live="polite">{items.length} items</span>
            </div>
            <Pills label="Filter by category" options={menuCategories} value={category} onChange={setCategory} />
            <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {items.map((p) => (
                <OrderItem key={p.id} product={p} />
              ))}
            </ul>
          </section>
        </div>

        <aside aria-labelledby="cart-side-title" className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-24 rounded-3xl border border-line bg-paper p-6">
            <h2 id="cart-side-title" className="font-serif text-2xl">
              Your Cart <span className="text-base text-muted">({itemCount})</span>
            </h2>
            {lines.length === 0 ? (
              <div className="py-10 text-center">
                <ShoppingBag className="mx-auto size-8 text-oat" aria-hidden />
                <p className="mt-3 text-sm text-muted">Your cart is empty. Tap + on anything that looks good.</p>
              </div>
            ) : (
              <>
                <ul className="mt-2 max-h-[46vh] divide-y divide-line overflow-y-auto pr-1">
                  {lines.map((l) => (
                    <CartLineItem key={l.key} line={l} />
                  ))}
                </ul>
                <div className="mt-4 border-t border-line pt-4">
                  <OrderSummary totals={totals} orderType={details.type} />
                  <Button size="lg" className="mt-5 w-full" onClick={() => navigate('/checkout')}>
                    Checkout <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </>
            )}
            <DemoNote className="mt-4">Demo order — no real payment is processed.</DemoNote>
          </div>
        </aside>
      </div>

      {itemCount > 0 && (
        <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 px-4 pb-3 lg:hidden">
          <button
            type="button"
            onClick={openDrawer}
            className="mx-auto flex h-14 w-full max-w-md items-center justify-between rounded-full bg-espresso px-6 text-paper shadow-[0_14px_30px_-12px_rgba(40,25,15,0.55)]"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              <ShoppingBag className="size-4" aria-hidden /> View bag · {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
            <span className="font-semibold tabular-nums">{formatINR(totals.total)}</span>
          </button>
        </div>
      )}
    </>
  )
}
