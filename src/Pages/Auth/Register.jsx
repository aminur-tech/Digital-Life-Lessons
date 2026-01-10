import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [regError, setRegError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange" // This enables live error checking as user types
  });

  const handleRegister = async (data) => {
    setRegError('');
    setLoading(true);

    try {
      const photoImg = data.photo[0];
      if (!photoImg) throw new Error("Please upload a profile picture.");

      // 1. Create User in Firebase
      const result = await createUser(data.email, data.password);

      // 2. Upload image to ImgBB
      const formData = new FormData();
      formData.append('image', photoImg);
      const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`;
      const imgRes = await axios.post(Img_Api_Url, formData);
      const imageUrl = imgRes.data.data.url;

      // 3. Save User to MongoDB
      const userinfo = {
        displayName: data.name,
        email: data.email,
        photoURL: imageUrl,
        role: 'user', // default role
        createdAt: new Date(),
      };
      await axiosSecure.post('/users', userinfo);

      // 4. Update Firebase Profile
      await updateUserProfile({ displayName: data.name, photoURL: imageUrl });

      setLoading(false);
      navigate(location?.state || '/');
      
    } catch (error) {
      setLoading(false);
      console.error("Register error:", error);
      
      if (error.code === 'auth/email-already-in-use') {
        setRegError('This email is already registered.');
      } else if (error.code === 'auth/weak-password') {
        setRegError('Password is too weak.');
      } else {
        setRegError(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-lg bg-base-200 border border-base-300 shadow-2xl rounded-3xl p-8">
        
        <h3 className="text-3xl font-black text-center text-base-content tracking-tight">
          Join <span className="text-primary">Digital Life</span>
        </h3>

        <p className="text-center text-base-content/60 mt-2 mb-8">
          Start your journey of sharing and learning.
        </p>

        {/* --- Global Error Alert --- */}
        {regError && (
          <div className="alert alert-error mb-6 rounded-2xl py-3 text-sm flex items-center gap-2">
            <FiAlertCircle size={20} />
            <span>{regError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          
          {/* Full Name */}
          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest opacity-60">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered rounded-xl ${errors.name ? 'input-error' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-error text-xs mt-1 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest opacity-60">Email Address</label>
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              className={`input input-bordered rounded-xl ${errors.email ? 'input-error' : ''}`}
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-error text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          {/* Password with Live Strength Check */}
          <div className="form-control relative">
            <label className="label font-bold text-xs uppercase tracking-widest opacity-60">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])/,
                  message: "Must include Uppercase & Lowercase"
                }
              })}
              className={`input input-bordered rounded-xl pr-12 ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[46px] text-base-content/40 hover:text-primary transition-colors"
            >
              {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
            {errors.password && <p className="text-error text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          {/* Photo Upload */}
          <div className="form-control">
            <label className="label font-bold text-xs uppercase tracking-widest opacity-60">Profile Photo</label>
            <input
              type="file"
              {...register("photo", { required: "Photo is required" })}
              className={`file-input file-input-bordered rounded-xl w-full ${errors.photo ? 'file-input-error' : ''}`}
            />
            {errors.photo && <p className="text-error text-xs mt-1 font-medium">{errors.photo.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
          </button>
          
          <SocialLogin />

          <p className="text-center text-sm font-medium text-base-content/70 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline font-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;