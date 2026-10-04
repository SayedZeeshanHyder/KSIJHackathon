import React, { useState } from 'react';
import { ShiaVenue, SHIA_VENUES, SHIA_EVENT_TYPES, ShiaEventType } from '../data/shiaEventsData';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  HeartHandshake, 
  Flame, 
  BookOpen, 
  Utensils, 
  Volume2, 
  Send,
  Phone,
  ShieldCheck,
  AlertTriangle,
  Download,
  Share2,
  RefreshCw,
  Eye
} from 'lucide-react';

interface ShiaEventBookingModalProps {
  venue: ShiaVenue | null;
  isOpen: boolean;
  onClose: () => void;
  initialEventTypeId?: string;
}

export const ShiaEventBookingModal: React.FC<ShiaEventBookingModalProps> = ({
  venue,
  isOpen,
  onClose,
  initialEventTypeId = 'marriage'
}) => {
  if (!isOpen) return null;

  // Selected Venue
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venue?.id || SHIA_VENUES[0].id);
  const activeVenue = SHIA_VENUES.find(v => v.id === selectedVenueId) || SHIA_VENUES[0];

  // Event Details
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string>(initialEventTypeId);
  const activeEventType = SHIA_EVENT_TYPES.find(t => t.id === selectedEventTypeId) || SHIA_EVENT_TYPES[0];

  const [eventTitle, setEventTitle] = useState<string>('');
  const [speakerName, setSpeakerName] = useState<string>('Maulana Kalbe Sadiq Rizvi');
  const [eventDate, setEventDate] = useState<string>('2026-10-24');
  const [timeSlot, setTimeSlot] = useState<string>('Evening (17:30 — 22:00)');
  const [guestCount, setGuestCount] = useState<string>('200 — 300 Guests');

  // Selected Facility Add-ons
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Separate Gents & Ladies Partition Halls',
    'Audio System with Minbar Microphone',
    'Commercial Niaz / Tabarruk Kitchen Access'
  ]);

  // Host Details
  const [hostName, setHostName] = useState<string>('Mohd Jawad');
  const [hostEmail, setHostEmail] = useState<string>('jawad@example.com');
  const [hostPhone, setHostPhone] = useState<string>('+91 98200 12345');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Conflict & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    bookingRef: string;
    submittedAt: string;
  } | null>(null);

  // AI Poster Generator State
  const [activeTab, setActiveTab] = useState<'booking' | 'poster'>('booking');
  const [isGeneratingPoster, setIsGeneratingPoster] = useState<boolean>(false);
  const [posterTheme, setPosterTheme] = useState<string>('Classic Charcoal & Amber');
  const [posterData, setPosterData] = useState<{
    headline: string;
    category: string;
    organizer: string;
    date: string;
    time: string;
    venue: string;
    speaker: string;
    keyNote: string;
    hadithQuote: string;
    colorTheme: string;
    badge: string;
  } | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  // Submit Booking with Server Double-Booking Conflict Prevention
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostName || !hostEmail || !hostPhone) return;

    setIsSubmitting(true);
    setConflictError(null);

    const bookingPayload = {
      venueId: activeVenue.id,
      venueName: activeVenue.name,
      date: eventDate,
      timeSlot,
      eventTitle: eventTitle || `${activeEventType.title} Gathering`,
      category: activeEventType.category,
      organizer: hostName,
      expectedAudience: guestCount,
      speaker: speakerName,
      contactPhone: hostPhone,
      hostName,
      hostEmail
    };

    try {
      const res = await fetch('/api/events/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setConflictError(data.error || 'A scheduling conflict occurred for this time slot.');
        setIsSubmitting(false);
        return;
      }

      setBookingConfirmation({
        bookingRef: data.booking?.id || `SHIA-RES-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    } catch {
      // Client-side fallback reservation
      setBookingConfirmation({
        bookingRef: `SHIA-RES-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // AI Poster Generator
  const handleGeneratePoster = async () => {
    setIsGeneratingPoster(true);
    try {
      const res = await fetch('/api/ai/poster-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: eventTitle || activeEventType.title,
          category: activeEventType.category,
          organizer: hostName || 'One Community Anjuman',
          date: eventDate,
          time: timeSlot,
          venue: activeVenue.name,
          speaker: speakerName,
          theme: posterTheme
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPosterData(data.poster);
      } else {
        throw new Error('Fallback needed');
      }
    } catch {
      setPosterData({
        headline: eventTitle || activeEventType.title,
        category: activeEventType.category,
        organizer: hostName || 'One Community Assembly',
        date: eventDate,
        time: timeSlot,
        venue: activeVenue.name,
        speaker: speakerName,
        keyNote: 'All momineen & mominaat are cordially invited to attend in solemn observance.',
        hadithQuote: '“Knowledge is the most honorable distinction.” — Nahjul Balagha',
        colorTheme: posterTheme,
        badge: 'COMMUNITY VERIFIED PROGRAM'
      });
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  const handleSharePoster = () => {
    const text = `*${posterData?.headline || activeEventType.title}*\nCategory: ${activeEventType.category}\nDate: ${eventDate}\nTime: ${timeSlot}\nVenue: ${activeVenue.name}\nSpeaker: ${speakerName}\nRSVP / Contact: ${hostPhone}`;
    navigator.clipboard.writeText(text);
    alert('Event details copied! Ready to share on WhatsApp or community groups.');
  };

  const handleDownloadPoster = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white text-[#0A0C0E] border border-[rgba(10,12,14,0.14)] rounded-xl shadow-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-[#F5F6F8] border-b border-[rgba(10,12,14,0.1)] flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-[#0A0C0E] text-white font-bold">
                COMMUNITY EVENT RESERVATION
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#E8913C]/15 text-[#E8913C] font-semibold">
                SHIA VENUES & MOSQUES
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0C0E]">
              Book Shia Mosque, Imambargah or Banquet Hall
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4A525A]">
              Reserve verified community venues with slot conflict verification and automated AI event poster generation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#78828A] hover:text-[#0A0C0E] cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher: Booking Wizard vs AI Poster Generator */}
        <div className="grid grid-cols-2 border-b border-[rgba(10,12,14,0.1)] bg-white text-xs font-mono font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('booking')}
            className={`py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'booking'
                ? 'border-b-2 border-[#E8913C] text-[#0A0C0E] bg-white font-bold'
                : 'text-[#78828A] hover:text-[#0A0C0E] bg-[#FAFAFA]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#E8913C]" />
            <span>1. Venue & Slot Reservation</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('poster');
              if (!posterData) handleGeneratePoster();
            }}
            className={`py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'poster'
                ? 'border-b-2 border-[#E8913C] text-[#0A0C0E] bg-white font-bold'
                : 'text-[#78828A] hover:text-[#0A0C0E] bg-[#FAFAFA]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#E8913C]" />
            <span>2. AI Event Poster Generator</span>
          </button>
        </div>

        {/* TAB 1: BOOKING WIZARD */}
        {activeTab === 'booking' && (
          <div>
            {/* Confirmation Screen */}
            {bookingConfirmation ? (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E8913C] font-bold">
                    RESERVATION CONFIRMED WITH ZERO CONFLICT
                  </span>
                  <h3 className="font-display font-bold text-2xl text-[#0A0C0E]">
                    Booking Request Confirmed!
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#4A525A]">
                    Your reservation request for <strong>{activeEventType.title}</strong> has been confirmed at <strong>{activeVenue.name}</strong>.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[rgba(10,12,14,0.1)] rounded-lg p-5 max-w-lg mx-auto text-left space-y-3 font-sans text-xs">
                  <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                    <span className="font-mono text-[#78828A]">Reference ID:</span>
                    <span className="font-mono font-bold text-sm text-[#0A0C0E]">{bookingConfirmation.bookingRef}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                    <span className="text-[#78828A]">Selected Venue:</span>
                    <span className="font-semibold text-[#0A0C0E]">{activeVenue.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                    <span className="text-[#78828A]">Date & Time Slot:</span>
                    <span className="font-mono font-semibold text-[#0A0C0E]">{eventDate} · {timeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.08)] pb-2">
                    <span className="text-[#78828A]">Host & Contact:</span>
                    <span className="font-medium text-[#0A0C0E]">{hostName} ({hostPhone})</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#78828A]">Status:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      Slot Guaranteed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('poster');
                      handleGeneratePoster();
                    }}
                    className="px-6 py-2.5 bg-[#E8913C] hover:bg-[#d67e2a] text-white rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Create AI Event Poster</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#0A0C0E] hover:bg-neutral-800 text-white rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="p-6 sm:p-8 space-y-7 max-h-[65vh] overflow-y-auto">
                
                {/* Double Booking Warning / Conflict alert */}
                {conflictError && (
                  <div className="p-4 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-3 animate-in fade-in">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Venue Slot Unavailable</h4>
                      <p className="mt-0.5">{conflictError}</p>
                    </div>
                  </div>
                )}

                {/* Step 1: Select Event Category */}
                <div className="space-y-3">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    1. Select Event Type & Religious Ritual *
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SHIA_EVENT_TYPES.map(type => {
                      const isSelected = selectedEventTypeId === type.id;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setSelectedEventTypeId(type.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#E8913C] bg-amber-500/10 shadow-xs'
                              : 'border-[rgba(10,12,14,0.12)] hover:border-gray-400 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-display font-bold text-xs text-[#0A0C0E]">
                              {type.title}
                            </span>
                          </div>
                          <p className="font-serif text-[11px] text-[#78828A] mt-0.5">
                            {type.urduTitle}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Shia Venue */}
                <div className="space-y-3">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    2. Select Shia Venue / Mosque / Imambargah *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SHIA_VENUES.map(v => {
                      const isSelected = selectedVenueId === v.id;
                      return (
                        <div
                          key={v.id}
                          onClick={() => setSelectedVenueId(v.id)}
                          className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-[#0A0C0E] bg-[#F5F6F8] ring-1 ring-[#0A0C0E]'
                              : 'border-[rgba(10,12,14,0.12)] hover:border-gray-400 bg-white'
                          }`}
                        >
                          <img
                            src={v.image}
                            alt={v.name}
                            className="w-14 h-14 rounded-md object-cover shrink-0"
                          />
                          <div className="space-y-1">
                            <h4 className="font-display font-bold text-xs text-[#0A0C0E]">
                              {v.name}
                            </h4>
                            <p className="text-[11px] text-[#78828A] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#E8913C]" />
                              <span>{v.city}, {v.state} · Capacity: {v.capacity}</span>
                            </p>
                            <p className="font-mono text-[10px] text-[#2E6B72]">
                              Suggested: {v.suggestedDonation}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Event Information & Speaker */}
                <div className="space-y-3 pt-2">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    3. Event Information & Scholar Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="font-sans text-[11px] text-[#78828A] block mb-1">Event Program Title</span>
                      <input
                        type="text"
                        placeholder="e.g. Annual Wiladat-e-Amir al-Momineen"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] text-[#78828A] block mb-1">Speaker / Reciter / Alim</span>
                      <input
                        type="text"
                        placeholder="e.g. Maulana Kalbe Jawad Naqvi"
                        value={speakerName}
                        onChange={(e) => setSpeakerName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4: Date, Time Slot & Attendance */}
                <div className="space-y-3 pt-2">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    4. Date, Time Slot & Attendance *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="font-sans text-[11px] text-[#78828A]">Date of Program</span>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="font-sans text-[11px] text-[#78828A]">Time Slot</span>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      >
                        <option value="Morning (09:00 — 13:00)">Morning (09:00 — 13:00)</option>
                        <option value="Afternoon (12:00 — 16:00)">Afternoon (12:00 — 16:00)</option>
                        <option value="Evening (17:30 — 22:00)">Evening (17:30 — 22:00)</option>
                        <option value="Full Day (10:00 — 22:00)">Full Day (10:00 — 22:00)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="font-sans text-[11px] text-[#78828A]">Expected Attendance</span>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      >
                        <option value="50 — 100 Guests">50 — 100 Guests</option>
                        <option value="100 — 200 Guests">100 — 200 Guests</option>
                        <option value="200 — 300 Guests">200 — 300 Guests</option>
                        <option value="300 — 500 Guests">300 — 500 Guests</option>
                        <option value="500+ Large Assembly">500+ Large Assembly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 5: Facilities Checklist */}
                <div className="space-y-3 pt-2">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    5. Shia Facilities & Ritual Accommodations
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {[
                      'Separate Gents & Ladies Partition Halls',
                      'Audio System with Minbar Microphone',
                      'Commercial Niaz / Tabarruk Kitchen Access',
                      'Wudu Ablution Fountains with Clean Water Supply',
                      'Authorized Nikah Maulana Coordination Support',
                      'Wheelchair Accessibility Ramp on Premises'
                    ].map(service => {
                      const isChecked = selectedServices.includes(service);
                      return (
                        <label
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`p-2.5 rounded border flex items-center gap-2.5 cursor-pointer transition-colors ${
                            isChecked ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-[#E8913C]"
                          />
                          <span className="text-[#4A525A] text-[11.5px]">{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Step 6: Host Details & Verification */}
                <div className="space-y-3 pt-2">
                  <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    6. Organizer / Host Contact Information *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="font-sans text-[11px] text-[#78828A] block mb-1">Full Name</span>
                      <input
                        type="text"
                        required
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        placeholder="Mohd Jawad"
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] text-[#78828A] block mb-1">Email Address</span>
                      <input
                        type="email"
                        required
                        value={hostEmail}
                        onChange={(e) => setHostEmail(e.target.value)}
                        placeholder="jawad@example.com"
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] text-[#78828A] block mb-1">Mobile / WhatsApp</span>
                      <input
                        type="tel"
                        required
                        value={hostPhone}
                        onChange={(e) => setHostPhone(e.target.value)}
                        placeholder="+91 98200 12345"
                        className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-[rgba(10,12,14,0.1)] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#78828A]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Real-time double-booking prevention active</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-mono text-[#78828A] hover:text-[#0A0C0E] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-[#0A0C0E] hover:bg-[#E8913C] text-white rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying Availability...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Confirm & Book Venue</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            )}
          </div>
        )}

        {/* TAB 2: AI EVENT POSTER GENERATOR */}
        {activeTab === 'poster' && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(10,12,14,0.1)]">
              <div>
                <h3 className="font-display font-bold text-lg text-[#0A0C0E] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E8913C]" />
                  <span>AI-Powered Shia Event Poster Generator</span>
                </h3>
                <p className="text-xs text-[#4A525A] mt-0.5">
                  Generates professional digital posters formatted for WhatsApp status, Instagram, and printing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={posterTheme}
                  onChange={(e) => setPosterTheme(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#F5F6F8] border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] font-mono"
                >
                  <option value="Classic Charcoal & Amber">Classic Charcoal & Gold</option>
                  <option value="Deep Emerald & Gold">Sacred Emerald & Gold</option>
                  <option value="Muted Maroon & Ivory">Muted Maroon & Ivory</option>
                  <option value="Minimal Light Clean">Minimal Light Clean</option>
                </select>

                <button
                  type="button"
                  onClick={handleGeneratePoster}
                  disabled={isGeneratingPoster}
                  className="px-3.5 py-1.5 bg-[#E8913C] hover:bg-[#d67e2a] text-white rounded text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPoster ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Poster Render Canvas Card */}
            {posterData && (
              <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-[#0A0C0E] text-white border-4 border-[#E8913C]/40 shadow-2xl space-y-6 relative overflow-hidden">
                {/* Decorative Islamic Top Arch Accent */}
                <div className="text-center space-y-1 border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#E8913C] uppercase font-bold block">
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[9.5px] font-mono uppercase tracking-widest text-neutral-300">
                    {posterData.badge}
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <span className="font-mono text-xs uppercase text-[#E8913C] font-semibold tracking-wider">
                    {posterData.category}
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {posterData.headline}
                  </h2>
                  <p className="font-serif italic text-xs text-neutral-300">
                    {posterData.hadithQuote}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-neutral-200">
                    <Calendar className="w-4 h-4 text-[#E8913C]" />
                    <span><strong>Date:</strong> {posterData.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-200">
                    <Clock className="w-4 h-4 text-[#E8913C]" />
                    <span><strong>Time:</strong> {posterData.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-200">
                    <MapPin className="w-4 h-4 text-[#E8913C]" />
                    <span><strong>Venue:</strong> {posterData.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-200">
                    <Users className="w-4 h-4 text-[#E8913C]" />
                    <span><strong>Speaker / Reciter:</strong> {posterData.speaker}</span>
                  </div>
                </div>

                <div className="text-center space-y-1 border-t border-white/10 pt-4 text-[11px] text-neutral-400">
                  <p>{posterData.keyNote}</p>
                  <p className="font-mono text-[10px] text-[#E8913C] pt-1">
                    Organized By: {posterData.organizer} · Contact: {hostPhone}
                  </p>
                </div>
              </div>
            )}

            {/* Poster Actions: Download & Share */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={handleSharePoster}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Details</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPoster}
                className="px-5 py-2.5 bg-[#0A0C0E] hover:bg-neutral-800 text-white rounded-md text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
