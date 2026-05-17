import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

/**
 * Swap document.title when the tab loses focus.
 * Restores the original title on return.
 */
export function TabTitleEgg() {
  const { locale } = useTranslation()

  useEffect(() => {
    const original = document.title
    const away =
      locale === 'id'
        ? '👀 Kembali yuk, jangan pergi...'
        : "👀 Come back, I'm not done yet..."

    const onVisibility = () => {
      document.title = document.hidden ? away : original
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.title = original
    }
  }, [locale])

  return null
}
