import { useEffect, useRef, useState } from 'react';

export default function useSynthPad() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Oscillators and filters
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const initAudio = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create low-pass filter for a warm, deep drone
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, ctx.currentTime);
    filter.Q.setValueAtTime(4, ctx.currentTime);
    filterRef.current = filter;

    // Create main volume gain node
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime); // start silent
    gainNodeRef.current = gainNode;

    // Connect nodes
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // LFO to modulate the filter frequency for a breathing feel
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // very slow modulation
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(60, ctx.currentTime); // modulate filter by 60Hz
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    lfoRef.current = lfo;
  };

  const startDrone = () => {
    if (!audioCtxRef.current) initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Resume context if suspended (browser security)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Oscillator 1 (Low C note - C2 = 65.41 Hz)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(65.41, ctx.currentTime);

    // Oscillator 2 (Fifth - G2 = 98.00 Hz, slightly detuned)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(98.2, ctx.currentTime);

    const filter = filterRef.current;
    const gainNode = gainNodeRef.current;

    if (!filter || !gainNode) return;

    osc1.connect(filter);
    osc2.connect(filter);

    osc1.start();
    osc2.start();

    osc1Ref.current = osc1;
    osc2Ref.current = osc2;

    // Fade in volume to prevent pop
    gainNode.gain.cancelScheduledValues(ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2.0); // 2 second fade-in

    setIsPlaying(true);
  };

  const stopDrone = () => {
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;

    if (!ctx || !gainNode) return;

    // Fade out volume
    gainNode.gain.cancelScheduledValues(ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0); // 1 second fade-out

    setTimeout(() => {
      if (osc1Ref.current) {
        try { osc1Ref.current.stop(); } catch (e) {}
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        try { osc2Ref.current.stop(); } catch (e) {}
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
      setIsPlaying(false);
    }, 1000);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (osc1Ref.current) osc1Ref.current.disconnect();
      if (osc2Ref.current) osc2Ref.current.disconnect();
      if (lfoRef.current) lfoRef.current.disconnect();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return { isPlaying, toggleSound };
}
