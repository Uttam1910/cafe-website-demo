import { Bike, Store } from 'lucide-react'
import { useMemo } from 'react'
import { cafe } from '../../config/cafe'
import { useCart } from '../../context/cart'
import { pickupSlots } from '../../utils/slots'
import { deliveryAreas, type OrderTypeField } from '../../utils/orderDetails'
import type { Errors } from '../../utils/validation'
import { Field } from '../ui/Field'
import { fieldProps } from '../ui/fieldProps'

export function OrderTypePanel({ errors = {} }: { errors?: Errors<OrderTypeField> }) {
  const { details, setDetails } = useCart()
  const { asap, slots } = useMemo(() => pickupSlots(), [])
  const closedHint = asap ? undefined : 'We’re closed right now — choose a time tomorrow.'

  // Keep the stored pickup time valid for the current time of day.
  const pickupValue = details.pickupTime === 'asap' && !asap ? '' : details.pickupTime

  const types = [
    { id: 'pickup' as const, label: 'Pickup', detail: cafe.prepEstimate.pickup, icon: Store },
    { id: 'delivery' as const, label: 'Delivery', detail: cafe.prepEstimate.delivery, icon: Bike },
  ]

  return (
    <div>
      <div role="radiogroup" aria-label="Order type" className="grid grid-cols-2 gap-2 rounded-2xl bg-sand/70 p-1.5">
        {types.map(({ id, label, detail, icon: Icon }) => {
          const active = details.type === id
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setDetails({ type: id })}
              className={`flex items-center justify-center gap-2.5 rounded-xl px-3 py-3 text-left transition-colors ${
                active ? 'bg-paper text-espresso shadow-sm' : 'text-roast hover:bg-paper/50'
              }`}
            >
              <Icon className="size-5 shrink-0" strokeWidth={1.7} aria-hidden />
              <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="block text-xs text-muted">{detail}</span>
              </span>
            </button>
          )
        })}
      </div>

      {details.type === 'pickup' ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="pickup-location" label="Café location">
            <select
              {...fieldProps('pickup-location')}
              value={details.locationId}
              onChange={(e) => setDetails({ locationId: e.target.value })}
              className="field-input"
            >
              {cafe.locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} — {l.detail} (demo)
                </option>
              ))}
            </select>
          </Field>
          <Field
            id="pickup-time"
            label="Pickup time"
            error={errors.pickupTime}
            hint={closedHint}
          >
            <select
              {...fieldProps('pickup-time', errors.pickupTime, closedHint)}
              value={pickupValue}
              onChange={(e) => setDetails({ pickupTime: e.target.value })}
              className="field-input"
            >
              {!asap && <option value="">Choose a time</option>}
              {asap && <option value="asap">As soon as possible ({cafe.prepEstimate.pickup})</option>}
              {slots.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="delivery-address" label="Delivery address" error={errors.address} className="sm:col-span-2">
            <input
              {...fieldProps('delivery-address', errors.address)}
              value={details.address}
              onChange={(e) => setDetails({ address: e.target.value })}
              placeholder="Flat, building, street"
              autoComplete="street-address"
              className="field-input"
            />
          </Field>
          <Field id="delivery-area" label="Area" error={errors.area}>
            <select
              {...fieldProps('delivery-area', errors.area)}
              value={details.area}
              onChange={(e) => setDetails({ area: e.target.value })}
              className="field-input"
            >
              <option value="">Choose your area</option>
              {deliveryAreas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </Field>
          <Field id="delivery-notes" label="Delivery instructions" optional>
            <input
              {...fieldProps('delivery-notes')}
              value={details.instructions}
              onChange={(e) => setDetails({ instructions: e.target.value })}
              placeholder="Gate code, landmark…"
              className="field-input"
            />
          </Field>
        </div>
      )}
    </div>
  )
}
