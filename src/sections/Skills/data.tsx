import type { ReactElement } from 'react';
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
  SiDocker,
  SiLinux,
  SiGoogle,
} from 'react-icons/si';
import {
  ShieldCheck,
  KeyRound,
  ScanSearch,
  ShieldAlert,
  FileSpreadsheet,
  Code2,
} from 'lucide-react';

export interface SkillItem {
  name: string;
  icon: ReactElement;
}

export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

const iconClass = 'w-10 h-10';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    items: [
      { name: 'HTML', icon: <SiHtml5 className={iconClass} color="#E34F26" /> },
      { name: 'CSS', icon: <SiCss className={iconClass} color="#1572B6" /> },
      { name: 'JavaScript', icon: <SiJavascript className={iconClass} color="#F7DF1E" /> },
      { name: 'TypeScript', icon: <SiTypescript className={iconClass} color="#3178C6" /> },
      { name: 'React', icon: <SiReact className={iconClass} color="#61DAFB" /> },
      { name: 'Next.js', icon: <SiNextdotjs className={iconClass} color="#F3F4F6" /> },
      { name: 'Tailwind', icon: <SiTailwindcss className={iconClass} color="#38BDF8" /> },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Node.js', icon: <SiNodedotjs className={iconClass} color="#339933" /> },
      { name: 'Express', icon: <SiExpress className={iconClass} color="#F3F4F6" /> },
      { name: 'Flask', icon: <SiFlask className={iconClass} color="#F3F4F6" /> },
      { name: 'FastAPI', icon: <SiFastapi className={iconClass} color="#009688" /> },
      { name: 'Python', icon: <SiPython className={iconClass} color="#3776AB" /> },
    ],
  },
  {
    name: 'Database',
    items: [
      { name: 'MongoDB', icon: <SiMongodb className={iconClass} color="#47A248" /> },
      { name: 'MySQL', icon: <SiMysql className={iconClass} color="#4479A1" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className={iconClass} color="#336791" /> },
      { name: 'Firebase', icon: <SiFirebase className={iconClass} color="#FFCA28" /> },
    ],
  },
  {
    name: 'Security',
    items: [
      { name: 'Penetration Testing', icon: <ShieldCheck className={iconClass} color="#A78BFA" /> },
      { name: 'Ethical Hacking', icon: <KeyRound className={iconClass} color="#A78BFA" /> },
      { name: 'Vulnerability Research', icon: <ScanSearch className={iconClass} color="#A78BFA" /> },
      { name: 'OWASP', icon: <ShieldAlert className={iconClass} color="#A78BFA" /> },
    ],
  },
  {
    name: 'Tools',
    items: [
      { name: 'Git', icon: <SiGit className={iconClass} color="#F05032" /> },
      { name: 'Docker', icon: <SiDocker className={iconClass} color="#2496ED" /> },
      { name: 'Linux', icon: <SiLinux className={iconClass} color="#FCC624" /> },
      { name: 'Google Workspace', icon: <SiGoogle className={iconClass} color="#4285F4" /> },
      { name: 'Excel', icon: <FileSpreadsheet className={iconClass} color="#217346" /> },
      { name: 'VS Code', icon: <Code2 className={iconClass} color="#007ACC" /> },
    ],
  },
];
