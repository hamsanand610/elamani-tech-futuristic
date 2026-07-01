import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-32 overflow-hidden z-10"
    >
      {/* Background blueprint elements for engineering feel */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left text column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col items-start text-left"
        >
          {/* Tagline */}
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            INDIAN DEFENSE &amp; INDUSTRIAL DEPLOYMENT READY
          </motion.div>

          {/* Core high-impact headings */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
            <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Engineering
            </motion.span>
            <motion.span variants={itemVariants} className="block text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-blue">
              Intelligence.
            </motion.span>
            <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Built in India.
            </motion.span>
            <motion.span variants={itemVariants} className="block text-xs sm:text-sm font-mono tracking-[0.25em] text-gray-500 mt-2 uppercase font-medium">
              Designed for the global frontier.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-light font-mono"
          >
            Developing indigenous robotic systems, high-precision actuators, and deep-learning control systems to power the next generation of automation in India's aerospace, defense, and heavy manufacturing sectors.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => handleScrollTo('#products')}
              className="px-8 py-4 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_25px_rgba(249,115,22,0.25)] hover:shadow-[0_4px_35px_rgba(249,115,22,0.4)] hover:scale-102 cursor-pointer magnetic-target"
            >
              Explore Robotics
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo('#founder')}
              className="px-8 py-4 rounded-lg border border-white/10 hover:border-white/20 bg-white/2 hover:bg-white/5 text-gray-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer magnetic-target"
            >
              <Play className="w-4 h-4 text-brand-cyan fill-brand-cyan/20" />
              Watch Innovation
            </button>
          </motion.div>
        </motion.div>

        {/* Right column - Left empty to showcase the 3D canvas object in background */}
        <div className="lg:col-span-4 h-[350px] lg:h-auto pointer-events-none" />
      </div>

      {/* Floating HUD element at bottom */}
      <div className="absolute bottom-10 left-6 right-6 max-w-7xl mx-auto px-6 hidden md:flex items-center justify-between pointer-events-none">
        <div className="flex gap-12 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <div>
            <p className="text-white">Active System</p>
            <p className="mt-1 font-semibold text-brand-cyan">R-01 Humanoid Platform</p>
          </div>
          <div>
            <p className="text-white">Core Actuation</p>
            <p className="mt-1 font-semibold text-brand-cyan">0.05mm Repeatability</p>
          </div>
          <div>
            <p className="text-white">OS Architecture</p>
            <p className="mt-1 font-semibold text-brand-cyan">Real-time ROS2 / MicroXRCE</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          SYSTEM STATUS: NOMINAL
        </div>
      </div>
    </section>
  );
}
