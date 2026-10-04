import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Briefcase, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Course, Job, CommunityEvent } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  jobs: Job[];
  events: CommunityEvent[];
  onSelectCourse: (course: Course) => void;
  onSelectJob: (job: Job) => void;
  onSelectEvent: (event: CommunityEvent) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  jobs,
  events,
  onSelectCourse,
  onSelectJob,
  onSelectEvent
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'courses' | 'jobs' | 'events'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return courses.slice(0, 3);
    const q = query.toLowerCase();
    return courses.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.qualification.toLowerCase().includes(q)
    );
  }, [courses, query]);

  const filteredJobs = useMemo(() => {
    if (!query.trim()) return jobs.slice(0, 3);
    const q = query.toLowerCase();
    return jobs.filter(j => 
      j.title.toLowerCase().includes(q) || 
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q))
    );
  }, [jobs, query]);

  const filteredEvents = useMemo(() => {
    if (!query.trim()) return events.slice(0, 3);
    const q = query.toLowerCase();
    return events.filter(e => 
      e.title.toLowerCase().includes(q) || 
      e.city.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.organizer.toLowerCase().includes(q) ||
      e.type.toLowerCase().includes(q)
    );
  }, [events, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search across courses, jobs, Majlis & community gatherings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-neutral-400 bg-neutral-800 hover:bg-neutral-700 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-neutral-800/60 bg-neutral-950/50 text-xs">
          {(['all', 'courses', 'jobs', 'events'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-3 py-1 rounded-md capitalize transition-colors ${
                activeCategory === tab
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20 font-medium'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab === 'all' ? 'All Results' : tab}
            </button>
          ))}
        </div>

        {/* Search Results list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Courses */}
          {(activeCategory === 'all' || activeCategory === 'courses') && filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Education Courses
                </span>
                <span className="text-[11px] text-neutral-400">{filteredCourses.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {filteredCourses.map(course => (
                  <div
                    key={course.id}
                    onClick={() => { onSelectCourse(course); onClose(); }}
                    className="p-2.5 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 border border-neutral-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-300">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {course.instructor} · {course.category} · {course.duration}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs */}
          {(activeCategory === 'all' || activeCategory === 'jobs') && filteredJobs.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  Career Opportunities
                </span>
                <span className="text-[11px] text-neutral-400">{filteredJobs.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {filteredJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => { onSelectJob(job); onClose(); }}
                    className="p-2.5 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 border border-neutral-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-amber-300">
                          {job.title}
                        </h4>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          {job.matchPercentage}% match
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        {job.company} · {job.location} ({job.workplaceType}) · {job.salary}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {(activeCategory === 'all' || activeCategory === 'events') && filteredEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Community Events & Majalis
                </span>
                <span className="text-[11px] text-neutral-400">{filteredEvents.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {filteredEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => { onSelectEvent(event); onClose(); }}
                    className="p-2.5 rounded-xl bg-neutral-800/40 hover:bg-neutral-800 border border-neutral-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-purple-300">
                        {event.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {event.date} · {event.venue}, {event.city} · {event.type}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-400 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredCourses.length === 0 && filteredJobs.length === 0 && filteredEvents.length === 0 && (
            <div className="py-12 text-center text-neutral-400 space-y-2">
              <Sparkles className="w-8 h-8 text-neutral-400 mx-auto" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-neutral-400">Try searching for "React", "TypeScript", "Majlis", "Mumbai", or "FinTech"</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-neutral-800 bg-neutral-950/70 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Search entire community ecosystem</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
