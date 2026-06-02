import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Phone,
  Share2,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Volume2,
  RotateCcw,
} from 'lucide-react';

interface EmergencyProps {
  initialGuide?: 'choking' | 'cpr' | 'fever';
  onBackToDashboard: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rhythm helpers
// ─────────────────────────────────────────────────────────────────────────────
const CPR_MIN_MS   = 500;  const CPR_MAX_MS   = 600;  const CPR_SLOW_MS   = 800;
const BLOW_MIN_MS  = 350;  const BLOW_MAX_MS  = 1300; const BLOW_SLOW_MS  = 2000;
const THRUST_MIN_MS= 300;  const THRUST_MAX_MS= 1100; const THRUST_SLOW_MS= 1800;

type RhythmLabel = 'good' | 'slow' | 'fast' | '';

function calcRhythm(ms: number, minMs: number, maxMs: number, slowMs: number): RhythmLabel {
  if (ms < minMs)  return 'fast';
  if (ms > slowMs) return 'slow';
  if (ms > maxMs)  return 'slow';
  return 'good';
}

const RHYTHM_CFG: Record<RhythmLabel, { label: string; bg: string; text: string; border: string }> = {
  good: { label: 'Good pace \u2713',        bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  slow: { label: 'Too slow \u2014 speed up', bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200'   },
  fast: { label: 'Too fast \u2014 slow down',bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200'    },
  '':   { label: '', bg: '', text: '', border: '' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SVG baby: face-DOWN (back-blow position)
// ─────────────────────────────────────────────────────────────────────────────
function BabyFaceDown({ backGlow, bodyShift }: { backGlow: number; bodyShift: number }) {
  const shift = bodyShift * -5;
  return (
    <svg viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
      aria-label="Baby face-down on forearm, back-blow position">
      <defs>
        <radialGradient id="skinBD" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fde8c8"/><stop offset="100%" stopColor="#f4c48a"/>
        </radialGradient>
        <linearGradient id="armBD" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8c49a"/><stop offset="100%" stopColor="#d4a870"/>
        </linearGradient>
        <radialGradient id="backGlowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(220,38,38,0.55)" stopOpacity={backGlow}/>
          <stop offset="100%" stopColor="rgba(220,38,38,0)" stopOpacity="0"/>
        </radialGradient>
        <pattern id="stripesBD" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#c4b5fd"/>
          <rect width="4" height="8" fill="#a78bfa"/>
        </pattern>
        <marker id="arrBD" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626"/>
        </marker>
      </defs>
      {/* Rescuer forearm */}
      <rect x="10" y="200" width="240" height="34" rx="17" fill="url(#armBD)"/>
      <rect x="10" y="200" width="240" height="9"  rx="8"  fill="rgba(0,0,0,0.07)"/>
      {/* Baby body — shifts on impact */}
      <g style={{ transform: `translateY(${shift}px)`, transition: 'transform 120ms ease-out' }}>
        {/* Onesie */}
        <ellipse cx="130" cy="170" rx="52" ry="27" fill="url(#stripesBD)"/>
        <ellipse cx="120" cy="160" rx="28" ry="11" fill="rgba(255,255,255,0.18)"/>
        {/* Back / shoulders skin */}
        <ellipse cx="130" cy="150" rx="40" ry="21" fill="url(#skinBD)"/>
        {/* Arms */}
        <ellipse cx="84"  cy="178" rx="10" ry="20" fill="url(#skinBD)" transform="rotate(-15 84 178)"/>
        <ellipse cx="176" cy="178" rx="10" ry="20" fill="url(#skinBD)" transform="rotate(15 176 178)"/>
        {/* Legs */}
        <ellipse cx="108" cy="196" rx="14" ry="10" fill="#c4b5fd"/>
        <ellipse cx="152" cy="196" rx="14" ry="10" fill="#c4b5fd"/>
        {/* Socks */}
        <ellipse cx="96"  cy="202" rx="10" ry="6"  fill="#f9a8d4"/>
        <ellipse cx="164" cy="202" rx="10" ry="6"  fill="#f9a8d4"/>
        {/* Head (turned) */}
        <ellipse cx="130" cy="118" rx="32" ry="28" fill="url(#skinBD)"/>
        <ellipse cx="130" cy="96"  rx="28" ry="12" fill="#78350f"/>
        <ellipse cx="100" cy="118" rx="8"  ry="10" fill="#fcd9a0"/>
        <rect    x="118"  y="141"  width="24" height="13" rx="6" fill="url(#skinBD)"/>
        {/* Impact glow on back */}
        <ellipse cx="130" cy="150" rx="46" ry="26" fill="url(#backGlowG)"
          style={{ opacity: backGlow, transition: backGlow > 0 ? 'opacity 70ms ease-in' : 'opacity 320ms ease-out' }}/>
        {/* Target rings */}
        <circle cx="130" cy="150" r="18" fill="none" stroke="rgba(220,38,38,0.28)" strokeWidth="2.5" strokeDasharray="5 4"/>
        <circle cx="130" cy="150" r="28" fill="none" stroke="rgba(220,38,38,0.14)" strokeWidth="2"   strokeDasharray="7 5"/>
      </g>
      {/* Instruction arrow */}
      <g opacity="0.55">
        <line x1="205" y1="62" x2="150" y2="132" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrBD)"/>
        <text x="208" y="57" fontSize="11" fill="#dc2626" fontWeight="700" fontFamily="system-ui">heel here</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG baby: face-UP (chest-thrust position)
// ─────────────────────────────────────────────────────────────────────────────
function BabyFaceUp({ chestGlow, bodyShift }: { chestGlow: number; bodyShift: number }) {
  const compress = bodyShift * 4;
  return (
    <svg viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
      aria-label="Baby face-up on forearm, chest-thrust position">
      <defs>
        <radialGradient id="skinFU" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fde8c8"/><stop offset="100%" stopColor="#f4c48a"/>
        </radialGradient>
        <linearGradient id="armFU" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e8c49a"/><stop offset="100%" stopColor="#d4a870"/>
        </linearGradient>
        <radialGradient id="chestGlowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(220,38,38,0.48)" stopOpacity={chestGlow}/>
          <stop offset="100%" stopColor="rgba(220,38,38,0)" stopOpacity="0"/>
        </radialGradient>
        <pattern id="stripesFU" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#bae6fd"/>
          <rect width="4" height="8" fill="#7dd3fc"/>
        </pattern>
        <marker id="arrFU" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626"/>
        </marker>
      </defs>
      {/* Forearm */}
      <rect x="10" y="200" width="240" height="34" rx="17" fill="url(#armFU)"/>
      <rect x="10" y="200" width="240" height="9"  rx="8"  fill="rgba(0,0,0,0.07)"/>
      {/* Onesie torso */}
      <ellipse cx="130" cy="170" rx="52" ry="26" fill="url(#stripesFU)"/>
      <ellipse cx="118" cy="160" rx="30" ry="11" fill="rgba(255,255,255,0.18)"/>
      {/* Chest skin */}
      <ellipse cx="130" cy="153" rx="38" ry="19" fill="url(#skinFU)"/>
      {/* Arms */}
      <ellipse cx="84"  cy="172" rx="10" ry="22" fill="url(#skinFU)" transform="rotate(10 84 172)"/>
      <ellipse cx="176" cy="172" rx="10" ry="22" fill="url(#skinFU)" transform="rotate(-10 176 172)"/>
      <ellipse cx="84"  cy="193" rx="9"  ry="7"  fill="#fcd9a0"/>
      <ellipse cx="176" cy="193" rx="9"  ry="7"  fill="#fcd9a0"/>
      {/* Legs */}
      <ellipse cx="110" cy="194" rx="14" ry="10" fill="#bae6fd"/>
      <ellipse cx="150" cy="194" rx="14" ry="10" fill="#bae6fd"/>
      <ellipse cx="98"  cy="201" rx="10" ry="6"  fill="#f9a8d4"/>
      <ellipse cx="162" cy="201" rx="10" ry="6"  fill="#f9a8d4"/>
      {/* Head */}
      <ellipse cx="130" cy="112" rx="33" ry="30" fill="url(#skinFU)"/>
      <ellipse cx="130" cy="88"  rx="30" ry="12" fill="#78350f"/>
      <path d="M116 112 Q120 108 124 112" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M136 112 Q140 108 144 112" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="130" cy="119" rx="4"  ry="3"  fill="#f4c48a"/>
      <path d="M124 125 Q130 130 136 125" stroke="#c9846a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="98"  cy="112" rx="8"  ry="10" fill="#fcd9a0"/>
      <ellipse cx="162" cy="112" rx="8"  ry="10" fill="#fcd9a0"/>
      <rect    x="118"  y="139"  width="24" height="14" rx="7" fill="url(#skinFU)"/>
      {/* Chest thrust zone — compresses on tap */}
      <g style={{ transform: `translateY(${compress}px)`, transition: 'transform 100ms ease-out' }}>
        <ellipse cx="130" cy="151" rx="20" ry="13" fill="rgba(220,38,38,0.07)"/>
        <circle  cx="113" cy="155" r="3"           fill="rgba(220,38,38,0.20)"/>
        <circle  cx="147" cy="155" r="3"           fill="rgba(220,38,38,0.20)"/>
        <rect    x="124"  y="156"  width="12" height="5" rx="2.5" fill="rgba(220,38,38,0.18)"/>
        <ellipse cx="130" cy="151" rx="34" ry="21" fill="url(#chestGlowG)"
          style={{ opacity: chestGlow, transition: chestGlow > 0 ? 'opacity 60ms ease-in' : 'opacity 300ms ease-out' }}/>
      </g>
      {/* Target rings */}
      <circle cx="130" cy="153" r="16" fill="none" stroke="rgba(109,40,217,0.25)" strokeWidth="2"   strokeDasharray="5 4"/>
      <circle cx="130" cy="153" r="26" fill="none" stroke="rgba(109,40,217,0.13)" strokeWidth="1.8" strokeDasharray="7 5"/>
      {/* Arrow */}
      <g opacity="0.50">
        <line x1="205" y1="62" x2="150" y2="138" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrFU)"/>
        <text x="208" y="57" fontSize="11" fill="#dc2626" fontWeight="700" fontFamily="system-ui">2 fingers</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dot progress row
// ─────────────────────────────────────────────────────────────────────────────
function DotProgress({ done, total, color }: { done: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i}
          initial={false}
          animate={{ scale: i < done ? 1 : 0.7, opacity: i < done ? 1 : 0.28 }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
          className={`w-3.5 h-3.5 rounded-full ${i < done ? color : 'bg-slate-200'}`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Choking phase type
// ─────────────────────────────────────────────────────────────────────────────
type ChokingPhase = 'recognize' | 'blows' | 'transition-to-thrusts' | 'thrusts' | 'transition-to-blows';

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function Emergency({ initialGuide = 'choking', onBackToDashboard }: EmergencyProps) {
  const [activeGuide, setActiveGuide] = useState<'choking' | 'cpr' | 'fever'>(initialGuide);

  // ── Choking state ──
  const [chokingPhase,  setChokingPhase]  = useState<ChokingPhase>('recognize');
  const [blowsDone,     setBlowsDone]     = useState(0);
  const [thrustsDone,   setThrustsDone]   = useState(0);
  const [cycleCount,    setCycleCount]    = useState(1);
  const [blowImpact,    setBlowImpact]    = useState(false);
  const [thrustImpact,  setThrustImpact]  = useState(false);
  const [blowRhythm,    setBlowRhythm]    = useState<RhythmLabel>('');
  const [thrustRhythm,  setThrustRhythm]  = useState<RhythmLabel>('');
  const lastBlowRef    = useRef<number>(0);
  const lastThrustRef  = useRef<number>(0);
  const transitionLock = useRef(false);

  // ── CPR state ──
  const [cprCompressions, setCprCompressions] = useState(0);
  const [cprCycle,        setCprCycle]        = useState(1);
  const [cprState,        setCprState]        = useState<'compressions' | 'breaths'>('compressions');
  const [breathCount,     setBreathCount]     = useState(0);
  const [cprFeedback,     setCprFeedback]     = useState('');
  const [cprImpact,       setCprImpact]       = useState(false);
  const [cprRhythm,       setCprRhythm]       = useState<RhythmLabel>('');
  const lastCprTapRef = useRef<number>(0);

  // ── Fever state ──
  const [feverSymptomCheck, setFeverSymptomCheck] = useState<Record<string, boolean>>({
    lethargy: false, dehydration: false, poorFeeding: false, irritability: false,
  });

  // ── Choking handlers ──

  const handleBlowTap = useCallback(() => {
    if (chokingPhase !== 'blows' || blowsDone >= 5 || transitionLock.current) return;
    const now = Date.now(), prev = lastBlowRef.current;
    lastBlowRef.current = now;
    if (prev > 0) setBlowRhythm(calcRhythm(now - prev, BLOW_MIN_MS, BLOW_MAX_MS, BLOW_SLOW_MS));
    const next = blowsDone + 1;
    setBlowsDone(next);
    setBlowImpact(true);
    setTimeout(() => setBlowImpact(false), 230);
    if (next >= 5) {
      transitionLock.current = true;
      setBlowRhythm('');
      setChokingPhase('transition-to-thrusts');
      setTimeout(() => {
        setChokingPhase('thrusts');
        setThrustsDone(0);
        lastThrustRef.current = 0;
        transitionLock.current = false;
      }, 1500);
    }
  }, [chokingPhase, blowsDone]);

  const handleThrustTap = useCallback(() => {
    if (chokingPhase !== 'thrusts' || thrustsDone >= 5 || transitionLock.current) return;
    const now = Date.now(), prev = lastThrustRef.current;
    lastThrustRef.current = now;
    if (prev > 0) setThrustRhythm(calcRhythm(now - prev, THRUST_MIN_MS, THRUST_MAX_MS, THRUST_SLOW_MS));
    const next = thrustsDone + 1;
    setThrustsDone(next);
    setThrustImpact(true);
    setTimeout(() => setThrustImpact(false), 200);
    if (next >= 5) {
      transitionLock.current = true;
      setThrustRhythm('');
      setChokingPhase('transition-to-blows');
      setTimeout(() => {
        setCycleCount(c => c + 1);
        setChokingPhase('blows');
        setBlowsDone(0);
        lastBlowRef.current = 0;
        transitionLock.current = false;
      }, 1500);
    }
  }, [chokingPhase, thrustsDone]);

  const resetChoking = useCallback(() => {
    setChokingPhase('recognize');
    setBlowsDone(0); setThrustsDone(0); setCycleCount(1);
    setBlowImpact(false); setThrustImpact(false);
    setBlowRhythm(''); setThrustRhythm('');
    lastBlowRef.current = 0; lastThrustRef.current = 0;
    transitionLock.current = false;
  }, []);

  // ── CPR handlers (unchanged) ──

  const handleCompressionTap = useCallback(() => {
    if (cprState !== 'compressions' || cprCompressions >= 30) return;
    const now = Date.now(), prev = lastCprTapRef.current;
    lastCprTapRef.current = now;
    if (prev > 0) setCprRhythm(calcRhythm(now - prev, CPR_MIN_MS, CPR_MAX_MS, CPR_SLOW_MS));
    const next = cprCompressions + 1;
    setCprCompressions(next);
    setCprImpact(true);
    setTimeout(() => setCprImpact(false), 200);
    if (next === 30) {
      setCprState('breaths'); setCprRhythm('');
      setCprFeedback("30 compressions done. Cover baby's mouth AND nose. Give 2 gentle puffs \u2014 1 second each \u2014 just enough to see the chest rise.");
    }
  }, [cprState, cprCompressions]);

  const handleBreathTap = useCallback(() => {
    if (cprState !== 'breaths' || breathCount >= 2) return;
    const next = breathCount + 1;
    setBreathCount(next);
    if (next === 2) {
      setTimeout(() => {
        setCprCycle(c => c + 1); setCprState('compressions');
        setCprCompressions(0); setBreathCount(0); lastCprTapRef.current = 0;
        setCprFeedback('Cycle complete. Continue 30 compressions \u2014 aim for 100\u2013120/min. Think \u201cBaby Shark.\u201d Don\u2019t stop until help arrives.');
      }, 1200);
    }
  }, [cprState, breathCount]);

  const resetCpr = () => {
    setCprCompressions(0); setBreathCount(0); setCprCycle(1);
    setCprState('compressions'); setCprFeedback(''); setCprRhythm('');
    setCprImpact(false); lastCprTapRef.current = 0;
  };

  const handleEmergencyCall = () =>
    alert('MamaHub: Dialing Emergency Services (911). Stay calm, speak clearly, and keep performing CPR if trained.');

  // ── Derived choking UI values ──
  const isRecognize = chokingPhase === 'recognize';
  const isBlows     = chokingPhase === 'blows';
  const isThrusts   = chokingPhase === 'thrusts';
  const isToThrusts = chokingPhase === 'transition-to-thrusts';
  const isToBlows   = chokingPhase === 'transition-to-blows';
  const isTransition= isToThrusts || isToBlows;

  const showFaceDown = isRecognize || isBlows || isToThrusts;
  const showFaceUp   = isThrusts   || isToBlows;

  const activeRhythm  = isBlows ? blowRhythm : isThrusts ? thrustRhythm : '';
  const currentBlow   = isBlows ? blowsDone : (isToThrusts || isToBlows || isThrusts) ? 5 : 0;
  const currentThrust = isThrusts ? thrustsDone : isToBlows ? 5 : 0;

  const phaseHeading = isRecognize ? 'Step 1 \u2014 Recognize & Call 911'
    : isBlows       ? `Round ${cycleCount} \u00b7 Give 5 Back Blows`
    : isThrusts     ? `Round ${cycleCount} \u00b7 Give 5 Chest Thrusts`
    : isToThrusts   ? '5 blows done! Flip baby face-up\u2026'
    :                 '5 thrusts done! Flip baby face-down\u2026';

  const phaseSub = isRecognize ? 'Tap \u201cStart Simulation\u201d when ready to practise'
    : isBlows    ? 'Tap the back area \u2014 firm, separate blows'
    : isThrusts  ? 'Tap the chest area \u2014 2 fingers, 1\u00bd\u2033 deep'
    :              'Repositioning\u2026';

  // ── Render ──
  return (
    <div id="emergency-suite" className="bg-[#fff8f8] min-h-screen pb-28 text-[#1e1a23] select-none">

      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm flex justify-between items-center px-6 h-16 z-40 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <button onClick={onBackToDashboard} className="p-1 rounded-full text-slate-600 hover:bg-rose-50 transition">
            <ArrowLeft className="w-6 h-6"/>
          </button>
          <div>
            <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider">Emergency Suite</p>
            <span className="font-extrabold text-slate-800 text-sm leading-none">Safety Guides</span>
          </div>
        </div>
        <div className="flex bg-rose-50 p-1 rounded-full text-[10px] font-bold h-10 items-center gap-0.5">
          {(['choking','cpr','fever'] as const).map(g => (
            <button key={g} onClick={() => setActiveGuide(g)}
              className={`px-3 py-1.5 rounded-full transition-colors capitalize ${activeGuide===g?'bg-rose-700 text-white shadow':'text-slate-500 hover:text-rose-700'}`}>
              {g==='cpr'?'CPR':g.charAt(0).toUpperCase()+g.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* ═══════════════════ CHOKING VIEW ═══════════════════ */}
      {activeGuide === 'choking' && (
        <motion.div key="choking" initial={{opacity:0}} animate={{opacity:1}} className="space-y-0">

          {/* Phase banner */}
          <div className="bg-gradient-to-b from-rose-50 to-[#fff8f8] px-6 pt-5 pb-3 text-center space-y-1">
            <span className="text-rose-700 bg-rose-100 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider inline-block">
              Emergency Guide &middot; Infant Choking
            </span>
            <AnimatePresence mode="wait">
              <motion.p key={phaseHeading}
                initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.22}}
                className="font-extrabold text-base tracking-tight text-[#1e1a23] pt-1">
                {phaseHeading}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p key={phaseSub}
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.18}}
                className="text-xs text-slate-500">
                {phaseSub}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Dual counter strip */}
          {!isRecognize && (
            <div className="mx-5 mt-0 mb-1">
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-3 flex items-center justify-between gap-3">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isBlows||isToThrusts?'text-rose-700':'text-slate-400'}`}>Back Blows</p>
                  <DotProgress done={currentBlow} total={5} color="bg-rose-500"/>
                  <p className={`text-xs font-mono font-extrabold ${isBlows?'text-rose-700':'text-slate-400'}`}>{currentBlow} / 5</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-rose-700 text-white flex items-center justify-center text-[10px] font-black">R{cycleCount}</div>
                  <RotateCcw className="w-3.5 h-3.5 text-slate-300 mt-0.5"/>
                </div>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isThrusts?'text-violet-700':'text-slate-400'}`}>Chest Thrusts</p>
                  <DotProgress done={currentThrust} total={5} color="bg-violet-500"/>
                  <p className={`text-xs font-mono font-extrabold ${isThrusts?'text-violet-700':'text-slate-400'}`}>{currentThrust} / 5</p>
                </div>
              </div>
            </div>
          )}

          {/* Baby illustration + tap targets */}
          <div className="flex flex-col items-center px-6 pt-2 pb-0">
            <div className="relative w-60 h-68" style={{height:'272px'}}>
              <AnimatePresence mode="wait">

                {/* Face-DOWN */}
                {showFaceDown && (
                  <motion.div key="face-down"
                    initial={{opacity:0,x:-14}} animate={{opacity:1,x:0}} exit={{opacity:0,x:14}} transition={{duration:0.26}}
                    className="absolute inset-0"
                    style={{ transform: blowImpact?'scale(0.965) translateY(-4px)':'scale(1)', transition:'transform 110ms ease-out' }}>
                    <BabyFaceDown backGlow={blowImpact?1:0} bodyShift={blowImpact?1:0}/>
                    {isBlows && (
                      <div onClick={handleBlowTap}
                        className="absolute top-[36%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full cursor-pointer z-10 flex items-center justify-center active:scale-90 transition-transform"
                        aria-label="Tap to give back blow">
                        <div className={`w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${blowImpact?'border-rose-600 bg-rose-200/40 scale-95':'border-rose-400/60 bg-rose-400/10 animate-pulse'}`}>
                          <span className="text-[11px] font-black text-rose-700 leading-tight text-center">TAP<br/>HEEL</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Face-UP */}
                {showFaceUp && (
                  <motion.div key="face-up"
                    initial={{opacity:0,x:14}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-14}} transition={{duration:0.26}}
                    className="absolute inset-0"
                    style={{ transform: thrustImpact?'scale(0.965) translateY(3px)':'scale(1)', transition:'transform 100ms ease-out' }}>
                    <BabyFaceUp chestGlow={thrustImpact?1:0} bodyShift={thrustImpact?1:0}/>
                    {isThrusts && (
                      <div onClick={handleThrustTap}
                        className="absolute top-[42%] left-1/2 -translate-x-1/2 w-28 h-28 rounded-full cursor-pointer z-10 flex items-center justify-center active:scale-90 transition-transform"
                        aria-label="Tap to give chest thrust">
                        <div className={`w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center transition-all ${thrustImpact?'border-violet-600 bg-violet-200/40 scale-95':'border-violet-400/60 bg-violet-400/10 animate-pulse'}`}>
                          <span className="text-[11px] font-black text-violet-700 leading-tight text-center">TAP<br/>CHEST</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Transition dots */}
              {isTransition && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}}
                  className="absolute inset-x-0 bottom-0 flex justify-center pb-2">
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => (
                      <motion.div key={i}
                        animate={{scale:[1,1.45,1],opacity:[0.35,1,0.35]}}
                        transition={{repeat:Infinity,duration:0.9,delay:i*0.18}}
                        className="w-2 h-2 rounded-full bg-rose-400"/>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Rhythm badge */}
            <AnimatePresence mode="wait">
              {activeRhythm !== '' && (
                <motion.div key={activeRhythm}
                  initial={{opacity:0,scale:0.82}} animate={{opacity:1,scale:1}}
                  exit={{opacity:0,scale:0.82}} transition={{duration:0.16}}
                  className={`mt-2 px-5 py-1.5 rounded-full border text-xs font-extrabold tracking-wide ${RHYTHM_CFG[activeRhythm].bg} ${RHYTHM_CFG[activeRhythm].text} ${RHYTHM_CFG[activeRhythm].border}`}>
                  {RHYTHM_CFG[activeRhythm].label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Transition copy */}
            {isToBlows && (
              <motion.p initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                className="mt-2 text-[11px] text-violet-700 font-bold text-center max-w-[220px]">
                Flip baby face-down. Continue alternating until the object clears or help arrives.
              </motion.p>
            )}
            {isToThrusts && (
              <motion.p initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
                className="mt-2 text-[11px] text-rose-700 font-bold text-center max-w-[220px]">
                Flip baby face-up and support the head. Now give 5 chest thrusts.
              </motion.p>
            )}
          </div>

          {/* Instruction card */}
          <div className="px-5 pt-3 pb-2 max-w-sm mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div key={chokingPhase}
                initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}}
                className={`p-5 rounded-2xl border shadow-sm space-y-3 ${
                  isBlows||isToThrusts ? 'bg-rose-50 border-rose-100'
                  : isThrusts||isToBlows ? 'bg-violet-50 border-violet-100'
                  : 'bg-slate-50 border-slate-100'
                }`}>

                {isRecognize && (
                  <>
                    <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2">1 &mdash; Recognize the emergency</h3>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"/><span><strong>Call 911 immediately</strong> if baby cannot cry, cough forcefully, or breathe. Blue or purple lips = fully blocked airway.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"/><span>If baby is coughing loudly &mdash; do nothing. A strong cough clears the airway most effectively on its own.</span></li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/><span>Position baby <strong>face-down</strong> on your forearm, head lower than chest. Support head and jaw firmly.</span></li>
                    </ul>
                    <button onClick={() => { setChokingPhase('blows'); setBlowsDone(0); lastBlowRef.current=0; }}
                      className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-sm rounded-xl transition active:scale-95 shadow-md">
                      Start Simulation &rarr;
                    </button>
                  </>
                )}

                {(isBlows||isToThrusts) && (
                  <>
                    <h3 className="font-extrabold text-sm text-rose-900 border-b border-rose-200 pb-2">2 &mdash; Back Blows (round {cycleCount})</h3>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"/><span>Using the <strong>heel of your free hand</strong>, give 5 firm, separate blows between the shoulder blades.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"/><span>After each blow, check the mouth. <strong>Only remove an object you can clearly see</strong> &mdash; no blind finger sweeps.</span></li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/><span>After 5 blows with no improvement, flip baby face-up for 5 chest thrusts.</span></li>
                    </ul>
                  </>
                )}

                {(isThrusts||isToBlows) && (
                  <>
                    <h3 className="font-extrabold text-sm text-violet-900 border-b border-violet-200 pb-2">3 &mdash; Chest Thrusts (round {cycleCount})</h3>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span>Baby face-up. Place <strong>2 fingers at the center of the chest</strong>, just below the nipple line. Give 5 quick downward thrusts ~1&frac12;&Prime; deep.</span></li>
                      <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span>After each thrust, check the mouth. If the object is visible, carefully remove it.</span></li>
                      <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/><span>After 5 thrusts, flip baby face-down and repeat back blows. <strong>Continue alternating</strong> until object is expelled or baby becomes unresponsive.</span></li>
                    </ul>
                  </>
                )}

                {!isRecognize && (
                  <div className="flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2 border border-slate-100 mt-1">
                    <RotateCcw className="w-3.5 h-3.5 text-rose-500 shrink-0"/>
                    <p className="text-[10px] text-slate-500 font-semibold leading-snug">
                      Alternate 5 back blows &harr; 5 chest thrusts. If baby becomes unresponsive, begin CPR immediately.
                    </p>
                  </div>
                )}

                <button onClick={resetChoking}
                  className="w-full py-2.5 border border-rose-200 text-rose-700 rounded-xl hover:bg-rose-50 font-bold text-xs flex justify-center items-center gap-1.5 mt-1">
                  <RefreshCw className="w-3.5 h-3.5"/><span>Reset Simulation</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-center text-[10px] text-slate-400 italic px-6 pb-4">
            Per 2025 AHA/AAP Guidelines for Pediatric Basic Life Support
          </p>
        </motion.div>
      )}

      {/* ═══════════════════ CPR VIEW (unchanged) ═══════════════════ */}
      {activeGuide === 'cpr' && (
        <motion.div key="cpr" initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
          <section className="relative bg-gradient-to-b from-violet-50 to-[#fff8f8] p-6 flex flex-col items-center justify-center overflow-hidden">
            <div className="text-center max-w-sm space-y-2 mb-4">
              <span className="text-violet-700 bg-violet-100 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">Emergency Guide &middot; Baby CPR</span>
              <p className="font-extrabold text-base tracking-tight text-[#1e1a23]">
                {cprState==='compressions'?'30 Compressions \u2192 2 Breaths':'Now give 2 rescue breaths'}
              </p>
              <p className="text-xs text-slate-500">
                {cprState==='compressions'
                  ?'Tap the chest area \u2014 1.5 inches deep at 100\u2013120/min (think \u201cBaby Shark\u201d beat)'
                  :'Cover mouth AND nose. 2 gentle puffs \u2014 1 second each. Watch for chest rise.'}
              </p>
            </div>
            <div className="relative w-64 h-80 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center"
                style={{transform:cprImpact?'scale(0.96)':'scale(1)',transition:'transform 120ms ease-out'}}>
                <img src="https://i.ibb.co/4RJH3shc/Chat-GPT-Image-Jun-1-2026-08-13-46-PM.png"
                  alt="Baby face-up on forearm, chest compression position"
                  className="w-full h-full object-contain rounded-3xl"
                  style={{opacity:cprImpact?0.82:1,transition:'opacity 120ms'}}/>
                <div className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{background:'rgba(220,38,38,0.15)',opacity:cprImpact?1:0,
                    transition:cprImpact?'opacity 60ms ease-in':'opacity 280ms ease-out'}}/>
                {cprState==='compressions' && (
                  <div onClick={handleCompressionTap}
                    className="absolute top-[48%] left-1/2 -translate-x-1/2 w-24 h-24 border-4 border-dashed border-violet-600 bg-violet-600/10 rounded-full flex flex-col items-center justify-center cursor-pointer animate-pulse active:scale-90 transition-transform z-10">
                    <span className="text-[10px] font-black text-violet-700 leading-tight text-center">TAP TO<br/>COMPRESS</span>
                  </div>
                )}
                {cprState==='breaths' && (
                  <div onClick={handleBreathTap}
                    className="absolute top-[22%] left-1/2 -translate-x-1/2 w-20 h-20 bg-teal-500/80 hover:bg-teal-600 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-lg animate-bounce border-2 border-white active:scale-90 transition-transform z-10">
                    <span className="text-[10px] font-black text-white text-center leading-tight">GIVE<br/>BREATH</span>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-2 bg-white border border-violet-100 px-4 py-2 rounded-full shadow-lg text-xs font-bold font-mono">
                {cprState==='compressions'?<span className="text-violet-700">{cprCompressions} / 30</span>:<span className="text-teal-700">{breathCount} / 2 breaths</span>}
              </div>
              <div className="absolute bottom-4 right-2 bg-violet-700 text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold">Cycle {cprCycle}</div>
            </div>
            <AnimatePresence mode="wait">
              {cprRhythm!==''&&cprState==='compressions'&&(
                <motion.div key={cprRhythm}
                  initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.85}} transition={{duration:0.18}}
                  className={`mt-3 px-5 py-2 rounded-full border text-xs font-extrabold tracking-wide ${RHYTHM_CFG[cprRhythm].bg} ${RHYTHM_CFG[cprRhythm].text} ${RHYTHM_CFG[cprRhythm].border}`}>
                  {RHYTHM_CFG[cprRhythm].label}
                </motion.div>
              )}
            </AnimatePresence>
            {cprFeedback&&(
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                className="mt-4 p-4 rounded-xl bg-violet-50 text-violet-900 text-xs font-bold max-w-xs text-center border border-violet-200">
                {cprFeedback}
              </motion.div>
            )}
          </section>
          <section className="px-6 max-w-xs mx-auto">
            <div className="p-5 bg-white rounded-2xl border shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm border-b pb-2">Infant CPR &mdash; Step by Step</h3>
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span><strong>Call 911 first</strong> &mdash; or shout for someone to call while you begin CPR. Don&rsquo;t leave the baby alone.</span></div>
                <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span>Place baby on a firm flat surface. Use the <strong>heel of one hand or two-thumb encircling technique</strong> at the center of the chest, just below the nipple line. (2025 AHA: 2-finger technique no longer recommended.)</span></div>
                <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span>Compress <strong>1.5 inches deep (4 cm)</strong> &mdash; about one-third of the chest. Rate: <strong>100&ndash;120/min</strong>. Allow full chest recoil.</span></div>
                <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span>After 30 compressions: tilt head back slightly. Cover <strong>both mouth and nose</strong>. Give 2 gentle puffs &mdash; <strong>1 second each</strong> &mdash; until chest rises.</span></div>
                <div className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"/><span><strong>Do not stop</strong> until baby shows signs of life, an AED is available, or EMS take over.</span></div>
                <div className="flex items-start gap-2"><Volume2 className="w-4 h-4 text-violet-600 shrink-0 mt-0.5"/><span className="font-semibold text-slate-800">Keep phone on speaker so the 911 dispatcher can guide your rhythm in real time.</span></div>
                <div className="pt-1 border-t border-purple-100"><span className="text-[10px] text-slate-400 italic">Source: 2025 AHA/AAP Guidelines for Pediatric Basic Life Support, Circulation (Oct 22, 2025).</span></div>
              </div>
              <button onClick={resetCpr}
                className="w-full py-2.5 border border-violet-200 text-violet-700 rounded-xl hover:bg-violet-50 font-bold text-xs flex justify-center items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5"/><span>Reset CPR Simulation</span>
              </button>
            </div>
          </section>
        </motion.div>
      )}

      {/* ═══════════════════ FEVER VIEW (unchanged) ═══════════════════ */}
      {activeGuide === 'fever' && (
        <motion.div key="fever" initial={{opacity:0}} animate={{opacity:1}} className="space-y-6 px-6">
          <section className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm mt-4 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto"><ShieldAlert className="w-8 h-8"/></div>
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-800">Baby Fever: When to Act</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Always measure with a rectal thermometer for babies under 3 months &mdash; it is the most accurate method per AAP guidelines.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl"><p className="font-bold text-[10px] text-rose-800">Under 3 Months</p><p className="font-black text-rose-700 text-sm mt-1">100.4&deg;F+</p><p className="text-[9px] text-rose-600 mt-0.5">(38&deg;C) &mdash; ER now</p></div>
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-2xl"><p className="font-bold text-[10px] text-purple-800">3&ndash;6 Months</p><p className="font-black text-purple-700 text-sm mt-1">101&deg;F+</p><p className="text-[9px] text-purple-600 mt-0.5">(38.3&deg;C) &mdash; Call doctor</p></div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl"><p className="font-bold text-[10px] text-slate-700">6 Months+</p><p className="font-black text-slate-800 text-sm mt-1">104&deg;F+</p><p className="text-[9px] text-slate-500 mt-0.5">(40&deg;C) &mdash; Call doctor</p></div>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3 text-left">
              <p className="text-[11px] font-bold text-rose-800 mb-1">&#9888;&#65039; Critical rule for newborns</p>
              <p className="text-[11px] text-rose-700 leading-relaxed">Any fever of 100.4&deg;F or higher in a baby <strong>under 3 months</strong> is a medical emergency &mdash; even if baby seems okay. Do not wait. Go to the ER.</p>
              <p className="text-[10px] text-rose-400 mt-1 italic">Source: AAP &middot; Mayo Clinic &middot; Connecticut Children&rsquo;s (Apr 2026)</p>
            </div>
          </section>
          <section className="space-y-4">
            <span className="font-extrabold text-xs text-slate-500 uppercase tracking-widest pl-1">Red Flag Symptom Checklist</span>
            <div className="space-y-3">
              {[
                {key:'lethargy',    label:'Unusual lethargy or limpness',        desc:'Baby is difficult or impossible to wake, seems floppy, or not responding to your voice or touch. This is a 911 sign regardless of temperature.'},
                {key:'dehydration', label:'Signs of dehydration',                desc:'Fewer than 6 wet diapers in 24 hours, sunken fontanelle (soft spot), dry or sticky mouth, no tears when crying.'},
                {key:'poorFeeding', label:'Refusing to feed',                    desc:'Missing 2 or more consecutive feedings, or showing no interest in feeding at all. In newborns, always call your pediatrician.'},
                {key:'irritability',label:'High-pitched or inconsolable crying', desc:'A cry that sounds different &mdash; high-pitched, weak, or impossible to soothe by feeding, holding, or comforting.'},
              ].map(item=>(
                <label key={item.key} className="flex items-start gap-4 p-4 rounded-2xl bg-white border cursor-pointer border-slate-200 hover:border-rose-200 transition">
                  <input type="checkbox" checked={feverSymptomCheck[item.key]}
                    onChange={()=>setFeverSymptomCheck(prev=>({...prev,[item.key]:!prev[item.key]}))}
                    className="rounded mt-1 focus:ring-rose-500 text-rose-600 border-slate-300"/>
                  <div><span className="text-xs font-bold text-slate-800 block">{item.label}</span><p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p></div>
                </label>
              ))}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-1"/>
                <div><span className="text-xs font-bold text-rose-800 block">Breathing difficulty &mdash; Call 911 immediately</span><p className="text-[11px] text-rose-600 mt-0.5">Chest pulling in with each breath, fast or labored breathing, blue or pale color around the lips or face. Do not wait.</p></div>
              </div>
            </div>
            {Object.values(feverSymptomCheck).some(v=>v)&&(
              <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 mt-4">
                <p className="text-rose-800 text-xs font-bold flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-rose-700"/><span>Red flag detected &mdash; contact your pediatrician or go to the ER now.</span></p>
                <p className="text-rose-700 text-[11px] leading-relaxed">These symptoms alongside a fever in a young infant can indicate a serious infection needing immediate evaluation.</p>
                <p className="text-[10px] text-rose-400 italic">Source: Mayo Clinic &middot; AAP &middot; Connecticut Children&rsquo;s Medical Center</p>
              </motion.div>
            )}
            <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 space-y-2">
              <p className="text-xs font-bold text-violet-800">&#128204; How to take an accurate temperature</p>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li>&bull; <strong>Under 3 months:</strong> Rectal thermometer only &mdash; gold standard per AAP.</li>
                <li>&bull; <strong>3&ndash;6 months:</strong> Rectal or armpit. Ear thermometers not accurate until 6 months.</li>
                <li>&bull; <strong>Forehead strips and pacifier thermometers</strong> are not reliable for clinical decisions.</li>
              </ul>
              <p className="text-[10px] text-slate-400 italic mt-1">Source: AAP &middot; Blueberry Pediatrics (Apr 2026)</p>
            </div>
          </section>
        </motion.div>
      )}

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md p-4 border-t border-rose-100 flex gap-3 max-w-md mx-auto right-0 shadow-[0_-4px_20px_rgba(186,26,26,0.08)]">
        <button onClick={handleEmergencyCall}
          className="flex-grow py-4 bg-[#ba1a1a] hover:bg-red-800 active:scale-95 text-white font-extrabold leading-normal rounded-2xl flex items-center justify-center gap-3 transition shadow-lg shadow-red-200">
          <Phone className="w-5 h-5 fill-white text-white"/>
          <span className="tracking-wide">CALL 911 NOW</span>
        </button>
        <button onClick={()=>alert('MamaHub: Sharing your location with preconfigured emergency caregiver contacts.')}
          className="w-14 h-14 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-2xl flex items-center justify-center transition active:scale-90 border border-rose-200">
          <Share2 className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
}