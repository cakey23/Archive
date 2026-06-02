import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  Play,
  Lock,
  Sparkles,
  Search,
  X,
  ListChecks,
  Video,
  FileText,
  Zap,
  Star,
} from 'lucide-react';
import { UserProfile, Course, Lesson } from '../types';
import { ALL_COURSES, getRecommendedCourses, calcPregnancyWeek } from '../courseData';

// ─── Props ────────────────────────────────────────────────────────────────────

interface CoursesProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Courses',
  pregnancy: 'Pregnancy',
  labor: 'Labor & Delivery',
  newborn: 'Newborn Care',
  feeding: 'Feeding',
  sleep: 'Baby Sleep',
  postpartum: 'Postpartum',
  mentalhealth: 'Mental Health',
  safety: 'Baby Safety',
  firstaid: 'First Aid',
  milestones: 'Development',
  nutrition: 'Nutrition',
  partner: 'Partner & Family',
};

const LESSON_TYPE_ICON = {
  video: Video,
  article: FileText,
  interactive: Zap,
  checklist: ListChecks,
};

const DIFFICULTY_COLOR: Record<string, string> = {
  Beginner:     'bg-emerald-50 text-emerald-700 border-emerald-100',
  Intermediate: 'bg-amber-50   text-amber-700   border-amber-100',
  Advanced:     'bg-rose-50    text-rose-700    border-rose-100',
};

