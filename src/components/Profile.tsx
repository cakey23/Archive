import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings, Award, Activity, RefreshCw, ShieldAlert,
  ChevronRight, Heart, Baby, ChevronDown, ChevronUp,
  Sparkles, BookOpen,
} from 'lucide-react';
import { UserProfile } from '../types';
import BabySizeCard from './BabySizeCard';

interface ProfileProps {
  profile: UserProfile;
  setProfile: (p: UserProfile | null) => void;
  onNavigateToEmergency: (guide: 'choking' | 'cpr' | 'fever') => void;
}

const CONCERN_LABELS: Record<string, string> = {
  sleep:       '😴 Sleep',
  feeding:     '🍼 Feeding',
  milestones:  '⭐ Milestones',
  postpartum:  '💜 Postpartum',
  safety:      '🛡️ Safety',
  mentalhealth:'🌸 Mental Health',
};

const THEME_OPTIONS = [
  { id: 'violet',   label: 'Lavender',  bg: 'bg-violet-500' },
  { id: 'rose',     label: 'Rose',      bg: 'bg-rose-400'   },
  { id: 'peach',    label: 'Peach',     bg: 'bg-orange-300' },
  { id: 'teal',     label: 'Teal',      bg: 'bg-teal-500'   },
  { id: 'lavender', label: 'Purple',    bg: 'bg-purple-400' },
];

const FEEDING_OPTIONS = [
  { id: 'breastfeeding', label: '🤱 Breastfeeding' },
  { id: 'formula',       label: '🍼 Formula' },
  { id: 'combination',   label: '🔄 Combination' },
  { id: 'baby_led',      label: '🥦 Baby-led' },
];

