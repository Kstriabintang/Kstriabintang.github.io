import { useRef, useState, memo, type ReactElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skillCategories } from './data';
import { Terminal } from './Terminal';
import { useTranslation } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

const SkillCard = memo(function SkillCard({
  name,
  icon,
}: {
  name: string;
  icon: ReactElement;
}) {
  return (
    <div
      className="skill-card hover-lift flex flex-col items-center justify-center gap-2 p-3 rounded-2xl cursor-default group"
      style={{
        width: '96px',
        height: '96px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      {icon}
      <span className="font-jetbrains text-[11px] text-text-secondary text-center leading-tight mt-1 group-hover:text-purple-400 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
});

export default function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalTriggered, setTerminalTriggered] = useState(false);

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = [];

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 40 });
        const st = ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
            });
          },
          once: true,
        });
        triggers.push(st);
      }

      if (categoriesRef.current) {
        const categoryGroups = categoriesRef.current.querySelectorAll('.skill-category');
        categoryGroups.forEach((group) => {
          const header = group.querySelector('.category-header');
          const cards = group.querySelectorAll('.skill-card');

          if (header) {
            gsap.set(header, { opacity: 0, x: -30 });
          }
          gsap.set(cards, { opacity: 0, scale: 0.8, y: 20 });

          const st = ScrollTrigger.create({
            trigger: group,
            start: 'top 80%',
            onEnter: () => {
              if (header) {
                gsap.to(header, {
                  opacity: 1,
                  x: 0,
                  duration: 0.5,
                  ease: 'power3.out',
                });
              }
              gsap.to(cards, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                delay: 0.15,
                ease: 'power3.out',
              });
            },
            once: true,
          });
          triggers.push(st);
        });
      }

      if (terminalRef.current) {
        gsap.set(terminalRef.current, { opacity: 0, scale: 0.95 });
        const st = ScrollTrigger.create({
          trigger: terminalRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(terminalRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.3,
              ease: 'power3.out',
            });
            setTerminalTriggered(true);
          },
          once: true,
        });
        triggers.push(st);
      }

      return () => {
        triggers.forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#0D1117',
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-grid" style={{ zIndex: 0 }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #0D1117 80%)',
          zIndex: 1,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 2 }}>
        <div ref={titleRef} className="text-center mb-16">
          <span className="font-jetbrains text-sm text-purple-400">{t.skills.sectionNumber}</span>
          <h2 className="font-jetbrains text-[28px] md:text-[48px] font-bold text-text-primary mt-2 tracking-tight leading-tight">
            {t.skills.sectionTitle}
          </h2>
          <p className="font-inter text-base text-text-secondary mt-3">
            {t.skills.sectionSubtitle}
          </p>
          <div
            className="mt-3 mx-auto rounded-full"
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
            }}
          />
        </div>

        <div ref={categoriesRef} className="flex flex-col gap-12 mb-16">
          {skillCategories.map((category) => (
            <div key={category.name} className="skill-category">
              <div className="category-header flex items-center gap-3 mb-5">
                <div
                  className="rounded-full"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#F97316',
                  }}
                />
                <h3 className="font-jetbrains text-base font-semibold text-purple-400">
                  {t.skills.categories[category.name as keyof typeof t.skills.categories]}
                </h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {category.items.map((item) => (
                  <SkillCard key={item.name} name={item.name} icon={item.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={terminalRef}>{terminalTriggered && <Terminal />}</div>
      </div>
    </section>
  );
}
