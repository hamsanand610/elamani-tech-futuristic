import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Cpu, HardDrive, Eye, Layers } from 'lucide-react';

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  specs: string[];
  desc: string;
  badge: string;
}

function ProductCard({ icon, title, specs, desc, badge }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track cursor coordinates inside the card for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse coordinate to rotate angle bounds [-10, 10] degrees
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates relative to card center
    const relativeX = e.clientX - rect.left - width / 2;
    const relativeY = e.clientY - rect.top - height / 2;
    
    x.set(relativeX);
    y.set(relativeY);

    // Compute and assign exact coordinates for the CSS reflection sheen
    const sheenX = e.clientX - rect.left;
    const sheenY = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${sheenX}px`);
    cardRef.current.style.setProperty('--mouse-y', `${sheenY}px`);
  };

  const handleMouseLeave = () => {
    // Reset tilt on exit
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-colors duration-300 relative group cursor-pointer h-full flex flex-col justify-between overflow-hidden magnetic-target"
    >
      {/* Background glow radial layer */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(6,182,212,0.03)_0%,transparent_70%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Futuristic reflection sheen layer */}
      <div className="card-sheen" />

      {/* Front/Top card elements */}
      <div style={{ transform: 'translateZ(30px)' }} className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="p-4 rounded-xl bg-white/2 border border-white/5 group-hover:border-brand-cyan/30 text-brand-cyan transition-colors">
            {icon}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan px-2 py-0.5 border border-brand-cyan/20 rounded bg-brand-cyan/5">
            {badge}
          </span>
        </div>

        <div className="space-y-3 text-left">
          <h3 className="font-mono font-bold text-lg text-white uppercase tracking-wider group-hover:text-glow-cyan group-hover:text-brand-cyan transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      {/* Technical specification details */}
      <div style={{ transform: 'translateZ(15px)' }} className="mt-8 pt-6 border-t border-white/5 text-left space-y-2">
        <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
          Product Metrics:
        </p>
        <ul className="space-y-1.5">
          {specs.map((spec) => (
            <li key={spec} className="font-mono text-xs text-gray-400 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-brand-cyan" />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const products = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Industrial Arms',
      badge: 'EL-ARM v2',
      desc: 'Sovereign six-axis manipulators optimized for automotive assembly, high-precision laser welding, and automated component testing under harsh conditions.',
      specs: ['0.02mm repeatability', '12kg nominal payload', 'Fully IP67 sealed'],
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Precision Actuators',
      badge: 'EL-DRIVE',
      desc: 'Indigenous electromagnetic actuator systems with built-in micro-encoders and field-oriented controllers for smooth robotic torque output.',
      specs: ['Integrated 20-bit encoder', 'Harmonic drive gearing', 'CAN-FD / EtherCAT'],
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: 'Quadruped Platforms',
      badge: 'EL-QUAD',
      desc: 'All-terrain quadruped robots designed for border patrol, mining shaft inspection, and rough geological exploration in defense and oil sectors.',
      specs: ['LiDAR mapping systems', '4.5 hrs battery life', '180kg impact resilience'],
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'AI Vision Nodes',
      badge: 'EL-SENSE',
      desc: 'Neural processing units for localized edge analytics, high-speed sorting operations, and anomaly identification on dynamic production conveyers.',
      specs: ['Dual 4K HDR cameras', 'Intelligent depth sensor', '200 TOPS AI hardware'],
    },
  ];

  return (
    <section 
      id="products" 
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
              HARDWARE PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-none uppercase">
              Indigenous <br />
              <span className="text-glow-cyan text-brand-cyan">Automation Stacks</span>
            </h2>
          </div>
          <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-sm leading-relaxed border-l border-white/10 pl-6">
            Engineered, machined, and calibrated in India. Designed to surpass global benchmark standards for resilience and latency.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div key={prod.title}>
              <ProductCard {...prod} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
