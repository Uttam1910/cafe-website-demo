import type { DietaryFilter, MenuFilter } from '../data/menu'
import { categoryLabel } from '../data/menu'
import { products } from '../data/products'
import type { Product } from '../types'

export const matchProducts = (query: string) => {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) =>
    [p.name, p.description, categoryLabel(p.category), ...p.dietary, p.veganOption ? 'vegan' : '', ...p.ingredients]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}

const dietaryTest: Record<DietaryFilter, (p: Product) => boolean> = {
  vegetarian: (p) => p.dietary.includes('veg') || p.dietary.includes('vegan'),
  vegan: (p) => p.dietary.includes('vegan') || Boolean(p.veganOption),
  'gluten-free': (p) => p.dietary.includes('gluten-free'),
  'nut-free': (p) => !p.dietary.includes('contains-nuts'),
}

export const inCategory = (p: Product, category: MenuFilter) =>
  category === 'all' || (category === 'vegan' ? dietaryTest.vegan(p) : p.category === category)

export const filterProducts = (query: string, category: MenuFilter, dietary: DietaryFilter[]) =>
  matchProducts(query).filter((p) => inCategory(p, category) && dietary.every((d) => dietaryTest[d](p)))
