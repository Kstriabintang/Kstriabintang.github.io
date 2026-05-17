import { Children, cloneElement, isValidElement, useEffect, useRef, type ReactElement } from 'react'

interface MagneticProps {
  children: ReactElement<{ ref?: React.Ref<HTMLElement>; style?: React.CSSProperties }>
  /** Pull radius in pixels. Default 110. */
  radius?: number
  /** Pull strength 0..1. Default 0.35. */
  strength?: number
}

/**
 * Wrap a clickable element so it subtly follows the cursor when nearby.
 * Pure transform — no layout shift. Skipped on touch devices.
 */
export function Magnetic({ children, radius = 110, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    let raf = 0

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const distance = Math.hypot(dx, dy)

      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (distance < radius) {
          const factor = (1 - distance / radius) * strength
          el.style.transform = `translate3d(${dx * factor}px, ${dy * factor}px, 0)`
        } else if (el.style.transform) {
          el.style.transform = ''
        }
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [radius, strength])

  const child = Children.only(children)
  if (!isValidElement(child)) return child

  return cloneElement(child, {
    ref,
    style: {
      ...(child.props.style || {}),
      transition: 'transform 0.25s cubic-bezier(0.2, 0.9, 0.2, 1)',
      willChange: 'transform',
    },
  })
}
