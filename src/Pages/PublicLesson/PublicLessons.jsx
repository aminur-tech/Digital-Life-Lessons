import React, { useEffect, useState, useMemo } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { Lock, Search, Filter, BookOpen, Crown, ChevronUp, Sparkles } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import PublicLessonsSkeleton from "../../Component/Loading/PublicLessonsSkeleton";
import Lenis from "@studio-freight/lenis";
import DeveloperPopup from "../Home/DeveloperPopup/DeveloperPopup";

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [userIsPremium, setUserIsPremium] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "Lessons | Digital Life Lessons";
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
     lenis.scrollTo(0);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

 

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/premium/${user.email}`)
        .then(res => setUserIsPremium(res.data.isPremium))
        .catch(err => console.error(err));
    }
    axios.get("https://digital-life-lessons-server-nu.vercel.app/lessons/public")
      .then(res => { setLessons(res.data); setLoading(false); });
  }, [user, axiosSecure]);

  const filteredAndSortedLessons = useMemo(() => {
    return lessons
      .filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || lesson.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
  }, [lessons, searchTerm, sortOrder, selectedCategory]);

  const categories = ["All", ...new Set(lessons.map(l => l.category))];
  const displayedLessons = filteredAndSortedLessons.slice(0, visibleCount);

  // Toggle Functionality
  const handleLoadMore = () => setVisibleCount(prev => prev + 6);
  const handleShowLess = () => {
    setVisibleCount(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <PublicLessonsSkeleton />;

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 md:px-0 md:w-11/12 mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          The Wisdom <span className="text-primary italic">Library</span>
        </h1>
        <p className="opacity-60 max-w-xl mx-auto">Curated life lessons from our community to help you navigate the digital age.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-10 space-y-6">
            <div className="p-6 bg-base-200/50 backdrop-blur-sm rounded-3xl border border-base-300 shadow-xl">
              <h3 className="flex items-center gap-2 font-bold mb-6 text-xl">
                <Filter className="w-5 h-5 text-primary" /> Filter Wisdom
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="label text-xs font-bold uppercase opacity-50">Keyword Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                    <input
                      type="text"
                      placeholder="Search lessons..."
                      className="input input-bordered w-full pl-10 bg-base-100 border-none shadow-inner"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="label text-xs font-bold uppercase opacity-50">Sort Order</label>
                  <select 
                    className="select select-bordered w-full bg-base-100 border-none shadow-sm"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="newest">✨ Newest First</option>
                    <option value="oldest">⏳ Oldest First</option>
                  </select>
                </div>
                <div>
                  <label className="label text-xs font-bold uppercase opacity-50">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-base-100 hover:bg-base-300'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="p-6 bg-gradient-to-br from-primary to-secondary text-primary-content rounded-3xl shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-bold opacity-80 mb-2">Library Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-black">{lessons.length}</p>
                    <p className="text-[10px] uppercase font-bold opacity-70">Total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black">{lessons.filter(l => l.accessLevel === 'premium').length}</p>
                    <p className="text-[10px] uppercase font-bold opacity-70">Premium</p>
                  </div>
                </div>
              </div>
              <BookOpen className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </aside>

        {/* MAIN GRID */}
        <div className="flex-1">
          {displayedLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {displayedLessons.map(lesson => {
                const isPremium = lesson.accessLevel?.toLowerCase() === "premium";
                const locked = isPremium && !userIsPremium;

                return (
                  <div key={lesson._id} className="group bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
                    <div className="relative h-56 overflow-hidden">
                      <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-black text-[10px] font-black uppercase tracking-widest">
                          {lesson.category}
                        </span>
                      </div>
                      {locked && (
                        <div className="absolute inset-0 bg-neutral/60 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 text-white text-center">
                          <Crown className="w-10 h-10 mb-2 text-warning animate-pulse" />
                          <p className="font-bold">Premium Only</p>
                          <Link to="/dashboard/pricing" className="mt-2 text-xs underline opacity-80">Unlock Access</Link>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">{lesson.title}</h2>
                      <p className="text-sm opacity-60 line-clamp-2 mb-6 leading-relaxed">{lesson.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-dashed border-base-300">
                        <div className="flex items-center gap-3">
                          <img src={lesson.author_Img} className="w-8 h-8 rounded-full ring-2 ring-primary/10" alt="" />
                          <span className="text-xs font-bold opacity-80 truncate max-w-[80px]">{lesson.author_Name}</span>
                        </div>
                        
                        {/* GRADIENT READ BUTTON */}
                        <Link 
                          to={`/lessons/${lesson._id}`} 
                          className={`btn btn-sm border-none text-white transition-all duration-300 rounded-xl px-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 ${locked ? 'btn-disabled opacity-30 grayscale' : ''}`}
                        >
                          Read
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
               <Search className="w-16 h-16 mx-auto mb-4 opacity-10" />
               <h3 className="text-2xl font-bold opacity-30">No wisdom found...</h3>
               <button onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="btn btn-link btn-primary no-underline font-bold">Reset Filters</button>
            </div>
          )}

          {/* TOGGLE BUTTONS (Load More / Show Less) */}
          <div className="mt-16 flex flex-col items-center gap-4">
            {filteredAndSortedLessons.length > visibleCount && (
              <button 
                onClick={handleLoadMore} 
                className="btn btn-wide btn-primary rounded-2xl shadow-xl shadow-primary/20 gap-2 group"
              >
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                Explore More Lessons
              </button>
            )}
            
            {visibleCount > 6 && (
              <button 
                onClick={handleShowLess} 
                className="btn btn-ghost btn-sm opacity-50 hover:opacity-100 flex items-center gap-2"
              >
                <ChevronUp className="w-4 h-4" />
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
      <DeveloperPopup/>
    </div>
  );
};

export default PublicLessons;