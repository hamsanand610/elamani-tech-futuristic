import { Cpu } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030303] border-t border-white/5 py-16 overflow-hidden z-10">
      
      {/* Glow circuit lines running across the top of footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none overflow-hidden">
        <svg className="w-full h-4 text-brand-cyan/20" viewBox="0 0 1200 16" fill="none" preserveAspectRatio="none">
          <path 
            d="M0 8 L300 8 L320 1 L600 1 L620 15 L900 15 L920 8 L1200 8" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="circuit-path text-brand-cyan/50" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left relative z-20">
        
        {/* Info Column */}
        <div className="space-y-4 md:col-span-2">
          <a href="#" onClick={handleScrollToTop} className="flex items-center gap-2 group w-fit">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center border border-white/10 group-hover:border-brand-cyan/50 transition-colors shadow-lg">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-mono font-bold text-white text-sm tracking-[0.2em]">
              ELAMANI TECH
            </span>
          </a>
          <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-light">
            Engineered, calibrated, and manufactured in Bangalore, India. Building sovereign hardware, precision actuation nodes, and autonomous systems for core industrial independence.
          </p>
        </div>

        {/* Diagnostic Links */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Diagnostics
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <a href="#vision" className="text-gray-500 hover:text-brand-cyan transition-colors">Sovereign Vision</a>
            </li>
            <li>
              <a href="#products" className="text-gray-500 hover:text-brand-cyan transition-colors">Actuator Tech</a>
            </li>
            <li>
              <a href="#applications" className="text-gray-500 hover:text-brand-cyan transition-colors">Defense Deployments</a>
            </li>
            <li>
              <a href="#contact" className="text-gray-500 hover:text-brand-cyan transition-colors">Secure Procurement</a>
            </li>
          </ul>
        </div>

        {/* Social / Nodes Column */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Network Nodes
          </h4>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/5 bg-white/2 hover:border-brand-cyan/30 hover:bg-brand-cyan/5 text-gray-500 hover:text-brand-cyan flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/5 bg-white/2 hover:border-brand-cyan/30 hover:bg-brand-cyan/5 text-gray-500 hover:text-brand-cyan flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/5 bg-white/2 hover:border-brand-cyan/30 hover:bg-brand-cyan/5 text-gray-500 hover:text-brand-cyan flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/5 bg-white/2 hover:border-brand-cyan/30 hover:bg-brand-cyan/5 text-gray-500 hover:text-brand-cyan flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                <polygon points="10 15 15 12 10 9" />
              </svg>
            </a>
          </div>

          <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest pt-2">
            © {new Date().getFullYear()} ELAMANI TECH PVT LTD. <br />
            ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
