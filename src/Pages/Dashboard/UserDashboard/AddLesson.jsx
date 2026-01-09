import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";

const AddLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);
  const [isPremium, setIsPremium] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/premium/${user.email}`)
      .then(res => setIsPremium(res.data.isPremium))
      .catch(() => setIsPremium(false));
  }, [user, axiosSecure]);

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`;
        const imgRes = await axios.post(Img_Api_Url, formData);
        imageUrl = imgRes.data.data.url;
      }

      const lessonData = {
        ...data,
        email: user.email,
        image: imageUrl,
        author_Name: user.displayName,
        author_Img: user.photoURL,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/lessons", lessonData);

      if (res.data.success) {
        toast.success("Lesson created successfully!");
        reset();
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create lesson");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 text-base-content rounded shadow-md">
      <title>Add Lesson</title>
      <h2 className="text-2xl font-bold mb-4">Create New Life Lesson</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Lesson Title */}
        <input
          type="text"
          placeholder="Lesson Title"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Description */}
        <textarea
          placeholder="Full Description / Story / Insight"
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full"
          rows={6}
        />

        {/* Category */}
        <select {...register("category")} className="select select-bordered w-full">
          <option value="">Select Category</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        {/* Emotional Tone */}
        <select {...register("tone")} className="select select-bordered w-full">
          <option value="">Select Emotional Tone</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input file-input-bordered w-full"
        />

        {/* Privacy */}
        <select {...register("privacy")} className="select select-bordered w-full">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>

        {/* Access Level */}
        <select
          {...register("accessLevel")}
          className="select select-bordered w-full"
          disabled={isPremium === false}
        >
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Create Lesson
        </button>
      </form>
    </div>

  );
};

export default AddLesson;
