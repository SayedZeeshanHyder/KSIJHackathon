import React, { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Award, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  MapPin, 
  Play, 
  Send, 
  TrendingUp, 
  FileCheck2, 
  Users,
  ShieldCheck,
  Building2,
  Bell,
  Swords,
  XCircle,
  Check,
  Lock,
  Plus,
  Rotate3d,
  Images
} from 'lucide-react';
import { UserProfile, Course, Job, CommunityEvent, JobApplication } from '../../types';
import { PhotosphereViewer } from '../events/PhotosphereViewer';

interface UnifiedDashboardProps {
  user: UserProfile;
  courses: Course[];
  jobs: Job[];
  events: CommunityEvent[];
  applications: JobApplication[];
  onNavigate: (tab: string) => void;
  onSelectCourse: (course: Course) => void;
  onSelectJob: (job: Job) => void;
  onSelectEvent: (event: CommunityEvent) => void;
  onOpenLiveGame: () => void;
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({
  user,
  courses,
  jobs,
  events,
  applications,
  onNavigate,
  onSelectCourse,
  onSelectJob,
  onSelectEvent,
  onOpenLiveGame
}) => {
  const [dashboardRoleView, setDashboardRoleView] = useState<'member' | 'venue_owner' | 'admin'>('member');

  // Venue Owner State
  const [venueBookings, setVenueBookings] = useState([
    {
      id: 'req_01',
      eventName: 'Nikah & Shadi Reception (Rizvi & Merchant Family)',
      date: '2026-10-24',
      timeSlot: 'Evening (17:30 — 22:00)',
      hostName: 'Mohd Jawad',
      phone: '+91 98200 12345',
      guests: '250 Guests',
      status: 'Confirmed'
    },
    {
      id: 'req_02',
      eventName: 'Ayyam-e-Fatimiyya 3-Day Majlis Series',
      date: '2026-11-04',
      timeSlot: 'Night (20:00 — 23:00)',
      hostName: 'Anjuman-e-Asgharia',
      phone: '+91 98199 87654',
      guests: '400 Guests',
      status: 'Pending Review'
    }
  ]);

  const [blockedDates, setBlockedDates] = useState<string[]>(['2026-10-25', '2026-10-31']);
  const [showVenuePhotosphere, setShowVenuePhotosphere] = useState(false);

  const handleApproveBooking = (id: string) => {
    setVenueBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
  };

  const handleRejectBooking = (id: string) => {
    setVenueBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
  };

  const handleToggleBlockDate = (date: string) => {
    setBlockedDates(prev => prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]);
  };

  const primaryCourse = courses[0];
  const registeredEvents = events.filter(e => e.isRegistered);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Personalized Greeting & Dashboard Mode Selector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 blur-[90px] pointer-events-none rounded-full" />

        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono">Assalamu Alaikum,</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 capitalize">
                {user.role} Active
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {user.name}
            </h1>
            <p className="text-xs text-neutral-400 max-w-md truncate">
              {user.headline}
            </p>
          </div>
        </div>

