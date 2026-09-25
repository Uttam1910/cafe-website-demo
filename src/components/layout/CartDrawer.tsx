import { ArrowRight, Coffee, X } from 'lucide-react'
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../../context/cart'
import { useModal } from '../../hooks/useModal'
import { Button, ButtonLink } from '../ui/Button'
import { CartLineItem } from '../order/CartLineItem'
import { OrderSummary } from '../order/OrderSummary'

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, itemCount, totals, details, setDetails } = useCart()
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  useModal(drawerOpen, closeDrawer, ref)
  if (!drawerOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-charcoal/45" onClick={closeDrawer} aria-hidden />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full animate-slide-in-right flex-col bg-cream sm:max-w-[440px] sm:shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <h2 id="cart-title" className="font-serif text-2xl">
            Your Order <span className="text-base text-muted">({itemCount})</span>
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close bag"
            className="grid size-10 place-items-center rounded-full text-espresso hover:bg-sand"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="mb-5 grid size-20 place-items-center rounded-full bg-sand text-roast">
              <Coffee className="size-8" aria-hidden />
            </span>
            <p className="hand mb-1">Nothing here yet</p>
            <p className="font-serif text-2xl text-espresso">Your bag is empty.</p>
            <p className="mt-2 max-w-xs text-sm text-muted">Start with a pistachio latte and a morning bun — it’s what we’d do.</p>
            <ButtonLink to="/order" onClick={closeDrawer} className="mt-6">
              Browse the menu <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-5 py-3 sm:px-6">
              <div role="radiogroup" aria-label="Order type" className="grid grid-cols-2 rounded-full bg-sand p-1 text-sm font-semibold">
                {(['pickup', 'delivery'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={details.type === t}
                    onClick={() => setDetails({ type: t })}
                    className={`h-9 rounded-full capitalize transition-colors ${details.type === t ? 'bg-paper text-espresso shadow-sm' : 'text-roast'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5 sm:px-6" aria-label="Items in your order">
              {lines.map((line) => (
                <CartLineItem key={line.key} line={line} onNavigate={closeDrawer} />
              ))}
            </ul>
            <div className="border-t border-line bg-paper px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-6">
              <OrderSummary totals={totals} orderType={details.type} />
              <Button
                size="lg"
                className="mt-5 w-full"
                onClick={() => {
                  closeDrawer()
                  navigate('/checkout')
                }}
              >
                Continue to Checkout <ArrowRight className="size-4" aria-hidden />
              </Button>
              <p className="mt-3 text-center text-xs text-muted">Demo order — no real payment is processed.</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
