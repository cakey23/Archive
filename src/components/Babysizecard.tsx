import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { calcPregnancyWeek, getWeekData } from '../courseData';

interface BabySizeCardProps {
  profile: UserProfile;
  compact?: boolean;
}

export default function BabySizeCard({ profile, compact = false }: BabySizeCardProps) {
  if (profile.stage !== 'pregnant' || !profile.dueDate) return null;

  const week    = calcPregnancyWeek(profile.dueDate);
  const data    = getWeekData(week);
  if (!data) return null;

  const dueDate  = new Date(profile.dueDate);
  const today    = new Date();
  const daysLeft = Math.max(0, Math.round((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)));
  const weeksLeft= Math.floor(daysLeft / 7);
  const trimester = week <= 13 ? '1st' : week <= 26 ? '2nd' : '3rd';

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden"
      >
        {/* Background blob */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -mr-10 -mt-10"/>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-8 -mb-8"/>

        <div className="relative z-10 flex items-center gap-4">
          {/* Big emoji */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl shrink-0">
            {data.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mb-0.5">
              Week {week} · {trimester} Trimester
            </p>
            <h3 className="font-extrabold text-base leading-tight">Baby is the size of a</h3>
            <p className="font-extrabold text-xl leading-tight text-white">{data.sizeName}</p>
            <p className="text-white/80 text-[11px] mt-1">
              {data.lengthCm >= 1 ? `~${data.lengthCm} cm` : 'tiny!'}
              {data.weightG >= 1 ? ` · ~${data.weightG}g` : ''}
              {' · '}
              {weeksLeft > 0 ? `${weeksLeft}w to go` : 'Due any day!'}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-violet-100 shadow-sm overflow-hidden"
    >
      {/* Gradient header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 pt-5 pb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12"/>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-5xl shrink-0">
            {data.emoji}
          </div>
          <div>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">
              Week {week} · {trimester} Trimester
            </p>
            <h3 className="font-extrabold text-lg text-white leading-tight mt-0.5">
              Baby is the size of a
            </h3>
            <p className="font-extrabold text-2xl text-white leading-tight">{data.sizeName}</p>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        {[
          { label: 'Length', value: data.lengthCm >= 1 ? `${data.lengthCm} cm` : '< 1 cm' },
          { label: 'Weight', value: data.weightG >= 1 ? `~${data.weightG}g` : '< 1g' },
          { label: 'Days left', value: daysLeft > 0 ? `${daysLeft}` : '🎉' },
        ].map(({ label, value }) => (
          <div key={label} className="py-3 text-center">
            <p className="text-xs font-extrabold text-slate-800">{value}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Development note */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-600 mb-1">This week</p>
          <p className="text-xs text-slate-600 leading-relaxed">{data.developmentNote}</p>
        </div>
        <div className="bg-violet-50 rounded-2xl px-4 py-3 border border-violet-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-0.5">Fun fact</p>
          <p className="text-xs text-slate-600 leading-relaxed">{data.funFact}</p>
        </div>
      </div>
    </motion.div>
  );
}