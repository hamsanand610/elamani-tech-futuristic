import { motion } from 'framer-motion';
import { Award, ShieldAlert, Cpu } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "Elamani's high-torque precision servo actuators have allowed us to bypass European supply dependencies entirely, reducing lead times for our CNC robotics setups by 70%.",
      author: "Dr. K. Raghavan",
      role: "Lead Engineer, Heavy Propulsion Systems",
      icon: <Award className="w-5 h-5 text-brand-cyan" />
    },
    {
      quote: "Integrating their ROS2-based quadruped robot into our mining shaft scanning pipeline was seamless. The environmental seals survived 100% dust testing loops without performance drop.",
      author: "Aditi Sen",
      role: "Head of Operations, Mineral Logistics Corp",
      icon: <ShieldAlert className="w-5 h-5 text-brand-cyan" />
    },
    {
      quote: "Sovereign robotics development is a strategic imperative for India. Elamani Tech represents the high-tech precision manufacturing sector at its absolute absolute peak.",
      author: "V. R. Balaji",
      role: "Investment Director, Sovereign Capital Alliance",
      icon: <Cpu className="w-5 h-5 text-brand-cyan" />
    }
  ];

  return (
    <section 
      id="testimonials" 
      className="relative w-full flex items-center justify-center bg-bg-dark py-24 z-10"
    >
      <div className="absolute inset-0 hex-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
            OPERATIONAL VERIFICATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">
            Client &amp; Partner <br />
            <span className="text-glow-cyan text-brand-cyan">Diagnostics</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-brand-cyan/20 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-6">
                <div className="p-3 rounded-lg bg-white/2 border border-white/5 w-fit group-hover:border-brand-cyan/30 text-brand-cyan transition-colors">
                  {rev.icon}
                </div>
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {rev.author}
                </h4>
                <p className="font-mono text-[10px] text-gray-500 mt-1 uppercase tracking-widest">
                  {rev.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
