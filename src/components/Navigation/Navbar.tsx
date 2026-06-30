import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Cpu } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  toggleSound: () => void;
  activeSection: string;
}

export default function Navbar({ isPlaying, toggleSound, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'Vision', href: '#vision' },
    { name: 'Products', href: '#products' },
    { name: 'Applications', href: '#applications' },
    { name: 'Technology', href: '#technology' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'About', href: '#founder' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background change threshold
      setIsScrolled(window.scrollY > 20);

      // Scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 glass-panel border-b border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group z-50">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center border border-white/10 group-hover:border-brand-cyan/50 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Cpu className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-white text-base tracking-[0.25em] leading-none group-hover:text-brand-cyan transition-colors duration-300">
                ELAMANI
              </span>
              <span className="font-mono text-[9px] text-gray-500 tracking-[0.55em] mt-1 uppercase">
                Robotics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`font-mono text-xs tracking-wider transition-colors duration-300 relative py-1 magnetic-target ${
                  activeSection === link.href.slice(1)
                    ? 'text-brand-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Audio Synth Toggle */}
            <button
              onClick={toggleSound}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 magnetic-target ${
                isPlaying 
                  ? 'border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
              title="Ambient Soundscape Toggle"
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Orange CTA */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-5 py-2 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.45)] hover:scale-102 magnetic-target"
            >
              Initiate Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4 z-50">
            <button
              onClick={toggleSound}
              className={`w-9 h-9 rounded-full flex items-center justify-center border ${
                isPlaying ? 'border-brand-cyan/30 text-brand-cyan' : 'border-white/10 text-gray-400'
              }`}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-cyan transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-cyan transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 w-full h-screen z-40 bg-bg-dark/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 border-l border-white/5"
          >
            <div className="flex flex-col gap-6 mt-16">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-mono text-2xl tracking-widest ${
                    activeSection === link.href.slice(1) ? 'text-brand-cyan' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="mt-8 py-3 rounded-lg bg-brand-orange hover:bg-orange-600 text-white text-center font-mono text-sm tracking-wider font-semibold shadow-lg"
              >
                Initiate Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
