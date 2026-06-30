import { motion } from 'framer-motion';
import { Shield, Hammer, Plane, Landmark, Eye, HelpCircle } from 'lucide-react';

interface HexagonItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  offset: string;
}

function HexagonItem({ icon, title, desc, offset }: HexagonItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative w-[240px] h-[270px] ${offset} group cursor-pointer`}
    >
      {/* Outer Hexagon border shadow and glow */}
      <div 
        className="absolute inset-0 bg-brand-cyan/0 group-hover:bg-brand-cyan/10 transition-all duration-300 pointer-events-none"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      />

      {/* Hexagon Body */}
      <div 
        className="absolute inset-[1px] bg-bg-dark border border-white/5 group-hover:border-brand-cyan/30 flex flex-col items-center justify-center p-6 text-center transition-all duration-300"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'rgba(12, 12, 12, 0.75)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(6,182,212,0.08)_0%,transparent_60%] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Card Content */}
        <div className="space-y-4 relative z-10">
          <div className="p-3 rounded-full bg-white/2 border border-white/5 text-brand-cyan group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/20 transition-all duration-300 w-fit mx-auto">
            {icon}
          </div>
          
          <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider group-hover:text-glow-cyan group-hover:text-brand-cyan transition-colors">
            {title}
          </h3>
          
          <p className="text-[10px] text-gray-500 leading-relaxed max-w-[170px] mx-auto group-hover:text-gray-400 transition-colors">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Applications() {
  const items = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Defense Systems',
      desc: 'All-terrain surveillance patrol units, remote explosives retrieval, autonomous base perimeter inspection.',
      offset: '',
    },
    {
      icon: <Hammer className="w-5 h-5" />,
      title: 'Heavy Industry',
      desc: 'High payload weld manipulators, metallurgical sorting, heavy press machine tending, forging cells.',
      offset: 'sm:translate-y-[68px] lg:translate-y-[68px]',
    },
    {
      icon: <Plane className="w-5 h-5" />,
      title: 'Aerospace',
      desc: 'Precision components assembly, non-destructive fuselage testing, automatic rivet drilling, parts placement.',
      offset: '',
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      title: 'Defense Logistics',
      desc: 'Unmanned warehouse transport, volumetric supply sorting, rough-terrain gear loaders for strategic outposts.',
      offset: 'sm:translate-y-[68px] lg:translate-y-[68px]',
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'AI Inspections',
      desc: 'Multi-spectral defect classification, automated assembly inspection lines, dynamic sorting sensors.',
      offset: '',
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Future Tech',
      desc: 'Collaborative robotics platforms, custom surgical actuators, medical waste disposal, laboratory testing.',
      offset: 'sm:translate-y-[68px] lg:translate-y-[68px]',
    },
  ];

  return (
    <section 
      id="applications" 
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 overflow-hidden z-10"
    >
      <div className="absolute inset-0 hex-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
            OPERATIONAL SECTORS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">
            Designed for <br />
            <span className="text-glow-cyan text-brand-cyan">Sovereign Environments</span>
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-lg mx-auto">
            Elamani platforms are engineered to endure intense environmental parameters: extreme temperatures, heavy dust, and corrosive workspaces.
          </p>
        </div>

        {/* Hexagonal Staggered Grid */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-12 sm:gap-y-0 lg:gap-y-0 max-w-5xl mx-auto pt-6 pb-24">
          {items.map((item, idx) => (
            <HexagonItem key={idx} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}
