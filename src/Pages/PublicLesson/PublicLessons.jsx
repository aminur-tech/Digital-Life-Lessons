import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { Lock, Unlock } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [userIsPremium, setUserIsPremium] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Get user premium status
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/users/premium/${user.email}`)
      .then(res => setUserIsPremium(res.data.isPremium))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  // Get all public lessons
  useEffect(() => {
    axios
      .get("http://localhost:3000/lessons/public")
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to load lessons:", err));
  }, []);

  const displayedLessons = lessons.slice(0, visibleCount);

  const handleSeeMore = () => {
    if (!userIsPremium) {
      navigate("/dashboard/pricing");
    } else {
      setVisibleCount(prev => prev + 4);
    }
  };

  return (
    <div className="my-15">
      <title>public lesson</title>
      <h1 className="text-3xl md:text-4xl font-bold mb-15 text-center text-base-content">
        Browse Public Life Lessons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedLessons.map(lesson => {
          const isPremiumLesson = lesson.accessLevel?.toLowerCase() === "premium";
          const isPrivateLesson = lesson.privacy?.toLowerCase() === "private";
          const isCreator = user?.email === lesson.email;
          const locked = (isPremiumLesson && !userIsPremium) || (isPrivateLesson && !isCreator);

          return (
            <div
              key={lesson._id}
              className={`relative bg-base-100 text-base-content rounded-xl shadow-md border border-base-300 overflow-hidden transition hover:shadow-xl ${locked ? "opacity-80" : ""
                }`}
            >
              {/* LOCK OVERLAY */}
              {locked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral/70 text-neutral-content text-center p-4 rounded-xl">
                  <Lock className="w-6 h-6 mb-2" />
                  <p className="text-sm font-medium text-center">
                    {isPrivateLesson
                      ? "Private Lesson – Only Creator Can View"
                      : "Premium Lesson – Upgrade to View"}
                  </p>

                  {!isPrivateLesson && !userIsPremium && (
                    <Link
                      to="/dashboard/pricing"
                      className="mt-3 px-4 py-2 bg-warning text-warning-content font-semibold rounded hover:opacity-90 transition"
                    >
                      Upgrade
                    </Link>
                  )}
                </div>
              )}

              {/* CATEGORY */}
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-primary text-primary-content px-2 py-1 rounded-2xl text-xs font-semibold">
                  {lesson.category}
                </span>
              </div>

              {/* IMAGE */}
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className={`p-4 ${locked ? "blur-sm" : ""}`}>
                <h2 className="text-lg font-semibold mb-1">{lesson.title}</h2>

                <p className="text-sm mb-3 opacity-70">{lesson.description.slice(0, 70)}...</p>

                {/* CREATOR INFO */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={lesson.author_Img}
                    alt={lesson.author_Name}
                    className="w-9 h-9 rounded-full object-cover border border-base-300"
                  />
                  <div>
                    <p className="text-sm font-medium">{lesson.author_Name}</p>
                    <p className="text-xs opacity-50">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ACCESS LEVEL */}
                <div className="mb-3">
                  {isPremiumLesson ? (
                    <span className="flex items-center gap-1 text-error text-sm font-semibold">
                      <Lock className="w-4 h-4" /> Premium
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-success text-sm font-semibold">
                      <Unlock className="w-4 h-4" /> Free
                    </span>
                  )}
                </div>

                {/* SEE DETAILS BUTTON */}
                <Link
                  to={locked ? (isPremiumLesson ? "/dashboard/pricing" : `/lessons/${lesson._id}`) : `/lessons/${lesson._id}`}
                  className="block w-full text-center bg-primary text-primary-content font-semibold py-2 rounded transition hover:opacity-90"
                >
                  See Details
                </Link>
              </div>
            </div>

          );
        })}
      </div>

      {/* SEE MORE BUTTON */}
      {lessons.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSeeMore}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicLessons;
