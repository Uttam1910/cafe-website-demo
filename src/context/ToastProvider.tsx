import { Check, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext, type ToastOptions } from './toast'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<(ToastOptions & { id: number }) | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const dismiss = useCallback(() => setToast(null), [])

  const showToast = useCallback((next: ToastOptions) => {
    window.clearTimeout(timer.current)
    setToast({ ...next, id: Date.now() })
    timer.current = window.setTimeout(() => setToast(null), 4200)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-[70] flex justify-center px-4 lg:top-auto lg:bottom-8"
      >
        {toast && (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-md animate-slide-up items-center gap-3 rounded-2xl bg-espresso py-3 pr-2 pl-4 text-sm text-paper shadow-[0_18px_40px_-18px_rgba(40,25,15,0.6)]"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sage/90">
              <Check className="size-3.5" aria-hidden />
            </span>
            <p className="min-w-0 flex-1 leading-snug">{toast.message}</p>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick()
                  dismiss()
                }}
                className="shrink-0 rounded-full px-3 py-1.5 font-semibold text-sand underline-offset-4 hover:underline"
              >
                {toast.action.label}
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notification"
              className="grid size-8 shrink-0 place-items-center rounded-full text-paper/70 hover:bg-white/10 hover:text-paper"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}
