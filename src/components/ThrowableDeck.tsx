import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VinylRelease } from '../data/releases';

interface ThrowableDeckProps {
  releases: VinylRelease[];
  onOrderRelease: (release: VinylRelease) => void;
}

export const ThrowableDeck: React.FC<ThrowableDeckProps> = ({ releases, onOrderRelease }) => {
  // Active top card index in rotation
  const [deckOrder, setDeckOrder] = useState<number[]>(releases.map((_, i) => i));
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  });

  const [throwingCard, setThrowingCard] = useState<{
    index: number;
    direction: number; // -1 for left, 1 for right
  } | null>(null);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const deckRef = useRef<HTMLDivElement>(null);
  const activeIndex = deckOrder[0];
  const activeRelease = releases[activeIndex];

  // Audio simulator timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  // Throw out top card and cycle stack
  const cycleCard = useCallback((direction: number) => {
    if (throwingCard) return;

    setThrowingCard({
      index: deckOrder[0],
      direction
    });

    // Wait for the throw-out animation, then shift deck array
    setTimeout(() => {
      setDeckOrder((prev) => {
        const next = [...prev];
        const top = next.shift()!;
        next.push(top);
        return next;
      });
      setThrowingCard(null);
      setIsPlayingAudio(false);
      setAudioProgress(0);
    }, 320);
  }, [deckOrder, throwingCard]);

  // Keyboard navigation: ArrowLeft and ArrowRight
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      cycleCard(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      cycleCard(-1);
    }
  };

  // Pointer event handlers for drag tracking & throw
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only capture on top card
    if (throwingCard) return;
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    setDragState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.isDragging) return;
    setDragState((prev) => ({
      ...prev,
      currentX: e.clientX,
      currentY: e.clientY
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragState.isDragging) return;
    const deltaX = dragState.currentX - dragState.startX;
    const threshold = 36; // roughly 1/10th deck width

    if (Math.abs(deltaX) > threshold) {
      cycleCard(deltaX > 0 ? 1 : -1);
    }

    setDragState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    });
  };

  const handlePointerCancel = () => {
    setDragState({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    });
  };

  const deltaX = dragState.isDragging ? dragState.currentX - dragState.startX : 0;
  const deltaY = dragState.isDragging ? dragState.currentY - dragState.startY : 0;

  return (
    <section 
      id="releases"
      className="relative w-full min-h-screen bg-[#FFFFFF] border-b border-[rgba(10,12,14,0.1)] py-24 px-6 sm:px-12 lg:px-20 flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Headline, Lede, Buttons & Inspected Release Data */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
            <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium">
              PHYSICAL EDITIONS // CATALOGUE
            </p>
          </div>

          <h2 className="font-display font-bold text-[clamp(28px,4vw,56px)] text-[#0A0C0E] leading-[1.08]">
            Physical Catalogue in Rotation.
          </h2>

          <p className="font-sans text-[13px] text-[#4A525A] leading-relaxed max-w-lg">
            Limited lathe-cut vinyl and discrete analog masters. Every sleeve is pressed on heavyweight 350gsm unbleached board with debossed run-out matrices and custom archival antistatic inners.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOrderRelease(activeRelease)}
              className="rounded-full border border-[#0A0C0E] px-5 py-2 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-colors"
            >
              Order {activeRelease.code}
            </button>
            <button
              onClick={() => {
                alert(`Viewing archive index of all 14 catalogue pressings (SNR-001 through SNR-014).`);
              }}
              className="rounded-full border border-[rgba(10,12,14,0.22)] px-5 py-2 font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] hover:text-[#0A0C0E] hover:border-[rgba(10,12,14,0.4)] transition-colors"
            >
              Archive Index
            </button>
          </div>

          {/* Detailed Metadata of the Active Release Card */}
          <div className="pt-6 border-t border-[rgba(10,12,14,0.1)] space-y-4">
            <div className="flex items-center justify-between text-[11px] font-sans text-[#4A525A]">
              <span>
                CODE: <strong className="text-[#0A0C0E] font-display text-xs">{activeRelease.code}</strong>
              </span>
              <span>{activeRelease.format}</span>
              <span>{activeRelease.speed}</span>
            </div>

            <div>
              <p className="font-display text-lg font-bold text-[#0A0C0E]">
                {activeRelease.artist} — {activeRelease.title}
              </p>
              <p className="font-sans text-xs text-[#4A525A] mt-1 leading-relaxed">
                {activeRelease.description}
              </p>
            </div>

            {/* Audio Preview Bar */}
            <div className="p-3 bg-[#F5F6F8] border border-[rgba(10,12,14,0.1)] flex items-center justify-between gap-3 text-xs">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#E8913C] hover:text-[#0A0C0E] flex items-center gap-1.5 transition-colors focus:outline-none"
              >
                <span>{isPlayingAudio ? '■ PAUSE' : '▶ PREVIEW CUT'}</span>
              </button>

              {/* Waveform representation */}
              <div className="flex-1 flex items-center gap-0.5 h-4 overflow-hidden px-2">
                {[12, 24, 18, 30, 16, 28, 20, 36, 22, 14, 28, 34, 18, 24, 32, 16, 22, 28, 36, 20, 14, 30, 24, 18].map((h, idx) => (
                  <span
                    key={idx}
                    className="w-[2px] bg-[rgba(10,12,14,0.2)] transition-all"
                    style={{
                      height: `${h}px`,
                      backgroundColor: idx < (audioProgress / 100) * 24 ? '#E8913C' : 'rgba(10,12,14,0.18)'
                    }}
                  />
                ))}
              </div>

              <span className="font-mono text-[10.5px] text-[#4A525A]">
                {activeRelease.duration}
              </span>
            </div>

            {/* Tracklist table */}
            <div className="space-y-1 pt-1 text-[11px] font-sans">
              {activeRelease.tracklist.map((trk) => (
                <div key={trk.position} className="flex items-center justify-between text-[#4A525A] py-0.5">
                  <span className="text-[#78828A] font-mono">{trk.side}{trk.position}</span>
                  <span className="text-[#0A0C0E] font-medium">{trk.title}</span>
                  <span className="font-mono text-[#78828A]">{trk.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Throwable Physical Card Deck */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          
          <div 
            ref={deckRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="relative w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] focus:outline-none cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'pan-y' }}
            aria-label="Vinyl sleeve card deck. Drag or press left/right arrows to flip."
          >
            {/* Render cards from back to front */}
            {deckOrder.slice(0, 4).reverse().map((relIndex, stackPositionFromBack) => {
              const depth = 3 - stackPositionFromBack; // 0 = top card, 1 = 2nd, 2 = 3rd, 3 = 4th
              const rel = releases[relIndex];
              const isTop = depth === 0;

              // Physical offsets for stacked cards
              const offsetTranslateX = depth === 0 ? 0 : depth === 1 ? 8 : depth === 2 ? -8 : 12;
              const offsetTranslateY = depth === 0 ? 0 : depth * 10;
              const offsetRotate = depth === 0 ? 0 : depth === 1 ? 2.2 : depth === 2 ? -2.0 : 3.5;
              const offsetScale = 1 - depth * 0.045;

              // Top card dynamic drag transform
              let transformStyle = '';
              let transitionStyle = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

              if (isTop) {
                if (throwingCard) {
                  // Throwing out off the screen
                  const throwX = throwingCard.direction * 460;
                  transformStyle = `translate(${throwX}px, -40px) rotate(${throwingCard.direction * 22}deg) scale(0.95)`;
                  transitionStyle = 'transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.32s ease';
                } else if (dragState.isDragging) {
                  // Currently tracking pointer drag
                  const dragRot = (deltaX / 380) * 16;
                  transformStyle = `translate(${deltaX}px, ${deltaY * 0.4}px) rotate(${dragRot}deg) scale(1.03)`;
                  transitionStyle = 'none'; // instant drag response
                } else {
                  // Resting top card
                  transformStyle = `translate(0px, 0px) rotate(0deg) scale(1)`;
                }
              } else {
                // Secondary cards in stack
                transformStyle = `translate(${offsetTranslateX}px, ${offsetTranslateY}px) rotate(${offsetRotate}deg) scale(${offsetScale})`;
              }

              return (
                <div
                  key={rel.code}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerCancel : undefined}
                  className="absolute inset-0 w-full h-full rounded-none overflow-hidden bg-[#101317] border border-[rgba(237,231,220,0.18)] will-change-transform"
                  style={{
                    zIndex: 10 - depth,
                    transform: transformStyle,
                    transition: transitionStyle,
                    // Drop shadow only permitted on deck cards by design spec
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(237, 231, 220, 0.08)'
                  }}
                >
                  {/* Card Vinyl Sleeve Artwork */}
                  <img
                    src={rel.image}
                    alt={`${rel.artist} - ${rel.title}`}
                    className="w-full h-full object-cover grayscale contrast-115 pointer-events-none"
                    draggable={false}
                    referrerPolicy="no-referrer"
                  />

                  {/* Sleeve print overlay & spine typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E]/90 via-transparent to-[#0A0C0E]/60 pointer-events-none p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#EDE7DC]">
                        {rel.code}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#9EA5A8]">
                        {rel.artist}
                      </p>
                      <h3 className="font-display font-bold text-lg text-[#EDE7DC] tracking-tight">
                        {rel.title}
                      </h3>
                      <p className="font-mono text-[9.5px] text-[#6C7378] pt-1">
                        {rel.edition}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint line and progress dots beneath deck */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <p className="font-sans text-[10.5px] uppercase tracking-[0.14em] text-[#4A525A] font-medium select-none">
              DRAG SLEEVE OR PRESS ← → TO FLIP
            </p>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {releases.map((rel, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={rel.code}
                    onClick={() => {
                      // Cycle to this release
                      const currentOrder = [...deckOrder];
                      while (currentOrder[0] !== idx) {
                        currentOrder.push(currentOrder.shift()!);
                      }
                      setDeckOrder(currentOrder);
                    }}
                    className={`transition-all rounded-full ${
                      isActive
                        ? 'w-2 h-2 bg-[#E8913C]'
                        : 'w-1.5 h-1.5 bg-[rgba(10,12,14,0.2)] hover:bg-[#4A525A]'
                    }`}
                    aria-label={`Show release ${rel.code}`}
                  />
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
