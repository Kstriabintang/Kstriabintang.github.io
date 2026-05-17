import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface TimelineRole {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  status?: string;
  borderColor: string;
}

const timelineData: TimelineRole[] = [
  {
    role: 'IT Systems & Google Workspace Administrator',
    company: 'Kalimantan Tambang Mandiri',
    period: 'Sept 2024 — Mar 2026',
    location: 'Remote',
    description:
      'Administered and secured enterprise-level Google Workspace environments for multi-domain infrastructures. Conducted monthly preventive maintenance, streamlined data backup and disaster recovery processes.',
    achievements: [
      '90% communication downtime reduction',
      '100% data redundancy achieved',
      '50% backup time reduction',
    ],
    borderColor: '#7C3AED',
  },
  {
    role: 'Notary Assistant',
    company: 'PPAT Fandri Lim',
    period: 'Jun 2024 — Aug 2024',
    location: 'Batam, Indonesia',
    description:
      'Managed 50+ notarial documents monthly with full compliance. Implemented digital filing system for faster document retrieval. Coordinated 30+ weekly client consultations.',
    achievements: [
      '50+ documents managed monthly',
      'Zero scheduling conflicts',
      'Digital filing system implementation',
    ],
    borderColor: '#6D28D9',
  },
  {
    role: 'Freelance Penetration Tester',
    company: 'Upwork',
    period: 'Jul 2023 — Jan 2024',
    location: 'Remote',
    description:
      'Conducted security assessments on 10+ web applications. Simulated cyber attacks and delivered comprehensive security reports with actionable remediation strategies.',
    achievements: [
      '10+ web applications assessed',
      '90% vulnerability reduction',
      'Comprehensive security reports delivered',
    ],
    borderColor: '#5B21B6',
  },
  {
    role: 'Social Media Data Analyst',
    company: 'Upwork',
    period: 'May 2020 — Mar 2022',
    location: 'Remote',
    description:
      'Analyzed social media performance across 10+ client accounts. Developed data-driven strategies that improved online reach and follower growth.',
    achievements: [
      '10+ client accounts managed',
      '35% average engagement increase',
      'Multi-platform expertise',
    ],
    borderColor: '#4C1D95',
  },
];

const statsData = [
  { value: 2, suffix: '+', labelKey: 'yearsRemote' as const },
  { value: 10, suffix: '+', labelKey: 'projects' as const },
  { value: 90, suffix: '%', labelKey: 'uptime' as const },
  { value: 5, suffix: '', labelKey: 'certificates' as const },
];

/* ------------------------------------------------------------------ */
/*  SECTION TITLE                                                      */
/* ------------------------------------------------------------------ */

