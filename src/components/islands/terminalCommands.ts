// Pure command interpreter for the terminal island. Output uses light markup:
// "\x1B[teal]", "\x1B[bold]", "\x1B[dim]", "\x1B[red]", "\x1B[yellow]", closed by "\x1B[reset]".

export interface TermProject {
  title: string;
  href: string;
  slug: string;
}

export type TermEffect =
  | { type: 'clear' }
  | { type: 'close' }
  | { type: 'theme'; value: 'dark' | 'light' | 'toggle' }
  | { type: 'navigate'; href: string; newTab?: boolean }
  | { type: 'confetti' };

export interface TermResult {
  output: string | null;
  effects?: TermEffect[];
}

const T = '\x1B[teal]';
const B = '\x1B[bold]';
const D = '\x1B[dim]';
const RED = '\x1B[red]';
const Y = '\x1B[yellow]';
const R = '\x1B[reset]';

export const EMAIL = 'hello@ksatriabintangsamudra.com';
export const LINKS: Record<string, string> = {
  github: 'https://github.com/Kstriabintang',
  linkedin: 'https://www.linkedin.com/in/ksatriabintangsamudra',
  instagram: 'https://instagram.com/ven_0day',
  whatsapp: 'https://wa.me/6285264402640',
  resume: '/resume',
  services: '/services',
};

// figlet "standard" glyphs, joined row by row.
const GLYPHS: Record<string, string[]> = {
  K: [' _  __', '| |/ /', "| ' / ", '| . \\ ', '|_|\\_\\'],
  s: ['     ', ' ___ ', '/ __|', '\\__ \\', '|___/'],
  a: ['       ', '  __ _ ', ' / _` |', '| (_| |', ' \\__,_|'],
  t: [' _   ', '| |_ ', '| __|', '| |_ ', ' \\__|'],
  r: ['      ', ' _ __ ', "| '__|", '| |   ', '|_|   '],
  i: [' _ ', '(_)', '| |', '| |', '|_|'],
  B: [' ____  ', '| __ ) ', '|  _ \\ ', '| |_) |', '|____/ '],
  n: ['       ', ' _ __  ', "| '_ \\ ", '| | | |', '|_| |_|'],
  g: ['       ', '  __ _ ', ' / _` |', '| (_| |', ' \\__, |'],
};

function figlet(word: string): string {
  const letters = word.split('').map((ch) => GLYPHS[ch]);
  return letters[0].map((_, row) => letters.map((g) => g[row]).join('')).join('\n');
}

export const BANNER = `\n${figlet('Bintang')}\n`;

export const BANNER_SMALL = [
  '',
  ' _  ______',
  '| |/ / __ )',
  "| ' /|  _ \\",
  '| . \\| |_) |',
  '|_|\\_\\____/',
  ' Ksatria Bintang Samudra',
  '',
].join('\n');

export const COMMANDS = [
  'help',
  'whoami',
  'about',
  'ls',
  'cat',
  'projects',
  'open',
  'contact',
  'stack',
  'neofetch',
  'theme',
  'clear',
  'exit',
  'sudo',
  'rm',
  'echo',
  'date',
  'pwd',
];

const FILES: Record<string, string> = {
  'about.txt': `
${B}About Bintang${R}

  AI Engineer, Automation Builder and Solutions Architect based in
  Pontianak, Indonesia — a city that sits right on the equator.

  I ship production systems end to end: an OpenAI-compatible AI gateway
  with live cost metering, an anti-fraud attendance + payroll platform
  for mining, payment-native automation on QRIS, and edge-native web apps
  on Cloudflare.

  Today: Systems Developer at an internet service provider (Rimba Raya),
  founder of CoalTrack, and founder of Luxavero LLC (Wyoming, USA).
  Before that I ran IT systems and Google Workspace for a mining
  company (Sep 2024 – Mar 2026), did freelance penetration testing on
  Upwork (Jul 2023 – Jan 2024) and social-media data analysis
  (May 2020 – Mar 2022). Studying management at STIE Anindya Guna
  (expected 2027).
`,
  'contact.txt': `
${B}Contact${R}

  ${T}email${R}     ${EMAIL}
  ${T}github${R}    ${LINKS.github}
  ${T}linkedin${R}  ${LINKS.linkedin}
  ${T}whatsapp${R}  +62 852-6440-2640
`,
  'stack.txt': `
${B}Stack${R}

  ${T}AI${R}         Workers AI · OpenAI-compatible APIs · Claude · GPT · Gemini
  ${T}Languages${R}  TypeScript · Python · PHP · Dart · Kotlin
  ${T}Frontend${R}   React · Vue · Next.js · Astro · Flutter · Jetpack Compose
  ${T}Backend${R}    Laravel · FastAPI · Hono · Node.js
  ${T}Edge${R}       Cloudflare Workers · D1 · KV · R2 · Pages
  ${T}Data${R}       PostgreSQL · SQLite · Supabase
  ${T}Payments${R}   QRIS · Midtrans · Telegram bots
`,
};

