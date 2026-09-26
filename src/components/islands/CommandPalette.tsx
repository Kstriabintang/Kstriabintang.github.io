// ⌘K command palette. Opens on ⌘K / Ctrl+K and on the 'kb:open-palette' window event.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { rank } from './fuzzy';

type Kind = 'Page' | 'Section' | 'Project' | 'Tool' | 'Social' | 'Action';

interface Item {
  title: string;
  href: string;
  kind: Kind;
  keywords?: string;
  action?: 'theme' | 'terminal' | 'email' | 'chat';
}

const ICONS: Record<Kind, string> = {
  Page: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  Section: '<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>',
  Project: '<rect width="20" height="14" x="2" y="6" rx="2"/><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  Tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  Social: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  Action: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
};

const FALLBACK: Item[] = [
  { title: 'Home', href: '/', kind: 'Page' },
  { title: 'Projects', href: '/projects', kind: 'Page' },
  { title: 'Services', href: '/services', kind: 'Page' },
  { title: 'About', href: '/about', kind: 'Page' },
  { title: 'Uses', href: '/uses', kind: 'Page' },
  { title: 'Resume', href: '/resume', kind: 'Page' },
  { title: "Let's connect", href: '/#contact', kind: 'Section' },
  { title: 'Toggle theme', href: '#theme', kind: 'Action', action: 'theme' },
  { title: 'Open terminal', href: '#terminal', kind: 'Action', action: 'terminal' },
];

function ItemIcon({ kind }: { kind: Kind }) {
  return (
    <span className="cmdk__item-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: ICONS[kind] ?? ICONS.Page }}
      />
    </span>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const loadedRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const load = useCallback(async () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    setLoading(true);
    try {
      const res = await fetch('/search.json');
      if (!res.ok) throw new Error(String(res.status));
      setItems((await res.json()) as Item[]);
    } catch {
      setItems(FALLBACK);
    } finally {
      setLoading(false);
    }
  }, []);

  const openPalette = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    void load();
  }, [load]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen((was) => {
          if (!was) {
            returnFocusRef.current = document.activeElement as HTMLElement | null;
            void load();
          }
          return !was;
        });
      }
    };
    const onOpen = () => openPalette();
    window.addEventListener('keydown', onKey);
    window.addEventListener('kb:open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('kb:open-palette', onOpen);
    };
  }, [load, openPalette]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.documentElement.style.overflow = '';
      setQuery('');
      setActive(0);
      returnFocusRef.current?.focus?.();
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const results = useMemo(() => {
    if (!items) return [];
    const q = query.trim();
    if (!q) return items.filter((i) => i.kind === 'Page').slice(0, 8);
    return rank(items, q);
  }, [items, query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const choose = (item?: Item) => {
    const target = item ?? results[active];
    if (!target) return;
    setOpen(false);
    switch (target.action) {
      case 'theme':
        document.getElementById('theme-toggle')?.click();
        return;
      case 'terminal':
        window.dispatchEvent(new CustomEvent('kb:open-terminal'));
        return;
      case 'chat':
        window.dispatchEvent(new CustomEvent('kb:open-chat'));
        return;
      default:
        break;
    }
    if (/^https?:/.test(target.href)) window.open(target.href, '_blank', 'noopener');
    else window.location.href = target.href;
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  if (!open || typeof document === 'undefined') return null;

  const activeId = results[active] ? `cmdk-opt-${active}` : undefined;

  return createPortal(
    <div
      className="cmdk-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Search the site">
        <div className="cmdk__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="cmdk__input"
            type="text"
            placeholder="Search projects, pages, tools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-results"
            aria-activedescendant={activeId}
            aria-label="Search query"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button type="button" className="cmdk__esc" onClick={close} aria-label="Close search">
            esc
          </button>
        </div>
        <ul className="cmdk__results" id="cmdk-results" ref={listRef} role="listbox" aria-label="Results">
          {loading && <li className="cmdk__empty">Loading…</li>}
          {!loading && results.length === 0 && (
            <li className="cmdk__empty">{query ? `No matches for “${query.trim()}”.` : 'Type to search.'}</li>
          )}
          {results.map((item, i) => (
            <li key={`${item.kind}-${item.href}-${item.title}`} data-i={i} id={`cmdk-opt-${i}`} role="option" aria-selected={i === active}>
              <a
                href={item.href}
                className={`cmdk__item${i === active ? ' cmdk__item--active' : ''}`}
                onMouseMove={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault();
                  choose(item);
                }}
                tabIndex={-1}
              >
                <ItemIcon kind={item.kind} />
                <span className="cmdk__item-title">{item.title}</span>
                <span className="cmdk__item-kind">{item.kind}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="cmdk__footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
