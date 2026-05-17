import { useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, Globe, Bot } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/* ===== Sub-components ===== */

const CornerBrackets = memo(function CornerBrackets() {
  const bracketStyle = (pos: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: '20px',
      height: '20px',
      borderColor: '#A78BFA',
      borderStyle: 'solid',
      transition: 'all 0.4s ease',
    };
    switch (pos) {
      case 'tl':
        return { ...base, top: '-8px', left: '-8px', borderWidth: '2px 0 0 2px' };
      case 'tr':
        return { ...base, top: '-8px', right: '-8px', borderWidth: '2px 2px 0 0' };
      case 'bl':
        return { ...base, bottom: '-8px', left: '-8px', borderWidth: '0 0 2px 2px' };
      case 'br':
        return { ...base, bottom: '-8px', right: '-8px', borderWidth: '0 2px 2px 0' };
      default:
        return base;
    }
  };

  return (
    <>
      <div style={bracketStyle('tl')} className="bracket-tl" />
      <div style={bracketStyle('tr')} className="bracket-tr" />
      <div style={bracketStyle('bl')} className="bracket-bl" />
      <div style={bracketStyle('br')} className="bracket-br" />
    </>
  );
});

const PillarCard = memo(function PillarCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div
      className="about-pillar spotlight-card glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-start gap-4"
      data-delay={delay}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10">
        <Icon className="w-8 h-8 text-purple-400" />
      </div>
      <h4 className="font-jetbrains text-lg font-semibold text-text-primary">{title}</h4>
      <p className="font-inter text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
});

const FunFactBadge = memo(function FunFactBadge({ text }: { text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-jetbrains text-sm font-semibold"
      style={{
        background: 'linear-gradient(135deg, #F97316, #FB923C)',
        color: '#0A0A0A',
        animation: 'pulse-scale 3s ease-in-out infinite',
      }}
    >
      <span className="text-base">&#9889;</span>
      {text}
      <span className="text-base">&#128170;</span>
    </div>
  );
});

/* ===== Main About Section ===== */

const PulseKeyframes = memo(function PulseKeyframes() {
  return (
    <style>{`
      @keyframes pulse-scale {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
    `}</style>
  );
});

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const funFactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = [];

      // 1. Section Title: fade in + slide up 40px
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 40 });
        const st = ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
          },
          once: true,
        });
        triggers.push(st);
      }

      // 2. Bio Text: fade in + slide up 40px, delay 0.2s
      if (bioRef.current) {
        gsap.set(bioRef.current, { opacity: 0, y: 40 });
        const st = ScrollTrigger.create({
          trigger: bioRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(bioRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.2,
              ease: 'power3.out',
            });
          },
          once: true,
        });
        triggers.push(st);
      }

      // 3. Photo: scale reveal (0.9 -> 1) + fade in, 0.8s
      if (photoRef.current) {
        gsap.set(photoRef.current, { opacity: 0, scale: 0.9 });
        const st = ScrollTrigger.create({
          trigger: photoRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(photoRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
          once: true,
        });
        triggers.push(st);
      }

      // 4. Pillars: stagger reveal
      if (pillarsRef.current) {
        const pillars = pillarsRef.current.querySelectorAll('.about-pillar');
        gsap.set(pillars, { opacity: 0, y: 40 });
        const st = ScrollTrigger.create({
          trigger: pillarsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(pillars, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.3,
              ease: 'power3.out',
            });
          },
          once: true,
        });
        triggers.push(st);
      }

      // 5. Quote: fade in + slide up 40px, 0.7s
      if (quoteRef.current) {
        gsap.set(quoteRef.current, { opacity: 0, y: 40 });
        const st = ScrollTrigger.create({
          trigger: quoteRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(quoteRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
            });
          },
          once: true,
        });
        triggers.push(st);
      }

      // 6. Fun Fact Badge: fade in + scale(0.9 -> 1), 0.5s, delay 0.3s after quote
      if (funFactRef.current) {
        gsap.set(funFactRef.current, { opacity: 0, scale: 0.9 });
        const st = ScrollTrigger.create({
          trigger: funFactRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(funFactRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.3,
              ease: 'power3.out',
            });
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
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        backgroundColor: '#0A0A0A',
      }}
    >
      <PulseKeyframes />
      {/* Subtle radial glow on left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Section Title */}
        <div ref={titleRef} className="mb-12 md:mb-16">
          <span className="font-jetbrains text-sm text-purple-400">{t.about.sectionNumber}</span>
          <h2 className="font-jetbrains text-[28px] md:text-[48px] font-bold text-text-primary mt-2 tracking-tight leading-tight">
            {t.about.sectionTitle}
          </h2>
          <div
            className="mt-3 rounded-full"
            style={{
              width: '60px',
              height: '3px',
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
            }}
          />
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
          {/* Left Column — Bio Text (55%) */}
          <div ref={bioRef} className="lg:w-[55%] flex flex-col gap-5">
            {t.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-inter text-base md:text-lg text-text-secondary"
                style={{ lineHeight: '1.7' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Right Column — Profile Photo (45%) */}
          <div className="lg:w-[45%] flex items-center justify-center">
            <div
              ref={photoRef}
              className="relative"
              style={{ width: '320px', height: '320px' }}
            >
              {/* Corner Brackets */}
              <CornerBrackets />

              {/* Photo Container */}
              <div
                className="photo-frame w-full h-full overflow-hidden group"
                style={{
                  borderRadius: '24px',
                  border: '2px solid rgba(124, 58, 237, 0.3)',
                  boxShadow:
                    '0 0 40px rgba(124, 58, 237, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                }}
              >
                <img
                  src="./profile-photo.jpg"
                  alt="Ksatria Bintang Samudra portrait"
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  style={{ transitionDuration: '0.4s' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <PillarCard
            icon={Shield}
            title={t.about.pillars.bugHunter.title}
            description={t.about.pillars.bugHunter.description}
            delay={0.3}
          />
          <PillarCard
            icon={Globe}
            title={t.about.pillars.fullStack.title}
            description={t.about.pillars.fullStack.description}
            delay={0.4}
          />
          <PillarCard
            icon={Bot}
            title={t.about.pillars.botBuilder.title}
            description={t.about.pillars.botBuilder.description}
            delay={0.5}
          />
        </div>

        {/* Philosophy Quote */}
        <div ref={quoteRef} className="mb-10">
          <div
            className="glass-card rounded-2xl p-8 md:p-10 relative"
            style={{
              borderLeft: '4px solid transparent',
              borderImage: 'linear-gradient(180deg, #7C3AED, #6D28D9) 1',
              borderImageSlice: '0 0 0 1',
            }}
          >
            {/* Manual left border gradient workaround */}
            <div
              className="absolute left-0 top-4 bottom-4 rounded-full"
              style={{
                width: '4px',
                background: 'linear-gradient(180deg, #7C3AED, #6D28D9, #4C1D95)',
              }}
            />
            <blockquote
              className="font-jetbrains text-base md:text-lg italic text-text-primary leading-relaxed pl-4"
              style={{ quotes: 'none' }}
            >
              &ldquo;{t.about.quote}&rdquo;
            </blockquote>
            <p className="font-inter text-sm text-text-muted mt-4 text-right">
              &mdash; {t.about.quoteAuthor}
            </p>
          </div>
        </div>

        {/* Fun Fact Badge */}
        <div ref={funFactRef} className="flex justify-center">
          <FunFactBadge text={t.about.funFact} />
        </div>
      </div>
    </section>
  );
}
