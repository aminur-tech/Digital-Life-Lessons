import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    setRegError('');
    setRegSuccess('');

    const photoImg = data.photo[0];

    createUser(data.email, data.password)
      .then(result => {
        console.log(result)

        // Upload image
        const formData = new FormData();
        formData.append('image', photoImg);
        const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Img_Upload}`;
        return axios.post(Img_Api_Url, formData);
      })
      .then(res => {
        const imageUrl = res.data.data.url;

        const userinfo = {
          displayName: data.name,
          email: data.email,
          photoURL: imageUrl,
        };

        return axiosSecure.post('/users', userinfo).then(() => imageUrl);
      })
      .then((imageUrl) => {
        const userProfile = { displayName: data.name, photoURL: imageUrl };
        return updateUserProfile(userProfile);
      })
      .then(() => {
        setRegSuccess('Registration successful! 🎉');
        navigate(location?.state || '/');
      })
      .catch(error => {
        console.log("Register error:", error);
        if (error.code === 'auth/email-already-in-use') {
          setRegError('Email already registered. Please use another email.');
        } else {
          setRegError(error.message);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 transition-colors px-4">
      <title>Registration</title>

      <div className="w-full max-w-lg bg-base-200 backdrop-blur-xl
      border border-base-300 shadow-2xl rounded-2xl p-8">

        <h3 className="text-3xl font-extrabold text-center text-base-content">
          Create Your Account
        </h3>

        <p className="text-center text-base-content/70 my-3">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/auth/login"
            className="text-primary hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Global Error */}
        {regError && (
          <p className="text-error text-center font-medium mb-4">
            {regError}
          </p>
        )}

        {/* Success Message */}
        {regSuccess && (
          <p className="text-success text-center font-medium mb-4">
            {regSuccess}
          </p>
        )}

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="label text-base-content">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full
            bg-base-100 text-base-content border-base-300"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label text-base-content">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full
            bg-base-100 text-base-content border-base-300"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="label text-base-content">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="input input-bordered w-full pr-10
            bg-base-100 text-base-content border-base-300"
              placeholder="Create Password"
            />

            <span
              className="absolute right-3 top-9 text-base-content/60 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </span>

            {errors.password && (
              <p className="text-error text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <label className="label text-base-content">Upload Photo</label>
            <input
              type="file"
              {...register("photo")}
              className="file-input file-input-bordered w-full
            bg-base-100 text-base-content border-base-300"
            />
            {errors.photo && (
              <p className="text-error text-sm mt-1">{errors.photo.message}</p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-2">
            Register
          </button>

          <div className="pt-2">
            <SocialLogin />
          </div>
        </form>
      </div>
    </div>

  );
};

export default Register;