function help(): string {
  const rows: [string, string][] = [
    ['help', 'Show this help message'],
    ['whoami', 'Who I am, in one paragraph'],
    ['about', 'The longer version'],
    ['ls', 'List files and sections'],
    ['cat <file>', 'Print a file (try about.txt)'],
    ['projects', 'All case studies'],
    ['open <name>', 'Open a project or a link'],
    ['contact', 'All contact methods'],
    ['neofetch', 'System info'],
    ['theme dark|light', 'Switch the site theme'],
    ['sudo hire-me', 'You know you want to'],
    ['clear', 'Clear the terminal'],
    ['exit', 'Close the terminal'],
  ];
  return `
${B}Available Commands${R}

${rows.map(([c, d]) => `  ${T}${c.padEnd(18)}${R} ${d}`).join('\n')}

  Type any command to get started. ${D}Tab completes, ↑↓ browse history.${R}
`;
}

function whoami(): string {
  return `
  ${B}Ksatria Bintang Samudra${R}
  AI Engineer building production systems from Pontianak, Indonesia —
  LLM gateways, payment-native automation and field apps that people
  actually use every day.

  ${T}AI Engineer${R}  ${D}|${R}  ${T}Automation Builder${R}  ${D}|${R}  ${T}Solutions Architect${R}
`;
}

function ls(): string {
  return `
  ${T}about.txt${R}      ${T}contact.txt${R}    ${T}stack.txt${R}

  ${T}projects/${R}      Case studies
  ${T}services/${R}      Work with me
  ${T}resume/${R}        Experience & credentials
  ${T}playground/${R}    Tools that run in your browser
`;
}

function projectList(projects: TermProject[]): string {
  if (projects.length === 0) return `${D}Loading projects… try again in a second, or visit /projects.${R}`;
  return `
${B}Projects${R}  ${D}(open <name> to read the case study)${R}

${projects.map((p) => `  ${T}${p.slug.padEnd(22)}${R} ${p.title}`).join('\n')}
`;
}

function neofetch(): string {
  return `
  ${T}   .-.-.   ${R}   ${B}bintang@samudra${R}
  ${T}  ( 0°  )  ${R}   ───────────────
  ${T}   '-.-'   ${R}   ${T}OS:${R}       Human, equatorial edition
  ${T}   / | \\   ${R}   ${T}Host:${R}     Pontianak, Indonesia
  ${T}  /  |  \\  ${R}   ${T}Kernel:${R}   AI Engineer
  ${T}     |     ${R}   ${T}Shell:${R}    TypeScript + Python
  ${T}    / \\    ${R}   ${T}Edge:${R}     Cloudflare Workers
                  ${T}Payments:${R} QRIS
                  ${T}Uptime:${R}   Shipping since 2020
`;
}

function contact(): string {
  return FILES['contact.txt'];
}

