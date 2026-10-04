import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Lock, 
  Play, 
  FileText, 
  Download, 
  Award, 
  ChevronRight, 
  Star, 
  Clock, 
  BarChart, 
  Users, 
  ArrowLeft,
  X,
  HelpCircle,
  Sparkles,
  Flame,
  Check,
  RotateCcw
} from 'lucide-react';
import { Course, CourseModule, Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

interface EducationViewProps {
  courses: Course[];
  onOpenLiveGame: () => void;
  selectedCourseFromGlobal?: Course | null;
  onClearGlobalSelection?: () => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  courses,
  onOpenLiveGame,
  selectedCourseFromGlobal,
  onClearGlobalSelection
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(selectedCourseFromGlobal || null);
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQualification, setSelectedQualification] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Interactive Quiz state
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Qualifications list
  const qualifications = [
    'All',
    'School (Class 10-12)',
    'College / Undergrad',
    'Graduate',
    'Professional',
    'Islamic Education'
  ];

  const categories = [
    'All',
    'Computer Science',
    'Islamic Studies',
    'Business',
    'Data & AI'
  ];

  // Filtering
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesQual = selectedQualification === 'All' || course.qualification === selectedQualification;
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;

    return matchesSearch && matchesQual && matchesCat;
  });

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveModule(null);
    setIsQuizActive(false);
  };

  const handleOpenModule = (module: CourseModule) => {
    if (module.isLocked) return;
    setActiveModule(module);
    setIsQuizActive(false);
    setSelectedQuizAnswer(null);
    setQuizScore(null);
  };

  const handleMarkModuleComplete = () => {
    if (!selectedCourse || !activeModule) return;
    activeModule.isCompleted = true;
    
    // Unlock next module if available
    const currentIndex = selectedCourse.modules.findIndex(m => m.id === activeModule.id);
    if (currentIndex + 1 < selectedCourse.modules.length) {
      selectedCourse.modules[currentIndex + 1].isLocked = false;
    }

    // If quiz exists, prompt quiz
    if (activeModule.quiz) {
      setIsQuizActive(true);
      setCurrentQuestionIndex(0);
      setSelectedQuizAnswer(null);
      setUserAnswers([]);
    } else {
      alert(`Completed ${activeModule.title}! Next section unlocked.`);
    }
  };

  const handleQuizSubmitOption = (optionIndex: number) => {
    if (!activeModule?.quiz) return;
    setSelectedQuizAnswer(optionIndex);
  };

  const handleNextQuizQuestion = () => {
    if (!activeModule?.quiz || selectedQuizAnswer === null) return;
    
    const newAnswers = [...userAnswers, selectedQuizAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 < activeModule.quiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedQuizAnswer(null);
    } else {
      // Calculate final score
      let correct = 0;
      activeModule.quiz.questions.forEach((q, idx) => {
        if (newAnswers[idx] === q.correctAnswerIndex) {
          correct++;
        }
      });
      const pct = Math.round((correct / activeModule.quiz.questions.length) * 100);
      setQuizScore(pct);
    }
  };

  const sampleCertificate: Certificate = {
    id: 'cert_8821',
    learnerName: 'Ali Raza Merchant',
    courseName: selectedCourse?.title || 'Advanced Full-Stack Engineering with TypeScript',
    completionDate: 'October 04, 2026',
    certificateId: 'VFQ-EDU-2026-9042',
    grade: 'Excellence (94%)',
    instructor: selectedCourse?.instructor || 'Syed Zeeshan Haider'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* View: Course Catalog (Default) */}
      {!selectedCourse && (
        <>
          {/* Header & Stats Strip */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Education & Academy Platform</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Learn Something New.
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Curated qualifications, modular video lessons, downloadable academic notes, verified credentials, and real-time community tournaments.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenLiveGame}
                className="px-3.5 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-900/40 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Multiplayer Quiz Arena</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[9px] font-mono">LIVE</span>
              </button>
            </div>
          </div>

          {/* Search & Qualification Filter Tabs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search courses, topics, scholars or skills (e.g., TypeScript, Nahjul Balagha, STEM)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 focus:outline-none focus:border-emerald-500/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      Category: {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Qualification-Based Learning Selector */}
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Filter by Qualification Level
              </p>
              <div className="flex flex-wrap gap-1.5">
                {qualifications.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQualification(q)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedQualification === q
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-medium'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => handleOpenCourse(course)}
                className="group rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 cursor-pointer overflow-hidden transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="h-44 bg-neutral-800 relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-xs text-[10px] text-emerald-300 font-mono">
                      {course.qualification}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-xs text-[10px] text-amber-300 font-mono flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{course.category}</span>
                      <span>·</span>
                      <span>{course.level}</span>
                      <span>·</span>
                      <span>{course.modules.length} Modules</span>
                    </div>

                    <h3 className="font-display text-sm font-semibold text-neutral-100 group-hover:text-emerald-300 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs text-neutral-300">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-5 h-5 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="truncate">{course.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* Progress / CTA Footer */}
                <div className="p-4 pt-2 border-t border-neutral-800/80 bg-neutral-950/40">
                  {course.progressPercentage > 0 ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-neutral-400">Progress</span>
                        <span className="font-mono text-emerald-400">{course.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${course.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
                      <span>Start Learning</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="py-16 text-center text-neutral-400 space-y-2">
              <BookOpen className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-sm font-medium">No courses found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedQualification('All'); setSelectedCategory('All'); }}
                className="text-xs text-emerald-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </>
      )}

      {/* View: Course Detail & Syllabus View */}
      {selectedCourse && !activeModule && (
        <div className="space-y-6">
          <button
            onClick={() => { setSelectedCourse(null); if (onClearGlobalSelection) onClearGlobalSelection(); }}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Courses</span>
          </button>

          {/* Banner Hero */}
          <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden relative">
            <div className="h-48 sm:h-64 bg-neutral-800 relative">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <span className="px-2 py-0.5 rounded bg-black/60 font-mono">{selectedCourse.qualification}</span>
                    <span>·</span>
                    <span>{selectedCourse.category}</span>
                  </div>
                  <h1 className="font-display text-xl sm:text-3xl font-bold text-white leading-tight">
                    {selectedCourse.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-300">
                    Instructor: <strong>{selectedCourse.instructor}</strong> ({selectedCourse.instructorTitle})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedCourse.certificateAvailable && (
                    <button
                      onClick={() => setIsCertificateModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-neutral-800/90 hover:bg-neutral-800 text-amber-300 text-xs font-medium border border-amber-500/20 flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Duration</span>
              <span className="font-mono text-neutral-200 font-medium">{selectedCourse.duration}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Curriculum</span>
              <span className="font-mono text-neutral-200 font-medium">{selectedCourse.modules.length} Modules</span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Rating</span>
              <span className="font-mono text-amber-400 font-medium flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {selectedCourse.rating} ({selectedCourse.enrolledCount} enrolled)
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Completion</span>
              <span className="font-mono text-emerald-400 font-medium">{selectedCourse.progressPercentage}% Progress</span>
            </div>
          </div>

          {/* Curriculum Modules List */}
          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold text-white">
              Course Curriculum & Modules
            </h2>

            <div className="space-y-2">
              {selectedCourse.modules.map((module, index) => (
                <div
                  key={module.id}
                  onClick={() => handleOpenModule(module)}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    module.isLocked
                      ? 'bg-neutral-950/40 border-neutral-800/40 text-neutral-500 cursor-not-allowed opacity-75'
                      : 'bg-neutral-900/80 hover:bg-neutral-900 border-neutral-800 text-neutral-200 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {module.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : module.isLocked ? (
                        <Lock className="w-5 h-5 text-neutral-600" />
                      ) : (
                        <Play className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-neutral-400">
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                        <h3 className="text-xs sm:text-sm font-semibold text-white">
                          {module.title}
                        </h3>
                        {module.isCompleted && (
                          <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-400 text-[10px] rounded border border-emerald-500/20">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {module.summary}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-neutral-500">
                        <span>{module.duration}</span>
                        {module.pdfResources && (
                          <span>· {module.pdfResources.length} PDF Documents</span>
                        )}
                        {module.quiz && (
                          <span>· Module Assessment</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {!module.isLocked && (
                    <button className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-emerald-600 hover:text-neutral-950 text-xs font-medium transition-colors shrink-0 ml-3">
                      {module.isCompleted ? 'Review' : 'Open'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View: Active Module Detail & Interactive Player / Quiz */}
      {selectedCourse && activeModule && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setActiveModule(null); setIsQuizActive(false); }}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Syllabus ({selectedCourse.title})</span>
            </button>

            {activeModule.quiz && (
              <button
                onClick={() => {
                  setIsQuizActive(!isQuizActive);
                  setCurrentQuestionIndex(0);
                  setSelectedQuizAnswer(null);
                  setQuizScore(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-amber-300 font-medium flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{isQuizActive ? 'Back to Lesson' : 'Take Module Quiz'}</span>
              </button>
            )}
          </div>

          {!isQuizActive ? (
            /* Video / Lesson Mode */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Video Player & Overview */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden">
                  {/* YouTube Player or Interactive simulation */}
                  <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                    {activeModule.youtubeId ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${activeModule.youtubeId}?rel=0`}
                        title={activeModule.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="text-center p-6 space-y-3">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                          <Play className="w-8 h-8 fill-emerald-400 ml-1" />
                        </div>
                        <p className="text-xs text-neutral-400">Classroom Lecture Recording</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 space-y-3">
                    <h2 className="font-display text-lg font-bold text-white">
                      {activeModule.title}
                    </h2>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {activeModule.summary}
                    </p>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-xs text-neutral-400">Duration: {activeModule.duration}</span>
                      
                      <button
                        onClick={handleMarkModuleComplete}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                          activeModule.isCompleted
                            ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-neutral-950'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>{activeModule.isCompleted ? 'Module Completed (Retake)' : 'Mark Module Complete'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: PDF Resources & Notes */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                  <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Downloadable Resources</span>
                  </h3>

                  {activeModule.pdfResources && activeModule.pdfResources.length > 0 ? (
                    <div className="space-y-2">
                      {activeModule.pdfResources.map((pdf, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-medium text-neutral-200 truncate max-w-[180px]">{pdf.name}</p>
                            <p className="text-[10px] text-neutral-500">{pdf.size} · {pdf.pages} Pages</p>
                          </div>
                          <button
                            onClick={() => alert(`Downloading ${pdf.name}`)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-emerald-400"
                            title="Download PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500">No PDF attachments for this module.</p>
                  )}
                </div>

                {/* Module Quiz Card */}
                {activeModule.quiz && (
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>Module Assessment Ready</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Score {activeModule.quiz.passingScore}% or higher on this assessment to certify your comprehension and unlock future milestones.
                    </p>
                    <button
                      onClick={() => setIsQuizActive(true)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors"
                    >
                      Start Assessment
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Interactive Quiz Mode */
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
              {quizScore === null ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span className="text-[11px] font-mono text-emerald-400 uppercase">
                        Module Assessment
                      </span>
                      <h3 className="font-display text-base font-bold text-white">
                        Question {currentQuestionIndex + 1} of {activeModule.quiz?.questions.length}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Pass Threshold: {activeModule.quiz?.passingScore}%
                    </span>
                  </div>

                  {activeModule.quiz && (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base font-medium text-neutral-100">
                        {activeModule.quiz.questions[currentQuestionIndex].question}
                      </p>

                      <div className="space-y-2">
                        {activeModule.quiz.questions[currentQuestionIndex].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuizSubmitOption(idx)}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                              selectedQuizAnswer === idx
                                ? 'bg-emerald-950/60 border-emerald-400 text-white'
                                : 'bg-neutral-950 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
                            }`}
                          >
                            <span>{opt}</span>
                            <span className="w-5 h-5 rounded-md bg-neutral-800 text-[11px] font-mono flex items-center justify-center text-neutral-400">
                              {String.fromCharCode(65 + idx)}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          onClick={() => setIsQuizActive(false)}
                          className="text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel Quiz
                        </button>
                        <button
                          onClick={handleNextQuizQuestion}
                          disabled={selectedQuizAnswer === null}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 disabled:opacity-40 hover:bg-emerald-500 text-neutral-950 font-semibold text-xs transition-colors"
                        >
                          {currentQuestionIndex + 1 < activeModule.quiz.questions.length ? 'Next Question' : 'Submit Assessment'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Quiz Result Screen */
                <div className="text-center space-y-5 py-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    quizScore >= (activeModule.quiz?.passingScore || 75)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {quizScore >= (activeModule.quiz?.passingScore || 75) ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <RotateCcw className="w-8 h-8" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {quizScore >= (activeModule.quiz?.passingScore || 75) ? 'Congratulations! Module Passed' : 'Assessment Incomplete'}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      You achieved a score of <strong className="font-mono text-emerald-400 text-sm">{quizScore}%</strong> (Passing requirement: {activeModule.quiz?.passingScore}%).
                    </p>
                  </div>

                  {quizScore >= (activeModule.quiz?.passingScore || 75) ? (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
                      ✓ Module 03 Unlocked! Progress updated to 65%.
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
                      Review the lecture notes and try the assessment again.
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        setQuizScore(null);
                        setCurrentQuestionIndex(0);
                        setSelectedQuizAnswer(null);
                        setUserAnswers([]);
                      }}
                      className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={() => {
                        setIsQuizActive(false);
                        setActiveModule(null);
                      }}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-semibold"
                    >
                      Return to Syllabus
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        certificate={sampleCertificate}
      />
    </div>
  );
};
