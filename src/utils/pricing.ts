import { cafe } from '../config/cafe'
import type { CartLine, OrderType, Product, Selection } from '../types'

export const defaultSelection = (product: Product): Selection => ({
  sizeId: product.sizes?.find((s) => s.priceDelta === 0)?.id ?? product.sizes?.[0]?.id,
  milkId: product.milkOptions?.[0]?.id,
  extraIds: [],
})

export const unitPrice = (product: Product, selection: Selection) => {
  const size = product.sizes?.find((s) => s.id === selection.sizeId)?.priceDelta ?? 0
  const milk = product.milkOptions?.find((m) => m.id === selection.milkId)?.priceDelta ?? 0
  const extras = (product.extras ?? [])
    .filter((e) => selection.extraIds.includes(e.id))
    .reduce((sum, e) => sum + e.priceDelta, 0)
  return product.price + size + milk + extras
}

/** Human-readable summary such as "Large · Oat · Extra Espresso". */
export const selectionSummary = (product: Product, selection: Selection) => {
  const parts: string[] = []
  const size = product.sizes?.find((s) => s.id === selection.sizeId)
  if (size && product.sizes && product.sizes.length > 1) parts.push(size.label.split(' · ')[0])
  const milk = product.milkOptions?.find((m) => m.id === selection.milkId)
  if (milk) parts.push(milk.label)
  for (const extra of product.extras ?? []) {
    if (selection.extraIds.includes(extra.id)) parts.push(extra.label)
  }
  return parts.join(' · ')
}

export const lineKey = (productId: string, selection: Selection) =>
  [productId, selection.sizeId ?? '-', selection.milkId ?? '-', [...selection.extraIds].sort().join('+')].join('|')

export interface PricedLine extends CartLine {
  product: Product
  unit: number
  total: number
}

export const cartTotals = (lines: PricedLine[], orderType: OrderType) => {
  const subtotal = lines.reduce((sum, l) => sum + l.total, 0)
  const { deliveryFee, freeDeliveryFrom, taxRate } = cafe.pricing
  const delivery =
    orderType === 'delivery' && subtotal > 0 && subtotal < freeDeliveryFrom ? deliveryFee : 0
  const tax = Math.round(subtotal * taxRate)
  return { subtotal, delivery, tax, total: subtotal + delivery + tax }
}

export type CartTotals = ReturnType<typeof cartTotals>
