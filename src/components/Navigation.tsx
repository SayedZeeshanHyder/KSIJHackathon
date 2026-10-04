import React, { useState } from 'react';
import { Search, Bell, Swords, LayoutDashboard, Shield } from 'lucide-react';

interface NavigationProps {
  user: { name: string; email: string; role?: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
  onNavigateSection: (id: string) => void;
  onOpenJobsPage?: () => void;
  onOpenEducationPage?: () => void;
  onOpenReelsPage?: () => void;
  onOpenEventsPage?: () => void;
  onOpenDuel?: () => void;
  onOpenNotifications?: () => void;
  onOpenSearch?: () => void;
  onOpenDashboard?: () => void;
  unreadNotificationsCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  user, 
  onSignInClick, 
  onSignOutClick, 
  onNavigateSection,
  onOpenJobsPage,
  onOpenEducationPage,
  onOpenReelsPage,
  onOpenEventsPage,
  onOpenDuel,
  onOpenNotifications,
  onOpenSearch,
  onOpenDashboard,
  unreadNotificationsCount = 3
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Events', id: 'events' },
    { label: 'Education', id: 'education' },
    { label: 'Knowledge Duel', id: 'duel' },
    { label: 'Jobs', id: 'jobs' },
    { label: 'Reels', id: 'reels' }
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'jobs' && onOpenJobsPage) {
      onOpenJobsPage();
    } else if (id === 'education' && onOpenEducationPage) {
      onOpenEducationPage();
    } else if (id === 'reels' && onOpenReelsPage) {
      onOpenReelsPage();
    } else if (id === 'events' && onOpenEventsPage) {
      onOpenEventsPage();
    } else if (id === 'duel' && onOpenDuel) {
      onOpenDuel();
    } else {
      onNavigateSection(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[76px] sm:h-[84px] bg-white/90 backdrop-blur-[16px] border-b border-[rgba(10,12,14,0.1)] transition-all">
      <div className="w-full max-w-[1680px] h-full mx-auto px-6 sm:px-14 lg:px-20 flex items-center justify-between">
        
        {/* Zone 1: Display wordmark with broader spacing */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
          className="font-display font-extrabold text-[17px] sm:text-[19px] tracking-[-0.025em] text-[#0A0C0E] flex items-center group focus:outline-none cursor-pointer"
        >
          <span className="group-hover:text-[#4A525A] transition-colors">ONE COMMUNITY</span>
          <span className="text-[#E8913C] ml-1 text-xl leading-none">.</span>
        </a>

        {/* Zone 2: Navigation Links (About, Events, Education, Knowledge Duel, Jobs, Reels) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleLinkClick(item.id); }}
              className="font-sans text-[11.5px] lg:text-[12px] uppercase tracking-[0.16em] font-medium text-[#4A525A] hover:text-[#E8913C] transition-colors relative py-2 group cursor-pointer"
            >
              <span>{item.label}</span>
              {item.id === 'duel' && (
                <span className="ml-1 px-1.5 py-0.2 rounded bg-amber-500/20 text-[#E8913C] text-[9px] font-mono font-bold">
                  LIVE
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E8913C] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Global Actions (Search, Notifications, Role, Sign In / Out) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          
          {/* Global Search Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full hover:bg-black/5 text-[#4A525A] hover:text-[#0A0C0E] transition-colors cursor-pointer"
              title="Search everything (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Centralized Notifications Bell */}
          {onOpenNotifications && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full hover:bg-black/5 text-[#4A525A] hover:text-[#0A0C0E] transition-colors cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E8913C] text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Authenticated Dashboard Button */}
          {user && onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F6F8] hover:bg-neutral-200 text-[#0A0C0E] text-[11px] font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-[rgba(10,12,14,0.08)]"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#E8913C]" />
              <span>Console</span>
            </button>
          )}

          {/* Member Authentication Status */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-[#4A525A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
                <span className="font-semibold text-[#0A0C0E]">{user.name}</span>
                {user.role && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#F5F6F8] text-[#78828A] border">
                    {user.role}
                  </span>
                )}
              </span>
              <button
                onClick={onSignOutClick}
                className="rounded-full border border-[rgba(10,12,14,0.3)] px-4 sm:px-6 py-1.5 sm:py-2 font-sans text-[11px] uppercase tracking-[0.16em] font-medium text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-all whitespace-nowrap cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onSignInClick}
              className="rounded-full border border-[rgba(10,12,14,0.3)] px-5 sm:px-7 py-2 sm:py-2.5 font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] font-medium text-[#0A0C0E] hover:border-[#E8913C] hover:text-[#E8913C] transition-all whitespace-nowrap cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0A0C0E] hover:text-[#E8913C] focus:outline-none font-mono text-xs uppercase cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? '[CLOSE]' : '[MENU]'}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[rgba(10,12,14,0.1)] px-8 py-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.id)}
              className="block w-full text-left font-sans text-xs uppercase tracking-[0.18em] font-medium text-[#4A525A] hover:text-[#E8913C] py-2 border-b border-[rgba(10,12,14,0.06)] cursor-pointer"
            >
              <span>{item.label}</span>
              {item.id === 'duel' && (
                <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-[#E8913C] text-[9px] font-mono font-bold">
                  LIVE 1v1
                </span>
              )}
            </button>
          ))}

          {onOpenDashboard && user && (
            <button
              onClick={() => { onOpenDashboard(); setIsMobileMenuOpen(false); }}
              className="block w-full text-left font-mono text-xs uppercase tracking-wider font-bold text-[#E8913C] py-2 border-b border-[rgba(10,12,14,0.06)] cursor-pointer"
            >
              Unified Dashboard
            </button>
          )}

          <div className="pt-2">
            {user ? (
              <div className="space-y-2">
                <p className="font-sans text-xs text-[#4A525A]">
                  Signed in as: <strong className="text-[#0A0C0E]">{user.name}</strong> ({user.role || 'END_USER'})
                </p>
                <button
                  onClick={() => { onSignOutClick(); setIsMobileMenuOpen(false); }}
                  className="w-full rounded-full border border-[rgba(10,12,14,0.3)] py-2 text-center font-sans text-xs uppercase tracking-[0.14em] text-[#0A0C0E] cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onSignInClick(); setIsMobileMenuOpen(false); }}
                className="w-full rounded-full border border-[#0A0C0E] bg-[#0A0C0E] text-white py-2 text-center font-sans text-xs uppercase tracking-[0.14em] cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
