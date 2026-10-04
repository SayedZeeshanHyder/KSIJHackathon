import React, { useEffect, useState, useRef } from 'react';

interface PortalHeroProps {
  heroImage: string;
}

export const PortalHero: React.FC<PortalHeroProps> = ({ heroImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = Math.min(window.innerHeight * 0.45, 360);
      const rawProgress = scrollY / threshold;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Visual mathematical values derived from scroll progress
  // 1. Image scale: starts somewhat overscaled at 1.25 down to 1.0
  const imageScale = 1.25 - scrollProgress * 0.25;

  // 2. Duotone wash overlay opacity: from 0 up to 0.38
  const duotoneOpacity = scrollProgress * 0.38;

  // 3. Left and right solid panels translation: from 0% outward past 102%
  const panelTranslate = scrollProgress * 105;

  // 4. Center accent dots travelling out to opposite corners
  // Dot 1 (amber) travels top-left
  const dot1X = -(scrollProgress * 44); // vw
  const dot1Y = -(scrollProgress * 38); // vh

  // Dot 2 (teal) travels bottom-right
  const dot2X = scrollProgress * 44; // vw
  const dot2Y = scrollProgress * 38; // vh

  // 5. Signature move: Wordmark scale UP, tracking tightens, and spans separate outward safely within viewport
  // Scale title up modestly: 1.0 -> 1.06
  const titleScale = 1.0 + scrollProgress * 0.06;
  // Letter spacing tightens simultaneously: from 0.02em down to -0.02em
  const letterSpacing = 0.02 - scrollProgress * 0.04;
  // First span travels left and second span travels right safely within viewport bounds
  const span1TranslateX = -(scrollProgress * 20);
  const span2TranslateX = scrollProgress * 20;

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[620px] bg-[#FFFFFF] overflow-hidden"
    >
      {/* Full-height stage */}
      <div className="relative h-full w-full overflow-hidden isolate select-none">
        
        {/* Layer 1: Full-bleed image starting overscaled, settling to 1.0 */}
        <div 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={heroImage}
            alt="Sonorum recording acoustics"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Layer 2: Duotone wash blending amber (#E8913C) and teal (#2E6B72) at mix-blend-mode overlay */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none will-change-opacity"
          style={{
            background: 'linear-gradient(135deg, rgba(46,107,114,0.9) 0%, rgba(232,145,60,0.85) 100%)',
            mixBlendMode: 'overlay',
            opacity: duotoneOpacity
          }}
        />

        {/* Layer 3: Radial veil darkening the edges */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 35%, rgba(10,12,14,0.7) 70%, rgba(10,12,14,0.95) 100%)'
          }}
        />

        {/* Layer 4: TWO solid panels each a little over half the width, pinned to left & right edges */}
        {/* Hero begins CLOSED (meeting in center at scroll 0), parting outward on scroll */}
        <div
          className="absolute top-0 left-0 w-[51%] h-full bg-[#FFFFFF] pointer-events-none z-10 will-change-transform border-r border-[rgba(10,12,14,0.08)]"
          style={{
            transform: `translateX(-${panelTranslate}%)`
          }}
        />
        <div
          className="absolute top-0 right-0 w-[51%] h-full bg-[#FFFFFF] pointer-events-none z-10 will-change-transform border-l border-[rgba(10,12,14,0.08)]"
          style={{
            transform: `translateX(${panelTranslate}%)`
          }}
        />

        {/* Layer 5: Two small glowing accent dots at the centre travelling outward to opposite corners */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {/* Amber dot traveling to top-left */}
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#E8913C] will-change-transform transition-opacity"
            style={{
              transform: `translate(${dot1X}vw, ${dot1Y}vh)`,
              opacity: scrollProgress < 0.95 ? 0.9 : 0
            }}
          />
          {/* Teal dot traveling to bottom-right */}
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#2E6B72] will-change-transform transition-opacity"
            style={{
              transform: `translate(${dot2X}vw, ${dot2Y}vh)`,
              opacity: scrollProgress < 0.95 ? 0.9 : 0
            }}
          />
        </div>

        {/* Layer 6: The Portal Title on top, split into two spans on one line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-4">
          <div
            className="flex items-center justify-center will-change-transform"
            style={{
              transform: `scale(${titleScale})`,
              letterSpacing: `${letterSpacing}em`
            }}
          >
            <h1 className="font-display font-extrabold text-[clamp(22px,5.2vw,74px)] text-[#0A0C0E] leading-none whitespace-nowrap flex items-center tracking-tight px-4 max-w-[95vw] justify-center">
              <span 
                className="inline-block will-change-transform mr-3 sm:mr-6"
                style={{
                  transform: `translateX(${span1TranslateX}%)`
                }}
              >
                ONE
              </span>
              <span 
                className="inline-block will-change-transform"
                style={{
                  transform: `translateX(${span2TranslateX}%)`
                }}
              >
                COMMUNITY
              </span>
            </h1>
          </div>
        </div>

        {/* Layer 7: Corner metadata pins to the top and bottom edges */}
        {/* Top metadata (just below broader navigation) */}
        <div className="absolute top-[92px] sm:top-[102px] left-6 sm:left-14 z-30 pointer-events-none">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
            EDITION // 2026
          </p>
        </div>
        <div className="absolute top-[92px] sm:top-[102px] right-6 sm:right-14 z-30 pointer-events-none text-right">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
            ANALOG ARCHIVE & CUTS
          </p>
        </div>

        {/* Bottom metadata */}
        <div className="absolute bottom-6 left-6 sm:left-12 z-30 pointer-events-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
            LATHE CUT · BERLIN 52.5200° N
          </p>
        </div>
        <div className="absolute bottom-6 right-6 sm:right-12 z-30 pointer-events-none flex items-center gap-2 text-right">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
            SCROLL TO PART PORTAL
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
        </div>

      </div>
    </section>
  );
};
