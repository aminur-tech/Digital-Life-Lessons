import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { Lock, Unlock, Search, Filter } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import PublicLessonsSkeleton from "../../Component/Loading/PublicLessonsSkeleton";

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [userIsPremium, setUserIsPremium] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  // New States for Search and Sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/users/premium/${user.email}`)
      .then(res => setUserIsPremium(res.data.isPremium))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  useEffect(() => {
    axios
      .get("https://digital-life-lessons-server-nu.vercel.app/lessons/public")
      .then(res =>{ 
        setLessons(res.data);
        setLoading(false);
      })

  }, []);

  if (loading) {
    return <PublicLessonsSkeleton />;
  }

  // Logic for Filtering and Sorting
  const filteredAndSortedLessons = lessons
    .filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const displayedLessons = filteredAndSortedLessons.slice(0, visibleCount);

  const handleSeeMore = () => {
    if (!userIsPremium) {
      navigate("/dashboard/pricing");
    } else {
      setVisibleCount(prev => prev + 4);
    }
  };

  return (
    <div className="my-10 md:w-11/12 mx-auto">
      <title>Public Lessons | Digital Life Lessons</title>
      <h1 className="text-3xl md:text-5xl font-black mb-12 text-center text-base-content tracking-tight">
        Browse <span className="text-primary">Life Lessons</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* SIDEBAR: SEARCH & SORT */}
        <aside className="w-full md:w-64 space-y-8 shrink-0">
          <div className="p-6 bg-base-200 rounded-2xl border border-base-300 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold mb-4 text-lg">
              <Filter className="w-5 h-5" /> Filter Results
            </h3>

            {/* Search Input */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-semibold opacity-70 uppercase tracking-wider">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Find wisdom..."
                  className="input input-bordered w-full pl-10 bg-base-100 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold opacity-70 uppercase tracking-wider">Sort By</label>
              <select
                className="select select-bordered w-full bg-base-100 rounded-xl"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </aside>

        {/* MAIN GRID */}
        <div className="flex-1">
          {displayedLessons.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedLessons.map(lesson => {
                const isPremiumLesson = lesson.accessLevel?.toLowerCase() === "premium";
                const isPrivateLesson = lesson.privacy?.toLowerCase() === "private";
                const isCreator = user?.email === lesson.email;
                const locked = (isPremiumLesson && !userIsPremium) || (isPrivateLesson && !isCreator);

                return (
                  <div key={lesson._id} className={`relative bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${locked ? "opacity-90" : ""}`}>
                    {/* Access Badges */}
                    <div className="absolute top-3 left-3 z-10 flex gap-2">
                      <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {lesson.category}
                      </span>
                      {isPremiumLesson && (
                        <span className="bg-warning text-warning-content px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Premium
                        </span>
                      )}
                    </div>

                    {/* LOCK OVERLAY */}
                    {locked && (
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-base-300/80 backdrop-blur-md text-center p-6">
                        <Lock className="w-8 h-8 mb-4 text-primary" />
                        <h4 className="font-bold mb-2">Content Locked</h4>
                        <p className="text-sm opacity-80 mb-4">
                          {isPrivateLesson ? "Private Lesson" : "Upgrade to Premium to access this wisdom."}
                        </p>
                        {!isPrivateLesson && (
                          <Link to="/dashboard/pricing" className="btn btn-primary btn-sm rounded-lg">Upgrade Now</Link>
                        )}
                      </div>
                    )}

                    <div className="h-48 w-full overflow-hidden">
                      <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    </div>

                    <div className="p-5">
                      <h2 className="text-xl font-bold mb-2 line-clamp-1">{lesson.title}</h2>
                      <p className="text-sm opacity-70 mb-4 h-10 line-clamp-2">{lesson.description}</p>

                      <div className="flex items-center gap-3 pt-4 border-t border-base-200">
                        <img src={lesson.author_Img} className="w-10 h-10 rounded-full border-2 border-primary/20" alt="" />
                        <div className="flex-1">
                          <p className="text-sm font-bold truncate">{lesson.author_Name}</p>
                          <p className="text-xs opacity-50">{new Date(lesson.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <Link
                        to={`/lessons/${lesson._id}`}
                        className="btn btn-outline btn-primary w-full mt-4 rounded-xl"
                        disabled={locked}
                      >
                        Read Lesson
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-base-200 rounded-3xl">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-xl opacity-50 font-medium">No lessons found matching your search.</p>
            </div>
          )}

          {/* SEE MORE */}
          {filteredAndSortedLessons.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button onClick={handleSeeMore} className="btn btn-primary btn-wide rounded-full shadow-lg shadow-primary/20">
                Load More Wisdom
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;