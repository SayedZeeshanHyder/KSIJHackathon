import { Course, Job, CommunityEvent, JobApplication, Referral, NotificationItem, Certificate, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_9021',
  name: 'Ali Raza Merchant',
  headline: 'Full-Stack Software Engineer & Community Volunteer',
  email: 'ali.raza@vifaq.community',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  location: 'Mumbai, Maharashtra',
  role: 'learner',
  bio: 'Software engineer passionate about TypeScript, React, and building community-first technology. Active volunteer for local educational initiatives and youth mentoring.',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'PostgreSQL', 'GraphQL (Learning)'],
  education: [
    {
      degree: 'B.Tech in Computer Engineering',
      institution: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
      year: '2020 - 2024'
    },
    {
      degree: 'Islamic History & Jurisprudence (Diploma)',
      institution: 'Al-Hujjat Community Academy',
      year: '2022 - 2023'
    }
  ],
  experience: [
    {
      role: 'Associate Frontend Developer',
      company: 'Taqwa FinTech Labs',
      duration: '2024 - Present',
      description: 'Building accessible design systems and client-side trading interfaces using React, TypeScript, and Tailwind CSS.'
    }
  ],
  resumeFileName: 'Ali_Raza_Merchant_CV_2026.pdf',
  resumeUrl: '#',
  streakDays: 14
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'crs_101',
    title: 'Advanced Full-Stack Engineering with TypeScript & Distributed Systems',
    instructor: 'Syed Zeeshan Haider',
    instructorTitle: 'Principal Architect at Razorpay',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    qualification: 'College / Undergrad',
    category: 'Computer Science',
    level: 'Intermediate',
    duration: '14 Weeks · 42 Hours',
    rating: 4.9,
    enrolledCount: 1480,
    progressPercentage: 65,
    image: '/assets/images/education_course_banner_1791097443081.jpg',
    description: 'Master modern scalable web architectures, micro-frontends, event-driven backends, and robust deployment pipelines tailored for engineering roles.',
    certificateAvailable: true,
    modules: [
      {
        id: 'mod_1',
        title: 'Module 01: TypeScript Type Systems & Enterprise Domain Modeling',
        duration: '3h 15m',
        isCompleted: true,
        isLocked: false,
        summary: 'Deep dive into mapped types, conditional types, template literals, and defensive API typing patterns.',
        youtubeId: 'zQnBQ4tB3ZA',
        pdfResources: [
          { name: 'TypeScript_Enterprise_Patterns.pdf', size: '2.4 MB', pages: 28 },
          { name: 'Module01_CheatSheet.pdf', size: '1.1 MB', pages: 8 }
        ],
        quiz: {
          id: 'quiz_1',
          title: 'Assessment: Advanced Type Systems',
          passingScore: 75,
          questions: [
            {
              id: 'q1',
              question: 'Which TypeScript keyword allows extracting the return type of a function asynchronously?',
              options: ['Awaited<ReturnType<T>>', 'AsyncReturn<T>', 'PromiseType<T>', 'InferAsync<T>'],
              correctAnswerIndex: 0,
              explanation: 'Awaited<ReturnType<T>> unwraps nested Promise types from a function signature.'
            },
            {
              id: 'q2',
              question: 'What is the primary benefit of nominal typing simulation via branded types?',
              options: [
                'Reduces compilation bundle size',
                'Prevents accidental variable misuse of identically structured primitives like UserId vs OrderId',
                'Speeds up runtime execution in V8',
                'Enables automatic JSON serialization'
              ],
              correctAnswerIndex: 1,
              explanation: 'Branded types introduce unique compile-time brands to primitive values to prevent semantic mismatch.'
            }
          ]
        }
      },
      {
        id: 'mod_2',
        title: 'Module 02: High-Performance React Architecture & Concurrent Mode',
        duration: '4h 30m',
        isCompleted: true,
        isLocked: false,
        summary: 'State management at scale, optimistic mutations, server components, and render budget optimization.',
        youtubeId: 'bMknfKXIFA8',
        pdfResources: [
          { name: 'React19_Concurrency_Guide.pdf', size: '3.8 MB', pages: 42 }
        ],
        quiz: {
          id: 'quiz_2',
          title: 'Assessment: React Performance',
          passingScore: 80,
          questions: [
            {
              id: 'q2_1',
              question: 'When should useTransition be favored over standard useState dispatch?',
              options: [
                'For pure synchronous mathematical calculations',
                'When deferring non-urgent UI updates to maintain user interface responsiveness',
                'For every network fetch call',
                'To replace CSS animations'
              ],
              correctAnswerIndex: 1,
              explanation: 'useTransition marks state updates as non-blocking transitions, preserving input responsiveness.'
            }
          ]
        }
      },
      {
        id: 'mod_3',
        title: 'Module 03: Distributed Systems, Message Brokers & Kafka Workflows',
        duration: '5h 10m',
        isCompleted: false,
        isLocked: false,
        summary: 'Explore consumer group balancing, idempotent message consumption, and partition key strategies.',
        youtubeId: 'F2o_k_dcr_U',
        pdfResources: [
          { name: 'Kafka_Message_Architecture.pdf', size: '4.5 MB', pages: 36 }
        ],
        quiz: {
          id: 'quiz_3',
          title: 'Module Assessment: Message Queues',
          passingScore: 75,
          questions: [
            {
              id: 'q3_1',
              question: 'What ensures strict message ordering in Apache Kafka?',
              options: [
                'All consumers reading in a round-robin format',
                'Writing messages to the same partition with a consistent partition key',
                'Setting replication factor to 1',
                'Disabling auto-commit'
              ],
              correctAnswerIndex: 1,
              explanation: 'Kafka guarantees total ordering within an individual partition, not across multiple partitions.'
            }
          ]
        }
      },
      {
        id: 'mod_4',
        title: 'Module 04: Capstone Project & Cloud-Native Deployment',
        duration: '6h 00m',
        isCompleted: false,
        isLocked: true,
        summary: 'Architecting an end-to-end event platform with Kubernetes, rate-limiting gateways, and automated testing.',
        pdfResources: [
          { name: 'Capstone_Specification.pdf', size: '1.9 MB', pages: 14 }
        ]
      }
    ]
  },
  {
    id: 'crs_102',
    title: 'Nahjul Balagha: Timeless Governance, Ethics & Leadership Wisdom',
    instructor: 'Maulana Dr. S. M. Rizvi',
    instructorTitle: 'Scholar & Dean of Islamic Philosophical Studies',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    qualification: 'Islamic Education',
    category: 'Islamic Studies',
    level: 'Beginner',
    duration: '8 Weeks · 24 Hours',
    rating: 4.95,
    enrolledCount: 3120,
    progressPercentage: 40,
    image: '/assets/images/community_event_banner_1791097454868.jpg',
    description: 'An analytical exploration of the letters, sermons, and maxims of Imam Ali (a.s.), with particular emphasis on Letter 53 to Malik al-Ashtar on public justice, ethical administration, and social welfare.',
    certificateAvailable: true,
    modules: [
      {
        id: 'nb_1',
        title: 'Module 01: Historical Context & Compilation by Sharif al-Radi',
        duration: '2h 45m',
        isCompleted: true,
        isLocked: false,
        summary: 'Understanding the textual heritage, literary brilliance, and universal moral imperatives.',
        youtubeId: '0hXjUq4U7W8',
        pdfResources: [
          { name: 'Nahjul_Balagha_Introductory_Lectures.pdf', size: '3.1 MB', pages: 30 }
        ]
      },
      {
        id: 'nb_2',
        title: 'Module 02: Letter 53 & Principles of Human Governance',
        duration: '3h 30m',
        isCompleted: false,
        isLocked: false,
        summary: 'The charter of rights: balancing taxation, judiciary selection, combating corruption, and uplifting the vulnerable.',
        youtubeId: '2qT7m5XyI4g',
        pdfResources: [
          { name: 'Letter_53_Full_Text_Analysis.pdf', size: '2.8 MB', pages: 40 }
        ]
      },
      {
        id: 'nb_3',
        title: 'Module 03: Ethical Leadership in the Modern Era',
        duration: '3h 15m',
        isCompleted: false,
        isLocked: true,
        summary: 'Applying timeless maxims to contemporary organizational leadership, negotiation, and civil discourse.'
      }
    ]
  },
  {
    id: 'crs_103',
    title: 'Financial Literacy, Halal Investments & Community Wealth Building',
    instructor: 'Fatima Merchant, CFA',
    instructorTitle: 'Managing Director, Crescent Capital Partners',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    qualification: 'Professional',
    category: 'Business',
    level: 'Beginner',
    duration: '6 Weeks · 18 Hours',
    rating: 4.88,
    enrolledCount: 2240,
    progressPercentage: 100,
    image: '/assets/images/career_workspace_hub_1791097468289.jpg',
    description: 'Practical guides to Shariah-compliant equity screening, mutual funds, personal budgeting, zakat/khums calculation, and real-estate investments in India.',
    certificateAvailable: true,
    modules: [
      {
        id: 'fin_1',
        title: 'Module 01: Core Principles of Halal Wealth & Debt Elimination',
        duration: '2h 15m',
        isCompleted: true,
        isLocked: false,
        summary: 'Differentiating Riba, Gharar, and ethical risk sharing.',
        pdfResources: [{ name: 'Halal_Portfolio_Basics.pdf', size: '1.8 MB', pages: 20 }]
      },
      {
        id: 'fin_2',
        title: 'Module 02: Stock Screening & ETF Analysis on NSE/BSE',
        duration: '3h 00m',
        isCompleted: true,
        isLocked: false,
        summary: 'Applying AAOIFI standards to Indian listed equities.'
      }
    ]
  },
  {
    id: 'crs_104',
    title: 'Class 12 STEM Foundation: Mathematics, Calculus & Competitive Prep',
    instructor: 'Prof. Mir Abbas Kazmi',
    instructorTitle: 'HOD Mathematics, Ex-IIT Bombay Guest Faculty',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    qualification: 'School (Class 10-12)',
    category: 'Computer Science',
    level: 'Intermediate',
    duration: '12 Weeks · 36 Hours',
    rating: 4.92,
    enrolledCount: 1950,
    progressPercentage: 20,
    image: '/assets/images/education_course_banner_1791097443081.jpg',
    description: 'Comprehensive calculus, vector algebra, and coordinate geometry mastery tailored for board excellence and national competitive entrance exams.',
    certificateAvailable: true,
    modules: [
      {
        id: 'stem_1',
        title: 'Module 01: Differential Equations & Applications',
        duration: '3h 00m',
        isCompleted: true,
        isLocked: false,
        summary: 'First order linear differential equations, orthogonal trajectories and modeling.'
      },
      {
        id: 'stem_2',
        title: 'Module 02: Definite Integrals as Limits of Sums',
        duration: '3h 30m',
        isCompleted: false,
        isLocked: false,
        summary: 'Properties of definite integrals and high-frequency problem sets.'
      }
    ]
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job_201',
    title: 'Senior Frontend Engineer (React / Next.js / TypeScript)',
    company: 'Apex Digital Systems',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
    location: 'Mumbai (BKC)',
    workplaceType: 'Hybrid',
    salary: '₹14L – ₹22L / year',
    experience: '3+ Years',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'GraphQL'],
    postedTime: '2 days ago',
    matchPercentage: 88,
    description: 'We are seeking an experienced Frontend Architect to spearhead our next-generation community banking and digital experience platform. You will build high-frequency responsive dashboards with accessible components.',
    responsibilities: [
      'Design, build, and optimize customer-facing frontend web applications with React 19 and Next.js.',
      'Maintain modular component libraries adhering to WCAG AA accessibility standards.',
      'Collaborate closely with product designers, UX researchers, and backend service engineers.',
      'Participate in code reviews, technical architecture RFCs, and mentor junior engineers.'
    ],
    requirements: [
      '3+ years of professional hands-on experience with modern TypeScript and React ecosystems.',
      'Strong mastery of state management, custom hooks, and client-side performance profiling.',
      'Solid command of CSS architectures, Tailwind CSS, and responsive fluid layouts.',
      'Demonstrated experience interfacing with GraphQL and REST APIs with optimistic updates.'
    ],
    matchedSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    missingSkills: ['GraphQL', 'Docker', 'Zustand'],
    strengths: 'Your extensive experience with React and modern TypeScript matches the core stack requirements closely.',
    areasToImprove: 'Highlight practical experience with GraphQL schemas and micro-frontend state orchestration.',
    isSaved: true
  },
  {
    id: 'job_202',
    title: 'Backend Services Engineer (Node.js / PostgreSQL)',
    company: 'Barakah Logistics & Commerce',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&auto=format&fit=crop&q=80',
    location: 'Pune (Hinjewadi)',
    workplaceType: 'Remote',
    salary: '₹12L – ₹18L / year',
    experience: '2+ Years',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs'],
    postedTime: 'Just now',
    matchPercentage: 76,
    description: 'Barakah Logistics connects over 5,000 community vendors across western India. Join our distributed backend team to build reliable inventory, dispatch, and settlement APIs.',
    responsibilities: [
      'Write scalable, resilient microservices in TypeScript/Node.js.',
      'Model relational databases, write migrations in Drizzle/Prisma, and optimize complex SQL queries.',
      'Implement asynchronous job processing with Redis and BullMQ.'
    ],
    requirements: [
      '2+ years backend engineering with Node.js and SQL relational databases.',
      'Understanding of ACID transactions, connection pools, and database indexing.',
      'Familiarity with containerized deployments.'
    ],
    matchedSkills: ['Node.js', 'PostgreSQL', 'REST APIs'],
    missingSkills: ['Redis', 'Docker', 'BullMQ'],
    strengths: 'Strong foundations in Node.js and SQL data modeling.',
    areasToImprove: 'Add background queue orchestration and Docker container workflow examples.'
  },
  {
    id: 'job_203',
    title: 'Product Designer (UI/UX & Design Systems)',
    company: 'Sabil Media & EdTech',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=80&auto=format&fit=crop&q=80',
    location: 'Hyderabad (Hitec City)',
    workplaceType: 'Hybrid',
    salary: '₹10L – ₹16L / year',
    experience: '2+ Years',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    postedTime: '3 days ago',
    matchPercentage: 68,
    description: 'Shape the learning interfaces for thousands of students and community members across South Asia. We need an empathetic designer who loves clean typography and ergonomic navigation.',
    responsibilities: [
      'Create end-to-end design flows from discovery wireframes to high-fidelity Figma components.',
      'Test prototypes directly with students and senior community members.',
      'Maintain an exhaustive design token system alongside frontend engineering.'
    ],
    requirements: [
      'Proven portfolio displaying responsive mobile & desktop web applications.',
      'Deep understanding of WCAG 2.2 accessibility, micro-interactions, and spatial hierarchy.'
    ],
    matchedSkills: ['Prototyping', 'Accessibility'],
    missingSkills: ['Figma Tokens', 'User Testing Frameworks'],
    strengths: 'Good empathy for community platforms and accessible web UX.',
    areasToImprove: 'Showcase design system component documentation.'
  },
  {
    id: 'job_204',
    title: 'Associate Data Analyst & Community Intelligence',
    company: 'Vifaq Foundation Research',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80&auto=format&fit=crop&q=80',
    location: 'Mumbai (Mira Road)',
    workplaceType: 'On-site',
    salary: '₹6L – ₹9L / year',
    experience: '1+ Years / Fresher',
    skills: ['Python', 'SQL', 'Tableau / PowerBI', 'Excel Modeling', 'Statistics'],
    postedTime: '5 days ago',
    matchPercentage: 82,
    description: 'Help analyze educational outcome data, demographic surveys, and scholarship allocations to ensure equitable community resource distribution.',
    responsibilities: [
      'Query demographic databases, build automated dashboards, and extract actionable insights for trustees.',
      'Prepare quarterly reports on student progression and career placements.'
    ],
    requirements: [
      'Bachelor’s degree in Data Science, Statistics, Mathematics or Computer Engineering.',
      'High proficiency in SQL, Python pandas, and dashboard storytelling.'
    ],
    matchedSkills: ['SQL', 'Python'],
    missingSkills: ['PowerBI', 'Advanced Statistics'],
    strengths: 'Analytical mindset and familiarity with database queries.',
    areasToImprove: 'Build a sample dashboard visual showcasing public educational data.'
  }
];

