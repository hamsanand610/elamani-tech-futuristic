import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-based
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Enable custom cursor mode on body
    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (dotRef.current) {
        gsap.set(dotRef.current, { x: mouse.x, y: mouse.y });
      }
    };

    const handleMouseLeaveWindow = () => {
      if (dotRef.current) gsap.to(dotRef.current, { opacity: 0 });
      if (ringRef.current) gsap.to(ringRef.current, { opacity: 0 });
    };

    const handleMouseEnterWindow = () => {
      if (dotRef.current) gsap.to(dotRef.current, { opacity: 1 });
      if (ringRef.current) gsap.to(ringRef.current, { opacity: 1 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Dynamic animation loop for the ring lerping (inertia)
    const tick = () => {
      const ease = 0.15; // smooth delay factor
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;

      if (ringRef.current) {
        gsap.set(ringRef.current, { x: ringPos.x, y: ringPos.y });
      }
      requestAnimationFrame(tick);
    };

    const rafId = requestAnimationFrame(tick);

    // Select interactive targets for cursor sizing
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], .magnetic-target'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Delay briefly to allow components to mount completely
    const timeoutId = setTimeout(addHoverListeners, 500);

    // Re-verify list on content mutation
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${isHovered ? 'hovered' : ''}`} />
    </>
  );
}
