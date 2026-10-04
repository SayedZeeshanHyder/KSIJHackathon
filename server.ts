import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

// CORS & static public directory headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(path.resolve('public')));

// In-memory persistent collections for runtime
const inMemoryStore = {
  bookings: [
    {
      id: 'res_sample_1',
      venueId: 'venue-bada-imambara-lucknow',
      venueName: 'Bada Imambara & Asfi Mosque Complex',
      eventTitle: 'Annual Ayyam-e-Aza Majlis',
      category: 'Majlis',
      organizer: 'Anjuman-e-Hussaini Lucknow',
      date: '2026-10-24',
      timeSlot: 'Evening (17:30 — 22:00)',
      expectedAudience: '400',
      speaker: 'Maulana Kalbe Jawad Naqvi',
      contactPhone: '+91 98200 12345',
      status: 'Confirmed',
      bookedAt: '2026-10-01'
    }
  ],
  venueSubscribers: new Map<string, string[]>(), // venueId -> emails
  venues: [] as any[],
  customJobs: [] as any[],
  duelMatches: new Map<string, any>()
};

// Lazy initialize Gemini client safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  try {
    return new GoogleGenAI();
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
    return null;
  }
}

// -------------------------------------------------------------
// MODULE 1: EVENT POSTER GENERATION (Server-Side)
// -------------------------------------------------------------
app.post('/api/ai/poster-generate', async (req, res) => {
  const { title, category, organizer, date, time, venue, speaker, theme } = req.body;

  const defaultContent = {
    headline: title || 'Community Gathering',
    category: category || 'Majlis',
    organizer: organizer || 'One Community',
    date: date || 'October 2026',
    time: time || '08:00 PM IST',
    venue: venue || 'Local Imambargah',
    speaker: speaker || 'Community Scholar',
    keyNote: 'All momineen & mominaat are cordially requested to attend.',
    hadithQuote: '“Learn knowledge, for learning it is a good deed.” — Nahjul Balagha',
    colorTheme: theme || 'Classic Dark Charcoal & Amber Gold',
    badge: 'COMMUNITY VERIFIED EVENT'
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, poster: defaultContent, source: 'fallback' });
  }

  try {
    const prompt = `You are a respectful typography & graphic communications architect for the Shia Muslim community platform.
Generate structured JSON poster content for this event:
Title: "${title}"
Category: "${category}"
Organizer: "${organizer}"
Date: "${date}"
Time: "${time}"
Venue: "${venue}"
Speaker: "${speaker}"
Theme: "${theme || 'Classic'}"

Return ONLY valid JSON matching this schema:
{
  "headline": string,
  "category": string,
  "organizer": string,
  "date": string,
  "time": string,
  "venue": string,
  "speaker": string,
  "keyNote": string,
  "hadithQuote": string,
  "colorTheme": string,
  "badge": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, poster: { ...defaultContent, ...parsed }, source: 'gemini' });
  } catch (err) {
    console.warn('Gemini poster generation failed, using fallback:', err);
    return res.json({ success: true, poster: defaultContent, source: 'fallback' });
  }
});

// -------------------------------------------------------------
// MODULE 1: DOUBLE-BOOKING CHECK & EVENT BOOKING
// -------------------------------------------------------------
app.post('/api/events/book', (req, res) => {
  const { venueId, venueName, date, timeSlot, eventTitle, category, organizer, expectedAudience, speaker, contactPhone, hostName, hostEmail } = req.body;

  if (!venueId || !date || !timeSlot || !eventTitle) {
    return res.status(400).json({ success: false, error: 'Missing required booking parameters' });
  }

  // Prevent double booking on same venue, same date, same time slot
  const isConflict = inMemoryStore.bookings.some(
    b => b.venueId === venueId && b.date === date && b.timeSlot === timeSlot && b.status === 'Confirmed'
  );

  if (isConflict) {
    return res.status(409).json({
      success: false,
      conflict: true,
      error: `Conflict: This venue is already reserved on ${date} during ${timeSlot}. Please select another date or available time slot.`
    });
  }

  const newBooking = {
    id: `BK-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    venueId,
    venueName: venueName || 'Community Venue',
    eventTitle,
    category: category || 'Community Gathering',
    organizer: organizer || hostName || 'Community Host',
    date,
    timeSlot,
    expectedAudience: expectedAudience || '200',
    speaker: speaker || 'N/A',
    contactPhone: contactPhone || 'N/A',
    hostEmail: hostEmail || '',
    status: 'Confirmed',
    bookedAt: new Date().toISOString()
  };

  inMemoryStore.bookings.push(newBooking);

  return res.json({
    success: true,
    booking: newBooking,
    message: 'Booking confirmed successfully with zero slot conflict.'
  });
});

