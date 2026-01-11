import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AuthorProfile = () => {
  const { email } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [favoriteData, setFavoriteData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!email) return;

    axiosSecure.get(`/author/${email}`)
      .then(res => setAuthorData(res.data))
      .catch(err => console.error(err));

    axiosSecure.get(`/favorites/${email}`)
      .then(res => setFavoriteData(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure, email]);

  if (!authorData) return (
    <div className="flex justify-center items-center h-screen text-base-content">
      Loading author profile...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 transition-colors duration-300">
      <title>Author Profile</title>

      {/* Author Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-base-100 rounded-2xl shadow-xl border border-base-300 transition-colors">
        <div className="avatar">
          <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={authorData.user.photoURL || '/default-avatar.png'}
              alt={authorData.user.name || authorData.user.displayName}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-base-content">
            {authorData.user.name || authorData.user.displayName}
          </h1>

          <p className="text-base-content/70 mt-2">
            <span className='text-primary font-bold'>{authorData.lessons.length}</span> lesson{authorData.lessons.length !== 1 && 's'} created
          </p>

          <p className="text-base-content/70 mt-1">
            Total Favorites: <span className='text-primary font-bold'>{favoriteData.length}</span>
          </p>
        </div>
      </div>

      {/* Author Lessons */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-base-content mb-6">
          Lessons by <span className='text-primary'>{authorData.user.name || authorData.user.displayName}</span>
        </h2>

        {authorData.lessons.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl border-2 border-dashed border-base-300">
            <p className="text-base-content/50">
              This author has not created any lessons yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorData.lessons.map(lesson => (
              <Link
                to={`/lessons/${lesson._id}`}
                key={lesson._id}
                className="group card bg-base-100 shadow-md border border-base-200 hover:border-primary/50 hover:shadow-2xl transition-all duration-300"
              >
                <figure className="h-44 overflow-hidden">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </figure>

                <div className="card-body p-5">
                  <h3 className="card-title text-base-content group-hover:text-primary transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>

                  <p className="text-base-content/60 text-sm line-clamp-3">
                    {lesson.description}
                  </p>

                  <div className="card-actions justify-end mt-2">
                    <div className="badge badge-outline badge-sm opacity-50">
                      {lesson.category}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default AuthorProfile;
