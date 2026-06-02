import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Baby, 
  Settings, 
  Award, 
  Activity, 
  Calendar, 
  RefreshCw, 
  Heart, 
  ShieldAlert, 
  MessageSquare,
  Lock,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile | null) => void;
  onNavigateToEmergency: (guide: 'choking' | 'cpr' | 'fever') => void;
}

export default function Profile({ profile, setProfile, onNavigateToEmergency }: ProfileProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(profile.name);
  const [editedBabyName, setEditedBabyName] = useState<string>(profile.babyName || 'Leo');

  // Saves edits
  const handleSaveProfile = () => {
    setProfile({
      ...profile,
      name: editedName,
      babyName: profile.stage === 'mama' ? editedBabyName : undefined
    });
    setEditing(false);
  };

  // Re-run onboarding
  const handleResetWalkthrough = () => {
    if (confirm("Reset application profile data? This will let you re-experience the complete onboarding walkthrough steps.")) {
      setProfile(null);
    }
  };

  return (
    <div id="profile-view" className="bg-[#f8f9ff] min-h-screen pb-28 text-slate-800 select-none">
      
      {/* Header */}
      <header className="w-full top-0 sticky z-40 bg-white shadow-sm flex justify-between items-center px-6 h-16 border-b border-violet-100/60">
        <h1 className="font-bold text-violet-700">MamaHub Settings</h1>
        <Settings className="w-5 h-5 text-slate-400" />
      </header>

      <main className="max-w-md mx-auto px-6 py-6 space-y-6">
        
        {/* Mother Profile Card */}
        <section className="bg-white p-6 rounded-3xl border border-violet-100/50 shadow-sm space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-violet-100 overflow-hidden border-2 border-violet-200">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7" 
                alt="Profile portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              {editing ? (
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full h-9 bg-slate-50 border rounded-lg px-2 text-xs focus:ring-1 focus:ring-violet-600 outline-none"
                    placeholder="Caregiver Name"
                  />
                  {profile.stage === 'mama' && (
                    <input 
                      type="text" 
                      value={editedBabyName}
                      onChange={(e) => setEditedBabyName(e.target.value)}
                      className="w-full h-9 bg-slate-50 border rounded-lg px-2 text-xs focus:ring-1 focus:ring-violet-600 outline-none"
                      placeholder="Baby Name"
                    />
                  )}
                </div>
              ) : (
                <>
                  <h2 className="text-base font-extrabold text-slate-800 tracking-tight truncate">{profile.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {profile.stage === 'pregnant' ? '🤰 Expectant Mama' : `👶 Mama to ${profile.babyName || 'Leo'}`}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {editing ? (
              <button 
                onClick={handleSaveProfile}
                className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs"
              >
                Save Profile
              </button>
            ) : (
              <button 
                onClick={() => setEditing(true)}
                className="flex-1 py-2.5 border border-violet-100 bg-[#e3e1ed]/20 text-violet-700 font-bold rounded-xl text-xs hover:bg-[#e3e1ed]/30 transition"
              >
                Edit Details
              </button>
            )}
          </div>
        </section>

        {/* Dynamic Status Badging (Bento stats) */}
        <section className="grid grid-cols-2 gap-4" id="profile-stats">
          <div className="bg-white p-5 rounded-3xl border border-violet-50/70 shadow-sm flex flex-col items-center justify-center text-center">
            <Award className="w-6 h-6 text-violet-600 mb-1" />
            <span className="font-extrabold text-base text-slate-800">4 / 4</span>
            <span className="text-[9px] font-black uppercase text-slate-400 mt-1">Daily Log</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-violet-50/70 shadow-sm flex flex-col items-center justify-center text-center">
            <Activity className="w-6 h-6 text-teal-600 mb-1" />
            <span className="font-extrabold text-base text-slate-800">98%</span>
            <span className="text-[9px] font-black uppercase text-slate-400 mt-1">Wellness Compliance</span>
          </div>
        </section>

        {/* First Aid Simulator shortcuts row */}
        <section className="space-y-3">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Interactive Simulators</h3>
          
          <div className="bg-white rounded-3xl border divide-y overflow-hide shadow-sm border-violet-100/50">
            {/* Choking */}
            <div 
              onClick={() => onNavigateToEmergency('choking')}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <span className="text-xs font-extrabold">Active Choking Solver (Back blows count)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* CPR */}
            <div 
              onClick={() => onNavigateToEmergency('cpr')}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-violet-700" />
                <span className="text-xs font-extrabold">Chest Compressions counter (0-30 cycles)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* Sickness */}
            <div 
              onClick={() => onNavigateToEmergency('fever')}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span className="text-xs font-extrabold">Newborn High Fever Screening Tool</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </section>

        {/* Reset settings area */}
        <section className="space-y-3">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">System</h3>
          
          <div className="bg-white rounded-3xl border shadow-sm border-violet-150 p-4">
            <button 
              id="btn-re-onboard-walkthrough"
              onClick={handleResetWalkthrough}
              className="w-full py-4 text-[#ba1a1a] hover:bg-rose-50 rounded-2xl text-xs font-bold flex justify-center items-center gap-2 border border-dashed border-red-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Walkthrough Steps</span>
            </button>
          </div>
        </section>

      </main>

    </div>
  );
}
