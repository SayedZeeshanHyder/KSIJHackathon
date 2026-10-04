import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Search, 
  Share2, 
  Bookmark, 
  Users, 
  ArrowLeft, 
  ExternalLink, 
  Navigation, 
  CalendarPlus, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles,
  Phone,
  Layers,
  Map as MapIcon,
  List,
  CalendarDays
} from 'lucide-react';
import { CommunityEvent, UserProfile } from '../../types';

interface EventsViewProps {
  events: CommunityEvent[];
  user: UserProfile;
  selectedEventFromGlobal?: CommunityEvent | null;
  onClearGlobalSelection?: () => void;
  onToggleRegister: (eventId: string) => void;
  onToggleSave: (eventId: string) => void;
  onCreateEvent?: (newEvent: CommunityEvent) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  user,
  selectedEventFromGlobal,
  onClearGlobalSelection,
  onToggleRegister,
  onToggleSave,
  onCreateEvent
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(selectedEventFromGlobal || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar' | 'map'>('grid');
  
  // Organizer Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'Majlis' | 'Matam' | 'Azadari' | 'Mehfil' | 'Education' | 'Community' | 'Charity'>('Majlis');
  const [newEventDate, setNewEventDate] = useState('2026-10-15');
  const [newEventTime, setNewEventTime] = useState('08:00 PM');
  const [newEventVenue, setNewEventVenue] = useState('');
  const [newEventCity, setNewEventCity] = useState('Mumbai');
  const [newEventDesc, setNewEventDesc] = useState('');

  const eventTypes = [
    'All',
    'Majlis',
    'Matam',
    'Azadari',
    'Mehfil',
    'Education',
    'Charity'
  ];

  const cities = ['All', 'Mumbai', 'Mira Road', 'Bandra', 'Lucknow', 'Hyderabad'];

  const filteredEvents = events.filter((e) => {
    const matchesSearch = 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.speakers && e.speakers.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesType = selectedType === 'All' || e.type === selectedType;
    const matchesCity = selectedCity === 'All' || e.city === selectedCity;

    return matchesSearch && matchesType && matchesCity;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventVenue) return;

    const created: CommunityEvent = {
      id: `evt_${Date.now()}`,
      title: newEventTitle,
      type: newEventType,
      date: newEventDate,
      rawDate: newEventDate,
      time: `${newEventTime} IST`,
      venue: newEventVenue,
      address: `${newEventVenue}, ${newEventCity}`,
      city: newEventCity,
      organizer: user.name,
      organizerContact: '+91 98200 12345',
      distance: '2.5 km away',
      image: '/src/assets/images/community_event_banner_1791097454868.jpg',
      registeredCount: 1,
      capacity: 350,
      entryType: 'Free Entry',
      description: newEventDesc || 'Community gathering organized for spiritual and educational reflection.',
      coordinates: { lat: 18.96, lng: 72.83 }
    };

    if (onCreateEvent) {
      onCreateEvent(created);
    }
    setIsCreateModalOpen(false);
    alert('Community event created and broadcasted to local calendar!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Community Events & Azadari Gathering Hub</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What's Happening in Your Community?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Discover Majalis, Matam, Mehfil-e-Adab, educational symposiums, and civic welfare drives across your local Imambargahs and cultural centers.
          </p>
        </div>

        {/* View Mode switcher & Action */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === 'calendar' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                viewMode === 'map' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-purple-950/40"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Host an Event</span>
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      {!selectedEvent && viewMode === 'grid' && (
        <div className="space-y-6">
          
          {/* Search & Location Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-3 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by event title, Zakir/Speaker (e.g. Maulana Rizvi), venue, or Imambargah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-purple-500/50"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>City: {city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedType === type
                      ? 'bg-purple-950 text-purple-300 border border-purple-500/40 font-medium'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="group rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 cursor-pointer overflow-hidden transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Event Banner */}
                  <div className="h-44 bg-neutral-800 relative overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-xs text-[10px] text-purple-300 font-mono">
                      {evt.type}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-xs text-[10px] text-neutral-300 font-mono">
                      {evt.distance}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="font-mono text-purple-300 font-medium">{evt.date}</span>
                      <span>·</span>
                      <span>{evt.time}</span>
                    </div>

                    <h3 className="font-display text-base font-bold text-white group-hover:text-purple-300 leading-snug">
                      {evt.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span className="truncate">{evt.venue}, {evt.city}</span>
                    </div>

                    {evt.speakers && evt.speakers.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Prominent Reciters / Zakirs:</span>
                        <p className="font-medium text-neutral-200 mt-0.5 truncate">
                          {evt.speakers.map(s => s.name).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer RSVP & Save */}
                <div className="p-4 border-t border-neutral-800/80 bg-neutral-950/40 flex items-center justify-between text-xs">
                  <div className="text-neutral-400">
                    <span>{evt.registeredCount} Attending</span>
                    {evt.capacity && <span className="text-[10px] text-neutral-500"> / {evt.capacity} Cap</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleSave(evt.id); }}
                      className={`p-2 rounded-lg border transition-colors ${
                        evt.isSaved ? 'bg-purple-950 text-purple-300 border-purple-500/40' : 'bg-neutral-800 text-neutral-400 hover:text-white border-neutral-700'
                      }`}
                      title="Save Event"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleRegister(evt.id); }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        evt.isRegistered
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-purple-600 hover:bg-purple-500 text-white'
                      }`}
                    >
                      {evt.isRegistered ? 'RSVP Confirmed ✓' : 'Register / RSVP'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="py-16 text-center text-neutral-400 space-y-2">
              <Calendar className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-sm font-medium">No events found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedCity('All'); }}
                className="text-xs text-purple-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && !selectedEvent && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h2 className="font-display text-lg font-bold text-white">October 2026 Community Calendar</h2>
              <p className="text-xs text-neutral-400">Monthly schedule of Majalis, Youth Mentorship & Mehfils</p>
            </div>
            <span className="text-xs font-mono text-purple-400 font-medium">4 Gatherings Scheduled</span>
          </div>

          {/* Calendar Table Matrix */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="p-2 font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">
                {d}
              </div>
            ))}

            {/* Days 1 to 31 */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const dateStr = `2026-10-${String(day).padStart(2, '0')}`;
              const dayEvents = events.filter(e => e.rawDate === dateStr);
              const isToday = day === 4;

              return (
                <div
                  key={day}
                  className={`min-h-[85px] p-2 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                    dayEvents.length > 0
                      ? 'bg-neutral-950 border-purple-500/30 hover:border-purple-400 cursor-pointer'
                      : isToday
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-neutral-950/40 border-neutral-800/60'
                  }`}
                  onClick={() => {
                    if (dayEvents.length > 0) setSelectedEvent(dayEvents[0]);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs ${
                      dayEvents.length > 0 ? 'font-bold text-purple-300' : isToday ? 'text-emerald-400 font-bold' : 'text-neutral-500'
                    }`}>
                      {day}
                    </span>
                    {isToday && <span className="text-[9px] text-emerald-400 font-mono">Today</span>}
                  </div>

                  {dayEvents.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {dayEvents.map(evt => (
                        <div key={evt.id} className="p-1 rounded bg-purple-950/70 border border-purple-500/30 text-[9px] text-purple-200 truncate">
                          {evt.type}: {evt.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAP VIEW */}
      {viewMode === 'map' && !selectedEvent && (
        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Interactive Community Location Map</h2>
              <p className="text-xs text-neutral-400">Click on venue pins to inspect Majlis venues across Mumbai & neighboring districts</p>
            </div>
            <span className="text-xs text-purple-400 font-mono">4 Verified Pins</span>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="relative h-96 w-full rounded-2xl bg-[#090d12] border border-neutral-800 overflow-hidden flex items-center justify-center p-4">
            {/* Grid pattern backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            <div className="relative w-full h-full max-w-xl flex flex-col justify-between p-4">
              
              {/* Pin 1: Mira Road (North) */}
              <div 
                onClick={() => setSelectedEvent(events[1])}
                className="absolute top-8 right-1/4 p-2 rounded-xl bg-neutral-900/90 border border-purple-500/60 shadow-xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-bold">
                  <MapPin className="w-4 h-4 text-purple-400 fill-purple-400/20 animate-bounce" />
                  <span>Mira Road (Youth Conclave)</span>
                </div>
                <p className="text-[10px] text-neutral-400">Al-Iman Educational Complex</p>
              </div>

              {/* Pin 2: Bandra (Central) */}
              <div 
                onClick={() => setSelectedEvent(events[2])}
                className="absolute top-1/2 left-1/3 p-2 rounded-xl bg-neutral-900/90 border border-purple-500/60 shadow-xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-bold">
                  <MapPin className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                  <span>Bandra (Mehfil-e-Adab)</span>
                </div>
                <p className="text-[10px] text-neutral-400">Cultural Pavilion</p>
              </div>

              {/* Pin 3: Kurla West */}
              <div 
                onClick={() => setSelectedEvent(events[3])}
                className="absolute top-2/3 right-1/3 p-2 rounded-xl bg-neutral-900/90 border border-purple-500/60 shadow-xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-bold">
                  <MapPin className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                  <span>Kurla (Blood Donation Camp)</span>
                </div>
                <p className="text-[10px] text-neutral-400">Imambargah Bab-ul-Hawaij</p>
              </div>

              {/* Pin 4: South Mumbai / Mughal Masjid */}
              <div 
                onClick={() => setSelectedEvent(events[0])}
                className="absolute bottom-6 left-1/4 p-2 rounded-xl bg-neutral-900/90 border border-purple-500/60 shadow-xl cursor-pointer hover:scale-105 transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-bold">
                  <MapPin className="w-4 h-4 text-purple-400 fill-purple-400/20 animate-pulse" />
                  <span>South Mumbai (Central Majlis)</span>
                </div>
                <p className="text-[10px] text-neutral-400">Mughal Masjid (Masjid-e-Irani)</p>
              </div>

            </div>

            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-xs text-[10px] text-neutral-400 font-mono">
              GPS: 18.96° N, 72.83° E (Mumbai Region)
            </div>
          </div>
        </div>
      )}

      {/* EVENT DETAIL VIEW */}
      {selectedEvent && (
        <div className="space-y-6">
          <button
            onClick={() => { setSelectedEvent(null); if (onClearGlobalSelection) onClearGlobalSelection(); }}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </button>

          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-8">
            
            {/* Hero image and title lockup */}
            <div className="rounded-2xl overflow-hidden relative h-56 sm:h-72 bg-neutral-800">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <span className="px-2.5 py-1 rounded bg-purple-950/80 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                    {selectedEvent.type}
                  </span>
                  <h1 className="font-display text-xl sm:text-3xl font-bold text-white leading-tight">
                    {selectedEvent.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{selectedEvent.venue} · {selectedEvent.address}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleRegister(selectedEvent.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 shadow-lg ${
                      selectedEvent.isRegistered
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-neutral-950'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{selectedEvent.isRegistered ? 'RSVP Confirmed' : 'Confirm RSVP / Attendance'}</span>
                  </button>

                  <button
                    onClick={() => onToggleSave(selectedEvent.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      selectedEvent.isSaved ? 'bg-purple-950 text-purple-300 border-purple-500/40' : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                    }`}
                    title="Save"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => alert(`Calendar invite generated: ${selectedEvent.title} on ${selectedEvent.date}`)}
                    className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                    title="Add to Google Calendar"
                  >
                    <CalendarPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase">Date & Timing</span>
                <p className="font-mono text-neutral-200 font-semibold mt-0.5">{selectedEvent.date}</p>
                <p className="text-[11px] text-purple-300">{selectedEvent.time}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase">Organizer Committee</span>
                <p className="text-neutral-200 font-semibold mt-0.5 truncate">{selectedEvent.organizer}</p>
                <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {selectedEvent.organizerContact}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase">Entry Arrangement</span>
                <p className="text-neutral-200 font-semibold mt-0.5">{selectedEvent.entryType}</p>
                <p className="text-[11px] text-emerald-400">All Community Members Welcome</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] text-neutral-500 uppercase">Attendance</span>
                <p className="font-mono text-neutral-200 font-semibold mt-0.5">
                  {selectedEvent.registeredCount} Confirmed
                </p>
                <p className="text-[11px] text-neutral-400">Capacity: {selectedEvent.capacity} attendees</p>
              </div>
            </div>

            {/* Description & Speakers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Description & Schedule */}
              <div className="md:col-span-2 space-y-6 text-xs sm:text-sm text-neutral-300">
                <div>
                  <h2 className="font-display text-base font-bold text-white mb-2">Program Overview</h2>
                  <p className="leading-relaxed text-neutral-300">{selectedEvent.description}</p>
                </div>

                {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                  <div>
                    <h2 className="font-display text-base font-bold text-white mb-3">Program Schedule</h2>
                    <div className="space-y-2">
                      {selectedEvent.schedule.map((slot, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3 text-xs">
                          <span className="font-mono text-purple-400 font-semibold w-20 shrink-0">{slot.time}</span>
                          <span className="text-neutral-200">{slot.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Col: Speakers / Zakirs / Reciters */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                    Honorary Speakers & Reciters
                  </h3>
                  {selectedEvent.speakers && selectedEvent.speakers.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEvent.speakers.map((spk, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 text-xs">
                          <p className="font-semibold text-white">{spk.name}</p>
                          <p className="text-[11px] text-purple-400">{spk.role}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500">Speakers to be announced by committee.</p>
                  )}
                </div>

                {/* Venue Navigation helper */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-purple-400" /> Venue Directions
                  </span>
                  <p className="text-neutral-400">{selectedEvent.address}</p>
                  <button
                    onClick={() => alert(`Directions opened: Navigating to ${selectedEvent.venue} via Maps.`)}
                    className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-purple-300 font-medium text-xs mt-1"
                  >
                    Open in Maps
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form 
            onSubmit={handleCreateSubmit}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-display text-base font-bold text-white">Host a Community Gathering</h3>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Event Title</label>
              <input
                type="text"
                required
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="e.g. Central Shab-e-Ashur Majlis"
                className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-neutral-400 block mb-1">Category</label>
                <select
                  value={newEventType}
                  onChange={(e) => setNewEventType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Majlis">Majlis</option>
                  <option value="Matam">Matam</option>
                  <option value="Azadari">Azadari</option>
                  <option value="Mehfil">Mehfil</option>
                  <option value="Education">Education</option>
                  <option value="Charity">Charity</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">City</label>
                <select
                  value={newEventCity}
                  onChange={(e) => setNewEventCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Mira Road">Mira Road</option>
                  <option value="Bandra">Bandra</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-neutral-400 block mb-1">Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Time</label>
                <input
                  type="text"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  placeholder="08:00 PM"
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Venue / Imambargah Name</label>
              <input
                type="text"
                required
                value={newEventVenue}
                onChange={(e) => setNewEventVenue(e.target.value)}
                placeholder="e.g. Mughal Masjid (Masjid-e-Irani)"
                className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Program Details & Speakers</label>
              <textarea
                rows={2}
                value={newEventDesc}
                onChange={(e) => setNewEventDesc(e.target.value)}
                placeholder="Discourse topics, Zakirs, Tabarruk arrangements..."
                className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                Publish Event
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
