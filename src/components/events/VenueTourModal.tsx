import React, { useState } from 'react';
import { 
  X, 
  Rotate3d, 
  Images, 
  MapPin, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { ShiaVenue } from '../../data/shiaEventsData';
import { PhotosphereViewer } from './PhotosphereViewer';

interface VenueTourModalProps {
  venue: ShiaVenue | null;
  isOpen: boolean;
  onClose: () => void;
  onBookVenue?: (venue: ShiaVenue) => void;
  initialTab?: 'photosphere' | 'gallery';
}

export const VenueTourModal: React.FC<VenueTourModalProps> = ({
  venue,
  isOpen,
  onClose,
  onBookVenue,
  initialTab = 'photosphere'
}) => {
  if (!isOpen || !venue) return null;

  // Build full images list: venue.images or fallback to [venue.image]
  const allImages = venue.images && venue.images.length > 0 ? venue.images : [venue.image];
  const hasPhotosphere = Boolean(venue.photosphereUrl);

  const [activeTab, setActiveTab] = useState<'photosphere' | 'gallery'>(
    hasPhotosphere && initialTab === 'photosphere' ? 'photosphere' : 'gallery'
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const prevPhoto = () => {
    setSelectedPhotoIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#0A0C0E] text-white border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-[#E8913C] text-neutral-950">
                {venue.category}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {venue.city}, {venue.state}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
              {venue.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-neutral-900 border border-neutral-800">
              {hasPhotosphere && (
                <button
                  type="button"
                  onClick={() => setActiveTab('photosphere')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'photosphere'
                      ? 'bg-[#E8913C] text-neutral-950 shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>360° Photosphere</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#E8913C] text-neutral-950 shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Images className="w-3.5 h-3.5" />
                <span>Photos ({allImages.length})</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Media Viewport */}
        <div className="relative flex-1 bg-black overflow-hidden flex flex-col">
          {activeTab === 'photosphere' && hasPhotosphere ? (
            <div className="w-full h-full min-h-[420px] sm:min-h-[500px]">
              <PhotosphereViewer
                src={venue.photosphereUrl!}
                title={`${venue.name} 360° Virtual Tour`}
                venueName={venue.name}
                height="100%"
              />
            </div>
          ) : (
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] flex flex-col justify-between p-4 bg-neutral-950">
              {/* Main Photo Display */}
              <div className="relative flex-1 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                <img
                  src={allImages[selectedPhotoIndex]}
                  alt={`${venue.name} photo ${selectedPhotoIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Left/Right Carousel Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Photo Counter */}
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-mono text-neutral-300 border border-white/10">
                  {selectedPhotoIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Thumbnails Strip */}
              {allImages.length > 1 && (
                <div className="pt-3 flex items-center gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedPhotoIndex === idx
                          ? 'border-[#E8913C] scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar: Details & Direct Book CTA */}
        <div className="px-6 py-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="space-y-1 max-w-xl">
            <p className="font-sans text-xs text-neutral-300 line-clamp-2">
              {venue.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#E8913C]" />
                Capacity: {venue.capacity} guests
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E8913C]" />
                {venue.address}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onBookVenue && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookVenue(venue);
                }}
                className="px-5 py-2.5 bg-[#E8913C] hover:bg-[#d67e2a] text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Venue</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-mono transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
