import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

export function DemoNote({ children, className = '', tone = 'default' }: { children: ReactNode; className?: string; tone?: 'default' | 'light' }) {
  return (
    <p
      className={`flex items-start gap-2 text-[13px] leading-snug ${tone === 'light' ? 'text-paper/70' : 'text-muted'} ${className}`}
    >
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  )
}
