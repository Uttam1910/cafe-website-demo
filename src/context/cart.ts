import { createContext, useContext } from 'react'
import type { OrderDetails, Product, Selection } from '../types'
import type { CartTotals, PricedLine } from '../utils/pricing'

export interface CartContextValue {
  lines: PricedLine[]
  itemCount: number
  totals: CartTotals
  details: OrderDetails
  setDetails: (patch: Partial<OrderDetails>) => void
  addItem: (product: Product, selection: Selection, quantity?: number) => void
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
