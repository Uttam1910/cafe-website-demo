import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { cafe } from '../config/cafe'

const setMeta = (selector: string, attr: string, key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Sets per-route title, description and canonical URL. */
export function useDocumentMeta(title: string | null, description: string) {
  const { pathname } = useLocation()
  useEffect(() => {
    const fullTitle = title ? `${cafe.brandName} — ${title}` : `${cafe.brandName} — Coffee, Bakes & Good Days`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${window.location.origin}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
  }, [title, description, pathname])
}
