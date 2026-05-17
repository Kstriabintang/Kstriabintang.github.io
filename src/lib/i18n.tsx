import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en } from '@/locales/en'
import { id } from '@/locales/id'

export type Locale = 'en' | 'id'
export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, id }

const STORAGE_KEY = 'ksatria.lang'

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
  if (stored === 'en' || stored === 'id') return stored
  const browserLang = window.navigator.language.toLowerCase()
  return browserLang.startsWith('id') ? 'id' : 'en'
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}

function withViewTransition(update: () => void) {
  const doc = document as DocumentWithVT
  if (typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(update)
  } else {
    update()
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectInitialLocale())

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (l: Locale) => withViewTransition(() => setLocaleState(l)),
      toggle: () =>
        withViewTransition(() =>
          setLocaleState((l) => (l === 'en' ? 'id' : 'en'))
        ),
      t: dictionaries[locale],
    }),
    [locale]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used inside <LanguageProvider>')
  return ctx
}
