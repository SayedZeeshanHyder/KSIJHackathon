export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EducationModule {
  id: string;
  moduleNumber: string;
  title: string;
  stream: 'deeni' | 'duniyawi';
  gradeLevel: string; // e.g. "10th Standard", "11th-12th Science", "Level 1 (Foundations)"
  subject: string;
  duration: string;
  lectureVideoUrl: string;
  thumbnail: string;
  description: string;
  keyTopics: string[];
  passingScore: number; // percentage, e.g. 75
  assessment: AssessmentQuestion[];
  nextModuleId?: string;
}

export const EDUCATION_MODULES: EducationModule[] = [
  // ===================== DUNIYAWI (10th Standard / Academic) =====================
  {
    id: 'duni-10-math-01',
    moduleNumber: 'MOD #101',
    title: 'Quadratic Equations & Parabolic Models',
    stream: 'duniyawi',
    gradeLevel: '10th Standard',
    subject: 'Mathematics',
    duration: '24 mins lecture',
    lectureVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: '/src/assets/images/education_session_1791103042527.jpg',
    description: 'Master factorization, completing the square, and quadratic formulas with real-world geometric and physics applications.',
    keyTopics: [
      'Standard form: ax² + bx + c = 0',
      'The Discriminant (b² - 4ac) & nature of roots',
      'Factoring trinomials and completing the square',
      'Graphing vertex and axis of symmetry'
    ],
    passingScore: 75,
    nextModuleId: 'duni-10-sci-02',
    assessment: [
      {
        id: 'q1',
        question: 'For quadratic equation 2x² - 4x + 2 = 0, what is the value of the discriminant (D = b² - 4ac)?',
        options: ['16', '0', '-8', '4'],
        correctIndex: 1,
        explanation: 'b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0, which means there is exactly one real repeated root.'
      },
      {
        id: 'q2',
        question: 'If the roots of ax² + bx + c = 0 are real and distinct, which condition holds true?',
        options: ['b² - 4ac < 0', 'b² - 4ac = 0', 'b² - 4ac > 0', 'b² + 4ac = 0'],
        correctIndex: 2,
        explanation: 'A discriminant greater than zero (D > 0) indicates two distinct real solutions.'
      },
      {
        id: 'q3',
        question: 'Solve for x: x² - 5x + 6 = 0.',
        options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = -1 or x = 6'],
        correctIndex: 0,
        explanation: '(x - 2)(x - 3) = 0 yields x = 2 and x = 3.'
      },
      {
        id: 'q4',
        question: 'What is the sum of roots of the quadratic equation 3x² - 9x + 5 = 0?',
        options: ['-3', '3', '5/3', '-5/3'],
        correctIndex: 1,
        explanation: 'Sum of roots = -b/a = -(-9)/3 = 9/3 = 3.'
      }
    ]
  },
  {
    id: 'duni-10-sci-02',
    moduleNumber: 'MOD #102',
    title: 'Light: Reflection, Refraction & Optical Power',
    stream: 'duniyawi',
    gradeLevel: '10th Standard',
    subject: 'Physics',
    duration: '28 mins lecture',
    lectureVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: '/src/assets/images/jobs_interview_1791103058589.jpg',
    description: 'Learn ray diagrams for concave and convex mirrors, Snell\'s law of refraction, lens formula, and the human eye lens mechanics.',
    keyTopics: [
      'Laws of reflection and spherical mirror formulas',
      'Sign conventions (Cartesian coordinates)',
      'Refractive index & Snell\'s law (n₁ sin θ₁ = n₂ sin θ₂)',
      'Power of a lens (P = 1/f in meters)'
    ],
    passingScore: 75,
    nextModuleId: 'duni-10-bio-03',
    assessment: [
      {
        id: 'q1',
        question: 'What is the focal length of a spherical convex mirror having a radius of curvature of 30 cm?',
        options: ['60 cm', '15 cm', '-15 cm', '30 cm'],
        correctIndex: 1,
        explanation: 'Focal length f = R / 2. For convex mirror, f is positive: 30 / 2 = +15 cm.'
      },
      {
        id: 'q2',
        question: 'A ray of light traveling from rarer to denser medium refracts:',
        options: ['Away from the normal', 'Towards the normal', 'Undeviated', 'Reflects back at 90°'],
        correctIndex: 1,
        explanation: 'Light slows down in an optically denser medium and bends towards the normal line.'
      },
      {
        id: 'q3',
        question: 'What is the SI unit of power of a lens?',
        options: ['Watt', 'Dioptre (D)', 'Candela', 'Lumen'],
        correctIndex: 1,
        explanation: 'The power of a lens is measured in Dioptres (D), where 1 D = 1 m⁻¹.'
      },
      {
        id: 'q4',
        question: 'Which type of mirror is utilized as a rear-view mirror in vehicles because it provides an erect, diminished, and wider field of view?',
        options: ['Concave mirror', 'Plane mirror', 'Convex mirror', 'Parabolic cylindrical mirror'],
        correctIndex: 2,
        explanation: 'Convex mirrors always form erect, virtual, and diminished images with a broad panoramic field of view.'
      }
    ]
  },
  {
    id: 'duni-10-bio-03',
    moduleNumber: 'MOD #103',
    title: 'Life Processes: Cellular Respiration & Circulation',
    stream: 'duniyawi',
    gradeLevel: '10th Standard',
    subject: 'Biology',
    duration: '22 mins lecture',
    lectureVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: '/src/assets/images/community_hall_1791103097676.jpg',
    description: 'Explore human circulatory networks, cardiac valves, aerobic vs anaerobic glucose breakdown, and nephron filtration in kidneys.',
    keyTopics: [
      'Glycolysis, Krebs cycle and ATP generation',
      'Double circulation in human heart (Pulmonary & Systemic)',
      'Structure of nephron and urine formation',
      'Xylem vs Phloem transport in vascular plants'
    ],
    passingScore: 75,
    assessment: [
      {
        id: 'q1',
        question: 'Where does the breakdown of pyruvate using oxygen to produce CO₂, water, and energy take place inside the cell?',
        options: ['Cytoplasm', 'Mitochondria', 'Chloroplast', 'Golgi apparatus'],
        correctIndex: 1,
        explanation: 'Aerobic cellular respiration occurs in the mitochondria.'
      },
      {
        id: 'q2',
        question: 'Which chamber of the human heart pumps oxygenated blood into the aorta to supply the entire body?',
        options: ['Right atrium', 'Right ventricle', 'Left atrium', 'Left ventricle'],
        correctIndex: 3,
        explanation: 'The left ventricle has thick muscular walls to pump oxygen-rich blood through the systemic aorta.'
      },
      {
        id: 'q3',
        question: 'The basic filtration unit of the human kidney is called:',
        options: ['Neuron', 'Nephron', 'Alveolus', 'Glomerular villus'],
        correctIndex: 1,
        explanation: 'Nephrons are the functional microscopic structural filtration units of the renal system.'
      },
      {
        id: 'q4',
        question: 'Blood pressure is measured using an instrument known as:',
        options: ['Stethoscope', 'Sphygmomanometer', 'Barometer', 'Electrocardiograph'],
        correctIndex: 1,
        explanation: 'A sphygmomanometer measures systolic and diastolic arterial blood pressure.'
      }
    ]
  },

  // ===================== ISLAMIC (DEENI) =====================
  {
    id: 'deen-found-01',
    moduleNumber: 'DEEN #01',
    title: 'Foundations of Taharah (Purity) & Salah (Prayer)',
    stream: 'deeni',
    gradeLevel: 'Level 1 (Foundations)',
    subject: 'Fiqh & Worship',
    duration: '26 mins lecture',
    lectureVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: '/src/assets/images/majlis_assembly_1791103671432.jpg',
    description: 'Comprehensive study of Wudhu prerequisites, Tayammum, purification principles, conditions (Shuroot) of Salah, and spiritual presence (Khushu).',
    keyTopics: [
      'Spiritual and physical purity (Taharah al-Batin wa al-Zahir)',
      'Compulsory (Wajib) vs Recommended (Mustahab) steps of Wudhu',
      'The 5 daily obligatory prayers & their designated timeframes',
      'Attaining tranquility and Khushu in Sujood and Ruku'
    ],
    passingScore: 75,
    nextModuleId: 'deen-seerah-02',
    assessment: [
      {
        id: 'q1',
        question: 'What is the primary condition (Shart) regarding intention (Niyyah) in acts of worship like Wudhu and Salah?',
        options: [
          'Pronouncing it aloud in Arabic only',
          'Sincere internal intention purely for the sake of Allah (Qurbatan ila Allah)',
          'Writing it down before prayer',
          'Intention is only required on Fridays'
        ],
        correctIndex: 1,
        explanation: 'The essence of Niyyah resides sincerely in the heart and consciousness, dedicated purely seeking proximity to Allah.'
      },
      {
        id: 'q2',
        question: 'If water is unavailable or its use is harmful due to medical emergency, what substitute purification is performed?',
        options: ['Ghusl', 'Tayammum using clean earth or stone', 'Wiping clothes only', 'Skipping prayer entirely'],
        correctIndex: 1,
        explanation: 'Tayammum is the divine concession using clean earth or natural stone as detailed in Surah al-Ma\'idah.'
      },
      {
        id: 'q3',
        question: 'How many daily obligatory (Wajib) prayers are prescribed in Islam?',
        options: ['3', '5', '7', '10'],
        correctIndex: 1,
        explanation: 'Fajr, Dhuhr, Asr, Maghrib, and Isha constitute the five mandatory daily prayers.'
      },
      {
        id: 'q4',
        question: 'What state of humble focus and mindful tranquility should accompany every believer in prayer?',
        options: ['Riya (showing off)', 'Khushu (devout concentration & awe)', 'Ghaflah (heedlessness)', 'Ujb (vanity)'],
        correctIndex: 1,
        explanation: 'Khushu is the inner presence of heart, reverent focus, and peaceful contemplation before the Creator.'
      }
    ]
  },
  {
    id: 'deen-seerah-02',
    moduleNumber: 'DEEN #02',
    title: 'Prophetic Ethics (Akhlaq) & Communal Solidarity',
    stream: 'deeni',
    gradeLevel: 'Level 2 (Intermediate)',
    subject: 'Seerah & Morals',
    duration: '30 mins lecture',
    lectureVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: '/src/assets/images/community_event_1791103076936.jpg',
    description: 'Examine the Noble Messenger\'s (PBUH) social compacts, the Treaty of Madinah, upholding orphan rights, honesty in trade, and compassion towards neighbors.',
    keyTopics: [
      'The character description: "Indeed, you are of a great moral character" (Al-Qalam: 4)',
      'The Covenant of Madinah: mutual protection and religious tolerance',
      'The Golden Rule of brotherhood and mutual trust (Amanah)',
      'Practical Akhlaq: speaking truth, avoiding backbiting, and honoring promises'
    ],
    passingScore: 75,
    nextModuleId: 'deen-quran-03',
    assessment: [
      {
        id: 'q1',
        question: 'What title was known for Prophet Muhammad (PBUH) among his community even before receiving divine revelation?',
        options: ['Al-Sadiq (The Truthful) and Al-Amin (The Trustworthy)', 'Al-Fatih', 'Al-Hakim', 'Al-Mansoor'],
        correctIndex: 0,
        explanation: 'Due to his flawless honesty and integrity, he was universally revered as Al-Sadiq and Al-Amin.'
      },
      {
        id: 'q2',
        question: 'According to the famous Prophetic Hadith, "None of you truly believes until he loves for his brother...":',
        options: [
          'Wealth and position',
          'What he loves for himself',
          'Higher honors than others',
          'Only that which brings him profit'
        ],
        correctIndex: 1,
        explanation: 'The Prophet taught: "None of you believes until he loves for his brother what he loves for himself."'
      },
      {
        id: 'q3',
        question: 'What historic pact signed in Madinah established mutual defense, social security, and citizenship rights across different faiths?',
        options: ['Treaty of Hudaybiyyah', 'Pact of Aqabah', 'The Constitution / Charter of Madinah', 'Pact of Fudul'],
        correctIndex: 2,
        explanation: 'The Charter of Madinah created an unprecedented pluralistic confederation guaranteeing mutual justice and rights.'
      },
      {
        id: 'q4',
        question: 'Which destructive social vice does the Quran compare to eating the flesh of one\'s deceased brother?',
        options: ['Miserliness', 'Gheebah (Backbiting and slander)', 'Lateness in meetings', 'Forgetfulness'],
        correctIndex: 1,
        explanation: 'In Surah al-Hujurat (49:12), backbiting is vividly rebuked with this poignant moral reminder.'
      }
    ]
  },
  {
    id: 'deen-quran-03',
    moduleNumber: 'DEEN #03',
    title: 'Quranic Reflection (Tadabbur) & Arabic Linguistics',
    stream: 'deeni',
    gradeLevel: 'Level 3 (Advanced)',
    subject: 'Quranic Sciences',
    duration: '32 mins lecture',
    lectureVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: '/src/assets/images/heritage_canopy_1791103694047.jpg',
    description: 'Deep dive into analytical reading of Surah Al-Hujurat and Surah Luqman, linguistic nuances, rhetorical eloquence (Balaghah), and personal spiritual reflection.',
    keyTopics: [
      'The difference between recitation (Tilawah) and contemplation (Tadabbur)',
      'Luqman\'s wisdom to his son regarding humility and prayer',
      'The three root-letter systems in Classical Quranic Arabic',
      'Applying Quranic guidance to modern dilemmas and technology'
    ],
    passingScore: 75,
    assessment: [
      {
        id: 'q1',
        question: 'What is the primary spiritual goal of "Tadabbur" when reading the Quran?',
        options: [
          'Reading as fast as possible to finish the book',
          'Deep reflection, contextual comprehension, and personal transformation',
          'Memorizing letter counts alone',
          'Reciting without understanding meaning'
        ],
        correctIndex: 1,
        explanation: 'Tadabbur refers to deliberate contemplation to understand divine wisdom and implement it into one\'s daily life.'
      },
      {
        id: 'q2',
        question: 'In Surah Luqman, what advice does Luqman give his son regarding posture and walking in public?',
        options: [
          'Walk proudly to intimidate enemies',
          'Do not walk haughtily upon the earth; be moderate in your pace and lower your voice',
          'Always run to every gathering',
          'Speak louder so everyone hears you'
        ],
        correctIndex: 1,
        explanation: 'Surah Luqman (31:18-19) advises genuine modesty, moderate stride, and measured speech.'
      },
      {
        id: 'q3',
        question: 'What does the term "Asbab al-Nuzul" refer to in Quranic sciences?',
        options: [
          'The historical circumstances and contexts of revelation',
          'The font style of manuscripts',
          'The grammatical vowels',
          'The rhythm of chanting'
        ],
        correctIndex: 0,
        explanation: 'Asbab al-Nuzul investigates the specific events and questions during which verses were revealed.'
      },
      {
        id: 'q4',
        question: 'Classical Arabic words are predominantly constructed around how many root consonants?',
        options: ['Two', 'Three', 'Six', 'Eight'],
        correctIndex: 1,
        explanation: 'Most Arabic words derive from a tri-literal (three-letter) root system, conveying a shared core semantic concept.'
      }
    ]
  }
];
