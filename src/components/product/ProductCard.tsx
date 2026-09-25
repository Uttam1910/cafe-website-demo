import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { useCart } from '../../context/cart'
import type { Product } from '../../types'
import { formatINR } from '../../utils/format'
import { defaultSelection } from '../../utils/pricing'
import { DietaryBadges, FoodMarker } from '../ui/DietaryBadges'
import { Img } from '../ui/Img'

interface ProductCardProps {
  product: Product
  /** Base path for the detail link — /menu or /order. */
  basePath?: '/menu' | '/order'
  sizes?: string
  showDescription?: boolean
  headingLevel?: 'h2' | 'h3'
  addLabel?: string
  className?: string
}

export function ProductCard({
  product,
  basePath = '/menu',
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw',
  showDescription = true,
  headingLevel: Heading = 'h3',
  addLabel = 'Add',
  className = '',
}: ProductCardProps) {
  const { addItem } = useCart()
  const href = `${basePath}/${product.slug}`
  return (
    <article className={`group relative flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-sand">
        <Img
          name={product.image}
          sizes={sizes}
          alt={product.name}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.note && (
          <span className="absolute top-3 left-3 rounded-full bg-paper/92 px-3 py-1 font-hand text-[1.05rem] leading-none text-terracotta backdrop-blur-sm">
            {product.note}
          </span>
        )}
        <button
          type="button"
          onClick={() => addItem(product, defaultSelection(product))}
          className="absolute right-3 bottom-3 z-10 inline-flex h-10 items-center gap-1.5 rounded-full bg-paper/95 pr-4 pl-3 text-[13px] font-semibold text-espresso shadow-sm backdrop-blur-sm transition-colors hover:bg-espresso hover:text-paper"
          aria-label={`Add ${product.name} to order`}
        >
          <Plus className="size-4" aria-hidden /> {addLabel}
        </button>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex flex-col gap-1 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between min-[420px]:gap-3">
          <Heading className="flex items-center gap-2 font-serif text-[1.18rem] leading-snug text-espresso">
            <FoodMarker product={product} />
            <Link to={href} className="after:absolute after:inset-0 after:content-[''] hover:underline hover:decoration-1 hover:underline-offset-4">
              {product.name}
            </Link>
          </Heading>
          <p className="shrink-0 text-[15px] font-semibold min-[420px]:pt-0.5 text-espresso tabular-nums">{formatINR(product.price)}</p>
        </div>
        {showDescription && <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted">{product.description}</p>}
        <div className="mt-3">
          <DietaryBadges product={product} />
        </div>
      </div>
    </article>
  )
}
