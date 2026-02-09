import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { Lock, Unlock, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import FeaturedSkeleton from "../../../Component/Loading/FeaturedSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiStar } from "react-icons/fi";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userIsPremium, setUserIsPremium] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Fetch featured lessons
  const { data: featured = [], isPending } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons/featured");
      return res.data;
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  // Get user premium status
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/users/premium/${user.email}`)
      .then((res) => setUserIsPremium(res.data.isPremium))
      .catch((err) => console.error(err));
  }, [user, axiosSecure]);

  if (isPending) {
    return <FeaturedSkeleton />;
  }

  const displayedLessons = featured.slice(0, visibleCount);

  const handleSeeMore = () => {
    if (!userIsPremium) {
      navigate("/dashboard/pricing");
    } else {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const handleShowLess = () => {
    setVisibleCount(4);
    // Optional: Smooth scroll back to section header
    window.scrollTo({ top: document.getElementById('featured-section').offsetTop - 100, behavior: 'smooth' });
  };

  return (
    <div className="my-10 px-4" id="featured-section">
      <div className="text-center mb-12">
        <h2
          data-aos="fade-down"
          className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold text-base-content"
        >
          <FiStar className="text-primary" />
          Featured Life Lessons
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-3 text-gray-600 max-w-2xl mx-auto"
        >
          Handpicked lessons from the community to inspire growth, reflection, and learning.
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedLessons.map((lesson, idx) => {
          const isPremiumLesson = lesson.accessLevel?.toLowerCase() === "premium";
          const locked = isPremiumLesson && !userIsPremium;

          return (
            <div
              key={lesson._id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className={`relative rounded-2xl shadow-md transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1
            ${locked ? "opacity-90" : ""}
            bg-base-100 text-base-content border border-base-300`}
            >
              {/* LOCK OVERLAY */}
              {locked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral/80 backdrop-blur-sm text-neutral-content text-center p-4">
                  <Lock className="w-8 h-8 mb-2 text-warning" />
                  <p className="text-sm font-bold uppercase tracking-wider">
                    Premium Content
                  </p>
                  <Link
                    to="/dashboard/pricing"
                    className="mt-3 px-6 py-2 bg-gradient-to-r from-warning to-orange-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                  >
                    Upgrade
                  </Link>
                </div>
              )}

              {/* CATEGORY TAG */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-primary/90 backdrop-blur-md text-primary-content px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {lesson.category || "Lesson"}
                </span>
              </div>

              {/* IMAGE */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* CONTENT */}
              <div className={`p-5 ${locked ? "blur-[2px]" : ""}`}>
                <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-primary">
                  {lesson.title}
                </h3>

                <p className="text-sm opacity-70 mb-4 line-clamp-2 min-h-[40px]">
                  {lesson.description.slice(0, 100)}...
                </p>

                {/* CREATOR INFO */}
                <div className="flex items-center gap-3 mb-4 p-2 bg-base-200/50 rounded-xl">
                  <img
                    src={lesson.author_Img}
                    alt={lesson.author_Name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">
                      {lesson.author_Name}
                    </p>
                    <p className="text-[10px] uppercase tracking-tighter opacity-50">
                      {new Date(lesson.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* ACCESS & BUTTON */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-shrink-0">
                    {isPremiumLesson ? (
                      <span className="text-error font-bold text-[10px] uppercase flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Premium
                      </span>
                    ) : (
                      <span className="text-success font-bold text-[10px] uppercase flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Free
                      </span>
                    )}
                  </div>

                  <Link
                    to={locked ? "/dashboard/pricing" : `/lessons/${lesson._id}`}
                    className="flex-1 text-center bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-bold py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTION BUTTONS (SEE MORE / SHOW LESS) */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-4" data-aos="zoom-in">
        {featured.length > visibleCount && (
          <button
            onClick={handleSeeMore}
            className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-full shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
          >
            See More <ChevronDown className="group-hover:translate-y-1 transition-transform" />
          </button>
        )}

        {visibleCount > 4 && (
          <button
            onClick={handleShowLess}
            className="group flex items-center gap-2 px-8 py-3 bg-base-300 text-base-content font-bold rounded-full shadow-lg hover:bg-base-content hover:text-base-100 transition-all hover:scale-105"
          >
            Show Less <ChevronUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedLessons;