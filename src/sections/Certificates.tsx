import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import {
  Brain,
  Terminal,
  Globe,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/* ─────────── data ─────────── */

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  gradient: string;
  icon: React.ReactNode;
  url: string;
}

const certificates: Certificate[] = [
  {
    title: 'Google AI Essentials',
    issuer: 'Google',
    year: '2024',
    gradient: 'linear-gradient(135deg, #4285F4, #34A853)',
    icon: <Brain className="w-7 h-7 text-white" />,
    url: '/sertif/google-ai-essentials.pdf',
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    year: '2024',
    gradient: 'linear-gradient(135deg, #DC2626, #EF4444)',
    icon: <ShieldCheck className="w-7 h-7 text-white" />,
    url: '/sertif/ethical-hacker.pdf',
  },
  {
    title: 'ISC2 Certified in Cybersecurity',
    issuer: 'ISC2',
    year: '2024',
    gradient: 'linear-gradient(135deg, #7C3AED, #4C1D95)',
    icon: <Lock className="w-7 h-7 text-white" />,
    url: '/sertif/isc2-cybersecurity.pdf',
  },
  {
    title: 'Expert Linux',
    issuer: 'Linux',
    year: '2024',
    gradient: 'linear-gradient(135deg, #1F2937, #FCC624)',
    icon: <Terminal className="w-7 h-7 text-white" />,
    url: '/sertif/expert-linux.pdf',
  },
  {
    title: 'TOEFL — Professional English',
    issuer: 'ETS',
    year: '2024',
    gradient: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
    icon: <Globe className="w-7 h-7 text-white" />,
    url: '/sertif/toefl.pdf',
  },
];

/* ─────────── card hover styles ─────────── */
const cardBaseStyle: React.CSSProperties = {
  borderRadius: 20,
  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(124, 58, 237, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  padding: '32px 24px 24px',
  minHeight: 260,
  position: 'relative',
  overflow: 'hidden',
};

const cardHoverStyle: React.CSSProperties = {
  borderColor: 'rgba(124, 58, 237, 0.5)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 24px rgba(124, 58, 237, 0.25)',
};

/* ─────────── component ─────────── */

export default function Certificates() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Section title: fade in + slide up 40px
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Grid cards: stagger scale reveal (0.9→1) + fade in
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.cert-card');
        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: '#0A0A0A',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      {/* Ambient warm glow on right */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: '50%',
          width: '50%',
          height: '50%',
          transform: 'translateY(-50%)',
          background:
            'radial-gradient(circle at 80% 50%, rgba(249,115,22,0.06) 0%, transparent 50%)',
        }}
      />

      <div className="section-container relative" style={{ zIndex: 10 }}>
        {/* ── Section Title ── */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          <span
            className="font-jetbrains text-sm font-medium block mb-3"
            style={{ color: '#A78BFA' }}
          >
            {t.certificates.sectionNumber}
          </span>
          <h2
            className="font-jetbrains text-[#F3F4F6] font-bold"
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {t.certificates.sectionTitle}
          </h2>
          <div
            className="mx-auto mt-3"
            style={{
              width: 60,
              height: 3,
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9, #4C1D95)',
              borderRadius: 2,
            }}
          />
          <p
            className="font-inter mt-4 text-[#9CA3AF]"
            style={{ fontSize: 16 }}
          >
            {t.certificates.sectionSubtitle}
          </p>
        </div>

        {/* ── Certificate Badge Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-card spotlight-card flex flex-col items-center justify-between"
              style={{ ...cardBaseStyle, opacity: 0, transform: 'scale(0.9)' }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                Object.assign(el.style, cardHoverStyle);
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.border = String(cardBaseStyle.border ?? '1px solid rgba(124, 58, 237, 0.2)');
                el.style.boxShadow = String(cardBaseStyle.boxShadow ?? '0 8px 32px rgba(0, 0, 0, 0.3)');
              }}
            >
              {/* Shimmer overlay (visible on hover) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 hover-parent-opacity"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s ease-in-out infinite',
                  zIndex: 1,
                }}
              />

              {/* Gradient top border */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: 4,
                  background: cert.gradient,
                  borderRadius: '20px 20px 0 0',
                }}
              />

              {/* Icon area */}
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: cert.gradient,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {cert.icon}
              </div>

              {/* Text content */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <h3
                  className="font-jetbrains text-[#F3F4F6] text-center font-semibold"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.3,
                    maxWidth: 180,
                  }}
                >
                  {cert.title}
                </h3>
                <span
                  className="font-inter text-[#9CA3AF]"
                  style={{ fontSize: 14 }}
                >
                  {cert.issuer}
                </span>

                {/* Year + Verified row */}
                <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
                  {/* Year pill */}
                  <span
                    className="font-jetbrains font-medium"
                    style={{
                      fontSize: 12,
                      padding: '4px 12px',
                      borderRadius: 999,
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#6B7280',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {cert.year}
                  </span>

                  {/* Verified badge */}
                  <span
                    className="flex items-center gap-1 font-jetbrains font-medium"
                    style={{
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(124, 58, 237, 0.15)',
                      color: '#A78BFA',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {t.certificates.verified}
                  </span>
                </div>

                {/* View Certificate button */}
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-jetbrains text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                  aria-label={`${t.certificates.viewCert} — ${cert.title}`}
                >
                  <span>{t.certificates.viewCert}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Hover shimmer CSS ── */}
      <style>{`
        .cert-card:hover .hover-parent-opacity {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
