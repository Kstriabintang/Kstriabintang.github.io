import { useRef, memo } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ReactTyped } from 'react-typed';
import { ChevronDown, Github, Linkedin, Instagram, Mail, Phone } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { useTranslation } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Aurora } from '@/components/Aurora';
import { Magnetic } from '@/components/Magnetic';
import { useInViewport } from '@/hooks/use-in-viewport';

gsap.registerPlugin();

/* === CSS Particle Field === */
const ParticleField = memo(function ParticleField() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  const count = isMobile ? 10 : 22;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.2,
    color: i % 3 === 0 ? '#F97316' : i % 5 === 0 ? '#4C1D95' : '#7C3AED',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
});

/* === Scroll Indicator === */
const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ animation: 'fade-in-up 0.6s ease-out 2.5s both', zIndex: 10 }}
    >
      <ChevronDown
        className="w-6 h-6 text-text-muted"
        style={{ animation: 'bounce-subtle 2s ease-in-out infinite' }}
      />
    </div>
  );
});

/* === Social Icons === */
const socialData = [
  { icon: Github, href: 'https://github.com/Kstriabintang', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ksatria-bintang-samudra-265952313', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/ven_0day', label: 'Instagram' },
  { icon: SiTiktok, href: 'https://tiktok.com/@ksatriabintangsamudra', label: 'TikTok' },
  { icon: Mail, href: 'mailto:ksatriabintangsamudra2022@gmail.com', label: 'Email' },
  { icon: Phone, href: 'https://wa.me/6285264402640', label: 'WhatsApp' },
];

const SocialIcons = memo(function SocialIcons() {
  return (
    <div className="flex items-center gap-3 justify-center">
      {socialData.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="hero-social-icon hover-glow-purple flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/5 text-text-secondary"
        >
          <s.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
});

/* === Main Hero Section === */
export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const heroInView = useInViewport(sectionRef, '100px');
  const taglineRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Tagline: fade in + slide up 20px
      if (taglineRef.current) {
        gsap.set(taglineRef.current, { opacity: 0, y: 20 });
        tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
      }

      // 2. Name: fade in + slide up 30px
      if (nameRef.current) {
        gsap.set(nameRef.current, { opacity: 0, y: 30 });
        tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
      }

      // 3. Typing container: fade in at 0.9s
      if (typingRef.current) {
        gsap.set(typingRef.current, { opacity: 0 });
        tl.to(typingRef.current, { opacity: 1, duration: 0.4 }, 0.9);
      }

      // 4. Description: fade in after typing delay
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 20 });
        tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, 2.2);
      }

      // 5. CTA buttons: fade in + slide up, stagger
      if (ctaRef.current) {
        const btns = ctaRef.current.children;
        gsap.set(btns, { opacity: 0, y: 20 });
        tl.to(btns, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 2.5);
      }

      // 6. Social icons: fade in + scale
      if (socialRef.current) {
        const icons = socialRef.current.querySelectorAll('.hero-social-icon');
        gsap.set(icons, { opacity: 0, scale: 0.8 });
        tl.to(icons, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 }, 2.8);
      }
    },
    { scope: sectionRef }
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* Background layers — only render when Hero is in view */}
      {heroInView && (
        <>
          <Aurora />
          <ParticleField />
        </>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(46, 16, 101, 0.2) 50%, rgba(10,10,10,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        {/* Tagline */}
        <div ref={taglineRef} className="mb-4">
          <span
            className="font-jetbrains text-sm uppercase tracking-[0.1em]"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.hero.greeting}
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-jetbrains text-4xl sm:text-5xl md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-text-primary"
          style={{
            textShadow: '0 0 40px rgba(124, 58, 237, 0.3)',
            letterSpacing: '-0.03em',
          }}
        >
          {t.hero.name}
        </h1>

        {/* Typing Animation */}
        <div
          ref={typingRef}
          className="mt-6 flex items-center justify-center"
          style={{ borderLeft: '2px solid rgba(124, 58, 237, 0.3)', paddingLeft: '16px' }}
        >
          <div className="font-jetbrains text-lg sm:text-2xl font-semibold text-orange-400">
            <span className="text-text-muted mr-2">$</span>
            <ReactTyped
              strings={[...t.hero.typed]}
              typeSpeed={80}
              backSpeed={40}
              backDelay={2000}
              loop
              showCursor
              cursorChar="\u258B"
              className="text-orange-400"
            />
          </div>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="mt-6 font-inter text-lg text-text-secondary max-w-[500px]"
        >
          {t.hero.tagline}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
            >
              {t.hero.viewWork}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-secondary inline-flex items-center justify-center w-full sm:w-auto"
            >
              {t.hero.contactMe}
            </a>
          </Magnetic>
        </div>

        {/* Social Icons */}
        <div ref={socialRef} className="mt-8">
          <SocialIcons />
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
