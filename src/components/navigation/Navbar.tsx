import React, { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Search, 
  Bell, 
  User, 
  Sparkles, 
  Menu, 
  X, 
  CheckCircle2, 
  Award, 
  Bookmark, 
  Gamepad2, 
  ChevronDown,
  Building2,
  CalendarCheck,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { UserRole, UserProfile } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  unreadCount: number;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenLiveGame: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  setUser,
  unreadCount,
  onOpenSearch,
  onOpenNotifications,
  onOpenLiveGame
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { role: 'learner', label: 'Learner / Student', icon: <BookOpen className="w-4 h-4 text-emerald-400" />, desc: 'Explore courses & knowledge' },
    { role: 'jobseeker', label: 'Job Seeker', icon: <Briefcase className="w-4 h-4 text-amber-400" />, desc: 'Find careers & match resume' },
    { role: 'recruiter', label: 'Employer / Recruiter', icon: <Building2 className="w-4 h-4 text-blue-400" />, desc: 'Post jobs & hire talent' },
    { role: 'organizer', label: 'Event Organizer', icon: <CalendarCheck className="w-4 h-4 text-purple-400" />, desc: 'Manage Majlis & gatherings' },
    { role: 'admin', label: 'Platform Admin', icon: <ShieldAlert className="w-4 h-4 text-rose-400" />, desc: 'Supervise community network' }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
    setIsRoleMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'jobs', label: 'Jobs & Careers' },
    { id: 'events', label: 'Community Events' },
    { id: 'dashboard', label: 'My Dashboard' }
  ];

  return (
    <>
      {/* Top persistent header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setCurrentTab('home'); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
                <span>V</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-lg tracking-tight text-neutral-100 group-hover:text-emerald-400 transition-colors">
                    VIFAQ
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
                </div>
                <p className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase -mt-0.5">
                  Community Ecosystem
                </p>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-500/20'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={onOpenLiveGame}
              className="ml-2 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-lg hover:bg-amber-900/40 transition-colors flex items-center gap-1.5 group"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Live Quiz Bowl</span>
              <span className="px-1.5 py-0.2 bg-amber-500/20 rounded text-[9px] text-amber-300 font-mono">128 Live</span>
            </button>
          </nav>

          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-200 transition-colors"
              title="Search everything (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search platform</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 bg-neutral-950 rounded border border-neutral-800">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-neutral-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-300 bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="capitalize">{user.role}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Switch Active Persona
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => handleRoleSelect(r.role)}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                        user.role === r.role
                          ? 'bg-neutral-800 text-white'
                          : 'text-neutral-300 hover:bg-neutral-800/60'
                      }`}
                    >
                      <div className="mt-0.5">{r.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium flex items-center justify-between">
                          <span>{r.label}</span>
                          {user.role === r.role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </div>
                        <div className="text-[11px] text-neutral-400">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-neutral-800 hover:border-emerald-500/50 transition-colors focus:outline-none"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/30"
                  referrerPolicy="no-referrer"
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-neutral-900 border border-neutral-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 border-b border-neutral-800 mb-1">
                    <p className="text-xs font-semibold text-neutral-100">{user.name}</p>
                    <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-400">
                      <Flame className="w-3.5 h-3.5 fill-amber-400/20" />
                      <span>{user.streakDays} Day Community Streak</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <button
                      onClick={() => { setCurrentTab('dashboard'); setIsProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span>My Command Center</span>
                    </button>
                    <button
                      onClick={() => { setCurrentTab('profile'); setIsProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Professional Profile & CV</span>
                    </button>
                    <button
                      onClick={() => { setCurrentTab('education'); setIsProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                      <span>My Learning Progression</span>
                    </button>
                    <button
                      onClick={() => { setCurrentTab('jobs'); setIsProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                      <span>My Job Applications</span>
                    </button>
                    <button
                      onClick={() => { setCurrentTab('events'); setIsProfileDropdownOpen(false); }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>My Registered Events</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-neutral-200 rounded-lg border border-neutral-800"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-out nav drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { setCurrentTab(link.id); setIsMobileMenuOpen(false); }}
                  className={`p-2.5 text-xs font-medium rounded-lg text-left transition-colors ${
                    currentTab === link.id
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20'
                      : 'text-neutral-300 bg-neutral-900/60'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => { onOpenLiveGame(); setIsMobileMenuOpen(false); }}
                className="w-full py-2 px-3 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-lg flex items-center justify-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Join Live Multiplayer Quiz Bowl</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (WCAG Touch target >= 44px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800/80 px-2 py-1">
        <div className="grid grid-cols-5 gap-1">
          <button
            onClick={() => setCurrentTab('home')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
              currentTab === 'home' ? 'text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-md ${currentTab === 'home' ? 'bg-emerald-950/60' : ''}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentTab('education')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
              currentTab === 'education' ? 'text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-md ${currentTab === 'education' ? 'bg-emerald-950/60' : ''}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span>Learn</span>
          </button>

          <button
            onClick={() => setCurrentTab('jobs')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
              currentTab === 'jobs' ? 'text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-md ${currentTab === 'jobs' ? 'bg-emerald-950/60' : ''}`}>
              <Briefcase className="w-4 h-4" />
            </div>
            <span>Jobs</span>
          </button>

          <button
            onClick={() => setCurrentTab('events')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
              currentTab === 'events' ? 'text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-md ${currentTab === 'events' ? 'bg-emerald-950/60' : ''}`}>
              <Calendar className="w-4 h-4" />
            </div>
            <span>Events</span>
          </button>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
              currentTab === 'dashboard' ? 'text-emerald-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className={`p-1 rounded-md ${currentTab === 'dashboard' ? 'bg-emerald-950/60' : ''}`}>
              <User className="w-4 h-4" />
            </div>
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </>
  );
};
