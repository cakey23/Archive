import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, AlertTriangle, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface Condition {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  severity: 'monitor' | 'call' | 'er';
  color: string;
  bgColor: string;
  borderColor: string;
  summary: string;
  keyFacts: string[];
  watchFor: { label: string; action: 'home' | 'call' | 'er' }[];
  source: string;
  sourceUrl: string;
  quote: string;
  quoteSource: string;
  doThis: string[];
  neverDo: string[];
}

const CONDITIONS: Condition[] = [
  {
    id: 'rsv',
    name: 'RSV',
    emoji: '🫁',
    tagline: 'Looks like a cold — but watch closely under 6 months',
    severity: 'call',
    color: '#b45309',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    summary: 'RSV (respiratory syncytial virus) is the leading cause of infant hospitalization in the US. For most healthy older children it feels like a cold — but in babies under 6 months, the same virus can cause serious breathing problems within days.',
    keyFacts: [
      'Almost all children get RSV at least once before age 2',
      'Symptoms are worst on days 3 through 5, and last 7–14 days on average',
      'RSV season runs fall through spring, peaking December–January',
      '2–3 out of every 100 infants under 3 months are hospitalized with RSV each year',
    ],
    watchFor: [
      { label: 'Runny nose, mild cough, low fever — baby feeding normally', action: 'home' },
      { label: 'Baby under 6 months with any cold symptoms', action: 'call' },
      { label: 'Wheezing — high-pitched whistling sound when breathing', action: 'call' },
      { label: 'Breathing faster than normal, nostrils flaring', action: 'call' },
      { label: 'Skin "caving in" between ribs when breathing in (retractions)', action: 'er' },
      { label: 'Blue or pale color around lips or face', action: 'er' },
      { label: 'Refusing to feed, signs of dehydration', action: 'er' },
    ],
    quote: '"If you see sucking in at their ribs or by their armpit, or if you see their neck and shoulders really having to help them breathe, that almost always needs medical attention urgently."',
    quoteSource: 'Dr. Kristin Barrett, Pediatrician — Cleveland Clinic (2026)',
    source: 'CDC · AAP HealthyChildren.org · Cleveland Clinic',
    sourceUrl: 'https://www.cdc.gov/rsv/infants-young-children/index.html',
    doThis: [
      'Keep baby upright as much as possible',
      'Use a cool-mist humidifier in baby\'s room',
      'Offer frequent small feeds to prevent dehydration',
      'Ask your pediatrician about RSV immunization — now about 80–90% effective at preventing hospitalization',
    ],
    neverDo: [
      'Never give cold or cough medicines to babies under 2',
      'Never ignore fast or labored breathing — act immediately',
    ],
  },
  {
    id: 'croup',
    name: 'Croup',
    emoji: '🐋',
    tagline: 'The barking seal cough — scary but usually manageable at home',
    severity: 'monitor',
    color: '#1d4ed8',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    summary: 'Croup causes swelling of the voice box and windpipe, creating a distinctive barking cough that sounds like a seal. It mostly affects children 3 months to 5 years. Most cases are mild and can be treated at home. Symptoms are almost always worse at night.',
    keyFacts: [
      'The same viruses that cause the common cold also cause croup',
      'Symptoms are worse at night and usually last 3 to 5 days',
      'Crying and anxiety make croup worse — keeping baby calm genuinely helps breathing',
      'Steam from a hot shower or cool night air can relieve symptoms quickly',
    ],
    watchFor: [
      { label: 'Barky cough, hoarse voice, mild difficulty breathing', action: 'home' },
      { label: 'Symptoms lasting more than 5 days or getting worse each night', action: 'call' },
      { label: 'High-pitched squeaking (stridor) when baby is calm and not crying', action: 'er' },
      { label: 'Drooling or difficulty swallowing', action: 'er' },
      { label: 'Blue lips or face, or extreme difficulty breathing', action: 'er' },
    ],
    quote: '"Most children with croup can be treated at home. It\'s important to comfort and calm your child because crying and distress can worsen airway swelling, making it harder to breathe."',
    quoteSource: 'Mayo Clinic',
    source: 'AAP HealthyChildren.org · Mayo Clinic · Cincinnati Children\'s Hospital',
    sourceUrl: 'https://www.healthychildren.org/English/health-issues/conditions/chest-lungs/Pages/Croup-Treatment.aspx',
    doThis: [
      'Sit in a bathroom with a hot shower running — breathe the steam for 20 minutes',
      'Or take baby outside into cool night air for a few minutes',
      'Use a cool-mist humidifier in baby\'s room',
      'Keep baby as calm as possible — crying makes it worse',
      'Hold baby upright on your lap',
    ],
    neverDo: [
      'Never use hot steam directly on baby — risk of burns',
      'Do not give cough or cold medicine to babies under 2',
    ],
  },
  {
    id: 'ear-infection',
    name: 'Ear Infection',
    emoji: '👂',
    tagline: 'Babies can\'t say their ear hurts — here\'s what to look for',
    severity: 'call',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    summary: 'Ear infections are one of the most common reasons parents bring babies to the doctor. Because babies can\'t tell you their ear hurts, you have to look for indirect signs. The AAP supports watchful waiting for mild cases in babies over 6 months — but babies under 6 months almost always need antibiotics.',
    keyFacts: [
      'About 50% of children with an ear infection will have a fever',
      'Ear pulling alone is NOT a reliable sign — babies also pull ears when teething',
      'Babies under 6 months almost always require antibiotics to prevent spread of infection',
      'Pain is often worse at night because lying down changes pressure in the ear',
    ],
    watchFor: [
      { label: 'Fussiness after a cold, trouble sleeping, mild fever', action: 'home' },
      { label: 'Persistent crying, pulling at one ear with fever', action: 'call' },
      { label: 'Any ear symptoms in baby under 6 months', action: 'call' },
      { label: 'Fluid or pus draining from the ear', action: 'call' },
      { label: 'High fever, severe pain, or bloody discharge from ear', action: 'er' },
    ],
    quote: '"When your child can\'t say my ear hurts, the following signs suggest an ear infection could be the culprit: increased crying and unusual irritability, pulling or batting at the ear, trouble sleeping, and fever."',
    quoteSource: 'Johns Hopkins Medicine',
    source: 'AAP HealthyChildren.org · Johns Hopkins Medicine · Blueberry Pediatrics',
    sourceUrl: 'https://www.healthychildren.org/English/health-issues/conditions/ear-nose-throat/Pages/Ear-Infection-Information.aspx',
    doThis: [
      'Give acetaminophen (or ibuprofen if baby is 6+ months) for pain and fever',
      'Keep baby\'s head slightly elevated during sleep',
      'See your pediatrician — only they can confirm an ear infection with an otoscope',
      'Always finish the full antibiotic course if prescribed',
    ],
    neverDo: [
      'Never put anything inside baby\'s ear canal',
      'Never skip doses of antibiotic — infection can return stronger',
      'Do not diagnose an ear infection yourself — ear pulling has many causes',
    ],
  },
  {
    id: 'rash',
    name: 'Rashes',
    emoji: '🔴',
    tagline: 'Most are harmless — but one test can tell you when to act immediately',
    severity: 'monitor',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    summary: 'Most baby rashes are harmless — heat rash, baby acne, and viral rashes are extremely common. The critical skill every parent needs is the "glass test" — pressing a clear glass against a rash to tell the difference between a normal rash and a dangerous one.',
    keyFacts: [
      'The glass test: press a clear glass firmly on the rash. If spots stay visible through the glass, go to the ER — this is non-blanching and indicates bleeding under the skin',
      'Purple or dark red tiny dots that do not fade when pressed = petechiae. With fever, this is meningococcemia until proven otherwise — call 911',
      'Most viral rashes are pink, appear on both sides of the chest and back, and last 2–3 days',
      'Heat rash looks like small pink or red bumps under clothing — harmless, keep baby cool',
    ],
    watchFor: [
      { label: 'Pink rash on chest/back with mild fever, baby feeding normally', action: 'home' },
      { label: 'Any widespread rash with fever — needs diagnosis', action: 'call' },
      { label: 'Rash that does NOT disappear when you press a glass against it', action: 'er' },
      { label: 'Purple or dark red dots (petechiae) with fever', action: 'er' },
      { label: 'Widespread purple blotches (purpura) anywhere on body', action: 'er' },
    ],
    quote: '"Scattered petechiae with a fever are caused by Meningococcemia until proven otherwise. This is a life-threatening bacterial infection of the bloodstream. Unlike most pink rashes, petechiae don\'t fade when pressed on."',
    quoteSource: 'AAP HealthyChildren.org Symptom Checker',
    source: 'AAP HealthyChildren.org · Children\'s Hospital Colorado · Children\'s Minnesota',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/baby/bathing-skin-care/Pages/Your-Newborns-Skin-Birthmarks-and-Rashes.aspx',
    doThis: [
      'Do the glass test on any rash you\'re unsure about — press a clear glass firmly',
      'For heat rash: dress baby in loose breathable clothing, keep cool',
      'For baby acne: no treatment needed, clears on its own',
      'Take a photo of the rash to show your pediatrician',
    ],
    neverDo: [
      'Never dismiss a non-blanching rash — this is always an emergency',
      'Never apply adult creams or treatments to baby\'s skin without asking your pediatrician',
    ],
  },
  {
    id: 'jaundice',
    name: 'Jaundice',
    emoji: '🟡',
    tagline: 'The yellow tint — common and usually harmless, but needs monitoring',
    severity: 'monitor',
    color: '#92400e',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    summary: 'Jaundice — the yellow color in a newborn\'s skin and eyes — is extremely common. About 80% of newborns develop some level of it. It happens because the baby\'s liver is still maturing. Most cases are mild and resolve on their own. In rare cases, very high bilirubin levels can cause brain damage, which is why monitoring is critical.',
    keyFacts: [
      'Jaundice first appears on the face, then moves down to the chest and abdomen as levels rise',
      'Best viewed in natural daylight or white fluorescent light — not yellow-tinted indoor light',
      'In breastfed babies, jaundice can last up to 1 month. In formula-fed babies, it usually resolves by 2 weeks',
      'Putting baby in sunlight is NOT a safe treatment — it can cause sunburn and overheating',
    ],
    watchFor: [
      { label: 'Mild yellow tint on face only, baby feeding and producing wet diapers', action: 'home' },
      { label: 'Yellow spreads below the chest, baby seems sleepy but feeding', action: 'call' },
      { label: 'Jaundice appearing within first 24 hours of birth', action: 'er' },
      { label: 'Yellow spreading to arms and legs, baby very hard to wake for feeds', action: 'er' },
      { label: 'Jaundice lasting more than 2 weeks (formula) or 4 weeks (breastfed)', action: 'call' },
    ],
    quote: '"Most babies develop jaundice in the first few days after birth because it takes a few days for the baby\'s liver to get better at removing bilirubin. But in rare cases, the bilirubin level can get very high and might cause brain damage."',
    quoteSource: 'AAP HealthyChildren.org (updated Aug 2024)',
    source: 'AAP HealthyChildren.org · Seattle Children\'s Hospital · Children\'s Minnesota',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/jaundice.aspx',
    doThis: [
      'Feed baby frequently — 8–12 times per day. Feeding helps flush bilirubin through the body',
      'Watch for yellow spreading below the belly button or into the arms and legs',
      'Attend all follow-up bilirubin checks your pediatrician schedules — do not skip them',
      'Check baby\'s color in natural daylight for the most accurate view',
    ],
    neverDo: [
      'Never put baby in direct sunlight to treat jaundice — not safe',
      'Never skip follow-up bilirubin checks — levels can rise after discharge',
      'Never assume it\'s fine because baby "seems okay" — high bilirubin can cause permanent damage silently',
    ],
  },
  {
    id: 'colic',
    name: 'Colic',
    emoji: '😭',
    tagline: 'Not a disease — but real, exhausting, and it does end',
    severity: 'monitor',
    color: '#0f766e',
    bgColor: '#f0fdfa',
    borderColor: '#99f6e4',
    summary: 'Colic is defined as crying for more than 3 hours a day, more than 3 days a week, for more than 3 weeks in an otherwise healthy baby. It typically starts around 2–3 weeks, peaks around 6 weeks, and resolves on its own by 3–4 months. There is no proven cause and no proven cure — but it is not harmful to the baby.',
    keyFacts: [
      'Affects up to 25% of all babies — it is not caused by bad parenting',
      'Typically occurs in the late afternoon or evening',
      'Baby will have a red face, clench fists, pull up knees, and cannot be soothed',
      'Colic always ends — almost always by 3 to 4 months of age',
    ],
    watchFor: [
      { label: 'Predictable evening crying, baby otherwise feeding and growing well', action: 'home' },
      { label: 'Crying pattern changing or baby seems in pain when not crying', action: 'call' },
      { label: 'Baby not gaining weight, vomiting, blood in stool', action: 'call' },
      { label: 'You feel you might hurt your baby — put baby down safely and call someone now', action: 'er' },
    ],
    quote: '"Colic is not caused by anything you did or didn\'t do. It is not a reflection of your parenting. The most important thing to know is that it ends — almost always by 3 to 4 months."',
    quoteSource: 'AAP HealthyChildren.org',
    source: 'AAP HealthyChildren.org · Mayo Clinic',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/baby/crying-colic/Pages/Colic.aspx',
    doThis: [
      'Try the "5 S\'s": Swaddle, Side/Stomach position (only while awake and held), Shush, Swing, Suck',
      'Take turns with a partner — put baby down safely and take a 10-minute break if overwhelmed',
      'White noise, gentle motion (car ride, stroller walk) often helps',
      'Call your pediatrician to rule out any medical cause if you\'re unsure',
    ],
    neverDo: [
      'Never shake a baby — ever. Put baby down safely and walk away if you feel overwhelmed',
      'Never give gripe water or gas drops without asking your pediatrician first',
      'Do not assume every cry is colic — always rule out hunger, wet diaper, and illness first',
    ],
  },
  {
    id: 'vomiting',
    name: 'Vomiting vs Spitting Up',
    emoji: '🤢',
    tagline: 'Know the difference — one is normal, one needs attention',
    severity: 'monitor',
    color: '#15803d',
    bgColor: '#f0fdf4',
    borderColor: '#bbf7d0',
    summary: 'Spitting up is normal in babies and happens in more than half of all infants in the first few months. Vomiting is forceful and different — it involves the whole stomach contracting. Knowing the difference helps you decide when to act.',
    keyFacts: [
      'Spitting up: small amounts, effortless, right after feeding — very common and harmless',
      'Vomiting: forceful, large amounts, can happen hours after feeding',
      'Projectile vomiting (shooting across the room) in a baby 2–8 weeks old could signal pyloric stenosis — see your doctor',
      'Dehydration is the biggest danger with vomiting — watch wet diapers closely',
    ],
    watchFor: [
      { label: 'Small spit-up after feeds, baby happy and gaining weight', action: 'home' },
      { label: 'Vomiting more than once, baby seems unwell or has fever', action: 'call' },
      { label: 'Fewer than 6 wet diapers in 24 hours, no tears when crying', action: 'call' },
      { label: 'Projectile vomiting at every feeding in baby 2–8 weeks old', action: 'call' },
      { label: 'Blood or green/yellow bile in vomit', action: 'er' },
      { label: 'Signs of dehydration: sunken fontanelle, no wet diapers for 8+ hours', action: 'er' },
    ],
    quote: '"Green or yellow vomit may mean there is a blockage in the intestine. This is a medical emergency. Blood in vomit is also always a reason to go to the emergency room right away."',
    quoteSource: 'AAP HealthyChildren.org',
    source: 'AAP HealthyChildren.org · Mayo Clinic',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Spitting-Up-in-Babies.aspx',
    doThis: [
      'Keep baby upright for 30 minutes after each feeding',
      'Burp baby frequently during and after feeds',
      'For vomiting: offer small amounts of liquid more frequently',
      'Count wet diapers — fewer than 6 in 24 hours means call your doctor',
    ],
    neverDo: [
      'Never give anti-nausea medication to a baby without a doctor\'s instruction',
      'Never ignore green or yellow vomit — always call or go to ER',
      'Do not lay baby flat immediately after feeding',
    ],
  },
  {
    id: 'teething',
    name: 'Teething',
    emoji: '🦷',
    tagline: 'Real discomfort — but teething does NOT cause true fever',
    severity: 'monitor',
    color: '#6d28d9',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    summary: 'Teething usually begins around 6 months and continues until about age 3. It causes real discomfort, drooling, and fussiness. But research consistently shows that teething does NOT cause a true fever above 100.4°F. If your teething baby has a real fever — look for another cause.',
    keyFacts: [
      'First teeth usually appear between 4 and 7 months',
      'Teething may cause a slight temperature rise but NOT a true fever of 100.4°F or higher',
      'Drooling can cause a mild facial rash — keep baby\'s face dry',
      'Amber teething necklaces are NOT safe — the AAP warns they are a strangulation and choking hazard',
    ],
    watchFor: [
      { label: 'Drooling, chewing on objects, mild fussiness — no fever', action: 'home' },
      { label: 'Temperature of 100.4°F or higher — this is not teething, look for another cause', action: 'call' },
      { label: 'Baby seems very unwell beyond just fussy', action: 'call' },
    ],
    quote: '"Research shows that teething may cause a slight temperature rise but does not cause a true fever of 100.4°F or higher. If your teething baby has a true fever, look for another cause."',
    quoteSource: 'Blueberry Pediatrics · AAP',
    source: 'AAP HealthyChildren.org · Mayo Clinic · Blueberry Pediatrics',
    sourceUrl: 'https://www.healthychildren.org/English/ages-stages/baby/teething-tooth-care/Pages/Teething-4-to-7-Months.aspx',
    doThis: [
      'Gently rub baby\'s gums with a clean finger',
      'Offer a chilled (not frozen) teething ring',
      'Wipe drool frequently to prevent facial rash',
      'Ask your pediatrician about infant acetaminophen for pain',
    ],
    neverDo: [
      'Never use amber teething necklaces — strangulation and choking hazard per AAP',
      'Never use benzocaine gels (like Orajel) for babies under 2 — can cause a serious blood condition',
      'Never freeze teething rings solid — too hard and can damage gums',
    ],
  },
];