export function runCommand(raw: string, projects: TermProject[]): TermResult {
  const input = raw.trim();
  if (!input) return { output: null };
  const [cmdRaw, ...rest] = input.split(/\s+/);
  const cmd = cmdRaw.toLowerCase();
  const arg = rest.join(' ');

  switch (cmd) {
    case 'help':
    case '?':
      return { output: help() };
    case 'whoami':
      return { output: whoami() };
    case 'about':
      return { output: FILES['about.txt'] };
    case 'ls':
    case 'dir':
      return { output: ls() };
    case 'cat': {
      const file = FILES[arg.toLowerCase()];
      return { output: file ?? `${RED}cat: ${arg || 'no file specified'}: No such file or directory${R}` };
    }
    case 'stack':
    case 'skills':
      return { output: FILES['stack.txt'] };
    case 'projects':
      return { output: projectList(projects) };
    case 'open': {
      const target = arg.toLowerCase();
      if (!target) return { output: `${RED}open: missing name.${R} Try ${T}open github${R} or ${T}projects${R}.` };
      if (LINKS[target]) {
        const href = LINKS[target];
        return { output: `${T}Opening ${target}…${R}`, effects: [{ type: 'navigate', href, newTab: href.startsWith('http') }] };
      }
      const hit = projects.find((p) => p.slug === target || p.slug.startsWith(target) || p.title.toLowerCase().includes(target));
      if (hit) return { output: `${T}Opening ${hit.title}…${R}`, effects: [{ type: 'navigate', href: hit.href }] };
      return { output: `${RED}open: ${arg}: not found.${R} Type ${T}projects${R} to see what exists.` };
    }
    case 'contact':
      return { output: contact() };
    case 'neofetch':
      return { output: neofetch() };
    case 'theme': {
      const v = arg.toLowerCase();
      if (v === 'dark' || v === 'light') return { output: `${T}Theme set to ${v}.${R}`, effects: [{ type: 'theme', value: v }] };
      return { output: `${T}Theme toggled.${R}`, effects: [{ type: 'theme', value: 'toggle' }] };
    }
    case 'clear':
    case 'cls':
      return { output: null, effects: [{ type: 'clear' }] };
    case 'exit':
    case 'quit':
      return { output: `${D}Bye 👋${R}`, effects: [{ type: 'close' }] };
    case 'sudo':
      if (/^hire(-me|\s+me)?/i.test(arg)) {
        return {
          output: `
${B}${T}ACCESS GRANTED${R}

  ██████████████████████████████
  █   WELCOME TO TEAM BINTANG   █
  ██████████████████████████████

  Opening your mail client → ${EMAIL}
  Let's build something unreasonably good.
`,
          effects: [{ type: 'confetti' }, { type: 'navigate', href: `mailto:${EMAIL}?subject=Let%27s%20work%20together` }],
        };
      }
      return { output: `${RED}sudo: permission denied.${R} Try ${T}sudo hire-me${R}` };
    case 'rm':
      return { output: input.includes('-rf') ? `${RED}Permission denied.${R} Nice try 😏` : `${RED}rm: command not permitted${R}` };
    case 'echo':
      return { output: arg };
    case 'pwd':
      return { output: '/home/bintang/portfolio' };
    case 'date':
      return { output: new Date().toString() };
    case 'hire':
      return { output: `${Y}Did you mean${R} ${T}sudo hire-me${R}${Y}?${R}` };
    default:
      return { output: `${RED}Command not found:${R} ${cmdRaw}\nType ${T}help${R} to see available commands.` };
  }
}

export function complete(partial: string): string | null {
  const p = partial.trim().toLowerCase();
  if (!p || p.includes(' ')) {
    const [cmd, arg = ''] = p.split(/\s+/);
    if (cmd === 'cat') {
      const f = Object.keys(FILES).find((k) => k.startsWith(arg));
      return f ? `cat ${f}` : null;
    }
    if (cmd === 'open') {
      const l = Object.keys(LINKS).find((k) => k.startsWith(arg));
      return l ? `open ${l}` : null;
    }
    return null;
  }
  const hits = COMMANDS.filter((c) => c.startsWith(p));
  return hits.length === 1 ? hits[0] : null;
}

export interface Segment {
  text: string;
  cls?: string;
}

/** Split markup into styled segments. */
export function parseMarkup(text: string): Segment[] {
  const out: Segment[] = [];
  const re = /\x1B\[(teal|bold|dim|red|yellow|reset)\]/g;
  let cls: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ text: text.slice(last, m.index), cls: cls.length ? cls.map((c) => `term-${c}`).join(' ') : undefined });
    if (m[1] === 'reset') cls = [];
    else cls = [...cls, m[1]];
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ text: text.slice(last), cls: cls.length ? cls.map((c) => `term-${c}`).join(' ') : undefined });
  return out;
}
