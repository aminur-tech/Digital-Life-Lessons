import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";

// React Icons
import { FiMenu, FiHome, FiPlusCircle, FiHeart, FiUser, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { MdOutlineLibraryBooks, MdDashboard } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { IoReorderThreeOutline } from "react-icons/io5";

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleToggle = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleLogOut = () => logOut().catch(() => { });

    const navActiveClass = "bg-primary text-primary-content shadow-lg shadow-primary/20 scale-[1.02]";
    const navDefaultClass = "text-base-content/70 hover:bg-base-300 hover:text-base-content";

    return (
        <div className="drawer lg:drawer-open bg-base-100 font-sans">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col min-h-screen">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-100/70 backdrop-blur-xl sticky top-0 z-40 border-b border-base-200 px-4 py-3">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                            <IoReorderThreeOutline size={28} />
                        </label>
                    </div>

                    <div className="flex-1 px-2 mx-2">
                        <span className="text-xl font-black tracking-tighter text-primary bg-clip-text">
                            DIGITAL LIFE LESSONS
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={handleToggle}
                            className="btn btn-ghost btn-circle text-xl transition-transform hover:rotate-12"
                        >
                            {theme === 'light' ? <FiMoon /> : <FiSun className="text-yellow-400" />}
                        </button>

                        {/* User Profile */}
                        <div className="relative">
                            <div className="avatar cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition-transform">
                                    <img src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} alt="Profile" />
                                </div>
                            </div>

                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-4 w-64 bg-base-100 border border-base-200 shadow-2xl rounded-2xl p-4 z-20 animate-in fade-in zoom-in duration-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
                                                    <img src={user?.photoURL} alt="User" />
                                                </div>
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="font-bold text-base-content truncate">{user?.displayName}</p>
                                                <p className="text-xs opacity-60 truncate">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="divider my-0 opacity-50"></div>
                                        <button
                                            onClick={handleLogOut}
                                            className="btn btn-error btn-sm btn-outline w-full mt-4 flex items-center gap-2 rounded-xl"
                                        >
                                            <FiLogOut /> Log Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="p-6 md:p-10 flex-grow bg-base-200/30">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="w-72 min-h-full bg-base-100 border-r border-base-200 flex flex-col">
                    {/* Sidebar Header */}
                    <div className="p-6 flex items-center gap-3 border-b border-base-200">
                        <Link
                            to="/"
                            className="group flex items-center gap-3 px-2 py-1 transition-all duration-300 ease-in-out"
                        >
                            <div className="relative">
                                {/* Animated Ring Around Logo */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500"></div>

                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="relative mb-0 rounded-full w-11 h-11 object-cover border-2 border-base-100 shadow-sm transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className="text-xs font-medium uppercase tracking-widest text-base-content/50 group-hover:text-primary transition-colors">
                                    Back to
                                </span>
                                <span className="text-xl font-bold leading-none bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text group-hover:from-primary group-hover:to-primary/80 transition-all">
                                    Welcome
                                </span>
                            </div>
                        </Link>
                    </div>

                    <ul className="menu p-4 w-full gap-2 grow">
                        {/* USER MENU */}
                        {role === "user" && (
                            <>
                                <li className="menu-title opacity-50 text-xs font-bold uppercase mt-4 mb-2 tracking-widest">User Dashboard</li>
                                <li>
                                    <NavLink to="/dashboard/user/home" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <FiHome className="text-lg" /> Dashboard Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-lesson" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <FiPlusCircle className="text-lg" /> Add Lesson
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-lessons" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <MdOutlineLibraryBooks className="text-lg" /> My Lessons
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-favorites" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <FiHeart className="text-lg" /> My Favorites
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <FiUser className="text-lg" /> Profile
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ADMIN MENU */}
                        {role === "admin" && (
                            <>
                                <li className="menu-title opacity-50 text-xs font-bold uppercase mt-6 mb-2 tracking-widest text-secondary">Administrator</li>
                                <li>
                                    <NavLink to="/dashboard/admin/home" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <FiHome className="text-lg" /> Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <AiOutlineUsergroupAdd className="text-lg" /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/manage-lessons" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <MdOutlineLibraryBooks className="text-lg" /> Manage Lessons
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/reported-lessons" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <HiOutlineExclamationTriangle className="text-lg" /> Reported Lessons
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/profile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? navActiveClass : navDefaultClass}`}>
                                        <FiUser className="text-lg" /> Admin Profile
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-base-200">
                        <div className="bg-base-200/50 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {user?.displayName?.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate">{user?.displayName}</p>
                                <span className="badge badge-primary badge-outline badge-xs uppercase">{role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;