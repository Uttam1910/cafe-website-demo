import type { OrderDetails } from '../types'
import { pickupSlots } from './slots'
import type { Errors } from './validation'

export const deliveryAreas = ['Bandra West', 'Bandra East', 'Khar West', 'Santacruz West']

export type OrderTypeField = 'pickupTime' | 'address' | 'area'

export const validateOrderDetails = (details: OrderDetails): Errors<OrderTypeField> => {
  if (details.type === 'pickup') {
    const { asap, slots } = pickupSlots()
    const valid =
      (details.pickupTime === 'asap' && asap) || slots.some((s) => s.value === details.pickupTime)
    return valid ? {} : { pickupTime: 'Please choose a pickup time.' }
  }
  const errors: Errors<OrderTypeField> = {}
  if (details.address.trim().length < 8) errors.address = 'Please enter your full delivery address.'
  if (!details.area) errors.area = 'Please choose your area.'
  return errors
}
