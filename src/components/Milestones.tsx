import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cake, 
  Baby, 
  Moon, 
  Check, 
  Plus,
  ArrowRight,
  Smile,
  ChevronRight,
  BrainCircuit,
  X,
  PlusCircle,
  Star
} from 'lucide-react';
import { UserProfile, MilestoneItem } from '../types';

interface MilestonesProps {
  profile: UserProfile;
}

export default function Milestones({ profile }: MilestonesProps) {
  const babyName = profile.babyName || (profile.stage === 'pregnant' ? 'your baby' : 'Baby');
  const stageLabel = profile.stage === 'pregnant'
    ? (profile.currentMilestone || '24 Weeks')
    : (profile.babyMonths ? `${profile.babyMonths} old` : 'newborn stage');

  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    { id: '1', title: 'First social smile', timeframe: 'Coming up', status: 'soon', icon: 'smile', description: 'Social smiling when talked to or made faces at. Baby starts engaging with the world around them.' },
    { id: '2', title: 'Rolling back to front', timeframe: 'In 2 weeks', status: 'future', icon: 'baby', description: 'Muscle strength builds to coordinate the flip maneuver from tummy to back.' },
    { id: '3', title: 'Holding head upright', timeframe: 'In 4 weeks', status: 'future', icon: 'sparkles', description: 'Neck and shoulder muscles strengthen enough to hold the head steady without support.' },
    { id: '4', title: '8-week sleep regression', timeframe: 'Completed', status: 'completed', icon: 'moon', description: 'Neurological developments trigger brain activity changes affecting sleep loops. You got through it!' }
  ]);

  const [activeArticleModal, setActiveArticleModal] = useState<boolean>(false);
  const [creatorModal, setCreatorModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');
  const [mileToast, setMileToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setMileToast(msg);
    setTimeout(() => setMileToast(null), 3000);
  };

  const handleToggleMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'completed' ? 'soon' : 'completed';
        triggerToast(
          nextStatus === 'completed' 
            ? `"${m.title}" marked complete! 🎉` 
            : `Milestone reverted to pending.`
        );
        return { 
          ...m, 
          status: nextStatus,
          timeframe: nextStatus === 'completed' ? 'Completed' : 'Soon'
        };
      }
      return m;
    }));
  };

  const handleCreateMilestone = () => {
    if (!newTitle.trim()) return;
    const newItem: MilestoneItem = {
      id: Date.now().toString(),
      title: newTitle,
      timeframe: newTime || 'Upcoming',
      status: 'soon',
      icon: 'sparkles',
      description: 'Custom milestone you are tracking for your little one.'
    };
    setMilestones([newItem, ...milestones]);
    setCreatorModal(false);
    setNewTitle('');
    setNewTime('');
    triggerToast(`Added: ${newTitle} ✨`);
  };

  const completed = milestones.filter(m => m.status === 'completed').length;
  const total = milestones.length;

  return (
    <div id="milestones-view" className="bg-[#faf8ff] min-h-screen pb-28 text-slate-900 select-none">
      
      <AnimatePresence>
        {mileToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-6 py-3.5 rounded-full z-50 shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{mileToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full top-0 sticky z-40 bg-white/95 backdrop-blur shadow-sm flex justify-between items-center px-6 h-16 border-b border-violet-100/60">
        <h1 className="font-bold text-violet-700">MamaHub</h1>
        <div className="w-8 h-8 rounded-full bg-violet-100 overflow-hidden border border-violet-200">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      <main className="max-w-md mx-auto py-6">
        
        {/* Hero title + progress */}
        <section className="px-6 mb-6 space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {profile.stage === 'pregnant' ? 'Pregnancy Milestones' : `${babyName}'s Milestones`}
            </h1>
            <p className="text-slate-500 text-xs mt-1">
              {profile.stage === 'pregnant'
                ? `Tracking your journey at ${stageLabel}.`
                : `${babyName}'s developmental journey · ${stageLabel}.`}
            </p>
          </div>

          {/* Progress strip */}
          <div className="bg-white rounded-2xl border border-violet-100 p-4 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6 text-violet-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs font-bold text-slate-700">{completed} of {total} milestones completed</span>
                <span className="text-xs font-mono text-violet-700">{Math.round((completed / Math.max(total, 1)) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${(completed / Math.max(total, 1)) * 100}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Milestone horizontal scroll */}
        <section className="mb-8 overflow-hidden">
          <div className="px-6 mb-3 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Active Milestones</h2>
            <span className="text-xs font-semibold text-violet-600 cursor-pointer"
              onClick={() => triggerToast("Timeline view coming soon! 📅")}>View All</span>
          </div>

          <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar py-2">
            {milestones.length === 0 ? (
              <div className="w-full text-center py-8 text-slate-400 text-xs">
                No milestones yet. Tap + to add your first one!
              </div>
            ) : milestones.map((m) => {
              const isComp = m.status === 'completed';
              return (
                <div 
                  key={m.id}
                  onClick={() => handleToggleMilestone(m.id)}
                  className={`flex-shrink-0 w-44 p-4 rounded-2xl cursor-pointer shadow-sm border transition-all active:scale-[0.97] ${
                    isComp 
                      ? 'bg-emerald-50/50 border-emerald-100 opacity-80' 
                      : m.status === 'soon' 
                        ? 'bg-white border-violet-400 ring-2 ring-violet-400/10 shadow-violet-100' 
                        : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    {m.icon === 'smile' && <Smile className="w-5 h-5 text-violet-600" />}
                    {m.icon === 'cake' && <Cake className="w-5 h-5 text-amber-500" />}
                    {m.icon === 'baby' && <Baby className="w-5 h-5 text-teal-600" />}
                    {m.icon === 'moon' && <Moon className="w-5 h-5 text-indigo-500" />}
                    {m.icon === 'sparkles' && <Sparkles className="w-5 h-5 text-violet-600" />}

                    {m.status === 'soon' && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[9px] font-black uppercase tracking-wider">
                        Soon
                      </span>
                    )}
                    {isComp && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </div>
                  <p className={`font-bold text-xs leading-snug line-clamp-2 ${isComp ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {m.title}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 mt-2">{m.timeframe}</p>
                  {!isComp && (
                    <p className="text-[10px] text-slate-400 mt-1.5 leading-snug line-clamp-2 hidden">{m.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning bento */}
        <section className="px-6 mb-8">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Milestone Learning</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setActiveArticleModal(true)}
              className="col-span-2 relative h-48 rounded-2xl overflow-hidden bg-violet-800 text-white p-6 flex flex-col justify-end group cursor-pointer transition"
            >
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-105 transition duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA30WpwNd4EdSWzuJj1uMhsgWkuDYEeQPfDnfYI_SwiOw60EFVcieyuaQk8_FsLBy6VZK5PCySmBrBQ-ewXvSCfSJZTTKFdg2MElWELey835mCzcwd3ij3md_55sBLiELHmZ1b7JdUBjb-EP1mfgIXAMUkNvwKXq0Q5yeGS8adgXc3Kr9VYIUtr-BfoHtJ2C0p_jnhPUrQozcA5UCphMP08tEEewPZRJfkjpK1sPqI8MtijZj3X9doSKdbbCNQQ7f-K1GG7khnfJ_Br" 
                alt="Mother playing with baby" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-950/20 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-wider inline-block">
                  Recommended
                </span>
                <h3 className="text-base font-extrabold leading-tight">Encouraging {babyName}'s First Crawl</h3>
                <p className="text-violet-200 text-xs font-light">5 min read · Active Activity Guide</p>
              </div>
            </div>

            <div 
              onClick={() => triggerToast("Weaning Stages guide coming soon! 🥦")}
              className="p-5 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col justify-between h-40 cursor-pointer group active:scale-[0.98] transition"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-600 group-hover:scale-110 transition">
                <Smile className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 leading-tight">Weaning Stages</h4>
                <p className="text-[10px] font-medium text-slate-400 mt-1">3 min · Meal Guide</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-amber-400 group-hover:translate-x-1 transition" />
            </div>

            <div 
              onClick={() => triggerToast("Cognitive leaps series coming soon! 🧠")}
              className="p-5 rounded-2xl bg-teal-50 border border-teal-100 flex flex-col justify-between h-40 cursor-pointer group active:scale-[0.98] transition"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-teal-600 group-hover:scale-110 transition">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 leading-tight">Cognitive Leaps</h4>
                <p className="text-[10px] font-medium text-slate-400 mt-1">Article · Brain Development</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-teal-400 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </section>
      </main>

      {/* FAB */}
      <button 
        onClick={() => setCreatorModal(true)}
        className="fixed right-6 bottom-24 w-14 h-14 bg-violet-700 text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-40"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Crawl article modal */}
      <AnimatePresence>
        {activeArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-7 rounded-3xl max-w-sm w-full space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-900 text-base">Encouraging {babyName}'s First Crawl</h3>
                <button onClick={() => setActiveArticleModal(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Start with gentle "tummy time" intervals — 3 to 5 minutes, twice daily. Place high-contrast toys just outside arm reach to encourage reaching and pivoting.
              </p>
              <div className="bg-violet-50 p-4 rounded-xl space-y-2">
                <span className="text-[10px] block font-extrabold text-violet-700 uppercase tracking-widest">Key Readiness Signs</span>
                <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Holds head upright consistently for 30+ seconds</li>
                  <li>Shifts weight from side to side on tummy</li>
                  <li>Reaches forward while on hands and knees</li>
                </ul>
              </div>
              <button 
                className="w-full bg-violet-600 hover:bg-violet-700 py-3.5 text-white font-bold text-xs rounded-xl transition"
                onClick={() => { setActiveArticleModal(false); triggerToast("Marked as read! 📖"); }}
              >
                Mark as Read
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create milestone modal */}
      <AnimatePresence>
        {creatorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/35 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white p-7 rounded-3xl max-w-sm w-full space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900">Add a Milestone</h3>
                <button onClick={() => setCreatorModal(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-700 tracking-wider">Milestone</label>
                  <input 
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g., First word, Rolling over"
                    className="w-full h-12 bg-violet-50/50 border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-700 tracking-wider">Timeframe (optional)</label>
                  <input 
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="E.g., Week 16, In 3 weeks"
                    className="w-full h-12 bg-violet-50/50 border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>

              <button 
                disabled={!newTitle.trim()}
                className={`w-full py-4 text-white transition font-bold rounded-2xl text-sm flex justify-center items-center gap-2 shadow-md ${
                  newTitle.trim() ? 'bg-violet-700 hover:bg-violet-800 cursor-pointer' : 'bg-slate-200 text-slate-400 pointer-events-none'
                }`}
                onClick={handleCreateMilestone}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Milestone</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
