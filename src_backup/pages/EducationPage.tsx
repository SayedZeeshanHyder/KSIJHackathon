import React, { useState } from 'react';
import { EDUCATION_MODULES, EducationModule, AssessmentQuestion } from '../data/educationData';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  HelpCircle, 
  Award, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  User, 
  GraduationCap, 
  Flame,
  X,
  Volume2,
  Video
} from 'lucide-react';

interface EducationPageProps {
  onBackToHome: () => void;
  onOpenReelsPage: () => void;
  user: { name: string; email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({
  onBackToHome,
  onOpenReelsPage,
  user,
  onSignInClick,
  onSignOutClick
}) => {
  // User Profile Qualification Settings
  const [selectedStream, setSelectedStream] = useState<'duniyawi' | 'deeni'>('duniyawi');
  const [gradeLevel, setGradeLevel] = useState<string>('10th Standard');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  // Selected Module for lecture viewing
  const [activeModule, setActiveModule] = useState<EducationModule | null>(null);

  // Unlocked & Completed Modules state
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<string[]>([
    'duni-10-math-01',
    'deen-found-01'
  ]);
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const [moduleScores, setModuleScores] = useState<Record<string, number>>({});

  // Assessment / Online Exam Modal state
  const [examModule, setExamModule] = useState<EducationModule | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [examResult, setExamResult] = useState<{ score: number; percentage: number; passed: boolean } | null>(null);

  // Filter modules according to active stream and grade
  const filteredModules = EDUCATION_MODULES.filter(m => {
    if (m.stream !== selectedStream) return false;
    if (selectedStream === 'duniyawi') {
      return m.gradeLevel === gradeLevel;
    }
    return true;
  });

  // Start Assessment
  const handleStartExam = (module: EducationModule) => {
    setExamModule(module);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setExamResult(null);
  };

  // Submit Answer
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (examResult) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  // Grade Assessment
  const handleSubmitExam = () => {
    if (!examModule) return;
    const questions = examModule.assessment;
    let correctCount = 0;

    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= examModule.passingScore;

    setExamResult({
      score: correctCount,
      percentage,
      passed
    });

    if (passed) {
      // Mark current module completed
      if (!completedModuleIds.includes(examModule.id)) {
        setCompletedModuleIds(prev => [...prev, examModule.id]);
      }
      setModuleScores(prev => ({ ...prev, [examModule.id]: percentage }));

      // Unlock next module if available
      if (examModule.nextModuleId && !unlockedModuleIds.includes(examModule.nextModuleId)) {
        setUnlockedModuleIds(prev => [...prev, examModule.nextModuleId!]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#0A0C0E] font-sans antialiased">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[rgba(10,12,14,0.1)]">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 h-[76px] flex items-center justify-between">
          
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

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Switch to Reels */}
            <button
              onClick={onOpenReelsPage}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-[#0A0C0E] rounded-full text-xs font-mono font-semibold transition-colors border border-amber-500/20"
            >
              <Video className="w-3.5 h-3.5 text-[#E8913C]" />
              <span>Watch 1-Min Reels →</span>
            </button>

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

      {/* 2. Educational Hero & Stream Selector */}
      <section className="bg-white border-b border-[rgba(10,12,14,0.08)] py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E8913C] animate-pulse" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8913C] font-bold">
                  ONE COMMUNITY ACADEMY // MODULAR LEARNING
                </p>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A0C0E] tracking-tight">
                Structured Modules & Assessments.
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#4A525A] leading-relaxed">
                Choose between <strong>Islamic (Deeni)</strong> foundational scholarship and <strong>Duniyawi (Science & Commerce)</strong> academic curricula. Watch in-depth video lectures and pass the online assessment exam at the end of each module to unlock the next level.
              </p>
            </div>

            {/* Profile / Stream Status Badge */}
            <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[rgba(10,12,14,0.1)] space-y-2 shrink-0">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#78828A]">
                  CURRENT ENROLLMENT
                </span>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="font-mono text-[11px] text-[#E8913C] hover:underline"
                >
                  {isEditingProfile ? 'Done' : 'Change Stream/Grade ✎'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#E8913C]" />
                <span className="font-display font-bold text-sm text-[#0A0C0E]">
                  {selectedStream === 'duniyawi' ? `Duniyawi (${gradeLevel})` : 'Islamic (Deeni Sciences)'}
                </span>
              </div>
              <p className="text-[11px] font-sans text-[#78828A]">
                {completedModuleIds.length} of {filteredModules.length} Modules Certified
              </p>
            </div>
          </div>

          {/* Stream Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => { setSelectedStream('duniyawi'); setGradeLevel('10th Standard'); }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedStream === 'duniyawi'
                  ? 'bg-[#0A0C0E] text-white shadow-md'
                  : 'bg-[#F5F6F8] text-[#4A525A] hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#E8913C]" />
              <span>1. Duniyawi (Academic / Science & Math)</span>
            </button>

            <button
              onClick={() => setSelectedStream('deeni')}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedStream === 'deeni'
                  ? 'bg-[#0A0C0E] text-white shadow-md'
                  : 'bg-[#F5F6F8] text-[#4A525A] hover:bg-gray-200'
              }`}
            >
              <Award className="w-4 h-4 text-[#E8913C]" />
              <span>2. Islamic (Deeni / Fiqh, Quran, Seerah)</span>
            </button>
          </div>

          {/* Grade selection (when in Duniyawi) */}
          {selectedStream === 'duniyawi' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="font-mono text-[#78828A] uppercase tracking-wider text-[11px] mr-2">
                Standard / Class:
              </span>
              {['10th Standard', '11th-12th Science', '11th-12th Commerce', 'Foundation'].map(grade => (
                <button
                  key={grade}
                  onClick={() => setGradeLevel(grade)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    gradeLevel === grade
                      ? 'bg-[#E8913C] text-white'
                      : 'bg-white border border-[rgba(10,12,14,0.1)] text-[#4A525A] hover:bg-gray-100'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 3. Modules Grid & Lecture Player */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 space-y-10">
          
          {/* Active Lecture Player (if a module is selected) */}
          {activeModule && (
            <div className="bg-[#0A0C0E] text-white rounded-xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Video Player Column */}
                <div className="lg:col-span-8 bg-black relative flex items-center justify-center min-h-[320px] sm:min-h-[460px]">
                  <video
                    controls
                    autoPlay
                    poster={activeModule.thumbnail}
                    className="w-full h-full max-h-[540px] object-cover"
                    src={activeModule.lectureVideoUrl}
                  />
                </div>

                {/* Lecture Notes & Exam Launch Column */}
                <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0E1114]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#E8913C]/20 text-[#E8913C] font-bold">
                        {activeModule.moduleNumber} · {activeModule.subject}
                      </span>
                      <button
                        onClick={() => setActiveModule(null)}
                        className="text-white/60 hover:text-white p-1"
                        aria-label="Close lecture view"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {activeModule.title}
                    </h2>

                    <p className="font-sans text-xs text-white/70 leading-relaxed">
                      {activeModule.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-white/50">
                        SYLLABUS KEY CONCEPTS:
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs text-white/80">
                        {activeModule.keyTopics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#E8913C]">―</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Launch Exam CTA */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <button
                      onClick={() => handleStartExam(activeModule)}
                      className="w-full py-3 px-4 bg-[#E8913C] hover:bg-[#d67e2a] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Take Module Online Exam ({activeModule.assessment.length} Questions)</span>
                    </button>
                    <p className="text-[10px] text-center text-white/50 font-mono">
                      Pass with {activeModule.passingScore}%+ to earn completion badge & unlock next module
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Module List Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(10,12,14,0.08)]">
              <h2 className="font-display font-bold text-xl text-[#0A0C0E] flex items-center gap-2">
                <span>{selectedStream === 'duniyawi' ? `Duniyawi Curriculum (${gradeLevel})` : 'Islamic Sciences (Deeni Curriculum)'}</span>
              </h2>
              <span className="font-mono text-xs text-[#78828A]">
                {filteredModules.length} Modules Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((mod, index) => {
                const isUnlocked = unlockedModuleIds.includes(mod.id);
                const isCompleted = completedModuleIds.includes(mod.id);
                const score = moduleScores[mod.id];

                return (
                  <div
                    key={mod.id}
                    className={`bg-white rounded-lg border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                      isUnlocked 
                        ? 'border-[rgba(10,12,14,0.12)] hover:border-[#E8913C] hover:shadow-lg' 
                        : 'border-gray-200 opacity-60 bg-gray-50'
                    }`}
                  >
                    {/* Module Card Image / Poster */}
                    <div className="relative h-44 w-full overflow-hidden bg-black">
                      <img
                        src={mod.thumbnail}
                        alt={mod.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white border border-white/20">
                          {mod.moduleNumber}
                        </span>
                        <span className="font-sans text-[10px] px-2 py-0.5 rounded bg-white/90 text-[#0A0C0E] font-semibold">
                          {mod.subject}
                        </span>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute top-3 right-3">
                        {isCompleted ? (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-mono font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>PASSED ({score}%)</span>
                          </span>
                        ) : isUnlocked ? (
                          <span className="px-2 py-0.5 bg-[#E8913C] text-white rounded-full text-[10px] font-mono font-bold">
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-800/90 text-gray-300 rounded-full text-[10px] font-mono">
                            <Lock className="w-3 h-3" />
                            <span>LOCKED</span>
                          </span>
                        )}
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-2.5 left-3 text-white/90 font-mono text-[10.5px]">
                        {mod.duration}
                      </div>
                    </div>

                    {/* Module Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-lg text-[#0A0C0E] leading-snug line-clamp-1">
                          {mod.title}
                        </h3>
                        <p className="font-sans text-xs text-[#4A525A] line-clamp-2 leading-relaxed">
                          {mod.description}
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="pt-3 border-t border-[rgba(10,12,14,0.06)] flex items-center gap-2">
                        {isUnlocked ? (
                          <>
                            <button
                              onClick={() => {
                                setActiveModule(mod);
                                window.scrollTo({ top: 180, behavior: 'smooth' });
                              }}
                              className="flex-1 py-2 px-3 bg-[#0A0C0E] hover:bg-[#E8913C] text-white font-mono text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Watch Lecture</span>
                            </button>

                            <button
                              onClick={() => handleStartExam(mod)}
                              className="py-2 px-3 bg-[#F5F6F8] hover:bg-amber-100 text-[#0A0C0E] font-mono text-xs font-semibold rounded border border-[rgba(10,12,14,0.1)] transition-colors"
                              title="Take Assessment"
                            >
                              Exam
                            </button>
                          </>
                        ) : (
                          <div className="w-full py-2 text-center text-xs font-mono text-[#78828A] flex items-center justify-center gap-1.5 bg-gray-100 rounded">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Pass previous module exam to unlock</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation banner pointing to Reels */}
          <div className="p-6 bg-amber-500/10 border border-amber-500/25 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8913C]" />
                <h3 className="font-display font-bold text-sm text-[#0A0C0E]">
                  Looking for Fast 1-Minute Short-Form Summaries?
                </h3>
              </div>
              <p className="font-sans text-xs text-[#4A525A]">
                We have moved all short video reels to the dedicated <strong>Reels Section</strong> in the top navigation bar. Enjoy curated 60-second Deeni reminders and 10th Math/Science speed shortcuts.
              </p>
            </div>
            <button
              onClick={onOpenReelsPage}
              className="px-5 py-2.5 bg-[#0A0C0E] hover:bg-[#E8913C] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded-lg shrink-0 transition-colors"
            >
              Explore 1-Minute Reels →
            </button>
          </div>

        </div>
      </section>

      {/* 4. ONLINE EXAM / ASSESSMENT MODAL */}
      {examModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-white text-[#0A0C0E] border border-[rgba(10,12,14,0.14)] rounded-xl shadow-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exam Header */}
            <div className="p-6 bg-[#F5F6F8] border-b border-[rgba(10,12,14,0.1)] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0A0C0E] text-white">
                    {examModule.moduleNumber}
                  </span>
                  <span className="font-sans text-xs font-semibold text-[#E8913C]">
                    Online Assessment Exam
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#0A0C0E] pt-1">
                  {examModule.title}
                </h3>
              </div>
              <button
                onClick={() => setExamModule(null)}
                className="p-1.5 rounded-full hover:bg-black/5 text-[#78828A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Exam Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* If Exam Result is Ready */}
              {examResult ? (
                <div className="text-center space-y-6 py-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    examResult.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {examResult.passed ? <Award className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#78828A]">
                      ASSESSMENT RESULTS
                    </span>
                    <h3 className="font-display font-black text-3xl text-[#0A0C0E]">
                      {examResult.percentage}% Score ({examResult.score}/{examModule.assessment.length} Correct)
                    </h3>
                    <p className={`font-sans text-sm font-semibold ${
                      examResult.passed ? 'text-emerald-700' : 'text-amber-800'
                    }`}>
                      {examResult.passed 
                        ? '🎉 Congratulations! You have successfully cleared this module!' 
                        : 'Review the explanations below and re-attempt to clear the module.'}
                    </p>
                  </div>

                  {/* Question Review Breakdown */}
                  <div className="space-y-3 text-left max-h-64 overflow-y-auto pr-1">
                    {examModule.assessment.map((q, idx) => {
                      const userChoice = userAnswers[q.id];
                      const isCorrect = userChoice === q.correctIndex;
                      return (
                        <div key={q.id} className="p-3 bg-[#F9FAFB] rounded border border-[rgba(10,12,14,0.08)] space-y-1">
                          <p className="font-sans text-xs font-semibold text-[#0A0C0E]">
                            Q{idx + 1}: {q.question}
                          </p>
                          <p className={`font-mono text-[11px] ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                            Your Answer: {q.options[userChoice] || 'Unanswered'} {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </p>
                          {!isCorrect && (
                            <p className="font-mono text-[11px] text-emerald-800">
                              Correct Answer: {q.options[q.correctIndex]}
                            </p>
                          )}
                          <p className="font-sans text-[11px] text-[#78828A] italic">
                            Explanation: {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    {examResult.passed ? (
                      <button
                        onClick={() => setExamModule(null)}
                        className="px-6 py-2.5 bg-[#0A0C0E] hover:bg-[#E8913C] text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-colors"
                      >
                        Proceed to Next Module →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setUserAnswers({});
                          setExamResult(null);
                          setCurrentQuestionIndex(0);
                        }}
                        className="px-6 py-2.5 bg-[#E8913C] hover:bg-[#d67e2a] text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-attempt Exam</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Live Question Step */
                <div className="space-y-6">
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#78828A]">
                      <span>Question {currentQuestionIndex + 1} of {examModule.assessment.length}</span>
                      <span>Passing threshold: {examModule.passingScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#E8913C] transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / examModule.assessment.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Prompt */}
                  {(() => {
                    const q = examModule.assessment[currentQuestionIndex];
                    return (
                      <div className="space-y-4">
                        <h4 className="font-display font-bold text-base sm:text-lg text-[#0A0C0E] leading-snug">
                          {q.question}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = userAnswers[q.id] === optIdx;
                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => handleSelectAnswer(q.id, optIdx)}
                                className={`w-full p-3.5 rounded-lg border text-left text-xs font-sans transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-[#0A0C0E] text-white border-[#0A0C0E] shadow-sm'
                                    : 'bg-white text-[#0A0C0E] border-[rgba(10,12,14,0.12)] hover:border-[#E8913C]'
                                }`}
                              >
                                <span>{opt}</span>
                                <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected ? 'border-white bg-[#E8913C] text-white' : 'border-gray-300'
                                }`}>
                                  {isSelected ? '✓' : ''}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Step Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-[rgba(10,12,14,0.08)]">
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2 text-xs font-mono uppercase text-[#78828A] disabled:opacity-30"
                    >
                      ← Previous
                    </button>

                    {currentQuestionIndex < examModule.assessment.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="px-5 py-2 bg-[#0A0C0E] hover:bg-[#E8913C] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitExam}
                        disabled={Object.keys(userAnswers).length < examModule.assessment.length}
                        className="px-6 py-2.5 bg-[#E8913C] hover:bg-[#d67e2a] text-white text-xs font-mono font-bold uppercase tracking-wider rounded shadow transition-all disabled:opacity-40"
                      >
                        Submit Exam for Grading
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 5. Footer */}
      <footer className="bg-white border-t border-[rgba(10,12,14,0.1)] py-12">
        <div className="max-w-[1680px] mx-auto px-6 sm:px-14 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="font-display font-extrabold text-sm text-[#0A0C0E] hover:text-[#E8913C]"
            >
              ONE COMMUNITY
            </button>
            <span className="text-xs text-[#78828A]">© 2026 Modular Education & Online Examination Academy</span>
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

    </div>
  );
};
