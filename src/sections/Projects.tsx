import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Project {
  title: string;
  language: string;
  languageColor: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: 'aktifinimei',
    language: 'JavaScript',
    languageColor: '#F7DF1E',
    description:
      'Professional IMEI activation service for iPhone Indonesia. Fast 1x24h processing, automated QRIS payment, real-time order tracking.',
    tags: ['JavaScript', 'Automation', 'Payment'],
    link: 'https://github.com/Kstriabintang/aktifinimei',
  },
  {
    title: 'hi-frozen-food',
    language: 'HTML',
    languageColor: '#E34F26',
    description:
      'Modern responsive landing page for a frozen food business. Pure HTML, CSS, and Vanilla JS.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/Kstriabintang/hi-frozen-food',
  },
  {
    title: 'personal-branding-cv-template',
    language: 'HTML',
    languageColor: '#E34F26',
    description:
      'Multi-page personal branding CV website template with deep purple elegance theme. MIT Licensed.',
    tags: ['HTML', 'CSS', 'Template'],
    link: 'https://github.com/Kstriabintang/personal-branding-cv-template',
  },
  {
    title: 'link-tracker',
    language: 'Python',
    languageColor: '#3776AB',
    description:
      'IP tracking tool built with Flask. Generate tracking links, capture visitor data, and redirect seamlessly.',
    tags: ['Python', 'Flask', 'Security'],
    link: 'https://github.com/Kstriabintang/link-tracker',
  },
  {
    title: 'codegraph',
    language: 'TypeScript',
    languageColor: '#3178C6',
    description:
      'Pre-indexed code knowledge graph for Claude Code — fewer tokens, fewer tool calls, 100% local.',
    tags: ['TypeScript', 'AI', 'Local'],
    link: 'https://github.com/Kstriabintang/codegraph',
  },
  {
    title: 'kstriabintang',
    language: 'Markdown',
    languageColor: '#083FA1',
    description:
      'GitHub profile README with animated banners, stats, and personal branding.',
    tags: ['Markdown', 'GitHub', 'Branding'],
    link: 'https://github.com/Kstriabintang/kstriabintang',
  },
  {
    title: 'Learn-Python',
    language: 'Python',
    languageColor: '#3776AB',
    description:
      'My first programming project — learning Python fundamentals and building simple scripts.',
    tags: ['Python', 'Learning', 'Beginner'],
    link: 'https://github.com/Kstriabintang/Learn-Python',
  },
];

/* ------------------------------------------------------------------ */
/*  SECTION TITLE                                                      */
/* ------------------------------------------------------------------ */

function SectionTitle() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      <span className="font-jetbrains text-sm text-purple-400 tracking-wide">
        {t.projects.sectionNumber}
      </span>
      <h2 className="font-jetbrains text-3xl md:text-5xl font-bold text-text-primary mt-1">
        {t.projects.sectionTitle}
      </h2>
      <p className="font-inter text-base text-text-secondary mt-2">
        {t.projects.sectionSubtitle}
      </p>
      <div
        className="mt-3 h-[3px] w-[60px] rounded-full"
        style={{
          background:
            'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT CARD (Framer Motion 3D Tilt)                               */
/* ------------------------------------------------------------------ */

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-200, 200], [-8, 8]);

  const springRotateX = useSpring(rotateX, {
    stiffness: 200,
    damping: 20,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        display: 'block',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="spotlight-card group rounded-2xl overflow-hidden relative transition-colors duration-300"
      /* glass-card base styles */
    >
      <div
        className="h-full rounded-2xl overflow-hidden relative flex flex-col"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: isHovered
            ? '1px solid rgba(124, 58, 237, 0.5)'
            : '1px solid rgba(124, 58, 237, 0.2)',
          boxShadow: isHovered
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 20px rgba(124, 58, 237, 0.15)'
            : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
          }}
        />

        {/* Language badge */}
        <div className="flex justify-end px-5 pt-4">
          <span
            className="inline-flex items-center gap-1.5 font-jetbrains text-[11px] px-2.5 py-1 rounded-full text-text-primary"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: project.languageColor }}
            />
            {project.language}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 pt-3 pb-5 flex flex-col">
          <h3 className="font-jetbrains text-xl font-semibold text-text-primary tracking-tight">
            {project.title}
          </h3>

          <p className="font-inter text-sm text-text-secondary mt-2 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-jetbrains text-[10px] px-2 py-0.5 rounded-full text-text-secondary"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View on GitHub link */}
          <div className="mt-5 pt-4 flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
            style={{ borderTop: '1px solid rgba(124, 58, 237, 0.1)' }}
          >
            <span className="font-jetbrains text-xs font-medium">
              {t.projects.viewOnGithub}
            </span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-grid"
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        backgroundColor: '#0D1117',
      }}
    >
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, #0D1117 80%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle />

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <a
            href="https://github.com/Kstriabintang?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-3"
          >
            <Github className="w-5 h-5" />
            <span>{t.projects.viewAll}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
