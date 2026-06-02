import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ExternalLink, X, BookOpen, ShieldAlert, Utensils, Baby, Heart } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  source: string;
  category: 'emergency' | 'feeding' | 'development' | 'health' | 'sleep';
  description: string;
  url: string;
  readTime: string;
  tag: string;
}

const ARTICLES: Article[] = [
  { id: '1', title: 'Choking Prevention and Rescue Measures', source: 'HealthyChildren.org (AAP)', category: 'emergency', description: 'The American Academy of Pediatrics guide on how to prevent choking and what to do when a child is choking — including the updated 2025 back blow and chest thrust technique for infants.', url: 'https://www.healthychildren.org/English/health-issues/injuries-emergencies/Pages/Choking-Prevention-and-Rescue-Measures.aspx', readTime: '5 min', tag: 'Emergency' },
  { id: '2', title: '2025 AHA/AAP Updated CPR Guidelines for Infants and Children', source: 'HealthyChildren.org (AAP)', category: 'emergency', description: 'The AAP explains the first major CPR update since 2020 — covering new infant compression techniques, updated choking response, and why these changes matter for parents.', url: 'https://www.healthychildren.org/English/news/Pages/AHA-and-AAP-release-update-CPR-guidelines-to-help-save-young-lives.aspx', readTime: '6 min', tag: 'Emergency' },
  { id: '3', title: 'Fever in Newborns: When to Go to the ER', source: 'HealthyChildren.org (AAP)', category: 'emergency', description: 'AAP guidance on fever in newborns — why any temperature of 100.4°F or higher in a baby under 3 months is always a medical emergency, and what to do.', url: 'https://www.healthychildren.org/English/news/Pages/Fever-in-Newborns.aspx', readTime: '4 min', tag: 'Emergency' },
  { id: '4', title: 'Safe Sleep: Reducing the Risk of SIDS', source: 'HealthyChildren.org (AAP)', category: 'emergency', description: 'The AAP\'s official safe sleep guidelines — back sleeping, firm flat surface, no loose bedding, room sharing vs bed sharing, and why each rule matters for your baby.', url: 'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/A-Parents-Guide-to-Safe-Sleep.aspx', readTime: '7 min', tag: 'Emergency' },
  { id: '5', title: 'Breastfeeding: Getting Started', source: 'HealthyChildren.org (AAP)', category: 'feeding', description: 'The AAP recommends exclusive breastfeeding for about 6 months. This guide covers how to latch, how often to feed, how to know if your baby is getting enough, and common challenges.', url: 'https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/default.aspx', readTime: '8 min', tag: 'Feeding' },
  { id: '6', title: 'Starting Solid Foods: When and How', source: 'HealthyChildren.org (AAP)', category: 'feeding', description: 'AAP guidance on introducing solid foods around 6 months — signs of readiness, what foods to start with, what to avoid, and how to introduce potential allergens safely.', url: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx', readTime: '6 min', tag: 'Feeding' },
  { id: '7', title: 'Vitamin D and Iron Supplements for Infants', source: 'HealthyChildren.org (AAP)', category: 'feeding', description: 'Why breastfed babies need 400 IU of Vitamin D daily from birth, and when iron supplementation is needed. The AAP\'s official recommendations explained simply.', url: 'https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Vitamin-Iron-Supplements.aspx', readTime: '4 min', tag: 'Feeding' },
  { id: '8', title: 'Prenatal Nutrition: What to Eat During Pregnancy', source: 'Mayo Clinic', category: 'feeding', description: 'A comprehensive guide to prenatal nutrition from Mayo Clinic — covering folic acid, iron, calcium, DHA, what foods to avoid, and how to manage pregnancy nausea while eating well.', url: 'https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/pregnancy-nutrition/art-20045082', readTime: '9 min', tag: 'Pregnancy' },
  { id: '9', title: 'Foods to Avoid During Pregnancy', source: 'CDC', category: 'feeding', description: 'The CDC\'s guide to foods that are unsafe during pregnancy — raw fish, high-mercury fish, unpasteurized products, deli meats, and why they pose risks to your baby.', url: 'https://www.cdc.gov/foodsafety/foods-linked-illness.html', readTime: '5 min', tag: 'Pregnancy' },
  { id: '10', title: 'Developmental Milestones: Birth to 12 Months', source: 'CDC — Learn the Signs. Act Early.', category: 'development', description: 'The CDC\'s official milestone checklist for the first year — what babies should be doing at 2, 4, 6, 9, and 12 months, and when to talk to your pediatrician.', url: 'https://www.cdc.gov/ncbddd/actearly/milestones/index.html', readTime: '7 min', tag: 'Development' },
  { id: '11', title: 'Tummy Time: Why It Matters and How to Do It', source: 'HealthyChildren.org (AAP)', category: 'development', description: 'The AAP explains why tummy time is essential for building neck and shoulder strength, preventing flat head syndrome, and how to make it safe and enjoyable from day one.', url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/The-Importance-of-Tummy-Time.aspx', readTime: '4 min', tag: 'Development' },
  { id: '12', title: 'How to Interact and Talk to Your Newborn', source: 'HealthyChildren.org (AAP)', category: 'development', description: 'How talking, reading, and singing to your baby from birth builds language skills and emotional connection — with practical tips from the AAP for the first months.', url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/Communicating-With-Your-Baby.aspx', readTime: '5 min', tag: 'Development' },
  { id: '13', title: 'Newborn Jaundice: What Parents Need to Know', source: 'HealthyChildren.org (AAP)', category: 'health', description: 'Why jaundice is common in newborns, how to tell if the yellow tint is normal or dangerous, when to seek treatment, and what phototherapy involves.', url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/Jaundice.aspx', readTime: '5 min', tag: 'Health' },
  { id: '14', title: 'RSV in Infants: Signs, Risks, and When to Seek Care', source: 'CDC', category: 'health', description: 'RSV is the leading cause of hospitalization in infants under 1. The CDC explains what RSV is, why it is especially dangerous under 6 months, warning signs, and prevention.', url: 'https://www.cdc.gov/rsv/index.html', readTime: '6 min', tag: 'Health' },
  { id: '15', title: 'When to Call the Pediatrician for a Sick Baby', source: 'Mayo Clinic', category: 'health', description: 'Mayo Clinic\'s practical guide on when a sick baby needs a same-day call, when to go to the ER, and which symptoms in a newborn are always emergencies.', url: 'https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20047793', readTime: '5 min', tag: 'Health' },
  { id: '16', title: 'Postpartum Depression: What New Mothers Need to Know', source: 'CDC', category: 'health', description: 'The CDC explains postpartum depression — how it differs from baby blues, symptoms to watch for, how common it is, and where to get help. Your mental health matters too.', url: 'https://www.cdc.gov/reproductivehealth/depression/index.htm', readTime: '6 min', tag: 'Mental Health' },
  { id: '17', title: 'How Much Sleep Does My Baby Need?', source: 'HealthyChildren.org (AAP)', category: 'sleep', description: 'AAP sleep recommendations by age — from newborns (14–17 hours) to 12-month-olds — and how to tell if your baby is getting enough rest.', url: 'https://www.healthychildren.org/English/healthy-living/sleep/Pages/healthy-sleep-habits-how-many-hours-does-your-child-need.aspx', readTime: '4 min', tag: 'Sleep' },
  { id: '18', title: 'The 4-Month Sleep Regression: What\'s Happening and What to Do', source: 'HealthyChildren.org (AAP)', category: 'sleep', description: 'Why the 4-month regression is real, what\'s happening in your baby\'s brain, and evidence-based strategies for helping everyone get more sleep.', url: 'https://www.healthychildren.org/English/healthy-living/sleep/Pages/default.aspx', readTime: '5 min', tag: 'Sleep' },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'emergency', label: 'Emergency', icon: ShieldAlert },
  { id: 'feeding', label: 'Feeding', icon: Utensils },
  { id: 'development', label: 'Development', icon: Baby },
  { id: 'health', label: 'Health', icon: Heart },
  { id: 'sleep', label: 'Sleep', icon: BookOpen },
];

const TAG_COLORS: Record<string, string> = {
  Emergency: 'bg-rose-50 text-rose-700 border-rose-100',
  Feeding: 'bg-green-50 text-green-700 border-green-100',
  Pregnancy: 'bg-pink-50 text-pink-700 border-pink-100',
  Development: 'bg-blue-50 text-blue-700 border-blue-100',
  Health: 'bg-amber-50 text-amber-700 border-amber-100',
  Sleep: 'bg-purple-50 text-purple-700 border-purple-100',
  'Mental Health': 'bg-teal-50 text-teal-700 border-teal-100',
};

const SOURCE_COLORS: Record<string, string> = {
  'HealthyChildren.org (AAP)': 'text-violet-600',
  'Mayo Clinic': 'text-blue-600',
  'CDC': 'text-green-600',
  'CDC — Learn the Signs. Act Early.': 'text-green-600',
};

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    return ARTICLES.filter(a => {
      const matchesCategory = activeCategory === 'all' || a.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const suggestions = ['choking', 'fever', 'breastfeeding', 'sleep', 'milestones', 'CPR', 'solid foods', 'jaundice'];

  return (
    <div className="bg-[#faf8ff] min-h-screen pb-28 text-slate-900">

      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-violet-100 px-6 pt-5 pb-3 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-extrabold text-lg text-slate-900">Resource Library</h1>
            <p className="text-xs text-slate-400">AAP, CDC & Mayo Clinic — verified sources only</p>
          </div>
          <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-violet-700" />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search — e.g. fever, sleep, CPR, breastfeeding..."
            className="w-full h-11 bg-violet-50 border border-violet-100 rounded-xl pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <div className="px-6 pt-5 space-y-5 max-w-md mx-auto">

        {!searchQuery && (
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick searches</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => setSearchQuery(s)}
                  className="px-3 py-1.5 bg-white border border-violet-100 rounded-full text-xs font-medium text-violet-700 hover:bg-violet-50 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${
                activeCategory === cat.id
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-white text-slate-500 border-violet-100 hover:bg-violet-50'
              }`}
            >
              <cat.icon className="w-3 h-3" />
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400">
          {filtered.length} article{filtered.length !== 1 ? 's' : ''}{searchQuery ? ` for "${searchQuery}"` : ''}
        </p>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold text-sm">No articles found</p>
              <p className="text-xs mt-1">Try a different search term</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-4 text-violet-600 text-xs font-bold underline">
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-3 pb-4">
              {filtered.map((article, i) => (
                <motion.a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="block bg-white border border-violet-100 rounded-2xl p-4 hover:border-violet-300 hover:shadow-sm transition active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${TAG_COLORS[article.tag] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                      {article.tag}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 shrink-0">
                      <span className="text-[10px]">{article.readTime} read</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug mb-1.5">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-2">
                    {article.description}
                  </p>

                  <p className={`text-[11px] font-bold ${SOURCE_COLORS[article.source] || 'text-slate-400'}`}>
                    {article.source}
                  </p>
                </motion.a>
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mt-2 mb-6">
          <p className="text-[11px] text-violet-700 leading-relaxed">
            <span className="font-bold">All articles link to original sources</span> — HealthyChildren.org (AAP), the CDC, and Mayo Clinic. MamaHub does not modify medical content. Always consult your pediatrician for personal advice.
          </p>
        </div>
      </div>
    </div>
  );
}