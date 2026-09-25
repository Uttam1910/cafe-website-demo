import { imageWidths, images, type ImageName } from '../data/images'
import type { ImageKind } from '../types'

const folders: Record<ImageKind, string> = { hero: 'heroes', product: 'products', scene: 'scenes' }

export const imageSrc = (name: ImageName, width?: number) => {
  const { kind } = images[name]
  const widths = imageWidths[kind]
  const w = width ?? widths[1]
  return `/images/${folders[kind]}/${name}-${w}.webp`
}
