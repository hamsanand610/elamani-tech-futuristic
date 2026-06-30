import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Terminal } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Defense procurement',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Terminal telemetry logs state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM: SECURE TELEMETRY UPLINK STATUS [ACTIVE]',
    'ROUTING: BENGALURU_IISc_HUB_NODE_901 -> CLIENT',
    'CIPHER: CURVE25519_AES256_GCM_SHA384_VERIFIED'
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => {
      const updated = [...prev, `[${timestamp}] ${msg}`];
      // Keep only last 8 logs to prevent overflow
      if (updated.length > 8) {
        return updated.slice(updated.length - 8);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    addLog('TRANSMIT UPLINK REQUEST INITIATED...');

    setTimeout(() => {
      addLog('UPLINK PACKET ENCRYPTED [AES-256-GCM]');
    }, 300);

    setTimeout(() => {
      addLog('COMMENCING HANDSHAKE OVER SECURE TUNNEL...');
    }, 700);

    setTimeout(() => {
      addLog('TRANSMISSION CALIBRATION SIGNALS STABLE');
    }, 1100);

    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      addLog('TRANSMISSION SYSTEM COMPLETED: LOGGED AT HUB.');
      setFormState({ name: '', email: '', subject: 'Defense procurement', message: '' });
      setTimeout(() => setIsSent(false), 6000);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen w-full flex items-center justify-center bg-bg-dark py-24 z-10"
    >
      <div className="absolute inset-0 circuit-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-medium tracking-widest">
            TELEMETRY LINK
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase">
            Initiate System <br />
            <span className="text-glow-cyan text-brand-cyan">Procurement</span>
          </h2>
          <p className="text-gray-400 font-mono text-xs sm:text-sm max-w-md mx-auto">
            Connect with our engineering team for specifications, defense procurement, or investment inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Telemetry info */}
          <div className="lg:col-span-5 text-left space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Elamani Tech Pvt Ltd
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white/2 border border-white/5 text-brand-cyan">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">Headquarters</p>
                    <p className="text-[10px] mt-0.5 text-gray-500">Bengaluru, Karnataka, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white/2 border border-white/5 text-brand-cyan">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">Email Interface</p>
                    <p className="text-[10px] mt-0.5 text-gray-500">procure@elamani.tech</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white/2 border border-white/5 text-brand-cyan">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white">Direct Line</p>
                    <p className="text-[10px] mt-0.5 text-gray-500">+91 (80) 4920 1029</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Immersive Mission Control Uplink Terminal */}
            <div className="glass-panel p-5 rounded-xl border border-brand-cyan/20 font-mono text-[10px] text-brand-cyan space-y-2 relative overflow-hidden h-48 flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-brand-cyan/20 pb-2 mb-1">
                <span className="font-bold flex items-center gap-1.5 uppercase text-glow-cyan text-[9px]">
                  <Terminal className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                  Telemetry Uplink Terminal
                </span>
                <span className="text-[8px] text-gray-500 font-semibold">SECURE_TUNNEL_NODE</span>
              </div>
              
              <div className="flex-grow space-y-1 select-text overflow-y-auto max-h-[110px] pr-1">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="leading-normal break-all font-mono opacity-80 hover:opacity-100 transition-opacity">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Glass Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 text-left relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 bg-bg-dark/85 backdrop-blur-sm z-30 flex items-center justify-center flex-col gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-brand-cyan border-t-transparent animate-spin" />
                  <span className="font-mono text-xs text-brand-cyan uppercase tracking-widest">Propagating signals...</span>
                </div>
              )}
              
              {isSent && (
                <div className="absolute inset-0 bg-bg-dark/95 z-30 flex items-center justify-center flex-col text-center p-8 gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-pulse">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-sm text-white uppercase tracking-wider">Transmission Verified</h4>
                    <p className="text-xs text-gray-500 mt-2 max-w-sm">Your telemetry packet has been logged on our secure servers. Our engineering lead will respond via encryption soon.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">Operator Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => {
                      setFormState({ ...formState, name: e.target.value });
                      addLog(`OPERATOR_ID -> "${e.target.value.substring(0, 16)}"`);
                    }}
                    className="w-full bg-white/2 border border-white/5 rounded-lg px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-brand-cyan/50 focus:bg-white/5 transition-all magnetic-target"
                    placeholder="e.g. Capt. Sharma"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">Contact Node (Email)</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      addLog(`CONTACT_EMAIL -> Validating format...`);
                    }}
                    className="w-full bg-white/2 border border-white/5 rounded-lg px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-brand-cyan/50 focus:bg-white/5 transition-all magnetic-target"
                    placeholder="e.g. sharma@mod.gov.in"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">Inquiry Category</label>
                <select
                  value={formState.subject}
                  onChange={(e) => {
                    setFormState({ ...formState, subject: e.target.value });
                    addLog(`SYS CONFIG: TYPE -> ${e.target.value.toUpperCase()}`);
                  }}
                  className="w-full bg-bg-dark border border-white/5 rounded-lg px-4 py-3 text-xs text-gray-300 font-mono focus:outline-none focus:border-brand-cyan/50 focus:bg-white/5 transition-all appearance-none magnetic-target"
                >
                  <option value="Defense procurement">Defense Procurement &amp; Customization</option>
                  <option value="Industrial sales">Industrial Assembly Automation</option>
                  <option value="Investment partnerships">Investment &amp; R&amp;D Sponsorship</option>
                  <option value="Career/Engineering join">Robotics Engineering Applications</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block">Payload (Message)</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                    addLog(`PAYLOAD_LEN -> ${e.target.value.length} Bytes`);
                  }}
                  className="w-full bg-white/2 border border-white/5 rounded-lg px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-brand-cyan/50 focus:bg-white/5 transition-all resize-none magnetic-target"
                  placeholder="Provide system specifications or deployment details..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(249,115,22,0.2)] cursor-pointer magnetic-target"
              >
                Transmit Packet
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
