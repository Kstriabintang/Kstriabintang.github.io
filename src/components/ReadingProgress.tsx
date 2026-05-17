import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const scrollTop = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0
      setProgress(pct)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
      style={{ height: 2 }}
    >
      <div
        className="h-full transition-transform duration-100 ease-out origin-left"
        style={{
          background: 'linear-gradient(90deg, #7C3AED, #A78BFA, #F97316)',
          width: '100%',
          transform: `scaleX(${progress / 100})`,
          boxShadow: '0 0 8px rgba(124, 58, 237, 0.6)',
        }}
      />
    </div>
  )
}
