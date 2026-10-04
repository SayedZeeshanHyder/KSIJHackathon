import React, { useState } from 'react';
import { CommunityJob } from '../data/jobs';
import { 
  analyzeResumeWithAI, 
  ResumeAnalysisResult, 
  SAMPLE_RESUMES 
} from '../services/resumeAnalyzer';
import { 
  X, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Copy, 
  Check, 
  FileText,
  UserCheck,
  Building2,
  MapPin,
  Banknote,
  Send,
  RefreshCw
} from 'lucide-react';

interface JobApplicationModalProps {
  job: CommunityJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  isOpen,
  onClose
}) => {
  if (!isOpen || !job) return null;

  // Form State
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [graduationYear, setGraduationYear] = useState('2025');
  const [institution, setInstitution] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [referralCode, setReferralCode] = useState(job.referralCode);
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  // AI Scanner State
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Application Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setResumeText(content || `Extracted text from ${file.name}`);
      setAnalysis(null);
    };
    reader.readAsText(file);
  };

  // Load sample resume for fast demonstration
  const handleLoadSample = (sampleKey: keyof typeof SAMPLE_RESUMES) => {
    const text = SAMPLE_RESUMES[sampleKey];
    setResumeText(text);
    setFileName(sampleKey === 'cs_fresher' ? 'Zayn_Ahmad_CS_Fresher_Resume.pdf' : 'Sarah_M_Junior_Resume.docx');
    setCandidateName(sampleKey === 'cs_fresher' ? 'Zayn Ahmad' : 'Sarah M.');
    setCandidateEmail(sampleKey === 'cs_fresher' ? 'zayn.ahmad@example.com' : 'sarah.m@example.com');
    setInstitution(sampleKey === 'cs_fresher' ? 'University of London' : 'Berlin Free University');
    setAnalysis(null);
  };

  // Run AI Resume Scanner
  const handleScanResume = async () => {
    if (!resumeText.trim()) return;
    setIsScanning(true);
    try {
      const result = await analyzeResumeWithAI(resumeText, job);
      setAnalysis(result);
    } finally {
      setIsScanning(false);
    }
  };

  // Submit Application
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail || !resumeText) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationId(`OC-REF-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const copySummaryToClipboard = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis.tailoredFresherSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white text-[#0A0C0E] border border-[rgba(10,12,14,0.14)] rounded-lg shadow-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-start justify-between p-6 sm:p-8 bg-[#F5F6F8] border-b border-[rgba(10,12,14,0.1)]">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#0A0C0E] text-white">
                {job.jobNumber}
              </span>
              <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-[#E8913C]/15 text-[#E8913C] font-semibold">
                {job.type}
              </span>
              <span className="font-sans text-xs px-2.5 py-0.5 rounded bg-white border border-[rgba(10,12,14,0.1)] text-[#4A525A]">
                {job.department}
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0C0E]">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A525A] pt-1">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#78828A]" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#78828A]" />
                {job.location} ({job.workplace})
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#0A0C0E]">
                <Banknote className="w-3.5 h-3.5 text-[#E8913C]" />
                {job.salary}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#78828A] hover:text-[#0A0C0E] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Screen after application */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E8913C] font-semibold">
                APPLICATION & REFERRAL VERIFIED
              </span>
              <h3 className="font-display font-bold text-2xl text-[#0A0C0E]">
                Application Successfully Submitted!
              </h3>
              <p className="font-sans text-sm text-[#4A525A]">
                Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been logged with reference ID <span className="font-mono font-bold text-[#0A0C0E]">{applicationId}</span>.
              </p>
            </div>

            <div className="bg-[#F5F6F8] border border-[rgba(10,12,14,0.1)] rounded p-5 max-w-md mx-auto text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0A0C0E]">
                <UserCheck className="w-4 h-4 text-[#E8913C]" />
                <span>Alumni Referral Assigned:</span>
              </div>
              <p className="font-sans text-xs text-[#4A525A]">
                <strong>{job.mentorName}</strong> ({job.mentorTitle}) has received your resume and AI match score ({analysis?.matchPercentage || 74}%). They will endorse your profile directly with the hiring manager.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0A0C0E] text-white text-xs font-medium uppercase tracking-[0.14em] rounded hover:bg-[#E8913C] transition-colors"
            >
              Back to Job Directory
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            
            {/* Community Referral Banner */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                    Fresher Referral Program Available
                  </h4>
                  <p className="font-sans text-xs text-[#4A525A]">
                    Endorsed by: <span className="font-semibold">{job.referralPartner}</span> · Sponsor Mentor: <span className="font-semibold">{job.mentorName}</span>
                  </p>
                </div>
              </div>
              <div className="font-mono text-xs px-2.5 py-1 bg-white border border-amber-500/40 rounded text-[#0A0C0E] shrink-0 self-start sm:self-auto">
                CODE: {job.referralCode}
              </div>
            </div>

            {/* Two Columns: Left (Requirements) & Right (Form + AI Scanner) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Job Overview & Requirements */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#78828A] mb-2">
                    Role Overview
                  </h4>
                  <p className="font-sans text-xs text-[#4A525A] leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#78828A] mb-2">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-1.5 font-sans text-xs text-[#4A525A]">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#E8913C] font-bold">―</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#78828A] mb-2">
                    Core Skills Evaluated by AI
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-[#F5F6F8] border border-[rgba(10,12,14,0.1)] rounded text-[11px] font-mono text-[#0A0C0E]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#78828A] mb-1">
                    Fresher Eligibility
                  </h4>
                  <p className="font-sans text-xs text-[#4A525A] leading-relaxed italic">
                    {job.fresherEligibility}
                  </p>
                </div>
              </div>

              {/* Right Column: Application Form with Resume Upload & AI Scanner */}
              <div className="lg:col-span-7 space-y-6 bg-[#FAFAFA] p-5 sm:p-6 border border-[rgba(10,12,14,0.1)] rounded-lg">
                <div className="flex items-center justify-between border-b border-[rgba(10,12,14,0.1)] pb-3">
                  <h3 className="font-display font-bold text-lg text-[#0A0C0E] flex items-center gap-2">
                    <span>Fresher Referral Application</span>
                  </h3>
                  <span className="text-[11px] font-sans text-[#78828A]">
                    Step 1 of 2
                  </span>
                </div>

                {/* Candidate Info Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs font-medium text-[#0A0C0E]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zayn Ahmad"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-medium text-[#0A0C0E]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-medium text-[#0A0C0E]">
                      Graduation Year
                    </label>
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                    >
                      <option value="2026">2026 (Final Year)</option>
                      <option value="2025">2025 (Recent Graduate)</option>
                      <option value="2024">2024 (Early Career)</option>
                      <option value="Self-Taught">Self-Taught / Bootcamp</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs font-medium text-[#0A0C0E]">
                      University / Institution
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. University of London"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                    />
                  </div>
                </div>

                {/* Resume Upload & AI Scan Section */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E8913C]" />
                      <span>Upload Resume for AI Match & Feedback *</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#78828A]">Quick Demo:</span>
                      <button
                        type="button"
                        onClick={() => handleLoadSample('cs_fresher')}
                        className="text-[10px] font-mono text-[#E8913C] hover:underline"
                      >
                        Sample (~80%)
                      </button>
                      <span className="text-[10px] text-[#78828A]">·</span>
                      <button
                        type="button"
                        onClick={() => handleLoadSample('fresher_minimal')}
                        className="text-[10px] font-mono text-[#E8913C] hover:underline"
                      >
                        Sample (~45%)
                      </button>
                    </div>
                  </div>

                  {/* Drag-and-drop or Browse */}
                  <div className="relative border-2 border-dashed border-[rgba(10,12,14,0.2)] hover:border-[#E8913C] rounded-lg p-5 text-center bg-white transition-colors">
                    <input
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-[#F5F6F8] flex items-center justify-center text-[#4A525A]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-[#4A525A]">
                        {fileName ? (
                          <span className="font-medium text-[#0A0C0E] flex items-center gap-1">
                            <FileText className="w-4 h-4 text-[#E8913C]" />
                            {fileName}
                          </span>
                        ) : (
                          <>
                            <span className="font-semibold text-[#0A0C0E]">Click to upload</span> or drag and drop your resume
                            <p className="text-[10.5px] text-[#78828A]">PDF, DOCX, or TXT</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Resume Text preview / paste fallback */}
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-sans text-[#78828A]">
                      Resume Text Preview (editable):
                    </label>
                    <textarea
                      rows={3}
                      value={resumeText}
                      onChange={(e) => {
                        setResumeText(e.target.value);
                        setAnalysis(null);
                      }}
                      placeholder="Or paste your resume text directly here..."
                      className="w-full px-3 py-2 bg-white border border-[rgba(10,12,14,0.15)] rounded text-xs font-mono text-[#0A0C0E] focus:outline-none focus:border-[#E8913C]"
                    />
                  </div>

                  {/* Trigger AI Scanner Button */}
                  <button
                    type="button"
                    onClick={handleScanResume}
                    disabled={isScanning || !resumeText.trim()}
                    className={`w-full py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isScanning || !resumeText.trim()
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#0A0C0E] hover:bg-[#E8913C] text-white shadow-md'
                    }`}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#E8913C]" />
                        <span>AI Scanning Resume against {job.jobNumber} requirements...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#E8913C]" />
                        <span>Scan Resume with AI & Get Recommendations</span>
                      </>
                    )}
                  </button>
                </div>

                {/* AI RECOMMENDATION & MATCH FEEDBACK CARD */}
                {analysis && (
                  <div className="p-5 bg-white border-2 border-[rgba(10,12,14,0.12)] rounded-lg space-y-5 animate-in fade-in slide-in-from-top-3">
                    
                    {/* Score Gauge Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-[rgba(10,12,14,0.1)]">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#78828A]">
                          AI MATCH SCORE
                        </span>
                        <h4 className="font-display font-bold text-xl text-[#0A0C0E]">
                          {analysis.headline}
                        </h4>
                      </div>
                      
                      {/* Radial Badge */}
                      <div className={`px-4 py-2 rounded-lg border text-center ${
                        analysis.matchPercentage >= 70 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                      }`}>
                        <span className="font-display font-black text-2xl leading-none">
                          {analysis.matchPercentage}%
                        </span>
                        <span className="block font-mono text-[9px] uppercase tracking-wider font-semibold">
                          {analysis.matchGrade} Match
                        </span>
                      </div>
                    </div>

                    {/* Referral Endorsement Status */}
                    <div className="p-3 bg-[#F5F6F8] rounded border border-[rgba(10,12,14,0.08)] flex items-start gap-2.5">
                      <UserCheck className="w-4 h-4 text-[#E8913C] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-sans text-xs font-semibold text-[#0A0C0E]">
                          {analysis.referralEndorsement.status}
                        </p>
                        <p className="font-sans text-[11px] text-[#4A525A]">
                          {analysis.referralEndorsement.advice}
                        </p>
                      </div>
                    </div>

                    {/* Matched vs Missing Skills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1.5 p-3 bg-emerald-50/50 rounded border border-emerald-200">
                        <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Matched Competencies ({analysis.matchedSkills.length})
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {analysis.matchedSkills.slice(0, 6).map(s => (
                            <span key={s} className="px-1.5 py-0.5 bg-white border border-emerald-300 rounded text-[10px] text-emerald-900 font-mono">
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5 p-3 bg-amber-50/50 rounded border border-amber-200">
                        <span className="font-mono text-[10px] uppercase font-bold text-amber-800 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Missing Target Skills ({analysis.missingSkills.length})
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {analysis.missingSkills.slice(0, 6).map(s => (
                            <span key={s} className="px-1.5 py-0.5 bg-white border border-amber-300 rounded text-[10px] text-amber-900 font-mono">
                              + {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step-by-Step AI Resume Edit Suggestions */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E8913C]" />
                        <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-[#0A0C0E]">
                          Suggested Resume Edits to Increase Match to 85%+
                        </h5>
                      </div>

                      <div className="space-y-2">
                        {analysis.actionableSuggestions.map((item, idx) => (
                          <div key={idx} className="p-3 bg-[#F9FAFB] rounded border border-[rgba(10,12,14,0.08)] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-[#0A0C0E]">
                                {item.section}
                              </span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                                item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {item.priority} Priority
                              </span>
                            </div>
                            <p className="font-sans text-xs text-[#4A525A]">
                              {item.suggestion}
                            </p>
                            <p className="font-mono text-[10.5px] text-[#2E6B72] bg-white p-1.5 rounded border border-[rgba(10,12,14,0.06)]">
                              Example: "{item.example}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI-Generated Tailored Fresher Summary */}
                    <div className="space-y-1.5 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#0A0C0E]">
                          AI-Tailored Fresher Summary (Ready to Paste)
                        </span>
                        <button
                          type="button"
                          onClick={copySummaryToClipboard}
                          className="flex items-center gap-1 text-[10.5px] font-mono text-[#E8913C] hover:underline"
                        >
                          {copiedSummary ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Summary</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="font-sans text-xs text-[#4A525A] italic">
                        "{analysis.tailoredFresherSummary}"
                      </p>
                    </div>

                  </div>
                )}

                {/* Final Submit Application Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSubmitApplication}
                    disabled={isSubmitting || !candidateName || !candidateEmail || !resumeText}
                    className={`w-full py-3 px-6 rounded text-xs font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all ${
                      isSubmitting || !candidateName || !candidateEmail || !resumeText
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#E8913C] hover:bg-[#d67e2a] text-white shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Submitting Application with Referral Code...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application with Alumni Referral ({job.referralCode})</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-[#78828A] mt-2">
                    Directly forwarded to {job.company} with endorsement from {job.mentorName}.
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