export const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: 'evt_301',
    title: 'Annual Ayyam-e-Aza Central Majlis & Tabarruk Gathering',
    type: 'Majlis',
    date: 'Saturday, 10 October 2026',
    rawDate: '2026-10-10',
    time: '08:00 PM – 10:30 PM IST',
    venue: 'Mughal Masjid (Masjid-e-Irani)',
    address: 'Imamwada Road, Bhendi Bazaar, South Mumbai',
    city: 'Mumbai',
    organizer: 'Anjuman-e-Faiz-e-Panjetani',
    organizerContact: '+91 98200 45678',
    distance: '3.4 km away',
    image: '/assets/images/community_event_banner_1791097454868.jpg',
    isRegistered: true,
    isSaved: true,
    registeredCount: 450,
    capacity: 600,
    entryType: 'Free Entry',
    speakers: [
      { name: 'Maulana Syed Ali Raza Rizvi', role: 'Zakir / Khateeb' },
      { name: 'Br. Nadeem Sarwar', role: 'Nauhakhwan' },
      { name: 'Mir Hasan Mir', role: 'Guest Reciter' }
    ],
    schedule: [
      { time: '08:00 PM', activity: 'Recitation of Hadith-e-Kisa & Soz-o-Salam' },
      { time: '08:30 PM', activity: 'Keynote Majlis Discourse on Social Justice' },
      { time: '09:30 PM', activity: 'Matam-o-Noha Khwani' },
      { time: '10:15 PM', activity: 'Ziyarat & Tabarruk Distribution' }
    ],
    description: 'Annual commemorative congregation with scholarly discourse addressing contemporary ethical challenges in light of Karbala, followed by traditional Matam and community Tabarruk.',
    coordinates: { lat: 18.9582, lng: 72.8336 }
  },
  {
    id: 'evt_302',
    title: 'Youth Career Guidance & Civil Services Mentorship Conclave',
    type: 'Education',
    date: 'Sunday, 18 October 2026',
    rawDate: '2026-10-18',
    time: '10:00 AM – 04:00 PM IST',
    venue: 'Al-Iman Educational Complex Auditorium',
    address: 'Naya Nagar, Mira Road (East), Thane',
    city: 'Mira Road',
    organizer: 'Vifaq Youth Empowerment Cell',
    organizerContact: '+91 97690 11223',
    distance: '8.2 km away',
    image: '/assets/images/hero_community_ecosystem_1791097428797.jpg',
    isRegistered: false,
    isSaved: false,
    registeredCount: 310,
    capacity: 400,
    entryType: 'RSVP Required',
    speakers: [
      { name: 'Dr. Rehan Zaidi, IAS', role: 'Keynote Speaker' },
      { name: 'Zehra Rizvi', role: 'VP Engineering, Tech Lead' },
      { name: 'Prof. Mohsin Naqvi', role: 'Career Counselor' }
    ],
    schedule: [
      { time: '10:00 AM', activity: 'Inaugural Address & Landscape of Emerging Tech Careers' },
      { time: '11:30 AM', activity: 'Civil Services & Government Exam Strategy Panel' },
      { time: '01:00 PM', activity: 'Networking Lunch & One-on-One Resume Clinic' },
      { time: '02:30 PM', activity: 'Study Abroad & Scholarship Opportunities' }
    ],
    description: 'An interactive full-day mentorship summit connecting high-schoolers, college graduates, and young professionals with senior officers, engineers, and entrepreneurs.',
    coordinates: { lat: 19.2812, lng: 72.8561 }
  },
  {
    id: 'evt_303',
    title: 'Jashn-e-Milad & Mehfil-e-Adab (Urdu & Persian Poetry)',
    type: 'Mehfil',
    date: 'Friday, 23 October 2026',
    rawDate: '2026-10-23',
    time: '08:30 PM – 11:30 PM IST',
    venue: 'Bandra Community Cultural Pavilion',
    address: 'Near Mehboob Studio, Bandra West',
    city: 'Bandra',
    organizer: 'Bazm-e-Adab Society',
    organizerContact: '+91 98199 87654',
    distance: '5.1 km away',
    image: '/assets/images/community_event_banner_1791097454868.jpg',
    isRegistered: false,
    isSaved: true,
    registeredCount: 180,
    capacity: 250,
    entryType: 'Free Entry',
    speakers: [
      { name: 'Janab Johar Kanpuri', role: 'Poet / Shayer' },
      { name: 'Dr. Waseem Barelvi', role: 'Eminent Poet' }
    ],
    schedule: [
      { time: '08:30 PM', activity: 'Tilawat-e-Quran' },
      { time: '09:00 PM', activity: 'Manqabat & Nazm Recitations' },
      { time: '11:00 PM', activity: 'Honorary felicitations & Tea Reception' }
    ],
    description: 'An evening of profound literary heritage featuring celebrated poets reciting devotional poetry, manqabat, and ethical couplets in a tranquil cultural pavilion.',
    coordinates: { lat: 19.0544, lng: 72.8258 }
  },
  {
    id: 'evt_304',
    title: 'Community Blood Donation Drive & Free Health Camp',
    type: 'Charity',
    date: 'Sunday, 01 November 2026',
    rawDate: '2026-11-01',
    time: '09:00 AM – 03:00 PM IST',
    venue: 'Imambargah Bab-ul-Hawaij',
    address: 'Kurla West, Near Station',
    city: 'Mumbai',
    organizer: 'Imam Husain Blood Donors Society',
    organizerContact: '+91 99201 33445',
    distance: '4.0 km away',
    image: '/assets/images/career_workspace_hub_1791097468289.jpg',
    isRegistered: false,
    isSaved: false,
    registeredCount: 140,
    capacity: 300,
    entryType: 'Free Entry',
    speakers: [
      { name: 'Dr. Farhan Merchant', role: 'Chief Medical Officer' }
    ],
    schedule: [
      { time: '09:00 AM', activity: 'Registration & Initial Vitals Screening' },
      { time: '09:30 AM', activity: 'Blood Donation Camp with KEM Hospital Blood Bank' },
      { time: '01:00 PM', activity: 'Doctor Consultations & Eye Screening' }
    ],
    description: 'Annual civic welfare initiative honoring humanitarian traditions with certified hospital teams providing safe blood collection and basic medical consultations.',
    coordinates: { lat: 19.0657, lng: 72.8794 }
  }
];

