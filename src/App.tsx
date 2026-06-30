import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import useSynthPad from './hooks/useSynthPad';

// Components
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Hero/Hero';
import Vision from './components/Vision/Vision';
import Problem from './components/Problem/Problem';
import Products from './components/Products/Products';
import Stats from './components/Stats/Stats';
import Applications from './components/Applications/Applications';
import Technology from './components/Technology/Technology';
import Timeline from './components/Timeline/Timeline';
import Testimonials from './components/Testimonials/Testimonials';
import Founder from './components/Founder/Founder';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import SceneContainer from './components/three/SceneContainer';
import Cursor from './components/Cursor/Cursor';

export default function App() {
  const { isPlaying, toggleSound } = useSynthPad();
  const [activeSection, setActiveSection] = useState('hero');
  const [active3DState, setActive3DState] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Monitor scroll triggers to update current active section and 3D states
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      
      const sections = [
        { id: 'hero', state3d: 0 },
        { id: 'vision', state3d: 0 },
        { id: 'problem', state3d: 1 },
        { id: 'products', state3d: 2 },
        { id: 'stats', state3d: 2 },
        { id: 'applications', state3d: 3 },
        { id: 'technology', state3d: 4 },
        { id: 'timeline', state3d: 4 },
        { id: 'testimonials', state3d: 4 },
        { id: 'founder', state3d: 4 },
        { id: 'contact', state3d: 4 }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i].id);
          setActive3DState(sections[i].state3d);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#050505] min-h-screen text-white select-none">
      {/* Immersive Background Canvas */}
      <SceneContainer activeState={active3DState} />

      {/* Custom Pointer Interactivity */}
      <Cursor />

      {/* Foreground Interactive Interface */}
      <div className="relative z-10 w-full flex flex-col">
        <Navbar 
          isPlaying={isPlaying} 
          toggleSound={toggleSound} 
          activeSection={activeSection} 
        />
        
        <main className="w-full flex-grow">
          <Hero />
          <Vision />
          <Problem />
          <Products />
          <Stats />
          <Applications />
          <Technology />
          <Timeline />
          <Testimonials />
          <Founder />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

