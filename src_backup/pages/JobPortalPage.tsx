import React, { useState } from 'react';
import { COMMUNITY_JOBS, CommunityJob } from '../data/jobs';
import { JobApplicationModal } from '../components/JobApplicationModal';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Briefcase, 
  Building2, 
  MapPin, 
  Sparkles, 
  UserCheck, 
  ChevronRight, 
  CheckCircle2, 
  FileCheck2,
  GraduationCap
} from 'lucide-react';

interface JobPortalPageProps {
  onBackToHome: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

export const JobPortalPage: React.FC<JobPortalPageProps> = ({
  onBackToHome,
  user,
  onSignInClick,
  onSignOutClick
}) => {
  const [selectedJob, setSelectedJob] = useState<CommunityJob | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = ['All', 'Engineering', 'Audio & Studio', 'Media & Reels', 'Cloud & AI', 'Community Ops', 'Design & Arts'];

  const filteredJobs = COMMUNITY_JOBS.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#0A0C0E] font-sans antialiased">
      
      {/* 1. Job Portal Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(10,12,14,0.1)]">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 h-[76px] flex items-center justify-between">
          
          {/* Brand + Back Link */}
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
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4A525A] hover:text-[#E8913C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* User Sign In / Status */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-800 font-semibold">
                Alumni Referrals Active
              </span>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#0A0C0E] hidden sm:inline">
                  {user.name}
                </span>
                <button
                  onClick={onSignOutClick}
                  className="px-3.5 py-1.5 rounded-full text-xs font-sans text-[#78828A] hover:text-[#0A0C0E] border border-[rgba(10,12,14,0.12)] hover:border-[#0A0C0E] transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="px-4 py-1.5 rounded-full text-xs font-sans font-medium text-white bg-[#0A0C0E] hover:bg-[#E8913C] transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. Portal Hero Header */}
      <section className="bg-white border-b border-[rgba(10,12,14,0.08)] py-14 sm:py-20">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8913C] font-bold">
                ONE COMMUNITY // JOB & PLACEMENT PORTAL
              </p>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#0A0C0E] tracking-tight leading-[1.08]">
              Fresher Placements & Alumni Referrals.
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#4A525A] leading-relaxed">
              Explore curated entry-level and apprenticeship openings sponsored by community partners. Apply directly with verified alumni referral codes, and run your resume through our AI Match Scanner to receive instant fit percentages and actionable suggestions before submitting.
            </p>
          </div>

          {/* 3 Value Proposition Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 bg-[#F9FAFB] rounded-lg border border-[rgba(10,12,14,0.08)] space-y-2">
              <div className="w-8 h-8 rounded bg-white border border-[rgba(10,12,14,0.1)] flex items-center justify-center text-[#E8913C]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#0A0C0E]">
                100% Fresher & Graduate Roles
              </h3>
              <p className="font-sans text-xs text-[#4A525A] leading-relaxed">
                Roles tailored for 2024–2026 graduates and self-taught newcomers with dedicated senior mentors.
              </p>
            </div>

            <div className="p-5 bg-[#F9FAFB] rounded-lg border border-[rgba(10,12,14,0.08)] space-y-2">
              <div className="w-8 h-8 rounded bg-white border border-[rgba(10,12,14,0.1)] flex items-center justify-center text-[#2E6B72]">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#0A0C0E]">
                Direct Alumni Referral Priority
              </h3>
              <p className="font-sans text-xs text-[#4A525A] leading-relaxed">
                Every listing features a sponsor mentor and referral code that routes your application directly to hiring leads.
              </p>
            </div>

            <div className="p-5 bg-[#F9FAFB] rounded-lg border border-[rgba(10,12,14,0.08)] space-y-2">
              <div className="w-8 h-8 rounded bg-white border border-[rgba(10,12,14,0.1)] flex items-center justify-center text-[#E8913C]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#0A0C0E]">
                AI Resume Match & Edit Advice
              </h3>
              <p className="font-sans text-xs text-[#4A525A] leading-relaxed">
                Get an objective 0–100% match score with specific section edit advice to elevate your profile before applying.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Job Listings & Filter Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          {/* Search Bar & Department Filter Pills */}
          <div className="bg-white p-5 sm:p-6 rounded-lg border border-[rgba(10,12,14,0.08)] shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-[#0A0C0E]">
                  Browse Open Positions
                </span>
                <span className="px-2 py-0.5 bg-[#F5F6F8] rounded text-xs font-mono font-bold text-[#E8913C]">
                  {filteredJobs.length} available
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#78828A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search role, skills, or job number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[rgba(10,12,14,0.12)] rounded-md text-xs text-[#0A0C0E] placeholder:text-[#78828A] focus:outline-none focus:border-[#E8913C]"
                />
              </div>
            </div>

            {/* Department Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[rgba(10,12,14,0.06)]">
              <Filter className="w-3.5 h-3.5 text-[#78828A] shrink-0 mr-1" />
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedDept === dept
                      ? 'bg-[#0A0C0E] text-white'
                      : 'bg-[#F5F6F8] text-[#4A525A] hover:bg-gray-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg border border-[rgba(10,12,14,0.08)] py-16 text-center text-[#78828A] space-y-2">
                <Briefcase className="w-9 h-9 mx-auto text-gray-300" />
                <p className="text-sm font-medium text-[#0A0C0E]">No job positions matched your search query.</p>
                <button
                  onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
                  className="text-xs font-mono text-[#E8913C] hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-lg border border-[rgba(10,12,14,0.09)] hover:border-[#E8913C] transition-all hover:shadow-md p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer group"
                >
                  {/* Left Column: Job Info */}
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Clickable Job Number Badge */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                        className="font-mono text-xs font-bold px-3 py-1 rounded bg-[#0A0C0E] text-white group-hover:bg-[#E8913C] transition-colors"
                        title="Click to view full details and apply"
                      >
                        {job.jobNumber}
                      </button>
                      <span className="font-mono text-[11px] uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        {job.type}
                      </span>
                      <span className="font-sans text-xs px-2.5 py-0.5 rounded bg-[#F5F6F8] text-[#4A525A]">
                        {job.department}
                      </span>
                      <span className="text-xs text-[#78828A]">
                        · Posted {job.postedDate}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-2xl sm:text-2xl text-[#0A0C0E] group-hover:text-[#E8913C] transition-colors">
                      {job.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-5 text-xs text-[#4A525A]">
                      <span className="flex items-center gap-1.5 font-medium text-[#0A0C0E]">
                        <Building2 className="w-3.5 h-3.5 text-[#78828A]" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#78828A]" />
                        {job.location} ({job.workplace})
                      </span>
                      <span className="font-mono font-bold text-[#0A0C0E]">
                        {job.salary}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#4A525A] line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {job.requiredSkills.map(skill => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 bg-[#F9FAFB] border border-[rgba(10,12,14,0.08)] rounded text-[11px] font-mono text-[#4A525A]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Referral Partner & Apply CTA */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded text-left lg:text-right space-y-0.5 max-w-xs">
                      <div className="flex items-center lg:justify-end gap-1.5 text-xs font-bold text-[#0A0C0E]">
                        <UserCheck className="w-4 h-4 text-[#E8913C]" />
                        <span>{job.referralPartner}</span>
                      </div>
                      <p className="text-[11px] text-[#4A525A]">
                        Sponsor Mentor: <span className="font-semibold text-[#0A0C0E]">{job.mentorName}</span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                      }}
                      className="px-5 py-2.5 bg-[#0A0C0E] group-hover:bg-[#E8913C] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 transition-all shadow-sm"
                    >
                      <Sparkles className="w-4 h-4 text-[#E8913C] group-hover:text-white" />
                      <span>Apply & AI Scan Resume</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* 4. Portal Footer */}
      <footer className="bg-white border-t border-[rgba(10,12,14,0.1)] py-12">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-sm text-[#0A0C0E] hover:text-[#E8913C]"
            >
              ONE COMMUNITY
            </button>
            <span className="text-xs text-[#78828A]">© 2026 Career Guild & Fresher Placement Network</span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4A525A] hover:text-[#E8913C]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Site</span>
          </button>
        </div>
      </footer>

      {/* Job Application & AI Resume Scanner Modal */}
      <JobApplicationModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />

    </div>
  );
};