export const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: 'app_1',
    jobId: 'job_201',
    jobTitle: 'Senior Frontend Engineer (React / Next.js / TypeScript)',
    company: 'Apex Digital Systems',
    appliedDate: 'Oct 02, 2026',
    status: 'Shortlisted',
    resumeName: 'Ali_Raza_Merchant_CV_2026.pdf'
  },
  {
    id: 'app_2',
    jobId: 'job_202',
    jobTitle: 'Backend Services Engineer (Node.js / PostgreSQL)',
    company: 'Barakah Logistics & Commerce',
    appliedDate: 'Sep 28, 2026',
    status: 'Under Review',
    resumeName: 'Ali_Raza_Merchant_CV_2026.pdf'
  },
  {
    id: 'app_3',
    jobId: 'job_204',
    jobTitle: 'Associate Data Analyst & Community Intelligence',
    company: 'Vifaq Foundation Research',
    appliedDate: 'Sep 15, 2026',
    status: 'Interview',
    resumeName: 'Ali_Raza_Merchant_CV_2026.pdf'
  }
];

export const MOCK_REFERRALS: Referral[] = [
  {
    id: 'ref_1',
    jobTitle: 'Lead Cloud Architect',
    company: 'Tata Consultancy Services (TCS)',
    referrerName: 'Mohsin Jaffer',
    referrerRole: 'Senior Delivery Manager',
    status: 'Available',
    date: '2 days ago'
  },
  {
    id: 'ref_2',
    jobTitle: 'Frontend Engineer (React / React Native)',
    company: 'Swiggy',
    referrerName: 'Fatima Batool',
    referrerRole: 'Staff Software Engineer',
    status: 'Referred',
    date: '1 week ago'
  },
  {
    id: 'ref_3',
    jobTitle: 'Product Operations Analyst',
    company: 'Zerodha',
    referrerName: 'Abbas Khimji',
    referrerRole: 'Product Lead',
    status: 'Available',
    date: 'Yesterday'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Module 03 Unlocked',
    message: 'Your progress in Advanced Full-Stack Engineering has reached 65%. Module 03 on Distributed Systems is now ready.',
    category: 'learning',
    timestamp: '10m ago',
    isRead: false,
    actionUrl: 'education'
  },
  {
    id: 'notif_2',
    title: 'Application Shortlisted',
    message: 'Apex Digital Systems reviewed your resume for Senior Frontend Engineer and moved you to the Shortlisted stage.',
    category: 'career',
    timestamp: '2h ago',
    isRead: false,
    actionUrl: 'jobs'
  },
  {
    id: 'notif_3',
    title: 'Upcoming Community Majlis',
    message: 'Ayyam-e-Aza Central Majlis at Mughal Masjid begins tomorrow at 8:00 PM IST. You have 1 registered pass.',
    category: 'events',
    timestamp: '5h ago',
    isRead: true,
    actionUrl: 'events'
  },
  {
    id: 'notif_4',
    title: 'Live Knowledge Bowl Tonight',
    message: 'The weekly Community Live Knowledge Game starts at 9:00 PM. 128 players have joined the lobby.',
    category: 'learning',
    timestamp: '1d ago',
    isRead: true,
    actionUrl: 'game'
  }
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_8821',
    learnerName: 'Ali Raza Merchant',
    courseName: 'Financial Literacy, Halal Investments & Wealth Building',
    completionDate: 'September 24, 2026',
    certificateId: 'VFQ-FIN-2026-88219',
    grade: 'Excellence (96%)',
    instructor: 'Fatima Merchant, CFA'
  }
];