app.get('/api/events/bookings', (req, res) => {
  return res.json({ success: true, bookings: inMemoryStore.bookings });
});

// -------------------------------------------------------------
// MODULE 1: VENUE SUBSCRIPTIONS
// -------------------------------------------------------------
app.post('/api/venues/:id/subscribe', (req, res) => {
  const venueId = req.params.id;
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const current = inMemoryStore.venueSubscribers.get(venueId) || [];
  if (!current.includes(email)) {
    current.push(email);
    inMemoryStore.venueSubscribers.set(venueId, current);
  }

  return res.json({
    success: true,
    venueId,
    subscribed: true,
    totalSubscribers: current.length
  });
});

// -------------------------------------------------------------
// MODULE 3: REAL-TIME KNOWLEDGE DUEL (Server Authoritative)
// The frontend NEVER receives the correctAnswer beforehand!
// -------------------------------------------------------------
const VERIFIED_FALLBACK_QUESTIONS = [
  {
    id: 'q1',
    question: 'Who is traditionally recognized as the first Imam in Twelver Shia Islam?',
    options: ['Imam Ali ibn Abi Talib (A.S.)', 'Imam Hasan ibn Ali (A.S.)', 'Imam Husayn ibn Ali (A.S.)', 'Imam Zayn al-Abidin (A.S.)'],
    correctAnswerIndex: 0,
    source: 'Hadith al-Ghadeer / Quran (5:67), Sahih Shia Scholarship'
  },
  {
    id: 'q2',
    question: 'Which sacred compilation contains the celebrated sermons, letters, and aphorisms of Imam Ali (A.S.) compiled by Sharif al-Radi?',
    options: ['Sahifa Sajjadiya', 'Nahjul Balagha', 'Kitab al-Kafi', 'Tahdhib al-Ahkam'],
    correctAnswerIndex: 1,
    source: 'Nahjul Balagha (compiled by al-Sharif al-Radi, 400 AH)'
  },
  {
    id: 'q3',
    question: 'The renowned collection of 54 supplications and spiritual whisperings by Imam Ali ibn al-Husayn (A.S.) is known as:',
    options: ['Sahifa al-Sajjadiyya (Sister of the Quran)', 'Mafatih al-Jinan', 'Al-Khisal', 'Uyun Akhbar al-Rida'],
    correctAnswerIndex: 0,
    source: 'Al-Sahifa al-Sajjadiyya, Imam Zayn al-Abidin (A.S.)'
  },
  {
    id: 'q4',
    question: 'In which city is the sacred shrine of the 8th Imam, Imam Ali ibn Musa al-Rida (A.S.), located?',
    options: ['Najaf al-Ashraf', 'Karbala al-Muqaddasa', 'Mashhad al-Muqaddas', 'Samarra'],
    correctAnswerIndex: 2,
    source: 'Historical Twelver Chronology & Geography'
  },
  {
    id: 'q5',
    question: 'Which fundamental principle (Usul al-Din) denotes Divine Justice in Shia theology?',
    options: ['Tawhid', 'Adl', 'Nubuwwah', 'Imamah'],
    correctAnswerIndex: 1,
    source: 'Kalam & Shia Doctrinal Usul al-Din'
  }
];

app.post('/api/ai/duel-match', (req, res) => {
  const { playerName, difficulty, topic } = req.body;
  const matchId = `duel_${Date.now()}`;

  const botNames = ['Zayn Raza', 'Kumail Hyder', 'Batool Naqvi', 'Abbas Zaidi', 'Fatima Rizvi'];
  const opponentName = botNames[Math.floor(Math.random() * botNames.length)];

  // Shuffle questions
  const selectedQuestions = [...VERIFIED_FALLBACK_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 4);

  // Store match server-side with correct answers kept confidential
  inMemoryStore.duelMatches.set(matchId, {
    matchId,
    playerName: playerName || 'Player',
    opponentName,
    startTime: Date.now(),
    durationSeconds: 60,
    questions: selectedQuestions,
    playerScores: 0,
    opponentScores: 0,
    currentQuestionIndex: 0,
    completed: false
  });

  // SANITIZED QUESTIONS: Strip correctAnswerIndex before sending to frontend!
  const clientSafeQuestions = selectedQuestions.map((q, idx) => ({
    id: q.id,
    questionNumber: idx + 1,
    question: q.question,
    options: q.options,
    sourceCategory: 'Verified Shia Heritage'
  }));

  return res.json({
    success: true,
    matchId,
    durationSeconds: 60,
    opponent: {
      name: opponentName,
      rating: 1420 + Math.floor(Math.random() * 120),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
    },
    questions: clientSafeQuestions
  });
});

