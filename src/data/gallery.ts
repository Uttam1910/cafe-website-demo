import type { GalleryItem } from '../types'

export const galleryCategories: { id: 'all' | GalleryItem['category']; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'food', label: 'Food' },
  { id: 'space', label: 'Space' },
  { id: 'people', label: 'People' },
  { id: 'behind-the-scenes', label: 'Behind the Scenes' },
]

export const gallery: GalleryItem[] = [
  { id: 'g01', image: 'latte-art-pour', category: 'coffee', caption: 'The first pour of the morning', tall: true },
  { id: 'g02', image: 'interior-sun', category: 'space', caption: 'Four o’clock light across the long table' },
  { id: 'g03', image: 'brunch-flatlay', category: 'food', caption: 'Sunday brunch, for the whole table' },
  { id: 'g04', image: 'chai-share', category: 'people', caption: 'Chai, passed across the table' },
  { id: 'g05', image: 'baker-dough', category: 'behind-the-scenes', caption: 'Dough that started two days ago' },
  { id: 'g06', image: 'chai-hand', category: 'coffee', caption: 'Kulhad chai, the way it should be', tall: true },
  { id: 'g07', image: 'interior-plants', category: 'space', caption: 'The plant corner everyone asks about', tall: true },
  { id: 'g08', image: 'breakfast-tray', category: 'food', caption: 'Croissant, coffee, fresh orange', tall: true },
  { id: 'g09', image: 'coffee-date', category: 'people', caption: 'One coffee became three hours' },
  { id: 'g10', image: 'cupping', category: 'behind-the-scenes', caption: 'Tuesday cupping — choosing the next pour over' },
  { id: 'g11', image: 'latte-top', category: 'coffee', caption: 'Leaf, rosetta, tulip — whatever the milk allows' },
  { id: 'g12', image: 'interior-wood', category: 'space', caption: 'Banquettes made for long conversations' },
  { id: 'g13', image: 'croissants-tray', category: 'food', caption: 'First batch, 7:30 am' },
  { id: 'g14', image: 'laptop', category: 'people', caption: 'Work, but slower', tall: true },
  { id: 'g15', image: 'baker-oven', category: 'behind-the-scenes', caption: 'Into the oven' },
  { id: 'g16', image: 'espresso-extraction', category: 'coffee', caption: 'Dialling in the house blend', tall: true },
  { id: 'g17', image: 'window-seat', category: 'space', caption: 'Our favourite seats', tall: true },
  { id: 'g18', image: 'flan-latte', category: 'food', caption: 'Something sweet with your latte' },
  { id: 'g19', image: 'friends-table', category: 'people', caption: 'Catch-ups at the big table' },
  { id: 'g20', image: 'coffee-roasting', category: 'behind-the-scenes', caption: 'Cooling a fresh roast' },
  { id: 'g21', image: 'cozy-cup', category: 'coffee', caption: 'Monsoon mornings', tall: true },
  { id: 'g22', image: 'bakery-counter', category: 'food', caption: 'The counter at its fullest' },
  { id: 'g23', image: 'woman-cafe', category: 'people', caption: 'Staying for another cup', tall: true },
  { id: 'g24', image: 'chai-tray', category: 'behind-the-scenes', caption: 'Chai for the team, before doors open' },
]

export const instagramFeed: GalleryItem['image'][] = [
  'latte-art-pour',
  'breakfast-tray',
  'interior-plants',
  'chai-hand',
  'croissants-tray',
  'chai-share',
  'latte-croissant',
  'cozy-cup',
]
