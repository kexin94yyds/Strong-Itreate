
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { AccessMethods } from './components/AccessMethods';
import { Ecosystem } from './components/Ecosystem';
import { Pricing } from './components/Pricing';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import faviconUrl from './favicon-rounded-preview.png';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="xl:[zoom:0.9]">
        {/* Fixed Header */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-6 flex justify-between items-center ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <img
              src={faviconUrl}
              alt="iterate icon"
              className="w-8 h-8 rounded-md object-contain transition-transform group-hover:rotate-12"
            />
            <span className="text-xl font-bold tracking-tighter">iterate</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase">
            <a href="#scenarios" className="hover:text-gray-400 transition-colors">场景</a>
            <a href="#features" className="hover:text-gray-400 transition-colors">能力</a>
            <a href="#pricing" className="hover:text-gray-400 transition-colors">定价</a>
            <a href="#download" className="hover:text-gray-400 transition-colors">下载</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-semibold tracking-[0.08em] text-zinc-400 md:block md:mr-8">QQ 交流群：186107551</span>
            <a href="#pricing" className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-none">
              购买激活码
            </a>
          </div>
        </nav>

        <main>
          <Hero />
          <section id="scenarios" className="py-24 px-6 md:px-12 bg-white text-black">
            <AccessMethods />
          </section>
          <section id="features" className="py-24 px-6 md:px-12 bg-black text-white">
            <Ecosystem />
          </section>
          <section id="pricing" className="border-t border-white/5 bg-zinc-900 px-6 py-24 text-white md:px-12">
            <Pricing />
          </section>
          <section id="download">
            <DownloadSection />
          </section>
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default App;
