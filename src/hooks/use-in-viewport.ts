import { useEffect, useState, type RefObject } from 'react'

/**
 * Returns true when the given element is intersecting the viewport.
 * Use to pause expensive animations when the element is offscreen.
 */
export function useInViewport(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '0px'
): boolean {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
