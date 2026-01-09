import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/favorites/${user.email}`)
        .then((res) => setFavorites(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <title>My Favorite</title>
      <h1 className="text-2xl font-bold mb-5 text-base-content">
        My Favorite Lessons
      </h1>

      {favorites.length === 0 ? (
        <p className="text-base-content/70 text-center py-6">
          No favorites added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="border border-base-300 p-4 rounded-xl shadow-sm bg-base-100 dark:bg-base-200 dark:border-base-400 transition hover:shadow-md"
            >
              {/* Lesson Details */}
              <img
                src={fav.lessonImage}
                alt={fav.lessonTitle}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h2 className="text-lg font-semibold text-base-content">
                {fav.lessonTitle}
              </h2>
              <p className="text-sm text-base-content/70 mt-1 line-clamp-3">
                {fav.lessonDescription?.slice(0, 80)}...
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm bg-primary/20 dark:bg-primary px-3 py-1 rounded-full text-primary dark:text-white font-medium">
                  {fav.category}
                </span>

                <Link
                  to={`/lessons/${fav.lessonId}`}
                  className="text-primary dark:text-primary-focus hover:underline text-sm font-medium"
                >
                  View Lesson →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default MyFavorites;
