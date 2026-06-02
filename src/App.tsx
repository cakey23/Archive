import { useState, useEffect } from 'react';
import {
  Home as HomeIcon,
  Award,
  MessageSquare,
  User,
  BookOpen,
} from 'lucide-react';
import Onboarding from './components/Onboarding';
import Dashboard  from './components/Dashboard';
import Milestones from './components/Milestones';
import Community  from './components/Community';
import Emergency  from './components/Emergency';
import Profile    from './components/Profile';
import Articles   from './components/Articles';
import Sickness   from './components/Sickness';
import Courses    from './components/Courses';
import { UserProfile } from './types';

export default function App() {
  const [profile,    setProfile]    = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('home');

  useEffect(() => {
    const saved = localStorage.getItem('mamahub_profile');
    if (saved) {
      try { setProfile(JSON.parse(saved)); }
      catch (e) { console.error('Failed to parse cached profile', e); }
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
    else setCurrentTab('emergency-fever');
  };

  if (!profile) return <Onboarding onComplete={handleSaveProfile} />;

  const isEmergency = currentTab.startsWith('emergency-');
  const isSubPage   = currentTab === 'articles' || currentTab === 'sickness';

  const NAV_TABS = [
    { id: 'home',      icon: HomeIcon,    label: 'Home'      },
    { id: 'learn',     icon: BookOpen,    label: 'Learn'     },
    { id: 'milestones',icon: Award,       label: 'Milestones'},
    { id: 'community', icon: MessageSquare, label: 'Community'},
    { id: 'profile',   icon: User,        label: 'Profile'   },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-800 flex flex-col relative">
      <div className="flex-grow">
        {currentTab === 'home' && (
          <Dashboard
            profile={profile}
            onNavigateToEmergency={handleTriggerEmergencyView}
            onNavigateToTab={t => setCurrentTab(t)}
          />
        )}
        {currentTab === 'learn' && (
          <Courses profile={profile} onUpdateProfile={handleSaveProfile} />
        )}
        {currentTab === 'milestones'  && <Milestones profile={profile} />}
        {currentTab === 'community'   && <Community />}
        {currentTab === 'articles'    && <Articles />}
        {currentTab === 'sickness'    && <Sickness />}
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

      {/* Bottom nav — 5 tabs */}
      {!isEmergency && !isSubPage && (
        <nav className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur border-t border-violet-100 shadow-[0_-4px_20px_rgba(109,40,217,0.06)] flex justify-around items-center h-20 px-2 pb-safe max-w-md mx-auto">
          {NAV_TABS.map(({ id, icon: Icon, label }) => {
            const active = currentTab === id;
            return (
              <button
                key={id}
                onClick={() => setCurrentTab(id)}
                className={`flex flex-col items-center justify-center px-2 py-2 rounded-2xl transition-all duration-200 ${
                  active ? 'text-violet-700' : 'text-slate-400 hover:text-violet-400'
                }`}
              >
                <div className={`flex items-center justify-center w-9 h-6 rounded-full transition-all ${active ? 'bg-violet-100' : ''}`}>
                  <Icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
                </div>
                <span className={`text-[9px] mt-1 tracking-wide ${active ? 'font-extrabold' : 'font-semibold'}`}>{label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Back button for sub-pages */}
      {isSubPage && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur border-t border-slate-100 shadow-lg flex justify-center items-center h-16 max-w-md mx-auto">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 text-violet-700 font-bold text-sm px-6 py-2 rounded-full bg-violet-50 hover:bg-violet-100 transition"
          >
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}