function SectionTitle() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="mb-16">
      <span className="font-jetbrains text-sm text-purple-400 tracking-wide">
        {t.experience.sectionNumber}
      </span>
      <h2 className="font-jetbrains text-3xl md:text-5xl font-bold text-text-primary mt-1">
        {t.experience.sectionTitle}
      </h2>
      <p className="font-inter text-base text-text-secondary mt-2">
        {t.experience.sectionSubtitle}
      </p>
      <div
        className="mt-3 h-[3px] w-[60px] rounded-full"
        style={{
          background:
            'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COUNT-UP STAT                                                      */
/* ------------------------------------------------------------------ */

function CountUpStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useGSAP(
    () => {
      if (!ref.current) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        onEnter: () => {
          if (triggered.current) return;
          triggered.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              if (ref.current) {
                ref.current.textContent =
                  Math.round(obj.val) + suffix;
              }
            },
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref}
        className="font-jetbrains text-3xl md:text-4xl font-bold text-gradient-purple"
      >
        0{suffix}
      </span>
      <span className="font-inter text-sm text-text-secondary mt-1">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Experience() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  /* ---- line draw on scroll ---- */
  useGSAP(
    () => {
      if (!lineRef.current || !sectionRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  /* ---- timeline items slide-in ---- */
  useGSAP(
    () => {
      timelineItemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isLeft = i % 2 === 0;
        gsap.from(item, {
          opacity: 0,
          x: typeof window !== 'undefined' && window.innerWidth >= 1024
            ? (isLeft ? -60 : 60)
            : 40,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: sectionRef }
  );

  /* ---- node pulse on enter ---- */
  useGSAP(
    () => {
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        gsap.from(node, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        });
      });
    },
    { scope: sectionRef }
  );

  /* ---- stats fade-in ---- */
  useGSAP(
    () => {
      if (!statsRef.current) return;
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef }
  );

  const setItemRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      timelineItemsRef.current[i] = el;
    },
    []
  );

  const setNodeRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      nodesRef.current[i] = el;
    },
    []
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: 96,
        paddingBottom: 96,
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* subtle vertical gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, #0A0A0A 0%, rgba(46,16,101,0.06) 50%, #0A0A0A 100%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle />

        {/* ---- Timeline ---- */}
        <div className="relative">
          {/* Central vertical line (desktop) */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block">
            <div
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                background:
                  'linear-gradient(180deg, #7C3AED, #6D28D9, #4C1D95)',
              }}
            />
          </div>

          {/* Mobile line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] md:hidden">
            <div
              className="w-full h-full origin-top"
              style={{
                background:
                  'linear-gradient(180deg, #7C3AED, #6D28D9, #4C1D95)',
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="relative flex flex-col gap-12 lg:gap-16">
            {timelineData.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className={`relative flex items-start md:items-stretch ${
                    isLeft
                      ? 'lg:flex-row'
                      : 'lg:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Empty space for the opposite side on desktop */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Node */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
                    <div
                      ref={(el) => setNodeRef(el, i)}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        item.status === 'Current'
                          ? 'animate-pulse'
                          : ''
                      }`}
                      style={{
                        backgroundColor: '#7C3AED',
                        borderColor: '#0A0A0A',
                        boxShadow:
                          item.status === 'Current'
                            ? '0 0 0 8px rgba(124, 58, 237, 0.2), 0 0 20px rgba(124, 58, 237, 0.5)'
                            : '0 0 10px rgba(124, 58, 237, 0.3)',
                      }}
                    >
                      {item.status === 'Current' && (
                        <span
                          className="block w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: '#A78BFA',
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    ref={(el) => setItemRef(el, i)}
                    className="ml-14 lg:ml-0 w-full lg:w-1/2 lg:px-12"
                  >
                    <div
                      className={`spotlight-card ${item.status === 'Current' ? 'current-glow' : ''} relative rounded-2xl p-6 transition-all duration-300`}
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        boxShadow:
                          '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                        borderLeft: `3px solid ${item.borderColor}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          'rgba(124, 58, 237, 0.5)';
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 20px rgba(124, 58, 237, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          'rgba(124, 58, 237, 0.2)';
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      {/* Badges row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className="font-jetbrains text-xs px-3 py-1 rounded-full"
                          style={{
                            background:
                              item.status === 'Current'
                                ? 'linear-gradient(135deg, #7C3AED, #6D28D9)'
                                : 'rgba(255, 255, 255, 0.05)',
                            border:
                              '1px solid rgba(124, 58, 237, 0.3)',
                            color: '#F3F4F6',
                          }}
                        >
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1 font-jetbrains text-xs px-3 py-1 rounded-full text-text-secondary"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(124, 58, 237, 0.3)',
                          }}
                        >
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                        {item.status === 'Current' && (
                          <span
                            className="font-jetbrains text-xs px-3 py-1 rounded-full text-[#0A0A0A] font-semibold"
                            style={{
                              background: '#10B981',
                            }}
                          >
                            {t.experience.current}
                          </span>
                        )}
                      </div>

                      {/* Role */}
                      <h3 className="font-jetbrains text-xl font-semibold text-text-primary">
                        {item.role}
                      </h3>

                      {/* Company */}
                      <p className="font-inter text-base text-purple-400 mt-1">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="font-inter text-sm text-text-secondary mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements */}
                      <ul className="mt-4 space-y-2">
                        {item.achievements.map((ach, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 font-inter text-sm text-text-secondary"
                          >
                            <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Arrow pointing to center (desktop only) */}
                      <div
                        className="hidden lg:block absolute top-8 w-3 h-3 rotate-45"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          borderColor: 'rgba(124, 58, 237, 0.2)',
                          ...(isLeft
                            ? {
                                right: '-7px',
                                borderTop: '1px solid rgba(124, 58, 237, 0.2)',
                                borderRight: '1px solid rgba(124, 58, 237, 0.2)',
                              }
                            : {
                                left: '-7px',
                                borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
                                borderLeft: '1px solid rgba(124, 58, 237, 0.2)',
                              }),
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---- Stats Bar ---- */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 rounded-2xl p-8 md:p-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {statsData.map((stat, i) => (
            <CountUpStat
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={t.experience.stats[stat.labelKey]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
