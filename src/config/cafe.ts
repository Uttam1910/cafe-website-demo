/**
 * Central café configuration. Swap these values to re-brand the demo
 * for another café — every page reads from here.
 */
export const cafe = {
  brandName: 'MORNING THEORY',
  tagline: 'Take your time.',
  descriptor: 'COFFEE • BAKES • GOOD DAYS',
  intro: 'Specialty coffee, fresh bakes, and good days — made slowly and served warmly.',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'hello@morningtheory.example',
  address: {
    line1: '14 Pali Hill Lane',
    line2: 'Bandra West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postcode: '400050',
  },
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Bandra+West+Mumbai',
  hours: [
    { days: 'Monday – Friday', time: '7:30 am – 10:00 pm' },
    { days: 'Saturday – Sunday', time: '8:00 am – 11:00 pm' },
  ],
  /** Opening window used to generate pickup and reservation slots (24h). */
  openHour: 8,
  closeHour: 22,
  instagram: '@morningtheory.cafe',
  socialLinks: [
    { id: 'instagram', label: 'Instagram' },
    { id: 'facebook', label: 'Facebook' },
  ],
  locations: [
    { id: 'bandra', name: 'Bandra West', detail: 'Pali Hill Lane · flagship' },
    { id: 'khar', name: 'Khar West', detail: '16th Road · pickup counter' },
  ],
  pricing: {
    taxRate: 0.05,
    taxLabel: 'GST (5%)',
    deliveryFee: 49,
    freeDeliveryFrom: 799,
  },
  prepEstimate: { pickup: '15–20 min', delivery: '35–45 min' },
  demoMode: true,
  demoNotice: 'Website demo concept — business details shown for demonstration purposes.',
} as const

export type Cafe = typeof cafe

export const fullAddress = `${cafe.address.line1}, ${cafe.address.line2}, ${cafe.address.city}, ${cafe.address.region} ${cafe.address.postcode}`
