import type { CategoryId, Dietary, OptionChoice } from '../types'

export type MenuFilter = 'all' | CategoryId | 'vegan'

export const menuCategories: { id: MenuFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea-matcha', label: 'Tea & Matcha' },
  { id: 'cold-drinks', label: 'Cold Drinks' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'vegan', label: 'Vegan' },
]

export const categoryLabel = (id: CategoryId) =>
  menuCategories.find((c) => c.id === id)?.label ?? id

export const dietaryInfo: Record<Dietary, { label: string; short: string }> = {
  veg: { label: 'Vegetarian', short: 'Veg' },
  egg: { label: 'Contains egg', short: 'Egg' },
  'non-veg': { label: 'Non-vegetarian', short: 'Non-veg' },
  vegan: { label: 'Vegan', short: 'Vegan' },
  'gluten-free': { label: 'Gluten-free', short: 'GF' },
  'contains-nuts': { label: 'Contains nuts', short: 'Nuts' },
}

export type DietaryFilter = 'vegetarian' | 'vegan' | 'gluten-free' | 'nut-free'

export const dietaryFilters: { id: DietaryFilter; label: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-free' },
  { id: 'nut-free', label: 'Nut-free' },
]

/* Shared customisation sets for espresso-based drinks. */
export const drinkSizes: OptionChoice[] = [
  { id: 'small', label: 'Small · 240 ml', priceDelta: -30 },
  { id: 'regular', label: 'Regular · 300 ml', priceDelta: 0 },
  { id: 'large', label: 'Large · 360 ml', priceDelta: 50 },
]

export const milkOptions: OptionChoice[] = [
  { id: 'whole', label: 'Whole Milk', priceDelta: 0 },
  { id: 'oat', label: 'Oat', priceDelta: 40 },
  { id: 'almond', label: 'Almond', priceDelta: 50 },
  { id: 'soy', label: 'Soy', priceDelta: 30 },
]

export const blackOrMilk: OptionChoice[] = [
  { id: 'none', label: 'No milk', priceDelta: 0 },
  ...milkOptions,
]

export const drinkExtras: OptionChoice[] = [
  { id: 'extra-shot', label: 'Extra Espresso', priceDelta: 40 },
  { id: 'vanilla', label: 'Vanilla', priceDelta: 30 },
  { id: 'caramel', label: 'Caramel', priceDelta: 30 },
  { id: 'whipped-cream', label: 'Whipped Cream', priceDelta: 30 },
]

export const toastExtras: OptionChoice[] = [
  { id: 'poached-egg', label: 'Poached egg', priceDelta: 60 },
  { id: 'feta', label: 'Crumbled feta', priceDelta: 70 },
  { id: 'gf-bread', label: 'Gluten-free bread', priceDelta: 50 },
]

export const bakeExtras: OptionChoice[] = [
  { id: 'warm', label: 'Warmed through', priceDelta: 0 },
  { id: 'butter-jam', label: 'Butter & house jam', priceDelta: 40 },
]

export const dessertExtras: OptionChoice[] = [
  { id: 'cream', label: 'Vanilla cream', priceDelta: 40 },
  { id: 'berries', label: 'Fresh berries', priceDelta: 60 },
]
