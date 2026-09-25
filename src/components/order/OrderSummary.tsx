import { cafe } from '../../config/cafe'
import type { OrderType } from '../../types'
import { formatINR } from '../../utils/format'
import type { CartTotals } from '../../utils/pricing'

export function OrderSummary({ totals, orderType }: { totals: CartTotals; orderType: OrderType }) {
  const remaining = cafe.pricing.freeDeliveryFrom - totals.subtotal
  return (
    <div>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="tabular-nums">{formatINR(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery</dt>
          <dd className="tabular-nums">
            {orderType === 'pickup' ? 'Pickup · free' : totals.delivery === 0 ? 'Free' : formatINR(totals.delivery)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">{cafe.pricing.taxLabel}</dt>
          <dd className="tabular-nums">{formatINR(totals.tax)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <dt className="font-semibold text-espresso">Total</dt>
          <dd className="font-serif text-2xl text-espresso tabular-nums">{formatINR(totals.total)}</dd>
        </div>
      </dl>
      {orderType === 'delivery' && totals.delivery > 0 && remaining > 0 && (
        <p className="mt-3 rounded-xl bg-sage-soft px-3 py-2 text-[13px] text-sage-dark">
          Add {formatINR(remaining)} more for free delivery.
        </p>
      )}
    </div>
  )
}
