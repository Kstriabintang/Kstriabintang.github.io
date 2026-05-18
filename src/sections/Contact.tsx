import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { useTranslation } from '@/lib/i18n';
import { Magnetic } from '@/components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

/* ─────────── data ─────────── */

interface SocialCard {
  platform: string;
  handle: string;
  url: string;
  icon: React.ReactNode;
}

const socialCards: SocialCard[] = [
  {
    platform: 'GitHub',
    handle: 'Kstriabintang',
    url: 'https://github.com/Kstriabintang',
    icon: <Github className="w-6 h-6" />,
  },
  {
    platform: 'LinkedIn',
    handle: 'ksatria-bintang-samudra',
    url: 'https://www.linkedin.com/in/ksatria-bintang-samudra-265952313',
    icon: <Linkedin className="w-6 h-6" />,
  },
  {
    platform: 'Instagram',
    handle: '@ven_0day',
    url: 'https://instagram.com/ven_0day',
    icon: <Instagram className="w-6 h-6" />,
  },
  {
    platform: 'TikTok',
    handle: '@ksatriabintangsamudra',
    url: 'https://tiktok.com/@ksatriabintangsamudra',
    icon: <SiTiktok className="w-6 h-6" />,
  },
  {
    platform: 'Email',
    handle: 'ksatriabintangsamudra2022@gmail.com',
    url: 'mailto:ksatriabintangsamudra2022@gmail.com',
    icon: <Mail className="w-6 h-6" />,
  },
  {
    platform: 'WhatsApp',
    handle: '+6285264402640',
    url: 'https://wa.me/6285264402640',
    icon: <MessageCircle className="w-6 h-6" />,
  },
];

interface ContactDetail {
  icon: React.ReactNode;
  labelKey: 'email' | 'whatsapp' | 'location';
  value: string;
  href: string;
}

/* ─────────── card hover styles ─────────── */
const socialCardBase: React.CSSProperties = {
  borderRadius: 16,
  background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(124, 58, 237, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  padding: 20,
  position: 'relative',
  overflow: 'hidden',
};

const socialCardHover: React.CSSProperties = {
  borderColor: 'rgba(124, 58, 237, 0.5)',
  boxShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
};

/* ─────────── component ─────────── */

export default function Contact() {
  const { t } = useTranslation();
  const contactDetails: ContactDetail[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      labelKey: 'email',
      value: 'ksatriabintangsamudra2022@gmail.com',
      href: 'mailto:ksatriabintangsamudra2022@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      labelKey: 'whatsapp',
      value: '+6285264402640',
      href: 'https://wa.me/6285264402640',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      labelKey: 'location',
      value: t.contact.locationValue,
      href: 'https://www.google.com/maps/place/Pontianak,+West+Kalimantan',
    },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

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

      // Left column: fade in + slide up 40px, delay 0.2s
      if (leftRef.current) {
        gsap.to(leftRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Right column (social cards): stagger scale reveal
      if (rightRef.current) {
        const cards = rightRef.current.querySelectorAll('.social-card');
        gsap.to(cards, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // CTA buttons: fade in
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Availability badge: fade in
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          opacity: 1,
          duration: 0.5,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: badgeRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: '#0D1117',
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124, 58, 237, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)',
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
            {t.contact.sectionNumber}
          </span>
          <h2
            className="font-jetbrains text-[#F3F4F6] font-bold"
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {t.contact.sectionTitle}
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
            {t.contact.sectionSubtitle}
          </p>
        </div>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── Left Column — Contact Info ── */}
          <div
            ref={leftRef}
            className="flex flex-col gap-8"
            style={{ opacity: 0, transform: 'translateY(40px)' }}
          >
            <h3
              className="font-jetbrains text-[#F3F4F6] font-semibold"
              style={{
                fontSize: 'clamp(20px, 3vw, 24px)',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              {t.contact.letsTalk}
            </h3>

            <p
              className="font-inter text-[#9CA3AF]"
              style={{ fontSize: 16, lineHeight: 1.6 }}
            >
              {t.contact.intro}
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-5 mt-2">
              {contactDetails.map((detail, index) => (
                <a
                  key={index}
                  href={detail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(124, 58, 237, 0.15)',
                      color: '#A78BFA',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    {detail.icon}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-jetbrains text-xs font-medium"
                      style={{ color: '#6B7280' }}
                    >
                      {t.contact.labels[detail.labelKey]}
                    </span>
                    <span
                      className="font-inter text-sm text-[#F3F4F6] group-hover:text-[#A78BFA] transition-colors duration-200"
                    >
                      {detail.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Column — Social Cards ── */}
          <div
            ref={rightRef}
            className="grid grid-cols-2 gap-4"
          >
            {socialCards.map((card, index) => (
              <motion.a
                key={index}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card flex flex-col items-center justify-center text-center gap-2"
                style={{ ...socialCardBase, opacity: 0, transform: 'scale(0.9)', minHeight: 100 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  Object.assign(el.style, socialCardHover);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.border = String(socialCardBase.border ?? '1px solid rgba(255,255,255,0.1)');
                  el.style.boxShadow = String(socialCardBase.boxShadow ?? 'none');
                }}
              >
                <div style={{ color: '#9CA3AF' }}>{card.icon}</div>
                <span
                  className="font-jetbrains text-xs font-semibold text-[#F3F4F6]"
                >
                  {card.platform}
                </span>
                <span
                  className="font-inter text-xs text-[#9CA3AF] truncate w-full px-1"
                  style={{ fontSize: 11 }}
                >
                  {card.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {/* Hire Me — Accent button */}
          <Magnetic>
            <a
              href="mailto:ksatriabintangsamudra2022@gmail.com?subject=Job%20Opportunity"
              className="btn-accent inline-flex items-center justify-center gap-2 font-inter font-bold text-base"
              style={{ textDecoration: 'none' }}
            >
              {t.contact.hireMe}
            </a>
          </Magnetic>

          {/* Download CV — Secondary button */}
          <Magnetic>
            <a
              href="/cv/ksatria-cv-ai-engineer.pdf"
              download="Ksatria-Bintang-Samudra-CV.pdf"
              className="btn-secondary inline-flex items-center justify-center gap-2 font-inter font-semibold text-base"
              style={{ textDecoration: 'none' }}
            >
              {t.contact.downloadCV}
            </a>
          </Magnetic>
        </div>

        {/* ── Availability Badge ── */}
        <div
          ref={badgeRef}
          className="flex items-center justify-center mt-8"
          style={{ opacity: 0 }}
        >
          <div
            className="flex items-center gap-2 font-jetbrains text-sm"
            style={{
              padding: '12px 24px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              color: '#9CA3AF',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.15)',
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: 10,
                height: 10,
                background: '#22C55E',
                boxShadow: '0 0 10px rgba(34, 197, 94, 0.6)',
              }}
            />
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            {t.contact.availability}
          </div>
        </div>
      </div>
    </section>
  );
}
