import { memo } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Animated mesh gradient — three colored blobs slowly morphing across
 * the parent. Pure CSS, GPU-accelerated, mobile-tuned.
 *
 * Parent must be `position: relative` and `overflow: hidden`.
 */
export const Aurora = memo(function Aurora() {
  const reducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="aurora-wrap absolute inset-0 overflow-hidden pointer-events-none"
      data-static={reducedMotion ? 'true' : undefined}
      style={{ zIndex: 0 }}
    >
      <span className="aurora-blob aurora-blob-1" />
      <span className="aurora-blob aurora-blob-2" />
      <span className="aurora-blob aurora-blob-3" />
    </div>
  )
})
