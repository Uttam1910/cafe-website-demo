import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  label: string
  min?: number
  max?: number
  size?: 'sm' | 'md'
}

export function QuantityStepper({ value, onChange, label, min = 1, max = 20, size = 'md' }: QuantityStepperProps) {
  const btn = size === 'sm' ? 'size-8' : 'size-11'
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-line bg-paper"
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={`${btn} grid place-items-center rounded-full text-espresso transition-colors hover:bg-sand disabled:opacity-35`}
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <output aria-live="polite" className={`min-w-7 text-center font-semibold tabular-nums ${size === 'sm' ? 'text-sm' : ''}`}>
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className={`${btn} grid place-items-center rounded-full text-espresso transition-colors hover:bg-sand disabled:opacity-35`}
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}