const ACTION_CONFIG = {
  home: { label: 'Monitor at home', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', icon: CheckCircle },
  call: { label: 'Call your pediatrician', color: '#b45309', bg: '#fffbeb', border: '#fde68a', icon: AlertTriangle },
  er: { label: 'Go to ER / Call 911', color: '#b91c1c', bg: '#fef2f2', border: '#fecaca', icon: XCircle },
};

export default function Sickness() {
  const [selected, setSelected] = useState<Condition | null>(null);

  if (selected) {
    return (
      <div className="bg-[#faf8ff] min-h-screen pb-28">
        <header className="sticky top-0 bg-[#faf8ff] border-b border-purple-100 px-5 h-14 flex items-center gap-3 z-40 shadow-sm">
          <button onClick={() => setSelected(null)} className="p-1 rounded-full text-[#64568b] hover:bg-purple-100 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg">{selected.emoji}</span>
          <span className="font-extrabold text-[#1e1a23] text-sm">{selected.name}</span>
        </header>

        <div className="px-5 py-5 space-y-5">

          {/* Summary card */}
          <div style={{ background: selected.bgColor, borderColor: selected.borderColor }} className="border rounded-2xl p-4">
            <p className="text-xs font-bold mb-1" style={{ color: selected.color }}>What is it?</p>
            <p className="text-sm text-slate-700 leading-relaxed">{selected.summary}</p>
          </div>

          {/* Key facts */}
          <div className="bg-white border border-purple-100 rounded-2xl p-4 space-y-3">
            <p className="text-xs font-bold text-[#64568b] uppercase tracking-widest">Key facts</p>
            {selected.keyFacts.map((fact, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5 shrink-0">•</span>
                <p className="text-xs text-slate-600 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>

          {/* What to watch for — decision tree */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">What to watch for</p>
            {selected.watchFor.map((item, i) => {
              const config = ACTION_CONFIG[item.action];
              const Icon = config.icon;
              return (
                <div key={i} style={{ background: config.bg, borderColor: config.border }} className="border rounded-xl p-3 flex items-start gap-3">
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: config.color }} />
                  <div className="flex-1">
                    <p className="text-xs text-slate-700 leading-relaxed">{item.label}</p>
                    <span className="text-[10px] font-bold mt-1 inline-block" style={{ color: config.color }}>{config.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quote */}
          <div className="bg-[#f5f3ff] border-l-4 border-violet-500 rounded-r-2xl p-4">
            <p className="text-xs text-slate-600 leading-relaxed italic">"{selected.quote.replace(/^"|"$/g, '')}"</p>
            <p className="text-[10px] font-bold text-violet-600 mt-2">— {selected.quoteSource}</p>
          </div>

          {/* Do this */}
          <div className="bg-white border border-green-100 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Do this</p>
            {selected.doThis.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Never do */}
          <div className="bg-white border border-rose-100 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold text-rose-700 uppercase tracking-widest">Never do</p>
            {selected.neverDo.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Source */}
          <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between bg-white border border-violet-100 rounded-2xl p-4 hover:border-violet-300 transition">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Verified sources</p>
              <p className="text-xs font-semibold text-violet-700">{selected.source}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-violet-400" />
          </a>

          {/* Disclaimer */}
          <div className="bg-[#f5f3ff] border border-purple-100 rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 leading-relaxed text-center">
              This summary is for educational purposes only and is not medical advice. Always consult your pediatrician for your baby's specific situation.
            </p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8ff] min-h-screen pb-28">
      <header className="sticky top-0 bg-[#faf8ff] border-b border-purple-100 px-5 pt-5 pb-3 z-40 shadow-sm">
        <h1 className="font-extrabold text-lg text-[#1e1a23]">Sickness Guide</h1>
        <p className="text-xs text-slate-400 mt-0.5">Tap a condition for a clinically-verified guide</p>
      </header>

      <div className="px-5 pt-4 space-y-4">

        {/* Legend */}
        <div className="flex gap-3 flex-wrap">
          {Object.entries(ACTION_CONFIG).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <val.icon className="w-3 h-3" style={{ color: val.color }} />
              <span className="text-[10px] font-semibold" style={{ color: val.color }}>{val.label}</span>
            </div>
          ))}
        </div>

        {/* Condition cards */}
        <div className="space-y-3">
          {CONDITIONS.map((c) => {
            const worstAction = c.watchFor.find(w => w.action === 'er') ? 'er'
              : c.watchFor.find(w => w.action === 'call') ? 'call' : 'home';
            const config = ACTION_CONFIG[worstAction];
            const Icon = config.icon;

            return (
              <motion.button
                key={c.id}
                onClick={() => setSelected(c)}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border border-purple-100 rounded-2xl p-4 flex items-center gap-4 text-left hover:border-violet-300 transition"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: c.bgColor, border: `1px solid ${c.borderColor}` }}>
                  {c.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm text-[#1e1a23]">{c.name}</span>
                    <Icon className="w-3 h-3 shrink-0" style={{ color: config.color }} />
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{c.tagline}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              </motion.button>
            );
          })}
        </div>

        {/* Bottom disclaimer */}
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
          <p className="text-[11px] text-violet-700 leading-relaxed text-center">
            All summaries are based on AAP, CDC, Mayo Clinic, and children's hospital guidelines. This is for educational purposes only — always consult your pediatrician.
          </p>
        </div>
      </div>
    </div>
  );
}