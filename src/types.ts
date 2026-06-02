// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  // Core (existing fields, unchanged)
  name: string;
  stage: 'pregnant' | 'mama';
  dueDate?: string;
  babyName?: string;
  babyBirthDate?: string;
  currentMilestone?: string;
  babyMonths?: string;
  isFirstBaby?: boolean;

  // Extended profile fields (new)
  babyNickname?: string;
  babyGender?: 'girl' | 'boy' | 'surprise' | '';
  babyPersonalityNotes?: string;
  feedingPreference?: 'breastfeeding' | 'formula' | 'combination' | 'baby_led' | '';
  sleepGoalHours?: number;
  favoriteThemeColor?: 'violet' | 'rose' | 'peach' | 'teal' | 'lavender';
  mainConcerns?: Array<'sleep' | 'feeding' | 'milestones' | 'postpartum' | 'safety' | 'mentalhealth'>;
  courseProgress?: Record<string, number>; // courseId → percent 0–100
}

// ─── Supplement (existing) ────────────────────────────────────────────────────

export interface Supplement {
  id: string;
  name: string;
  icon: string;
  taken: number;
  target: number;
  unit: string;
}

// ─── Community (existing) ─────────────────────────────────────────────────────

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  tag: string;
  title: string;
  body: string;
  image?: string;
  upvotes: number;
  commentsCount: number;
  voted?: 'up' | 'down';
  saved?: boolean;
}

// ─── Milestones (existing) ────────────────────────────────────────────────────

export interface MilestoneItem {
  id: string;
  title: string;
  timeframe: string;
  status: 'completed' | 'soon' | 'future';
  icon: string;
  description: string;
}

// ─── Learning / Courses (new) ─────────────────────────────────────────────────

export type CourseCategory =
  | 'pregnancy'
  | 'labor'
  | 'newborn'
  | 'feeding'
  | 'sleep'
  | 'postpartum'
  | 'mentalhealth'
  | 'safety'
  | 'firstaid'
  | 'milestones'
  | 'nutrition'
  | 'partner';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  type: 'video' | 'article' | 'interactive' | 'checklist';
  completed?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  categoryLabel: string;
  difficulty: DifficultyLevel;
  totalLessons: number;
  estimatedHours: number;
  emoji: string;
  colorFrom: string; // tailwind gradient from
  colorTo: string;   // tailwind gradient to
  accentColor: string;
  lessons: Lesson[];
  recommended?: boolean;
  locked?: boolean;
  tags?: string[];
}

// ─── Legacy LearningItem (existing, kept for backwards compat) ────────────────

export interface LearningItem {
  id: string;
  title: string;
  duration: string;
  type: string;
  tag: 'Recommended' | 'Video' | 'Article';
  image?: string;
  icon?: string;
}