function progressColor(pct: number) {
  if (pct === 0)   return 'bg-slate-200';
  if (pct < 50)    return 'bg-violet-400';
  if (pct < 100)   return 'bg-violet-500';
  return 'bg-emerald-500';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Courses({ profile, onUpdateProfile }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeCategory, setActiveCategory]  = useState<string>('all');
  const [searchQuery,    setSearchQuery]      = useState('');
  const [showRecommended, setShowRecommended] = useState(true);

  // Compute pregnancy week for recommended filter
  const pregnancyWeek = profile.dueDate ? calcPregnancyWeek(profile.dueDate) : undefined;
  const recommended   = useMemo(() =>
    getRecommendedCourses(profile.stage, pregnancyWeek).map(c => c.id),
    [profile.stage, pregnancyWeek]
  );

  // Course progress from profile
  const courseProgress = profile.courseProgress ?? {};

  const getProgress = (id: string) => courseProgress[id] ?? 0;

  // Filter courses
  const filtered = useMemo(() => {
    let list = ALL_COURSES;
    if (activeCategory !== 'all') list = list.filter(c => c.category === activeCategory);
    if (showRecommended && activeCategory === 'all') {
      // sort recommended first
      list = [...list].sort((a, b) => {
        const aR = recommended.includes(a.id) ? 0 : 1;
        const bR = recommended.includes(b.id) ? 0 : 1;
        return aR - bR;
      });
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.categoryLabel.toLowerCase().includes(q) ||
        (c.tags ?? []).some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery, showRecommended, recommended]);

  // Mark lesson complete — updates profile.courseProgress
  const handleLessonToggle = (course: Course, lesson: Lesson) => {
    const key = `${course.id}__${lesson.id}`;
    const completedKey = `lesson_done_${key}`;
    const alreadyDone = localStorage.getItem(completedKey) === '1';
    if (alreadyDone) {
      localStorage.removeItem(completedKey);
    } else {
      localStorage.setItem(completedKey, '1');
    }
    // Recalculate course progress
    const doneLessons = course.lessons.filter(l => {
      const k = `lesson_done_${course.id}__${l.id}`;
      const was = localStorage.getItem(k) === '1';
      if (l.id === lesson.id) return !alreadyDone;
      return was;
    }).length;
    const pct = Math.round((doneLessons / course.lessons.length) * 100);
    const newProgress = { ...courseProgress, [course.id]: pct };
    onUpdateProfile({ ...profile, courseProgress: newProgress });
  };

  const isLessonDone = (courseId: string, lessonId: string) =>
    localStorage.getItem(`lesson_done_${courseId}__${lessonId}`) === '1';

  // ── Course detail view ────────────────────────────────────────────────────

  if (selectedCourse) {
    const prog = getProgress(selectedCourse.id);
    const doneLessons = selectedCourse.lessons.filter(l => isLessonDone(selectedCourse.id, l.id)).length;
    return (
      <div className="bg-[#faf8ff] min-h-screen pb-28 select-none">
        {/* Sticky header */}
        <header className="sticky top-0 z-40 bg-white border-b border-violet-100 shadow-sm flex items-center gap-3 px-5 h-14">
          <button onClick={() => setSelectedCourse(null)} className="p-1 rounded-full hover:bg-violet-50 text-slate-600 transition">
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <span className="font-extrabold text-sm text-slate-800 truncate flex-1">{selectedCourse.title}</span>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${DIFFICULTY_COLOR[selectedCourse.difficulty]}`}>
            {selectedCourse.difficulty}
          </span>
        </header>

        {/* Hero gradient card */}
        <div className={`bg-gradient-to-br ${selectedCourse.colorFrom} ${selectedCourse.colorTo} px-6 pt-6 pb-8 text-white`}>
          <div className="text-4xl mb-3">{selectedCourse.emoji}</div>
          <h1 className="text-xl font-extrabold leading-tight mb-2">{selectedCourse.title}</h1>
          <p className="text-white/80 text-xs leading-relaxed mb-4">{selectedCourse.description}</p>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-[11px] font-bold">
              <BookOpen className="w-3.5 h-3.5"/>{selectedCourse.totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-[11px] font-bold">
              <Clock className="w-3.5 h-3.5"/>{selectedCourse.estimatedHours}h total
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-[11px] font-bold">
              <CheckCircle className="w-3.5 h-3.5"/>{doneLessons}/{selectedCourse.totalLessons} done
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white border-b border-slate-100 px-6 py-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] font-bold text-slate-500">Course progress</span>
            <span className="text-[11px] font-extrabold text-violet-700">{prog}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${prog === 100 ? 'bg-emerald-500' : 'bg-violet-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${prog}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          {prog === 100 && (
            <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5"/>Course complete!
            </p>
          )}
        </div>

        {/* Tags */}
        {(selectedCourse.tags ?? []).length > 0 && (
          <div className="px-6 pt-4 pb-1 flex flex-wrap gap-2">
            {(selectedCourse.tags ?? []).map(tag => (
              <span key={tag} className="text-[10px] font-semibold bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Lesson list */}
        <div className="px-5 pt-4 pb-8 max-w-md mx-auto space-y-3">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Lessons</h2>
          {selectedCourse.lessons.map((lesson, idx) => {
            const done = isLessonDone(selectedCourse.id, lesson.id);
            const TypeIcon = LESSON_TYPE_ICON[lesson.type] ?? FileText;
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => handleLessonToggle(selectedCourse, lesson)}
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition active:scale-[0.98] ${
                  done
                    ? 'bg-emerald-50 border-emerald-100'
                    : 'bg-white border-violet-100 hover:border-violet-300'
                }`}
              >
                {/* Lesson number / check */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold transition-colors ${
                  done ? 'bg-emerald-500 text-white' : 'bg-violet-100 text-violet-700'
                }`}>
                  {done ? <CheckCircle className="w-4 h-4"/> : idx + 1}
                </div>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold leading-snug ${done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <TypeIcon className="w-3 h-3 text-slate-400"/>
                    <span className="text-[10px] text-slate-400 capitalize">{lesson.type}</span>
                    <span className="text-[10px] text-slate-400">·</span>
                    <Clock className="w-3 h-3 text-slate-400"/>
                    <span className="text-[10px] text-slate-400">{lesson.durationMin} min</span>
                  </div>
                </div>

                {/* Action */}
                {done
                  ? <span className="text-[10px] font-bold text-emerald-600 shrink-0">Done</span>
                  : <Play className="w-4 h-4 text-violet-500 shrink-0"/>
                }
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Course list view ──────────────────────────────────────────────────────

  return (
    <div className="bg-[#faf8ff] min-h-screen pb-28 select-none">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-violet-100 shadow-sm px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-extrabold text-lg text-slate-900">Learning Hub</h1>
            <p className="text-xs text-slate-400">
              {ALL_COURSES.length} courses · {ALL_COURSES.reduce((s, c) => s + c.totalLessons, 0)} lessons
            </p>
          </div>
          <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-violet-700"/>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search courses…"
            className="w-full h-11 bg-violet-50 border border-violet-100 rounded-xl pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-4 h-4"/>
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${
                activeCategory === id
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-white text-slate-500 border-violet-100 hover:bg-violet-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 pt-5 max-w-md mx-auto space-y-6 pb-8">

        {/* Recommended toggle — only on all-courses view */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-violet-600"/>
              <span className="text-xs font-bold text-slate-700">Recommended for you</span>
            </div>
            <button
              onClick={() => setShowRecommended(v => !v)}
              className={`text-[11px] font-bold px-3 py-1 rounded-full border transition ${
                showRecommended
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              {showRecommended ? 'On' : 'Off'}
            </button>
          </div>
        )}

        {/* Results count */}
        {searchQuery && (
          <p className="text-xs text-slate-400">
            {filtered.length} course{filtered.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <div className="text-4xl">📚</div>
            <p className="text-slate-500 text-sm font-medium">No courses found</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-violet-600 text-xs font-bold underline">
              Clear filters
            </button>
          </div>
        )}

        {/* Course cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((course, idx) => {
              const prog = getProgress(course.id);
              const isRec = recommended.includes(course.id);
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                  onClick={() => setSelectedCourse(course)}
                  className="bg-white rounded-3xl border border-violet-100 shadow-sm overflow-hidden cursor-pointer active:scale-[0.99] transition hover:shadow-md hover:border-violet-200"
                >
                  {/* Gradient stripe top */}
                  <div className={`h-1.5 bg-gradient-to-r ${course.colorFrom} ${course.colorTo}`}/>

                  <div className="p-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.colorFrom} ${course.colorTo} flex items-center justify-center text-2xl shadow-sm`}>
                          {course.emoji}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                            <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
                              {course.categoryLabel}
                            </span>
                            {isRec && showRecommended && activeCategory === 'all' && (
                              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-2.5 h-2.5"/>For you
                              </span>
                            )}
                            {prog === 100 && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                                ✓ Complete
                              </span>
                            )}
                          </div>
                          <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{course.title}</h3>
                        </div>
                      </div>
                      {course.locked
                        ? <Lock className="w-4 h-4 text-slate-300 shrink-0 mt-1"/>
                        : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1"/>
                      }
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <BookOpen className="w-3.5 h-3.5"/>{course.totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock className="w-3.5 h-3.5"/>{course.estimatedHours}h
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLOR[course.difficulty]}`}>
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Progress bar */}
                    {prog > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] text-slate-400 font-medium">Progress</span>
                          <span className="text-[10px] font-extrabold text-violet-700">{prog}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${progressColor(prog)}`}
                            style={{ width: `${prog}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {prog === 0 && (
                      <div className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 text-violet-500"/>
                        <span className="text-[11px] font-bold text-violet-600">Start course</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mt-2">
          <p className="text-[11px] text-violet-700 leading-relaxed text-center">
            All course content is based on AAP, CDC, and Mayo Clinic guidelines. For educational purposes only — always consult your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}