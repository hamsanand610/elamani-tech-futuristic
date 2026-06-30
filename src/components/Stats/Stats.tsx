import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatBlockProps {
  number: number;
  suffix: string;
  label: string;
  category: string;
}

function StatBlock({ number, suffix, label, category }: StatBlockProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = number;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * (end - start) + start);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, number]);

  return (
    <div ref={ref} className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between text-left h-full group hover:border-brand-cyan/20 transition-all duration-300">
      <div className="space-y-2">
        <span className="font-mono text-[9px] text-brand-cyan uppercase tracking-widest block">
          {category}
        </span>
        <h3 className="font-mono font-bold text-3xl sm:text-4xl text-white tracking-wider flex items-baseline">
          {count}
          <span className="text-brand-cyan text-glow-cyan text-xl sm:text-2xl ml-1">{suffix}</span>
        </h3>
      </div>
      <p className="font-mono text-xs text-gray-500 mt-6 leading-relaxed group-hover:text-gray-400 transition-colors">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const stats = [
    {
      number: 100,
      suffix: '%',
      category: 'Sovereign Security',
      label: 'Sovereign design with 100% indigenous software drivers and component architecture, eliminating import risks.',
    },
    {
      number: 200,
      suffix: ' TOPS',
      category: 'AI Processing',
      label: 'On-board neural core computing units for instant volumetric scanning, SLAM navigation, and safety overrides.',
    },
    {
      number: 18,
      suffix: ' Pending',
      category: 'Intellectual Property',
      label: 'Sovereign patents filed in high-torque electromagnetic layouts, sensor fusion configurations, and joint sealing.',
    },
    {
      number: 20,
      suffix: ' Micron',
      category: 'Drive Precision',
      label: 'Repeatable manufacturing precision tolerances inside our joint gearbox assemblies for aeronautics welding.',
    },
  ];

  return (
    <section 
      id="stats" 
      className="relative w-full flex items-center justify-center bg-bg-dark py-24 z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <StatBlock {...stat} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
