// "Ask me anything" AI chat widget: lead gate → streamed answers from /api/chat,
// with an offline keyword fallback when the API is unreachable.
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { fallbackAnswer } from './chatFallback';

interface Lead {
  name: string;
  contact: string;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  streaming?: boolean;
}

const LEAD_KEY = 'kb_chat_lead';
const MSG_KEY = 'kb_chat_messages';
const GREETING =
  "Hey! I'm Bintang's AI assistant, powered by a real LLM. Ask me anything about Bintang's projects, stack, experience — or how to get in touch.";
const SUGGESTIONS = ['What are you building right now?', 'Tell me about CoalTrack', 'Open to remote work?', 'What is your tech stack?'];

const read = <T,>(key: string): T | null => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};
const write = (key: string, value: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

const time = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const uid = () => Math.random().toString(36).slice(2, 10);

// Inline formatting: **bold**, `code`, bare URLs and emails become links.
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith('**')) out.push(<strong key={key}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`')) out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else if (tok.includes('@') && !tok.startsWith('http'))
      out.push(
        <a key={key} href={`mailto:${tok}`}>
          {tok}
        </a>,
      );
    else
      out.push(
        <a key={key} href={tok} target="_blank" rel="noopener noreferrer">
          {tok}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Rich({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim());
  return (
    <>
      {paragraphs.map((p, pi) => (
        <p key={pi}>
          {p.split('\n').map((l, li) => (
            <Fragment key={li}>
              {li > 0 && <br />}
              {inline(l, `${pi}-${li}`)}
            </Fragment>
          ))}
        </p>
      ))}
    </>
  );
}

async function streamChat(
  history: { role: 'user' | 'assistant'; content: string }[],
  lead: Lead | null,
  onDelta: (d: string) => void,
  signal: AbortSignal,
): Promise<void> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history, lead }),
    signal,
  });
  if (!res.ok || !res.body) throw new Error(`chat ${res.status}`);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let got = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const raw of lines) {
      const lineText = raw.trim();
      if (!lineText.startsWith('data:')) continue;
      const payload = lineText.slice(5).trim();
      if (payload === '[DONE]') return;
      try {
        const data = JSON.parse(payload) as { delta?: string; error?: string };
        if (data.error) throw new Error(data.error);
        if (data.delta) {
          got = true;
          onDelta(data.delta);
        }
      } catch (err) {
        if (err instanceof SyntaxError) continue;
        throw err;
      }
    }
  }
  if (!got) throw new Error('empty stream');
}

export default function ChatWidget() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadError, setLeadError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setLead(read<Lead>(LEAD_KEY));
    const stored = read<Message[]>(MSG_KEY);
    if (stored?.length) setMessages(stored.map((m) => ({ ...m, streaming: false })));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(MSG_KEY, messages.filter((m) => !m.streaming));
  }, [messages, ready]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, typing, open]);

  const greet = useCallback(() => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => (m.length ? m : [{ id: uid(), sender: 'bot', text: GREETING, timestamp: time() }]));
      setSuggestions(SUGGESTIONS.slice(0, 3));
    }, 800);
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    window.setTimeout(() => {
      if (read<Lead>(LEAD_KEY)) inputRef.current?.focus();
      else nameRef.current?.focus();
    }, 350);
  }, []);

  useEffect(() => {
    if (open && lead && messages.length === 0 && !typing) greet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lead]);

  useEffect(() => {
    const onOpen = () => openChat();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('kb:open-chat', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('kb:open-chat', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, [openChat]);

  const submitLead = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const name = leadName.trim();
    const contact = leadContact.trim();
    if (!name) return setLeadError('Please enter your name');
    if (!contact) return setLeadError('Please enter your email or phone');
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^\+?[\d\s()-]{7,}$/.test(contact);
    if (!isEmail && !isPhone) return setLeadError('Please enter a valid email or phone number');
    const next = { name: name.slice(0, 80), contact: contact.slice(0, 120) };
    setLeadError('');
    setLead(next);
    write(LEAD_KEY, next);
    void fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(next),
    }).catch(() => undefined);
    window.setTimeout(() => inputRef.current?.focus(), 900);
  };

  const send = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || busy) return;
    setInput('');
    setSuggestions([]);
    const userMsg: Message = { id: uid(), sender: 'user', text: text.slice(0, 2000), timestamp: time() };
    const history = [...messages, userMsg]
      .filter((m) => m.text)
      .slice(-12)
      .map((m) => ({ role: m.sender === 'user' ? ('user' as const) : ('assistant' as const), content: m.text }));
    setMessages((m) => [...m, userMsg]);
    setBusy(true);
    setTyping(true);

    const botId = uid();
    let started = false;
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      await streamChat(
        history,
        lead,
        (delta) => {
          if (!started) {
            started = true;
            setTyping(false);
            setMessages((m) => [...m, { id: botId, sender: 'bot', text: delta, timestamp: time(), streaming: true }]);
          } else {
            setMessages((m) => m.map((msg) => (msg.id === botId ? { ...msg, text: msg.text + delta } : msg)));
          }
        },
        controller.signal,
      );
      setMessages((m) => m.map((msg) => (msg.id === botId ? { ...msg, streaming: false, timestamp: time() } : msg)));
    } catch {
      const answer = fallbackAnswer(text);
      setTyping(false);
      setMessages((m) => {
        const without = m.filter((msg) => msg.id !== botId);
        return [...without, { id: botId, sender: 'bot', text: answer, timestamp: time() }];
      });
    } finally {
      setTyping(false);
      setBusy(false);
      abortRef.current = null;
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const copy = async (msg: Message) => {
    try {
      await navigator.clipboard.writeText(msg.text);
      setCopied(msg.id);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  if (!ready) return null;

  return (
    <>
      <button
        type="button"
        className={`ai-chat__trigger ${open ? 'ai-chat__trigger--hidden' : ''}`}
        onClick={openChat}
        aria-label="Ask me anything — chat with Bintang's AI assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="ai-chat__trigger-label">Ask me anything</span>
      </button>

      <div className={`ai-chat ${open ? 'ai-chat--open' : ''}`} role="dialog" aria-label="Chat with Bintang's AI assistant" aria-hidden={!open}>
        <div className="ai-chat__header">
          <div className="ai-chat__header-info">
            <img className="ai-chat__avatar" src="/images/profile.jpg" alt="Ksatria Bintang Samudra" width="40" height="40" />
            <div className="ai-chat__header-text">
              <span className="ai-chat__header-name">
                Bintang’s AI<span className="ai-chat__ai-badge">LLM</span>
              </span>
              <span className="ai-chat__header-status">
                <span className="ai-chat__status-dot" />
                Online
              </span>
            </div>
          </div>
          <button type="button" className="ai-chat__close" onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {!lead ? (
          <div className="ai-chat__messages ai-chat__messages--lead">
            <div className="ai-chat__lead-form">
              <div className="ai-chat__lead-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="ai-chat__lead-title">Before we chat...</h3>
              <p className="ai-chat__lead-subtitle">Drop your info so Bintang can follow up if needed!</p>
              <form onSubmit={submitLead} noValidate>
                <input
                  ref={nameRef}
                  className="ai-chat__lead-input"
                  type="text"
                  placeholder="Your name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  autoComplete="name"
                  aria-label="Your name"
                  maxLength={80}
                  tabIndex={open ? 0 : -1}
                />
                <input
                  className="ai-chat__lead-input"
                  type="text"
                  placeholder="Email or phone number"
                  value={leadContact}
                  onChange={(e) => setLeadContact(e.target.value)}
                  autoComplete="email"
                  aria-label="Email or phone number"
                  maxLength={120}
                  tabIndex={open ? 0 : -1}
                />
                {leadError && (
                  <p className="ai-chat__lead-error" role="alert">
                    {leadError}
                  </p>
                )}
                <button type="submit" className="ai-chat__lead-submit" tabIndex={open ? 0 : -1}>
                  Start Chatting
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="ai-chat__messages" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={`ai-chat__bubble ai-chat__bubble--${m.sender}${m.streaming ? ' ai-chat__bubble--streaming' : ''}`}>
                  <Rich text={m.text} />
                  {m.streaming && <span className="ai-chat__cursor" />}
                  {!m.streaming && m.text && <span className="ai-chat__timestamp">{m.timestamp}</span>}
                  {m.sender === 'bot' && !m.streaming && m.text && (
                    <button className={`ai-chat__copy${copied === m.id ? ' ai-chat__copy--done' : ''}`} onClick={() => copy(m)} aria-label="Copy message" type="button">
                      {copied === m.id ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              ))}
              {typing && (
                <div className="ai-chat__bubble ai-chat__bubble--bot ai-chat__bubble--typing" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {suggestions.length > 0 && !typing && !busy && (
                <div className="ai-chat__suggestions">
                  <span className="ai-chat__suggestions-label">Ask me</span>
                  {suggestions.map((s) => (
                    <button key={s} type="button" className="ai-chat__suggestion" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="ai-chat__input-area">
              <input
                ref={inputRef}
                className="ai-chat__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder={busy ? 'Thinking...' : 'Ask me anything...'}
                disabled={busy}
                maxLength={2000}
                aria-label="Message"
                tabIndex={open ? 0 : -1}
              />
              <button
                type="button"
                className="ai-chat__send"
                onClick={() => void send()}
                disabled={!input.trim() || busy}
                aria-label="Send message"
                tabIndex={open ? 0 : -1}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
