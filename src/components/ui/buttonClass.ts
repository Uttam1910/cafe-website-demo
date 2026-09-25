export type Variant = 'primary' | 'accent' | 'outline' | 'light' | 'ghost-light' | 'text'
export type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-espresso text-paper hover:bg-roast',
  accent: 'bg-terracotta text-paper hover:bg-terracotta-dark',
  outline: 'border border-espresso/25 text-espresso hover:border-espresso hover:bg-espresso hover:text-paper',
  light: 'bg-paper text-espresso hover:bg-sand',
  'ghost-light': 'border border-paper/60 text-paper hover:bg-paper hover:text-espresso',
  text: 'text-espresso underline-offset-[6px] decoration-1 hover:underline px-0!',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-[15px]',
}

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`
