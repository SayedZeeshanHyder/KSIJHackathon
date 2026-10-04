/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PortalHero } from './components/PortalHero';
import { StatementFold } from './components/StatementFold';
import { ThrowableDeck } from './components/ThrowableDeck';
import { RosterAndDates } from './components/RosterAndDates';
import { CloseSection } from './components/CloseSection';
import { OrderModal } from './components/OrderModal';
import { AuthModal } from './components/AuthModal';
import { FloatingSlideStrip } from './components/FloatingSlideStrip';
import { JobPortalPage } from './pages/JobPortalPage';
import { EducationPage } from './pages/EducationPage';
import { ReelsPage } from './pages/ReelsPage';
import { EventsPage } from './pages/EventsPage';
import { UnifiedDashboard } from './components/dashboard/UnifiedDashboard';
import { LiveKnowledgeGame } from './components/education/LiveKnowledgeGame';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { RELEASES, VinylRelease } from './data/releases';
import { 
  MOCK_COURSES, 
  MOCK_JOBS, 
  MOCK_EVENTS, 
  MOCK_APPLICATIONS, 
  MOCK_NOTIFICATIONS, 
  INITIAL_USER 
} from './data/mockData';
import { NotificationItem, Course, Job, CommunityEvent } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'jobs' | 'education' | 'reels' | 'events' | 'dashboard'>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (hash === '#jobs' || hash === '#jobs-portal' || path.startsWith('/jobs')) return 'jobs';
    if (hash === '#education' || hash === '#education-portal' || path.startsWith('/education')) return 'education';
    if (hash === '#reels' || hash === '#reels-portal' || path.startsWith('/reels')) return 'reels';
    if (hash === '#events' || hash === '#events-portal' || path.startsWith('/events')) return 'events';
    if (hash === '#dashboard' || path.startsWith('/dashboard')) return 'dashboard';
    return 'home';
  });

  const [selectedOrderRelease, setSelectedOrderRelease] = useState<VinylRelease | null>(null);
  const [currentUser, setCurrentUser] = useState<{ 
    name: string; 
    email: string; 
    role?: string;
    qualification?: string;
    educationField?: string;
    city?: string;
    skills?: string[];
  } | null>({
    name: 'Mohd Jawad',
    email: 'mohdjawad622@gmail.com',
    role: 'END_USER',
    qualification: 'Graduate (B.Tech / B.Sc)',
    educationField: 'Computer Science & Engineering',
    city: 'Mumbai',
    skills: ['React', 'TypeScript', 'Node.js', 'System Architecture']
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authToast, setAuthToast] = useState<string | null>(null);

  // Modals
  const [isDuelModalOpen, setIsDuelModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const heroImage = '/src/assets/images/record_label_hero_portal_1791098211379.jpg';
  const reelImage = '/src/assets/images/hero_community_ecosystem_1791097428797.jpg';

  // Listen to browser navigation (back/forward button, hashes)
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#jobs' || hash === '#jobs-portal' || path.startsWith('/jobs')) {
        setCurrentRoute('jobs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#education' || hash === '#education-portal' || path.startsWith('/education')) {
        setCurrentRoute('education');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#reels' || hash === '#reels-portal' || path.startsWith('/reels')) {
        setCurrentRoute('reels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#events' || hash === '#events-portal' || path.startsWith('/events')) {
        setCurrentRoute('events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#dashboard' || path.startsWith('/dashboard')) {
        setCurrentRoute('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openJobsPage = () => {
    setCurrentRoute('jobs');
    window.location.hash = '#jobs-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEducationPage = () => {
    setCurrentRoute('education');
    window.location.hash = '#education-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReelsPage = () => {
    setCurrentRoute('reels');
    window.location.hash = '#reels-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEventsPage = () => {
    setCurrentRoute('events');
    window.location.hash = '#events-portal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDashboard = () => {
    setCurrentRoute('dashboard');
    window.location.hash = '#dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentRoute('home');
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (id: string) => {
    if (id === 'jobs') {
      openJobsPage();
      return;
    }
    if (id === 'education') {
      openEducationPage();
      return;
    }
    if (id === 'reels') {
      openReelsPage();
      return;
    }
    if (id === 'events' || id === 'dates') {
      openEventsPage();
      return;
    }
    if (id === 'duel') {
      setIsDuelModalOpen(true);
      return;
    }

    if (currentRoute !== 'home') {
      backToHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignInSuccess = (user: { 
    name: string; 
    email: string; 
    role?: 'END_USER' | 'VENUE_OWNER' | 'EVENT_ORGANIZER' | 'JOB_POSTER' | 'ADMIN';
    qualification?: string;
    educationField?: string;
    city?: string;
    skills?: string[];
  }) => {
    setCurrentUser(user);
    setAuthToast(`Signed in as ${user.name} (${user.role || 'Member'})`);
    setTimeout(() => setAuthToast(null), 3000);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setAuthToast('Signed out successfully');
    setTimeout(() => setAuthToast(null), 3000);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // 1. If on the Job Portal Page
  if (currentRoute === 'jobs') {
    return (
      <div className="min-h-screen bg-[#FBFBFC]">
        <JobPortalPage
          onBackToHome={backToHome}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />
      </div>
    );
  }

  // 2. If on the Education Page
  if (currentRoute === 'education') {
    return (
      <div className="min-h-screen bg-[#FBFBFC]">
        <EducationPage
          onBackToHome={backToHome}
          onOpenReelsPage={openReelsPage}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />
      </div>
    );
  }

  // 3. If on the Reels Page
  if (currentRoute === 'reels') {
    return (
      <div className="min-h-screen bg-[#0A0C0E]">
        <ReelsPage
          onBackToHome={backToHome}
          onOpenEducationPage={openEducationPage}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />
      </div>
    );
  }

  // 4. If on the Events Page
  if (currentRoute === 'events') {
    return (
      <div className="min-h-screen bg-[#FBFBFC]">
        <EventsPage
          onBackToHome={backToHome}
          user={currentUser}
          onSignInClick={() => setIsAuthModalOpen(true)}
          onSignOutClick={handleSignOut}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleSignInSuccess}
        />
      </div>
    );
  }

  // 5. If on the Unified Dashboard Page
  if (currentRoute === 'dashboard') {
    const userProfileForDashboard = {
      ...INITIAL_USER,
      name: currentUser?.name || 'Mohd Jawad',
      email: currentUser?.email || 'mohdjawad622@gmail.com',
      role: (currentUser?.role?.toLowerCase() as any) || 'learner'
    };

    return (
      <div className="min-h-screen bg-[#0A0C0E] text-white">
        <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={backToHome}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Portal</span>
            </button>
            <span className="text-neutral-700">|</span>
            <span className="font-display font-bold text-sm text-white">
              ONE COMMUNITY DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDuelModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Play Knowledge Duel</span>
            </button>
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 text-neutral-400 hover:text-white"
            >
              Notifications
            </button>
          </div>
        </header>

        <UnifiedDashboard
          user={userProfileForDashboard}
          courses={MOCK_COURSES}
          jobs={MOCK_JOBS}
          events={MOCK_EVENTS}
          applications={MOCK_APPLICATIONS}
          onNavigate={(tab) => {
            if (tab === 'jobs') openJobsPage();
            else if (tab === 'education') openEducationPage();
            else if (tab === 'events') openEventsPage();
            else if (tab === 'reels') openReelsPage();
          }}
          onSelectCourse={() => openEducationPage()}
          onSelectJob={() => openJobsPage()}
          onSelectEvent={() => openEventsPage()}
          onOpenLiveGame={() => setIsDuelModalOpen(true)}
        />

        <LiveKnowledgeGame
          isOpen={isDuelModalOpen}
          onClose={() => setIsDuelModalOpen(false)}
          userName={currentUser?.name || 'Mohd Jawad'}
        />

        <NotificationCenter
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onSelectNotification={() => {}}
        />
      </div>
    );
  }

  // 6. Main Home Page (Identical design, typography, layout, animations preserved)
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0C0E] selection:bg-[#E8913C]/30 selection:text-[#0A0C0E] font-sans antialiased overflow-x-hidden">
      
      {/* 1. Broad Navigation with Sign In / Sign Out Pill Button & Global Actions */}
      <Navigation
        user={currentUser}
        onSignInClick={() => setIsAuthModalOpen(true)}
        onSignOutClick={handleSignOut}
        onNavigateSection={handleNavigateSection}
        onOpenJobsPage={openJobsPage}
        onOpenEducationPage={openEducationPage}
        onOpenReelsPage={openReelsPage}
        onOpenEventsPage={openEventsPage}
        onOpenDuel={() => setIsDuelModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDashboard={openDashboard}
        unreadNotificationsCount={notifications.filter(n => !n.isRead).length}
      />

      {/* Floating Auth Notification Toast */}
      {authToast && (
        <div className="fixed top-24 right-6 z-50 px-4 py-2 bg-[#0A0C0E] text-white text-xs font-sans rounded-full shadow-xl flex items-center gap-2 border border-[rgba(237,231,220,0.2)] animate-in fade-in slide-in-from-top-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          <span>{authToast}</span>
        </div>
      )}

      {/* 2. Portal Hero */}
      <PortalHero heroImage={heroImage} />

      {/* Floating Community Images (Full-bleed edge-to-edge right-to-left stream with zero white space) */}
      <section className="relative w-full bg-[#0A0C0E] py-0 overflow-hidden">
        {/* Sleek Header Bar */}
        <div className="w-full bg-[#0A0C0E] px-6 sm:px-14 lg:px-20 py-3.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white font-semibold">
              ONE COMMUNITY // LIVE IMAGE STREAM
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
            ← CONTINUOUS RIGHT-TO-LEFT STREAM · HOVER TO PAUSE
          </span>
        </div>
        {/* Full-bleed edge-to-edge image marquee */}
        <FloatingSlideStrip onSlideClick={handleNavigateSection} />
      </section>

      {/* 3. Statement Fold ("About Us" section with authentic mission and pillars) */}
      <StatementFold imageSrc={reelImage} />

      {/* 4. Releases (Two columns: headline/lede & physical throwable card deck) */}
      <ThrowableDeck
        releases={RELEASES}
        onOrderRelease={(release) => setSelectedOrderRelease(release)}
      />

      {/* 5. Roster & Tour Dates (Hairline-ruled artist rows and dates table) */}
      <RosterAndDates />

      {/* 6. Close Section (Headline, buttons, fine-print, footer, and cropped full-width wordmark) */}
      <CloseSection />

      {/* Order Vinyl Modal */}
      {selectedOrderRelease && (
        <OrderModal
          isOpen={!!selectedOrderRelease}
          onClose={() => setSelectedOrderRelease(null)}
          release={selectedOrderRelease}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleSignInSuccess}
      />

      {/* 1-vs-1 Knowledge Duel Modal */}
      <LiveKnowledgeGame
        isOpen={isDuelModalOpen}
        onClose={() => setIsDuelModalOpen(false)}
        userName={currentUser?.name || 'Mohd Jawad'}
      />

      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={(notif) => {
          if (notif.category === 'career') openJobsPage();
          else if (notif.category === 'events') openEventsPage();
          else if (notif.category === 'learning') openEducationPage();
        }}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={MOCK_COURSES}
        jobs={MOCK_JOBS}
        events={MOCK_EVENTS}
        onSelectCourse={() => { setIsSearchOpen(false); openEducationPage(); }}
        onSelectJob={() => { setIsSearchOpen(false); openJobsPage(); }}
        onSelectEvent={() => { setIsSearchOpen(false); openEventsPage(); }}
      />

    </div>
  );
}
