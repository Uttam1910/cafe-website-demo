import { Trash } from 'lucide-react'
import { Link } from 'react-router'
import { useCart } from '../../context/cart'
import { formatINR } from '../../utils/format'
import { selectionSummary, type PricedLine } from '../../utils/pricing'
import { Img } from '../ui/Img'
import { QuantityStepper } from '../ui/QuantityStepper'

export function CartLineItem({ line, onNavigate }: { line: PricedLine; onNavigate?: () => void }) {
  const { setQuantity, removeItem } = useCart()
  const summary = selectionSummary(line.product, line.selection)
  return (
    <li className="flex gap-4 py-4">
      <Img name={line.product.image} sizes="80px" alt="" className="size-20 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/menu/${line.product.slug}`}
              onClick={onNavigate}
              className="font-serif text-[1.05rem] leading-snug text-espresso hover:underline"
            >
              {line.product.name}
            </Link>
            {summary && <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{summary}</p>}
          </div>
          <p className="shrink-0 text-sm font-semibold tabular-nums">{formatINR(line.total)}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            onChange={(q) => setQuantity(line.key, q)}
            label={`${line.product.name} quantity`}
          />
          <button
            type="button"
            onClick={() => removeItem(line.key)}
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[12.5px] font-medium text-muted hover:text-terracotta-dark"
          >
            <Trash className="size-3.5" aria-hidden /> Remove
            <span className="sr-only"> {line.product.name}</span>
          </button>
        </div>
      </div>
    </li>
  )
}
