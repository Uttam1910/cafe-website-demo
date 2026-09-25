import type { ReactNode } from 'react'

interface PageIntroProps {
  accent?: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}

/** Standard editorial page header for inner pages. */
export function PageIntro({ accent, title, intro, children }: PageIntroProps) {
  return (
    <header className="container-page pt-10 pb-8 sm:pt-16 sm:pb-12">
      {accent && <p className="hand mb-3">{accent}</p>}
      <h1 className="max-w-4xl text-[2.6rem] leading-[1.02] font-normal sm:text-6xl lg:text-7xl">{title}</h1>
      {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      {children}
    </header>
  )
}
