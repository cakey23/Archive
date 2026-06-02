import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Baby, 
  Check, 
  Sparkles, 
  Gift, 
  User, 
  HelpCircle, 
  Info,
  Smile,
  Home
} from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(true);
  
  // Profile state builder
  const [name, setName] = useState<string>('');
  const [stage, setStage] = useState<'pregnant' | 'mama' | ''>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [babyName, setBabyName] = useState<string>('');
  const [babyBirthDate, setBabyBirthDate] = useState<string>('');
  const [currentMilestone, setCurrentMilestone] = useState<string>('24');
  const [babyMonths, setBabyMonths] = useState<string>('');
  const [isFirstBaby, setIsFirstBaby] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Close the popup note
  const closeModal = () => {
    setShowNoteModal(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // State checks for validating navigation
  const isStep1Valid = name.trim().length > 0;
  
  const isStep2Valid = 
    stage === 'pregnant' 
      ? dueDate !== '' 
      : stage === 'mama' 
        ? babyName.trim() !== '' && babyBirthDate !== ''
        : false;

  const isStep3Valid = currentMilestone !== '' || babyMonths.trim() !== '';
  const isStep4Valid = isFirstBaby !== null;

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
    else if (step === 3 && isStep3Valid) setStep(4);
    else if (step === 4 && isStep4Valid) {
      setStep(5);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    const finalProfile: UserProfile = {
      name,
      stage: stage as 'pregnant' | 'mama',
      dueDate: stage === 'pregnant' ? dueDate : undefined,
      babyName: stage === 'mama' ? babyName : undefined,
      babyBirthDate: stage === 'mama' ? babyBirthDate : undefined,
      currentMilestone: stage === 'pregnant' ? `${currentMilestone} Weeks` : undefined,
      babyMonths: stage === 'mama' ? babyMonths : undefined,
      isFirstBaby: isFirstBaby === true
    };
    onComplete(finalProfile);
  };

  // Sparkles/confetti animation dots for screen 5
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string; size: number }>>([]);
  useEffect(() => {
    if (step === 5) {
      const colors = ['#630ed4', '#a78bfa', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];
      const items = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setConfetti(items);
    }
  }, [step]);

  return (
    <div id="onboarding-flow" className="min-h-screen bg-[#f8f9ff] text-[#121c28] flex flex-col relative overflow-x-hidden select-none pb-12">
      {/* Confetti backdrop for step 5 */}
      {step === 5 && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              className="absolute rounded-full"
              style={{
                left: `${c.left}%`,
                top: -20,
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
              }}
              animate={{
                y: ['0vh', '105vh'],
                rotate: [0, 360],
                x: [`0px`, `${(Math.random() - 0.5) * 40}px`]
              }}
              transition={{
                duration: Math.random() * 2 + 2.5,
                delay: c.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="w-full top-0 sticky bg-[#f8f9ff] flex items-center justify-between px-6 py-4 z-10 border-b border-gray-100/60 shadow-sm">
        <div className="flex items-center gap-2">
          {step > 1 && step < 5 ? (
            <button 
              id="btn-back"
              onClick={handleBack} 
              className="p-1 rounded-full text-violet-700 hover:bg-[#e3e1ed]/30 transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          ) : (
            <div className="w-8" />
          )}
        </div>
        <h1 className="font-bold text-violet-700 text-xl tracking-tight select-none">MamaHub</h1>
        <div className="w-8" />
      </header>

      {/* Quick note modal (Step 1 backdrop) */}
      <AnimatePresence>
        {showNoteModal && (
          <div 
            id="note-modal" 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-[#121c28]/40"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full -mr-16 -mt-16 blur-xl" />
              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="w-16 h-16 bg-[#e3e1ed] flex items-center justify-center rounded-full">
                  <Info className="w-8 h-8 text-violet-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#121c28]">A quick note</h3>
                  <p className="text-[#4a4455] text-sm md:text-base leading-relaxed">
                    To give you the most accurate milestones and learning content, we'll ask a few questions about your baby's current stage.
                  </p>
                </div>
                <button 
                  id="btn-close-modal"
                  className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-4 rounded-xl transition"
                  onClick={closeModal}
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col px-6 pt-6 pb-12 max-w-md mx-auto w-full relative z-10">
        
        {/* Step progress indicators for Steps 1-4 */}
        {step < 5 && (
          <div className="mt-2 mb-8" id="progress-indicator">
            <div className="flex justify-between items-center mb-3 text-xs tracking-wider text-[#4a4455] font-semibold uppercase">
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-[#e3e1ed] rounded-full overflow-hidden flex gap-0.5">
              <div className="h-full bg-violet-600 transition-all duration-300" style={{ width: `${step * 25}%` }} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">
                  Hi, what should we call you?
                </h2>
                <p className="text-[#4a4455] text-sm mt-2">
                  We'll use this to personalize cards and expert tips.
                </p>
              </div>

              <div className="relative group">
                <label className="block text-xs font-bold text-violet-700 tracking-widest uppercase mb-2">YOUR NAME</label>
                <div className="relative">
                  <input
                    id="input-name"
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Jessica"
                    className="w-full h-14 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-violet-600 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5 text-[#4a4455]" />
                  </span>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  Privacy guaranteed. Your profile data resides locally.
                </p>
              </div>

              <div className="pt-10 mt-auto">
                <button
                  id="btn-step1-continue"
                  disabled={!isStep1Valid}
                  onClick={handleNext}
                  className={`w-full py-4 rounded-xl text-base font-bold transition shadow-md ${
                    isStep1Valid 
                      ? 'bg-violet-600 text-white hover:bg-violet-700 cursor-pointer' 
                      : 'bg-violet-300 text-purple-100 cursor-not-allowed opacity-75'
                  }`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">
                  Are you expecting or already a mama?
                </h2>
                <p className="text-[#4a4455] text-sm mt-1">
                  This helps us tailor your daily insights and pregnancy/growth milestones.
                </p>
              </div>

              <div className="space-y-4">
                {/* Option Pregnant */}
                <button
                  id="card-pregnant"
                  type="button"
                  onClick={() => setStage('pregnant')}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    stage === 'pregnant'
                      ? 'border-violet-600 bg-white ring-2 ring-violet-500/10 shadow-lg'
                      : 'border-violet-100 bg-[#e3e1ed]/30 hover:bg-violet-50'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-base text-[#121c28] group-hover:text-violet-700 transition">
                      I'm pregnant 🤰
                    </h3>
                    <p className="text-[#4a4455] text-xs mt-1">Tracking my journey to baby.</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    stage === 'pregnant' ? 'bg-violet-600 border-violet-600 text-white' : 'border-violet-200'
                  }`}>
                    {stage === 'pregnant' && <Check className="w-3" />}
                  </div>
                </button>

                {/* Option Already Mama */}
                <button
                  id="card-mama"
                  type="button"
                  onClick={() => setStage('mama')}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    stage === 'mama'
                      ? 'border-violet-600 bg-white ring-2 ring-violet-500/10 shadow-lg'
                      : 'border-violet-100 bg-[#e3e1ed]/30 hover:bg-violet-50'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-base text-[#121c28] group-hover:text-violet-700 transition">
                      I'm already a mama 👶
                    </h3>
                    <p className="text-[#4a4455] text-xs mt-1">My little one has arrived.</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    stage === 'mama' ? 'bg-violet-600 border-violet-600 text-white' : 'border-violet-200'
                  }`}>
                    {stage === 'mama' && <Check className="w-3" />}
                  </div>
                </button>
              </div>

              {/* Dynamic Sub-forms */}
              <AnimatePresence mode="wait">
                {stage === 'pregnant' && (
                  <motion.div
                    key="pregForm"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-4"
                  >
                    <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-100/50 space-y-3">
                      <label className="block text-xs font-bold text-violet-700 tracking-wider">
                        YOUR ESTIMATED DUE DATE
                      </label>
                      <div className="relative">
                        <input
                          id="due-date-picker"
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="w-full h-12 bg-white border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 text-violet-600 pointer-events-none" />
                      </div>
                      <p className="text-xs text-violet-700 italic font-medium">
                        "Every pregnancy is a beautiful story unfolding."
                      </p>
                    </div>
                  </motion.div>
                )}

                {stage === 'mama' && (
                  <motion.div
                    key="mamaForm"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-4"
                  >
                    <div className="p-5 rounded-2xl bg-violet-50/70 border border-violet-100/50 space-y-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-violet-700 tracking-wider">
                          BABY'S NAME
                        </label>
                        <input
                          id="input-baby-name"
                          type="text"
                          value={babyName}
                          onChange={(e) => setBabyName(e.target.value)}
                          placeholder="E.g., Leo"
                          className="w-full h-12 bg-white border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-violet-700 tracking-wider">
                          BIRTH DATE
                        </label>
                        <div className="relative">
                          <input
                            id="baby-birth-picker"
                            type="date"
                            value={babyBirthDate}
                            onChange={(e) => setBabyBirthDate(e.target.value)}
                            className="w-full h-12 bg-white border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 text-violet-600 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-6 mt-auto">
                <button
                  id="btn-step2-continue"
                  disabled={!isStep2Valid}
                  onClick={handleNext}
                  className={`w-full py-4 rounded-xl text-base font-bold transition shadow-md ${
                    isStep2Valid 
                      ? 'bg-violet-600 text-white hover:bg-violet-700 cursor-pointer' 
                      : 'bg-violet-300 text-purple-100 cursor-not-allowed opacity-75'
                  }`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-[#e3e1ed] mx-auto rounded-full flex items-center justify-center">
                  <Baby className="w-8 h-8 text-violet-700" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">
                  How far along are you?
                </h2>
                <p className="text-[#4a4455] text-sm max-w-xs mx-auto">
                  This helps us calibrate milestone timelines and custom feeds.
                </p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-violet-100/70 shadow-sm space-y-5">
                {stage === 'pregnant' ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-violet-700 uppercase tracking-widest pl-1">
                      CURRENT MILESTONE
                    </label>
                    <select
                      id="select-milestone"
                      value={currentMilestone}
                      onChange={(e) => {
                        setCurrentMilestone(e.target.value);
                        setBabyMonths('');
                      }}
                      className="w-full h-12 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                    >
                      <option value="4">4 Weeks</option>
                      <option value="8">8 Weeks</option>
                      <option value="12">12 Weeks</option>
                      <option value="16">16 Weeks</option>
                      <option value="20">20 Weeks</option>
                      <option value="24">24 Weeks</option>
                      <option value="28">28 Weeks</option>
                      <option value="32">32 Weeks</option>
                      <option value="36">36 Weeks</option>
                      <option value="40">Full Term (40 Weeks)</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-violet-700 uppercase tracking-widest pl-1">
                        BABY'S CURRENT AGE / MONTHS
                      </label>
                      <input
                        id="input-baby-months"
                        type="text"
                        value={babyMonths}
                        onChange={(e) => {
                          setBabyMonths(e.target.value);
                          setCurrentMilestone('');
                        }}
                        placeholder="E.g., 6 months (or 1 year)"
                        className="w-full h-12 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-600"
                      />
                    </div>
                  </div>
                )}

                <div className="text-center py-2 flex items-center justify-center gap-3">
                  <div className="h-px bg-violet-100 flex-1" />
                  <span className="text-xs font-bold text-[#4a4455]">SUPPORTIVE TRACKING</span>
                  <div className="h-px bg-violet-100 flex-1" />
                </div>

                {/* Micro illustration banner */}
                <div className="opacity-70 rounded-xl overflow-hidden aspect-[4/2] bg-violet-50 flex items-center justify-center">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8aaJyD4dw8EH3AbYMSOKKI5OxpWTgDq3cTlE5eJrxCQrmPDvGkOSQGzGKtMiww9ch9WTSk8dlbMypmWMlxt0_x7P5aZZlruItBfjhRRI0RYAeyUfK9T-ToY8n51OKXRJ4S0kvD7A8c4GErQ83--aRKPkUK3ieW-iyL4Mwx28s1p_OZyXd5ntOm0im_dzj8taQQgIRaGCtqqM_dXN4qh7Xqh5Acu8rKNt5C7XT-NYPBnEa4gvOLB9TH5g4Czf306nIMr-8K_z7O5sX" 
                    alt="Baby Bassinet decor" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <button
                  id="btn-step3-continue"
                  disabled={!isStep3Valid}
                  onClick={handleNext}
                  className={`w-full py-4 rounded-xl text-base font-bold transition shadow-md ${
                    isStep3Valid 
                      ? 'bg-violet-600 text-white hover:bg-violet-700 cursor-pointer' 
                      : 'bg-violet-300 text-purple-100 cursor-not-allowed opacity-75'
                  }`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col space-y-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Is this your first baby?</h1>
                <p className="text-[#4a4455] text-sm max-w-[280px] mx-auto">We'll tailor your daily tips based on your experience levels.</p>
              </div>

              <div className="space-y-4">
                {/* Yes */}
                <button
                  id="card-first-time"
                  type="button"
                  onClick={() => setIsFirstBaby(true)}
                  className={`choice-card w-full p-5 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 ${
                    isFirstBaby === true
                      ? 'border-violet-600 bg-[#e3e1ed]/30 ring-2 ring-violet-500/10'
                      : 'border-violet-100 bg-white hover:bg-violet-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700">
                    <Smile className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#121c28]">Yes, first time!</h3>
                    <p className="text-xs text-[#4a4455]">Everything is new and exciting.</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isFirstBaby === true ? 'border-violet-600' : 'border-violet-200'
                  }`}>
                    {isFirstBaby === true && <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />}
                  </div>
                </button>

                {/* No */}
                <button
                  id="card-done-before"
                  type="button"
                  onClick={() => setIsFirstBaby(false)}
                  className={`choice-card w-full p-5 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 ${
                    isFirstBaby === false
                      ? 'border-violet-600 bg-[#e3e1ed]/30 ring-2 ring-violet-500/10'
                      : 'border-violet-100 bg-white hover:bg-violet-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#121c28]">I've done this before.</h3>
                    <p className="text-xs text-[#4a4455]">I'm adding to my beautiful family.</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isFirstBaby === false ? 'border-violet-600' : 'border-violet-200'
                  }`}>
                    {isFirstBaby === false && <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />}
                  </div>
                </button>
              </div>

              {/* Illustration banner */}
              <div className="flex justify-center mt-3">
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-violet-50 relative border border-violet-100">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7_GBAc71FXc2W9b41mY0IaPw5w693YoJN4wKCiXfAKK0OgcQfFfIYGpVrTPlZahXJsLGA-lNsr3zvi79Q_JzcCI8qrpANvvhSb3w4ppyjcqRILNmnQ6UlLAJ-qd3BGdU45VX-SM-ZBxhmTEMbPwZ2gULZBOllHA3-xNROdYpUzauuJeCuNeyp42FFypIQkC1uXnoF8OGhapIOhcXQ63b2YioDx-aIQb1N_7xLY0tgkcRM5fqyDJDjGhjWAURkMLHax1JujpatHwaL" 
                    alt="Soft focus crib illustration" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                </div>
              </div>

              <div className="pt-4 mt-auto">
                <button
                  id="btn-step4-continue"
                  disabled={!isStep4Valid}
                  onClick={handleNext}
                  className={`w-full py-4 rounded-xl text-base font-bold transition shadow-md ${
                    isStep4Valid 
                      ? 'bg-violet-600 text-white hover:bg-violet-700 cursor-pointer' 
                      : 'bg-violet-300 text-purple-100 cursor-not-allowed opacity-75'
                  }`}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-grow flex flex-col items-center justify-center text-center space-y-6 relative z-10"
            >
              {/* Profile card photo decoration */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
                <div className="absolute inset-0 bg-violet-200/50 rounded-full animate-pulse" />
                <div className="absolute inset-3 rounded-full overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img
                    alt="Toddler portrait celebration"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrWiNfkA81R7XcDJnb-FbO7QUbWzTcWdcvz_axlE2ZgXFDGFI5g95nGB-FJB8WrBbq8x53LDckPZnwRWWckYr_g7KSlwtX8lxB4auPFHxFeWzJIdH8lc_wOLPsCVPu12zj9aO6Iyr-guniFc-R-F-TrmcH-DYMaCB_OAQPCaJsMbvzl0-qu9ZA76W0_THfe7lSG96z7inNWnzknGQN2SZ4VzrDtjOzUJmWPz2vKRLWqYiUsA6H2w0bLNooBTlrzKSO7a0yevl-PqHk"
                  />
                </div>
                <div className="absolute -top-2 -right-2 text-violet-600 animate-bounce">
                  <Sparkles className="w-8 h-8 text-amber-500 fill-amber-300" />
                </div>
                <div className="absolute -bottom-1 -left-2 text-violet-600">
                  <Gift className="w-8 h-8 text-violet-700" />
                </div>
              </div>

              {/* Typography cluster */}
              <div className="space-y-3">
                <h2 id="heading-celebration" className="text-2xl md:text-3xl font-extrabold text-[#121c28]">
                  {stage === 'mama' ? `${babyName || 'Leo'} is 1 today! 🎂` : `Welcome, ${name || 'Mama'}! 💖`}
                </h2>
                <p className="text-sm md:text-base text-[#4a4455] max-w-sm leading-relaxed">
                  {stage === 'mama' 
                    ? "What an incredible journey. Here's a look at how far you've both come!"
                    : "We're matching clinical tips & developmental pathways directly to your due date."}
                </p>
              </div>

              {/* Bento widgets */}
              <div className="grid grid-cols-2 gap-4 w-full mt-6" id="onboarding-bento">
                <div className="bg-[#e3e1ed]/30 p-5 rounded-2xl flex flex-col items-center justify-center border border-violet-100">
                  <span className="text-violet-700 text-2xl font-bold">
                    {stage === 'pregnant' ? '40' : '12'}
                  </span>
                  <span className="text-xs font-bold text-[#4a4455] uppercase tracking-wide mt-1">
                    {stage === 'pregnant' ? 'Weeks of Bliss' : 'Milestones'}
                  </span>
                </div>
                <div className="bg-violet-600 text-white p-5 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-violet-600/10">
                  <span className="text-2xl font-bold">
                    {stage === 'pregnant' ? '280' : '365'}
                  </span>
                  <span className="text-xs font-bold opacity-95 uppercase tracking-wide mt-1">
                    {stage === 'pregnant' ? 'Days of Growth' : 'Days of Love'}
                  </span>
                </div>
              </div>

              <div className="w-full pt-8">
                <button
                  id="btn-finish-onboarding"
                  onClick={handleFinish}
                  className="w-full py-4 bg-violet-700 hover:bg-violet-800 text-white font-bold rounded-xl shadow-lg hover:scale-[1.01] active:scale-95 transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>See your milestones</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent safety compliance footer */}
      <footer className="w-full py-4 border-t border-gray-200/50 mt-auto text-center px-6">
        <p className="text-[11px] text-[#4a4455] leading-relaxed">
          For learning purposes only — always consult your pediatrician.
        </p>
        <p className="text-[10px] text-gray-400 mt-1 pb-safe">
          MamaHub &copy; 2026
        </p>
      </footer>
    </div>
  );
}
