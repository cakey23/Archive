import { Course } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// All 12 course categories with full lesson lists
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_COURSES: Course[] = [
  // ── 1. Pregnancy Basics ────────────────────────────────────────────────────
  {
    id: 'pregnancy-basics',
    title: 'Pregnancy Basics',
    description: 'Everything you need to know about the first, second, and third trimesters — from symptoms to scans.',
    category: 'pregnancy',
    categoryLabel: 'Pregnancy',
    difficulty: 'Beginner',
    totalLessons: 10,
    estimatedHours: 3,
    emoji: '🤰',
    colorFrom: 'from-violet-500',
    colorTo: 'to-purple-600',
    accentColor: 'text-violet-700',
    recommended: true,
    tags: ['Trimesters', 'OB Visits', 'Body Changes'],
    lessons: [
      { id: 'pb1', title: 'How pregnancy is dated — due dates explained', durationMin: 6, type: 'article' },
      { id: 'pb2', title: 'First trimester: what\'s happening week by week', durationMin: 10, type: 'video' },
      { id: 'pb3', title: 'Common first-trimester symptoms & how to cope', durationMin: 8, type: 'article' },
      { id: 'pb4', title: 'Second trimester: growth, anatomy scans, movement', durationMin: 9, type: 'video' },
      { id: 'pb5', title: 'Understanding prenatal tests & screenings', durationMin: 7, type: 'article' },
      { id: 'pb6', title: 'Third trimester: preparing your body & home', durationMin: 10, type: 'video' },
      { id: 'pb7', title: 'Swelling, round ligament pain & other normal signs', durationMin: 6, type: 'article' },
      { id: 'pb8', title: 'Warning signs to always call your OB about', durationMin: 5, type: 'checklist' },
      { id: 'pb9', title: 'Nutrition & supplements guide for each trimester', durationMin: 9, type: 'article' },
      { id: 'pb10', title: 'Birth plan basics: what to think about', durationMin: 7, type: 'interactive' },
    ],
  },

  // ── 2. Labor & Delivery Prep ──────────────────────────────────────────────
  {
    id: 'labor-delivery',
    title: 'Labor & Delivery Prep',
    description: 'Know the signs of labor, understand your options, and walk into the delivery room with confidence.',
    category: 'labor',
    categoryLabel: 'Labor & Delivery',
    difficulty: 'Intermediate',
    totalLessons: 9,
    estimatedHours: 4,
    emoji: '🏥',
    colorFrom: 'from-rose-400',
    colorTo: 'to-pink-600',
    accentColor: 'text-rose-700',
    recommended: true,
    tags: ['Contractions', 'Hospital Bag', 'Pain Management'],
    lessons: [
      { id: 'ld1', title: 'Real vs Braxton Hicks contractions: the difference', durationMin: 7, type: 'video' },
      { id: 'ld2', title: 'Signs labor is starting — and when to go in', durationMin: 8, type: 'article' },
      { id: 'ld3', title: 'The stages of labor explained simply', durationMin: 10, type: 'video' },
      { id: 'ld4', title: 'Pain management options: epidural, nitrous, natural', durationMin: 9, type: 'article' },
      { id: 'ld5', title: 'Induction: what it means and why it happens', durationMin: 7, type: 'article' },
      { id: 'ld6', title: 'C-section: what to expect before, during & after', durationMin: 10, type: 'video' },
      { id: 'ld7', title: 'Pushing techniques and breathing', durationMin: 8, type: 'interactive' },
      { id: 'ld8', title: 'The hospital bag: the only checklist you need', durationMin: 5, type: 'checklist' },
      { id: 'ld9', title: 'Writing and communicating your birth preferences', durationMin: 6, type: 'interactive' },
    ],
  },

  // ── 3. Newborn Care ───────────────────────────────────────────────────────
  {
    id: 'newborn-care',
    title: 'Newborn Care',
    description: 'How to hold, bathe, dress, and soothe your newborn — plus understanding their cues and rhythms.',
    category: 'newborn',
    categoryLabel: 'Newborn Care',
    difficulty: 'Beginner',
    totalLessons: 11,
    estimatedHours: 3.5,
    emoji: '👶',
    colorFrom: 'from-amber-400',
    colorTo: 'to-orange-500',
    accentColor: 'text-amber-700',
    recommended: true,
    tags: ['Bathing', 'Swaddling', 'Crying Cues'],
    lessons: [
      { id: 'nc1', title: 'How to hold and support a newborn safely', durationMin: 6, type: 'video' },
      { id: 'nc2', title: 'The perfect swaddle — step by step', durationMin: 7, type: 'video' },
      { id: 'nc3', title: 'Newborn bath time: sponge baths and first tub baths', durationMin: 8, type: 'video' },
      { id: 'nc4', title: 'Diapering: technique, rash prevention, frequency', durationMin: 6, type: 'article' },
      { id: 'nc5', title: 'Reading your baby\'s cues: hunger, tired, overstimulated', durationMin: 8, type: 'interactive' },
      { id: 'nc6', title: 'Tummy time from day one — why and how', durationMin: 7, type: 'video' },
      { id: 'nc7', title: 'Cord stump care and belly button healing', durationMin: 5, type: 'article' },
      { id: 'nc8', title: 'Soothing a fussy or colicky baby — 5 S\'s method', durationMin: 9, type: 'video' },
      { id: 'nc9', title: 'Normal vs concerning newborn appearances', durationMin: 7, type: 'checklist' },
      { id: 'nc10', title: 'Baby clothes, temperature, and safe dressing', durationMin: 5, type: 'article' },
      { id: 'nc11', title: 'The newborn weight check — what to expect', durationMin: 5, type: 'article' },
    ],
  },

  // ── 4. Breastfeeding & Bottle Feeding ────────────────────────────────────
  {
    id: 'feeding',
    title: 'Breastfeeding & Bottle Feeding',
    description: 'Latch technique, milk supply, bottle intro, and feeding schedules — all in one place.',
    category: 'feeding',
    categoryLabel: 'Feeding',
    difficulty: 'Beginner',
    totalLessons: 10,
    estimatedHours: 3,
    emoji: '🤱',
    colorFrom: 'from-teal-400',
    colorTo: 'to-cyan-600',
    accentColor: 'text-teal-700',
    tags: ['Latch', 'Milk Supply', 'Formula', 'Pumping'],
    lessons: [
      { id: 'f1', title: 'How breastfeeding works: supply & demand', durationMin: 8, type: 'article' },
      { id: 'f2', title: 'Getting a good latch — positions and technique', durationMin: 10, type: 'video' },
      { id: 'f3', title: 'Feeding frequency: how often is normal?', durationMin: 6, type: 'article' },
      { id: 'f4', title: 'Signs baby is getting enough milk', durationMin: 7, type: 'checklist' },
      { id: 'f5', title: 'Common breastfeeding problems & solutions', durationMin: 9, type: 'article' },
      { id: 'f6', title: 'Pumping: building a stash and returning to work', durationMin: 10, type: 'video' },
      { id: 'f7', title: 'Formula feeding: preparation, safety, schedules', durationMin: 8, type: 'article' },
      { id: 'f8', title: 'Combination feeding — making it work', durationMin: 7, type: 'article' },
      { id: 'f9', title: 'Introducing solids: when and how (6 months+)', durationMin: 9, type: 'video' },
      { id: 'f10', title: 'Weaning: a gentle approach', durationMin: 7, type: 'article' },
    ],
  },

  // ── 5. Baby Sleep ──────────────────────────────────────────────────────────
  {
    id: 'baby-sleep',
    title: 'Baby Sleep',
    description: 'Evidence-based sleep guidance for newborns through 12 months — without the overwhelm.',
    category: 'sleep',
    categoryLabel: 'Baby Sleep',
    difficulty: 'Intermediate',
    totalLessons: 9,
    estimatedHours: 3.5,
    emoji: '😴',
    colorFrom: 'from-indigo-400',
    colorTo: 'to-violet-600',
    accentColor: 'text-indigo-700',
    tags: ['Safe Sleep', 'Sleep Training', 'Regressions', 'Naps'],
    lessons: [
      { id: 'sl1', title: 'Safe sleep: the ABCs — AAP 2022 guidelines', durationMin: 8, type: 'article' },
      { id: 'sl2', title: 'Newborn sleep patterns: what to expect (0–3 months)', durationMin: 8, type: 'video' },
      { id: 'sl3', title: 'Building a sleep-friendly environment', durationMin: 6, type: 'checklist' },
      { id: 'sl4', title: 'Wake windows and nap schedules by age', durationMin: 9, type: 'interactive' },
      { id: 'sl5', title: 'The 4-month sleep regression: why it happens', durationMin: 7, type: 'article' },
      { id: 'sl6', title: 'Sleep training methods compared: CIO, Ferber, Fading', durationMin: 10, type: 'article' },
      { id: 'sl7', title: 'Night weaning: a gentle timeline', durationMin: 7, type: 'article' },
      { id: 'sl8', title: 'Overtired baby vs undertired: reading the signs', durationMin: 6, type: 'interactive' },
      { id: 'sl9', title: 'Surviving regressions at 4, 8, and 12 months', durationMin: 8, type: 'article' },
    ],
  },

  // ── 6. Postpartum Recovery ────────────────────────────────────────────────
  {
    id: 'postpartum',
    title: 'Postpartum Recovery',
    description: 'Your body and mind after birth — healing timelines, warning signs, and coming back to yourself.',
    category: 'postpartum',
    categoryLabel: 'Postpartum',
    difficulty: 'Beginner',
    totalLessons: 8,
    estimatedHours: 2.5,
    emoji: '💜',
    colorFrom: 'from-pink-400',
    colorTo: 'to-rose-500',
    accentColor: 'text-pink-700',
    tags: ['Healing', 'C-section Recovery', 'Bleeding', '6-Week Check'],
    lessons: [
      { id: 'pp1', title: 'The first 24 hours after birth — what happens to your body', durationMin: 8, type: 'article' },
      { id: 'pp2', title: 'Vaginal birth recovery: perineum care, stitches', durationMin: 7, type: 'article' },
      { id: 'pp3', title: 'C-section recovery: incision care, movement, timeline', durationMin: 9, type: 'article' },
      { id: 'pp4', title: 'Lochia: what\'s normal and when to call your doctor', durationMin: 6, type: 'checklist' },
      { id: 'pp5', title: 'Pelvic floor basics — why it matters postpartum', durationMin: 8, type: 'video' },
      { id: 'pp6', title: 'Postpartum nutrition: healing through food', durationMin: 7, type: 'article' },
      { id: 'pp7', title: 'Hair loss, sweating, and other surprising changes', durationMin: 6, type: 'article' },
      { id: 'pp8', title: 'Your 6-week check: what to expect and ask', durationMin: 7, type: 'interactive' },
    ],
  },

  // ── 7. Mental Health for Moms ────────────────────────────────────────────
  {
    id: 'mental-health',
    title: 'Mental Health for Moms',
    description: 'Recognizing and addressing postpartum depression, anxiety, and the emotional complexity of new motherhood.',
    category: 'mentalhealth',
    categoryLabel: 'Mental Health',
    difficulty: 'Beginner',
    totalLessons: 8,
    estimatedHours: 2.5,
    emoji: '🌸',
    colorFrom: 'from-purple-400',
    colorTo: 'to-fuchsia-500',
    accentColor: 'text-purple-700',
    tags: ['PPD', 'Anxiety', 'Baby Blues', 'Self-Care'],
    lessons: [
      { id: 'mh1', title: 'Baby blues vs postpartum depression: the difference', durationMin: 8, type: 'article' },
      { id: 'mh2', title: 'Signs of postpartum depression & how to get help', durationMin: 9, type: 'article' },
      { id: 'mh3', title: 'Postpartum anxiety — less talked about but very common', durationMin: 7, type: 'article' },
      { id: 'mh4', title: 'Postpartum rage: why it happens and it\'s okay', durationMin: 6, type: 'article' },
      { id: 'mh5', title: 'Self-compassion practices for exhausted mamas', durationMin: 8, type: 'interactive' },
      { id: 'mh6', title: 'How to ask for help — and accept it', durationMin: 6, type: 'article' },
      { id: 'mh7', title: 'Grounding exercises for anxious moments', durationMin: 7, type: 'interactive' },
      { id: 'mh8', title: 'When and how to find a therapist who specializes in perinatal care', durationMin: 6, type: 'article' },
    ],
  },

  // ── 8. Baby Safety ────────────────────────────────────────────────────────
  {
    id: 'baby-safety',
    title: 'Baby Safety',
    description: 'Car seats, home safety, safe sleep, water safety — a complete guide to protecting your little one.',
    category: 'safety',
    categoryLabel: 'Baby Safety',
    difficulty: 'Beginner',
    totalLessons: 10,
    estimatedHours: 3,
    emoji: '🛡️',
    colorFrom: 'from-green-500',
    colorTo: 'to-teal-600',
    accentColor: 'text-green-700',
    tags: ['Car Seat', 'Babyproofing', 'Safe Sleep', 'Water'],
    lessons: [
      { id: 'bs1', title: 'Car seat basics: installation, fit, and the law', durationMin: 9, type: 'video' },
      { id: 'bs2', title: 'Safe sleep setup: firm surface, no loose items, back sleeping', durationMin: 7, type: 'checklist' },
      { id: 'bs3', title: 'Babyproofing your home room by room', durationMin: 10, type: 'interactive' },
      { id: 'bs4', title: 'Choking hazards: what to watch for as baby grows', durationMin: 8, type: 'article' },
      { id: 'bs5', title: 'Water safety: baths, pools, open water', durationMin: 7, type: 'article' },
      { id: 'bs6', title: 'Sun exposure and sunscreen guidelines for babies', durationMin: 6, type: 'article' },
      { id: 'bs7', title: 'Pet and baby introductions — keeping both safe', durationMin: 7, type: 'article' },
      { id: 'bs8', title: 'Safe sleep products: what to skip (no positioners, bumpers)', durationMin: 6, type: 'checklist' },
      { id: 'bs9', title: 'Hot car prevention — never forget a child', durationMin: 5, type: 'article' },
      { id: 'bs10', title: 'Fire, CO, and home emergency safety with a baby', durationMin: 7, type: 'checklist' },
    ],
  },

  // ── 9. First Aid Basics ───────────────────────────────────────────────────
  {
    id: 'first-aid',
    title: 'First Aid Basics',
    description: 'Infant CPR, choking response, fever management, wound care, and when to call 911.',
    category: 'firstaid',
    categoryLabel: 'First Aid',
    difficulty: 'Intermediate',
    totalLessons: 9,
    estimatedHours: 3,
    emoji: '🏥',
    colorFrom: 'from-red-400',
    colorTo: 'to-rose-600',
    accentColor: 'text-red-700',
    tags: ['CPR', 'Choking', 'Fever', '911', 'Wounds'],
    lessons: [
      { id: 'fa1', title: 'When to call 911 vs. urgent care vs. wait and see', durationMin: 7, type: 'article' },
      { id: 'fa2', title: 'Infant CPR: the 2025 AHA/AAP guidelines', durationMin: 10, type: 'video' },
      { id: 'fa3', title: 'Infant choking response: back blows and chest thrusts', durationMin: 9, type: 'interactive' },
      { id: 'fa4', title: 'Fever thresholds by age — and what to do', durationMin: 8, type: 'article' },
      { id: 'fa5', title: 'Cuts, scrapes, and minor wounds', durationMin: 6, type: 'video' },
      { id: 'fa6', title: 'Burns and scalds: first aid and prevention', durationMin: 7, type: 'article' },
      { id: 'fa7', title: 'Head injuries and falls — when to worry', durationMin: 7, type: 'article' },
      { id: 'fa8', title: 'Allergic reactions: signs, EpiPen basics, food triggers', durationMin: 8, type: 'article' },
      { id: 'fa9', title: 'Building a baby first aid kit', durationMin: 5, type: 'checklist' },
    ],
  },

  // ── 10. Developmental Milestones ──────────────────────────────────────────
  {
    id: 'dev-milestones',
    title: 'Developmental Milestones',
    description: 'Track social, motor, language, and cognitive milestones from birth through 12 months.',
    category: 'milestones',
    categoryLabel: 'Development',
    difficulty: 'Beginner',
    totalLessons: 8,
    estimatedHours: 2.5,
    emoji: '⭐',
    colorFrom: 'from-yellow-400',
    colorTo: 'to-amber-500',
    accentColor: 'text-yellow-700',
    tags: ['Motor Skills', 'Language', 'Social', 'CDC Guidelines'],
    lessons: [
      { id: 'dm1', title: 'How the CDC milestone checklists work', durationMin: 6, type: 'article' },
      { id: 'dm2', title: '0–2 months: what to look for', durationMin: 7, type: 'interactive' },
      { id: 'dm3', title: '2–4 months: smiles, cooing, and head control', durationMin: 7, type: 'video' },
      { id: 'dm4', title: '4–6 months: rolling, reaching, solid-food readiness', durationMin: 8, type: 'video' },
      { id: 'dm5', title: '6–9 months: sitting, babbling, stranger anxiety', durationMin: 8, type: 'video' },
      { id: 'dm6', title: '9–12 months: crawling, standing, first words', durationMin: 8, type: 'video' },
      { id: 'dm7', title: 'Red flags — when to talk to your pediatrician', durationMin: 7, type: 'checklist' },
      { id: 'dm8', title: 'Play ideas that support development at every stage', durationMin: 9, type: 'interactive' },
    ],
  },

  // ── 11. Nutrition for Mom & Baby ──────────────────────────────────────────
  {
    id: 'nutrition',
    title: 'Nutrition for Mom & Baby',
    description: 'Prenatal nutrition, breastfeeding diet, introducing solids, and baby-led weaning.',
    category: 'nutrition',
    categoryLabel: 'Nutrition',
    difficulty: 'Beginner',
    totalLessons: 9,
    estimatedHours: 2.5,
    emoji: '🥦',
    colorFrom: 'from-lime-400',
    colorTo: 'to-green-500',
    accentColor: 'text-lime-700',
    tags: ['Prenatal Vitamins', 'Solids', 'BLW', 'Allergens'],
    lessons: [
      { id: 'nu1', title: 'The most important prenatal nutrients — and why', durationMin: 8, type: 'article' },
      { id: 'nu2', title: 'Foods to avoid during pregnancy', durationMin: 6, type: 'checklist' },
      { id: 'nu3', title: 'Eating for breastfeeding: what actually matters', durationMin: 7, type: 'article' },
      { id: 'nu4', title: 'Iron, vitamin D, and DHA for baby', durationMin: 7, type: 'article' },
      { id: 'nu5', title: 'Starting solids: signs of readiness (4–6 months)', durationMin: 8, type: 'video' },
      { id: 'nu6', title: 'First foods: purees, textures, and portions', durationMin: 9, type: 'video' },
      { id: 'nu7', title: 'Baby-led weaning: what it is and how to start', durationMin: 9, type: 'video' },
      { id: 'nu8', title: 'Introducing the top 9 allergens safely', durationMin: 8, type: 'article' },
      { id: 'nu9', title: 'Meal planning for picky eaters and toddler nutrition', durationMin: 7, type: 'article' },
    ],
  },

  // ── 12. Partner & Family Support ─────────────────────────────────────────
  {
    id: 'partner-support',
    title: 'Partner & Family Support',
    description: 'How partners, grandparents, and family members can give real, useful support in the newborn phase.',
    category: 'partner',
    categoryLabel: 'Partner & Family',
    difficulty: 'Beginner',
    totalLessons: 7,
    estimatedHours: 2,
    emoji: '👨‍👩‍👧',
    colorFrom: 'from-fuchsia-400',
    colorTo: 'to-pink-500',
    accentColor: 'text-fuchsia-700',
    tags: ['Partner Role', 'Grandparents', 'Division of Labour', 'Communication'],
    lessons: [
      { id: 'ps1', title: 'What partners can do in the first two weeks', durationMin: 8, type: 'article' },
      { id: 'ps2', title: 'Sharing night duties without resentment', durationMin: 7, type: 'article' },
      { id: 'ps3', title: 'How to communicate needs when you\'re exhausted', durationMin: 7, type: 'interactive' },
      { id: 'ps4', title: 'Involving grandparents: what helps vs. what doesn\'t', durationMin: 6, type: 'article' },
      { id: 'ps5', title: 'Identity shifts: becoming a parent together', durationMin: 8, type: 'article' },
      { id: 'ps6', title: 'Intimacy and relationship after baby', durationMin: 7, type: 'article' },
      { id: 'ps7', title: 'Creating a village: building your support network', durationMin: 7, type: 'interactive' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Pregnancy week → baby size data (weeks 4–40)
// ─────────────────────────────────────────────────────────────────────────────

export interface WeekData {
  week: number;
  sizeName: string;
  emoji: string;
  lengthCm: number;
  weightG: number;
  developmentNote: string;
  funFact: string;
}

export const PREGNANCY_WEEKS: WeekData[] = [
  { week: 4,  sizeName: 'Poppy seed',   emoji: '🌱', lengthCm: 0.1,  weightG: 0,    developmentNote: 'The embryo implants in the uterine wall. The neural tube that becomes the brain and spinal cord is beginning to form.', funFact: 'Heart cells are already dividing.' },
  { week: 5,  sizeName: 'Apple seed',   emoji: '🍎', lengthCm: 0.4,  weightG: 0,    developmentNote: 'Tiny arm and leg buds are forming. The heart begins to beat — though too faint to hear yet.', funFact: 'The heart beats about 80–85 times per minute at this stage.' },
  { week: 6,  sizeName: 'Sweet pea',    emoji: '🫛', lengthCm: 0.6,  weightG: 0,    developmentNote: 'Tiny facial features including the jaw, cheeks, and chin are forming. The optic vesicles — early eyes — are visible.', funFact: 'Baby has a head and a tail bud — the tail will disappear by week 8.' },
  { week: 7,  sizeName: 'Blueberry',    emoji: '🫐', lengthCm: 1.0,  weightG: 0,    developmentNote: 'Fingers and toes are beginning to form. Baby is developing kidneys and the appendix. Neural development is rapid.', funFact: 'Baby is 10,000 times bigger than at conception.' },
  { week: 8,  sizeName: 'Raspberry',    emoji: '🍓', lengthCm: 1.6,  weightG: 1,    developmentNote: 'All major organs are forming. Eyes have a retina and lens. Taste buds are developing on the tongue.', funFact: 'Baby moves constantly — you just can\'t feel it yet.' },
  { week: 9,  sizeName: 'Cherry',       emoji: '🍒', lengthCm: 2.3,  weightG: 2,    developmentNote: 'Fingers are no longer webbed. Baby can flex at the waist. Muscles are forming and cartilage is developing.', funFact: 'Baby is now officially a fetus, not an embryo.' },
  { week: 10, sizeName: 'Strawberry',   emoji: '🍓', lengthCm: 3.1,  weightG: 4,    developmentNote: 'Vital organs are fully formed and starting to function. Tiny fingernails are appearing. The jaw is developing.', funFact: 'Baby can swallow and kick — it just feels like a flutter to you.' },
  { week: 11, sizeName: 'Lime',         emoji: '🍋', lengthCm: 4.1,  weightG: 7,    developmentNote: 'Baby\'s head is still about half its body length, but the body is catching up. The placenta is now fully functioning.', funFact: 'Baby\'s bone marrow is making white blood cells for the first time.' },
  { week: 12, sizeName: 'Plum',         emoji: '🍑', lengthCm: 5.4,  weightG: 14,   developmentNote: 'Reflexes are developing — baby will curl its fingers when touched. Genitals are forming, though still too early to tell.', funFact: 'The risk of miscarriage drops significantly after week 12.' },
  { week: 13, sizeName: 'Peach',        emoji: '🍑', lengthCm: 7.4,  weightG: 23,   developmentNote: 'Baby has fingerprints — completely unique. Eyes and ears are in their correct positions. The vocal cords are forming.', funFact: 'Baby can make a fist and explore its face with tiny hands.' },
  { week: 14, sizeName: 'Lemon',        emoji: '🍋', lengthCm: 8.7,  weightG: 43,   developmentNote: 'Tiny hair follicles are forming all over baby\'s body. Squinting, frowning, and grimacing are now possible.', funFact: 'Baby is practicing breathing amniotic fluid to develop the lungs.' },
  { week: 15, sizeName: 'Apple',        emoji: '🍎', lengthCm: 10.1, weightG: 70,   developmentNote: 'Baby is moving around a lot. Eyebrows and eyelashes are growing. The skeleton is shifting from cartilage to bone.', funFact: 'Some mamas feel first movements (quickening) around now — feels like bubbles.' },
  { week: 16, sizeName: 'Avocado',      emoji: '🥑', lengthCm: 11.6, weightG: 100,  developmentNote: 'Ears are fully developed — baby can hear your voice. The eyes are facing forward. Baby kicks are getting stronger.', funFact: 'Baby\'s heart pumps about 25 quarts of blood a day.' },
  { week: 17, sizeName: 'Pear',         emoji: '🍐', lengthCm: 13.0, weightG: 140,  developmentNote: 'Baby is adding fat layers under the skin. The skeleton is hardening. Sweat glands are developing.', funFact: 'Baby can hear loud sounds from outside the womb.' },
  { week: 18, sizeName: 'Sweet potato', emoji: '🍠', lengthCm: 14.2, weightG: 190,  developmentNote: 'Baby is yawning, hiccupping, rolling, twisting, and kicking. The ears are developed enough to hear sounds clearly.', funFact: 'If you\'re having a girl, her uterus is fully formed and she already has all her eggs.' },
  { week: 19, sizeName: 'Mango',        emoji: '🥭', lengthCm: 15.3, weightG: 240,  developmentNote: 'Vernix caseosa — a white, waxy coating — is forming over baby\'s skin to protect it from the amniotic fluid.', funFact: 'Baby\'s senses of taste, smell, hearing, sight, and touch are all developing.' },
  { week: 20, sizeName: 'Banana',       emoji: '🍌', lengthCm: 16.5, weightG: 300,  developmentNote: 'Halfway! Baby is swallowing amniotic fluid and developing taste preferences. Nails reach the ends of the fingers.', funFact: 'This is when anatomy scans check for organ development — a big milestone.' },
  { week: 21, sizeName: 'Carrot',       emoji: '🥕', lengthCm: 26.7, weightG: 360,  developmentNote: 'Baby\'s skin is becoming more opaque. Eyebrows and eyelids are fully developed. Movements are becoming patterned.', funFact: 'Baby gets hiccups often — you might feel them as rhythmic pulses.' },
  { week: 22, sizeName: 'Papaya',       emoji: '🫶', lengthCm: 27.8, weightG: 430,  developmentNote: 'Baby looks like a miniature newborn. Sense of touch is developing — baby loves to grab the umbilical cord.', funFact: 'Lip sensitivity is now developed — great for breastfeeding preparation.' },
  { week: 23, sizeName: 'Grapefruit',   emoji: '🍊', lengthCm: 28.9, weightG: 501,  developmentNote: 'Baby can sense light and dark through the uterine wall. The inner ear is fully developed — baby can feel motion.', funFact: 'Loud sounds from outside can make baby jump.' },
  { week: 24, sizeName: 'Corn',         emoji: '🌽', lengthCm: 30.0, weightG: 600,  developmentNote: 'Baby\'s face is fully formed. Taste buds are working. The lungs are developing air sacs (alveoli) — key for breathing.', funFact: 'Week 24 is a key viability milestone — babies born now have a fighting chance with intensive care.' },
  { week: 25, sizeName: 'Cauliflower',  emoji: '🥦', lengthCm: 34.6, weightG: 660,  developmentNote: 'Baby\'s hands are fully developed with grasping reflexes. Fat continues accumulating. Wrinkled skin is smoothing out.', funFact: 'Baby is most active between 9 p.m. and 1 a.m. — when you\'re trying to sleep.' },
  { week: 26, sizeName: 'Lettuce',      emoji: '🥬', lengthCm: 35.6, weightG: 760,  developmentNote: 'Eyes open for the first time. The immune system is maturing with antibodies from you. Baby inhales and exhales amniotic fluid.', funFact: 'Baby\'s brain is very active during sleep — dreaming may be starting.' },
  { week: 27, sizeName: 'Rutabaga',     emoji: '🫚', lengthCm: 36.6, weightG: 875,  developmentNote: 'Baby can recognize your voice and may respond to music. The lungs are maturing fast. Eyelashes are now present.', funFact: 'Third trimester begins! Baby will roughly triple in weight from here.' },
  { week: 28, sizeName: 'Eggplant',     emoji: '🍆', lengthCm: 37.6, weightG: 1005, developmentNote: 'Baby can blink, cough, and more. Brain waves show REM sleep. Baby\'s heart rate responds to stimulation.', funFact: 'Kick counts start now — aim for 10 movements in 2 hours.' },
  { week: 29, sizeName: 'Butternut squash', emoji: '🎃', lengthCm: 38.6, weightG: 1153, developmentNote: 'Muscles and lungs continue maturing. Baby can control its own body temperature. Bones are fully developed but still soft.', funFact: 'Baby pees about a pint of urine into the amniotic fluid every day.' },
  { week: 30, sizeName: 'Cabbage',      emoji: '🥬', lengthCm: 39.9, weightG: 1319, developmentNote: 'Brain wrinkles (sulci) are forming to accommodate rapid growth. Bone marrow is now fully producing red blood cells.', funFact: 'Baby\'s lanugo (fine hair) begins to shed as fat fills the skin.' },
  { week: 31, sizeName: 'Coconut',      emoji: '🥥', lengthCm: 41.1, weightG: 1502, developmentNote: 'Baby is moving into a head-down position. Lungs are almost fully mature. Irises can now dilate and contract.', funFact: 'Baby can process information from all five senses.' },
  { week: 32, sizeName: 'Squash',       emoji: '🫙', lengthCm: 42.4, weightG: 1702, developmentNote: 'Fingernails reach the fingertip. Baby is practicing breathing 30–40% of the time. Skin is less wrinkled as fat builds.', funFact: 'If born now, baby has a 95% survival rate with proper NICU care.' },
  { week: 33, sizeName: 'Pineapple',    emoji: '🍍', lengthCm: 43.7, weightG: 1918, developmentNote: 'Baby\'s immune system is receiving antibodies from you. Skull bones remain soft and flexible for birth. Sleep cycles are regular.', funFact: 'Baby may have hair on its head — though that varies widely.' },
  { week: 34, sizeName: 'Cantaloupe',   emoji: '🍈', lengthCm: 45.0, weightG: 2146, developmentNote: 'Vernix thickens. Central nervous system is maturing. Baby practices grasping. Most internal organs are mature.', funFact: 'Babies born at 34 weeks generally do well with some NICU time.' },
  { week: 35, sizeName: 'Honeydew melon', emoji: '🍈', lengthCm: 46.2, weightG: 2383, developmentNote: 'Baby\'s kidneys are fully developed. The liver can process some waste. Folds in the brain are increasing in complexity.', funFact: 'Baby is gaining about half a pound per week now.' },
  { week: 36, sizeName: 'Romaine lettuce', emoji: '🥬', lengthCm: 47.4, weightG: 2622, developmentNote: 'Baby is considered "early term" from week 37. Lungs and brain still maturing. Many babies drop into the pelvis now.', funFact: 'You may feel "lightning crotch" as baby drops — totally normal.' },
  { week: 37, sizeName: 'Winter melon',  emoji: '🍈', lengthCm: 48.6, weightG: 2859, developmentNote: 'Baby is early term. All systems are go. Baby is practicing swallowing, sucking, blinking, and breathing.', funFact: 'Every week in the womb from here adds brain development — try to wait for labor.' },
  { week: 38, sizeName: 'Leek',         emoji: '🥒', lengthCm: 49.8, weightG: 3083, developmentNote: 'Baby has a firm grasp. Skull is still flexible. Fat pads on cheeks for nursing. Meconium is building in the intestines.', funFact: 'Your baby already knows your voice, heartbeat, and even your smell.' },
  { week: 39, sizeName: 'Watermelon',   emoji: '🍉', lengthCm: 50.7, weightG: 3288, developmentNote: 'Baby is full term! The brain and lungs have had extra time to develop. Baby is fully coated in vernix to protect skin.', funFact: 'Babies born at 39–40 weeks have the best outcomes for lung and brain development.' },
  { week: 40, sizeName: 'Small pumpkin', emoji: '🎃', lengthCm: 51.2, weightG: 3462, developmentNote: 'Due date week! Baby is ready. Final fat deposits are in place. Baby is taking practice breaths with mature lungs.', funFact: 'Only about 5% of babies are born exactly on their due date — most come within 2 weeks.' },
];

export function getWeekData(week: number): WeekData | undefined {
  const clamped = Math.min(40, Math.max(4, week));
  return PREGNANCY_WEEKS.find(w => w.week === clamped) ?? PREGNANCY_WEEKS[PREGNANCY_WEEKS.length - 1];
}

/** Calculate current pregnancy week from a due date string (YYYY-MM-DD) */
export function calcPregnancyWeek(dueDateStr: string): number {
  const due = new Date(dueDateStr);
  const today = new Date();
  const conceptionApprox = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
  const msElapsed = today.getTime() - conceptionApprox.getTime();
  const weeksElapsed = Math.floor(msElapsed / (7 * 24 * 60 * 60 * 1000));
  return Math.min(42, Math.max(1, weeksElapsed));
}

/** Get current age in days from birth date string (YYYY-MM-DD) */
export function calcBabyAgeDays(birthDateStr: string): number {
  const birth = new Date(birthDateStr);
  const today = new Date();
  return Math.floor((today.getTime() - birth.getTime()) / (24 * 60 * 60 * 1000));
}

/** Convert days to a friendly label like "3 months, 2 weeks" */
export function babyAgeLabel(days: number): string {
  if (days < 7)   return `${days} day${days !== 1 ? 's' : ''} old`;
  if (days < 30)  return `${Math.floor(days / 7)} week${Math.floor(days / 7) !== 1 ? 's' : ''} old`;
  const months = Math.floor(days / 30.4);
  const remWeeks = Math.floor((days - months * 30.4) / 7);
  if (remWeeks > 0) return `${months} mo ${remWeeks}w old`;
  return `${months} month${months !== 1 ? 's' : ''} old`;
}

// Helper: courses relevant for a given stage
export function getRecommendedCourses(stage: 'pregnant' | 'mama', pregnancyWeek?: number): Course[] {
  if (stage === 'pregnant') {
    const week = pregnancyWeek ?? 20;
    if (week < 14) return ALL_COURSES.filter(c => ['pregnancy-basics','nutrition','mental-health','partner-support'].includes(c.id));
    if (week < 28) return ALL_COURSES.filter(c => ['pregnancy-basics','labor-delivery','nutrition','mental-health','baby-safety'].includes(c.id));
    return ALL_COURSES.filter(c => ['labor-delivery','newborn-care','baby-sleep','feeding','baby-safety'].includes(c.id));
  }
  return ALL_COURSES.filter(c => ['newborn-care','feeding','baby-sleep','postpartum','mental-health','dev-milestones'].includes(c.id));
}