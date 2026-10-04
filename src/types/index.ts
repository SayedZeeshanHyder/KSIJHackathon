export type UserRole = 'learner' | 'jobseeker' | 'recruiter' | 'organizer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  email: string;
  avatar: string;
  location: string;
  role: UserRole;
  bio: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  resumeUrl?: string;
  resumeFileName?: string;
  streakDays: number;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  videoUrl?: string;
  youtubeId?: string;
  summary: string;
  pdfResources?: {
    name: string;
    size: string;
    pages: number;
    downloadUrl?: string;
  }[];
  quiz?: {
    id: string;
    title: string;
    passingScore: number;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswerIndex: number;
      explanation: string;
    }[];
  };
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorAvatar: string;
  qualification: 'School (Class 10-12)' | 'College / Undergrad' | 'Graduate' | 'Professional' | 'Islamic Education';
  category: 'Computer Science' | 'Data & AI' | 'Islamic Studies' | 'Business' | 'Design' | 'Languages';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  enrolledCount: number;
  progressPercentage: number;
  image: string;
  description: string;
  modules: CourseModule[];
  certificateAvailable: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  experience: string;
  skills: string[];
  postedTime: string;
  matchPercentage: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string;
  areasToImprove: string;
  isSaved?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected';
  resumeName: string;
}

export interface Referral {
  id: string;
  jobTitle: string;
  company: string;
  referrerName: string;
  referrerRole: string;
  status: 'Available' | 'Pending' | 'Referred' | 'Interview Scheduled';
  date: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  type: 'Majlis' | 'Matam' | 'Azadari' | 'Mehfil' | 'Education' | 'Community' | 'Charity';
  date: string;
  rawDate: string; // YYYY-MM-DD for calendar
  time: string;
  venue: string;
  address: string;
  city: string;
  organizer: string;
  organizerContact: string;
  distance: string;
  image: string;
  isRegistered?: boolean;
  isSaved?: boolean;
  registeredCount: number;
  capacity?: number;
  speakers?: {
    name: string;
    role: string; // Zakir, Maulana, Nauhakhwan, Lecturer
  }[];
  schedule?: {
    time: string;
    activity: string;
  }[];
  description: string;
  entryType: 'Free Entry' | 'RSVP Required' | 'Passes Available';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'learning' | 'career' | 'events' | 'system';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface Certificate {
  id: string;
  learnerName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  grade: string;
  instructor: string;
}
