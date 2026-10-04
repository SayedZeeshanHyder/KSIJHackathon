import React, { useState } from 'react';

export const CloseSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="relative w-full bg-[#FFFFFF] pt-24 pb-0 overflow-hidden border-t border-[rgba(10,12,14,0.1)]">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 space-y-16">
        
        {/* Upper zone: Short headline & fine-print line on one side; two buttons on the opposite edge */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-[rgba(10,12,14,0.1)]">
          
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
              <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
                DISPATCH & DISTRIBUTION
              </p>
            </div>
            
            <h2 className="font-display font-bold text-[clamp(28px,4vw,56px)] text-[#0A0C0E] leading-tight">
              Every frequency accounted for.
            </h2>
            
            <p className="font-sans text-xs sm:text-[13px] text-[#4A525A] leading-relaxed">
              Manufactured in Germany. Mastered at Sonorum Studio Berlin. All vinyl cut directly from 1/4 inch analog tape without digital intermediaries.
            </p>
          </div>

          {/* Opposite edge: Two buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const mail = prompt('Enter your email for the physical catalog newsletter dispatch:');
                if (mail) alert(`Subscribed ${mail} to quarterly print dispatches.`);
              }}
              className="rounded-full border border-[#0A0C0E] px-6 py-2.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-colors text-center"
            >
              Join Dispatch
            </button>
            <button
              onClick={() => {
                alert('Distribution inquiry: Contact distribution@onecommunity-records.de for wholesale vinyl orders.');
              }}
              className="rounded-full border border-[rgba(10,12,14,0.22)] px-6 py-2.5 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] hover:text-[#0A0C0E] hover:border-[rgba(10,12,14,0.4)] transition-colors text-center"
            >
              Distribution Inquiry
            </button>
          </div>

        </div>

        {/* Hairline footer strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#78828A]">
          <div className="flex items-center gap-6">
            <span>© 2026 ONE COMMUNITY EDITIONS</span>
            <span>CATALOGUE SNR-001 — SNR-014</span>
            <span>BERLIN / LONDON</span>
          </div>

          <div className="flex items-center gap-6 text-[#4A525A]">
            <span>180G VIRGIN VINYL</span>
            <span>NEUMANN VMS 80</span>
            <span>STUDER A80 MASTERING</span>
          </div>
        </div>

      </div>

      {/* Wordmark cleanly centered within viewport, translated down slightly for subtle bottom baseline crop */}
      <div className="w-full pt-16 overflow-hidden select-none pointer-events-none flex justify-center px-6 sm:px-12">
        <h1 
          className="font-display font-extrabold text-[clamp(18px,4.5vw,64px)] text-[#0A0C0E] leading-none tracking-tight text-center max-w-[88vw] mx-auto whitespace-nowrap will-change-transform opacity-95"
          style={{
            transform: 'translateY(22%)'
          }}
        >
          ONE COMMUNITY
        </h1>
      </div>

    </footer>
  );
};
