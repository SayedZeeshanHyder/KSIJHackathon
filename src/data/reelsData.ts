// src/data/reelsData.ts

// Vite resolves these imports at build time and gives you the correct URL.
// Make sure the files live at: src/assets/reel1.mp4 and src/assets/reel2.mp4
import reelDeen1 from '../../assets/reel1.mp4';
import reelDeen2 from '../../assets/reel2.mp4';

export interface EducationalReel {
  id: string;
  title: string;
  stream: 'deeni' | 'duniyawi';
  targetAudience: string;
  category: string;
  duration: string;
  creator: string;
  creatorAvatar: string;
  creatorRole: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  likes: number;
  commentsCount: number;
  shares: number;
  tags: string[];
}

export const COMMUNITY_REELS: EducationalReel[] = [
  // ===================== DEENI REELS (LOCAL ASSETS) =====================
  {
    id: 'reel-deen-01',
    title: '60 Seconds of Tadabbur: The Depth of "Al-Rahman"',
    stream: 'deeni',
    targetAudience: 'All Learners',
    category: 'Quranic Gems',
    duration: '0:58',
    creator: 'Sayyid Ammar',
    creatorAvatar: '/src/assets/images/majlis_assembly_1791103671432.jpg',
    creatorRole: 'Community Scholar & Lecturer',
    videoUrl: reelDeen1, // ← local asset
    thumbnail: '/src/assets/images/majlis_assembly_1791103671432.jpg',
    caption:
      "Why is Allah's mercy described in two distinct names: Ar-Rahman and Ar-Rahim? Here is the profound linguistic difference in under 60 seconds. #DeenIn60 #QuranReflections #OneCommunity",
    likes: 2480,
    commentsCount: 142,
    shares: 890,
    tags: ['Tafseer', 'ArabicLinguistics', 'Deeni', 'QuranGems'],
  },
  {
    id: 'reel-deen-02',
    title: 'Prophetic Composure: Handling Anger in 1 Minute',
    stream: 'deeni',
    targetAudience: 'Youth & Adults',
    category: 'Prophetic Akhlaq',
    duration: '0:59',
    creator: 'Ustadh Tariq Al-Hadi',
    creatorAvatar: '/src/assets/images/community_event_1791103076936.jpg',
    creatorRole: 'Youth Mentor & Educator',
    videoUrl: reelDeen2, // ← local asset
    thumbnail: '/src/assets/images/community_event_1791103076936.jpg',
    caption:
      'When provocation happens, remember the 3 sunnah steps taught by the Prophet: sit down if standing, make wudhu with cool water, and seek refuge from Shaytan. #PropheticEthics #SunnahHabits #Akhlaq',
    likes: 3120,
    commentsCount: 198,
    shares: 1140,
    tags: ['Sunnah', 'MentalHealth', 'Akhlaq', 'Deeni'],
  },
  {
    id: 'reel-deen-03',
    title: 'The Secret of Khushu: Fix Your Mind Before Takbir',
    stream: 'deeni',
    targetAudience: 'Level 1 & 2',
    category: 'Salah Mastery',
    duration: '0:54',
    creator: 'Sister Fatima Zahra',
    creatorAvatar: '/src/assets/images/community_hall_1791103097676.jpg',
    creatorRole: 'Islamic Studies Instructor',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: '/src/assets/images/heritage_canopy_1791103694047.jpg',
    caption:
      'Do you find your mind wandering during prayer? Spend 30 seconds before your Takbir reminding yourself of Who you are standing before. Here is the mental visualization method. #SalahFirst #PrayerFocus',
    likes: 4210,
    commentsCount: 310,
    shares: 1820,
    tags: ['Salah', 'Mindfulness', 'Khushu', 'Deeni'],
  },

  // ===================== DUNIYAWI REELS (1 MINUTE) =====================
  {
    id: 'reel-duni-01',
    title: '10th Math Speed Hack: Quadratic Roots in 20 Seconds',
    stream: 'duniyawi',
    targetAudience: '10th Standard',
    category: '10th Math Shortcut',
    duration: '0:58',
    creator: 'Sir Imran Qureshi',
    creatorAvatar: '/src/assets/images/education_session_1791103042527.jpg',
    creatorRole: 'Senior Mathematics Educator',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: '/src/assets/images/education_session_1791103042527.jpg',
    caption:
      'Stop writing 6 lines of factoring! Use this cross-coefficient mental math trick to solve standard Class 10 Board exam quadratics in under 20 seconds. Save for exam revision! 📐✨ #Class10Math #BoardExamHack #Duniyawi',
    likes: 5820,
    commentsCount: 462,
    shares: 2980,
    tags: ['Class10', 'MathsTricks', 'QuadraticEquations', 'Duniyawi'],
  },
  {
    id: 'reel-duni-02',
    title: "Why Does Light Bend? Snell's Law Visualized in 60s",
    stream: 'duniyawi',
    targetAudience: '10th Science',
    category: 'Physics Concept',
    duration: '1:00',
    creator: 'Dr. Mehdi Rezai',
    creatorAvatar: '/src/assets/images/jobs_interview_1791103058589.jpg',
    creatorRole: 'Physics & Systems Fellow',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: '/src/assets/images/jobs_interview_1791103058589.jpg',
    caption:
      'Think of light as a marching band walking from smooth pavement into muddy grass. The outer wheels slow down first! That is why light refracts. Complete diagram in 60 seconds! 🔬⚡ #PhysicsMadeSimple #Refraction #Science10',
    likes: 3890,
    commentsCount: 215,
    shares: 1450,
    tags: ['Physics', 'Class10Science', 'Optics', 'Duniyawi'],
  },
  {
    id: 'reel-duni-03',
    title: 'Double Circulation in 60s: Pulmonary vs Systemic',
    stream: 'duniyawi',
    targetAudience: '10th Biology',
    category: 'Biology Essentials',
    duration: '0:56',
    creator: 'Dr. Ayesha Noor',
    creatorAvatar: '/src/assets/images/community_hall_1791103097676.jpg',
    creatorRole: 'Medical Educator & Alumni',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: '/src/assets/images/community_hall_1791103097676.jpg',
    caption:
      'Right side = Deoxygenated to lungs. Left side = Oxygenated to body. Remember this 4-step mnemonic to never mix up tricuspid vs bicuspid valves in your upcoming board exams! 🫀🩺 #BiologyExam #HeartAnatomy #10thStandard',
    likes: 4760,
    commentsCount: 288,
    shares: 2190,
    tags: ['Biology', 'Class10Board', 'LifeProcesses', 'Duniyawi'],
  },
];