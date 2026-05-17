import { useEffect } from 'react'

/**
 * Global mouse tracker — updates --mouse-x / --mouse-y CSS vars
 * on every `.spotlight-card` element near the viewport.
 *
 * Render once at app root. Zero render output.
 */
export function SpotlightTracker() {
  useEffect(() => {
    // Skip on touch/coarse pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    let pending: MouseEvent | null = null

    const update = () => {
      raf = 0
      if (!pending) return
      const { clientX, clientY } = pending
      const cards = document.querySelectorAll<HTMLElement>('.spotlight-card')
      const vh = window.innerHeight
      for (const card of cards) {
        const rect = card.getBoundingClientRect()
        // Only update cards near viewport
        if (rect.bottom < -100 || rect.top > vh + 100) continue
        card.style.setProperty('--mouse-x', `${clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${clientY - rect.top}px`)
      }
      pending = null
    }

    const onMove = (e: MouseEvent) => {
      pending = e
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
