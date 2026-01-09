import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState(null);
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

  // Logout
  const handleLogOut = () => logOut().catch(() => { });

  // Fetch user info once
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/premium/${user.email}`)
      .then(res => setUserInfo(res.data))
      .catch(err => console.error(err));

    axiosSecure.get(`/users/role/${user.email}`)
      .then(res => setRole(res.data.role))
      .catch(err => console.error(err));
  }, [user, axiosSecure]);

  // Active NavLink style
  const linkStyle = ({ isActive }) =>
    isActive
      ? 'font-semibold border-b-2 border-primary pb-1 drop-shadow-sm text-primary'
      : 'drop-shadow-sm text-base-content hover:text-primary transition-colors duration-200';

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/public-lessons" className={linkStyle}>Public Lessons</NavLink>
      </li>

      <li>
        {userInfo?.isPremium ? (
          <span className="ml-2 font-semibold text-warning">Premium ⭐</span>
        ) : (
          <NavLink
            to="/dashboard/pricing"
            className="relative inline-block px-5 py-2 font-semibold rounded-lg shadow-md text-center
                         bg-warning text-warning-content overflow-hidden transition-colors hover:opacity-90"
          >
            <span className="absolute inset-0 bg-warning/50 rounded-lg animate-pulse -z-10"></span>
            Upgrade
          </NavLink>
        )}
      </li>
    </>
  )


return (
  <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 shadow-sm transition-colors">

    {/* LEFT */}
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        {/* MOBILE MENU */}
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100/80 backdrop-blur-md rounded-box z-10 mt-3 w-52 p-2 shadow"
        >
          {navLinks}
          {!user && (
            <>
              <li><Link to="/auth/login">Login</Link></li>
              <li><Link to="/auth/register">Signup</Link></li>
            </>
          )}
        </ul>
      </div>

      <Link to="/">
        <img
          src="https://i.ibb.co.com/5WQymhQv/images-removebg-preview.png"
          alt="Logo"
          className="w-16 rounded-full"
        />
      </Link>
    </div>

    {/* CENTER */}
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {navLinks}
      </ul>
    </div>

    {/* RIGHT */}
    <div className="navbar-end flex items-center gap-2">
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

      {/* USER */}

      {!user && (
        <>
          <Link to="/auth/login" className="btn btn-outline rounded-xl">
            Login
          </Link>
          <Link to="/auth/register" className="btn btn-primary rounded-xl">
            Signup
          </Link>
        </>
      )}

      {user && (
        <div className="relative">
          <img
            src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/no-img.png"}
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer border border-base-300"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-base-100/80 backdrop-blur-lg shadow-lg rounded-xl p-3 z-20">
              <p className="font-semibold text-base-content">
                {user?.displayName}
              </p>

              <div className="divider my-1"></div>

              {role === "admin" ? (
                <Link className="btn btn-sm w-full" to="dashboard/admin/profile">
                  Profile
                </Link>
              ) : (
                <Link className="btn btn-sm w-full" to="dashboard/profile">
                  Profile
                </Link>
              )}

              <Link className="btn btn-sm w-full mt-1" to="/dashboard">
                Dashboard
              </Link>

              <button
                onClick={handleLogOut}
                className="btn btn-sm btn-outline w-full mt-2"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>

);
};

export default Navbar;
