import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { Menu, X } from 'lucide-react'; // npm install lucide-react

import RoleBased from './RoleBased';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-indigo-600 text-2xl font-bold tracking-wide">
          JobBoard
        </Link>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-700 hover:text-indigo-600 transition">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-sm text-slate-700">
          {user ? (
            <>
              <span className="font-medium text-slate-800">
                {user.email} <span className="text-xs text-slate-500">({user.role})</span>
              </span>
              <NavLink to="/jobs" className="text-indigo-600 text-l font-bold tracking-wide">
                Jobs
              </NavLink>
              <RoleBased roles={['admin', 'recruiter']}>
                <NavLink to="/dashboard" className="text-indigo-600 text-l font-bold tracking-wide">
                  Dashboard
                </NavLink>
              </RoleBased>
              <button
                onClick={logoutHandler}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-indigo-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 text-slate-700 space-y-2">
          {user ? (
            <>
              <div className="font-medium">
                {user.email} <span className="text-xs text-slate-500">({user.role})</span>
              </div>
              <button
                onClick={logoutHandler}
                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-indigo-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-indigo-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;