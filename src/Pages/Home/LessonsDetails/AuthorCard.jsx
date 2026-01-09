import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const AuthorCard = ({ authorEmail }) => {
  const [authorData, setAuthorData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!authorEmail) return;

    // Fetch author profile by email
    axiosSecure
      .get(`/author/${authorEmail}`)
      .then((res) => setAuthorData(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure, authorEmail]);

  if (!authorData) return null; // or loader

  return (
    <div className="flex items-center gap-4 border border-base-300 p-4 rounded-xl bg-base-100 text-base-content shadow-sm transition-colors">
      <img
        src={authorData.user.photoURL || '/default-avatar.png'}
        alt={authorData.user.displayName || authorData.user.name}
        className="w-16 h-16 rounded-full object-cover ring-2 ring-base-200"
      />

      <div>
        <h3 className="text-lg font-semibold">
          {authorData.user.displayName || authorData.user.name}
        </h3>
        <p className="text-base-content/60 text-sm">
          {authorData.lessons.length} lesson{authorData.lessons.length !== 1 && 's'} created
        </p>

        <Link
          to={`/dashboard/author/${authorEmail}`}
          className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-1 transition-colors"
        >
          View all lessons by this author <span className="text-xs">→</span>
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
