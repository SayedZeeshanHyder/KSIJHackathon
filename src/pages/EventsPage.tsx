import React, { useState } from 'react';
import { 
  SHIA_VENUES, 
  ShiaVenue, 
  SHIA_EVENT_TYPES, 
  ShiaEventType 
} from '../data/shiaEventsData';
import { ShiaEventBookingModal } from '../components/ShiaEventBookingModal';
import { VenueTourModal } from '../components/events/VenueTourModal';
import { PhotosphereViewer } from '../components/events/PhotosphereViewer';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  HeartHandshake, 
  Flame, 
  BookOpen, 
  Utensils, 
  Search, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Phone,
  Bell,
  Map as MapIcon,
  Layers,
  PlusCircle,
  X,
  Send,
  Navigation,
  Rotate3d,
  Images,
  Upload,
  Trash2,
  Eye,
  Star,
  Camera,
  AlertCircle
} from 'lucide-react';

interface EventsPageProps {
  onBackToHome: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onBackToHome,
  user,
  onSignInClick,
  onSignOutClick
}) => {
  const [venuesList, setVenuesList] = useState<ShiaVenue[]>(SHIA_VENUES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [radiusFilter, setRadiusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'map'>('cards');
  
  // Booking Modal
  const [activeBookingVenue, setActiveBookingVenue] = useState<ShiaVenue | null>(null);
  const [activeBookingEventTypeId, setActiveBookingEventTypeId] = useState<string>('marriage');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Subscriptions & Toast
  const [subscribedVenueIds, setSubscribedVenueIds] = useState<string[]>(['venue-chhota-imambara-lucknow', 'venue-noor-baug-mumbai', 'venue-ashurkhana-hyderabad']);
  const [subscriptionToast, setSubscriptionToast] = useState<string | null>(null);

  // Venue Registration Modal
  const [isRegisterVenueModalOpen, setIsRegisterVenueModalOpen] = useState<boolean>(false);
  const [newVenueName, setNewVenueName] = useState<string>('');
  const [newVenueCategory, setNewVenueCategory] = useState<'Mosque & Centre' | 'Imambargah & Azakhana' | 'Banquet & Community Hall'>('Imambargah & Azakhana');
  const [newVenueCity, setNewVenueCity] = useState<string>('Mumbai');
  const [newVenueAddress, setNewVenueAddress] = useState<string>('');
  const [newVenueCapacity, setNewVenueCapacity] = useState<number>(500);
  const [newVenuePhone, setNewVenuePhone] = useState<string>('');
  const [newVenueDonation, setNewVenueDonation] = useState<string>('₹10,000 — ₹25,000');
  const [newVenueDesc, setNewVenueDesc] = useState<string>('');

  // Media upload state: Multiple images and 360 Photosphere JPG
  const [newVenueImages, setNewVenueImages] = useState<string[]>([
    '/assets/images/community_hall_1791103097676.jpg'
  ]);
  const [newVenuePhotosphere, setNewVenuePhotosphere] = useState<string>('');
  const [photosphereError, setPhotosphereError] = useState<string | null>(null);
  const [newImageInputUrl, setNewImageInputUrl] = useState<string>('');
  const [isPreviewingPhotosphereInModal, setIsPreviewingPhotosphereInModal] = useState<boolean>(false);

  // Virtual Tour & Gallery Modal
  const [tourModalVenue, setTourModalVenue] = useState<ShiaVenue | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [tourModalInitialTab, setTourModalInitialTab] = useState<'photosphere' | 'gallery'>('photosphere');

  // User reference coordinate (defaulting to Mumbai center 18.96, 72.83 for distance calculations)
  const userCoords = { lat: 18.96, lng: 72.83 };

  // Calculate distance in kilometers using Haversine formula
  const calculateDistanceKm = (targetLat: number, targetLng: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (targetLat - userCoords.lat) * (Math.PI / 180);
    const dLng = (targetLng - userCoords.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userCoords.lat * (Math.PI / 180)) *
        Math.cos(targetLat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const categories = ['All', 'Mosque & Centre', 'Imambargah & Azakhana', 'Banquet & Community Hall'];
  const cities = ['All Cities', 'Lucknow', 'Mumbai', 'Bangalore', 'Hyderabad'];
  const radiusOptions = ['All', '1 km', '2 km', '5 km', '10 km', '25 km', '50 km'];

  const filteredVenues = venuesList.filter(venue => {
    const matchesCategory = selectedCategory === 'All' || venue.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || venue.city === selectedCity;
    const matchesSearch = 
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.recommendedFor.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

    // Radius filter check
    let matchesRadius = true;
    if (radiusFilter !== 'All') {
      const maxKm = parseInt(radiusFilter);
      const dist = calculateDistanceKm(venue.coordinates?.lat || 18.96, venue.coordinates?.lng || 72.83);
      matchesRadius = dist <= maxKm;
    }

    return matchesCategory && matchesCity && matchesSearch && matchesRadius;
  });

  const handleOpenBooking = (venue?: ShiaVenue, eventTypeId?: string) => {
    setActiveBookingVenue(venue || venuesList[0]);
    if (eventTypeId) setActiveBookingEventTypeId(eventTypeId);
    setIsBookingModalOpen(true);
  };

  const handleToggleSubscribe = (venueId: string, venueName: string) => {
    const isCurrentlySubscribed = subscribedVenueIds.includes(venueId);
    if (isCurrentlySubscribed) {
      setSubscribedVenueIds(prev => prev.filter(id => id !== venueId));
      setSubscriptionToast(`Unsubscribed from notifications for ${venueName}`);
    } else {
      setSubscribedVenueIds(prev => [...prev, venueId]);
      setSubscriptionToast(`Subscribed! You will receive notifications when new events or majalis are scheduled at ${venueName}.`);
      // Update subscriber count in backend
      fetch(`/api/venues/${venueId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email || 'member@onecommunity.org' })
      }).catch(() => {});
    }
    setTimeout(() => setSubscriptionToast(null), 3500);
  };

  const handleUploadMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewVenueImages(prev => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (!newImageInputUrl.trim()) return;
    setNewVenueImages(prev => [...prev, newImageInputUrl.trim()]);
    setNewImageInputUrl('');
  };

  const handleRemoveImage = (index: number) => {
    setNewVenueImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetCoverImage = (index: number) => {
    setNewVenueImages(prev => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      return [selected, ...copy];
    });
  };

  const handleUploadPhotosphere = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it is JPG / JPEG format
    const isJpg = file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg');
    if (!isJpg) {
      setPhotosphereError('Invalid format: The 360° photosphere must be in JPG format (.jpg or .jpeg). Please upload an equirectangular JPG panorama.');
      return;
    }
    setPhotosphereError(null);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setNewVenuePhotosphere(uploadEvent.target.result as string);
        setIsPreviewingPhotosphereInModal(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRegisterVenueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenueName || !newVenueAddress) return;

    const primaryImage = newVenueImages[0] || '/assets/images/community_hall_1791103097676.jpg';

    const createdVenue: ShiaVenue = {
      id: `venue_reg_${Date.now()}`,
      name: newVenueName,
      arabicName: 'مرکز و حسینیہ جدید',
      category: newVenueCategory,
      city: newVenueCity,
      state: newVenueCity === 'Mumbai' ? 'Maharashtra' : newVenueCity === 'Lucknow' ? 'Uttar Pradesh' : 'State',
      address: newVenueAddress,
      capacity: Number(newVenueCapacity) || 400,
      image: primaryImage,
      images: newVenueImages.length > 0 ? newVenueImages : [primaryImage],
      photosphereUrl: newVenuePhotosphere.trim() || undefined,
      photosphereTitle: newVenuePhotosphere.trim() ? `${newVenueName} 360° Photosphere Virtual Tour` : undefined,
      facilities: [
        'Dedicated Minbar & Audio System',
        'Separate Gents & Ladies Partition Area',
        'Tabarruk Cauldron (Deg) Kitchen Access',
        'Clean Wudu & Restroom Facilities'
      ],
      recommendedFor: ['Majlis-e-Aza', 'Mehfil-e-Jashan', 'Nikah & Shadi', 'Khatam-e-Quran'],
      suggestedDonation: newVenueDonation || '₹12,000 — ₹25,000',
      imamOrTrustee: user?.name || 'Local Trust Board',
      contactPhone: newVenuePhone || '+91 98200 12345',
      description: newVenueDesc || 'Verified Shia community center and Imambargah facility registered by local trustees for sacred assemblies and family gatherings.',
      hasNikahLicense: true,
      hasTabarrukKitchen: true,
      hasSeparateHalls: true,
      coordinates: { lat: 18.96, lng: 72.83 },
      subscribersCount: 1,
      isSubscribed: false
    };

    setVenuesList(prev => [createdVenue, ...prev]);
    setIsRegisterVenueModalOpen(false);
    setSubscriptionToast(`Venue "${newVenueName}" registered successfully with ${createdVenue.images?.length || 1} photos${createdVenue.photosphereUrl ? ' and 360° Photosphere Tour' : ''}!`);
    setTimeout(() => setSubscriptionToast(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#0A0C0E] font-sans antialiased">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(10,12,14,0.1)]">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 h-[76px] flex items-center justify-between">
          
          <div className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-[17px] sm:text-[19px] tracking-[-0.025em] text-[#0A0C0E] flex items-center group cursor-pointer focus:outline-none"
            >
              <span>ONE COMMUNITY</span>
              <span className="text-[#E8913C] ml-1">.</span>
            </button>

            <span className="hidden sm:inline-block text-[#D1D5DB]">/</span>

            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4A525A] hover:text-[#E8913C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRegisterVenueModalOpen(true)}
              className="hidden sm:flex px-3.5 py-2 border border-[rgba(10,12,14,0.15)] hover:border-[#E8913C] text-[#0A0C0E] rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-colors items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#E8913C]" />
              <span>Register Venue</span>
            </button>

            <button
              onClick={() => handleOpenBooking()}
              className="px-4 py-2 bg-[#E8913C] hover:bg-[#d67e2a] text-white rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Venue</span>
            </button>
          </div>

        </div>
      </header>

      {/* Floating Subscription Notification Toast */}
      {subscriptionToast && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2.5 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-2xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
          <span>{subscriptionToast}</span>
        </div>
      )}

      {/* 2. Page Hero Header */}
      <section className="bg-white border-b border-[rgba(10,12,14,0.08)] py-14 sm:py-20">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8913C] font-bold">
                ONE COMMUNITY // SHIA EVENT & VENUE MANAGEMENT
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#0A0C0E] tracking-tight leading-[1.08]">
              Verified Shia Venues, Mosques & Imambargahs.
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#4A525A] leading-relaxed">
              Discover and book authorized Shia community facilities across India. Coordinate Majalis, Mehfil-e-Jashan, Nikah celebrations, Tatfeen/Soyem, and community gatherings with transparent pricing, verified ritual facilities, and zero booking conflicts.
            </p>
          </div>

          {/* Quick Category Jump Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {SHIA_EVENT_TYPES.slice(0, 5).map(type => (
              <div 
                key={type.id}
                onClick={() => handleOpenBooking(undefined, type.id)}
                className="p-4 bg-[#F9FAFB] hover:bg-white rounded-lg border border-[rgba(10,12,14,0.08)] hover:border-[#E8913C] transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#78828A] uppercase font-semibold">
                    {type.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#0A0C0E] group-hover:text-[#E8913C] transition-colors">
                  {type.title}
                </h4>
                <p className="font-serif text-[11px] text-[#78828A]">
                  {type.urduTitle}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Venue Search, Discovery & Radius Filters */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          {/* Controls Bar: Search, Category, City, Radius, View Mode */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[rgba(10,12,14,0.08)] shadow-xs space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-base text-[#0A0C0E]">
                  Browse Shia Venues
                </span>
                <span className="px-2 py-0.5 bg-[#F5F6F8] rounded text-xs font-mono font-bold text-[#E8913C]">
                  {filteredVenues.length} available
                </span>
              </div>

              {/* View Switcher: Cards vs Map */}
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-[#F5F6F8] border border-[rgba(10,12,14,0.1)] flex items-center text-xs font-mono">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                      viewMode === 'cards' ? 'bg-white text-[#0A0C0E] font-bold shadow-xs' : 'text-[#78828A] hover:text-[#0A0C0E]'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors ${
                      viewMode === 'map' ? 'bg-white text-[#0A0C0E] font-bold shadow-xs' : 'text-[#78828A] hover:text-[#0A0C0E]'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>OpenStreetMap</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#78828A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search venue or facility..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[rgba(10,12,14,0.12)] rounded-md text-xs text-[#0A0C0E] placeholder:text-[#78828A] focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              {/* Category */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9FAFB] border border-[rgba(10,12,14,0.12)] rounded-md text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9FAFB] border border-[rgba(10,12,14,0.12)] rounded-md text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                >
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Radius Filter */}
              <div>
                <select
                  value={radiusFilter}
                  onChange={(e) => setRadiusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F9FAFB] border border-[rgba(10,12,14,0.12)] rounded-md text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                >
                  <option value="All">Radius: All Distances</option>
                  {radiusOptions.filter(r => r !== 'All').map(r => (
                    <option key={r} value={r}>Within {r} of You</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* OPENSTREETMAP INTERACTIVE VISUAL VIEW */}
          {viewMode === 'map' && (
            <div className="bg-white rounded-xl border border-[rgba(10,12,14,0.1)] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(10,12,14,0.08)]">
                <div>
                  <h3 className="font-display font-bold text-base text-[#0A0C0E] flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#E8913C]" />
                    <span>OpenStreetMap // Shia Community Geolocation View</span>
                  </h3>
                  <p className="text-xs text-[#4A525A]">
                    Showing verified Imambargahs, Mosques, and Community Centers relative to your coordinates.
                  </p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  OpenStreetMap Active
                </span>
              </div>

              {/* Interactive OpenStreetMap Embed / Pin Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 relative h-[380px] rounded-lg overflow-hidden border border-gray-200 bg-[#E5E3DF]">
                  {/* Clean OpenStreetMap iframe embed for India center */}
                  <iframe
                    title="OpenStreetMap View"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=72.75%2C18.88%2C72.98%2C19.12&amp;layer=mapnik&amp;marker=18.96%2C72.83"
                    className="w-full h-full grayscale-[20%]"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-mono shadow-sm border border-gray-300">
                    📍 Reference User Location: Mumbai Central (18.96° N, 72.83° E)
                  </div>
                </div>

                {/* Nearby list on map sidebar */}
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#78828A]">
                    Nearest Shia Venues:
                  </h4>
                  {filteredVenues.map(v => {
                    const distKm = calculateDistanceKm(v.coordinates?.lat || 18.96, v.coordinates?.lng || 72.83);
                    return (
                      <div 
                        key={v.id} 
                        className="p-3 bg-[#F9FAFB] rounded-lg border border-[rgba(10,12,14,0.08)] space-y-1.5 hover:border-[#E8913C] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-[#0A0C0E] truncate max-w-[170px]">
                            {v.name}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 bg-white border rounded text-[#E8913C] font-bold">
                            {distKm} km
                          </span>
                        </div>
                        <p className="text-[11px] text-[#78828A]">{v.city} · Up to {v.capacity} capacity</p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[10px] text-[#2E6B72]">{v.suggestedDonation}</span>
                          <button
                            onClick={() => handleOpenBooking(v)}
                            className="px-2.5 py-1 bg-[#0A0C0E] hover:bg-[#E8913C] text-white text-[10.5px] font-mono rounded transition-colors cursor-pointer"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VENUE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVenues.map(venue => {
              const isSubscribed = subscribedVenueIds.includes(venue.id);
              const distKm = calculateDistanceKm(venue.coordinates?.lat || 18.96, venue.coordinates?.lng || 72.83);

              return (
                <div
                  key={venue.id}
                  className="bg-white rounded-xl overflow-hidden border border-[rgba(10,12,14,0.1)] hover:border-[#E8913C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image & Overlay Badges */}
                  <div className="relative h-64 w-full overflow-hidden bg-black">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10.5px] uppercase font-bold px-3 py-1 rounded-full bg-black/70 text-white border border-white/20">
                        {venue.category}
                      </span>
                      {venue.hasNikahLicense && (
                        <span className="font-sans text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                          ✓ Registered Nikah Venue
                        </span>
                      )}
                      {venue.photosphereUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setTourModalVenue(venue);
                            setTourModalInitialTab('photosphere');
                            setIsTourModalOpen(true);
                          }}
                          className="font-mono text-[10.5px] font-bold px-3 py-1 rounded-full bg-[#E8913C] hover:bg-[#d67e2a] text-neutral-950 flex items-center gap-1 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                        >
                          <Rotate3d className="w-3.5 h-3.5" />
                          <span>360° Tour</span>
                        </button>
                      )}
                      {venue.images && venue.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setTourModalVenue(venue);
                            setTourModalInitialTab('gallery');
                            setIsTourModalOpen(true);
                          }}
                          className="font-mono text-[10.5px] font-medium px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Images className="w-3 h-3 text-[#E8913C]" />
                          <span>{venue.images.length} Photos</span>
                        </button>
                      )}
                    </div>

                    {/* Capacity & Distance Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-white font-mono text-xs flex items-center gap-1.5 border border-white/20">
                        <Users className="w-3.5 h-3.5 text-[#E8913C]" />
                        <span>Up to {venue.capacity}</span>
                      </div>
                      <div className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[#E8913C] font-mono text-xs font-bold border border-white/20">
                        {distKm} km
                      </div>
                    </div>

                    {/* Title on Image Base */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                      <p className="font-serif text-xs text-white/70">
                        {venue.arabicName}
                      </p>
                      <h3 className="font-display font-extrabold text-2xl text-white">
                        {venue.name}
                      </h3>
                      <p className="font-sans text-xs text-white/80 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E8913C]" />
                        <span>{venue.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Venue Details */}
                  <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="font-sans text-xs text-[#4A525A] leading-relaxed">
                        {venue.description}
                      </p>

                      {/* Facilities Checklist */}
                      <div className="space-y-2">
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#78828A]">
                          KEY FACILITIES & AMENITIES:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#0A0C0E]">
                          {venue.facilities.map((f, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommended for */}
                      <div className="pt-2 flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[10px] uppercase text-[#78828A] mr-1">
                          Best suited for:
                        </span>
                        {venue.recommendedFor.map(r => (
                          <span
                            key={r}
                            className="px-2 py-0.5 bg-[#F5F6F8] rounded text-[11px] font-mono text-[#0A0C0E] border border-[rgba(10,12,14,0.06)]"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Donation Guide, Subscribe & Book Button */}
                    <div className="pt-4 border-t border-[rgba(10,12,14,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#78828A]">
                          SUGGESTED VENUE DONATION:
                        </span>
                        <p className="font-mono font-bold text-sm text-[#0A0C0E]">
                          {venue.suggestedDonation}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {venue.photosphereUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setTourModalVenue(venue);
                              setTourModalInitialTab('photosphere');
                              setIsTourModalOpen(true);
                            }}
                            className="px-3 py-2.5 rounded-lg border border-[#E8913C]/40 bg-amber-500/10 hover:bg-amber-500/20 text-[#d67e2a] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Interactive 360° Photosphere Virtual Tour"
                          >
                            <Rotate3d className="w-3.5 h-3.5 text-[#E8913C]" />
                            <span className="hidden sm:inline">360° Tour</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggleSubscribe(venue.id, venue.name)}
                          className={`px-3 py-2.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isSubscribed
                              ? 'bg-amber-50 border-[#E8913C] text-[#E8913C] font-bold'
                              : 'bg-white border-gray-300 text-[#4A525A] hover:border-gray-400'
                          }`}
                          title="Subscribe to event booking notifications"
                        >
                          <Bell className={`w-3.5 h-3.5 ${isSubscribed ? 'fill-[#E8913C]' : ''}`} />
                          <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                        </button>

                        <button
                          onClick={() => handleOpenBooking(venue)}
                          className="px-4 py-2.5 bg-[#0A0C0E] hover:bg-[#E8913C] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                        >
                          <Calendar className="w-4 h-4 text-[#E8913C]" />
                          <span>Book Venue</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-[rgba(10,12,14,0.1)] py-12">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-sm text-[#0A0C0E] hover:text-[#E8913C] cursor-pointer"
            >
              ONE COMMUNITY
            </button>
            <span className="text-xs text-[#78828A]">© 2026 Shia Mosques & Event Reservation Registry</span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4A525A] hover:text-[#E8913C] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Site</span>
          </button>
        </div>
      </footer>

      {/* Modal 1: Shia Event Booking & AI Poster Modal */}
      <ShiaEventBookingModal
        venue={activeBookingVenue}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialEventTypeId={activeBookingEventTypeId}
      />

      {/* Modal 2: Venue Owner Registration Flow */}
      {isRegisterVenueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-2xl bg-white text-[#0A0C0E] border border-[rgba(10,12,14,0.14)] rounded-xl shadow-2xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#F5F6F8] border-b border-[rgba(10,12,14,0.1)] flex items-start justify-between">
              <div>
                <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[#0A0C0E] text-white font-bold">
                  VENUE OWNER REGISTRATION
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0A0C0E] mt-1">
                  List Your Shia Mosque or Imambargah
                </h3>
                <p className="text-xs text-[#4A525A]">
                  Enable community members to discover and book your venue for Majalis, Nikah, and religious functions.
                </p>
              </div>
              <button
                onClick={() => setIsRegisterVenueModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#78828A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterVenueSubmit} className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
              <div>
                <label className="font-bold text-[#0A0C0E] block mb-1">Venue / Imambargah Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zainabia Community Center & Imambargah"
                  value={newVenueName}
                  onChange={(e) => setNewVenueName(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0A0C0E] block mb-1">Venue Category</label>
                  <select
                    value={newVenueCategory}
                    onChange={(e: any) => setNewVenueCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                  >
                    <option value="Imambargah & Azakhana">Imambargah & Azakhana</option>
                    <option value="Mosque & Centre">Mosque & Centre</option>
                    <option value="Banquet & Community Hall">Banquet & Community Hall</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#0A0C0E] block mb-1">City</label>
                  <select
                    value={newVenueCity}
                    onChange={(e) => setNewVenueCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#0A0C0E] block mb-1">Full Local Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street, area, landmarks, postal code"
                  value={newVenueAddress}
                  onChange={(e) => setNewVenueAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0A0C0E] block mb-1">Maximum Capacity (Guests)</label>
                  <input
                    type="number"
                    value={newVenueCapacity}
                    onChange={(e) => setNewVenueCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#0A0C0E] block mb-1">Suggested Donation / Session</label>
                  <input
                    type="text"
                    value={newVenueDonation}
                    onChange={(e) => setNewVenueDonation(e.target.value)}
                    placeholder="e.g. ₹15,000 — ₹30,000"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#0A0C0E] block mb-1">Trustee Contact Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 12345"
                  value={newVenuePhone}
                  onChange={(e) => setNewVenuePhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              <div>
                <label className="font-bold text-[#0A0C0E] block mb-1">Description & Heritage Notes</label>
                <textarea
                  rows={2}
                  placeholder="Describe your center's history, facilities, parking, wudu, and rules."
                  value={newVenueDesc}
                  onChange={(e) => setNewVenueDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#E8913C]"
                />
              </div>

              {/* -------------------------------------------------------- */}
              {/* SECTION: MULTIPLE VENUE GALLERY IMAGES */}
              {/* -------------------------------------------------------- */}
              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[rgba(10,12,14,0.1)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-[#E8913C]" />
                    <span className="font-bold text-[#0A0C0E] text-xs uppercase font-mono">
                      Venue Gallery Photos ({newVenueImages.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-[#78828A]">First image is Primary Cover</span>
                </div>

                <p className="text-[11px] text-[#4A525A]">
                  Add multiple photos of your hall, minbar, courtyard, and facilities to give community members a complete visual overview.
                </p>

                {/* Upload & URL Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <label className="px-3 py-1.5 bg-white border border-gray-300 hover:border-[#E8913C] rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#E8913C]" />
                    <span>Upload Multiple Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleUploadMultipleImages}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setNewVenueImages(prev => [
                        ...prev,
                        '/assets/images/nikah_banquet_hall_1791105166840.jpg',
                        '/assets/images/majlis_assembly_1791103671432.jpg'
                      ]);
                    }}
                    className="px-2.5 py-1.5 bg-white border border-gray-200 hover:border-gray-300 rounded-lg text-[11px] font-mono text-[#4A525A] cursor-pointer"
                  >
                    + Add Preset Photos
                  </button>
                </div>

                {/* Image URL input */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="Or paste image URL (https://...)"
                    value={newImageInputUrl}
                    onChange={(e) => setNewImageInputUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 border rounded text-xs focus:outline-none focus:border-[#E8913C] bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1.5 bg-[#0A0C0E] text-white rounded text-xs font-mono font-bold hover:bg-[#E8913C] transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Thumbnail Strip */}
                {newVenueImages.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                    {newVenueImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`relative group rounded-lg overflow-hidden border-2 bg-neutral-900 h-20 ${
                          idx === 0 ? 'border-[#E8913C] shadow-md' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Venue photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Cover badge */}
                        {idx === 0 ? (
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#E8913C] text-neutral-950 font-mono text-[9px] font-bold flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-neutral-950" />
                            <span>COVER</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage(idx)}
                            className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] transition-opacity cursor-pointer"
                          >
                            Set Cover
                          </button>
                        )}

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded bg-black/75 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* -------------------------------------------------------- */}
              {/* SECTION: 360° PHOTOSPHERE VIRTUAL TOUR (JPG FORMAT) */}
              {/* -------------------------------------------------------- */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/5 via-[#F9FAFB] to-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Rotate3d className="w-4 h-4 text-[#E8913C]" />
                    <span className="font-bold text-[#0A0C0E] text-xs uppercase font-mono">
                      360° Photosphere Virtual Tour (JPG Format)
                    </span>
                  </div>
                  <span className="font-mono text-[9.5px] uppercase font-bold px-2 py-0.5 rounded bg-[#E8913C] text-neutral-950">
                    JPG Format Only
                  </span>
                </div>

                <p className="text-[11px] text-[#4A525A]">
                  Upload an equirectangular 360° panoramic photo in **JPG** format (taken with a 360 camera or phone panorama app). Visitors will be able to pan and look around your venue in full 360 degrees.
                </p>

                {photosphereError && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{photosphereError}</span>
                  </div>
                )}

                {/* Upload & Presets */}
                <div className="flex flex-wrap items-center gap-2">
                  <label className="px-3 py-1.5 bg-white border border-[#E8913C] hover:bg-amber-50 rounded-lg text-xs font-mono font-bold text-[#0A0C0E] flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors">
                    <Camera className="w-3.5 h-3.5 text-[#E8913C]" />
                    <span>Choose 360° Photosphere (.jpg)</span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,image/jpeg"
                      onChange={handleUploadPhotosphere}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setNewVenuePhotosphere('/assets/images/bada_imambara_lucknow_1791105419028.jpg');
                      setPhotosphereError(null);
                      setIsPreviewingPhotosphereInModal(true);
                    }}
                    className="px-2.5 py-1.5 bg-white border border-gray-300 hover:border-[#E8913C] rounded-lg text-[11px] font-mono text-[#0A0C0E] cursor-pointer"
                  >
                    Load Sample 360° Imambargah JPG
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewVenuePhotosphere('/assets/images/mughal_masjid_mumbai_1791105448700.jpg');
                      setPhotosphereError(null);
                      setIsPreviewingPhotosphereInModal(true);
                    }}
                    className="px-2.5 py-1.5 bg-white border border-gray-300 hover:border-[#E8913C] rounded-lg text-[11px] font-mono text-[#0A0C0E] cursor-pointer"
                  >
                    Load Sample 360° Masjid JPG
                  </button>
                </div>

                {/* Attached Photosphere Status & Inline Preview Toggle */}
                {newVenuePhotosphere && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-emerald-900 font-mono text-[11.5px]">
                          ✓ 360° JPG Photosphere Ready
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsPreviewingPhotosphereInModal(prev => !prev)}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-[#E8913C]" />
                          <span>{isPreviewingPhotosphereInModal ? 'Hide 360 Preview' : 'Interactive 360 Preview'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setNewVenuePhotosphere('');
                            setIsPreviewingPhotosphereInModal(false);
                          }}
                          className="p-1 rounded text-neutral-400 hover:text-rose-600 cursor-pointer"
                          title="Remove Photosphere"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Live Interactive Photosphere Preview in Modal */}
                    {isPreviewingPhotosphereInModal && (
                      <div className="rounded-xl overflow-hidden border border-neutral-700 shadow-inner">
                        <PhotosphereViewer
                          src={newVenuePhotosphere}
                          title="Live Registration 360° Test"
                          height="260px"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterVenueModalOpen(false)}
                  className="px-4 py-2 border text-[#4A525A] rounded hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E8913C] hover:bg-[#d67e2a] text-white font-bold rounded cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Publish Venue Listing</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: 360 Photosphere Tour & Multi-photo Gallery Modal */}
      <VenueTourModal
        venue={tourModalVenue}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onBookVenue={(v) => handleOpenBooking(v)}
        initialTab={tourModalInitialTab}
      />

    </div>
  );
};
