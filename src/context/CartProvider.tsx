import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { cafe } from '../config/cafe'
import { productById } from '../data/products'
import type { CartLine, OrderDetails, Product, Selection } from '../types'
import { cartTotals, lineKey, unitPrice, type PricedLine } from '../utils/pricing'
import { CartContext } from './cart'
import { useToast } from './toast'

const initialDetails: OrderDetails = {
  type: 'pickup',
  locationId: cafe.locations[0].id,
  pickupTime: 'asap',
  address: '',
  area: '',
  instructions: '',
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([])
  const [details, setDetailsState] = useState<OrderDetails>(initialDetails)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { showToast } = useToast()

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const addItem = useCallback(
    (product: Product, selection: Selection, quantity = 1) => {
      const key = lineKey(product.id, selection)
      setRawLines((prev) => {
        const existing = prev.find((l) => l.key === key)
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(20, l.quantity + quantity) } : l))
        }
        return [...prev, { key, productId: product.id, selection, quantity }]
      })
      showToast({
        message: `${quantity > 1 ? `${quantity} × ` : ''}${product.name} added to your order`,
        action: { label: 'View bag', onClick: openDrawer },
      })
    },
    [showToast, openDrawer],
  )

  const setQuantity = useCallback((key: string, quantity: number) => {
    setRawLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity: Math.min(20, quantity) } : l)),
    )
  }, [])

  const removeItem = useCallback((key: string) => setRawLines((prev) => prev.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setRawLines([]), [])
  const setDetails = useCallback(
    (patch: Partial<OrderDetails>) => setDetailsState((prev) => ({ ...prev, ...patch })),
    [],
  )

  const value = useMemo(() => {
    const lines: PricedLine[] = rawLines.flatMap((line) => {
      const product = productById(line.productId)
      if (!product) return []
      const unit = unitPrice(product, line.selection)
      return [{ ...line, product, unit, total: unit * line.quantity }]
    })
    return {
      lines,
      itemCount: lines.reduce((n, l) => n + l.quantity, 0),
      totals: cartTotals(lines, details.type),
      details,
      setDetails,
      addItem,
      setQuantity,
      removeItem,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
    }
  }, [rawLines, details, setDetails, addItem, setQuantity, removeItem, clear, drawerOpen, openDrawer, closeDrawer])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