export default function Profile({ profile, setProfile, onNavigateToEmergency }: ProfileProps) {
  const [editing,        setEditing]        = useState(false);
  const [showDetails,    setShowDetails]    = useState(false);

  // Editable fields mirroring UserProfile
  const [editName,       setEditName]       = useState(profile.name);
  const [editBabyName,   setEditBabyName]   = useState(profile.babyName ?? '');
  const [editBabyNick,   setEditBabyNick]   = useState(profile.babyNickname ?? '');
  const [editDueDate,    setEditDueDate]    = useState(profile.dueDate ?? '');
  const [editBirthDate,  setEditBirthDate]  = useState(profile.babyBirthDate ?? '');
  const [editGender,     setEditGender]     = useState<UserProfile['babyGender']>(profile.babyGender ?? '');
  const [editPersonality,setEditPersonality]= useState(profile.babyPersonalityNotes ?? '');
  const [editFeeding,    setEditFeeding]    = useState<UserProfile['feedingPreference']>(profile.feedingPreference ?? '');
  const [editSleepGoal,  setEditSleepGoal]  = useState(profile.sleepGoalHours ?? 12);
  const [editTheme,      setEditTheme]      = useState<UserProfile['favoriteThemeColor']>(profile.favoriteThemeColor ?? 'violet');
  const [editConcerns,   setEditConcerns]   = useState<string[]>(profile.mainConcerns ?? []);

  const toggleConcern = (c: string) =>
    setEditConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleSave = () => {
    const updated: UserProfile = {
      ...profile,
      name: editName,
      babyName:           profile.stage === 'mama' ? editBabyName : profile.babyName,
      babyNickname:       editBabyNick || undefined,
      dueDate:            profile.stage === 'pregnant' ? editDueDate || undefined : profile.dueDate,
      babyBirthDate:      profile.stage === 'mama' ? editBirthDate || undefined : profile.babyBirthDate,
      babyGender:         editGender || undefined,
      babyPersonalityNotes: editPersonality || undefined,
      feedingPreference:  editFeeding || undefined,
      sleepGoalHours:     editSleepGoal,
      favoriteThemeColor: editTheme,
      mainConcerns:       editConcerns.length > 0 ? (editConcerns as UserProfile['mainConcerns']) : undefined,
    };
    setProfile(updated);
    setEditing(false);
  };

  const handleReset = () => {
    if (confirm('Reset your profile? This will restart the onboarding walkthrough.')) setProfile(null);
  };

  const babyDisplay  = profile.babyName ?? profile.babyNickname ?? 'your baby';
  const stageLabel   = profile.stage === 'pregnant' ? '🤰 Expectant Mama' : `👶 Mama to ${babyDisplay}`;
  const totalCourses = Object.keys(profile.courseProgress ?? {}).length;
  const completed    = Object.values(profile.courseProgress ?? {}).filter(p => p === 100).length;

  return (
    <div id="profile-view" className="bg-[#faf8ff] min-h-screen pb-28 text-slate-800 select-none">

      <header className="w-full top-0 sticky z-40 bg-white shadow-sm flex justify-between items-center px-6 h-16 border-b border-violet-100/60">
        <h1 className="font-bold text-violet-700">My Profile</h1>
        <Settings className="w-5 h-5 text-slate-400"/>
      </header>

      <main className="max-w-md mx-auto px-6 py-6 space-y-5">

        {/* ── Profile card ── */}
        <section className="bg-white p-6 rounded-3xl border border-violet-100 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-violet-100 overflow-hidden border-2 border-violet-200 shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7"
                alt="Profile" className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h2 className="text-base font-extrabold text-slate-900 truncate">{profile.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{stageLabel}</p>
              {profile.stage === 'pregnant' && profile.currentMilestone && (
                <p className="text-[11px] text-violet-600 font-semibold mt-0.5">{profile.currentMilestone}</p>
              )}
              {profile.babyNickname && (
                <p className="text-[11px] text-pink-500 font-semibold mt-0.5">"{profile.babyNickname}"</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setEditing(v => !v)}
            className="w-full py-2.5 border border-violet-100 bg-violet-50 text-violet-700 font-bold rounded-xl text-xs hover:bg-violet-100 transition"
          >
            {editing ? '✕ Cancel Editing' : '✏️ Edit Profile'}
          </button>

          {/* ── Edit form ── */}
          <AnimatePresence>
            {editing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4"
              >
                {/* Basic info */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">Your Info</p>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your Name</label>
                    <input value={editName} onChange={e => setEditName(e.target.value)}
                      className="w-full h-10 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm focus:ring-2 focus:ring-violet-400 outline-none"/>
                  </div>

                  {profile.stage === 'pregnant' && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Due Date</label>
                      <input type="date" value={editDueDate} onChange={e => setEditDueDate(e.target.value)}
                        className="w-full h-10 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm focus:ring-2 focus:ring-violet-400 outline-none"/>
                    </div>
                  )}
                </div>

                {/* Baby info */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">
                    {profile.stage === 'mama' ? 'Baby Info' : 'Baby Plans'}
                  </p>

                  {profile.stage === 'mama' && (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Baby's Name</label>
                        <input value={editBabyName} onChange={e => setEditBabyName(e.target.value)}
                          className="w-full h-10 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm focus:ring-2 focus:ring-violet-400 outline-none"/>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Birth Date</label>
                        <input type="date" value={editBirthDate} onChange={e => setEditBirthDate(e.target.value)}
                          className="w-full h-10 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm focus:ring-2 focus:ring-violet-400 outline-none"/>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Baby Nickname (optional)
                    </label>
                    <input value={editBabyNick} onChange={e => setEditBabyNick(e.target.value)}
                      placeholder='e.g. "Peanut"'
                      className="w-full h-10 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm focus:ring-2 focus:ring-violet-400 outline-none"/>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Gender</label>
                    <div className="flex gap-2">
                      {(['girl','boy','surprise',''] as const).map(g => (
                        <button key={g}
                          onClick={() => setEditGender(g)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${editGender === g ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-500 border-slate-200'}`}>
                          {g === 'girl' ? '👧 Girl' : g === 'boy' ? '👦 Boy' : g === 'surprise' ? '🎁 Surprise' : '— Skip'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Personality / Notes
                    </label>
                    <textarea value={editPersonality} onChange={e => setEditPersonality(e.target.value)}
                      rows={2} placeholder='e.g. "Loves music, super wiggly..."'
                      className="w-full bg-violet-50 border border-violet-100 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-violet-400 outline-none resize-none"/>
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">Preferences</p>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Feeding Preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      {FEEDING_OPTIONS.map(opt => (
                        <button key={opt.id} onClick={() => setEditFeeding(opt.id as UserProfile['feedingPreference'])}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition text-left px-3 ${editFeeding === opt.id ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-600 border-slate-200 hover:border-violet-200'}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Sleep Goal: <span className="text-violet-700">{editSleepGoal}h / night</span>
                    </label>
                    <input type="range" min={6} max={14} value={editSleepGoal}
                      onChange={e => setEditSleepGoal(Number(e.target.value))}
                      className="w-full accent-violet-600"/>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">App Theme</label>
                    <div className="flex gap-2">
                      {THEME_OPTIONS.map(t => (
                        <button key={t.id} onClick={() => setEditTheme(t.id as UserProfile['favoriteThemeColor'])}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition ${editTheme === t.id ? 'border-violet-600 bg-violet-50' : 'border-slate-100 bg-white'}`}>
                          <div className={`w-5 h-5 rounded-full ${t.bg}`}/>
                          <span className="text-[9px] text-slate-500 font-semibold">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Main Concerns</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(CONCERN_LABELS).map(([id, label]) => (
                        <button key={id} onClick={() => toggleConcern(id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${editConcerns.includes(id) ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-500 border-slate-200 hover:border-violet-200'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button onClick={handleSave}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-sm transition shadow-md">
                  Save Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Baby size card (pregnant only) ── */}
        {profile.stage === 'pregnant' && profile.dueDate && (
          <BabySizeCard profile={profile}/>
        )}

        {/* ── Stats bento ── */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-violet-50 shadow-sm flex flex-col items-center text-center gap-1">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mb-1">
              <BookOpen className="w-5 h-5 text-violet-600"/>
            </div>
            <span className="font-extrabold text-lg text-slate-800">{completed}</span>
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Courses Done</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-violet-50 shadow-sm flex flex-col items-center text-center gap-1">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-1">
              <Activity className="w-5 h-5 text-teal-600"/>
            </div>
            <span className="font-extrabold text-lg text-slate-800">{totalCourses}</span>
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">In Progress</span>
          </div>

          <div className="col-span-2 bg-gradient-to-r from-violet-50 to-pink-50 p-4 rounded-3xl border border-violet-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-pink-500"/>
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">
                {profile.isFirstBaby ? 'First-time mama' : 'Experienced mama'}
                {profile.babyGender === 'girl' ? ' 👧' : profile.babyGender === 'boy' ? ' 👦' : ''}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {profile.stage === 'pregnant'
                  ? 'Growing your little one 🌱'
                  : `Raising ${profile.babyName ?? 'your baby'} with love 💜`}
              </p>
              {profile.mainConcerns && profile.mainConcerns.length > 0 && (
                <p className="text-[10px] text-violet-500 mt-1">
                  Focused on: {profile.mainConcerns.map(c => CONCERN_LABELS[c]).join(' · ')}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Emergency simulators ── */}
        <section className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Emergency Simulators</h3>
          <div className="bg-white rounded-3xl border border-violet-100 shadow-sm overflow-hidden divide-y divide-slate-50">
            {[
              { label: 'Back Blow Choking Simulator', guide: 'choking' as const, bg: 'bg-rose-100', icon: <ShieldAlert className="w-4 h-4 text-rose-600"/> },
              { label: 'Chest Compression CPR Counter', guide: 'cpr' as const, bg: 'bg-violet-100', icon: <Activity className="w-4 h-4 text-violet-700"/> },
              { label: 'Newborn Fever Screening Tool', guide: 'fever' as const, bg: 'bg-teal-100', icon: <Baby className="w-4 h-4 text-teal-600"/> },
            ].map(({ label, guide, bg, icon }) => (
              <div key={guide} onClick={() => onNavigateToEmergency(guide)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-violet-50 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>{icon}</div>
                  <span className="text-xs font-bold text-slate-800">{label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400"/>
              </div>
            ))}
          </div>
        </section>

        {/* ── System ── */}
        <section className="space-y-3">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">System</h3>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
            <button onClick={handleReset}
              className="w-full py-4 text-rose-600 hover:bg-rose-50 rounded-2xl text-xs font-bold flex justify-center items-center gap-2 border border-dashed border-rose-200 transition">
              <RefreshCw className="w-4 h-4"/>
              <span>Reset Onboarding Walkthrough</span>
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 pb-2">
            MamaHub · For informational purposes only. Always consult your healthcare provider.
          </p>
        </section>
      </main>
    </div>
  );
}