        {/* View Switcher Pills: Member vs Venue Owner vs Admin */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <div className="p-1 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center text-xs font-mono">
            <button
              onClick={() => setDashboardRoleView('member')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                dashboardRoleView === 'member'
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Member
            </button>
            <button
              onClick={() => setDashboardRoleView('venue_owner')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                dashboardRoleView === 'venue_owner'
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Venue Owner
            </button>
            <button
              onClick={() => setDashboardRoleView('admin')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                dashboardRoleView === 'admin'
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Admin Control
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-mono text-base font-bold">
                <Flame className="w-4 h-4 fill-amber-400/20" />
                <span>{user.streakDays}</span>
              </div>
              <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Day Streak</span>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[90px]">
              <p className="font-mono text-base font-bold text-emerald-400">1,690</p>
              <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: MEMBER DASHBOARD */}
      {dashboardRoleView === 'member' && (
        <div className="space-y-8">
          
          {/* Top 4 Summary Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Profile Completion */}
            <div 
              onClick={() => onNavigate('profile')}
              className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase">Profile Completion</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="font-mono text-2xl font-bold text-white">88%</p>
              <p className="text-[11px] text-neutral-400 mt-1">Ready for verified referral</p>
            </div>

            {/* Resume Score */}
            <div 
              onClick={() => onNavigate('jobs')}
              className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase">Resume ATS Score</span>
                <FileCheck2 className="w-4 h-4 text-amber-400" />
              </div>
              <p className="font-mono text-2xl font-bold text-white">82 / 100</p>
              <p className="text-[11px] text-neutral-400 mt-1">High Competitive Percentile</p>
            </div>

            {/* Knowledge Duel MMR */}
            <div 
              onClick={onOpenLiveGame}
              className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-semibold text-amber-400 uppercase">1-vs-1 Duel MMR</span>
                <Swords className="w-4 h-4 text-amber-400" />
              </div>
              <p className="font-mono text-2xl font-bold text-amber-300">1,520 MMR</p>
              <p className="text-[11px] text-neutral-400 mt-1">18 Duels · 14 Wins (78%)</p>
            </div>

            {/* Venue Subscriptions */}
            <div 
              onClick={() => onNavigate('events')}
              className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-400 mb-2">
                <span className="text-xs font-semibold text-purple-400 uppercase">Subscribed Venues</span>
                <Bell className="w-4 h-4 text-purple-400" />
              </div>
              <p className="font-mono text-2xl font-bold text-white">3</p>
              <p className="text-[11px] text-neutral-400 mt-1">Mughal Masjid, Noor Baug, Ashurkhana</p>
            </div>

          </div>

          {/* Main Dashboard Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Learning & Career Pipeline */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Universal Resume Scorer Widget */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-amber-400" />
                    <h2 className="font-display text-base font-bold text-white">Universal Resume Scanner & ATS Fit</h2>
                  </div>
                  <button
                    onClick={() => onNavigate('jobs')}
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">ATS Compatibility</span>
                    <p className="font-mono text-base font-bold text-white mt-0.5">18 / 20</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Keyword Match</span>
                    <p className="font-mono text-base font-bold text-white mt-0.5">16 / 20</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Experience Relevance</span>
                    <p className="font-mono text-base font-bold text-white mt-0.5">15 / 20</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Impact & Achievements</span>
                    <p className="font-mono text-base font-bold text-white mt-0.5">13 / 15</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Structure & Clarity</span>
                    <p className="font-mono text-base font-bold text-white mt-0.5">12 / 15</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Skills Alignment</span>
                    <p className="font-mono text-base font-bold text-white mt-0.5">8 / 10</p>
                  </div>
                </div>
              </div>

              {/* Learning Progress */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <h2 className="font-display text-base font-bold text-white">Continue Education</h2>
                  </div>
                  <button
                    onClick={() => onNavigate('education')}
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {primaryCourse && (
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                        {primaryCourse.qualification} · {primaryCourse.category}
                      </span>
                      <h3 className="font-semibold text-white text-sm">
                        {primaryCourse.title}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Next up: <strong>Module 03: Distributed Systems & Kafka Workflows</strong>
                      </p>
                      <div className="w-full max-w-sm pt-2">
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                          <span>Progress</span>
                          <span className="font-mono text-emerald-400 font-medium">{primaryCourse.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${primaryCourse.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectCourse(primaryCourse)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-colors shrink-0 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-neutral-950" />
                      <span>Resume Module</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Upcoming Registered Events & Subscribed Venues */}
            <div className="space-y-6">
              
              {/* Upcoming Programs */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <h2 className="font-display text-base font-bold text-white">Upcoming Programs</h2>
                  </div>
                  <button
                    onClick={() => onNavigate('events')}
                    className="text-xs text-purple-400 hover:underline cursor-pointer"
                  >
                    Calendar
                  </button>
                </div>

                <div className="space-y-3">
                  {events.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/40 cursor-pointer space-y-1.5 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-purple-400 text-[10px]">{evt.date}</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-mono">
                          {evt.type}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white leading-snug">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        <span>{evt.venue}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribed Venues List */}
              <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-purple-400" />
                  <span>Subscribed Community Centers</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Mughal Masjid (Masjid-e-Irani)</p>
                      <p className="text-[10px] text-neutral-400">Dongri, Mumbai · 680 Subscribers</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Noor Baug Shia Banquet Hall</p>
                      <p className="text-[10px] text-neutral-400">Dongri, Mumbai · 512 Subscribers</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">Badshahi Ashurkhana</p>
                      <p className="text-[10px] text-neutral-400">Hyderabad · 890 Subscribers</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: VENUE OWNER DASHBOARD */}
      {dashboardRoleView === 'venue_owner' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/20 font-bold">
                  VENUE OWNER CONSOLE
                </span>
                <h2 className="font-display font-bold text-2xl text-white mt-1">
                  Mughal Masjid & Community Hall Management
                </h2>
                <p className="text-xs text-neutral-400">
                  Manage incoming reservation requests, approve/reject bookings, manage date blocks, and broadcast updates to subscribers.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-center min-w-[100px]">
                  <p className="font-mono text-lg font-bold text-white">680</p>
                  <span className="text-[10px] text-neutral-400 uppercase">Subscribers</span>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-center min-w-[100px]">
                  <p className="font-mono text-lg font-bold text-emerald-400">14</p>
                  <span className="text-[10px] text-neutral-400 uppercase">Confirmed</span>
                </div>
              </div>
            </div>

            {/* Booking Requests Table */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">
                Incoming Event Reservation Requests:
              </h3>

              <div className="space-y-2.5">
                {venueBookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{b.eventName}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' : 'bg-amber-950 text-amber-400 border border-amber-500/20'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-neutral-400 font-mono">
                        Date: {b.date} · Slot: {b.timeSlot} · {b.guests}
                      </p>
                      <p className="text-neutral-400">
                        Host: {b.hostName} ({b.phone})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleApproveBooking(b.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Slot</span>
                        </button>
                      )}
                      {b.status !== 'Rejected' && (
                        <button
                          onClick={() => handleRejectBooking(b.id)}
                          className="px-3.5 py-1.5 bg-neutral-800 hover:bg-rose-950 hover:text-rose-400 text-neutral-300 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject / Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Blocking & Maintenance Calendar */}
            <div className="space-y-3 pt-3 border-t border-neutral-800">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">
                Block Dates for Maintenance or Trust Assemblies:
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {['2026-10-25', '2026-10-28', '2026-10-31', '2026-11-05'].map((d) => {
                  const isBlocked = blockedDates.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => handleToggleBlockDate(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isBlocked ? 'bg-rose-950/80 border border-rose-500/50 text-rose-300' : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Lock className="w-3 h-3" />
                      <span>{d} {isBlocked ? '(Blocked)' : '(Available)'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Media & 360° Photosphere Management */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Rotate3d className="w-4 h-4 text-amber-400" />
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-bold">
                    Venue Visuals & 360° Photosphere JPG Tour
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowVenuePhotosphere(prev => !prev)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Rotate3d className="w-3.5 h-3.5" />
                    <span>{showVenuePhotosphere ? 'Hide 360° Tour' : 'Test 360° Photosphere'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('events')}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Images className="w-3.5 h-3.5" />
                    <span>Manage Gallery & Photos</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">360° Photosphere</span>
                  <p className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active (Equirectangular JPG)</span>
                  </p>
                  <p className="text-[11px] text-neutral-400">Mughal Masjid Persian Courtyard</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">Gallery Photos</span>
                  <p className="font-bold text-white flex items-center gap-1">
                    <Images className="w-3.5 h-3.5 text-amber-400" />
                    <span>3 Attached Photos</span>
                  </p>
                  <p className="text-[11px] text-neutral-400">Exterior, Sanctuary, Courtyard</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">Virtual Tour Views</span>
                  <p className="font-bold text-amber-300 font-mono">1,240 Tours Taken</p>
                  <p className="text-[11px] text-neutral-400">+18% booking conversion</p>
                </div>
              </div>

              {/* Interactive Photosphere test canvas when toggled */}
              {showVenuePhotosphere && (
                <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl animate-in fade-in duration-200">
                  <PhotosphereViewer
                    src="/src/assets/images/mughal_masjid_mumbai_1791105448700.jpg"
                    title="Mughal Masjid Persian Courtyard 360° Photosphere"
                    venueName="Mughal Masjid (Masjid-e-Irani) ممبئی"
                    height="320px"
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* VIEW 3: ADMIN CONTROL & MODERATION DASHBOARD */}
      {dashboardRoleView === 'admin' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div>
                <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-500/20 font-bold">
                  ADMINISTRATIVE INFRASTRUCTURE
                </span>
                <h2 className="font-display font-bold text-2xl text-white mt-1">
                  Global Platform Moderation Console
                </h2>
                <p className="text-xs text-neutral-400">
                  Audit registered venues, approve job listings, configure Knowledge Duel question banks, and monitor reported content.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-neutral-950 border border-neutral-800 text-neutral-300">
                  Gemini Server Service: <strong>Online</strong>
                </span>
              </div>
            </div>

            {/* Admin Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 uppercase font-mono text-[10px]">Total Venues</span>
                <p className="font-mono text-xl font-bold text-white mt-0.5">6 Active</p>
                <span className="text-[10px] text-emerald-400">0 Pending Review</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 uppercase font-mono text-[10px]">Verified Jobs</span>
                <p className="font-mono text-xl font-bold text-white mt-0.5">8 Active</p>
                <span className="text-[10px] text-emerald-400">100% Sponsor Backed</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 uppercase font-mono text-[10px]">Duel Question Bank</span>
                <p className="font-mono text-xl font-bold text-white mt-0.5">48 Questions</p>
                <span className="text-[10px] text-amber-400">Nahjul Balagha & Sajjadiya</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 uppercase font-mono text-[10px]">Reported Content</span>
                <p className="font-mono text-xl font-bold text-emerald-400 mt-0.5">0 Items</p>
                <span className="text-[10px] text-neutral-400">Clean Community Feed</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button 
                onClick={() => alert('Question bank audited: All 48 questions verified against authentic texts.')}
                className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 cursor-pointer font-mono"
              >
                Audit Shia Question Bank
              </button>
              <button 
                onClick={() => alert('Broadcasting system bulletin to all subscribed venue trustees.')}
                className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 cursor-pointer font-mono"
              >
                Broadcast Trustee Bulletin
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
