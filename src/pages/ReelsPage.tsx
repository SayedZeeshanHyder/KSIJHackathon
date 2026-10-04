import React, { useState, useRef } from 'react';
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
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  ChevronUp, 
  ChevronDown, 
  Grid, 
  Film,
  Compass,
  Check
} from 'lucide-react';

interface ReelsPageProps {
  onBackToHome: () => void;
  onOpenEducationPage: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

export const ReelsPage: React.FC<ReelsPageProps> = ({
  onBackToHome,
  onOpenEducationPage,
  user,
  onSignInClick,
  onSignOutClick
}) => {
  const [filterStream, setFilterStream] = useState<'all' | 'deeni' | 'duniyawi'>('all');
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [likedReelIds, setLikedReelIds] = useState<string[]>([]);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');

  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredReels = COMMUNITY_REELS.filter(reel => {
    if (filterStream === 'all') return true;
    return reel.stream === filterStream;
  });

  const currentReel = filteredReels[activeReelIndex] || filteredReels[0];

  const handleNextReel = () => {
    if (activeReelIndex < filteredReels.length - 1) {
      setActiveReelIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrevReel = () => {
    if (activeReelIndex > 0) {
      setActiveReelIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = (id: string) => {
    setLikedReelIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = (reel: EducationalReel) => {
    navigator.clipboard.writeText(`${window.location.origin}/#reels-${reel.id}`);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

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
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-white/10 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('feed')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  viewMode === 'feed' ? 'bg-[#E8913C] text-white font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Feed</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#E8913C] text-white font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Link to Full Education Modules */}
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
              onClick={() => { setFilterStream('all'); setActiveReelIndex(0); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterStream === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All 1-Minute Reels ({COMMUNITY_REELS.length})
            </button>
            <button
              onClick={() => { setFilterStream('deeni'); setActiveReelIndex(0); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filterStream === 'deeni'
                  ? 'bg-[#E8913C] text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span>☪ Islamic (Deeni)</span>
            </button>
            <button
              onClick={() => { setFilterStream('duniyawi'); setActiveReelIndex(0); }}
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
            60-SECOND BITE-SIZED KNOWLEDGE
          </div>
        </div>
      </div>

      {/* 3. Main Content: Feed View OR Grid View */}
      {viewMode === 'feed' ? (
        /* Vertical Short-form Reel Player Feed */
        <div className="py-6 sm:py-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)]">
          {currentReel && (
            <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[82vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/15 flex flex-col justify-between">
              
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
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Top Bar on Reel (Badge + Mute toggle) */}
              <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    currentReel.stream === 'deeni' ? 'bg-[#E8913C] text-white' : 'bg-[#2E6B72] text-white'
                  }`}>
                    {currentReel.stream === 'deeni' ? '☪ DEENI' : '📐 DUNIYAWI'}
                  </span>
                  <span className="font-mono text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                    {currentReel.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E8913C] transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#E8913C] transition-colors"
                    aria-label="Toggle play"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Right Side Social Floating Action Column */}
              <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(currentReel.id)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform group-hover:scale-110 ${
                    likedReelIds.includes(currentReel.id)
                      ? 'bg-rose-600 text-white'
                      : 'bg-black/60 text-white hover:bg-black/80'
                  }`}>
                    <Heart className={`w-5 h-5 ${likedReelIds.includes(currentReel.id) ? 'fill-current' : ''}`} />
                  </div>
                  <span className="text-[10px] font-mono text-white/90">
                    {currentReel.likes + (likedReelIds.includes(currentReel.id) ? 1 : 0)}
                  </span>
                </button>

                {/* Comment Counter */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-white/90">
                    {currentReel.commentsCount}
                  </span>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(currentReel)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#E8913C] transition-colors">
                    {copiedShare ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-mono text-white/90">
                    {copiedShare ? 'Copied' : currentReel.shares}
                  </span>
                </button>
              </div>

              {/* Bottom Caption, Creator & Tag Info */}
              <div className="relative z-20 p-5 pt-8 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src={currentReel.creatorAvatar}
                    alt={currentReel.creator}
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
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
                  {currentReel.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-[#E8913C]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Up / Down Navigation Floater Buttons (Desktop) */}
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
                onClick={() => {
                  setActiveReelIndex(idx);
                  setViewMode('feed');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative cursor-pointer bg-[#121519] rounded-xl overflow-hidden border border-white/10 hover:border-[#E8913C] transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  
                  {/* Top stream tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      reel.stream === 'deeni' ? 'bg-[#E8913C] text-white' : 'bg-[#2E6B72] text-white'
                    }`}>
                      {reel.category}
                    </span>
                  </div>

                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#E8913C] flex items-center justify-center text-white shadow-lg">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Duration */}
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
            <span className="font-display font-bold text-sm text-white">ONE COMMUNITY</span>
            <span className="text-xs text-white/50">© 2026 1-Minute Deeni & Academic Reels</span>
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
