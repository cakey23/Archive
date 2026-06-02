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
  // Static community feed matching mockups
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: 'Sarah M.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ykossTn4kIXYSm8flSQVJ6ngJIVLZIeXveCUOoaF4vqbWkL0qFDzgCGcaZBrHNuVOlGgyqVbZgdngbzjKpKnpOZqhhzSeskElHaad_hUUrJhCibK1XwHcAzyaCWrpFiEHC212eFebcj9_jMtFYKPclD3CvTli7wjEWJo4ZCMigie3Zl2kSP2MAuNq3UXTXHrUnHC6B6mGnlX6VjgDmfuDmBpKdODqI358yrY50jYsAKMnm76Vf19YznqDSHDSPKPEO0Jdj3YPEpV',
      timeAgo: '2h ago',
      tag: '#SleepTraining',
      title: "Finally got 6 hours of straight sleep! Here's what changed...",
      body: "After three months of waking up every 45 minutes, we finally hit a breakthrough. I wanted to share the specific routine and white noise settings that actually made a difference for our little one. It wasn't just one thing, but a combination of timing and environment...",
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
      body: "Maintaining robust iron counts is essential to offset prenatal fatigue. I pulled together some delicious spinach recipes featuring direct vegetable pairings. Here is the active breakdown of our batch bowls...",
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
      title: "To the mama who feels like she's failing today...",
      body: "Just a reminder that you are the exact mother your baby needs. Social media is a highlight reel. If you're tired, if the house is a mess, and if you're doing your best—you are winning. Take a deep breath and give yourself grace...",
      upvotes: 201,
      commentsCount: 112,
      saved: false
    }
  ]);

  // Tag filter state
  const tags = ['#AllPosts', '#NewMom', '#PregnancyDiets', '#SleepTraining', '#ToddlerTalk', '#MentalHealth'];
  const [selectedTag, setSelectedTag] = useState<string>('#AllPosts');
  const [feedMode, setFeedMode] = useState<'trending' | 'latest'>('trending');

  // Comment drawers & active write configurations
  const [commentingPost, setCommentingPost] = useState<CommunityPost | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [mockComments, setMockComments] = useState<{ [key: string]: string[] }>({
    '1': [
      "Agree so much! White noise has been our literal sleep savior.",
      "Are you using continuous brown noise or standard waves?"
    ],
    '2': [
      "That beet salad looks absolutely gorgeous! Can you post the vinaigrette recipe?",
      "Iron counts are so tough during second trig. Thanks for sharing!"
    ],
    '3': [
      "Thank you, I really needed to hear this today. 😭😭",
      "We are all in this together, Mama."
    ]
  });

  // Creator flows
  const [composeModal, setComposeModal] = useState<boolean>(false);
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostBody, setNewPostBody] = useState<string>('');
  const [newPostTag, setNewPostTag] = useState<string>('#NewMom');

  // Inside-tab notifier toast
  const [commToast, setCommToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setCommToast(msg);
    setTimeout(() => setCommToast(null), 3000);
  };

  // Upvote tally changer
  const handleVote = (id: string, dir: 'up' | 'down') => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        if (p.voted === dir) {
          // undo vote
          return {
            ...p,
            upvotes: dir === 'up' ? p.upvotes - 1 : p.upvotes + 1,
            voted: undefined
          };
        } else {
          // toggle or take vote
          let change = dir === 'up' ? 1 : -1;
          if (p.voted) change *= 2; // double if flipping from down to up
          return {
            ...p,
            upvotes: p.upvotes + change,
            voted: dir
          };
        }
      }
      return p;
    }));
  };

  // Toggle bookmarking saves
  const handleSaveToggle = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextSave = !p.saved;
        triggerToast(nextSave ? 'Post pinned to your favorites board! 📌' : 'Removed from favorites.');
        return { ...p, saved: nextSave };
      }
      return p;
    }));
  };

  // Comment writer save
  const handleAddComment = () => {
    if (!commentText.trim() || !commentingPost) return;
    const postId = commentingPost.id;
    setMockComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentText]
    }));
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, commentsCount: p.commentsCount + 1 };
      }
      return p;
    }));
    setCommentText('');
    triggerToast("Your supportive comment was posted! 💬");
  };

  // Create new post handler
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) return;
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: 'You (Mama)',
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
    triggerToast("Discussion post broadcasted to MamaHub community! 📣");
  };

  // Filter visible items
  const visiblePosts = posts.filter(p => {
    if (selectedTag === '#AllPosts') return true;
    return p.tag.toLowerCase() === selectedTag.toLowerCase();
  });

  return (
    <div id="community-view" className="bg-[#f8f9ff] min-h-screen pb-28 text-slate-900 select-none">
      
      {/* Toast elements */}
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
      <header className="w-full top-0 sticky z-40 bg-white shadow-sm flex justify-between items-center px-6 h-16 border-b border-violet-100/60">
        <div className="flex items-center gap-4">
          <img 
            alt="Mama profile avatar" 
            className="w-10 h-10 rounded-full object-cover border-2 border-violet-200" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEBMY7u8T2mdht7kH40pthZPXn5q9BDHR8WSG0N5Usj_UHHeObXtfjsJp3MZa01wPswhv3yeGlyjgnYIRELbpNy7bSe0-JZ1xnedxvfp4_HeMiEeQvhlvHLFzCkFUYNFeTe8oUIOmaBW79HNytaq4fSqNsSxtqtH1DlfAXX3vtxaknmEXmTErIRxv1OM-f-izlD-Wozs-6oE9dXGtHxh7meyHX0ponn3wkN8L5ugDdv6YNp2Qf8avaj_LV5_IRe_ogHM7wH6A4c9P7"
          />
          <span className="font-bold text-violet-700 font-extrabold select-none">MamaHub Community</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerToast("Search module unlocked on premium servers! 🔎")}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition focus:outline-none"
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => triggerToast("Everything is clear and welcoming. 🕊️")}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition focus:outline-none"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-6 space-y-6">
        
        {/* Banner header tags */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 select-none">Community Sanctuary</h2>
              <p className="text-xs text-slate-500 mt-0.5">Uniting caretakers with radical calm and supportive dignity.</p>
            </div>
            
            {/* Trending/Latest caps switcher */}
            <div className="flex bg-[#e3e1ed]/50 p-1 rounded-full text-[10px] font-bold">
              <button 
                id="tab-trending"
                onClick={() => setFeedMode('trending')}
                className={`px-4 py-2 rounded-full transition-colors ${feedMode === 'trending' ? 'bg-violet-600 text-white shadow-sm' : 'text-[#4a4455]'}`}
              >
                Trending
              </button>
              <button 
                id="tab-latest"
                onClick={() => setFeedMode('latest')}
                className={`px-4 py-2 rounded-full transition-colors ${feedMode === 'latest' ? 'bg-violet-600 text-white shadow-sm' : 'text-[#4a4455]'}`}
              >
                Latest
              </button>
            </div>
          </div>

          {/* Horizontal category slider chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="horizontal-chips-scroller">
            {tags.map((t) => {
              const acts = selectedTag === t;
              return (
                <button
                  key={t}
                  id={`chip-tag-${t.replace('#', '')}`}
                  onClick={() => setSelectedTag(t)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    acts 
                      ? 'bg-violet-600 text-white shadow-sm' 
                      : 'bg-[#e3e1ed]/30 text-violet-700 hover:bg-violet-50'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>

        {/* Discussions posts list */}
        <section className="space-y-5" id="discussions-feed">
          {visiblePosts.map((p) => {
            const hasUpvoted = p.voted === 'up';
            const hasDownvoted = p.voted === 'down';

            return (
              <article 
                key={p.id}
                id={`post-card-${p.id}`}
                className="bg-white p-5 rounded-2xl border border-violet-100/50 shadow-sm transition hover:shadow-md"
              >
                <div className="flex gap-3">
                  
                  {/* Upvoter button left strip (mimicking user mockup) */}
                  <div className="flex flex-col items-center justify-start gap-1 bg-slate-50 rounded-full py-2 px-1 w-8 h-fit self-start">
                    <button 
                      onClick={() => handleVote(p.id, 'up')}
                      className={`p-1 rounded-full transition-colors ${hasUpvoted ? 'text-violet-700 bg-violet-50 scale-105' : 'text-slate-400 hover:text-violet-600'}`}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-700">{p.upvotes}</span>
                    <button 
                      onClick={() => handleVote(p.id, 'down')}
                      className={`p-1 rounded-full transition-colors ${hasDownvoted ? 'text-rose-600 bg-rose-50 scale-105' : 'text-slate-400 hover:text-rose-500'}`}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Details container */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 text-[11px]">
                      <img 
                        src={p.avatar} 
                        alt="Author avatar" 
                        className="w-5 h-5 rounded-full object-cover border"
                      />
                      <span className="font-extrabold text-[#121c28]">{p.author}</span>
                      <span className="text-slate-400">• {p.timeAgo} in</span>
                      <span className="font-extrabold text-violet-700">{p.tag}</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-800 leading-snug mb-2 pr-1 line-clamp-2">
                      {p.title}
                    </h3>
                    
                    {p.image && (
                      <div className="rounded-xl overflow-hidden aspect-[16/9] bg-violet-50 mb-3 border border-violet-100">
                        <img 
                          src={p.image} 
                          alt="Post decorative meal" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {p.body}
                    </p>

                    {/* Action buttons list bar */}
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <button 
                        onClick={() => setCommentingPost(p)}
                        className="flex items-center gap-1.5 hover:text-violet-700 transition"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{p.commentsCount} Comments</span>
                      </button>
                      <button 
                        onClick={() => handleSaveToggle(p.id)}
                        className={`flex items-center gap-1.5 hover:text-violet-700 transition ${p.saved ? 'text-violet-700' : ''}`}
                      >
                        <Bookmark className={`w-4 h-4 ${p.saved ? 'fill-violet-300 text-violet-700' : ''}`} />
                        <span>{p.saved ? 'Saved' : 'Save'}</span>
                      </button>
                      <button 
                        className="flex items-center gap-1.5 hover:text-violet-700 transition"
                        onClick={() => triggerToast("Link copied to clipboard! Share with other mamas. 🔗")}
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

      {/* Write custom post FLOATING CIRCLE button */}
      <button 
        id="btn-compose-query"
        onClick={() => setComposeModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-violet-700 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition z-40 cursor-pointer border border-violet-500 group"
      >
        <PenTool className="w-6 h-6" />
      </button>

      {/* Comments Drawer overlay modal */}
      <AnimatePresence>
        {commentingPost && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              className="bg-white p-6 rounded-t-[2.5rem] max-w-md w-full relative space-y-4 shadow-2xl h-[70vh] flex flex-col justify-between border-t border-violet-100"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-[#121c28]">Comments board</h4>
                  <p className="text-[10px] text-slate-400 tracking-tight line-clamp-1">on: {commentingPost.title}</p>
                </div>
                <button 
                  id="btn-close-comments"
                  className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                  onClick={() => setCommentingPost(null)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comments Feed Area */}
              <div className="flex-grow overflow-y-auto space-y-3 py-2 text-xs">
                {(mockComments[commentingPost.id] || []).length > 0 ? (
                  (mockComments[commentingPost.id] || []).map((c, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                      <div className="flex justify-between font-bold text-slate-700 text-[10px]">
                        <span>Caring Mama</span>
                        <span className="font-light">Just now</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{c}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-1">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                    <p>Be the first to share support and advice!</p>
                  </div>
                )}
              </div>

              {/* Compose comment input row */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <input
                  id="input-comment-box"
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Type a supportive mama response..."
                  className="flex-grow h-12 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-4 text-xs focus:ring-1 focus:ring-violet-600 focus:outline-none"
                />
                <button 
                  id="btn-submit-comment"
                  onClick={handleAddComment}
                  className="w-12 h-12 rounded-xl bg-violet-700 hover:bg-violet-800 text-white flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Compose discussion post overlay */}
      <AnimatePresence>
        {composeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/35 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-7 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl relative border border-violet-100"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-[#121c28]">Spark a Discussion</h3>
                <button 
                  id="btn-close-composer"
                  onClick={() => setComposeModal(false)}
                  className="p-1 rounded-full text-slate-500 hover:bg-slate-150"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-violet-700 uppercase tracking-wide">Category Circle</label>
                  <select 
                    id="select-post-tag"
                    value={newPostTag}
                    onChange={(e) => setNewPostTag(e.target.value)}
                    className="w-full h-11 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-3 outline-none"
                  >
                    <option value="#NewMom">#NewMom</option>
                    <option value="#PregnancyDiets">#PregnancyDiets</option>
                    <option value="#SleepTraining">#SleepTraining</option>
                    <option value="#ToddlerTalk">#ToddlerTalk</option>
                    <option value="#MentalHealth">#MentalHealth</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-violet-700 uppercase tracking-wide">Headline Question</label>
                  <input 
                    id="input-post-title"
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="E.g., Any advice on sleep regressions?"
                    className="w-full h-11 bg-[#e5eeff]/40 border border-violet-100 rounded-xl px-3 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-violet-700 uppercase tracking-wide">Details</label>
                  <textarea 
                    id="textarea-post-body"
                    rows={4}
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                    placeholder="Describe your situation or context..."
                    className="w-full bg-[#e5eeff]/40 border border-violet-100 rounded-xl p-3 outline-none resize-none"
                  />
                </div>
              </div>

              <button 
                id="btn-broadcaster"
                disabled={!newPostTitle.trim() || !newPostBody.trim()}
                onClick={handleCreatePost}
                className={`w-full py-3.5 font-bold rounded-xl text-xs flex justify-center items-center gap-1 shadow-md ${
                  newPostTitle.trim() && newPostBody.trim() 
                    ? 'bg-violet-700 text-white hover:bg-violet-800' 
                    : 'bg-slate-200 text-slate-400 pointer-events-none'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
