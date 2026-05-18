import { Github, Linkedin, Instagram, Mail, Phone, ChevronUp } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Kstriabintang', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/ksatria-bintang-samudra-265952313', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/ven_0day', label: 'Instagram' },
  { icon: Mail, href: 'mailto:ksatriabintangsamudra2022@gmail.com', label: 'Email' },
  { icon: Phone, href: 'https://wa.me/6285264402640', label: 'WhatsApp' },
];

export default function Footer() {
  const { t } = useTranslation();
  const quickLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.howIWork, href: '#how-i-work' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full"
      style={{
        backgroundColor: '#0A0A0A',
        borderTop: '1px solid rgba(124, 58, 237, 0.15)',
      }}
    >
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-jetbrains text-lg font-bold text-text-primary">
              Ksatria Bintang Samudra
            </h3>
            <p className="font-inter text-sm text-text-muted">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-jetbrains text-sm font-semibold text-purple-400">
              {t.footer.quickLinks}
            </h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-inter text-sm text-text-secondary hover:text-purple-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-jetbrains text-sm font-semibold text-purple-400">
              {t.footer.connect}
            </h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover-glow-purple flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-text-muted"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar — Copyright */}
        <div
          className="mt-10 pt-4 flex items-center justify-center"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <p className="font-jetbrains text-[11px] text-text-muted text-center">
            &copy; {new Date().getFullYear()} Ksatria Bintang Samudra. {t.footer.rights}
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="hover-scroll-top fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-purple text-text-primary"
        style={{
          boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
