import type { ReactElement } from 'react'
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiFastapi,
  SiPython,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiGoogle,
  SiGreensock,
  SiVite,
  SiAnthropic,
  SiOpenai,
  SiBurpsuite,
  SiVercel,
  SiDiscord,
  SiTelegram,
  SiWhatsapp,
} from 'react-icons/si'
import {
  ShieldCheck,
  KeyRound,
  ScanSearch,
  ShieldAlert,
  Terminal,
  Bot,
  CreditCard,
  Workflow,
  FileCode2,
  Spline,
  Wand2,
  MousePointer2,
} from 'lucide-react'

export interface SkillItem {
  name: string
  icon: ReactElement
}

export interface SkillCategory {
  name: string
  items: SkillItem[]
}

const iconClass = 'w-10 h-10'

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI & Workflow',
    items: [
      { name: 'Claude', icon: <SiAnthropic className={iconClass} color="#D97757" /> },
      { name: 'GPT', icon: <SiOpenai className={iconClass} color="#F3F4F6" /> },
      { name: 'Cursor', icon: <MousePointer2 className={iconClass} color="#F3F4F6" /> },
      { name: 'v0', icon: <SiVercel className={iconClass} color="#F3F4F6" /> },
      { name: 'Lovable', icon: <Wand2 className={iconClass} color="#EC4899" /> },
      { name: 'Prompt Engineering', icon: <FileCode2 className={iconClass} color="#A78BFA" /> },
      { name: 'Multi-Agent Workflows', icon: <Workflow className={iconClass} color="#A78BFA" /> },
      { name: 'Spec-Driven Building', icon: <Spline className={iconClass} color="#A78BFA" /> },
    ],
  },
  {
    name: 'Languages',
    items: [
      { name: 'TypeScript', icon: <SiTypescript className={iconClass} color="#3178C6" /> },
      { name: 'JavaScript', icon: <SiJavascript className={iconClass} color="#F7DF1E" /> },
      { name: 'Python', icon: <SiPython className={iconClass} color="#3776AB" /> },
      { name: 'HTML', icon: <SiHtml5 className={iconClass} color="#E34F26" /> },
      { name: 'CSS', icon: <SiCss className={iconClass} color="#1572B6" /> },
    ],
  },
  {
    name: 'Frontend',
    items: [
      { name: 'React', icon: <SiReact className={iconClass} color="#61DAFB" /> },
      { name: 'Next.js', icon: <SiNextdotjs className={iconClass} color="#F3F4F6" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className={iconClass} color="#38BDF8" /> },
      { name: 'GSAP', icon: <SiGreensock className={iconClass} color="#88CE02" /> },
      { name: 'Vite', icon: <SiVite className={iconClass} color="#646CFF" /> },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs className={iconClass} color="#339933" /> },
      { name: 'Express', icon: <SiExpress className={iconClass} color="#F3F4F6" /> },
      { name: 'Flask', icon: <SiFlask className={iconClass} color="#F3F4F6" /> },
      { name: 'FastAPI', icon: <SiFastapi className={iconClass} color="#009688" /> },
      { name: 'REST API Design', icon: <Terminal className={iconClass} color="#A78BFA" /> },
    ],
  },
  {
    name: 'Data',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql className={iconClass} color="#336791" /> },
      { name: 'MySQL', icon: <SiMysql className={iconClass} color="#4479A1" /> },
      { name: 'MongoDB', icon: <SiMongodb className={iconClass} color="#47A248" /> },
      { name: 'Firebase', icon: <SiFirebase className={iconClass} color="#FFCA28" /> },
    ],
  },
  {
    name: 'Security',
    items: [
      { name: 'Penetration Testing', icon: <ShieldCheck className={iconClass} color="#A78BFA" /> },
      { name: 'OWASP Top 10', icon: <ShieldAlert className={iconClass} color="#A78BFA" /> },
      { name: 'Vulnerability Assessment', icon: <ScanSearch className={iconClass} color="#A78BFA" /> },
      { name: 'Ethical Hacking', icon: <KeyRound className={iconClass} color="#A78BFA" /> },
      { name: 'Burp Suite', icon: <SiBurpsuite className={iconClass} color="#FF6633" /> },
    ],
  },
  {
    name: 'Automation',
    items: [
      { name: 'QRIS Payment', icon: <CreditCard className={iconClass} color="#A78BFA" /> },
      { name: 'WhatsApp Bot', icon: <SiWhatsapp className={iconClass} color="#25D366" /> },
      { name: 'Telegram Bot', icon: <SiTelegram className={iconClass} color="#26A5E4" /> },
      { name: 'Discord Bot', icon: <SiDiscord className={iconClass} color="#5865F2" /> },
      { name: 'Web Scraping', icon: <Bot className={iconClass} color="#A78BFA" /> },
      { name: 'CLI Tooling', icon: <Terminal className={iconClass} color="#A78BFA" /> },
    ],
  },
  {
    name: 'Platforms',
    items: [
      { name: 'Git', icon: <SiGit className={iconClass} color="#F05032" /> },
      { name: 'GitHub', icon: <SiGithub className={iconClass} color="#F3F4F6" /> },
      { name: 'Docker', icon: <SiDocker className={iconClass} color="#2496ED" /> },
      { name: 'Linux', icon: <SiLinux className={iconClass} color="#FCC624" /> },
      { name: 'Google Workspace', icon: <SiGoogle className={iconClass} color="#4285F4" /> },
    ],
  },
]
