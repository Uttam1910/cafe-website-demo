interface PillsProps<T extends string> {
  options: { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
  counts?: Partial<Record<T, number>>
}

/** Single-select filter pills (toolbar of toggle buttons). */
export function Pills<T extends string>({ options, value, onChange, label, counts }: PillsProps<T>) {
  return (
    <div role="toolbar" aria-label={label} className="scroll-row -mx-4 gap-2! px-4 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((o) => {
        const active = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`h-10 shrink-0 snap-start rounded-full border px-4 text-[13px] font-semibold transition-colors ${
              active
                ? 'border-espresso bg-espresso text-paper'
                : 'border-line bg-paper text-roast hover:border-espresso/40'
            }`}
          >
            {o.label}
            {counts?.[o.id] !== undefined && (
              <span className={`ml-1.5 text-[11px] font-medium ${active ? 'text-paper/70' : 'text-muted'}`}>
                {counts[o.id]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
