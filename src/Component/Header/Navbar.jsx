import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FiMoon, FiSun, FiUser, FiLogOut, FiLayout } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Sync theme with daisyUI and HTML class
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogOut = () => logOut().catch(() => { });

  // Fetch user info and role
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/premium/${user.email}`)
      .then(res => setUserInfo(res.data))
      .catch(err => console.error(err));

    axiosSecure.get(`/users/role/${user.email}`)
      .then(res => setRole(res.data.role))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  const linkStyle = ({ isActive }) =>
    `relative px-1 py-1 transition-all duration-300 hover:text-primary ${
      isActive 
        ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full' 
        : 'text-base-content/70 font-medium'
    }`;

  const navLinks = (
    <>
      <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
      <li><NavLink to="/public-lessons" className={linkStyle}>Lessons</NavLink></li>
      <li><NavLink to="/about" className={linkStyle}>About</NavLink></li>
      {user && (
        <li>
          <NavLink to={role === "admin" ? "/dashboard/admin/home" : "/dashboard/user/home"} className={linkStyle}>
            Dashboard
          </NavLink>
        </li>
      )}

      <li><NavLink to="/faq" className={linkStyle}>FAQ</NavLink></li>
      <li><NavLink to="/privacy" className={linkStyle}>Privacy Policy</NavLink></li>
      <li><NavLink to="/Terms-Conditions" className={linkStyle}>Terms & Conditions</NavLink></li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/70 backdrop-blur-xl border-b border-base-200">
      
      {/* --- Navbar Start: Mobile Menu & Logo --- */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-52 gap-2 border border-base-200">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-full transition-transform group-hover:rotate-[360deg] duration-700" />
          <span className="hidden md:block font-black text-xl tracking-tighter text-base-content">
            DIGITAL<span className="text-primary">LIFE</span>
          </span>
        </Link>
      </div>

      {/* --- Navbar Center: Desktop Links --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-8 px-1">
          {navLinks}
        </ul>
      </div>

      {/* --- Navbar End: Actions & Profile --- */}
      <div className="navbar-end gap-3">
        
        {/* Upgrade / Premium Badge */}
        <div className="hidden sm:block">
          {userInfo?.isPremium ? (
            <span className="badge badge-warning badge-outline font-bold gap-1 px-3 py-3">
              <span className="text-xs">PREMIUM</span> ⭐
            </span>
          ) : (
            <Link to="/dashboard/pricing" className="btn btn-warning btn-sm rounded-full px-5 shadow-sm hover:shadow-warning/20 border-none group">
              Upgrade
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
            </Link>
          )}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-lg hover:bg-base-200">
          {theme === 'light' ? <FiMoon /> : <FiSun className="text-yellow-400" />}
        </button>

        {/* User Dropdown */}
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/auth/login" className="btn btn-ghost btn-sm rounded-lg hidden sm:flex">Login</Link>
            <Link to="/auth/register" className="btn btn-primary btn-sm rounded-lg shadow-md shadow-primary/20">Signup</Link>
          </div>
        ) : (
          <div className="relative">
            <div 
              className="avatar cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} alt="Profile" />
              </div>
            </div>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-4 w-64 bg-base-100 border border-base-200 shadow-2xl rounded-2xl p-4 z-20 animate-in fade-in zoom-in duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user?.photoURL} alt="User" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm truncate">{user?.displayName}</p>
                      <p className="text-[10px] opacity-50 truncate tracking-widest uppercase">{role || 'User'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Link to={role === 'admin' ? '/dashboard/admin/profile' : '/dashboard/profile'} className="btn btn-ghost btn-sm justify-start gap-3 rounded-lg text-sm font-medium">
                      <FiUser className="text-primary" /> My Profile
                    </Link>
                    <Link to="/dashboard" className="btn btn-ghost btn-sm justify-start gap-3 rounded-lg text-sm font-medium">
                      <FiLayout className="text-primary" /> Dashboard
                    </Link>
                    <div className="divider my-1 opacity-50"></div>
                    <button onClick={handleLogOut} className="btn btn-error btn-outline btn-sm gap-3 rounded-lg mt-1">
                      <FiLogOut /> Log Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;