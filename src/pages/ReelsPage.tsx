// src/components/ReelsPage.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COMMUNITY_REELS, EducationalReel } from '../data/reelsData';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  GraduationCap,
  ChevronUp,
  ChevronDown,
  Grid,
  Film,
  Check,
  AlertCircle,
} from 'lucide-react';

interface ReelsPageProps {
  onBackToHome: () => void;
  onOpenEducationPage: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

const DRAG_THRESHOLD = 90; // px needed to trigger next/prev
const WHEEL_COOLDOWN = 650; // ms between wheel-triggered switches
const CLICK_DRAG_TOLERANCE = 6; // px below which a drag counts as a click

export const ReelsPage: React.FC<ReelsPageProps> = ({
  onBackToHome,
  onOpenEducationPage,
  user,
  onSignInClick,
}) => {
  const [filterStream, setFilterStream] = useState<'all' | 'deeni' | 'duniyawi'>('all');
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [likedReelIds, setLikedReelIds] = useState<string[]>([]);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');
  const [videoError, setVideoError] = useState<boolean>(false);

  // ---- Drag / swipe state ---------------------------------------------
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartYRef = useRef<number | null>(null);
  const didDragRef = useRef<boolean>(false);
  const wheelLockRef = useRef<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredReels = COMMUNITY_REELS.filter((reel) => {
    if (filterStream === 'all') return true;
    return reel.stream === filterStream;
  });

  const currentReel: EducationalReel | undefined =
    filteredReels[activeReelIndex] ?? filteredReels[0];

  // ---- Navigation ------------------------------------------------------
  const handleNextReel = useCallback(() => {
    setActiveReelIndex((prev) => {
      if (prev >= filteredReels.length - 1) return prev;
      return prev + 1;
    });
  }, [filteredReels.length]);

  const handlePrevReel = useCallback(() => {
    setActiveReelIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  }, []);

  // ---- Core playback sync ---------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
    }
  }, [activeReelIndex, currentReel?.id, isPlaying, isMuted, viewMode]);

  useEffect(() => {
    setVideoError(false);
    setIsPlaying(true);
  }, [currentReel?.id]);

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  // ---- Controls --------------------------------------------------------
  const togglePlay = () => {
    // Suppress the click that follows a drag gesture.
    if (didDragRef.current) return;
    setIsPlaying((p) => !p);
  };
  const toggleMute = () => setIsMuted((m) => !m);

  const handleLike = (id: string) => {
    setLikedReelIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleShare = (reel: EducationalReel) => {
    const url = `${window.location.origin}/#reels-${reel.id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const goToReel = (index: number) => {
    setActiveReelIndex(index);
    setViewMode('feed');
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---- Mouse-wheel navigation (desktop scroll-to-swipe) ---------------
  useEffect(() => {
    if (viewMode !== 'feed') return;
    const onWheel = (e: WheelEvent) => {
      // Prevent page scroll while in feed mode.
      e.preventDefault();
      if (wheelLockRef.current) return;
      if (Math.abs(e.deltaY) < 8) return;

      wheelLockRef.current = true;
      setTimeout(() => {
        wheelLockRef.current = false;
      }, WHEEL_COOLDOWN);

      if (e.deltaY > 0) handleNextReel();
      else handlePrevReel();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [viewMode, handleNextReel, handlePrevReel]);

  // ---- Keyboard navigation (desktop) -----------------------------------
  useEffect(() => {
    if (viewMode !== 'feed') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewMode, handleNextReel, handlePrevReel]);

  // ---- Drag / swipe gesture handlers ----------------------------------
  const getClientY = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent,
  ): number => {
    if ('touches' in e && e.touches.length > 0) return e.touches[0].clientY;
    if ('changedTouches' in e && e.changedTouches.length > 0)
      return e.changedTouches[0].clientY;
    return (e as MouseEvent).clientY;
  };

  const beginDrag = (
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    // Do not start a drag from a button / link.
    if ((e.target as HTMLElement).closest('button, a')) return;
    dragStartYRef.current = getClientY(e);
    didDragRef.current = false;
    setIsDragging(true);
  };

  const moveDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartYRef.current === null) return;
    const currentY = getClientY(e);
    const offset = currentY - dragStartYRef.current;
    if (Math.abs(offset) > CLICK_DRAG_TOLERANCE) {
      didDragRef.current = true;
    }
    setDragOffset(offset);
  };

  const endDrag = () => {
    if (dragStartYRef.current === null) return;
    const offset = dragOffset;
    dragStartYRef.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (offset < -DRAG_THRESHOLD) {
      handleNextReel();
    } else if (offset > DRAG_THRESHOLD) {
      handlePrevReel();
    }

    // Clear the click-suppression flag after the browser's click event fires.
    setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  // Attach global mouse/touch listeners so drags continue even if the cursor
  // leaves the reel container mid-gesture.
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => moveDrag(e as unknown as React.MouseEvent);
    const onMouseUp = () => endDrag();
    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      moveDrag(e as unknown as React.TouchEvent);
    };
    const onTouchEnd = () => endDrag();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragOffset]);

  // Visual transform applied to the reel card while dragging.
  const dragTransform = isDragging
    ? `translateY(${dragOffset}px)`
    : 'translateY(0px)';
  const dragTransition = isDragging
    ? 'none'
    : 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div className="min-h-screen bg-[#0A0C0E] text-white font-sans antialiased overflow-x-hidden">
      {/* 1. Reels Header */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#0A0C0E]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-14 lg:px-20 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-[17px] sm:text-[19px] tracking-[-0.025em] text-white flex items-center group cursor-pointer focus:outline-none"
            >
              <span>ONE COMMUNITY</span>
              <span className="text-[#E8913C] ml-1">.</span>
            </button>

            <span className="hidden sm:inline-block text-white/20">/</span>

            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-[#E8913C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-white/10 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('feed')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  viewMode === 'feed'
                    ? 'bg-[#E8913C] text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Feed</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#E8913C] text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            <button
              onClick={onOpenEducationPage}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-mono text-white transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#E8913C]" />
              <span>Full Modules & Exams →</span>
            </button>

            {user ? (
              <span className="text-xs font-medium text-white/80 hidden sm:inline">
                {user.name}
              </span>
            ) : (
              <button
                onClick={onSignInClick}
                className="px-4 py-1.5 rounded-full text-xs font-sans font-medium text-black bg-white hover:bg-[#E8913C] hover:text-white transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Stream Filter Bar */}
      <div className="w-full bg-[#121519] border-b border-white/10 py-3 px-4 sm:px-14 lg:px-20">
        <div className="max-w-[1680px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider mr-2">
              Filter:
            </span>
            <button
              onClick={() => {
                setFilterStream('all');
                setActiveReelIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterStream === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All 1-Minute Reels ({COMMUNITY_REELS.length})
            </button>
            <button
              onClick={() => {
                setFilterStream('deeni');
                setActiveReelIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterStream === 'deeni'
                  ? 'bg-[#E8913C] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span>☪ Islamic (Deeni)</span>
            </button>
            <button
              onClick={() => {
                setFilterStream('duniyawi');
                setActiveReelIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterStream === 'duniyawi'
                  ? 'bg-[#2E6B72] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span>📐 Duniyawi (10th Math & Science)</span>
            </button>
          </div>

          <div className="font-mono text-[11px] text-white/50">
            SCROLL / DRAG TO SWIPE · 60-SECOND BITE-SIZED KNOWLEDGE
          </div>
        </div>
      </div>

      {/* 3. Main Content */}
      {viewMode === 'feed' ? (
        <div className="py-6 sm:py-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] select-none">
          {currentReel && (
            <div
              className="relative w-full max-w-[420px] aspect-[9/16] max-h-[82vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col justify-between"
              style={{
                transform: dragTransform,
                transition: dragTransition,
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none',
              }}
              onMouseDown={beginDrag}
              onTouchStart={beginDrag}
            >
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                key={currentReel.id}
                src={currentReel.videoUrl}
                poster={currentReel.thumbnail}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onError={() => setVideoError(true)}
                onClick={togglePlay}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              />

              {/* Fallback overlay if the source fails */}
              {videoError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/80 text-center px-6">
                  <img
                    src={currentReel.thumbnail}
                    alt={currentReel.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    draggable={false}
                  />
                  <AlertCircle className="relative w-8 h-8 text-[#E8913C]" />
                  <p className="relative text-xs font-mono text-white/80">
                    Video could not be loaded.
                  </p>
                  <button
                    onClick={handleNextReel}
                    className="relative px-4 py-1.5 rounded-full bg-[#E8913C] text-white text-xs font-semibold"
                  >
                    Next Reel →
                  </button>
                </div>
              )}

              {/* Top Bar */}
              <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      currentReel.stream === 'deeni'
                        ? 'bg-[#E8913C] text-white'
                        : 'bg-[#2E6B72] text-white'
                    }`}
                  >
                    {currentReel.stream === 'deeni' ? '☪ DEENI' : '📐 DUNIYAWI'}
                  </span>
                  <span className="font-mono text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                    {currentReel.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E8913C] transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E8913C] transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Big center play button when paused */}
              {!isPlaying && !videoError && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  aria-label="Play video"
                >
                  <span className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play className="w-7 h-7 ml-1 fill-current" />
                  </span>
                </button>
              )}

              {/* Right Side Actions */}
              <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4">
                <button
                  onClick={() => handleLike(currentReel.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110 ${
                      likedReelIds.includes(currentReel.id)
                        ? 'bg-rose-600 text-white'
                        : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedReelIds.includes(currentReel.id) ? 'fill-current' : ''
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/90">
                    {currentReel.likes +
                      (likedReelIds.includes(currentReel.id) ? 1 : 0)}
                  </span>
                </button>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-white/90">
                    {currentReel.commentsCount}
                  </span>
                </div>

                <button
                  onClick={() => handleShare(currentReel)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#E8913C] transition-colors">
                    {copiedShare ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-white/90">
                    {copiedShare ? 'Copied' : currentReel.shares}
                  </span>
                </button>
              </div>

              {/* Bottom Info */}
              <div className="relative z-20 p-5 pt-8 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2 pointer-events-none">
                <div className="flex items-center gap-2">
                  <img
                    src={currentReel.creatorAvatar}
                    alt={currentReel.creator}
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                    draggable={false}
                  />
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white">
                      {currentReel.creator}
                    </h4>
                    <p className="text-[10px] text-white/60">
                      {currentReel.creatorRole}
                    </p>
                  </div>
                </div>

                <h3 className="font-display font-bold text-sm text-white leading-snug">
                  {currentReel.title}
                </h3>

                <p className="font-sans text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {currentReel.caption}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {currentReel.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-[#E8913C]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop Up/Down Navigation */}
              <div className="hidden sm:flex absolute -right-16 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
                <button
                  disabled={activeReelIndex === 0}
                  onClick={handlePrevReel}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#E8913C] disabled:opacity-20 flex items-center justify-center text-white transition-colors"
                  title="Previous Reel"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
                <span className="text-center font-mono text-xs text-white/50">
                  {activeReelIndex + 1}/{filteredReels.length}
                </span>
                <button
                  disabled={activeReelIndex === filteredReels.length - 1}
                  onClick={handleNextReel}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#E8913C] disabled:opacity-20 flex items-center justify-center text-white transition-colors"
                  title="Next Reel"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>

              {/* Drag hint overlay (fades out) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center opacity-70">
                <span className="font-mono text-[10px] text-white/60 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  Drag or scroll ↑↓ to switch reels
                </span>
              </div>
            </div>
          )}

          {/* Mobile Next / Prev buttons */}
          <div className="flex sm:hidden items-center justify-center gap-4 pt-4">
            <button
              disabled={activeReelIndex === 0}
              onClick={handlePrevReel}
              className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-mono text-white disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="font-mono text-xs text-white/50">
              {activeReelIndex + 1} of {filteredReels.length}
            </span>
            <button
              disabled={activeReelIndex === filteredReels.length - 1}
              onClick={handleNextReel}
              className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-mono text-white disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        /* Grid Gallery View */
        <div className="max-w-[1680px] mx-auto px-4 sm:px-14 lg:px-20 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredReels.map((reel, idx) => (
              <div
                key={reel.id}
                onClick={() => goToReel(idx)}
                className="group relative cursor-pointer bg-[#121519] rounded-xl overflow-hidden border border-white/10 hover:border-[#E8913C] transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        reel.stream === 'deeni'
                          ? 'bg-[#E8913C] text-white'
                          : 'bg-[#2E6B72] text-white'
                      }`}
                    >
                      {reel.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#E8913C] flex items-center justify-center text-white shadow-lg">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 font-mono text-[10.5px] bg-black/70 px-2 py-0.5 rounded text-white">
                    {reel.duration}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="font-display font-bold text-sm text-white line-clamp-1 group-hover:text-[#E8913C] transition-colors">
                    {reel.title}
                  </h4>
                  <p className="font-sans text-xs text-white/60 line-clamp-2">
                    {reel.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Footer */}
      <footer className="bg-black border-t border-white/10 py-10">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm text-white">
              ONE COMMUNITY
            </span>
            <span className="text-xs text-white/50">
              © 2026 1-Minute Deeni & Academic Reels
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEducationPage}
              className="text-xs font-mono text-[#E8913C] hover:underline"
            >
              Academic Modules & Exams →
            </button>
            <span className="text-white/20">·</span>
            <button
              onClick={onBackToHome}
              className="text-xs font-mono text-white/70 hover:text-white"
            >
              Return Home
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};