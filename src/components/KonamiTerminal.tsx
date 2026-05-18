import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { X } from 'lucide-react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
]

const BANNER = String.raw`
   __ __           __        _
  / //_/__ ___ ___/ /____ __(_)__ _
 / ,< (_-</ _ ` + "`" + `/ _  / __/ / / / _ ` + "`" + `/
/_/|_/___/\_,_/\_,_/_/  \_,_/\_,_/
       :: bug.hunter // dev ::

ACCESS GRANTED. Welcome to the secret terminal.
Type ` + "`" + `help` + "`" + ` to see available commands.
`

type Line = { kind: 'prompt' | 'out' | 'err'; text: string }

const COMMANDS: Record<string, (arg: string) => string> = {
  help: () => [
    'Available commands:',
    '  help                Show this menu',
    '  whoami              About me',
    '  ls                  List secret files',
    '  cat <file>          Read a file (try: secret.txt, contact.txt)',
    '  nmap                Scan ports',
    '  sudo hire-me        Try your luck',
    '  skills              Stack overview',
    '  social              All my handles',
    '  clear               Clear the terminal',
    '  exit                Close terminal',
  ].join('\n'),

  whoami: () =>
    'ksatria — ai engineer / automation builder / solutions architect.\nPontianak, Indonesia. Spec-driven, AI-orchestrated, human-verified.',

  ls: () =>
    'secret.txt   contact.txt   skills.json   .ssh/   projects/   wisdom.md',

  cat: (arg) => {
    const file = arg.trim()
    const files: Record<string, string> = {
      'secret.txt': 'Honestly? I sleep better knowing my code does too.\nHidden Easter egg #2: try typing the word "matrix".',
      'contact.txt': 'mail   : ksatriabintangsamudra2022@gmail.com\nwa     : +62 852-6440-2640\ngithub : github.com/Kstriabintang',
      'wisdom.md': '"Hackers are breaking the systems for profit.\n Before, it was about intellectual curiosity\n and pursuit of knowledge." — Kevin Mitnick',
      'skills.json': '{ "primary": ["React", "Node", "Python"], "secret_weapon": "patience" }',
    }
    if (!file) return 'usage: cat <file>'
    return files[file] ?? `cat: ${file}: No such file or directory`
  },

  nmap: () => [
    'Starting nmap on ksatria.dev...',
    '',
    'PORT     STATE SERVICE  VERSION',
    '22/tcp   open  ssh      OpenSSH 9.x',
    '80/tcp   open  http     nginx',
    '443/tcp  open  https    nginx (TLS 1.3)',
    '3000/tcp open  nextjs   React 19',
    '',
    'Scan complete. 0 vulnerabilities found. (this time)',
  ].join('\n'),

  sudo: (arg) => {
    if (arg.trim() === 'hire-me') {
      return 'Permission granted. Opening recruiter channel...\n→ mailto:ksatriabintangsamudra2022@gmail.com?subject=Job%20Opportunity'
    }
    return `sudo: ${arg}: command not found`
  },

  skills: () =>
    [
      'ai        : Claude, GPT, Cursor, v0, Lovable, prompt-engineering',
      'frontend  : React, Next.js, TypeScript, Tailwind, GSAP, Vite',
      'backend   : Node.js, Express, Flask, FastAPI, Python',
      'data      : PostgreSQL, MySQL, MongoDB, Firebase',
      'security  : Pentest, OWASP, Vuln-Assessment, Burp Suite',
      'platforms : Git, GitHub, Docker, Linux, Google Workspace',
    ].join('\n'),

  social: () =>
    [
      'github    : https://github.com/Kstriabintang',
      'linkedin  : https://www.linkedin.com/in/ksatria-bintang-samudra-265952313',
      'instagram : https://instagram.com/ven_0day',
      'tiktok    : https://tiktok.com/@ksatriabintangsamudra',
    ].join('\n'),

  matrix: () =>
    '01001000 01100001 01100011 01101011 01100101 01110010 01110011\n01101110 01100101 01110110 01100101 01110010 00100000 01110011\n01101100 01100101 01100101 01110000 00101110 00101110 00101110',

  echo: (arg) => arg,
}

function runCommand(input: string): Line[] {
  const trimmed = input.trim()
  if (!trimmed) return []

  const [cmd, ...rest] = trimmed.split(' ')
  const arg = rest.join(' ')

  if (cmd === 'clear') return [{ kind: 'out', text: '__CLEAR__' }]
  if (cmd === 'exit') return [{ kind: 'out', text: '__EXIT__' }]

  const handler = COMMANDS[cmd]
  if (!handler) {
    return [{ kind: 'err', text: `${cmd}: command not found. Try 'help'.` }]
  }
  return [{ kind: 'out', text: handler(arg) }]
}

export function KonamiTerminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const sequenceRef = useRef<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Detect Konami sequence
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) return
      sequenceRef.current = [...sequenceRef.current, e.code].slice(-KONAMI.length)
      if (sequenceRef.current.join(',') === KONAMI.join(',')) {
        sequenceRef.current = []
        setOpen(true)
        setLines([{ kind: 'out', text: BANNER }])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Focus + scroll on open / line change
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    }
  }, [open, lines])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function submit() {
    const cmd = input
    const next: Line[] = [...lines, { kind: 'prompt', text: cmd }]
    const result = runCommand(cmd)

    for (const r of result) {
      if (r.text === '__CLEAR__') {
        setLines([])
        setInput('')
        return
      }
      if (r.text === '__EXIT__') {
        setOpen(false)
        setInput('')
        setLines([])
        return
      }
      next.push(r)
    }

    setLines(next)
    if (cmd.trim()) setHistory((h) => [...h, cmd])
    setHistoryIndex(-1)
    setInput('')
  }

  function onInputKey(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const idx = historyIndex + 1
      if (idx >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(idx)
        setInput(history[idx])
      }
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hidden terminal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden flex flex-col"
        style={{
          background: '#0D1117',
          border: '1px solid rgba(124, 58, 237, 0.4)',
          boxShadow: '0 0 40px rgba(124, 58, 237, 0.3)',
          maxHeight: '80vh',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 font-jetbrains text-xs text-text-muted flex-1">
            ksatria@secret: ~
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close terminal"
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 font-jetbrains text-sm leading-relaxed"
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line.kind === 'prompt' && (
                <>
                  <span className="text-purple-400">ksatria@secret:~$</span>{' '}
                  <span className="text-text-primary">{line.text}</span>
                </>
              )}
              {line.kind === 'out' && (
                <span className="text-text-primary">{line.text}</span>
              )}
              {line.kind === 'err' && (
                <span className="text-red-400">{line.text}</span>
              )}
            </div>
          ))}

          {/* Active prompt */}
          <div className="flex items-center mt-1">
            <span className="text-purple-400 mr-2">ksatria@secret:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKey}
              className="flex-1 bg-transparent border-none outline-none font-jetbrains text-text-primary"
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Footer hint */}
        <div
          className="px-4 py-2 font-jetbrains text-[10px] text-text-muted flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <span>↑↓ history · ESC to close</span>
          <span>type 'help' for commands</span>
        </div>
      </div>
    </div>
  )
}
