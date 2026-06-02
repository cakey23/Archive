import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  ArrowDown, 
  MessageSquare, 
  Share2, 
  Heart, 
  Plus, 
  Search, 
  Bell, 
  Sparkles, 
  X, 
  Send,
  PenTool,
  Bookmark
} from 'lucide-react';
import { CommunityPost } from '../types';

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: 'Sarah M.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ykossTn4kIXYSm8flSQVJ6ngJIVLZIeXveCUOoaF4vqbWkL0qFDzgCGcaZBrHNuVOlGgyqVbZgdngbzjKpKnpOZqhhzSeskElHaad_hUUrJhCibK1XwHcAzyaCWrpFiEHC212eFebcj9_jMtFYKPclD3CvTli7wjEWJo4ZCMigie3Zl2kSP2MAuNq3UXTXHrUnHC6B6mGnlX6VjgDmfuDmBpKdODqI358yrY50jYsAKMnm76Vf19YznqDSHDSPKPEO0Jdj3YPEpV',
      timeAgo: '2h ago',
      tag: '#SleepTraining',
      title: "We finally got 6 hours of straight sleep — here's exactly what changed",
      body: "After three months of waking up every 45 minutes, we hit a breakthrough this week. I wanted to share the specific routine and white noise settings that actually worked for our little one. It wasn't just one thing, but a combination of consistent timing, room temperature (68°F!), and a specific wind-down window. Happy to share more details in the comments.",
      upvotes: 142,
      commentsCount: 24,
      saved: false
    },
    {
      id: '2',
      author: 'Elena_Joy',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3yVtgS2UbgqLdRgfPjfdrz4d6Eu7N1WzLQJggBN5BnsCW6hokbVKx7XS8-ABh7Y86XwgKZ7bErMVkq44SFx7R_zmxoIY4P4opS98FXI-UQfYkDVfRsKJ-r3P5m4p6CG3W3sM6TtCkAg5j1mMdOPpwBiezcBhB36uWquMfA9uOY36iV49EWUKZjt511k_RCaQIU28QRAxaegYHZIbazf6clE8Ef2IJZARrQ7Q0R3Cx4gIlYukplmpFKzWnRtkMDX9Xk0MosjGxvWwN',
      timeAgo: '5h ago',
      tag: '#PregnancyDiets',
      title: "Best iron-rich meal prep ideas for the second trimester?",
      body: "My OB flagged low iron at my 20-week check. I've been trying to eat more spinach but it's hard to make it appetizing every day. Has anyone found recipes or batch-cook ideas that are actually delicious? Would love a community list we can all contribute to!",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwnMPOkRb1F0q0YOzTMa4WtUZflsMTI7KKteMiBq_VpccdvNP8BGDECarE3B0knkIzc-duqFlEqQiR6l3P5wVdc5TDWnpsmbNoe7joXq9t05toaAoVaWTawUGCaVJoNBepDNtlzrKOm4pAJesBFQVt48kePxAP36SsNdIL1vvzYLfJXCmWx_WkChqH2TqR6k7jyp2lRa78YYR3Y_eXiyWyYgAv3XPidaiYuWMJ9rVHS-a9sqDSyJv4xuKqkDnJwTglUtpFDcjkD5mM',
      upvotes: 89,
      commentsCount: 56,
      saved: true
    },
    {
      id: '3',
      author: 'MamaBear92',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsZGxYJrBeu2zt5Zklrs04LpaizKYlcFk1CdMtGR0zEBJj-_vFmvhNIwAo-ADvQGqUFwHaBvKtBvoT_z6_Pa4PIJ6SSZ3_uelBROGszPAybhCYmBs0enirzFOSdhCzLYKjGs_KIsdKs0uz7I4D2T5vgHAlGnL3H5EKl0AauCGY3Hn5N9Y5i8Xde0Ko2ztmtH5rbuTTeGKdsenxiT56BCgmJiaAle-M7Xqo46mL3S02Emiwib6S3MZJbRxuMpZ9_HYdZ9jV8taH-13n',
      timeAgo: '8h ago',
      tag: '#NewMom',
      title: "To the mama who feels like she's failing today — you are not",
      body: "Just a reminder that you are the exact mother your baby needs. Social media is a highlight reel. If you're tired, if the house is a mess, if you're eating cold food again — and you're still showing up for your baby — you are winning. Take a deep breath and give yourself grace today. We see you. 💜",
      upvotes: 201,
      commentsCount: 112,
      saved: false
    },
    {
      id: '4',
      author: 'Priya_K',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ykossTn4kIXYSm8flSQVJ6ngJIVLZIeXveCUOoaF4vqbWkL0qFDzgCGcaZBrHNuVOlGgyqVbZgdngbzjKpKnpOZqhhzSeskElHaad_hUUrJhCibK1XwHcAzyaCWrpFiEHC212eFebcj9_jMtFYKPclD3CvTli7wjEWJo4ZCMigie3Zl2kSP2MAuNq3UXTXHrUnHC6B6mGnlX6VjgDmfuDmBpKdODqI358yrY50jYsAKMnm76Vf19YznqDSHDSPKPEO0Jdj3YPEpV',
      timeAgo: '1d ago',
      tag: '#MentalHealth',
      title: "Postpartum anxiety is real — this is what helped me",
      body: "No one told me I could feel so anxious after giving birth when I'd wanted this so badly. I want to share 3 things that genuinely helped me — talking to my OB honestly, a postpartum therapist referral through insurance, and honestly, this community. You don't have to white-knuckle through it alone.",
      upvotes: 178,
      commentsCount: 67,
      saved: false
    }
  ]);

  const tags = ['#AllPosts', '#NewMom', '#PregnancyDiets', '#SleepTraining', '#ToddlerTalk', '#MentalHealth'];
  const [selectedTag, setSelectedTag] = useState<string>('#AllPosts');
  const [feedMode, setFeedMode] = useState<'trending' | 'latest'>('trending');

  const [commentingPost, setCommentingPost] = useState<CommunityPost | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [mockComments, setMockComments] = useState<{ [key: string]: string[] }>({
    '1': [
      "White noise has been our literal sleep savior too!",
      "The 68°F tip is real — we finally cracked it by turning the AC down."
    ],
    '2': [
      "Lentil soup with spinach is surprisingly good — my OB approved it!",
      "Iron counts are so tough in second tri. Thanks for starting this thread."
    ],
    '3': [
      "Thank you, I really needed to hear this today 😭",
      "We are all in this together, Mama. You're doing amazing."
    ],
    '4': [
      "Thank you for saying this out loud. PPD & PPA are so under-discussed.",
      "Your courage in sharing this is helping so many of us."
    ]
  });

  const [composeModal, setComposeModal] = useState<boolean>(false);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostBody, setNewPostBody] = useState<string>('');
  const [newPostTag, setNewPostTag] = useState<string>('#NewMom');
  const [commToast, setCommToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setCommToast(msg);
    setTimeout(() => setCommToast(null), 3000);
  };

  const handleVote = (id: string, dir: 'up' | 'down') => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        if (p.voted === dir) {
          return { ...p, upvotes: dir === 'up' ? p.upvotes - 1 : p.upvotes + 1, voted: undefined };
        } else {
          let change = dir === 'up' ? 1 : -1;
          if (p.voted) change *= 2;
          return { ...p, upvotes: p.upvotes + change, voted: dir };
        }
      }
      return p;
    }));
  };

  const handleSaveToggle = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextSave = !p.saved;
        triggerToast(nextSave ? 'Saved to your favorites! 📌' : 'Removed from favorites.');
        return { ...p, saved: nextSave };
      }
      return p;
    }));
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !commentingPost) return;
    const postId = commentingPost.id;
    setMockComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), commentText] }));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p));
    setCommentText('');
    triggerToast("Comment posted! 💬");
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) return;
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7',
      timeAgo: 'Just now',
      tag: newPostTag,
      title: newPostTitle,
      body: newPostBody,
      upvotes: 1,
      commentsCount: 0,
      voted: 'up'
    };
    setPosts([newPost, ...posts]);
    setComposeModal(false);
    setNewPostTitle('');
    setNewPostBody('');
    triggerToast("Your post is live in the community! 📣");
  };

  const visiblePosts = posts.filter(p => {
    if (selectedTag === '#AllPosts') return true;
    return p.tag.toLowerCase() === selectedTag.toLowerCase();
  });

  return (
    <div id="community-view" className="bg-[#faf8ff] min-h-screen pb-28 text-slate-900 select-none">
      
      <AnimatePresence>
        {commToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-6 py-3.5 rounded-full z-50 shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{commToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="w-full top-0 sticky z-40 bg-white/95 backdrop-blur shadow-sm flex justify-between items-center px-6 h-16 border-b border-violet-100/60">
        <div className="flex items-center gap-3">
          <img 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover border-2 border-violet-200" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7"
          />
          <span className="font-bold text-violet-700">MamaHub Community</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => triggerToast("Search coming soon! 🔎")} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => triggerToast("No new notifications 🕊️")} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-6 space-y-6">
        
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">For Mamas, By Mamas</h2>
              <p className="text-xs text-slate-500 mt-0.5">A warm, supportive space for every stage of the journey.</p>
            </div>
            <div className="flex bg-violet-50 p-1 rounded-full text-[10px] font-bold">
              <button 
                onClick={() => setFeedMode('trending')}
                className={`px-3 py-1.5 rounded-full transition-colors ${feedMode === 'trending' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500'}`}
              >
                Trending
              </button>
              <button 
                onClick={() => setFeedMode('latest')}
                className={`px-3 py-1.5 rounded-full transition-colors ${feedMode === 'latest' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500'}`}
              >
                Latest
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {tags.map((t) => {
              const active = selectedTag === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedTag(t)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    active 
                      ? 'bg-violet-600 text-white shadow-sm' 
                      : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          {visiblePosts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="text-4xl">🌸</div>
              <p className="text-slate-500 text-sm font-medium">No posts in this category yet.</p>
              <p className="text-slate-400 text-xs">Be the first to start the conversation!</p>
            </div>
          ) : visiblePosts.map((p) => {
            const hasUpvoted = p.voted === 'up';
            const hasDownvoted = p.voted === 'down';

            return (
              <article 
                key={p.id}
                className="bg-white p-5 rounded-2xl border border-violet-100/50 shadow-sm hover:shadow-md transition"
              >
                <div className="flex gap-3">
                  {/* Vote strip */}
                  <div className="flex flex-col items-center justify-start gap-1 bg-violet-50 rounded-2xl py-2 px-1 w-9 h-fit self-start">
                    <button 
                      onClick={() => handleVote(p.id, 'up')}
                      className={`p-1 rounded-full transition-colors ${hasUpvoted ? 'text-violet-700' : 'text-slate-400 hover:text-violet-600'}`}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-700">{p.upvotes}</span>
                    <button 
                      onClick={() => handleVote(p.id, 'down')}
                      className={`p-1 rounded-full transition-colors ${hasDownvoted ? 'text-rose-600' : 'text-slate-400 hover:text-rose-500'}`}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 text-[11px]">
                      <img src={p.avatar} alt={p.author} className="w-5 h-5 rounded-full object-cover border" />
                      <span className="font-extrabold text-slate-800">{p.author}</span>
                      <span className="text-slate-400">· {p.timeAgo}</span>
                      <span className="font-bold text-violet-600">{p.tag}</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-800 leading-snug mb-2 line-clamp-2">
                      {p.title}
                    </h3>
                    
                    {p.image && (
                      <div className="rounded-xl overflow-hidden aspect-[16/9] bg-violet-50 mb-3 border border-violet-100">
                        <img src={p.image} alt="Post image" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                      {p.body}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                      <button 
                        onClick={() => setCommentingPost(p)}
                        className="flex items-center gap-1.5 hover:text-violet-700 transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{p.commentsCount}</span>
                      </button>
                      <button 
                        onClick={() => handleSaveToggle(p.id)}
                        className={`flex items-center gap-1.5 hover:text-violet-700 transition ${p.saved ? 'text-violet-700' : ''}`}
                      >
                        <Bookmark className={`w-4 h-4 ${p.saved ? 'fill-violet-200 text-violet-700' : ''}`} />
                        <span>{p.saved ? 'Saved' : 'Save'}</span>
                      </button>
                      <button 
                        className="flex items-center gap-1.5 hover:text-violet-700 transition"
                        onClick={() => triggerToast("Link copied! 🔗")}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      {/* Compose FAB */}
      <button 
        onClick={() => setComposeModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-violet-700 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition z-40"
      >
        <PenTool className="w-6 h-6" />
      </button>

      {/* Comments drawer */}
      <AnimatePresence>
        {commentingPost && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              className="bg-white rounded-t-3xl max-w-md w-full h-[70vh] flex flex-col shadow-2xl border-t border-violet-100"
            >
              <div className="flex justify-between items-center px-6 pt-5 pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Comments</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{commentingPost.title}</p>
                </div>
                <button onClick={() => setCommentingPost(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto px-6 py-4 space-y-3 text-xs">
                {(mockComments[commentingPost.id] || []).length > 0 ? (
                  (mockComments[commentingPost.id] || []).map((c, i) => (
                    <div key={i} className="p-3.5 bg-violet-50 rounded-xl space-y-1">
                      <div className="flex justify-between font-bold text-slate-600 text-[10px]">
                        <span>Community Mama</span>
                        <span className="font-normal text-slate-400">just now</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{c}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                    <p className="text-sm font-medium">Be the first to share support!</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 px-6 py-4 border-t border-slate-100">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write something kind..."
                  className="flex-grow h-11 bg-violet-50 border border-violet-100 rounded-xl px-4 text-xs focus:ring-2 focus:ring-violet-400 focus:outline-none"
                />
                <button 
                  onClick={handleAddComment}
                  className="w-11 h-11 rounded-xl bg-violet-700 hover:bg-violet-800 text-white flex items-center justify-center shrink-0 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Compose post modal */}
      <AnimatePresence>
        {composeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/35 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-7 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl border border-violet-100"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900">Start a Discussion</h3>
                <button onClick={() => setComposeModal(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-violet-700 uppercase tracking-wide">Topic</label>
                  <select 
                    value={newPostTag}
                    onChange={(e) => setNewPostTag(e.target.value)}
                    className="w-full h-11 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                  >
                    <option value="#NewMom">#NewMom</option>
                    <option value="#PregnancyDiets">#PregnancyDiets</option>
                    <option value="#SleepTraining">#SleepTraining</option>
                    <option value="#ToddlerTalk">#ToddlerTalk</option>
                    <option value="#MentalHealth">#MentalHealth</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-violet-700 uppercase tracking-wide">Title</label>
                  <input 
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="E.g., Any advice on sleep regressions?"
                    className="w-full h-11 bg-violet-50 border border-violet-100 rounded-xl px-3 text-sm outline-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-violet-700 uppercase tracking-wide">Your Story</label>
                  <textarea 
                    rows={4}
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                    placeholder="Share what's on your mind — this is a safe space."
                    className="w-full bg-violet-50 border border-violet-100 rounded-xl p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-violet-400"
                  />
                </div>
              </div>

              <button 
                disabled={!newPostTitle.trim() || !newPostBody.trim()}
                onClick={handleCreatePost}
                className={`w-full py-3.5 font-bold rounded-xl text-sm flex justify-center items-center gap-2 shadow-md transition ${
                  newPostTitle.trim() && newPostBody.trim() 
                    ? 'bg-violet-700 text-white hover:bg-violet-800' 
                    : 'bg-slate-100 text-slate-400 pointer-events-none'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Post to Community</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}