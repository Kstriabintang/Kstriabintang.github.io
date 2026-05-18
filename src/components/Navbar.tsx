import { useState, useEffect, useMemo } from 'react';
import { Menu, Languages } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useTranslation } from '@/lib/i18n';
import { useActiveSection } from '@/hooks/use-active-section';

const SECTION_IDS = ['about', 'how-i-work', 'skills', 'experience', 'projects', 'certificates', 'contact'];

export default function Navbar() {
  const { t, locale, toggle } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  const navLinks = useMemo(
    () => [
      { id: 'about', label: t.nav.about, href: '#about' },
      { id: 'how-i-work', label: t.nav.howIWork, href: '#how-i-work' },
      { id: 'skills', label: t.nav.skills, href: '#skills' },
      { id: 'experience', label: t.nav.experience, href: '#experience' },
      { id: 'projects', label: t.nav.projects, href: '#projects' },
      { id: 'certificates', label: t.nav.certificates, href: '#certificates' },
      { id: 'contact', label: t.nav.contact, href: '#contact' },
    ],
    [t]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <button
      onClick={toggle}
      aria-label={t.nav.switchLang}
      title={t.nav.switchLang}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-jetbrains text-xs font-semibold text-text-secondary border border-white/10 bg-white/5 hover:border-purple-400 hover:text-purple-400 transition-all duration-200 ${className}`}
    >
      <Languages className="w-3.5 h-3.5" />
      <span className="uppercase">{locale}</span>
    </button>
  );

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
      style={{
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.15)',
        boxShadow: scrolled ? '0 0 20px rgba(124, 58, 237, 0.15)' : 'none',
        animation: 'fade-in-up 0.6s ease-out 1.2s both',
      }}
    >
      <div className="section-container w-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-jetbrains text-lg font-bold text-text-primary tracking-tight hover:text-purple-400 transition-colors"
        >
          KSATRIA
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative font-inter text-sm font-medium transition-colors duration-200 group ${
                  isActive ? 'text-purple-400' : 'text-text-secondary hover:text-purple-400'
                }`}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] bg-purple-400 transition-all duration-300"
                  style={{ width: isActive ? '100%' : 0 }}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full" />
              </a>
            );
          })}
          <LangToggle />
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LangToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center w-10 h-10 text-text-primary"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-3/4 max-w-sm border-l border-purple-500/20"
              style={{
                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex flex-col gap-6 pt-12 px-6">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="font-jetbrains text-lg font-medium text-text-primary hover:text-purple-400 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
