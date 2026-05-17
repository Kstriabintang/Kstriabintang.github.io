import { useEffect, useState } from 'react'

/**
 * Tracks which #section is currently in view using IntersectionObserver.
 * Returns the id of the most-visible section, or '' if none.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id.replace(/^#/, '')))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visibility = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio)
        }
        let best = ''
        let bestRatio = 0
        for (const [id, ratio] of visibility.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        }
        if (bestRatio > 0) setActive(best)
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: '-80px 0px -40% 0px',
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
