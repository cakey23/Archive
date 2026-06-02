import { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Award, 
  MessageSquare, 
  User
} from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Milestones from './components/Milestones';
import Community from './components/Community';
import Emergency from './components/Emergency';
import Profile from './components/Profile';
import Articles from './components/Articles';
import Sickness from './components/Sickness';
import { UserProfile } from './types';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('home');

  useEffect(() => {
    const saved = localStorage.getItem('mamahub_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cached profile config", e);
      }
    }
  }, []);

  const handleSaveProfile = (newProfile: UserProfile | null) => {
    setProfile(newProfile);
    if (newProfile) {
      localStorage.setItem('mamahub_profile', JSON.stringify(newProfile));
    } else {
      localStorage.removeItem('mamahub_profile');
      setCurrentTab('home');
    }
  };

  const handleTriggerEmergencyView = (guide: 'choking' | 'cpr' | 'fever') => {
    if (guide === 'choking') setCurrentTab('emergency-choking');
    else if (guide === 'cpr') setCurrentTab('emergency-cpr');
    else if (guide === 'fever') setCurrentTab('emergency-fever');
  };

  if (!profile) {
    return <Onboarding onComplete={handleSaveProfile} />;
  }

  const isEmergency = currentTab.startsWith('emergency-');

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 flex flex-col relative">
      
      <div className="flex-grow">
        {currentTab === 'home' && (
          <Dashboard 
            profile={profile} 
            onNavigateToEmergency={handleTriggerEmergencyView}
            onNavigateToTab={(t) => setCurrentTab(t)}
          />
        )}
        {currentTab === 'milestones' && <Milestones profile={profile} />}
        {currentTab === 'community' && <Community />}
        {currentTab === 'articles' && <Articles />}
        {currentTab === 'sickness' && <Sickness />}
        {currentTab === 'profile' && (
          <Profile 
            profile={profile} 
            setProfile={handleSaveProfile}
            onNavigateToEmergency={handleTriggerEmergencyView}
          />
        )}
        {currentTab === 'emergency-choking' && (
          <Emergency initialGuide="choking" onBackToDashboard={() => setCurrentTab('home')} />
        )}
        {currentTab === 'emergency-cpr' && (
          <Emergency initialGuide="cpr" onBackToDashboard={() => setCurrentTab('home')} />
        )}
        {currentTab === 'emergency-fever' && (
          <Emergency initialGuide="fever" onBackToDashboard={() => setCurrentTab('home')} />
        )}
      </div>

      {/* Bottom nav — 4 tabs, hidden on emergency and sub-pages */}
      {!isEmergency && currentTab !== 'articles' && currentTab !== 'sickness' && (
        <nav className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white border-t border-slate-100 shadow-lg flex justify-around items-center h-20 px-6 pb-safe max-w-md mx-auto">
          
          <button onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
              currentTab === 'home' ? 'text-violet-700 font-extrabold scale-105' : 'text-slate-400 hover:text-violet-500'
            }`}>
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-wider uppercase">Home</span>
          </button>

          <button onClick={() => setCurrentTab('milestones')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
              currentTab === 'milestones' ? 'text-violet-700 font-extrabold scale-105' : 'text-slate-400 hover:text-violet-500'
            }`}>
            <Award className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-wider uppercase">Milestone</span>
          </button>

          <button onClick={() => setCurrentTab('community')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
              currentTab === 'community' ? 'text-violet-700 font-extrabold scale-105' : 'text-slate-400 hover:text-violet-500'
            }`}>
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-wider uppercase">Community</span>
          </button>

          <button onClick={() => setCurrentTab('profile')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
              currentTab === 'profile' ? 'text-violet-700 font-extrabold scale-105' : 'text-slate-400 hover:text-violet-500'
            }`}>
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1 tracking-wider uppercase">Profile</span>
          </button>

        </nav>
      )}

      {/* Back button for ribbon pages */}
      {(currentTab === 'articles' || currentTab === 'sickness') && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white border-t border-slate-100 shadow-lg flex justify-center items-center h-16 max-w-md mx-auto">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 text-violet-700 font-bold text-sm"
          >
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      )}

    </div>
  );
}
