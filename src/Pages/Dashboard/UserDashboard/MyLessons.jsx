import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../Component/Loading';

const MyLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Fetch lessons
  const { data: lessons = [], isLoading, refetch } = useQuery({
    queryKey: ['my-lessons', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/my/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete lesson
  const handleDelete = (lessonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/lessons/${lessonId}/${user._id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your lesson has been deleted.", "success");
            refetch();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the lesson.", "error");
          });
      }
    });
  };

  // Update lesson
  const updateLessonMutation = useMutation({
    mutationFn: (updatedLesson) =>
      axiosSecure.patch(`/lessons/${updatedLesson._id}`, {
        ...updatedLesson,
        userId: user._id,
      }),
    onSuccess: () => {
      Swal.fire("Updated!", "Lesson has been updated.", "success");
      setIsUpdateModalOpen(false);
      refetch();
    },
    onError: () => Swal.fire("Error!", "Failed to update lesson.", "error"),
  });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updates = {
      _id: selectedLesson._id,
      title: form.title.value,
      description: form.description.value,
      visibility: form.visibility.value,
      access: form.access.value,
      updateAt: new Date().toLocaleDateString()
    };
    updateLessonMutation.mutate(updates);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 space-y-6">
      <title>My Lessons | Digital Life Lessons</title>

      <h1 className="text-3xl font-bold text-center mb-6 text-base-content">My Lessons</h1>

      {lessons.length === 0 && (
        <p className="text-center opacity-70">You have no lessons yet.</p>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra table-compact border border-base-300 text-base-content">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Reactions</th>
              <th>Favorites</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>{lesson.title}</td>
                <td>{new Date(lesson.createdAt).toLocaleDateString()}</td>
                <td>{lesson.visibility}</td>
                <td>{lesson.access}</td>
                <td>{lesson.reactions || 0}</td>
                <td>{lesson.favorites || 0}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setSelectedLesson(lesson); setIsUpdateModalOpen(true); }}
                    className="btn btn-sm btn-primary"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 text-base-content rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Lesson</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                name="title"
                defaultValue={selectedLesson.title}
                className="input input-bordered w-full"
                placeholder="Title"
                required
              />
              <textarea
                name="description"
                defaultValue={selectedLesson.description}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                required
              />
              <select
                name="visibility"
                defaultValue={selectedLesson.visibility}
                className="select select-bordered w-full"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <select
                name="access"
                defaultValue={selectedLesson.access}
                className="select select-bordered w-full"
              >
                <option value="free">Free</option>
                {user.isPremium && <option value="premium">Premium</option>}
              </select>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

  );
};

export default MyLessons;
