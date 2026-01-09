import React, { useState, useEffect } from "react";
import { Trash2, MessageCircle, Heart } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const Comments = ({ lessonId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");

  const loadComments = async () => {
    try {
      const res = await axiosSecure.get(`/comments/${lessonId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [lessonId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    try {
      await axiosSecure.post("/comments", { lessonId, comment: text });
      setText("");
      loadComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleReply = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      await axiosSecure.post("/comments", { lessonId, comment: replyText, parentId });
      setReplyText("");
      setReplyOpen(null);
      loadComments();
    } catch (err) {
      console.error("Failed to post reply:", err);
    }
  };

  const handleDelete = async (id, authorEmail) => {
    if (user?.email !== authorEmail) return;
    try {
      await axiosSecure.delete(`/comments/${id}`);
      loadComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  const toggleLike = async (id, isReply = false) => {
    try {
      await axiosSecure.post("/comments/like", { commentId: id, isReply });
      loadComments();
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Comment Card */}
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300 transition-all duration-300">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="textarea textarea-bordered w-full bg-base-200 text-base-content focus:textarea-primary resize-none text-base"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmit}
            className="btn btn-primary px-8"
          >
            Post Comment
          </button>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((c) => {
          const liked = c.likes?.includes(user?.email);
          return (
            <div key={c._id} className="bg-base-100 p-5 rounded-2xl shadow-sm border border-base-200 transition-all">

              {/* Main Comment Row */}
              <div className="flex items-start gap-4">
                <div className="avatar">
                  <div className="w-11 h-11 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    <img
                      src={c.userImage || `https://ui-avatars.com/api/?name=${c.userName}`}
                      alt={c.userName}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-base-content">{c.userName}</p>
                    {user?.email === c.userEmail && (
                      <button
                        onClick={() => handleDelete(c._id, c.userEmail)}
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="text-base-content/80 mt-1 leading-relaxed">{c.comment}</p>

                  {/* Interaction Row */}
                  <div className="flex gap-4 mt-3 items-center">
                    <button
                      onClick={() => toggleLike(c._id)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? "text-error" : "text-base-content/60 hover:text-primary"
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                      <span>{c.likes?.length || 0}</span>
                    </button>

                    <button
                      onClick={() => setReplyOpen(c._id)}
                      className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" /> Reply
                    </button>
                  </div>

                  {/* Reply Input Area */}
                  {replyOpen === c._id && (
                    <div className="mt-4 flex flex-col gap-2 pl-4 border-l-2 border-base-300">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="textarea textarea-sm textarea-bordered w-full bg-base-200 focus:textarea-secondary"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => setReplyOpen(null)}>Cancel</button>
                        <button
                          onClick={() => handleReply(c._id)}
                          className="btn btn-secondary btn-sm"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Nested Replies */}
                  <div className="space-y-3 mt-4">
                    {c.replies?.map((r) => {
                      const replyLiked = r.likes?.includes(user?.email);
                      return (
                        <div
                          key={r._id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-base-200/50 border border-base-300/50 transition-colors"
                        >
                          <img
                            src={r.userImage || `https://ui-avatars.com/api/?name=${r.userName}`}
                            alt={r.userName}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-bold text-base-content">{r.userName}</p>
                              {user?.email === r.userEmail && (
                                <button
                                  onClick={() => handleDelete(r._id, r.userEmail)}
                                  className="text-error hover:scale-110 transition-transform"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-base-content/80 mt-1">{r.comment}</p>
                            <button
                              onClick={() => toggleLike(r._id, true)}
                              className={`flex items-center gap-1 mt-2 text-xs ${replyLiked ? "text-error" : "text-base-content/50"
                                }`}
                            >
                              <Heart className={`w-3 h-3 ${replyLiked ? "fill-current" : ""}`} />
                              <span>{r.likes?.length || 0}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
