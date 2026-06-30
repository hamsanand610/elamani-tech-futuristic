import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the section for fading typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textOpacity1 = useTransform(scrollYProgress, [0.2, 0.4], [0.15, 1]);
  const textOpacity2 = useTransform(scrollYProgress, [0.45, 0.65], [0.15, 1]);
  
  const textScale1 = useTransform(scrollYProgress, [0.2, 0.4], [0.97, 1]);
  const textScale2 = useTransform(scrollYProgress, [0.45, 0.65], [0.97, 1]);

  return (
    <section 
      ref={containerRef}
      id="vision" 
      className="relative min-h-[90vh] w-full flex items-center justify-center bg-bg-dark overflow-hidden py-24 z-10"
    >
      {/* Background blueprint details */}
      <div className="absolute inset-0 hex-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 w-full text-center relative z-20">
        {/* Section header tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest mb-12">
          SOVEREIGN R&amp;D MANDATE
        </div>

        {/* Large high-impact scroll-linked quote */}
        <div className="space-y-6 sm:space-y-10">
          <motion.h2 
            style={{ opacity: textOpacity1, scale: textScale1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-white uppercase"
          >
            "India shouldn't <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-400 to-gray-600">import intelligence.</span>
          </motion.h2>

          <motion.h2 
            style={{ opacity: textOpacity2, scale: textScale2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none text-brand-cyan uppercase text-glow-cyan"
          >
            India should <br />
            <span className="text-white">build it."</span>
          </motion.h2>
        </div>

        {/* Supporting tag */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-gray-500 font-mono text-xs sm:text-sm tracking-widest max-w-lg mx-auto"
        >
          Elamani Tech is committed to establishing complete technological self-reliance in high-precision actuation, embedded control networks, and autonomous decision-making algorithms.
        </motion.p>
      </div>
    </section>
  );
}
