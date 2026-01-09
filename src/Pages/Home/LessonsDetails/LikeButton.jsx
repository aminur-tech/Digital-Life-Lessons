import React, { useState, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { toast } from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LikeButton = ({ lessonId, initialLiked = false, initialCount = 0 }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
    setLikesCount(initialCount);
  }, [initialLiked, initialCount]);

  const handleToggle = async () => {
    if (!user?.email) {
      toast.error("Please log in to like");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosSecure.patch(`/lessons/like/${lessonId}`);
      setLiked(res.data.liked);
      setLikesCount(prev => res.data.liked ? prev + 1 : prev - 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle like");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300
    bg-base-200 hover:bg-base-300 active:scale-95
    ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <BiLike
        size={20}
        className={liked ? "text-success" : "text-base-content/70"}
      />
      <span className="text-base-content">{likesCount}</span>
    </button>
  );
};

export default LikeButton;
