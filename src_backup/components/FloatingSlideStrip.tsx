import React from 'react';

export interface SlideItem {
  id: string;
  category: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  targetId: string;
}

export const COMMUNITY_SLIDES: SlideItem[] = [
  {
    id: 'slide-jobs',
    category: 'JOBS',
    tag: 'CAREER // 01',
    title: 'Career & Apprenticeship Mentorship',
    description: 'Direct interviews, vocational skill placements, and professional advancement.',
    image: '/src/assets/images/jobs_interview_1791103058589.jpg',
    targetId: 'jobs'
  },
  {
    id: 'slide-education',
    category: 'EDUCATION',
    tag: 'ACADEMIC // 02',
    title: 'Youth Learning & Digital Literacy',
    description: 'After-school study cohorts, digital tools, and collective knowledge sharing.',
    image: '/src/assets/images/education_session_1791103042527.jpg',
    targetId: 'education'
  },
  {
    id: 'slide-reels',
    category: 'REELS',
    tag: 'ARCHIVE // 03',
    title: 'Heritage Assemblies & Recitations',
    description: 'Documentary audio reels, cultural lectures, and preserved oral history.',
    image: '/src/assets/images/community_hall_1791103097676.jpg',
    targetId: 'reels'
  },
  {
    id: 'slide-events',
    category: 'EVENTS',
    tag: 'SOLIDARITY // 04',
    title: 'Congregational Commemorations',
    description: 'Auditorium gatherings bringing hundreds together in solemn unity.',
    image: '/src/assets/images/community_event_1791103076936.jpg',
    targetId: 'events'
  },
  {
    id: 'slide-majlis',
    category: 'REELS',
    tag: 'MAJLIS // 05',
    title: 'Scholarly Majlis & Keynote Assembly',
    description: 'Spiritual discourses, ethical guidance, and community congregation around traditional scholarship.',
    image: '/src/assets/images/majlis_assembly_1791103671432.jpg',
    targetId: 'reels'
  },
  {
    id: 'slide-canopy',
    category: 'EVENTS',
    tag: 'CELEBRATION // 06',
    title: 'Grand Pavilion & Ceremonial Reception',
    description: 'Annual festive banquet, communal milestones, and celebratory gatherings under crimson canopies.',
    image: '/src/assets/images/heritage_canopy_1791103694047.jpg',
    targetId: 'events'
  }
];

interface FloatingSlideStripProps {
  onSlideClick?: (targetId: string) => void;
  className?: string;
}

export const FloatingSlideStrip: React.FC<FloatingSlideStripProps> = ({ 
  onSlideClick, 
  className = ''
}) => {
  // Duplicate array 3 times for a seamless infinite continuous marquee loop
  const repeatedSlides = [...COMMUNITY_SLIDES, ...COMMUNITY_SLIDES, ...COMMUNITY_SLIDES];

  const handleClick = (targetId: string) => {
    if (onSlideClick) {
      onSlideClick(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full overflow-hidden select-none bg-[#0A0C0E] ${className}`}>
      
      {/* Top and Bottom hairline dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 z-20" />

      {/* Edge gradient fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0A0C0E] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0A0C0E] to-transparent z-20 pointer-events-none" />

      {/* Marquee Track sliding continuously from right to left */}
      <div className="animate-slide-left py-0 flex items-stretch gap-3 sm:gap-4">
        {repeatedSlides.map((slide, idx) => (
          <div
            key={`${slide.id}-${idx}`}
            onClick={() => handleClick(slide.targetId)}
            className="group relative shrink-0 cursor-pointer overflow-hidden w-[280px] sm:w-[420px] md:w-[480px] h-[260px] sm:h-[340px] md:h-[390px] border-r border-white/10 transition-all duration-300"
          >
            {/* Full-bleed background image with zero white space */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />

            {/* Dark gradient overlay for typography readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E] via-[#0A0C0E]/40 to-black/20 pointer-events-none transition-opacity duration-300 group-hover:via-[#0A0C0E]/30" />

            {/* Top Badge: Category */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                <span>{slide.category}</span>
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/70">
                {slide.tag}
              </span>
            </div>

            {/* Bottom Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 space-y-1.5 text-white">
              <h3 className="font-display font-extrabold text-base sm:text-xl text-white group-hover:text-[#E8913C] transition-colors leading-snug">
                {slide.title}
              </h3>
              <p className="font-sans text-xs text-white/80 line-clamp-2 leading-relaxed">
                {slide.description}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[#E8913C] font-mono text-[10px] uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Section</span>
                <span>→</span>
              </div>
            </div>

            {/* Hover border glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#E8913C] pointer-events-none transition-colors duration-300" />
          </div>
        ))}
      </div>

    </div>
  );
};
