import { Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/cart'
import type { OptionChoice, Product, Selection } from '../../types'
import { formatDelta, formatINR } from '../../utils/format'
import { defaultSelection, unitPrice } from '../../utils/pricing'
import { QuantityStepper } from '../ui/QuantityStepper'

function OptionGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: OptionChoice[]
  value?: string
  onChange: (id: string) => void
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = o.id === value
          return (
            <label
              key={o.id}
              className={`relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta ${
                checked ? 'border-espresso bg-espresso text-paper' : 'border-line bg-paper text-roast hover:border-espresso/40'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.id}
                checked={checked}
                onChange={() => onChange(o.id)}
                className="sr-only"
              />
              {o.label}
              {o.priceDelta !== 0 && (
                <span className={`text-xs ${checked ? 'text-paper/70' : 'text-muted'}`}>{formatDelta(o.priceDelta)}</span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function ProductCustomizer({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selection, setSelection] = useState<Selection>(() => defaultSelection(product))
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const unit = unitPrice(product, selection)
  const update = (patch: Partial<Selection>) => {
    setAdded(false)
    setSelection((s) => ({ ...s, ...patch }))
  }
  const toggleExtra = (id: string) =>
    update({
      extraIds: selection.extraIds.includes(id)
        ? selection.extraIds.filter((e) => e !== id)
        : [...selection.extraIds, id],
    })

  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault()
        addItem(product, selection, quantity)
        setAdded(true)
      }}
    >
      {product.sizes && product.sizes.length > 1 && (
        <OptionGroup
          legend="Size"
          name={`${product.id}-size`}
          options={product.sizes}
          value={selection.sizeId}
          onChange={(sizeId) => update({ sizeId })}
        />
      )}
      {product.milkOptions && (
        <OptionGroup
          legend="Milk"
          name={`${product.id}-milk`}
          options={product.milkOptions}
          value={selection.milkId}
          onChange={(milkId) => update({ milkId })}
        />
      )}
      {product.extras && product.extras.length > 0 && (
        <fieldset>
          <legend className="eyebrow mb-3 text-muted">Extras</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.extras.map((extra) => {
              const checked = selection.extraIds.includes(extra.id)
              return (
                <label
                  key={extra.id}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta ${
                    checked ? 'border-espresso bg-sand/60' : 'border-line bg-paper hover:border-espresso/40'
                  }`}
                >
                  <input type="checkbox" checked={checked} onChange={() => toggleExtra(extra.id)} className="sr-only" />
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                      checked ? 'border-espresso bg-espresso text-paper' : 'border-oat bg-paper'
                    }`}
                    aria-hidden
                  >
                    {checked && <Check className="size-3.5" />}
                  </span>
                  <span className="flex-1 text-espresso">{extra.label}</span>
                  <span className="text-xs text-muted">{extra.priceDelta ? formatDelta(extra.priceDelta) : 'Free'}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      )}

      <div>
        <p className="eyebrow mb-3 text-muted" id={`${product.id}-qty`}>
          Quantity
        </p>
        <QuantityStepper value={quantity} onChange={(q) => { setAdded(false); setQuantity(q) }} label="quantity" />
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-14 flex-1 items-center justify-between gap-4 rounded-full bg-espresso px-7 text-[15px] font-semibold text-paper transition-colors hover:bg-roast active:scale-[0.99]"
        >
          <span className="inline-flex items-center gap-2">
            {added ? <Check className="size-4" aria-hidden /> : <ShoppingBag className="size-4" aria-hidden />}
            {added ? 'Added — add another' : 'Add to Order'}
          </span>
          <span className="tabular-nums" aria-live="polite">
            {formatINR(unit * quantity)}
          </span>
        </button>
      </div>
      {unit !== product.price && (
        <p className="-mt-4 text-[13px] text-muted">
          {formatINR(unit)} each, including your customisations.
        </p>
      )}
    </form>
  )
}
