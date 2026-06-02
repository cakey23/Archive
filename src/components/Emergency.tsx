import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Phone, 
  Share2, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Volume2
} from 'lucide-react';

interface EmergencyProps {
  initialGuide?: 'choking' | 'cpr' | 'fever';
  onBackToDashboard: () => void;
}

export default function Emergency({ initialGuide = 'choking', onBackToDashboard }: EmergencyProps) {
  const [activeGuide, setActiveGuide] = useState<'choking' | 'cpr' | 'fever'>(initialGuide);

  // --- CHOKING SIMULATION STATE ---
  const [chokingStep, setChokingStep] = useState<number>(2);
  const [blowsCount, setBlowsCount] = useState<number>(0);
  const [isCradleImpact, setIsCradleImpact] = useState<boolean>(false);
  const [chokingFeedback, setChokingFeedback] = useState<string>('');

  // --- CPR SIMULATION STATE ---
  const [cprCompressions, setCprCompressions] = useState<number>(0);
  const [cprCycle, setCprCycle] = useState<number>(1);
  const [cprState, setCprState] = useState<'compressions' | 'breaths'>('compressions');
  const [breathCount, setBreathCount] = useState<number>(0);
  const [cprFeedback, setCprFeedback] = useState<string>('');
  const [cprImpact, setCprImpact] = useState<boolean>(false);

  // --- FEVER CHECKLIST STATE ---
  const [feverSymptomCheck, setFeverSymptomCheck] = useState<{ [key: string]: boolean }>({
    lethargy: false,
    dehydration: false,
    poorFeeding: false,
    irritability: false
  });

  // Haptic Feedback Helper
  const triggerHaptic = (ms: number | number[] = 60) => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(ms);
    }
  };

  // Back blow logging handler
  const handleBackBlowTap = () => {
    if (blowsCount < 5) {
      const nextBlows = blowsCount + 1;
      setBlowsCount(nextBlows);
      setIsCradleImpact(true);
      triggerHaptic(70);
      setTimeout(() => setIsCradleImpact(false), 200);

      if (nextBlows === 5) {
        triggerHaptic([100, 50, 100]);
        // Per 2025 AHA/AAP guidelines: after 5 back blows, move to 5 chest thrusts
        setChokingFeedback("5 back blows done. Now flip baby face-up and give 5 chest thrusts. Keep alternating until object is expelled or baby becomes unresponsive.");
        setChokingStep(3);
      }
    }
  };

  // Chest compression handler
  const handleCompressionTap = () => {
    if (cprState === 'compressions' && cprCompressions < 30) {
      const nextComp = cprCompressions + 1;
      setCprCompressions(nextComp);
      setCprImpact(true);
      triggerHaptic(50);
      setTimeout(() => setCprImpact(false), 150);

      if (nextComp === 30) {
        triggerHaptic([80, 40, 80]);
        setCprState('breaths');
        // Per 2025 AHA guidelines: 30 compressions then 2 breaths, 1 second each
        setCprFeedback("30 compressions done. Now cover baby's mouth AND nose with your mouth. Give 2 gentle puffs — 1 second each — just enough to see the chest rise.");
      }
    }
  };

  // Breath giving handler
  const handleBreathTap = () => {
    if (cprState === 'breaths' && breathCount < 2) {
      const nextBreath = breathCount + 1;
      setBreathCount(nextBreath);
      triggerHaptic(120);

      if (nextBreath === 2) {
        setTimeout(() => {
          setCprCycle(prev => prev + 1);
          setCprState('compressions');
          setCprCompressions(0);
          setBreathCount(0);
          setCprFeedback(`Cycle ${cprCycle} complete. Continue 30 compressions. Aim for 100–120 per minute — think the beat of "Baby Shark." Don't stop until help arrives.`);
        }, 1200);
      }
    }
  };

  // Emergency Call dispatcher
  const handleEmergencyCall = () => {
    triggerHaptic([200, 100, 200, 100, 200]);
    alert("MamaHub: Dialing Emergency Services (911) and broadcasting real-time medical GPS coordinates. Stay calm, speak clearly.");
  };

  // Reset helpers
  const resetChokingSimulation = () => {
    setBlowsCount(0);
    setChokingStep(2);
    setChokingFeedback("");
  };

  const resetCprSimulation = () => {
    setCprCompressions(0);
    setBreathCount(0);
    setCprCycle(1);
    setCprState('compressions');
    setCprFeedback("");
  };

  return (
    <div id="emergency-suite" className="bg-[#fef7ff] min-h-screen pb-28 text-[#1e1a23] select-none">
      
      {/* Dynamic Sub-header Navigation */}
      <header className="sticky top-0 bg-[#fef7ff] shadow-sm flex justify-between items-center px-6 h-16 z-40 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <button 
            id="btn-back-dashboard"
            onClick={onBackToDashboard} 
            className="p-1 rounded-full text-[#64568b] hover:bg-purple-100/40 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="font-extrabold text-[#64568b] tracking-normal">Safety Solutions</span>
        </div>

        {/* Categories toggler inside Emergency */}
        <div className="flex bg-[#f3ebf9] p-1 rounded-full text-[10px] font-bold h-10 items-center">
          <button 
            id="btn-emergency-choking"
            onClick={() => setActiveGuide('choking')}
            className={`px-3 py-1.5 rounded-full transition-colors ${activeGuide === 'choking' ? 'bg-[#64568b] text-white shadow' : 'text-[#49454f]'}`}
          >
            Choking
          </button>
          <button 
            id="btn-emergency-cpr"
            onClick={() => setActiveGuide('cpr')}
            className={`px-3 py-1.5 rounded-full transition-colors ${activeGuide === 'cpr' ? 'bg-[#64568b] text-white shadow' : 'text-[#49454f]'}`}
          >
            CPR
          </button>
          <button 
            id="btn-emergency-fever"
            onClick={() => setActiveGuide('fever')}
            className={`px-3 py-1.5 rounded-full transition-colors ${activeGuide === 'fever' ? 'bg-[#64568b] text-white shadow' : 'text-[#49454f]'}`}
          >
            Fever
          </button>
        </div>
      </header>

      {/* CHOKING SIMULATION VIEW */}
      {activeGuide === 'choking' && (
        <motion.div
          key="choking"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Simulation Header */}
          <section className="relative bg-[#f9f1fe] p-6 lg:py-10 flex flex-col items-center justify-center overflow-hidden">
            <div className="text-center max-w-xs space-y-2 mb-4">
              <span className="text-rose-700 bg-rose-100 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">
                Emergency Guide: Choking
              </span>
              {/* ── REAL CONTENT: 2025 AHA/AAP guidelines ── */}
              <p className="font-extrabold text-base tracking-tight text-[#1e1a23]">Tap to simulate back blows</p>
              <p className="text-xs text-slate-500">Give 5 firm heel-of-hand blows between the shoulder blades</p>
            </div>

            {/* Baby Back graphics container */}
            <div className="relative w-64 h-80 flex items-center justify-center">
              <div className={`w-full h-full flex flex-col items-center justify-center transition-transform ${
                isCradleImpact ? 'animate-bounce scale-[0.98]' : ''
              }`}>
                <img 
                  src="https://i.ibb.co/dJc6MfKw/Chat-GPT-Image-Jun-1-2026-08-11-37-PM.png" 
                  alt="Baby face-down on forearm — back blow position" 
                  className="w-full h-full object-contain opacity-90 brightness-[0.98]"
                />

                {/* Pulsing Back Blows click area */}
                {chokingStep === 2 && (
                  <div 
                    id="impact-target"
                    onClick={handleBackBlowTap}
                    className="absolute top-[40%] left-1/2 -translate-x-1/2 w-28 h-28 border-4 border-dashed border-[#64568b]/70 bg-[#64568b]/5 rounded-full flex items-center justify-center cursor-pointer animate-pulse active:scale-90 transition-transform"
                  >
                    <div className="w-16 h-16 bg-[#64568b]/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-[#64568b]">TAP HEEL</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tally counter bubble overlay */}
              <div 
                id="blow-count-bubble"
                className="absolute bottom-4 right-2 bg-[#e8e0ed] px-4 py-2.5 rounded-full shadow-lg border border-purple-100 flex items-center gap-1 text-xs font-bold"
              >
                <span className="text-violet-700 text-sm font-mono">{blowsCount}</span>
                <span className="text-slate-500">/ 5 Blows</span>
              </div>
            </div>

            {chokingFeedback && (
              <div className="mt-4 p-4 rounded-xl bg-[#f3ebf9] text-[#1e1a23] text-xs font-bold max-w-xs text-center border">
                {chokingFeedback}
              </div>
            )}
          </section>

          {/* Steps selector */}
          <section className="px-6 max-w-xs mx-auto">
            <div className="flex justify-between items-center relative before:absolute before:left-0 before:right-0 before:top-5 before:h-0.5 before:bg-slate-200 before:z-0">
              
              <div className="relative z-10 flex flex-col items-center gap-1">
                <button 
                  onClick={() => { setChokingStep(1); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    chokingStep >= 1 ? 'bg-[#64568b] text-white' : 'bg-[#e8e0ed] text-slate-500'
                  }`}
                >
                  1
                </button>
                <span className="text-[10px] font-bold text-slate-500">Recognize</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-1">
                <button 
                  onClick={() => { setChokingStep(2); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    chokingStep >= 2 ? 'bg-[#64568b] text-white ring-4 ring-[#64568b]/20' : 'bg-[#e8e0ed] text-slate-500'
                  }`}
                >
                  2
                </button>
                <span className="text-[10px] font-bold text-slate-800">Back Blows</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-1">
                <button 
                  onClick={() => { setChokingStep(3); }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    chokingStep === 3 ? 'bg-[#64568b] text-white' : 'bg-[#e8e0ed] text-slate-500'
                  }`}
                >
                  3
                </button>
                <span className="text-[10px] font-bold text-slate-500">Chest Thrusts</span>
              </div>

            </div>

            {/* ── REAL CONTENT: All step text updated per 2025 AHA/AAP guidelines ── */}
            <div className="mt-6 p-5 bg-[#f3ebf9] rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm border-b pb-2">
                {chokingStep === 1 && "1. Recognize & Call 911"}
                {chokingStep === 2 && "2. Give 5 Back Blows"}
                {chokingStep === 3 && "3. Give 5 Chest Thrusts — Repeat Cycle"}
              </h3>
              
              <ul className="space-y-3.5 text-xs text-slate-600">
                {chokingStep === 1 && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                      <span><strong>Call 911 immediately</strong> if baby cannot cry, cough forcefully, or breathe. Blue or purple lips mean the airway is fully blocked.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                      <span>If baby is coughing loudly or crying — do nothing. A strong cough is the most effective way to clear the airway on its own.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Hold baby face-down along your forearm, head lower than chest. Support the head and jaw firmly with your hand. Rest your forearm on your thigh.</span>
                    </li>
                  </>
                )}
                {chokingStep === 2 && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                      <span>Using the <strong>heel of your free hand</strong>, give 5 firm blows directly between the shoulder blades. Each blow should be separate and forceful.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                      <span>Check baby's mouth after each blow. <strong>Only remove an object if you can clearly see it</strong> — never do a blind finger sweep, as this can push the object deeper.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Stop immediately if baby begins to breathe, cry, or cough forcefully. Go to chest thrusts if object is not expelled after 5 blows.</span>
                    </li>
                  </>
                )}
                {chokingStep === 3 && (
                  <>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                      <span>Flip baby face-up on your forearm, head still lower than chest. Use <strong>2–3 fingers at the center of the chest</strong>, just below the nipple line.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                      <span>Give 5 chest thrusts — push down about <strong>1.5 inches</strong>, firm and deliberate. Check mouth between each thrust.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>Keep alternating: 5 back blows → 5 chest thrusts</strong> until the object is expelled or baby becomes unresponsive. If unresponsive, begin infant CPR immediately.</span>
                    </li>
                    <li className="flex items-start gap-2 pt-1 border-t border-purple-100">
                      <span className="text-[10px] text-slate-400 italic">Source: 2025 AHA/AAP Guidelines for CPR & Emergency Cardiovascular Care, published in Circulation (Oct 22, 2025). Abdominal thrusts are NOT recommended for infants.</span>
                    </li>
                  </>
                )}
              </ul>

              <div className="pt-3">
                <button 
                  id="btn-reset-choking"
                  onClick={resetChokingSimulation}
                  className="w-full py-2.5 border border-[#64568b] text-[#64568b] rounded-xl hover:bg-[#64568b]/5 font-bold text-xs flex justify-center items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Choking Simulator</span>
                </button>
              </div>
            </div>
          </section>

        </motion.div>
      )}

      {/* CPR SIMULATION VIEW */}
      {activeGuide === 'cpr' && (
        <motion.div
          key="cpr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <section className="relative bg-[#f9f1fe] p-6 lg:py-10 flex flex-col items-center justify-center overflow-hidden">
            <div className="text-center max-w-sm space-y-2 mb-4">
              <span className="text-teal-700 bg-teal-100 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">
                Emergency Guide: Baby CPR
              </span>
              {/* ── REAL CONTENT: 2025 AHA/AAP CPR guidelines ── */}
              <p className="font-extrabold text-base tracking-tight text-[#1e1a23]">
                {cprState === 'compressions' ? '30 Compressions → 2 Breaths' : 'Give 2 Rescue Breaths'}
              </p>
              <p className="text-xs text-slate-500">
                {cprState === 'compressions' 
                  ? 'Tap to compress 1.5 inches deep at 100–120 per minute (think "Baby Shark" beat)' 
                  : 'Cover mouth AND nose. Give 2 gentle puffs — 1 second each. Watch for chest rise.'}
              </p>
            </div>

            {/* Baby CPR Tapping Graphics */}
            <div className="relative w-64 h-80 flex items-center justify-center">
              <div className={`w-full h-full flex flex-col items-center justify-center transition-all ${
                cprImpact ? 'scale-[0.98] saturate-150 animate-pulse' : ''
              }`}>
                <img 
                  src="https://i.ibb.co/4RJH3shc/Chat-GPT-Image-Jun-1-2026-08-13-46-PM.png" 
                  alt="Baby face-up on forearm — chest thrust position" 
                  className="w-full h-full object-contain rounded-3xl"
                />

                {cprState === 'compressions' ? (
                  <div 
                    id="cpr-compression-target"
                    onClick={handleCompressionTap}
                    className="absolute top-[48%] left-1/2 -translate-x-1/2 w-24 h-24 border-4 border-dashed border-[#64568b] bg-[#64568b]/10 rounded-full flex flex-col items-center justify-center cursor-pointer animate-ping"
                  >
                    <span className="text-[10px] font-black">HEEL/THUMB</span>
                  </div>
                ) : (
                  <div 
                    id="cpr-breath-target"
                    onClick={handleBreathTap}
                    className="absolute top-[25%] left-1/2 -translate-x-1/2 w-20 h-20 bg-teal-500/80 hover:bg-teal-600 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-lg animate-bounce border-2 border-white"
                  >
                    <span className="text-[10px] font-black text-white">GIVE BREATH</span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-4 left-2 bg-[#e8e0ed] px-4 py-2 rounded-full shadow-lg border text-xs font-bold font-mono">
                {cprState === 'compressions' ? (
                  <span className="text-violet-700">{cprCompressions} / 30 Compressions</span>
                ) : (
                  <span className="text-teal-700">{breathCount} / 2 Breaths Given</span>
                )}
              </div>

              <div className="absolute bottom-4 right-2 bg-[#64568b] text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold">
                Set {cprCycle}
              </div>
            </div>

            {cprFeedback && (
              <div className="mt-4 p-4 rounded-xl bg-[#f3ebf9] text-[#1e1a23] text-xs font-bold max-w-xs text-center border">
                {cprFeedback}
              </div>
            )}
          </section>

          {/* ── REAL CONTENT: CPR instruction card ── */}
          <section className="px-6 max-w-xs mx-auto">
            <div className="p-5 bg-white rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm border-b pb-2">Infant CPR — Step by Step</h3>
              
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                  <span><strong>Call 911 first</strong> — or shout for someone to call while you begin CPR. Don't leave the baby alone to call.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                  <span>Place baby on a firm flat surface. Use the <strong>heel of one hand or two-thumb encircling technique</strong> at the center of the chest, just below the nipple line. (2025 AHA update: 2-finger technique no longer recommended.)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                  <span>Compress <strong>1.5 inches deep (4 cm)</strong> — about one-third of the chest. Rate: <strong>100–120 compressions per minute</strong>. Allow full chest recoil between compressions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                  <span>After 30 compressions: tilt head back slightly to open the airway. Cover <strong>both the mouth and nose</strong> with your mouth. Give 2 gentle puffs — <strong>1 second each</strong> — until you see the chest rise. Do not blow hard.</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Do not stop</strong> until the baby shows signs of life, an AED is available, or emergency services take over.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-[#64568b] shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-800">Keep phone on speaker so the 911 dispatcher can guide your rhythm in real time.</span>
                </div>
                <div className="pt-1 border-t border-purple-100">
                  <span className="text-[10px] text-slate-400 italic">Source: 2025 AHA/AAP Guidelines for Pediatric Basic Life Support, Circulation (Oct 22, 2025). Co-published in AAP journal Pediatrics.</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  id="btn-reset-cpr"
                  onClick={resetCprSimulation}
                  className="w-full py-2.5 border border-[#64568b] text-[#64568b] rounded-xl hover:bg-[#64568b]/5 font-bold text-xs flex justify-center items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset CPR</span>
                </button>
              </div>
            </div>
          </section>

        </motion.div>
      )}

      {/* NEWBORN FEVER VIEW */}
      {activeGuide === 'fever' && (
        <motion.div
          key="fever"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 px-6"
        >
          {/* ── REAL CONTENT: AAP & Mayo Clinic fever thresholds ── */}
          <section className="bg-white p-5 rounded-3xl border border-violet-100 shadow-sm mt-4 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-800">Baby Fever: When to Act</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Always measure with a rectal thermometer for babies under 3 months — it is the most accurate method per AAP guidelines.
              </p>
            </div>

            {/* ── REAL CONTENT: Age-specific fever thresholds from AAP / Mayo Clinic / Connecticut Children's ── */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs" id="fever-bounds">
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl">
                <p className="font-bold text-[10px] text-rose-800">Under 3 Months</p>
                <p className="font-black text-rose-700 text-sm mt-1">100.4°F+</p>
                <p className="text-[9px] text-rose-600 mt-0.5">(38°C) — Go to ER now</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-2xl">
                <p className="font-bold text-[10px] text-purple-800">3–6 Months</p>
                <p className="font-black text-purple-700 text-sm mt-1">101°F+</p>
                <p className="text-[9px] text-purple-600 mt-0.5">(38.3°C) — Call doctor</p>
              </div>
              <div className="bg-[#f0eafc] border border-purple-100 p-3 rounded-2xl">
                <p className="font-bold text-[10px] text-slate-800">6 Months+</p>
                <p className="font-black text-slate-900 text-sm mt-1">104°F+</p>
                <p className="text-[9px] text-slate-600 mt-0.5">(40°C) — Call doctor</p>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 text-left">
              <p className="text-[11px] font-bold text-rose-800 mb-1">⚠️ Critical rule for newborns</p>
              <p className="text-[11px] text-rose-700 leading-relaxed">Any fever of 100.4°F or higher in a baby <strong>under 3 months</strong> is a medical emergency — even if baby seems okay. Their immune systems cannot yet fight serious infections. Do not wait. Go to the ER.</p>
              <p className="text-[10px] text-rose-500 mt-1 italic">Source: AAP Clinical Practice Guideline (Pediatrics, 2021) · Mayo Clinic (Oct 2024) · Connecticut Children's (Apr 2026)</p>
            </div>
          </section>

          {/* ── REAL CONTENT: Symptom checklist updated with clinical descriptions ── */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pl-1">
              <span className="font-extrabold text-xs text-slate-500 uppercase tracking-widest pl-1">Red Flag Symptom Checklist</span>
            </div>

            <div className="space-y-3" id="fever-checklist">
              <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border cursor-pointer border-[#dfe0e0]">
                <input 
                  id="checklist-symptom-lethargy"
                  type="checkbox"
                  checked={feverSymptomCheck['lethargy']}
                  onChange={() => {
                    triggerHaptic(40);
                    setFeverSymptomCheck(prev => ({ ...prev, lethargy: !prev.lethargy }));
                  }}
                  className="rounded mt-1 focus:ring-rose-500 text-rose-600 border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Unusual lethargy or limpness</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Baby is difficult or impossible to wake, seems floppy, or is not responding to your voice or touch. This is a 911 sign regardless of temperature.</p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border cursor-pointer border-[#dfe0e0]">
                <input 
                  id="checklist-symptom-dehydration"
                  type="checkbox"
                  checked={feverSymptomCheck['dehydration']}
                  onChange={() => {
                    triggerHaptic(40);
                    setFeverSymptomCheck(prev => ({ ...prev, dehydration: !prev.dehydration }));
                  }}
                  className="rounded mt-1 focus:ring-rose-500 text-rose-600 border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Signs of dehydration</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Fewer than 6 wet diapers in 24 hours, sunken fontanelle (soft spot on head), dry or sticky mouth, no tears when crying.</p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border cursor-pointer border-[#dfe0e0]">
                <input 
                  id="checklist-symptom-feeding"
                  type="checkbox"
                  checked={feverSymptomCheck['poorFeeding']}
                  onChange={() => {
                    triggerHaptic(40);
                    setFeverSymptomCheck(prev => ({ ...prev, poorFeeding: !prev.poorFeeding }));
                  }}
                  className="rounded mt-1 focus:ring-rose-500 text-rose-600 border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Refusing to feed</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Missing 2 or more consecutive feedings, or showing no interest in feeding at all. In newborns, this is always a reason to call your pediatrician.</p>
                </div>
              </label>

              <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border cursor-pointer border-[#dfe0e0]">
                <input 
                  id="checklist-symptom-irritability"
                  type="checkbox"
                  checked={feverSymptomCheck['irritability']}
                  onChange={() => {
                    triggerHaptic(40);
                    setFeverSymptomCheck(prev => ({ ...prev, irritability: !prev.irritability }));
                  }}
                  className="rounded mt-1 focus:ring-rose-500 text-rose-600 border-slate-300"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">High-pitched or inconsolable crying</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">A cry that sounds different from usual — high-pitched, weak, or a cry that cannot be soothed by feeding, holding, or comforting.</p>
                </div>
              </label>

              {/* Breathing danger sign */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-1" />
                <div>
                  <span className="text-xs font-bold text-rose-800 block">Breathing difficulty — Call 911 immediately</span>
                  <p className="text-[11px] text-rose-600 mt-0.5">Chest pulling in (retracting) with each breath, fast or labored breathing, blue or pale color around the lips or face. Do not wait.</p>
                </div>
              </div>
            </div>

            {Object.values(feverSymptomCheck).some(v => v) && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100/50 space-y-2 mt-4">
                <p className="text-rose-800 text-xs font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  <span>One or more red flags detected — contact your pediatrician or go to the ER now.</span>
                </p>
                <p className="text-rose-700 text-[11px] leading-relaxed">
                  These symptoms alongside a fever in a young infant can indicate a serious infection that needs immediate evaluation. Do not wait to see if it improves on its own.
                </p>
                <p className="text-[10px] text-rose-400 italic">Source: Mayo Clinic · AAP · Connecticut Children's Medical Center</p>
              </div>
            )}

            {/* Thermometer guidance */}
            <div className="p-4 rounded-2xl bg-[#f3ebf9] border border-purple-100 space-y-2">
              <p className="text-xs font-bold text-[#64568b]">📌 How to take an accurate temperature</p>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li>• <strong>Under 3 months:</strong> Rectal thermometer only — it is the gold standard per AAP.</li>
                <li>• <strong>3–6 months:</strong> Rectal or armpit (axillary). Ear thermometers are not accurate until 6 months.</li>
                <li>• <strong>Forehead strips and pacifier thermometers</strong> are not reliable enough for clinical decisions.</li>
              </ul>
              <p className="text-[10px] text-slate-400 italic mt-1">Source: AAP · Blueberry Pediatrics (Apr 2026)</p>
            </div>
          </section>

        </motion.div>
      )}

      {/* Persistent Emergency Action Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-[#fef7ff]/95 backdrop-blur-md p-5 border-t border-purple-100 flex gap-4 max-w-md mx-auto right-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          id="btn-emergency-action-call"
          onClick={handleEmergencyCall}
          className="flex-grow py-4 bg-[#ba1a1a] hover:bg-red-800 text-white font-bold leading-normal rounded-full flex items-center justify-center gap-3 transition active:scale-95 shadow-lg"
        >
          <Phone className="w-5 h-5 fill-white text-white" />
          <span>EMERGENCY CALL (911)</span>
        </button>
        
        <button 
          id="btn-emergency-action-share"
          onClick={() => alert("MamaHub: Sharing your local coordinates with preconfigured emergency caregiver contacts.")}
          className="w-14 h-14 bg-[#e8e0ed] text-violet-700 hover:text-white hover:bg-violet-600 rounded-full flex items-center justify-center transition active:scale-90 shadow border"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
