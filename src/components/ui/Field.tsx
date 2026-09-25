import { CircleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

/** Label + control + hint/error wiring. Controls should set aria-describedby={describedBy(id)}. */
export function Field({ id, label, error, hint, optional, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-[13px] font-semibold text-espresso">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-terracotta-dark">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="mt-1.5 text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
