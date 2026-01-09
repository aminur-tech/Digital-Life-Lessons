import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/');
            })
            .catch(error => console.log(error.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 transition-colors px-4">
            <div className="w-full max-w-md bg-base-200 backdrop-blur-lg
      shadow-2xl rounded-2xl p-8 border border-base-300">

                <h3 className="text-3xl font-extrabold text-center text-base-content">
                    Welcome Back 👋
                </h3>

                <p className="my-4 text-center text-base-content/70">
                    New here?{" "}
                    <Link
                        state={location.state}
                        to="/auth/register"
                        className="text-primary hover:underline"
                    >
                        Create an Account
                    </Link>
                </p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="label text-base-content">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="input input-bordered w-full
            bg-base-100 text-base-content border-base-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="label text-base-content">Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="input input-bordered w-full pr-10
            bg-base-100 text-base-content border-base-300"
                            placeholder="Enter your password"
                        />

                        <span
                            className="absolute right-3 top-9 text-base-content/60 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </span>
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            className="text-primary hover:underline text-sm"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button className="btn btn-primary w-full">
                        Login
                    </button>

                    <SocialLogin />
                </form>
            </div>
        </div>


    );
};

export default Login;
