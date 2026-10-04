export interface CommunityJob {
  id: string;
  jobNumber: string; // e.g. "JOB #001"
  title: string;
  company: string;
  location: string;
  type: string; // "Fresher / Entry-Level", "Graduate Trainee", "Apprentice"
  workplace: "Remote" | "Hybrid" | "On-site";
  department: string;
  salary: string;
  postedDate: string;
  referralPartner: string;
  referralCode: string;
  spotsOpen: number;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  fresherEligibility: string;
  mentorName: string;
  mentorTitle: string;
}

export const COMMUNITY_JOBS: CommunityJob[] = [
  {
    id: 'job-001',
    jobNumber: 'JOB #001',
    title: 'Junior Frontend Engineer',
    company: 'One Community Digital Labs',
    location: 'London, UK / Remote',
    type: 'Fresher / Entry-Level',
    workplace: 'Remote',
    department: 'Engineering',
    salary: '£38,000 — £46,000 / yr',
    postedDate: '2 days ago',
    referralPartner: 'One Community Tech Guild Alumni',
    referralCode: 'OCTECH-2026-REF',
    spotsOpen: 3,
    description: 'Join our digital engineering collective building community platforms, responsive web applications, and archive portals. Perfect for recent computer science graduates or bootcamp completers looking for dedicated mentorship and real production impact.',
    responsibilities: [
      'Build responsive, accessible user interfaces using React, TypeScript, and modern CSS/Tailwind',
      'Collaborate with senior designers and backend developers on API integration',
      'Write clean, maintainable frontend components with state management and automated tests',
      'Participate in daily standups, code reviews, and weekly technical mentoring sessions'
    ],
    requiredSkills: ['React', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Git & GitHub'],
    preferredSkills: ['Next.js / Vite', 'REST APIs', 'Figma', 'UI Animation / Framer Motion'],
    fresherEligibility: '2024-2026 graduates in Computer Science, Software Engineering, or equivalent self-taught portfolio.',
    mentorName: 'Tariq Al-Mansoor',
    mentorTitle: 'Lead Software Architect @ One Community'
  },
  {
    id: 'job-002',
    jobNumber: 'JOB #002',
    title: 'Analog Lathe & Audio Mastering Assistant',
    company: 'Sonorum Archive & Sound Studios',
    location: 'Berlin, Germany',
    type: 'Apprenticeship / Fresher',
    workplace: 'On-site',
    department: 'Audio & Studio',
    salary: '€34,000 — €42,000 / yr',
    postedDate: '1 day ago',
    referralPartner: 'Berlin Acoustic & Mastering Guild',
    referralCode: 'BERLIN-SOUND-REF',
    spotsOpen: 2,
    description: 'Learn the craft of vinyl disc cutting on the historic Neumann VMS 80 lathe, tape alignment on Studer A80 1/4-inch recorders, and audio restoration for community oral history preservation.',
    responsibilities: [
      'Assist senior mastering engineers with analog tape calibration and vinyl acetate cutting',
      'Digitize and restore archival community field recordings, recitations, and lectures',
      'Maintain studio documentation, catalogue matrices, and vinyl press quality logs',
      'Operate high-end outboard analog equalizers, compressors, and DAW systems'
    ],
    requiredSkills: ['DAW (Pro Tools / Logic / Reaper)', 'Basic Acoustics', 'Audio Restoration', 'Signal Flow'],
    preferredSkills: ['Tape Machine Operation', 'Vinyl Mastering concepts', 'Audio Clean-up (iZotope RX)'],
    fresherEligibility: 'Graduates of Sound Engineering, Music Technology, Audio Production, or avid analog audio enthusiasts.',
    mentorName: 'Stefan Krause',
    mentorTitle: 'Chief Mastering Engineer'
  },
  {
    id: 'job-003',
    jobNumber: 'JOB #003',
    title: 'Community Content & Reels Producer',
    company: 'One Community Media Network',
    location: 'London, UK / Hybrid',
    type: 'Fresher / Junior',
    workplace: 'Hybrid',
    department: 'Media & Reels',
    salary: '£32,000 — £40,000 / yr',
    postedDate: '3 days ago',
    referralPartner: 'One Community Visual Storytellers',
    referralCode: 'MEDIA-STORY-REF',
    spotsOpen: 2,
    description: 'Capture, edit, and publish high-engagement short-form video reels, documentary snippets, and educational highlights across community channels. Work with archival footage and live community gatherings.',
    responsibilities: [
      'Edit dynamic reels and mini-documentaries from community assemblies and youth programs',
      'Craft compelling typography, subtitle overlays, sound design, and color grading',
      'Manage weekly content editorial schedules and track community audience feedback',
      'Collaborate on camera operation during flagship communal gatherings and festivals'
    ],
    requiredSkills: ['Adobe Premiere Pro / DaVinci Resolve', 'Short-form Video Editing', 'Storyboarding', 'Social Media Trends'],
    preferredSkills: ['After Effects', 'Audio Mixing for Video', 'Graphic Design (Photoshop/Canva)', 'Lighting Basics'],
    fresherEligibility: 'Open to fresh graduates in Film, Media Studies, Digital Journalism, or self-taught creators with an active portfolio.',
    mentorName: 'Zainab Hussain',
    mentorTitle: 'Creative Director of Media'
  },
  {
    id: 'job-004',
    jobNumber: 'JOB #004',
    title: 'Junior Cloud Systems & AI Trainee',
    company: 'Nexus Community Cloud & AI Initiative',
    location: 'Remote (Global)',
    type: 'Graduate Trainee',
    workplace: 'Remote',
    department: 'Cloud & AI',
    salary: '€44,000 — €54,000 / yr',
    postedDate: 'Just now',
    referralPartner: 'Global Alumni Tech Fellowship',
    referralCode: 'NEXUS-AI-FELLOW',
    spotsOpen: 4,
    description: 'An accelerated fellowship for fresh engineers to build intelligent AI workflows, automated transcriptions, semantic search on community archives, and cloud microservices.',
    responsibilities: [
      'Implement AI endpoints and LLM integration using Gemini API and TypeScript/Python',
      'Maintain PostgreSQL databases, schema migrations, and cloud hosting infrastructure',
      'Develop automated speech-to-text pipelines for community speech archives',
      'Ensure high security standards, data privacy, and role-based access control'
    ],
    requiredSkills: ['Python or TypeScript', 'Node.js / Express', 'SQL / PostgreSQL', 'Basic Docker / Cloud'],
    preferredSkills: ['Gemini API / LLM prompting', 'Vector search / Embeddings', 'CI/CD Pipelines'],
    fresherEligibility: 'Graduates in Computer Science, Data Science, Electrical Engineering, or Mathematics (2024-2026).',
    mentorName: 'Dr. Mehdi Rezai',
    mentorTitle: 'Principal Systems Architect'
  },
  {
    id: 'job-005',
    jobNumber: 'JOB #005',
    title: 'Community Assembly & Events Coordinator',
    company: 'Solidarity Foundation UK',
    location: 'London, UK / On-site',
    type: 'Entry-Level / Fresher',
    workplace: 'On-site',
    department: 'Community Ops',
    salary: '£30,000 — £38,000 / yr',
    postedDate: '4 days ago',
    referralPartner: 'Foundation Trustees Council',
    referralCode: 'SOLIDARITY-LEAD',
    spotsOpen: 2,
    description: 'Help coordinate and manage community events, youth educational seminars, guest lecture series, and festival pavilions. A hands-on role in community leadership, volunteer coordination, and logistics.',
    responsibilities: [
      'Coordinate venue logistics, attendee registration, and vendor management for gatherings',
      'Liaise with community speakers, guest scholars, and volunteer stewards',
      'Manage on-site registration desks, ticketing badges, and hospitality arrangements',
      'Gather participant feedback and prepare post-event retrospective reports'
    ],
    requiredSkills: ['Event Coordination', 'Interpersonal Communication', 'Spreadsheets & Docs', 'Time Management'],
    preferredSkills: ['Public Speaking', 'Volunteer Leadership', 'Social Media Coordination'],
    fresherEligibility: 'Fresh graduates of any discipline with strong organizational passion and community volunteer track record.',
    mentorName: 'Fatima Al-Hadi',
    mentorTitle: 'Head of Community Programs'
  },
  {
    id: 'job-006',
    jobNumber: 'JOB #006',
    title: 'Associate Product & UX Designer',
    company: 'One Community Labs',
    location: 'Remote',
    type: 'Junior / Fresher',
    workplace: 'Remote',
    department: 'Design & Arts',
    salary: '£36,000 — £45,000 / yr',
    postedDate: '1 week ago',
    referralPartner: 'Design Guild Alumni',
    referralCode: 'DESIGN-GUILD-REF',
    spotsOpen: 1,
    description: 'Design intuitive, editorial web experiences and mobile interfaces for community education tools, directory apps, and event ticketing. Work closely with senior mentors to refine your craft.',
    responsibilities: [
      'Create high-fidelity wireframes, interactive prototypes, and design specs in Figma',
      'Conduct user interviews with community members and fresh graduates to test workflows',
      'Maintain and expand the One Community typographic design system and token library',
      'Collaborate closely with frontend developers during build sprints'
    ],
    requiredSkills: ['Figma', 'UI/UX Design', 'Wireframing & Prototyping', 'Design Systems'],
    preferredSkills: ['Design Tokens', 'User Research', 'Basic HTML/CSS understanding'],
    fresherEligibility: 'Degree in Interaction Design, HCI, Graphic Design, or a polished digital portfolio with 2+ case studies.',
    mentorName: 'Kamal Danish',
    mentorTitle: 'Head of Product Design'
  }
];
