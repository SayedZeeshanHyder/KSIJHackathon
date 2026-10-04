import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Sparkles, 
  Building, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  FileText, 
  Share2, 
  Bookmark, 
  Send, 
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  UserCheck,
  PlusCircle,
  ExternalLink,
  Filter,
  Check
} from 'lucide-react';
import { Job, JobApplication, Referral, UserProfile } from '../../types';

interface CareerViewProps {
  jobs: Job[];
  applications: JobApplication[];
  referrals: Referral[];
  user: UserProfile;
  selectedJobFromGlobal?: Job | null;
  onClearGlobalSelection?: () => void;
  onApplyJob: (job: Job, resumeName: string) => void;
  onAddJob?: (newJob: Job) => void;
}

export const CareerView: React.FC<CareerViewProps> = ({
  jobs,
  applications,
  referrals,
  user,
  selectedJobFromGlobal,
  onClearGlobalSelection,
  onApplyJob,
  onAddJob
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'ai_match' | 'referrals' | 'applications' | 'recruiter'>('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(selectedJobFromGlobal || null);
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [workplaceFilter, setWorkplaceFilter] = useState('All');
  
  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStep, setApplyStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedResume, setSelectedResume] = useState(user.resumeFileName || 'Ali_Raza_Merchant_CV_2026.pdf');
  const [coverNote, setCoverNote] = useState('');

  // AI Resume Match Simulation state
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadedResumeName, setUploadedResumeName] = useState(user.resumeFileName || 'Ali_Raza_Merchant_CV_2026.pdf');

  // Recruiter Post Job modal
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Mumbai');
  const [newJobSalary, setNewJobSalary] = useState('₹12L - ₹18L / year');

  const locations = ['All', 'Mumbai', 'Pune', 'Hyderabad', 'Delhi', 'Lucknow'];
  const workplaces = ['All', 'Remote', 'Hybrid', 'On-site'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLoc = locationFilter === 'All' || job.location.includes(locationFilter);
    const matchesWork = workplaceFilter === 'All' || job.workplaceType === workplaceFilter;

    return matchesSearch && matchesLoc && matchesWork;
  });

  const handleStartResumeAnalysis = () => {
    setIsAnalyzingResume(true);
    setAnalysisComplete(false);
    setTimeout(() => {
      setIsAnalyzingResume(false);
      setAnalysisComplete(true);
    }, 1800);
  };

  const handleInitiateApply = (job: Job) => {
    setSelectedJob(job);
    setApplyStep(1);
    setIsApplyModalOpen(true);
  };

  const handleFinalSubmitApplication = () => {
    if (!selectedJob) return;
    onApplyJob(selectedJob, selectedResume);
    setApplyStep(4);
  };

  const handleCreateNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle || !newJobCompany) return;

    const createdJob: Job = {
      id: `job_${Date.now()}`,
      title: newJobTitle,
      company: newJobCompany,
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&auto=format&fit=crop&q=80',
      location: newJobLocation,
      workplaceType: 'Hybrid',
      salary: newJobSalary,
      experience: '2+ Years',
      skills: ['React', 'TypeScript', 'Node.js'],
      postedTime: 'Just now',
      matchPercentage: 85,
      description: 'Exciting new opportunity posted directly by a verified community recruiter.',
      responsibilities: ['Architect scalable interfaces', 'Collaborate with cross-functional team'],
      requirements: ['Proven background in software development'],
      matchedSkills: ['React', 'TypeScript'],
      missingSkills: ['Kubernetes'],
      strengths: 'Matches technical foundations.',
      areasToImprove: 'Review cloud architecture.'
    };

    if (onAddJob) {
      onAddJob(createdJob);
    }
    setIsPostJobModalOpen(false);
    setNewJobTitle('');
    setNewJobCompany('');
    alert('Job published successfully to community marketplace!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Community Careers & Job Portal</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Find Opportunities That Match You.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Vetted corporate and tech positions, community referral matching, automated resume-job compatibility scoring, and transparent recruiter pipelines.
          </p>
        </div>

        {/* Action tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            All Openings
          </button>
          <button
            onClick={() => setActiveTab('ai_match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeTab === 'ai_match'
                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Resume Matcher</span>
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'referrals'
                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            Referral Network ({referrals.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'applications'
                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            My Applications ({applications.length})
          </button>
          
          {/* Recruiter View Toggle */}
          <button
            onClick={() => setActiveTab('recruiter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeTab === 'recruiter'
                ? 'bg-blue-950 text-blue-400 border border-blue-500/30'
                : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Recruiter Console</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ALL JOBS */}
      {activeTab === 'jobs' && !selectedJob && (
        <div className="space-y-6">
          
          {/* Search & Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search job title, skill (React, SQL, Python), or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>Location: {loc}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={workplaceFilter}
                onChange={(e) => setWorkplaceFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50"
              >
                {workplaces.map(w => (
                  <option key={w} value={w}>Type: {w}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="group p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 rounded-xl object-cover border border-neutral-800"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h3 className="font-display text-sm font-semibold text-white group-hover:text-amber-300">
                          {job.title}
                        </h3>
                        <p className="text-xs text-neutral-400">
                          {job.company} · {job.location} ({job.workplaceType})
                        </p>
                      </div>
                    </div>

                    {/* Resume Match Score Badge */}
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono font-bold shrink-0">
                      {job.matchPercentage}% Match
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {job.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded bg-neutral-800/80 text-[10px] text-neutral-300">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-mono text-neutral-200 font-semibold">{job.salary}</span>
                    <span className="text-[10px] text-neutral-500 block">Experience: {job.experience}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleInitiateApply(job); }}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="py-16 text-center text-neutral-400 space-y-2">
              <Briefcase className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-sm font-medium">No open positions match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setLocationFilter('All'); setWorkplaceFilter('All'); }}
                className="text-xs text-amber-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* JOB DETAIL VIEW */}
      {selectedJob && (
        <div className="space-y-6">
          <button
            onClick={() => { setSelectedJob(null); if (onClearGlobalSelection) onClearGlobalSelection(); }}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Job Listings</span>
          </button>

          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-8">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-800">
              <div className="flex items-start gap-4">
                <img
                  src={selectedJob.companyLogo}
                  alt={selectedJob.company}
                  className="w-14 h-14 rounded-2xl object-cover border border-neutral-800 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {selectedJob.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    {selectedJob.company} · {selectedJob.location} ({selectedJob.workplaceType})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-300">
                    <span className="font-mono text-amber-300 font-semibold">{selectedJob.salary}</span>
                    <span>·</span>
                    <span>Experience: {selectedJob.experience}</span>
                    <span>·</span>
                    <span className="text-neutral-500">Posted {selectedJob.postedTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleInitiateApply(selectedJob)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-amber-950/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply Now</span>
                </button>
                <button
                  onClick={() => alert(`Saved job: ${selectedJob.title}`)}
                  className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  title="Save Job"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Job link copied to clipboard!`)}
                  className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* AI Resume Compatibility Score Ring Box */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              <div className="flex items-center gap-4">
                {/* Visual percentage ring */}
                <div className="relative w-20 h-20 rounded-full bg-neutral-900 border-4 border-emerald-500/80 flex items-center justify-center shrink-0">
                  <div className="text-center">
                    <span className="font-mono text-xl font-bold text-emerald-400">
                      {selectedJob.matchPercentage}%
                    </span>
                    <span className="text-[9px] text-neutral-400 uppercase block -mt-1">Match</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-neutral-200">Your Resume Match</h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Evaluated against your profile ({user.name})
                  </p>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="space-y-1.5 text-xs">
                <p className="text-[11px] font-semibold text-emerald-400">Matched Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedJob.matchedSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px] border border-emerald-500/20">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-[11px] font-semibold text-amber-400">Missing / Desired Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {selectedJob.missingSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 text-[10px] border border-amber-500/20">
                      ⚠ {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Strengths & Improvement Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Strengths
                </span>
                <p className="text-neutral-300">{selectedJob.strengths}</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1">
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Recommendations
                </span>
                <p className="text-neutral-300">{selectedJob.areasToImprove}</p>
              </div>
            </div>

            {/* Job Description & Requirements */}
            <div className="space-y-6 text-xs sm:text-sm text-neutral-300">
              <div>
                <h2 className="font-display text-base font-bold text-white mb-2">Role Overview</h2>
                <p className="leading-relaxed text-neutral-300">{selectedJob.description}</p>
              </div>

              <div>
                <h2 className="font-display text-base font-bold text-white mb-2">Key Responsibilities</h2>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-300">
                  {selectedJob.responsibilities.map((r, idx) => (
                    <li key={idx} className="leading-relaxed">{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-base font-bold text-white mb-2">Qualifications & Experience</h2>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-300">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: AI RESUME MATCHER UI SIMULATOR */}
      {activeTab === 'ai_match' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white">
                AI Resume & Job Matcher
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upload your CV to parse your technical skills, experience metrics, and calculate compatibility against active community roles.
              </p>
            </div>

            {/* Upload Dropzone */}
            <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-dashed border-neutral-800 hover:border-amber-500/50 text-center space-y-3 transition-colors">
              <Upload className="w-8 h-8 text-neutral-500 mx-auto" />
              <div>
                <p className="text-xs font-semibold text-neutral-200">
                  Current Document: <span className="text-amber-400">{uploadedResumeName}</span>
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Supports PDF, DOCX up to 10MB</p>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={handleStartResumeAnalysis}
                  disabled={isAnalyzingResume}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs transition-colors shadow-lg"
                >
                  {isAnalyzingResume ? 'Scanning Resume Content...' : 'Run Compatibility Scan'}
                </button>
              </div>
            </div>

            {/* Scanning animation */}
            {isAnalyzingResume && (
              <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3 animate-pulse">
                <Sparkles className="w-6 h-6 text-amber-400 mx-auto animate-spin" />
                <p className="text-xs font-semibold text-neutral-200">
                  Extracting semantic embeddings and comparing keywords...
                </p>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div className="h-full bg-amber-400 rounded-full w-2/3 animate-pulse" />
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisComplete && (
              <div className="space-y-6 pt-4 border-t border-neutral-800 animate-in fade-in">
                
                {/* Score breakdown metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Overall Match</span>
                    <p className="font-mono text-xl font-bold text-emerald-400">82%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Skills Match</span>
                    <p className="font-mono text-xl font-bold text-white">85%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Experience Match</span>
                    <p className="font-mono text-xl font-bold text-white">72%</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase">Education Match</span>
                    <p className="font-mono text-xl font-bold text-white">90%</p>
                  </div>
                </div>

                {/* Keywords breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="font-semibold text-emerald-400">Matched High-Impact Keywords</span>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind', 'REST APIs'].map(k => (
                        <span key={k} className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px]">
                          ✓ {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                    <span className="font-semibold text-amber-400">Missing Keywords in Demand</span>
                    <div className="flex flex-wrap gap-1">
                      {['GraphQL', 'Docker', 'Kubernetes', 'AWS Lambda'].map(k => (
                        <span key={k} className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px]">
                          + {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-neutral-300 space-y-1">
                  <p className="font-semibold text-amber-300">Actionable Suggestions:</p>
                  <p>1. Add 1 or 2 bullet points under Experience detailing micro-services or API contracts.</p>
                  <p>2. Complete the Kafka & Distributed Systems course module on Vifaq to qualify for senior tier roles.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: REFERRAL NETWORK */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-white">Community Referral Directory</h2>
              <p className="text-xs text-neutral-400">Connect directly with vetted senior community members for warm internal referrals.</p>
            </div>
            <button
              onClick={() => alert('Referral sharing form opened: Post an internal referral slot from your workplace!')}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 font-medium"
            >
              Offer a Referral
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {referrals.map((ref) => (
              <div key={ref.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{ref.company}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    ref.status === 'Available' ? 'bg-emerald-950 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {ref.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-200">{ref.jobTitle}</h3>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Referrer: <strong>{ref.referrerName}</strong> ({ref.referrerRole})
                  </p>
                </div>
                <button
                  onClick={() => alert(`Referral request sent to ${ref.referrerName} for ${ref.jobTitle} at ${ref.company}!`)}
                  className="w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                >
                  Request Referral
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MY APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-white">Your Submitted Applications</h2>

          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden divide-y divide-neutral-800">
            {applications.map((app) => (
              <div key={app.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h3 className="font-semibold text-white text-sm">{app.jobTitle}</h3>
                  <p className="text-neutral-400 mt-0.5">{app.company} · Applied on {app.appliedDate}</p>
                  <p className="text-[10px] text-neutral-500 mt-1">Resume: {app.resumeName}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-medium ${
                    app.status === 'Shortlisted' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                    app.status === 'Interview' ? 'bg-purple-950 text-purple-400 border border-purple-500/30' :
                    'bg-neutral-800 text-neutral-300'
                  }`}>
                    {app.status}
                  </span>
                  <button
                    onClick={() => alert(`Status details for ${app.jobTitle}: Recruitment team has moved application to ${app.status}.`)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                  >
                    View Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: RECRUITER / EMPLOYER CONSOLE */}
      {activeTab === 'recruiter' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-white">Recruiter & Employer Console</h2>
              <p className="text-xs text-neutral-400">Post community vacancies, screen pre-matched candidates, and manage hiring stages.</p>
            </div>
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Job Opening</span>
            </button>
          </div>

          {/* Hiring stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase">Active Postings</span>
              <p className="font-mono text-xl font-bold text-white">4</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase">Applicants</span>
              <p className="font-mono text-xl font-bold text-emerald-400">38</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase">Shortlisted</span>
              <p className="font-mono text-xl font-bold text-amber-400">12</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 uppercase">Interviews Scheduled</span>
              <p className="font-mono text-xl font-bold text-purple-400">5</p>
            </div>
          </div>

          {/* Applicant Screening Table */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-neutral-800">
                <tr>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Role Applied</th>
                  <th className="p-4">Top Skills</th>
                  <th className="p-4">Resume Match</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                <tr>
                  <td className="p-4 font-semibold text-white">Ali Raza Merchant</td>
                  <td className="p-4">Senior Frontend Engineer</td>
                  <td className="p-4">React, TypeScript, Tailwind</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">88%</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">Shortlisted</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert('Opening Ali Raza Merchant candidate dossier')}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Review CV
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Fatima Kazi</td>
                  <td className="p-4">Backend Services Engineer</td>
                  <td className="p-4">Node.js, PostgreSQL, Docker</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">92%</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 text-[10px]">Interview</span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert('Opening Fatima Kazi candidate dossier')}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Review CV
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MULTI-STEP JOB APPLICATION MODAL */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase">
                  Step {applyStep} of 3
                </span>
                <h3 className="font-display text-base font-bold text-white">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-neutral-400">{selectedJob.company}</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Review Job Overview */}
            {applyStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <p className="font-semibold text-white">Position Snapshot:</p>
                  <p className="text-neutral-400">Compensation: <strong className="text-amber-300">{selectedJob.salary}</strong></p>
                  <p className="text-neutral-400">Location: {selectedJob.location} ({selectedJob.workplaceType})</p>
                  <p className="text-neutral-400">Experience required: {selectedJob.experience}</p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setApplyStep(2)}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
                  >
                    Next: Select Resume
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Resume */}
            {applyStep === 2 && (
              <div className="space-y-4 text-xs">
                <p className="text-neutral-300">Choose which verified resume to submit with this application:</p>

                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedResume(user.resumeFileName || 'Ali_Raza_Merchant_CV_2026.pdf')}
                    className="p-3 rounded-xl border border-amber-500/50 bg-neutral-950 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="font-medium text-white">{user.resumeFileName || 'Ali_Raza_Merchant_CV_2026.pdf'}</p>
                        <p className="text-[10px] text-neutral-500">Updated 2 days ago · Full-Stack Profile</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Optional note to hiring manager:</label>
                  <textarea
                    rows={2}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly state your motivation or community referral background..."
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setApplyStep(1)}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setApplyStep(3)}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
                  >
                    Review Application
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Application */}
            {applyStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <p className="font-semibold text-white">Review Summary:</p>
                  <p className="text-neutral-400">Applicant: <strong>{user.name}</strong></p>
                  <p className="text-neutral-400">Role: <strong>{selectedJob.title}</strong> at {selectedJob.company}</p>
                  <p className="text-neutral-400">Attached Resume: <span className="text-amber-400">{selectedResume}</span></p>
                  <p className="text-neutral-400">AI Compatibility: <span className="text-emerald-400 font-mono">{selectedJob.matchPercentage}%</span></p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setApplyStep(2)}
                    className="text-xs text-neutral-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinalSubmitApplication}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Submission Confirmation */}
            {applyStep === 4 && (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Application Submitted!</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Your profile and CV were delivered to the hiring team at <strong>{selectedJob.company}</strong>.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300">
                  Status: <span className="text-emerald-400 font-mono font-medium">Applied</span> · Notification alert registered.
                </div>
                <button
                  onClick={() => { setIsApplyModalOpen(false); setSelectedJob(null); setActiveTab('applications'); }}
                  className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs"
                >
                  View in My Applications
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* POST NEW JOB MODAL (RECRUITER) */}
      {isPostJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form 
            onSubmit={handleCreateNewJob}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-display text-base font-bold text-white">Post Community Job Opening</h3>
              <button type="button" onClick={() => setIsPostJobModalOpen(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Job Title</label>
              <input
                type="text"
                required
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-neutral-400 block mb-1">Company / Organization</label>
              <input
                type="text"
                required
                value={newJobCompany}
                onChange={(e) => setNewJobCompany(e.target.value)}
                placeholder="e.g. Apex Digital Systems"
                className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-neutral-400 block mb-1">Location</label>
                <select
                  value={newJobLocation}
                  onChange={(e) => setNewJobLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lucknow">Lucknow</option>
                </select>
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Salary Range</label>
                <input
                  type="text"
                  value={newJobSalary}
                  onChange={(e) => setNewJobSalary(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsPostJobModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold"
              >
                Publish Job
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
