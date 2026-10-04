import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Users, GraduationCap, Briefcase, Calendar, HeartHandshake } from 'lucide-react';

interface StatementFoldProps {
  imageSrc?: string;
  onExploreClick?: (tab: string) => void;
}

export const StatementFold: React.FC<StatementFoldProps> = ({ 
  imageSrc = '/src/assets/images/hero_community_ecosystem_1791097428797.jpg',
  onExploreClick 
}) => {
  const foldRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [driftY, setDriftY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!foldRef.current) return;
      const rect = foldRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through this section the user has scrolled
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // Drifts and rotates on scroll
      setRotation(clamped * 60); // 0 to 60 deg rotation
      setDriftY((clamped - 0.5) * 60); // vertical drift
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about"
      ref={foldRef}
      className="relative min-h-[90vh] w-full bg-[#FFFFFF] border-b border-[rgba(10,12,14,0.1)] flex items-center justify-between px-6 sm:px-16 lg:px-24 py-24 overflow-hidden"
    >
      {/* Large watermark typography */}
      <div 
        className="absolute top-10 left-6 sm:left-16 lg:left-24 select-none pointer-events-none font-display text-[clamp(60px,11vw,160px)] font-extrabold leading-none opacity-[0.06] text-[#0A0C0E] tracking-tight"
        aria-hidden="true"
      >
        ABOUT US
      </div>

      <div className="relative z-10 max-w-2xl space-y-7 pt-8 sm:pt-14">
        
        {/* Small uppercase label */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#4A525A] font-semibold">
            ABOUT ONE COMMUNITY // PURPOSE & HERITAGE
          </p>
        </div>

        {/* About Us Headline */}
        <h2 className="font-display font-bold text-[clamp(28px,3.8vw,52px)] text-[#0A0C0E] leading-[1.16] tracking-[-0.02em]">
          Uniting hearts, careers, and knowledge into{' '}
          <span className="text-[#E8913C]">
            one empowered global community
          </span>
          .
        </h2>

        {/* Narrative / About Us description */}
        <div className="space-y-3.5 text-[#4A525A] font-sans text-[15px] sm:text-[16px] leading-relaxed max-w-xl">
          <p>
            One Community was built with a singular vision: to empower our people across every phase of life. From students seeking guidance to seasoned professionals finding executive roles, we connect talents and open doors.
          </p>
          <p className="text-[14px] text-[#717B85] leading-relaxed">
            We bridge historic community roots with cutting-edge technology — blending verified job listings, structured Islamic & skill education, collaborative video reels, and seamless reservations for sacred gatherings and matrimonial celebrations.
          </p>
        </div>

        {/* Pillars / Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg">
          <div className="p-3.5 rounded-xl bg-[#F6F7F9] border border-[rgba(10,12,14,0.06)] flex items-start gap-2.5 hover:border-[#E8913C]/40 transition-colors">
            <Briefcase className="w-4 h-4 text-[#E8913C] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#0A0C0E]">Careers & AI</h4>
              <p className="text-[11px] text-[#78828A] mt-0.5">Resume AI & vetted jobs</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F7F9] border border-[rgba(10,12,14,0.06)] flex items-start gap-2.5 hover:border-[#E8913C]/40 transition-colors">
            <GraduationCap className="w-4 h-4 text-[#E8913C] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#0A0C0E]">Education</h4>
              <p className="text-[11px] text-[#78828A] mt-0.5">Live quizzes & courses</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F6F7F9] border border-[rgba(10,12,14,0.06)] flex items-start gap-2.5 hover:border-[#E8913C]/40 transition-colors col-span-2 sm:col-span-1">
            <Calendar className="w-4 h-4 text-[#E8913C] mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-semibold text-[#0A0C0E]">Community Events</h4>
              <p className="text-[11px] text-[#78828A] mt-0.5">Majlis & heritage venues</p>
            </div>
          </div>
        </div>

        {/* Hairline rule indicator */}
        <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#78828A]">
          <span>VERIFIED NETWORK</span>
          <span className="w-6 h-[1px] bg-[rgba(10,12,14,0.14)]" />
          <span>INCLUSIVE ECOSYSTEM</span>
          <span className="w-6 h-[1px] bg-[rgba(10,12,14,0.14)]" />
          <span>HONORING TRADITION</span>
        </div>
      </div>

      {/* Circular floating image element with elegant styling */}
      <div 
        className="hidden md:block absolute -right-16 lg:right-10 xl:right-20 w-80 lg:w-96 xl:w-[420px] h-80 lg:h-96 xl:h-[420px] rounded-full overflow-hidden border-2 border-[rgba(10,12,14,0.1)] shadow-2xl select-none pointer-events-none will-change-transform"
        style={{
          transform: `translateY(${driftY}px) rotate(${rotation}deg)`
        }}
      >
        <img
          src={imageSrc}
          alt="One Community Ecosystem"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle center ring overlay with amber accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0C0E]/40 via-transparent to-transparent flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <HeartHandshake className="w-8 h-8 text-white drop-shadow" />
          </div>
        </div>
      </div>

    </section>
  );
};

