import type { ImageName } from './images'

export interface HeroSlide {
  id: string
  image: ImageName
  eyebrow: string
  headline: string
  body: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'coffee',
    image: 'hero-coffee',
    eyebrow: 'Coffee • Bakes • Good days',
    headline: 'Take your time.',
    body: 'Specialty coffee, fresh bakes, and good days — made slowly and served warmly.',
  },
  {
    id: 'breakfast',
    image: 'hero-breakfast',
    eyebrow: 'All-day breakfast',
    headline: 'Good mornings start here.',
    body: 'Soft akuri, truffle mushroom toast and pancakes made to order — from 7:30 every morning.',
  },
  {
    id: 'friends',
    image: 'hero-friends',
    eyebrow: 'Bandra West, Mumbai',
    headline: 'Stay for another cup.',
    body: 'Big tables, sunny corners and no rush at all. Bring a book, a laptop or a friend.',
  },
]

export const brandStrip = [
  { title: 'Specialty Coffee', body: 'Freshly roasted', icon: 'coffee' },
  { title: 'Baked Daily', body: 'Made in our kitchen', icon: 'croissant' },
  { title: 'Plant-based Options', body: 'Something for everyone', icon: 'sprout' },
  { title: 'Good Spaces', body: 'Stay awhile', icon: 'sofa' },
] as const

export const craftPillars: { title: string; body: string; image: ImageName; label: string }[] = [
  {
    title: 'Good beans',
    body: 'Thoughtfully selected specialty coffee from small Indian estates, roasted in small batches and dialled in every morning.',
    image: 'barista-machine',
    label: 'Chikmagalur · Coorg',
  },
  {
    title: 'Good bakes',
    body: 'Croissants laminated over three days, cookies and cakes baked in small batches — freshly prepared throughout the day.',
    image: 'baker-dough',
    label: 'Baked in-house',
  },
  {
    title: 'Good spaces',
    body: 'Long tables, window counters and soft corners. A place to work, meet, read, or simply do nothing.',
    image: 'interior-plants',
    label: 'Stay awhile',
  },
]
