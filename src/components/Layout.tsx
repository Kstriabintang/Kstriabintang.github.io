import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ReadingProgress } from './ReadingProgress';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-bg-primary text-text-primary overflow-x-hidden">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ReadingProgress />
      <Navbar />
      <main id="main-content" className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
