import type { ReactNode } from 'react'

interface SectionHeadingProps {
  accent?: string
  title: ReactNode
  intro?: ReactNode
  action?: ReactNode
  id?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  tone?: 'dark' | 'light'
}

export function SectionHeading({
  accent,
  title,
  intro,
  action,
  id,
  align = 'left',
  as: Tag = 'h2',
  tone = 'dark',
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div
      className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        {accent && <p className={`hand mb-2 ${tone === 'light' ? 'text-sand!' : ''}`}>{accent}</p>}
        <Tag
          id={id}
          className={`text-[2.1rem] leading-[1.05] font-normal sm:text-5xl ${tone === 'light' ? 'text-paper' : ''}`}
        >
          {title}
        </Tag>
        {intro && (
          <p className={`mt-4 max-w-xl text-[15px] leading-relaxed sm:text-base ${tone === 'light' ? 'text-paper/75' : 'text-muted'} ${centered ? 'mx-auto' : ''}`}>
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
