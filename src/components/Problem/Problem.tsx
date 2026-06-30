import { motion } from 'framer-motion';
import { ShieldAlert, DollarSign, Cpu, CheckCircle } from 'lucide-react';

export default function Problem() {
  const cards = [
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: 'Import Vulnerability',
      description: 'Over 85% of industrial robots in Indian factories are imported, exposing vital manufacturing supply chains to geopolitical shifts and custom tariffs.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      title: 'Prohibitive CapEx',
      description: 'Foreign systems carry inflated licensing fees, proprietary tooling, and exorbitant service costs, keeping automation out of reach for Indian SMEs.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-red-500" />,
      title: 'Limited Customization',
      description: 'Closed software APIs prevent modifications, making it nearly impossible to integrate specialized sensors or adapt to unique local floor grids.',
    },
  ];

  return (
    <section 
      id="problem" 
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text / Info */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-mono font-medium tracking-widest">
              THE INDUSTRIAL THREAT
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
              The Sovereign <br />
              <span className="text-glow-orange text-brand-orange">Automation Deficit</span>
            </h2>
            
            <p className="text-gray-400 font-light leading-relaxed">
              India's rapid industrial expansion is heavily constrained by dependency on imported automation stacks. Foreign hardware vendor lock-ins limit national technological innovation and create severe supply chain risks.
            </p>

            {/* Micro transition list */}
            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 text-brand-cyan" />
                </div>
                <div>
                  <p className="text-sm font-mono font-semibold text-white">The Resolution: Elamani Tech</p>
                  <p className="text-xs text-gray-500 mt-1">Forging 100% indigenous hardware, custom firmware, and open-source ROS ecosystem integration.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards & Graphic */}
          <div className="lg:col-span-7 space-y-6 relative">
            {/* SVG Background representing global dependency lines */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
              <svg className="w-full h-full min-h-[350px]" viewBox="0 0 500 300" fill="none">
                <circle cx="250" cy="150" r="100" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
                <path d="M50 50 L250 150 M450 50 L250 150 M400 250 L250 150 M100 250 L250 150" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1.5" className="circuit-path" />
                <circle cx="250" cy="150" r="4" fill="#ef4444" />
                <circle cx="250" cy="150" r="12" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
              </svg>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/20 hover:border-glow-cyan/20 transition-all duration-300 group flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-white/3 border border-white/5 group-hover:border-red-500/30 transition-colors">
                    {card.icon}
                  </div>
                  <div className="text-left space-y-1">
                    <h3 className="font-mono text-sm font-bold text-white uppercase group-hover:text-red-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
