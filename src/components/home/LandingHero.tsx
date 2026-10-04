import React from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  Gamepad2,
  Building,
  GraduationCap,
  MapPin,
  Flame,
  Star
} from 'lucide-react';
import { Course, Job, CommunityEvent } from '../../types';

interface LandingHeroProps {
  onNavigate: (tab: string) => void;
  featuredCourses: Course[];
  featuredJobs: Job[];
  featuredEvents: CommunityEvent[];
  onSelectCourse: (course: Course) => void;
  onSelectJob: (job: Job) => void;
  onSelectEvent: (event: CommunityEvent) => void;
  onOpenLiveGame: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigate,
  featuredCourses,
  featuredJobs,
  featuredEvents,
  onSelectCourse,
  onSelectJob,
  onSelectEvent,
  onOpenLiveGame
}) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-900/20 via-amber-900/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">The Unified Shia Community Super Platform</span>
              <span className="text-neutral-600">·</span>
              <span className="text-amber-400 font-medium">Edition 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Learn. Build Your Career.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Stay Connected.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              One community platform to learn new skills, discover vetted career opportunities, and participate in the spiritual, cultural, and educational gatherings that matter to you.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('education')}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 group"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-medium text-sm border border-neutral-800 transition-all flex items-center gap-2"
              >
                <span>Open Command Center</span>
              </button>
            </div>

            {/* Quick interactive Live Game prompt */}
            <div className="pt-2">
              <button
                onClick={onOpenLiveGame}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs text-amber-300 hover:bg-amber-900/40 transition-colors"
              >
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Join Live Multiplayer Quiz Bowl:</span>
                <span>128 players in lobby right now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Three Ecosystem Pillars Visual Mockup */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            <div className="p-3 sm:p-5 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl shadow-2xl">
              
              <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800/60 mb-4 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-[11px] text-neutral-400 ml-2">vifaq-ecosystem-interconnect.sys</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Live Interconnected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Pillar 1: Education */}
                <div 
                  onClick={() => onNavigate('education')}
                  className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-emerald-500/40 cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                      Pillar 01
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-100 group-hover:text-emerald-300 mb-1.5">
                    Education & LMS
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Structured modular courses, verified certification tracks, curated lectures, and live multiplayer knowledge games.
                  </p>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">Current Progress</span>
                      <span className="text-emerald-400 font-mono font-medium">65% Completed</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-[65%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Pillar 2: Careers */}
                <div 
                  onClick={() => onNavigate('jobs')}
                  className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-amber-500/40 cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-amber-400 font-mono bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/20">
                      Pillar 02
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-100 group-hover:text-amber-300 mb-1.5">
                    Careers & Jobs
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    High-trust job board, automated resume matching algorithms, internal referrals, and recruiter pipelines.
                  </p>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">Your Resume Match</span>
                      <span className="text-amber-400 font-mono font-medium">88% Match Score</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                      <span className="text-emerald-400 font-medium">✓ React</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-medium">✓ TypeScript</span>
                      <span>·</span>
                      <span className="text-amber-400 font-medium">⚠ GraphQL</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 3: Events */}
                <div 
                  onClick={() => onNavigate('events')}
                  className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-purple-500/40 cursor-pointer group transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] text-purple-400 font-mono bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/20">
                      Pillar 03
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-neutral-100 group-hover:text-purple-300 mb-1.5">
                    Community Events
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    Unified calendar for Majlis, Azadari, Mehfil, Matam, charity drives, and career mentorship summits.
                  </p>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">Next Upcoming Majlis</span>
                      <span className="text-purple-400 font-medium">Mughal Masjid</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate">
                      Maulana Syed Ali Raza Rizvi · Oct 10
                    </p>
                  </div>
                </div>

              </div>

              {/* Ecosystem Interconnection Banner */}
              <div className="mt-4 pt-3 border-t border-neutral-800/70 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cycle of Progress:</span>
                  <span className="text-neutral-200 font-medium">LEARN → GROW → CONNECT → PARTICIPATE</span>
                </span>
                <span className="text-[11px] text-neutral-400">Integrated Profile · Single Identity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
            <p className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              12,400+
            </p>
            <p className="text-xs text-neutral-400 font-medium">Active Learners</p>
            <p className="text-[11px] text-emerald-400">Across 18 Cities</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
            <p className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              85+
            </p>
            <p className="text-xs text-neutral-400 font-medium">Accredited Courses</p>
            <p className="text-[11px] text-emerald-400">STEM & Islamic Studies</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
            <p className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              420+
            </p>
            <p className="text-xs text-neutral-400 font-medium">Job Opportunities</p>
            <p className="text-[11px] text-amber-400">With Referral Network</p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center space-y-1">
            <p className="font-display text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              1,280+
            </p>
            <p className="text-xs text-neutral-400 font-medium">Community Gatherings</p>
            <p className="text-[11px] text-purple-400">Majalis, Mehfils & Drives</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Architecture of Empowerment
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
            How The Ecosystem Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            A seamless cycle where personal education fuels career growth, and career success gives back to community programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-200 font-mono text-sm font-bold flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">Create Your Profile</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Set up your verified community identity, academic qualifications, and career goals in minutes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-200 font-mono text-sm font-bold flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">Choose Interests</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Select between STEM tech tracks, competitive exams, Islamic jurisprudence, or job alerts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-200 font-mono text-sm font-bold flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">Learn & Apply</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Take modular lessons, test yourself in live quiz bowls, and apply to vetted jobs with referral backing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 relative">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-neutral-200 font-mono text-sm font-bold flex items-center justify-center mb-4">
              04
            </div>
            <h3 className="text-sm font-semibold text-neutral-100 mb-1">Participate in Events</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Attend local Majlis, literary Mehfils, and volunteer mentorship camps to give back to the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Content Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Featured Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Top Rated Courses
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                Popular Learning Modules
              </h2>
            </div>
            <button
              onClick={() => onNavigate('education')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredCourses.slice(0, 2).map(course => (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group p-4 sm:p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-emerald-500/40 cursor-pointer transition-all flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-neutral-800 shrink-0 relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-[10px] text-emerald-300 font-mono">
                    {course.qualification}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
                      <span>{course.category}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {course.rating}
                      </span>
                      <span>·</span>
                      <span>{course.duration}</span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-white group-hover:text-emerald-300 leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">{course.instructor}</span>
                    <span className="font-medium text-emerald-400 flex items-center gap-1">
                      <span>Start Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Career Opportunities
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                High-Match Jobs & Roles
              </h2>
            </div>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>Explore All Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredJobs.slice(0, 2).map(job => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="group p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-amber-300">
                        {job.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {job.company} · {job.location} ({job.workplaceType})
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono font-medium shrink-0">
                      {job.matchPercentage}% match
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {job.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-neutral-800/80 text-[10px] text-neutral-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 font-medium">{job.salary}</span>
                  <span className="text-amber-400 font-medium flex items-center gap-1">
                    <span>View & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Community Calendar
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                Upcoming Majlis & Programs
              </h2>
            </div>
            <button
              onClick={() => onNavigate('events')}
              className="text-xs font-medium text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredEvents.slice(0, 2).map(evt => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="group p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-purple-500/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-[10px] text-purple-300 font-medium">
                      {evt.type}
                    </span>
                    <span className="text-[11px] text-neutral-400">{evt.distance}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-purple-300">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    <span>{evt.venue}, {evt.city}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-mono">{evt.date}</span>
                  <span className="text-purple-400 font-medium flex items-center gap-1">
                    <span>Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 blur-[100px] pointer-events-none rounded-full" />
          
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Be Part of a Community That Helps You{' '}
            <span className="text-emerald-400">Learn, Grow and Connect.</span>
          </h2>
          
          <p className="text-neutral-400 text-sm max-w-xl mx-auto leading-relaxed">
            Join thousands of students, working professionals, scholars, and organizers driving our community forward together.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/50"
            >
              Join the Community
            </button>
            <button
              onClick={() => onNavigate('education')}
              className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium transition-colors"
            >
              Browse Education Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