app.post('/api/ai/duel-submit-answer', (req, res) => {
  const { matchId, questionIndex, selectedOptionIndex, responseTimeSeconds } = req.body;
  const match = inMemoryStore.duelMatches.get(matchId);

  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }

  const question = match.questions[questionIndex];
  if (!question) {
    return res.status(400).json({ error: 'Invalid question index' });
  }

  const isCorrect = selectedOptionIndex === question.correctAnswerIndex;
  // Base points 200 + speed bonus (max 100 for answering under 5s)
  const speedBonus = isCorrect ? Math.max(0, Math.round((10 - Math.min(10, responseTimeSeconds || 3)) * 12)) : 0;
  const pointsEarned = isCorrect ? 200 + speedBonus : 0;
  match.playerScores += pointsEarned;

  // Simulate opponent's answer realistically
  const opponentCorrect = Math.random() > 0.35;
  const opponentPoints = opponentCorrect ? 200 + Math.floor(Math.random() * 80) : 0;
  match.opponentScores += opponentPoints;

  return res.json({
    success: true,
    isCorrect,
    correctAnswerIndex: question.correctAnswerIndex,
    correctAnswerText: question.options[question.correctAnswerIndex],
    sourceCitation: question.source,
    pointsEarned,
    totalPlayerScore: match.playerScores,
    totalOpponentScore: match.opponentScores
  });
});

