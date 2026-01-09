import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";

// React Icons
import { FiMenu, FiHome, FiPlusCircle, FiHeart, FiUser } from "react-icons/fi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";



const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Sync theme with document attribute
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        // daisyUI looks for the data-theme attribute on the html element
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    // Apply saved theme on app load
    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    //   user logout
    const handleLogOut = () => logOut().catch(() => { });

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
                        {/* Toggle Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>

                    <div className="flex justify-between items-center w-full px-4">
                        <div className="text-xl font-semibold">Digital Life Lessons</div>

                        <div className="flex items-center gap-2">
                            {/* theme controller */}
                            <label className="relative inline-flex items-center cursor-pointer group">
                                {/* Hidden Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={theme === 'dark'}
                                    onChange={handleToggle}
                                    className="sr-only"
                                />

                                {/* Toggle Track */}
                                <div className={`w-14 h-7 rounded-full shadow-inner transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-base-300'
                                    }`}></div>

                                {/* Toggle Thumb */}
                                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-7.5' : 'translate-x-0.5'
                                    }`}>

                                    {/* Sun Icon (Visible in Light Mode) */}
                                    <svg
                                        aria-label="sun"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className={`absolute w-4 h-4 text-yellow-500 transition-all duration-300 ${theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                            }`}
                                    >
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="4"></circle>
                                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                                        </g>
                                    </svg>

                                    {/* Moon Icon (Visible in Dark Mode) */}
                                    <svg
                                        aria-label="moon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className={`absolute w-4 h-4 text-blue-400 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                                            }`}
                                    >
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                                        </g>
                                    </svg>
                                </div>
                            </label>

                            <div className="tooltip tooltip-left" data-tip={user?.displayName}>
                                <img
                                    src={user?.photoURL}
                                    alt="User"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    referrerPolicy="no-referrer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-xl p-3 z-20 transition-colors">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100">{user?.displayName}</p>
                                        <div className="divider my-1"></div>
                                        <button
                                            onClick={handleLogOut}
                                            className="btn btn-sm btn-outline w-full mt-2"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <div>
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <ul className="menu w-full grow px-2">
                        <Link to="/">
                            <img
                                src="https://i.ibb.co.com/5WQymhQv/images-removebg-preview.png"
                                alt=""
                            />
                        </Link>

                        {/* USER MENU */}
                        {role === "user" && (
                            <>
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Dashboard Home"
                                    >
                                        <FiHome className="text-lg" />
                                        <span className="is-drawer-close:hidden">Dashboard Home</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/add-lesson"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Add Lesson"
                                    >
                                        <FiPlusCircle className="text-lg" />
                                        <span className="is-drawer-close:hidden">Add Lesson</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/my-lessons"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="My Lessons"
                                    >
                                        <MdOutlineLibraryBooks className="text-xl" />
                                        <span className="is-drawer-close:hidden">My Lessons</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/my-favorites"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Favorites"
                                    >
                                        <FiHeart className="text-lg" />
                                        <span className="is-drawer-close:hidden">My Favorites</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/profile"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Profile"
                                    >
                                        <FiUser className="text-lg" />
                                        <span className="is-drawer-close:hidden">Profile</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* ADMIN MENU */}
                        {role === "admin" && (
                            <>
                                <div className="divider is-drawer-close:hidden">Admin Panel</div>

                                <li>
                                    <NavLink
                                        to="/dashboard/admin"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Admin Home"
                                    >
                                        <FiHome className="text-lg" />
                                        <span className="is-drawer-close:hidden">Admin Home</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/admin/manage-users"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Manage Users"
                                    >
                                        <AiOutlineUsergroupAdd className="text-xl" />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/admin/manage-lessons"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Manage Lessons"
                                    >
                                        <MdOutlineLibraryBooks className="text-xl" />
                                        <span className="is-drawer-close:hidden">Manage Lessons</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/admin/reported-lessons"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Reported Lessons"
                                    >
                                        <HiOutlineExclamationTriangle className="text-xl" />
                                        <span className="is-drawer-close:hidden">Reported Lessons</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/dashboard/admin/profile"
                                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                        data-tip="Admin Profile"
                                    >
                                        <FiUser className="text-lg" />
                                        <span className="is-drawer-close:hidden">Admin Profile</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;