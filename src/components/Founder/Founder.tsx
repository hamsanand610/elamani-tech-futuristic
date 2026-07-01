import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 overflow-hidden z-10"
    >
      {/* Dark vignette overlay for cinematic spotlight feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-bg-dark z-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Portrait representation / abstract silhouette */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="w-72 h-96 sm:w-80 sm:h-[450px] rounded-2xl relative overflow-hidden glass-panel border border-white/10 shadow-2xl flex items-center justify-center group">
              {/* Portrait Placeholder with animated holographic blueprint */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
                {/* Holographic Radar/Actuator blueprint */}
                <div className="w-48 h-48 rounded-full border border-brand-cyan/20 relative flex items-center justify-center bg-brand-cyan/5">
                  {/* Rotating radar line */}
                  <div className="absolute inset-0 rounded-full border-t-2 border-brand-cyan/60 animate-spin" style={{ animationDuration: '4s' }} />
                  {/* Outer coordinate ring */}
                  <div className="absolute -inset-4 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '24s' }} />
                  {/* Inner blueprint details */}
                  <svg className="w-32 h-32 text-brand-cyan/30 group-hover:text-brand-cyan/50 transition-colors" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    {/* Rotating actuator sweep arm */}
                    <path d="M 50 50 L 78 30" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="origin-center animate-[spin_8s_linear_infinite]" style={{ transformOrigin: '50px 50px' }} />
                    <circle cx="78" cy="30" r="3" fill="#f97316" className="origin-center animate-[spin_8s_linear_infinite]" style={{ transformOrigin: '50px 50px' }} />
                  </svg>
                </div>

                <div className="space-y-1.5 text-center font-mono select-none">
                  <div className="text-[10px] text-brand-cyan font-bold tracking-widest uppercase animate-pulse">
                    SYS_DIAGNOSTIC: ACTIVE
                  </div>
                  <div className="text-[8px] text-gray-500 uppercase tracking-widest">
                    NODE_LINK: IISc_BENGALURU // TRK_981
                  </div>
                </div>
              </div>

              {/* Absolute Corner Blueprint Markers */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />
            </div>
          </div>

          {/* Right Column: Founder Quote & Bio info */}
          <div className="lg:col-span-7 text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
              LEADERSHIP NOTE
            </div>

            <div className="relative">
              <Quote className="absolute -top-10 -left-6 w-16 h-16 text-white/5 pointer-events-none" />
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight uppercase relative z-10">
                "We're not <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500">just building robots.</span> <br />
                We're building India's <br />
                <span className="text-glow-cyan text-brand-cyan">robotics future."</span>
              </h2>
            </div>

            {/* Founder details */}
            <div className="space-y-2">
              <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">
                CEO of ELAMANI TECH
              </h3>
              <p className="font-mono text-xs text-brand-cyan uppercase tracking-widest">
                Founder &amp; Chief Robotics Architect, Elamani Tech
              </p>
            </div>

            {/* Animated Signature SVG */}
            <div className="pt-4 max-w-[200px]">
              <svg className="w-full h-12 text-brand-cyan/60" viewBox="0 0 200 60" fill="none">
                <motion.path
                  d="M10 30 C 40 10, 80 50, 90 20 C 100 -10, 120 40, 140 30 C 160 20, 180 15, 190 35"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
                />
              </svg>
            </div>

            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xl">
              "Indian factories require machines designed for local floor dynamics, thermal tolerances, and electrical grids. Elamani Tech is bridging the high-tech automation gap by building completely in-house actuators, drivers, and control scripts."
            </p>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scanner-move {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </section>
  );
}
