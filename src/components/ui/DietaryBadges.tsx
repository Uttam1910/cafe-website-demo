import { dietaryInfo } from '../../data/menu'
import type { Dietary, Product } from '../../types'

const markerStyles: Partial<Record<Dietary, string>> = {
  veg: 'border-sage-dark',
  vegan: 'border-sage-dark',
  egg: 'border-caramel',
  'non-veg': 'border-terracotta-dark',
}

const dotStyles: Partial<Record<Dietary, string>> = {
  veg: 'bg-sage-dark rounded-full',
  vegan: 'bg-sage-dark rounded-full',
  egg: 'bg-caramel rounded-full',
  'non-veg': 'bg-terracotta-dark [clip-path:polygon(50%_0,100%_100%,0_100%)]',
}

/** Indian-menu style food marker (square with dot/triangle). */
export function FoodMarker({ product }: { product: Product }) {
  const type = product.dietary.find((d) => d in markerStyles)
  if (!type) return null
  return (
    <span
      className={`inline-grid size-3.5 shrink-0 place-items-center rounded-[3px] border-[1.5px] bg-paper ${markerStyles[type]}`}
      title={dietaryInfo[type].label}
    >
      <span className={`block size-1.5 ${dotStyles[type]}`} aria-hidden />
      <span className="sr-only">{dietaryInfo[type].label}</span>
    </span>
  )
}

export function DietaryBadges({ product, size = 'sm' }: { product: Product; size?: 'sm' | 'md' }) {
  const tags = product.dietary.filter((d) => d !== 'veg' && d !== 'egg' && d !== 'non-veg')
  const text = size === 'sm' ? 'text-[10.5px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Dietary information">
      {tags.map((d) => (
        <li
          key={d}
          className={`rounded-full font-semibold tracking-wide ${text} ${
            d === 'contains-nuts' ? 'bg-sand text-roast' : 'bg-sage-soft text-sage-dark'
          }`}
        >
          {dietaryInfo[d].short === 'GF' && size === 'md' ? dietaryInfo[d].label : dietaryInfo[d].short}
        </li>
      ))}
      {product.veganOption && !product.dietary.includes('vegan') && (
        <li className={`rounded-full border border-sage/50 font-semibold tracking-wide text-sage-dark ${text}`}>
          Vegan option
        </li>
      )}
    </ul>
  )
}
