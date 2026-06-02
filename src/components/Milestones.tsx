import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cake, 
  Baby, 
  Moon, 
  Check, 
  Plus,
  BookOpen,
  ArrowRight,
  Smile,
  ChevronRight,
  BrainCircuit,
  MessageSquare,
  Volume2,
  X,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { UserProfile, MilestoneItem } from '../types';

interface MilestonesProps {
  profile: UserProfile;
}

export default function Milestones({ profile }: MilestonesProps) {
  // Mock developmental milestones state
  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    { id: '1', title: 'First smile — did it happen?', timeframe: 'Coming up', status: 'soon', icon: 'smile', description: 'Social smiling when talked to or made faces at. Baby starts engaging.' },
    { id: '2', title: 'First birthday in 3 days', timeframe: 'Next week', status: 'future', icon: 'cake', description: 'Major landmark transition. Introduce texturized solid table foods.' },
    { id: '3', title: 'Rolling over — week 16', timeframe: 'In 2 weeks', status: 'future', icon: 'baby', description: 'Muscle strength builds coordinate flip maneuvers from tummy to back.' },
    { id: '4', title: 'Sleep regression — week 8', timeframe: 'Completed', status: 'completed', icon: 'moon', description: 'Neurological developments trigger brain activity changes affecting sleep loops.' }
  ]);

  // Featured crawl guide helper state
  const [activeArticleModal, setActiveArticleModal] = useState<boolean>(false);
  
  // Custom Milestone Creator modal
  const [creatorModal, setCreatorModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');

  // Toast notifier within tab
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
            ? `Milestone "${m.title}" marked completed! 🎉` 
            : `Milestone reverted to pending status.`
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

  // Create milestone
  const handleCreateMilestone = () => {
    if (!newTitle.trim()) return;
    const newItem: MilestoneItem = {
      id: Date.now().toString(),
      title: newTitle,
      timeframe: newTime || 'Week 14',
      status: 'soon',
      icon: 'sparkles',
      description: 'Manually logged caregiver progress monitor.'
    };
    setMilestones([newItem, ...milestones]);
    setCreatorModal(false);
    setNewTitle('');
    setNewTime('');
    triggerToast(`Added tracker: ${newTitle}! ✨`);
  };

  return (
    <div id="milestones-view" className="bg-[#f8f9ff] min-h-screen pb-28 text-slate-900 select-none">
      
      {/* Toast Alert */}
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
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-violet-700 select-none">MamaHub</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-violet-100 overflow-hidden border">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto py-6">
        
        {/* Title Block */}
        <section className="px-6 mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Milestone Tracker</h1>
          <p className="text-slate-500 text-xs mt-1">
            {profile.babyName || 'Leo'}'s developmental journey at {profile.stage === 'pregnant' ? (profile.currentMilestone || '24 Weeks') : (profile.babyMonths || '14 weeks')}.
          </p>
        </section>

        {/* Milestone Horizontal List */}
        <section className="mb-8 overflow-hidden select-none">
          <div className="px-6 mb-3 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider pl-1">Active Milestones</h2>
            <span className="text-xs font-semibold text-violet-700" onClick={() => triggerToast("Filter capabilities unlocks with historical premium! 📅")}>View All</span>
          </div>

          <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar py-2">
            {milestones.map((m) => {
              const isComp = m.status === 'completed';
              return (
                <div 
                  key={m.id}
                  id={`milestone-card-${m.id}`}
                  onClick={() => handleToggleMilestone(m.id)}
                  className={`milestone-card flex-shrink-0 w-44 p-4 rounded-2xl cursor-pointer shadow-sm border transition-all ${
                    isComp 
                      ? 'bg-violet-50/50 border-violet-100 opacity-75' 
                      : m.status === 'soon' 
                        ? 'bg-white border-violet-500 ring-2 ring-violet-500/5' 
                        : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    {/* Render custom icon */}
                    {m.icon === 'smile' && <Smile className="w-5 h-5 text-violet-700" />}
                    {m.icon === 'cake' && <Cake className="w-5 h-5 text-violet-700" />}
                    {m.icon === 'baby' && <Baby className="w-5 h-5 text-violet-700" />}
                    {m.icon === 'moon' && <Moon className="w-5 h-5 text-violet-700" />}
                    {m.icon === 'sparkles' && <Sparkles className="w-5 h-5 text-violet-700" />}

                    {m.status === 'soon' && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[9px] font-black uppercase tracking-wider">
                        Soon
                      </span>
                    )}
                    {isComp && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider flex items-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <p className={`font-bold text-xs leading-snug line-clamp-2 ${isComp ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {m.title}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 mt-2">{m.timeframe}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bento Grid Learning resources */}
        <section className="px-6 mb-8 select-none" id="milestone-learn-bento">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 pl-1">Milestone Learning</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Feature crawl grid */}
            <div 
              id="bento-card-crawl"
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
                <h3 className="text-base font-extrabold leading-tight">Encouraging the First Crawl</h3>
                <p className="text-violet-200 text-xs font-light">5 min read • Active Activity Guide</p>
              </div>
            </div>

            {/* Weaning Small widget */}
            <div 
              id="bento-card-weaning"
              onClick={() => triggerToast("Weaning Stages video loading from pediatric server... 🥦")}
              className="p-5 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col justify-between h-40 cursor-pointer group active:scale-[0.98] transition"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-amber-700 group-hover:scale-110 transition">
                <Smile className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 leading-tight">Weaning Stages</h4>
                <p className="text-[10px] font-medium text-[#4a4455] mt-1">3 min video • Meal Guide</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-amber-400 group-hover:translate-x-1 transition" />
            </div>

            {/* Cognitive grid */}
            <div 
              id="bento-card-leaps"
              onClick={() => triggerToast("Cognitive leaps article series opening soon! 🧠")}
              className="p-5 rounded-2xl bg-teal-50 border border-teal-100/50 flex flex-col justify-between h-40 cursor-pointer group active:scale-[0.98] transition animate-pulse-slow"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-teal-700 group-hover:scale-110 transition">
                <BrainCircuit className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 leading-tight">Cognitive Leaps</h4>
                <p className="text-[10px] font-medium text-[#4a4455] mt-1">Article • Brain Development</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-teal-400 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Button (FAB) and Overlay for creators */}
      <button 
        id="btn-fab-add-milestone"
        onClick={() => setCreatorModal(true)}
        className="fixed right-6 bottom-24 w-14 h-14 bg-violet-700 text-white rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-40 cursor-pointer border border-violet-500"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Crawl manual detailed checklist modal overlay */}
      <AnimatePresence>
        {activeArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-7 rounded-3xl max-w-sm w-full space-y-5 shadow-2xl relative z-10"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-black text-slate-900 text-base">Encouraging the Crawl</h3>
                <button 
                  id="btn-close-article-modal"
                  onClick={() => setActiveArticleModal(false)}
                  className="p-1 rounded-full text-slate-500 hover:bg-slate-150"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Start with gentle "tummy time" intervals (3-5 minutes, twice daily). Place high-contrast toys just outside arm reach.
              </p>
              <div className="pt-2 bg-violet-50 p-4 rounded-xl space-y-2 mt-4">
                <span className="text-[10px] block font-extrabold text-violet-700 uppercase tracking-widest pl-1">Essential Milestones</span>
                <ul className="text-[11px] text-slate-600 space-y-1 pl-1 list-disc list-inside">
                  <li>Holds head upright consistently</li>
                  <li>Discovers weight shifting across core supports</li>
                  <li>Gains forward push mechanics</li>
                </ul>
              </div>
              <button 
                id="btn-close-article"
                className="w-full bg-violet-600 hover:bg-violet-700 py-3.5 text-white font-bold text-xs rounded-xl"
                onClick={() => setActiveArticleModal(false)}
              >
                Mark Read
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Custom milestone tracker */}
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
                <h3 className="font-extrabold text-[#121c28]">Add Milestone Tracker</h3>
                <button 
                  id="btn-close-creator"
                  onClick={() => setCreatorModal(false)}
                  className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-700 pl-1 tracking-wider">Milestone Objective</label>
                  <input 
                    id="input-new-milestone-title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g., Rolling back to front"
                    className="w-full h-12 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-4 text-xs focus:ring-1 focus:ring-violet-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-violet-700 pl-1 tracking-wider">Estimated Timeframe</label>
                  <input 
                    id="input-new-milestone-time"
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="E.g., Week 16 (or In 3 weeks)"
                    className="w-full h-12 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-4 text-xs focus:ring-1 focus:ring-violet-600"
                  />
                </div>
              </div>

              <button 
                id="btn-log-new-milestone"
                disabled={!newTitle.trim()}
                className={`w-full py-4 text-white hover:bg-violet-800 transition font-bold rounded-2xl text-xs flex justify-center items-center gap-1 shadow-md ${
                  newTitle.trim() ? 'bg-violet-700 cursor-pointer' : 'bg-slate-300 pointer-events-none opacity-60'
                }`}
                onClick={handleCreateMilestone}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Tracker</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
