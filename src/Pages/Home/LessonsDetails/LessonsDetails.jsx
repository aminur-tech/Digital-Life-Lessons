import React, { useState, useEffect } from "react";
import AuthorCard from "./AuthorCard";
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import Comments from "./Comments";
import ReportModal from "./ReportModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router";
import { Eye, Clock, Calendar, Lock } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const LessonsDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [similarLessons, setSimilarLessons] = useState([]);
  const [isPremium, setIsPremium] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (!id) return;
    axiosSecure.get(`/lessons/${id}`).then((res) => setLesson(res.data));

    axiosSecure.get(`/lessons/similar/${id}`).then((res) => {
      setSimilarLessons(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    if (user?.email) {
      axiosSecure
        .get(`/users/premium/${user.email}`)
        .then((res) => setIsPremium(res.data.isPremium));
    }
  }, [id, user, axiosSecure]);

  if (!lesson)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/70">Loading lesson details...</p>
      </div>
    );

  const isPremiumContent =
    lesson.premium === true || lesson.accessLevel === "premium";
  const isBlocked = isPremiumContent && isPremium !== true;

  const lessonInfo = {
    lessonId: id,
    lessonImage: lesson?.image || "",
    lessonTitle: lesson?.title || "",
    lessonDescription: lesson?.description || "",
    category: lesson?.category || "",
  };

  const handleFavoriteToggle = async () => {
    await axiosSecure.post("/favorites/toggle", { ...lessonInfo });
  };

  const report = {
    lessonId: id,
    reporter: user?.email,
    author_Name: lesson?.name,
    author_Email: lesson?.email,
    author_Img: lesson?.image,
  };

  const handleReport = async ({ reason, details }) => {
    await axiosSecure.post("/lessons/report", { ...report, reason, details });
    toast.success("Report submitted successfully!");
    setShowReport(false);
  };

  return (
    <div className="text-base-content p-1 transition-colors duration-300">
      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-4 pb-4 border-b border-base-300">
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-base-content">
              {lesson.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm font-medium">
              <span className="text-primary">{lesson.category}</span>
              <span className="opacity-30">|</span>
              <span className="opacity-70">Tone: {lesson.tone}</span>
            </div>
          </div>

          {/* FEATURE IMAGE */}
          <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-base-300">
            <img
              src={lesson.image}
              alt={lesson.title}
              className={`w-full max-h-[500px] object-cover transition duration-700 ${
                isBlocked ? "blur-md grayscale opacity-50" : "group-hover:scale-105"
              }`}
            />
            {isBlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-base-300/60 backdrop-blur-md text-center">
                <div className="bg-base-100 p-4 rounded-full shadow-xl mb-4">
                   <Lock className="w-10 h-10 text-warning" />
                </div>
                <p className="text-3xl font-bold mb-2 text-base-content">Exclusive Premium Content</p>
                <p className="text-lg opacity-80 max-w-md mb-6">
                  Unlock this entire lesson and more with a premium membership.
                </p>
                <Link
                  to="/dashboard/pricing"
                  className="btn btn-primary btn-wide rounded-full shadow-lg"
                >
                  Upgrade to Unlock
                </Link>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          {!isBlocked && (
            <section className="prose lg:prose-xl max-w-none text-base-content/90">
              <p className="leading-relaxed">{lesson.description}</p>
            </section>
          )}

          {/* COMMENTS */}
          <section className="pt-8 border-t border-base-300">
            <h2 className="text-3xl font-bold mb-6">Discussions</h2>
            <Comments lessonId={lesson._id} />
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="lg:col-span-1 lg:space-y-8 mt-12 lg:mt-0">
          
          {/* Quick Actions Card */}
          <div className="sticky top-24 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200 mb-8">
            <h3 className="font-bold text-lg mb-4 opacity-70 uppercase tracking-widest text-xs">
              Quick Actions
            </h3>
            <div className="flex justify-between items-center gap-3">
              <LikeButton
                lessonId={lesson._id}
                initialLiked={lesson.likes?.includes(user?.email)}
                initialCount={lesson.likesCount || lesson.likes?.length || 0}
              />
              <FavoriteButton
                initialSaved={false}
                onToggle={handleFavoriteToggle}
                className="flex-1"
              />
              <button
                onClick={() => setShowReport(true)}
                className="btn btn-circle btn-outline btn-error btn-sm"
                title="Report"
              >
                🚩
              </button>
            </div>
          </div>

          {/* Author Card */}
          <div className="p-6 bg-base-200 rounded-2xl border border-base-300">
            <h3 className="font-bold text-sm opacity-60 mb-4 uppercase">Lesson Creator</h3>
            <AuthorCard authorEmail={lesson.email} />
          </div>

          {/* Metrics Card */}
          <div className="p-6 bg-base-100 rounded-2xl shadow-md border border-base-200">
            <h3 className="font-bold text-sm opacity-60 mb-4 uppercase">Lesson Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Eye className="w-5 h-5 text-primary" />
                <span className="opacity-80">Views: {Math.floor(Math.random() * 10000).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="opacity-80">Created: {lesson.createdAt}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary" />
                <span className="opacity-80">Updated: {lesson.updateAt || lesson.createdAt} </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Lock className="w-5 h-5 text-primary" />
                <span className="opacity-80">Visibility: {lesson.privacy}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* SIMILAR LESSONS */}
      <section className="mt-20 mb-24 pt-10 border-t border-base-300">
        <h2 className="text-3xl font-black mb-8 text-base-content">
          More Lessons You Might Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarLessons.slice(0, visibleCount).map((s) => (
            <Link
              to={`/lessons/${s._id}`}
              key={s._id}
              className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden group"
            >
              <figure className="overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-base group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs opacity-50 uppercase font-bold">{s.category}</p>
              </div>
            </Link>
          ))}
        </div>

        {visibleCount < similarLessons.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="btn btn-primary  rounded shadow-lg"
            >
              Show More
            </button>
          </div>
        )}
      </section>

      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        lessonId={lesson._id}
        reporter={user?.email}
        author_Name={lesson.name}
        author_Email={lesson.email}
        author_Img={lesson.image}
        onSubmit={handleReport}
      />
    </div>
  );
};

export default LessonsDetails;