export const MOCK_LIVE_GAME_QUESTIONS = [
  {
    id: 'gq_1',
    question: 'In the treaty written by Imam Ali (a.s.) to Malik al-Ashtar, what is described as the pillar of the state and religion?',
    options: [
      'The common citizens and general public',
      'The royal treasurers and elite advisors',
      'The standing border military cavalry',
      'The merchants of foreign trade routes'
    ],
    correctIndex: 0,
    fact: 'Imam Ali (a.s.) famously stated: "The support of the state, the stability of religion, and the defense against enemies are the common people of the nation; therefore let your disposition be toward them."'
  },
  {
    id: 'gq_2',
    question: 'In modern distributed computing, what does the CAP theorem state is mutually exclusive in the presence of a network partition?',
    options: [
      'Throughput and Latency',
      'Consistency and Availability',
      'Durability and Encryption',
      'Sharding and Replication'
    ],
    correctIndex: 1,
    fact: 'When a network partition (P) occurs, a distributed system must choose between strict Consistency (C) or uninterrupted Availability (A).'
  },
  {
    id: 'gq_3',
    question: 'Which historic city in India was renowned as the cultural and theological heart of Shia Islamic scholarship during the Awadh era?',
    options: [
      'Lucknow',
      'Ahmedabad',
      'Murshidabad',
      'Aurangabad'
    ],
    correctIndex: 0,
    fact: 'Lucknow served as the illustrious center of theological jurisprudence, literature, and architectural monuments such as the Asafi Imambara.'
  },
  {
    id: 'gq_4',
    question: 'In React 19, what hook provides access to the pending state of an asynchronous form action automatically?',
    options: [
      'useActionState',
      'useFormStatus',
      'useAsyncEffect',
      'usePendingMutation'
    ],
    correctIndex: 1,
    fact: 'useFormStatus gives child components insight into parent <form> submission status, pending boolean, and submitted data.'
  }
];

export const MOCK_LIVE_LEADERBOARD = [
  { rank: 1, name: 'Zainab Fatima', score: 1840, avatar: 'ZF', city: 'Hyderabad', streak: 4 },
  { rank: 2, name: 'Ali Raza Merchant (You)', score: 1690, avatar: 'AR', city: 'Mumbai', streak: 3 },
  { rank: 3, name: 'Hasan Askari', score: 1520, avatar: 'HA', city: 'Lucknow', streak: 2 },
  { rank: 4, name: 'Khadija Rizvi', score: 1410, avatar: 'KR', city: 'Pune', streak: 2 },
  { rank: 5, name: 'Syed Baqir', score: 1280, avatar: 'SB', city: 'Delhi', streak: 1 }
];
