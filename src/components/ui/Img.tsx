import { imageWidths, images, type ImageName } from '../../data/images'
import { imageSrc } from '../../utils/images'

interface ImgProps {
  name: ImageName
  /** Responsive `sizes` hint for the browser. */
  sizes: string
  alt?: string
  className?: string
  priority?: boolean
}

export function Img({ name, sizes, alt, className, priority = false }: ImgProps) {
  const asset = images[name]
  const widths = imageWidths[asset.kind]
  const srcSet = widths.map((w) => `${imageSrc(name, w)} ${w}w`).join(', ')
  return (
    <img
      src={imageSrc(name)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt ?? asset.alt}
      width={asset.w}
      height={asset.h}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
    />
  )
}
