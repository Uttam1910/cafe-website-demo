export type ImageKind = 'hero' | 'product' | 'scene'

export interface ImageAsset {
  kind: ImageKind
  w: number
  h: number
  alt: string
  author: string
  authorUrl: string
  sourceUrl: string
}

export type CategoryId =
  | 'coffee'
  | 'tea-matcha'
  | 'cold-drinks'
  | 'breakfast'
  | 'sandwiches'
  | 'bakery'
  | 'desserts'

export type Dietary = 'veg' | 'egg' | 'non-veg' | 'vegan' | 'gluten-free' | 'contains-nuts'

export interface OptionChoice {
  id: string
  label: string
  priceDelta: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: CategoryId
  description: string
  story: string
  price: number
  image: import('../data/images').ImageName
  dietary: Dietary[]
  /** Can be made vegan with a plant milk or swap. */
  veganOption?: boolean
  ingredients: string[]
  sizes?: OptionChoice[]
  milkOptions?: OptionChoice[]
  extras?: OptionChoice[]
  featured?: boolean
  popular?: boolean
  signature?: boolean
  /** Small handwritten label, e.g. "House favourite". */
  note?: string
  prepMinutes: number
}

export interface Selection {
  sizeId?: string
  milkId?: string
  extraIds: string[]
}

export interface CartLine {
  key: string
  productId: string
  selection: Selection
  quantity: number
}

export type OrderType = 'pickup' | 'delivery'

export interface OrderDetails {
  type: OrderType
  locationId: string
  pickupTime: string
  address: string
  area: string
  instructions: string
}

export interface GalleryItem {
  id: string
  image: import('../data/images').ImageName
  category: 'coffee' | 'food' | 'space' | 'people' | 'behind-the-scenes'
  caption: string
  tall?: boolean
}

export interface Testimonial {
  quote: string
  name: string
  context: string
}

export interface Faq {
  question: string
  answer: string
}

export interface LegalSection {
  heading: string
  body: string[]
}
