import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-neutral-900 shadow-md py-2'
          : 'bg-neutral-900/80 backdrop-blur-sm py-4'
        }
        text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-300 bg-clip-text text-transparent">
            Agent Management
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-1">
            {userInfo ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${location.pathname === '/dashboard'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${location.pathname.includes('/agents')
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${location.pathname === '/upload'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Upload CSV
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="px-3 py-2 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
                  >
                    Logout
                  </button>
                </li>

              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${location.pathname === '/login'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${location.pathname === '/register'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Register
                  </Link>
                </li>

              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-neutral-200 hover:bg-neutral-800 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-neutral-900 shadow-lg">
          <ul className="px-4 py-2 space-y-1">
            {userInfo ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${location.pathname === '/dashboard'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${location.pathname.includes('/agents')
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${location.pathname === '/upload'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Upload CSV
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${location.pathname === '/login'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${location.pathname === '/register'
                        ? 'bg-primary-900 text-primary-300'
                        : 'text-neutral-200 hover:bg-neutral-800'
                      }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
