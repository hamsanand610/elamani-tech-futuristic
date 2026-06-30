import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Network, Zap, Settings, ShieldAlert, BarChart3, Database } from 'lucide-react';

interface TechChipProps {
  icon: React.ReactNode;
  label: string;
  category: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function TechChip({ icon, label, category, isHovered, onHover, onLeave }: TechChipProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-panel px-6 py-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer select-none ${
        isHovered
          ? 'border-brand-cyan/60 border-glow-cyan bg-brand-cyan/5 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
          : 'border-white/5 hover:border-white/20'
      }`}
    >
      <div className={`p-2.5 rounded-lg border transition-colors ${
        isHovered
          ? 'bg-brand-cyan/20 border-brand-cyan/30 text-brand-cyan'
          : 'bg-white/2 border-white/5 text-gray-400'
      }`}>
        {icon}
      </div>
      <div className="text-left">
        <h4 className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
          isHovered ? 'text-white' : 'text-gray-300'
        }`}>
          {label}
        </h4>
        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mt-0.5">
          {category}
        </span>
      </div>
    </motion.div>
  );
}

export default function Technology() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const techStack = [
    { icon: <Cpu className="w-4 h-4" />, label: 'Edge AI Inference', category: 'Deep Learning' },
    { icon: <Terminal className="w-4 h-4" />, label: 'ROS2 Humble / MicroROS', category: 'OS Architecture' },
    { icon: <Network className="w-4 h-4" />, label: 'EtherCAT & CAN-FD', category: 'Bus Networks' },
    { icon: <Zap className="w-4 h-4" />, label: 'Field-Oriented Control', category: 'Motor Control' },
    { icon: <Settings className="w-4 h-4" />, label: 'Real-Time Linux Kernel', category: 'System Kernel' },
    { icon: <ShieldAlert className="w-4 h-4" />, label: 'Kinematic Solvers', category: 'Motion Planning' },
    { icon: <BarChart3 className="w-4 h-4" />, label: 'Volumetric LiDAR SLAM', category: 'Navigation' },
    { icon: <Database className="w-4 h-4" />, label: 'Sensor Fusion (IMU+Camera)', category: 'State Estimation' },
  ];

  return (
    <section 
      id="technology" 
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 z-10"
    >
      <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
            ENGINEERING INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">
            The Elamani <br />
            <span className="text-glow-cyan text-brand-cyan">Technology Stack</span>
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm leading-relaxed max-w-xl">
            Our systems run on low-latency protocols, real-time hardware clock synchronization, and high-TOPS compute units that handle multi-modal sensory pipelines locally.
          </p>
        </div>

        {/* Dynamic Connected Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, idx) => (
            <div key={tech.label}>
              <TechChip
                {...tech}
                isHovered={hoveredIndex === idx}
                onHover={() => setHoveredIndex(idx)}
                onLeave={() => setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>

        {/* Central HUD diagnostic graph showing relationships */}
        <div className="mt-16 glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden text-left max-w-4xl mx-auto">
          {/* Animated laser scan line */}
          <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-brand-cyan/40 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-[grid-draw_4s_linear_infinite]" style={{
            animation: 'laser-scan 8s linear infinite'
          }} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-gray-500 uppercase tracking-widest items-center">
            <div>
              <p className="text-white text-glow-cyan mb-2">Interconnected Architecture</p>
              <p className="text-[10px] lowercase normal-case leading-relaxed text-gray-400">
                Hovering over chips highlights components in real-time. Signals propagate from state estimation up to edge motor controllers.
              </p>
            </div>
            
            <div className="md:col-span-2 border-l border-white/10 md:pl-8 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Active Core Speed:</span>
                <span className="text-brand-cyan">1000 Hz Control Loop</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bus Protocol Bandwidth:</span>
                <span className="text-brand-cyan">100 Mbps (EtherCAT)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Localization Latency:</span>
                <span className="text-brand-cyan">&lt; 2.5 Milliseconds</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes laser-scan {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
