import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FiUser, FiShield, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(""); // State for Firebase errors

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }, // Live validation errors
    } = useForm();

    const handleLogin = (data) => {
        setLoginError(""); // Clear previous errors on new attempt
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/');
            })
            .catch(error => {
                // Formatting Firebase errors to be user-friendly
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-credential') {
                    setLoginError("Invalid email or password. Please try again.");
                } else if (errorCode === 'auth/user-not-found') {
                    setLoginError("No account found with this email.");
                } else {
                    setLoginError("Something went wrong. Please try later.");
                }
            });
    };

    const handleDemoLogin = (role) => {
        setLoginError(""); // Clear errors when using demo
        if (role === 'admin') {
            setValue('email', 'aminur@gmail.com');
            setValue('password', 'Admin@123');
        } else {
            setValue('email', 'hero@gmail.com');
            setValue('password', 'User@123');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
            <div className="w-full max-w-md bg-base-200 shadow-2xl rounded-2xl p-8 border border-base-300">
                
                <h3 className="text-3xl font-extrabold text-center text-base-content tracking-tight">
                    Welcome Back 👋
                </h3>

                {/* --- Firebase/Live Auth Error Alert --- */}
                {loginError && (
                    <div className="mt-4 alert alert-error shadow-sm rounded-xl py-2 text-sm flex items-center gap-2">
                        <FiAlertCircle size={18} />
                        <span>{loginError}</span>
                    </div>
                )}

                <p className="my-4 text-center text-base-content/70">
                    New here?{" "}
                    <Link to="/auth/register" className="text-primary font-bold hover:underline">
                        Create an Account
                    </Link>
                </p>

                {/* Demo Access Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button type="button" onClick={() => handleDemoLogin('user')} className="btn btn-outline btn-sm normal-case">
                        <FiUser /> Demo User
                    </button>
                    <button type="button" onClick={() => handleDemoLogin('admin')} className="btn btn-outline btn-sm normal-case">
                        <FiShield /> Demo Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="label text-sm font-bold opacity-70">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                            })}
                            className={`input input-bordered w-full ${errors.email ? 'border-error' : 'border-base-300'}`}
                            placeholder="mail@example.com"
                        />
                        {/* Validation Error Message */}
                        {errors.email && <p className="text-error text-xs mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="label text-sm font-bold opacity-70">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" }
                            })}
                            className={`input input-bordered w-full pr-10 ${errors.password ? 'border-error' : 'border-base-300'}`}
                            placeholder="••••••••"
                        />
                        <span className="absolute right-3 top-11 text-base-content/40 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </span>
                        {/* Validation Error Message */}
                        {errors.password && <p className="text-error text-xs mt-1 font-medium">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full shadow-lg shadow-primary/20">
                        Sign In
                    </button>

                    <SocialLogin />
                </form>
            </div>
        </div>
    );
};

export default Login;