import React, { useEffect, useState } from 'react';
import { Footer } from './Footer';

type PageShellProps = {
  badge: string;
  title: React.ReactNode;
  description: string;
  pageCta?: {
    href: string;
    label: string;
  };
  heroAside?: React.ReactNode;
  children: React.ReactNode;
};

const navLinks = [
  { href: '/iterate/', label: '首页' },
  { href: '/iterate/buy.html', label: '购买激活码' },
  { href: '/iterate/download.html', label: '下载客户端' },
];

export const PageShell: React.FC<PageShellProps> = ({ badge, title, description, pageCta, heroAside, children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="xl:[zoom:0.9]">
        <nav className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-300 md:px-12 ${scrolled ? 'border-b border-white/10 bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
          <a href="/iterate/" className="group flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-black transition-transform group-hover:rotate-12">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tighter">iterate</span>
          </a>

          <div className="hidden space-x-8 text-sm font-medium uppercase tracking-wide md:flex">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-gray-400">
                {link.label}
              </a>
            ))}
          </div>

          {pageCta ? (
            <a href={pageCta.href} className="bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-gray-200">
              {pageCta.label}
            </a>
          ) : null}
        </nav>

        <main>
          <section className="px-6 pb-20 pt-32 md:px-12 md:pt-40">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-end">
              <div>
                <div className="mb-5 text-xs font-black uppercase tracking-[0.26em] text-zinc-500">{badge}</div>
                <h1 className="max-w-4xl text-6xl font-black leading-none tracking-tighter md:text-7xl">
                  {title}
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  {description}
                </p>
              </div>
              {heroAside}
            </div>
          </section>

          <section className="border-t border-white/5 bg-zinc-900 px-6 py-20 md:px-12">
            {children}
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};