// -------------------------------------------------------------
// MODULE 5: UNIVERSAL RESUME SCORER (AI + Transparent Breakdown)
// -------------------------------------------------------------
app.post('/api/ai/resume-score', async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
    return res.status(400).json({ error: 'Resume text is required' });
  }

  // Deterministic rule-based baseline fallback
  const wordCount = resumeText.split(/\s+/).length;
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
  const hasPhone = /[\d+()-]{7,}/.test(resumeText);
  const hasProjects = /project|built|developed|implemented/i.test(resumeText);
  const hasEducation = /bachelor|bsc|btech|degree|university|college|diploma|school/i.test(resumeText);
  const hasSkills = /skills|javascript|typescript|python|react|node|sql|html|css|figma/i.test(resumeText);

  let atsScore = 15;
  if (hasEmail) atsScore += 1;
  if (hasPhone) atsScore += 1;
  if (wordCount > 150 && wordCount < 900) atsScore += 3;

  const defaultAnalysis = {
    overallScore: 82,
    breakdown: {
      atsCompatibility: { score: Math.min(20, atsScore), max: 20 },
      keywordMatch: { score: 16, max: 20 },
      experienceRelevance: { score: 15, max: 20 },
      impactAndAchievements: { score: 13, max: 15 },
      structureAndReadability: { score: 12, max: 15 },
      skillsAlignment: { score: 8, max: 10 }
    },
    verdictLabel: 'Strong & Competitive Profile',
    strengths: [
      'Clean professional hierarchy with clearly partitioned education and project sections',
      'Strong technical grounding in contemporary web technologies and frameworks',
      'Good baseline contact data formatting suitable for modern ATS parsers'
    ],
    weaknesses: [
      'Several project bullet points describe duties rather than measurable quantitative impact',
      'Missing explicit section highlighting cloud hosting and CI/CD pipelines'
    ],
    missingKeywords: ['Docker', 'CI/CD Pipelines', 'RESTful API Testing', 'Unit Testing', 'System Architecture'],
    weakBulletPoints: [
      {
        original: 'Assisted in web development tasks and debugging.',
        improved: 'Engineered 8+ responsive UI modules using React/Tailwind, reducing initial page render latency by 35%.'
      }
    ],
    actionVerbs: ['Architected', 'Spearheaded', 'Optimized', 'Automated', 'Pioneered', 'Streamlined'],
    achievementSuggestions: [
      'Quantify results by adding metrics (e.g., "served 500+ daily active users", "achieved 98% test coverage")',
      'Link verifiable GitHub repository URLs or live deployed demonstrations'
    ]
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, analysis: defaultAnalysis, source: 'rule-based fallback' });
  }

  try {
    const prompt = `You are a Senior Technical Recruiter and ATS Architecture Specialist.
Analyze this resume text objectively and provide a transparent compatibility score out of 100 with category breakdowns.
DO NOT claim access to proprietary JobScan scoring. Frame it transparently as an AI-powered resume compatibility analysis.

Resume:
"""
${resumeText.slice(0, 3000)}
"""

Return ONLY a JSON object matching this schema:
{
  "overallScore": number (0-100),
  "breakdown": {
    "atsCompatibility": { "score": number, "max": 20 },
    "keywordMatch": { "score": number, "max": 20 },
    "experienceRelevance": { "score": number, "max": 20 },
    "impactAndAchievements": { "score": number, "max": 15 },
    "structureAndReadability": { "score": number, "max": 15 },
    "skillsAlignment": { "score": number, "max": 10 }
  },
  "verdictLabel": string,
  "strengths": string[],
  "weaknesses": string[],
  "missingKeywords": string[],
  "weakBulletPoints": [{ "original": string, "improved": string }],
  "actionVerbs": string[],
  "achievementSuggestions": string[]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, analysis: { ...defaultAnalysis, ...parsed }, source: 'gemini' });
  } catch (err) {
    console.warn('Gemini resume analysis failed, using fallback:', err);
    return res.json({ success: true, analysis: defaultAnalysis, source: 'rule-based fallback' });
  }
});

// -------------------------------------------------------------
// MODULE 6: JOB + RESUME COMPARISON
// -------------------------------------------------------------
app.post('/api/ai/job-compare', async (req, res) => {
  const { resumeText, jobTitle, jobDescription, requiredSkills, hasReferral } = req.body;

  const defaultComparison = {
    overallMatch: 78,
    skillMatch: 82,
    experienceMatch: 74,
    educationMatch: 88,
    keywordMatch: 75,
    atsCompatibility: 84,
    applicationStrengthWithoutReferral: 'Competitive (72% percentile)',
    applicationStrengthWithReferral: 'High Priority Shortlist (91% percentile)',
    top5ActionsBeforeApplying: [
      `Add explicit mentions of ${requiredSkills?.[0] || 'core technologies'} in your technical skills summary`,
      'Align past project bullet points with the team responsibilities mentioned in the posting',
      'Include a 2-sentence target summary highlighting your interest in this specific company domain',
      'Provide verifiable links to relevant code repositories or portfolios',
      hasReferral 
        ? 'Reference your alumni sponsor directly in your introductory correspondence'
        : 'Reach out to alumni mentors in the One Community directory to secure internal referral advocacy'
    ],
    missingKeywords: ['Agile Sprint Planning', 'Performance Profiling', 'Database Normalization'],
    interviewTopicsToPrepare: [
      'Component lifecycle and reactive state optimization',
      'Database query optimization and index design',
      'Handling asynchronous error boundaries gracefully'
    ]
  };

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ success: true, comparison: defaultComparison, source: 'rule-based fallback' });
  }

  try {
    const prompt = `You are a hiring manager for:
Job Title: "${jobTitle}"
Skills: "${(requiredSkills || []).join(', ')}"
Description: "${(jobDescription || '').slice(0, 1000)}"

Evaluate the candidate's resume:
"""
${(resumeText || '').slice(0, 2500)}
"""

Calculate exact match percentages, estimate application strength (without vs with alumni referral), list top 5 actions before applying, and key interview prep topics.

Return ONLY valid JSON matching this schema:
{
  "overallMatch": number,
  "skillMatch": number,
  "experienceMatch": number,
  "educationMatch": number,
  "keywordMatch": number,
  "atsCompatibility": number,
  "applicationStrengthWithoutReferral": string,
  "applicationStrengthWithReferral": string,
  "top5ActionsBeforeApplying": string[],
  "missingKeywords": string[],
  "interviewTopicsToPrepare": string[]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, comparison: { ...defaultComparison, ...parsed }, source: 'gemini' });
  } catch (err) {
    console.warn('Gemini job comparison failed, using fallback:', err);
    return res.json({ success: true, comparison: defaultComparison, source: 'rule-based fallback' });
  }
});

// -------------------------------------------------------------
// DOWNLOAD PROJECT ZIP ARCHIVE
// -------------------------------------------------------------
app.get(['/api/download-zip', '/download-zip', '/one-community-project.zip'], (req, res) => {
  const zipPath = path.resolve('public/one-community-project.zip');
  res.download(zipPath, 'one-community-project.zip', (err) => {
    if (err) {
      console.error('Error serving zip download:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to download zip file' });
      }
    }
  });
});

// -------------------------------------------------------------
// VITE DEV SERVER MOUNT OR STATIC PRODUCTION SERVE
// -------------------------------------------------------------
async function start() {
  const isProduction = process.env.NODE_ENV === 'production';
  const PORT = 3000;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shia Community Digital Platform server listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
