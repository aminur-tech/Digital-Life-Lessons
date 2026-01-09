import React, { useState } from "react";
import { Camera, ShieldCheck } from "lucide-react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL);

  // Update Name
  const handleEditName = async () => {
    if (!newName.trim()) return toast.error("Name cannot be empty!");
    try {
      setLoading(true);
      await updateProfile(user, { displayName: newName });
      await axiosSecure.patch(`/users/update-name`, { name: newName });
      toast.success("Name updated successfully!");
      window.location.reload();
    } catch {
      toast.error("Failed to update name");
    } finally {
      setLoading(false);
    }
  };

  // Upload Profile Photo
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`,
        formData
      );

      const photoURL = uploadRes.data.data.url;
      await updateProfile(user, { photoURL });
      await axiosSecure.patch(`/users/update-photo`, { photoURL });

      toast.success("Profile photo updated!");
      window.location.reload();
    } catch {
      toast.error("Failed to update photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-2xl text-base-content border border-base-200 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={photoPreview}
            alt="Admin"
            className="w-28 h-28 rounded-full object-cover border-4 border-base-200 shadow-sm"
          />

          <label className="absolute bottom-1 right-1 bg-primary text-primary-content p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Name + Email */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold flex flex-wrap justify-center sm:justify-start items-center gap-2">
            {user?.displayName}
            <span className="badge badge-info gap-1 py-3 px-3">
              <ShieldCheck size={14} /> Admin
            </span>
          </h2>
          <p className="text-base-content/60 mt-1">{user?.email}</p>
        </div>
      </div>

      {/* Edit Name */}
      <div className="mt-8 p-4 rounded-xl bg-base-200/50">
        <label className="label font-medium pb-2 text-base-content/80">Update Display Name</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
            className="input input-bordered w-full bg-base-100 focus:input-primary"
          />
          <button
            onClick={handleEditName}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Save"}
          </button>
        </div>
      </div>

      {/* Admin Activity Summary */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4 opacity-80">Admin Activity</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stat Card 1 */}
          <div className="stats shadow bg-base-200/40 border border-base-300">
            <div className="stat">
              <div className="stat-title text-base-content/70">Lessons Moderated</div>
              <div className="stat-value text-primary text-2xl">12</div>
              <div className="stat-desc text-success">↗︎ 4 (30%)</div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="stats shadow bg-base-200/40 border border-base-300">
            <div className="stat">
              <div className="stat-title text-base-content/70">Actions Taken</div>
              <div className="stat-value text-secondary text-2xl">34</div>
              <div className="stat-desc">Total tasks completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
