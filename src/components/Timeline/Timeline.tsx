import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position inside this timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timelineSteps = [
    {
      phase: '01',
      title: 'Research & Mathematical Modeling',
      desc: 'Formulating kinematic formulas, torque curves, and trajectory planning equations before any hardware is cut.',
    },
    {
      phase: '02',
      title: 'Simulation & Digital Twin',
      desc: 'Testing physics, collision models, and joint tolerances inside Gazebo and Webots virtual environments.',
    },
    {
      phase: '03',
      title: 'CAD & Generative Design',
      desc: 'Leveraging AI-driven design algorithms to optimize load-to-weight ratios for aluminum and carbon structures.',
    },
    {
      phase: '04',
      title: 'Precision Machining & Prototypes',
      desc: 'Milling aerospace-grade joints and soldering multi-layer controller boards in our cleanrooms.',
    },
    {
      phase: '05',
      title: 'Rigorous Stress Testing',
      desc: 'Executing millions of actuation cycles, thermal chambers tests, and drop simulations to verify reliability.',
    },
    {
      phase: '06',
      title: 'Deployment & Calibration',
      desc: 'Integrating machines on-site, connecting ROS node clusters, and calibrating SLAM sensor offsets.',
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 overflow-hidden z-10"
    >
      <div className="absolute inset-0 hex-grid opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
            ENGINEERING ROADMAP
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">
            From Blueprint <br />
            <span className="text-glow-cyan text-brand-cyan">To Sovereign Metal</span>
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-md mx-auto">
            Our systematic engineering process removes guess-work, verifying safety and compliance at each stage.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Vertical background line track */}
          <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />

          {/* Animated scrolling progress line overlay */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-cyan via-brand-blue to-transparent" 
          />

          <div className="space-y-16">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex flex-col sm:flex-row items-stretch justify-between relative ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Outer glowing center dot */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-brand-cyan z-20 flex items-center justify-center top-1 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
                  </div>

                  {/* Left/Right content card container */}
                  <div className={`w-full sm:w-[45%] pl-10 sm:pl-0 text-left ${
                    isEven ? 'sm:text-left' : 'sm:text-right'
                  }`}>
                    <div className={`glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-cyan/20 transition-all duration-300 relative group overflow-hidden ${
                      isEven ? 'hover:translate-x-1' : 'hover:-translate-x-1'
                    }`}>
                      {/* Blueprint construction crosshairs */}
                      <div className="absolute top-2 left-2 blueprint-crosshair opacity-35" />
                      <div className="absolute top-2 right-4 blueprint-crosshair opacity-35 rotate-90" />
                      <div className="absolute bottom-4 left-2 blueprint-crosshair opacity-35 -rotate-90" />
                      <div className="absolute bottom-4 right-4 blueprint-crosshair opacity-35 rotate-180" />

                      {/* Faint coordinates tick */}
                      <span className="absolute top-2 right-6 font-mono text-[7px] text-gray-600 select-none">
                        [E-COORD: {(14.7 + idx * 11.2).toFixed(1)} : {(58.3 - idx * 6.5).toFixed(1)}]
                      </span>

                      <span className="font-mono text-xs text-brand-cyan font-bold tracking-widest block mb-2">
                        PHASE {step.phase}
                      </span>
                      <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Empty space for structural symmetry */}
                  <div className="hidden sm:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
