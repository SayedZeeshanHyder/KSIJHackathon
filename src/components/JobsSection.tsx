import React, { useState } from 'react';
import { COMMUNITY_JOBS, CommunityJob } from '../data/jobs';
import { 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  UserCheck, 
  Search,
  Filter
} from 'lucide-react';

interface JobsSectionProps {
  onSelectJob: (job: CommunityJob) => void;
}

export const JobsSection: React.FC<JobsSectionProps> = ({ onSelectJob }) => {
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
    <section id="jobs" className="relative w-full bg-[#FFFFFF] py-20 sm:py-24 border-b border-[rgba(10,12,14,0.08)]">
      <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[rgba(10,12,14,0.12)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#4A525A] font-semibold">
                ONE COMMUNITY // OPPORTUNITY DESK
              </p>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A0C0E] tracking-tight">
              Job Listings & Fresher Referrals.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4A525A] max-w-2xl leading-relaxed">
              Click any job number to review openings, apply through verified community alumni referrals, and scan your resume with AI for match score & editing suggestions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-[#F5F6F8] rounded border border-[rgba(10,12,14,0.08)] flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#E8913C]">{COMMUNITY_JOBS.length}</span>
              <span className="font-sans text-xs text-[#4A525A]">Active Openings</span>
            </div>
            <div className="px-4 py-2 bg-[#F5F6F8] rounded border border-[rgba(10,12,14,0.08)] flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-[#2E6B72]" />
              <span className="font-sans text-xs text-[#4A525A]">100% Fresher Referral Endorsed</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(10,12,14,0.08)]">
          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
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

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#78828A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by role, skill, or job #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F5F6F8] border border-[rgba(10,12,14,0.1)] rounded-full text-xs text-[#0A0C0E] placeholder:text-[#78828A] focus:outline-none focus:border-[#E8913C]"
            />
          </div>
        </div>

        {/* Job Listings Rows */}
        <div className="divide-y divide-[rgba(10,12,14,0.08)]">
          {filteredJobs.length === 0 ? (
            <div className="py-16 text-center text-[#78828A] space-y-2">
              <Briefcase className="w-8 h-8 mx-auto text-gray-300" />
              <p className="text-sm">No job openings found matching your filter criteria.</p>
              <button
                onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
                className="text-xs font-mono text-[#E8913C] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="py-6 sm:py-7 group cursor-pointer transition-colors hover:bg-[#F9FAFB] rounded px-3 sm:px-4 -mx-3 sm:-mx-4 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                {/* Left block: Job # pill + details */}
                <div className="space-y-2.5 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Clickable Job Number Pill */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectJob(job);
                      }}
                      className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#0A0C0E] text-white hover:bg-[#E8913C] transition-colors"
                      title="Click job number to open details and apply"
                    >
                      {job.jobNumber}
                    </button>
                    <span className="font-mono text-[11px] uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                      {job.type}
                    </span>
                    <span className="font-sans text-xs px-2 py-0.5 rounded bg-[#F5F6F8] text-[#4A525A]">
                      {job.department}
                    </span>
                    <span className="text-xs text-[#78828A]">
                      · {job.postedDate}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0A0C0E] group-hover:text-[#E8913C] transition-colors">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#4A525A]">
                    <span className="flex items-center gap-1 font-medium text-[#0A0C0E]">
                      <Building2 className="w-3.5 h-3.5 text-[#78828A]" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#78828A]" />
                      {job.location} ({job.workplace})
                    </span>
                    <span className="font-mono font-semibold text-[#0A0C0E]">
                      {job.salary}
                    </span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {job.requiredSkills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-white border border-[rgba(10,12,14,0.1)] rounded text-[10.5px] font-mono text-[#4A525A]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right block: Community Referral Badge & Apply CTA */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded text-left lg:text-right space-y-0.5 max-w-xs">
                    <div className="flex items-center lg:justify-end gap-1.5 text-[11px] font-bold text-[#0A0C0E]">
                      <UserCheck className="w-3.5 h-3.5 text-[#E8913C]" />
                      <span>{job.referralPartner}</span>
                    </div>
                    <p className="text-[10px] text-[#4A525A]">
                      Direct referral by <span className="font-semibold">{job.mentorName}</span>
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectJob(job);
                    }}
                    className="px-4 py-2 bg-[#0A0C0E] group-hover:bg-[#E8913C] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E8913C] group-hover:text-white" />
                    <span>Apply & AI Scan Resume</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
