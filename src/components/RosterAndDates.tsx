import React from 'react';
import { ROSTER, TOUR_DATES } from '../data/releases';

export const RosterAndDates: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FFFFFF] border-b border-[rgba(10,12,14,0.1)] py-24 px-6 sm:px-12 lg:px-20 space-y-24">
      
      {/* PART 1: JOBS & PRACTITIONERS ROSTER */}
      <div id="jobs" className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[rgba(10,12,14,0.1)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
              <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
                CORE ROSTER // RESIDENTS
              </p>
            </div>
            <h2 className="font-display font-bold text-[clamp(28px,3.8vw,48px)] text-[#0A0C0E] mt-1">
              Active Practitioners.
            </h2>
          </div>
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#78828A]">
            FOUR ARTISTS IN PERPETUAL ROTATION
          </p>
        </div>

        {/* Hairline-ruled rows carrying small uppercase accent label, display-face name, and right-aligned count */}
        <div className="divide-y divide-[rgba(10,12,14,0.1)] border-b border-[rgba(10,12,14,0.1)]">
          {ROSTER.map((artist) => (
            <div
              key={artist.code}
              className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group hover:bg-[#F5F6F8] transition-colors px-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#E8913C] font-medium">
                  {artist.code} · {artist.genre}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A0C0E] group-hover:text-[#0A0C0E] transition-colors">
                  {artist.name}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-right">
                <span className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A]">
                  {artist.origin}
                </span>
                <span className="font-mono text-[11px] text-[#0A0C0E] font-bold tabular-nums">
                  {artist.releasesCount} RELEASES
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* PART 2: DATES TABLE */}
      <div id="dates" className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[rgba(10,12,14,0.1)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
              <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
                ACOUSTIC SESSIONS & DISPATCH
              </p>
            </div>
            <h2 className="font-display font-bold text-[clamp(28px,3.8vw,48px)] text-[#0A0C0E] mt-1">
              Live Auditions & Concerts.
            </h2>
          </div>
          <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#78828A]">
            QUADRAPHONIC SOUND REINFORCEMENT ONLY
          </p>
        </div>

        {/* Table with uppercase headers over a hairline, display-face first column and neutral metadata columns, collapsing to a two-column grid on narrow screens */}
        <div className="w-full">
          
          {/* Desktop Table Headers */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-[rgba(10,12,14,0.1)] font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#78828A]">
            <div className="col-span-3">DATE</div>
            <div className="col-span-4">LOCATION / VENUE</div>
            <div className="col-span-3">PERFORMANCE</div>
            <div className="col-span-2 text-right">ACCESS</div>
          </div>

          {/* Table Rows (Desktop grid, Mobile 2-column card grid) */}
          <div className="divide-y divide-[rgba(10,12,14,0.1)] border-b border-[rgba(10,12,14,0.1)]">
            {TOUR_DATES.map((item, idx) => (
              <div 
                key={idx}
                className="py-4 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center hover:bg-[#F5F6F8] transition-colors px-2"
              >
                {/* Display face first column */}
                <div className="col-span-3 font-display font-bold text-base sm:text-lg text-[#0A0C0E]">
                  {item.date}
                </div>

                {/* Neutral metadata: Location / Venue */}
                <div className="col-span-4 font-sans text-xs text-[#4A525A]">
                  <span className="text-[#0A0C0E] font-semibold">{item.venue}</span>
                  <span className="block text-[10.5px] text-[#78828A] tracking-[0.12em] uppercase mt-0.5">{item.city}</span>
                </div>

                {/* Neutral metadata: Performance details */}
                <div className="col-span-3 font-sans text-[11px] text-[#4A525A] tracking-[0.08em] uppercase">
                  {item.performance}
                </div>

                {/* Access / Status */}
                <div className="col-span-2 md:text-right pt-2 md:pt-0">
                  <span className={`font-mono text-[10.5px] tracking-[0.14em] uppercase ${
                    item.status === 'LIMITED' ? 'text-[#E8913C] font-semibold' : item.status === 'SOLD OUT' ? 'text-[#78828A]' : 'text-[#2E6B72] font-semibold'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
