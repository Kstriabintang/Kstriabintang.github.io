import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import {
  Search,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Award,
  Mail,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Languages,
  Download,
  Home as HomeIcon,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

interface PaletteItem {
  id: string
  label: string
  hint?: string
  icon: React.ReactNode
  action: () => void
  group: string
}

export function CommandPalette() {
  const { t, locale, toggle } = useTranslation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    setOpen(false)
    const target = document.querySelector(id)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  const items: PaletteItem[] = useMemo(
    () => [
      { id: 'hero', group: t.nav.about, label: 'Home', icon: <HomeIcon className="w-4 h-4" />, action: () => scrollTo('#hero') },
      { id: 'about', group: 'Navigation', label: t.nav.about, icon: <User className="w-4 h-4" />, action: () => scrollTo('#about') },
      { id: 'skills', group: 'Navigation', label: t.nav.skills, icon: <Code2 className="w-4 h-4" />, action: () => scrollTo('#skills') },
      { id: 'experience', group: 'Navigation', label: t.nav.experience, icon: <Briefcase className="w-4 h-4" />, action: () => scrollTo('#experience') },
      { id: 'projects', group: 'Navigation', label: t.nav.projects, icon: <FolderGit2 className="w-4 h-4" />, action: () => scrollTo('#projects') },
      { id: 'certificates', group: 'Navigation', label: t.nav.certificates, icon: <Award className="w-4 h-4" />, action: () => scrollTo('#certificates') },
      { id: 'contact', group: 'Navigation', label: t.nav.contact, icon: <Mail className="w-4 h-4" />, action: () => scrollTo('#contact') },

      {
        id: 'lang',
        group: 'Actions',
        label: t.nav.switchLang,
        hint: locale === 'en' ? 'EN → ID' : 'ID → EN',
        icon: <Languages className="w-4 h-4" />,
        action: () => {
          toggle()
          setOpen(false)
        },
      },
      {
        id: 'cv',
        group: 'Actions',
        label: t.contact.downloadCV,
        icon: <Download className="w-4 h-4" />,
        action: () => {
          window.open('/cv.pdf', '_blank')
          setOpen(false)
        },
      },
      {
        id: 'email',
        group: 'Actions',
        label: t.contact.hireMe,
        hint: 'mailto',
        icon: <Mail className="w-4 h-4" />,
        action: () => {
          window.location.href = 'mailto:ksatriabintangsamudra2022@gmail.com?subject=Job%20Opportunity'
          setOpen(false)
        },
      },

      {
        id: 'github',
        group: 'Social',
        label: 'GitHub',
        hint: '@Kstriabintang',
        icon: <Github className="w-4 h-4" />,
        action: () => {
          window.open('https://github.com/Kstriabintang', '_blank')
          setOpen(false)
        },
      },
      {
        id: 'linkedin',
        group: 'Social',
        label: 'LinkedIn',
        icon: <Linkedin className="w-4 h-4" />,
        action: () => {
          window.open('https://www.linkedin.com/in/ksatria-bintang-samudra-265952313', '_blank')
          setOpen(false)
        },
      },
      {
        id: 'instagram',
        group: 'Social',
        label: 'Instagram',
        hint: '@ven_0day',
        icon: <Instagram className="w-4 h-4" />,
        action: () => {
          window.open('https://instagram.com/ven_0day', '_blank')
          setOpen(false)
        },
      },
      {
        id: 'whatsapp',
        group: 'Social',
        label: 'WhatsApp',
        icon: <MessageCircle className="w-4 h-4" />,
        action: () => {
          window.open('https://wa.me/6285264402640', '_blank')
          setOpen(false)
        },
      },
    ],
    [t, locale, toggle]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.hint?.toLowerCase().includes(q)
    )
  }, [query, items])

  // Global hotkey: Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      setQuery('')
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function onInputKey(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      filtered[activeIndex]?.action()
    }
  }

  if (!open) return null

  // Group items for display
  const grouped: Record<string, PaletteItem[]> = {}
  filtered.forEach((item) => {
    if (!grouped[item.group]) grouped[item.group] = []
    grouped[item.group].push(item)
  })

  let runningIndex = -1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div
        className="w-full max-w-xl rounded-xl overflow-hidden flex flex-col"
        style={{
          background: 'rgba(13, 17, 23, 0.95)',
          border: '1px solid rgba(124, 58, 237, 0.4)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124, 58, 237, 0.25)',
          maxHeight: '70vh',
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <Search className="w-4 h-4 text-text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={locale === 'id' ? 'Ketik untuk mencari...' : 'Type to search...'}
            className="flex-1 bg-transparent border-none outline-none font-inter text-sm text-text-primary placeholder:text-text-muted"
            aria-label="Search commands"
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="font-jetbrains text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center font-inter text-sm text-text-muted">
              {locale === 'id' ? 'Tidak ada hasil' : 'No results'}
            </div>
          ) : (
            Object.entries(grouped).map(([group, groupItems]) => (
              <div key={group} className="mb-1">
                <div className="px-4 py-1 font-jetbrains text-[10px] uppercase tracking-wider text-text-muted">
                  {group}
                </div>
                {groupItems.map((item) => {
                  runningIndex++
                  const idx = runningIndex
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={item.id}
                      data-index={idx}
                      onClick={() => item.action()}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors"
                      style={{
                        background: isActive ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                        borderLeft: isActive
                          ? '2px solid #A78BFA'
                          : '2px solid transparent',
                      }}
                    >
                      <span
                        className="flex items-center justify-center"
                        style={{ color: isActive ? '#A78BFA' : '#9CA3AF' }}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1 font-inter text-sm text-text-primary">
                        {item.label}
                      </span>
                      {item.hint && (
                        <span className="font-jetbrains text-[11px] text-text-muted">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 flex items-center justify-between font-jetbrains text-[10px] text-text-muted"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <span className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded border border-white/10">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 rounded border border-white/10">↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded border border-white/10">⏎</kbd> select
            </span>
          </span>
          <span>
            <kbd className="px-1 py-0.5 rounded border border-white/10">⌘K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  )
}
