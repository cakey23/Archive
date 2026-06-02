import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Utensils, 
  Check, 
  Sparkles, 
  ChevronRight, 
  Plus, 
  ArrowLeft,
  BookOpen,
  ArrowRight,
  Award,
  Bell,
  Search,
  Thermometer,
  FileText,
  X,
  Droplets,
  Moon,
  Baby,
  Heart
} from 'lucide-react';
import { UserProfile, Supplement } from '../types';

interface DashboardProps {
  profile: UserProfile;
  onNavigateToEmergency: (guide: 'choking' | 'cpr' | 'fever') => void;
  onNavigateToTab: (tab: string) => void;
}

interface LogEntry {
  id: string;
  type: 'feed' | 'diaper' | 'sleep' | 'mood' | 'food';
  emoji: string;
  label: string;
  detail: string;
  time: string;
}

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const todayLabel = new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

export default function Dashboard({ profile, onNavigateToEmergency, onNavigateToTab }: DashboardProps) {
  const [supplements, setSupplements] = useState<Supplement[]>([
    { id: '1', name: 'Prenatal Multi-Vitamin', icon: '💊', taken: 1, target: 1, unit: 'Daily' },
    { id: '2', name: 'Omega-3 (DHA)', icon: '💧', taken: 0, target: 1, unit: 'Daily' },
    { id: '3', name: 'Folic Acid', icon: '🌱', taken: 1, target: 1, unit: 'Daily' },
    { id: '4', name: 'Iron Supplement', icon: '🥫', taken: 0, target: 2, unit: 'Daily' }
  ]);

  const [activeLearnModule, setActiveLearnModule] = useState(false);
  const [formChecked, setFormChecked] = useState({ head: false, face: false, shoulders: false });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [holdIndex, setHoldIndex] = useState(0);

  // ── DAILY TRACKER STATE ──
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [trackerSheet, setTrackerSheet] = useState<'main' | 'feed' | 'diaper' | 'sleep' | 'mood' | 'food'>('main');
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Feed sub-state
  const [feedType, setFeedType] = useState<'breast' | 'formula' | 'solid' | ''>('');
  const [feedAmount, setFeedAmount] = useState('');
  const [feedNote, setFeedNote] = useState('');

  // Diaper sub-state
  const [diaperType, setDiaperType] = useState<'wet' | 'dirty' | 'both' | ''>('');

  // Sleep sub-state
  const [sleepHours, setSleepHours] = useState('');

  // Mood sub-state
  const [mood, setMood] = useState<'happy' | 'fussy' | 'unwell' | ''>('');

  // Food sub-state
  const [foodName, setFoodName] = useState('');
  const [foodReaction, setFoodReaction] = useState<'great' | 'ok' | 'reaction' | ''>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addLog = (entry: Omit<LogEntry, 'id' | 'time'>) => {
    setLogs(prev => [{ ...entry, id: Date.now().toString(), time: now() }, ...prev]);
    setTrackerSheet('main');
    triggerToast('Logged! ✨');
  };

  const resetSheetState = () => {
    setFeedType(''); setFeedAmount(''); setFeedNote('');
    setDiaperType(''); setSleepHours('');
    setMood(''); setFoodName(''); setFoodReaction('');
  };

  const handleLogFeed = () => {
    if (!feedType) return;
    const labels: Record<string, string> = { breast: 'Breastfed', formula: 'Formula', solid: 'Solid food' };
    addLog({
      type: 'feed', emoji: feedType === 'breast' ? '🤱' : feedType === 'formula' ? '🍼' : '🥣',
      label: labels[feedType],
      detail: feedAmount ? `${feedAmount}${feedType === 'breast' ? ' min' : ' oz'}${feedNote ? ` · ${feedNote}` : ''}` : feedNote || '',
    });
    resetSheetState();
  };

  const handleLogDiaper = () => {
    if (!diaperType) return;
    const labels: Record<string, string> = { wet: 'Wet diaper', dirty: 'Dirty diaper', both: 'Wet & dirty' };
    const emojis: Record<string, string> = { wet: '💧', dirty: '💩', both: '💩' };
    addLog({ type: 'diaper', emoji: emojis[diaperType], label: labels[diaperType], detail: '' });
    resetSheetState();
  };

  const handleLogSleep = () => {
    if (!sleepHours) return;
    addLog({ type: 'sleep', emoji: '😴', label: 'Sleep logged', detail: `${sleepHours} hours` });
    resetSheetState();
  };

  const handleLogMood = () => {
    if (!mood) return;
    const labels: Record<string, string> = { happy: 'Happy & calm', fussy: 'Fussy today', unwell: 'Seems unwell' };
    const emojis: Record<string, string> = { happy: '😊', fussy: '😢', unwell: '🤒' };
    addLog({ type: 'mood', emoji: emojis[mood], label: labels[mood], detail: '' });
    resetSheetState();
  };

  const handleLogFood = () => {
    if (!foodName) return;
    const reactions: Record<string, string> = { great: 'Loved it', ok: 'Ate some', reaction: '⚠️ Possible reaction' };
    addLog({
      type: 'food', emoji: '🥦', label: foodName,
      detail: foodReaction ? reactions[foodReaction] : '',
    });
    resetSheetState();
  };

  const takeSupplement = (id: string) => {
    setSupplements(prev => prev.map(s => {
      if (s.id === id) {
        const nextVal = s.taken >= s.target ? 0 : s.taken + 1;
        if (nextVal === s.target) triggerToast(`Daily target reached for ${s.name}! ✨`);
        return { ...s, taken: nextVal };
      }
      return s;
    }));
  };

  const handleBulkLog = () => {
    setSupplements(prev => prev.map(s => ({ ...s, taken: s.target })));
    triggerToast("All daily supplements successfully logged! 🌟");
  };

  const holds = [
    {
      title: "01 — Cradle Hold",
      description: "Best for feeding and eye contact. Ensure the head is elevated slightly above the stomach levels.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7_GBAc71FXc2W9b41mY0IaPw5w693YoJN4wKCiXfAKK0OgcQfFfIYGpVrTPlZahXJsLGA-lNsr3zvi79Q_JzcCI8qrpANvvhSb3w4ppyjcqRILNmnQ6UlLAJ-qd3BGdU45VX-SM-ZBxhmTEMbPwZ2gULZBOllHA3-xNROdYpUzauuJeCuNeyp42FFypIQkC1uXnoF8OGhapIOhcXQ63b2YioDx-aIQb1N_7xLY0tgkcRM5fqyDJDjGhjWAURkMLHax1JujpatHwaL"
    },
    {
      title: "02 — Shoulder Snuggle",
      description: "Ideal for comforting distressed babies. Keeps baby's chest close to yours with neck support.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCS0MPF6fm8NWMfN2Y_Z5SeCXb1xfRdj31EWIGvDHJdT0Nn0D5QZjB5_MmoQVSHqdJ45_as3Zr5StX0-Ja_QWp6CyaSLOm0fyRpxrmGWEMifXHK_3v4DDi3vDWvQ29yBgbDCFUU26HPhd7oT0DipbadVoPE8UR4k5efwoVteso6DZb9nrX6zveq6C69o4fT0tqXX_w2QoCzSwlseKKOHAXn4TD3q1nIqG-BT6zubLvN2pzqHviYvWp86Kpgs8t00AU6K_qY9p5pE8jV"
    }
  ];

  // Summary counts for the tracker tile
  const feedCount = logs.filter(l => l.type === 'feed').length;
  const diaperCount = logs.filter(l => l.type === 'diaper').length;
  const sleepLog = logs.find(l => l.type === 'sleep');

  return (
    <div id="dashboard-view" className="bg-[#f8f9ff] min-h-screen pb-28 text-slate-900 select-none">

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-6 py-3.5 rounded-full z-50 shadow-2xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Tracker Bottom Sheet */}
      <AnimatePresence>
        {trackerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40" onClick={() => { setTrackerOpen(false); setTrackerSheet('main'); resetSheetState(); }} />
            
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white rounded-t-3xl shadow-2xl pb-8"
            >
              {/* Sheet handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              {/* MAIN SHEET */}
              {trackerSheet === 'main' && (
                <div className="px-5 pt-2 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Today's Log</h3>
                      <p className="text-xs text-slate-400">{todayLabel}</p>
                    </div>
                    <button onClick={() => { setTrackerOpen(false); resetSheetState(); }}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>

                  {/* Quick log buttons */}
                  <div className="grid grid-cols-4 gap-3 mt-4 mb-5">
                    {[
                      { key: 'feed', emoji: '🍼', label: 'Feed' },
                      { key: 'diaper', emoji: '💧', label: 'Diaper' },
                      { key: 'sleep', emoji: '😴', label: 'Sleep' },
                      { key: 'mood', emoji: '😊', label: 'Mood' },
                      { key: 'food', emoji: '🥦', label: 'Food' },
                    ].map(item => (
                      <button key={item.key}
                        onClick={() => setTrackerSheet(item.key as any)}
                        className="flex flex-col items-center gap-1.5 bg-[#f5f3ff] hover:bg-violet-100 border border-violet-100 rounded-2xl py-3 px-1 transition active:scale-95">
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-[10px] font-bold text-violet-700">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Today's summary strip */}
                  {logs.length > 0 && (
                    <div className="flex gap-3 mb-4 overflow-x-auto pb-1 no-scrollbar">
                      {feedCount > 0 && (
                        <div className="flex-shrink-0 bg-purple-50 border border-purple-100 rounded-xl px-3 py-2 text-center">
                          <p className="text-lg font-black text-violet-700">{feedCount}</p>
                          <p className="text-[10px] text-violet-500 font-semibold">Feeds</p>
                        </div>
                      )}
                      {diaperCount > 0 && (
                        <div className="flex-shrink-0 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 text-center">
                          <p className="text-lg font-black text-blue-700">{diaperCount}</p>
                          <p className="text-[10px] text-blue-500 font-semibold">Diapers</p>
                        </div>
                      )}
                      {sleepLog && (
                        <div className="flex-shrink-0 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 text-center">
                          <p className="text-lg font-black text-indigo-700">{sleepLog.detail}</p>
                          <p className="text-[10px] text-indigo-500 font-semibold">Sleep</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Log entries */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {logs.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-6">Nothing logged yet today — tap a button above to start</p>
                    ) : logs.map(entry => (
                      <div key={entry.id} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                        <span className="text-xl">{entry.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800">{entry.label}</p>
                          {entry.detail && <p className="text-[10px] text-slate-400">{entry.detail}</p>}
                        </div>
                        <span className="text-[10px] text-slate-300 shrink-0">{entry.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FEED SHEET */}
              {trackerSheet === 'feed' && (
                <div className="px-5 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setTrackerSheet('main')} className="p-1 text-violet-600"><ArrowLeft className="w-5 h-5" /></button>
                    <h3 className="font-extrabold text-base text-slate-900">Log a Feed</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">What type of feed?</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { key: 'breast', emoji: '🤱', label: 'Breast milk' },
                      { key: 'formula', emoji: '🍼', label: 'Formula' },
                      { key: 'solid', emoji: '🥣', label: 'Solid food' },
                    ].map(opt => (
                      <button key={opt.key} onClick={() => setFeedType(opt.key as any)}
                        className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition ${
                          feedType === opt.key ? 'border-violet-600 bg-violet-50' : 'border-slate-100 bg-white'}`}>
                        <span className="text-2xl">{opt.emoji}</span>
                        <span className="text-[11px] font-bold text-slate-700">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {feedType && (
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {feedType === 'breast' ? 'Duration (minutes)' : feedType === 'formula' ? 'Amount (oz)' : 'Notes'}
                        </label>
                        <input type={feedType !== 'solid' ? 'number' : 'text'}
                          value={feedType !== 'solid' ? feedAmount : feedNote}
                          onChange={e => feedType !== 'solid' ? setFeedAmount(e.target.value) : setFeedNote(e.target.value)}
                          placeholder={feedType === 'breast' ? 'e.g. 15' : feedType === 'formula' ? 'e.g. 4' : 'e.g. pureed carrots'}
                          className="w-full mt-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
                      </div>
                      {feedType !== 'solid' && (
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Note (optional)</label>
                          <input type="text" value={feedNote} onChange={e => setFeedNote(e.target.value)}
                            placeholder="e.g. seemed satisfied"
                            className="w-full mt-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
                        </div>
                      )}
                    </div>
                  )}
                  <button onClick={handleLogFeed} disabled={!feedType}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${feedType ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    Save Feed Log
                  </button>
                </div>
              )}

              {/* DIAPER SHEET */}
              {trackerSheet === 'diaper' && (
                <div className="px-5 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setTrackerSheet('main')} className="p-1 text-violet-600"><ArrowLeft className="w-5 h-5" /></button>
                    <h3 className="font-extrabold text-base text-slate-900">Log a Diaper</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">What type of diaper?</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { key: 'wet', emoji: '💧', label: 'Wet' },
                      { key: 'dirty', emoji: '💩', label: 'Dirty' },
                      { key: 'both', emoji: '💩💧', label: 'Both' },
                    ].map(opt => (
                      <button key={opt.key} onClick={() => setDiaperType(opt.key as any)}
                        className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition ${
                          diaperType === opt.key ? 'border-violet-600 bg-violet-50' : 'border-slate-100 bg-white'}`}>
                        <span className="text-2xl">{opt.emoji}</span>
                        <span className="text-[11px] font-bold text-slate-700">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">
                    <p className="text-[11px] text-blue-700 leading-relaxed">
                      <span className="font-bold">Tip:</span> Fewer than 6 wet diapers in 24 hours can be a sign of dehydration. Track daily to spot patterns early.
                    </p>
                  </div>
                  <button onClick={handleLogDiaper} disabled={!diaperType}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${diaperType ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    Save Diaper Log
                  </button>
                </div>
              )}

              {/* SLEEP SHEET */}
              {trackerSheet === 'sleep' && (
                <div className="px-5 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setTrackerSheet('main')} className="p-1 text-violet-600"><ArrowLeft className="w-5 h-5" /></button>
                    <h3 className="font-extrabold text-base text-slate-900">Log Sleep</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">How many hours did baby sleep?</p>
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {['1', '2', '3', '4', '5', '6', '7', '8'].map(h => (
                      <button key={h} onClick={() => setSleepHours(h)}
                        className={`py-3 rounded-2xl font-bold text-sm border-2 transition ${
                          sleepHours === h ? 'border-violet-600 bg-violet-50 text-violet-700' : 'border-slate-100 bg-white text-slate-600'}`}>
                        {h}h
                      </button>
                    ))}
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3 mb-4">
                    <p className="text-[11px] text-indigo-700 leading-relaxed">
                      <span className="font-bold">AAP guideline:</span> Newborns need 14–17 hours of sleep per day. By 3–6 months, most babies sleep 12–15 hours.
                    </p>
                  </div>
                  <button onClick={handleLogSleep} disabled={!sleepHours}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${sleepHours ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    Save Sleep Log
                  </button>
                </div>
              )}

              {/* MOOD SHEET */}
              {trackerSheet === 'mood' && (
                <div className="px-5 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setTrackerSheet('main')} className="p-1 text-violet-600"><ArrowLeft className="w-5 h-5" /></button>
                    <h3 className="font-extrabold text-base text-slate-900">How is baby today?</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { key: 'happy', emoji: '😊', label: 'Happy & calm', color: 'border-green-400 bg-green-50' },
                      { key: 'fussy', emoji: '😢', label: 'Fussy', color: 'border-amber-400 bg-amber-50' },
                      { key: 'unwell', emoji: '🤒', label: 'Seems unwell', color: 'border-rose-400 bg-rose-50' },
                    ].map(opt => (
                      <button key={opt.key} onClick={() => setMood(opt.key as any)}
                        className={`flex flex-col items-center gap-2 py-5 rounded-2xl border-2 transition ${
                          mood === opt.key ? opt.color : 'border-slate-100 bg-white'}`}>
                        <span className="text-3xl">{opt.emoji}</span>
                        <span className="text-[11px] font-bold text-slate-700 text-center px-1">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {mood === 'unwell' && (
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 mb-4">
                      <p className="text-[11px] text-rose-700 leading-relaxed">
                        If baby has a fever, trouble breathing, or isn't feeding — check the Sickness Guide or go to Emergency.
                      </p>
                    </div>
                  )}
                  <button onClick={handleLogMood} disabled={!mood}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${mood ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    Save Mood
                  </button>
                </div>
              )}

              {/* FOOD SHEET */}
              {trackerSheet === 'food' && (
                <div className="px-5 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => setTrackerSheet('main')} className="p-1 text-violet-600"><ArrowLeft className="w-5 h-5" /></button>
                    <h3 className="font-extrabold text-base text-slate-900">Log a New Food</h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Food name</label>
                      <input type="text" value={foodName} onChange={e => setFoodName(e.target.value)}
                        placeholder="e.g. pureed sweet potato"
                        className="w-full mt-1 h-11 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Baby's reaction</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { key: 'great', emoji: '😋', label: 'Loved it' },
                          { key: 'ok', emoji: '😐', label: 'Ate some' },
                          { key: 'reaction', emoji: '⚠️', label: 'Reaction?' },
                        ].map(opt => (
                          <button key={opt.key} onClick={() => setFoodReaction(opt.key as any)}
                            className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition ${
                              foodReaction === opt.key ? 'border-violet-600 bg-violet-50' : 'border-slate-100 bg-white'}`}>
                            <span className="text-xl">{opt.emoji}</span>
                            <span className="text-[10px] font-bold text-slate-600">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {foodReaction === 'reaction' && (
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 mb-4">
                      <p className="text-[11px] text-rose-700 leading-relaxed">
                        <span className="font-bold">Signs of a reaction:</span> rash, hives, vomiting, swelling of lips or face, difficulty breathing. Go to the ER immediately for severe symptoms.
                      </p>
                    </div>
                  )}
                  <button onClick={handleLogFood} disabled={!foodName}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition ${foodName ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    Save Food Log
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!activeLearnModule ? (
          <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* Header */}
            <header className="w-full top-0 sticky z-40 bg-white/95 backdrop-blur shadow-sm flex justify-between items-center px-6 h-16 border-b border-violet-100/60">
              <div className="flex items-center gap-4">
                <div onClick={() => onNavigateToTab('profile')}
                  className="w-10 h-10 rounded-full bg-violet-100 overflow-hidden border-2 border-violet-200 cursor-pointer hover:opacity-90 transition">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7"
                    alt="Mama profile avatar" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-sm font-bold text-violet-700">Good morning, {profile.name || 'Mama'}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition"
                  onClick={() => triggerToast("Search coming soon! 🔎")}><Search className="w-5 h-5" /></button>
                <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition"
                  onClick={() => triggerToast("No active alerts. 🕊️")}><Bell className="w-5 h-5" /></button>
              </div>
            </header>

            <main className="max-w-md mx-auto px-6 py-6 space-y-8">

              {/* Category Portals */}
              <section className="grid grid-cols-2 gap-4">
                <div onClick={() => onNavigateToEmergency('choking')}
                  className="bg-rose-50 hover:bg-rose-100/80 border border-rose-100 p-5 rounded-2xl cursor-pointer transition-all active:scale-[0.98] group flex flex-col justify-between h-36">
                  <div className="w-10 h-10 bg-rose-200/60 rounded-full flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-rose-800">Emergency</h3>
                    <p className="text-[11px] text-rose-600 mt-0.5">Immediate Life Savings Tools</p>
                  </div>
                </div>

                <div onClick={() => onNavigateToTab('sickness')}
                  className="bg-teal-50 hover:bg-teal-100/70 border border-teal-100 p-5 rounded-2xl cursor-pointer transition-all active:scale-[0.98] group flex flex-col justify-between h-36">
                  <div className="w-10 h-10 bg-teal-200/50 rounded-full flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-teal-800">Sickness</h3>
                    <p className="text-[11px] text-teal-600 mt-0.5">RSV, Croup, Rashes & more</p>
                  </div>
                </div>

                <div onClick={() => triggerToast("Food & Supplements planner coming soon! 🍎")}
                  className="col-span-2 bg-amber-50/50 hover:bg-amber-50 border border-amber-100 p-5 rounded-2xl cursor-pointer transition-all active:scale-[0.98] group flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-amber-100/60 rounded-xl flex items-center justify-center text-amber-700">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-amber-800">Food & Supplements</h4>
                      <p className="text-[11px] text-amber-600 mt-0.5">Nutritional pathways for healthy milk / blood supply</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </section>

              {/* ── RIBBON: Daily Tracker + Quick Access ── */}
              <section>
                <div className="flex justify-between items-center mb-3 pl-1">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Today & Quick Access</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">

                  {/* DAILY TRACKER TILE — first and most prominent */}
                  <button onClick={() => setTrackerOpen(true)}
                    className="flex-shrink-0 w-52 bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-4 text-left active:scale-[0.97] transition shadow-lg shadow-violet-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-violet-200 bg-white/10 px-2 py-0.5 rounded-full">Today</span>
                    </div>
                    <p className="font-extrabold text-sm text-white leading-tight mb-1">Daily Tracker</p>
                    <p className="text-[11px] text-violet-200 leading-snug">
                      {logs.length === 0
                        ? 'Log feeds, diapers, sleep & mood'
                        : `${logs.length} entr${logs.length === 1 ? 'y' : 'ies'} today · tap to add more`}
                    </p>
                    {logs.length > 0 && (
                      <div className="flex gap-1.5 mt-2">
                        {feedCount > 0 && <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">{feedCount} feeds</span>}
                        {diaperCount > 0 && <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">{diaperCount} diapers</span>}
                      </div>
                    )}
                  </button>

                  {/* Articles tile */}
                  <button onClick={() => onNavigateToTab('articles')}
                    className="flex-shrink-0 w-44 bg-white border border-violet-100 rounded-2xl p-4 text-left hover:border-violet-300 hover:bg-violet-50 transition active:scale-[0.97]">
                    <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="w-4 h-4 text-violet-600" />
                    </div>
                    <p className="font-bold text-sm text-slate-800 leading-tight">Articles</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">AAP, CDC & Mayo Clinic — verified</p>
                  </button>

                  {/* Sickness tile */}
                  <button onClick={() => onNavigateToTab('sickness')}
                    className="flex-shrink-0 w-44 bg-white border border-teal-100 rounded-2xl p-4 text-left hover:border-teal-300 hover:bg-teal-50 transition active:scale-[0.97]">
                    <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
                      <Thermometer className="w-4 h-4 text-teal-600" />
                    </div>
                    <p className="font-bold text-sm text-slate-800 leading-tight">Sickness Guide</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">RSV, croup, rashes & more</p>
                  </button>

                  {/* Community tile */}
                  <button onClick={() => onNavigateToTab('community')}
                    className="flex-shrink-0 w-44 bg-white border border-pink-100 rounded-2xl p-4 text-left hover:border-pink-300 hover:bg-pink-50 transition active:scale-[0.97]">
                    <div className="w-9 h-9 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
                      <Award className="w-4 h-4 text-pink-600" />
                    </div>
                    <p className="font-bold text-sm text-slate-800 leading-tight">Community</p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">Questions & real mom advice</p>
                  </button>

                </div>
              </section>

              {/* Featured learning card */}
              <section className="space-y-3">
                <div className="flex justify-between items-center pl-1">
                  <h2 className="text-base font-bold text-slate-800 uppercase tracking-widest">Learning Pathways</h2>
                  <span className="text-xs font-semibold text-violet-700 cursor-pointer" onClick={() => setActiveLearnModule(true)}>View Manual</span>
                </div>
                <div onClick={() => setActiveLearnModule(true)}
                  className="relative bg-violet-950 rounded-3xl overflow-hidden shadow-xl aspect-[4/2.3] p-6 flex flex-col justify-end group cursor-pointer transition-transform duration-300 hover:scale-[1.01]">
                  <img alt="Mother with baby"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrWiNfkA81R7XcDJnb-FbO7QUbWzTcWdcvz_axlE2ZgXFDGFI5g95nGB-FJB8WrBbq8x53LDckPZnwRWWckYr_g7KSlwtX8lxB4auPFHxFeWzJIdH8lc_wOLPsCVPu12zj9aO6Iyr-guniFc-R-F-TrmcH-DYMaCB_OAQPCaJsMbvzl0-qu9ZA76W0_THfe7lSG96z7inNWnzknGQN2SZ4VzrDtjOzUJmWPz2vKRLWqYiUsA6H2w0bLNooBTlrzKSO7a0yevl-PqHk"
                    className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-950/40 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-1.5 bg-violet-800/80 backdrop-blur rounded-full px-2.5 py-1 w-fit border border-violet-700">
                      <BookOpen className="w-3.5 h-3.5 text-pink-300" />
                      <span className="text-[10px] font-black uppercase text-pink-100 tracking-wider">Learn</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white leading-tight pt-1.5">How to carry your baby safely</h3>
                    <p className="text-violet-200 text-xs font-light leading-relaxed">Expert tips on anatomical positioning, spine support, and maternal bonding.</p>
                  </div>
                </div>
              </section>

              {/* Supplements Tracker */}
              <section className="space-y-4">
                <div className="flex justify-between items-center pl-1">
                  <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-widest">Daily Supplements</h2>
                  <span className="text-xs font-semibold text-slate-400">Tap to log</span>
                </div>
                <div className="space-y-3">
                  {supplements.map((s) => {
                    const isComplete = s.taken >= s.target;
                    const pct = Math.min((s.taken / s.target) * 100, 100);
                    return (
                      <div key={s.id} onClick={() => takeSupplement(s.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl bg-white border cursor-pointer hover:border-violet-200 transition-all ${isComplete ? 'border-violet-100 shadow-sm' : 'border-slate-100'}`}>
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform ${isComplete ? 'bg-violet-50 scale-95' : 'bg-[#e3e1ed]/30'}`}>
                          {s.icon}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className={`text-sm font-bold truncate ${isComplete ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{s.name}</span>
                            <span className="text-xs font-mono font-medium text-violet-700 whitespace-nowrap ml-2">{s.taken} / {s.target} {s.unit}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-600 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isComplete ? 'bg-violet-700 border-violet-700 text-white' : 'border-slate-300'}`}>
                          {isComplete && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button onClick={handleBulkLog}
                  className="w-full py-4 bg-violet-700 hover:bg-violet-800 text-white font-bold rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 text-sm">
                  <Plus className="w-5 h-5" />
                  <span>Log Morning Supplement</span>
                </button>
              </section>

            </main>
          </motion.div>
        ) : (
          <motion.div key="carrier-module" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-grow flex flex-col space-y-6">
            <header className="w-full sticky top-0 py-4 px-6 bg-white flex items-center justify-between border-b border-violet-100 shadow-sm">
              <button className="text-violet-700 hover:opacity-85 flex items-center gap-1.5" onClick={() => setActiveLearnModule(false)}>
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-semibold">Done</span>
              </button>
              <span className="font-bold text-[#121c28]">Module: Babywearing</span>
              <div className="w-10" />
            </header>
            <main className="max-w-md mx-auto px-6 py-6 space-y-8 pb-32">
              <div className="p-6 bg-violet-600 rounded-3xl text-white space-y-3 shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-700/80 px-2.5 py-1.5 rounded-full">Module 01: Physical Bonding</span>
                <h2 className="text-xl font-black leading-tight">How to Carry Your Baby</h2>
                <p className="text-violet-100 text-sm leading-relaxed">Mastering the medical mechanics, comfort binds, and physiological holds for secure newborn carries.</p>
              </div>
              <section className="space-y-4">
                <h3 className="text-[#121c28] font-black text-sm tracking-widest pl-1 uppercase">Anatomical Anatomy</h3>
                <div className="bg-white p-5 rounded-3xl border border-violet-100/50 space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">1</div>
                    <h4 className="font-bold text-sm text-[#121c28]">Spine Support</h4>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">Newborns have a flexible, C-shaped curved spine. Correct support ensures hip vertebrae align naturally while core support slowly develops.</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-violet-100/50 space-y-2 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">2</div>
                    <h4 className="font-bold text-sm text-[#121c28]">Oxytocin-Bond</h4>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">Skin-to-skin touch prompts an immediate rush of maternal bonding chemicals, calming baby heartbeat and body heat.</p>
                </div>
              </section>
              <section className="space-y-4">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-[#121c28] font-black text-sm tracking-widest pl-1 uppercase">The Essential Holds</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setHoldIndex(0)} disabled={holdIndex === 0}
                      className={`p-1.5 rounded-full border ${holdIndex === 0 ? 'text-gray-300 border-gray-100' : 'text-violet-700 border-violet-100 hover:bg-violet-50'}`}>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => setHoldIndex(1)} disabled={holdIndex === 1}
                      className={`p-1.5 rounded-full border ${holdIndex === 1 ? 'text-gray-300 border-gray-100' : 'text-violet-700 border-violet-100 hover:bg-violet-50'}`}>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-3xl overflow-hidden border border-violet-100 shadow-sm">
                  <div className="aspect-[4/3] bg-violet-50">
                    <img src={holds[holdIndex].image} alt={holds[holdIndex].title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-1">
                    <h4 className="font-bold text-sm text-[#121c28]">{holds[holdIndex].title}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{holds[holdIndex].description}</p>
                  </div>
                </div>
              </section>
              <section className="space-y-4 p-5 rounded-3xl bg-violet-50 border border-violet-100">
                <div className="text-center pb-2">
                  <h4 className="font-extrabold text-sm text-[#121c28]">Check Your Carry Form</h4>
                  <p className="text-[11px] text-violet-700 mt-1">Review indicators before every active carry.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { key: 'head', label: 'Head is Supported', desc: 'Always keep one cradled hand near back skull.' },
                    { key: 'face', label: 'Face is Visible', desc: 'Keep breathing pathways free of sling fabrics.' },
                    { key: 'shoulders', label: 'Shoulders are Relaxed', desc: 'Keep weight distributed safely across waist bonds.' },
                  ].map(item => (
                    <label key={item.key} className="flex items-start gap-3 cursor-pointer select-none">
                      <input type="checkbox" checked={formChecked[item.key as keyof typeof formChecked]}
                        onChange={() => setFormChecked(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                        className="mt-1 rounded text-violet-700 focus:ring-violet-600" />
                      <div>
                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="pt-4">
                  <button disabled={Object.values(formChecked).some(v => !v)}
                    onClick={() => { setActiveLearnModule(false); triggerToast("Module completed 🏆"); }}
                    className={`w-full py-4 font-bold rounded-2xl text-xs transition shadow-md flex items-center justify-center gap-2 ${
                      Object.values(formChecked).every(v => v) ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                    <Check className="w-4 h-4" />
                    <span>Complete Module</span>
                  </button>
                </div>
              </section>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
