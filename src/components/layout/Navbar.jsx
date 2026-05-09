import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiSettings, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { toggleSettingsPanel } from '../../store/slices/settingsSlice';
import MegaMenu from './MegaMenu';

const navItems = [
  { name: 'Lesson Plans', path: '/lesson-plans', hasMegaMenu: true },
  { name: 'Warm-Ups', path: '/warm-ups', hasMegaMenu: true },
  { name: 'Exercises', path: '/exercises', hasMegaMenu: true },
  { name: 'Textbooks', path: '/textbooks', hasMegaMenu: true },
  { name: 'Assessments', path: '/assessments', hasMegaMenu: true },
];

const Navbar = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = (name) => {
    setActiveMegaMenu(name);
  };

  const handleMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white dark:text-zinc-900 font-bold text-lg">W</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">warmedia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 h-full">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="h-full flex items-center"
                onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  to={item.path}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {item.name}
                  {item.hasMegaMenu && <FiChevronDown className={`transition-transform ${activeMegaMenu === item.name ? 'rotate-180' : ''}`} />}
                </Link>
                {item.hasMegaMenu && (
                  <MegaMenu 
                    category={item.name} 
                    isOpen={activeMegaMenu === item.name} 
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <FiSearch size={20} />
            </button>
            <button 
              onClick={() => dispatch(toggleSettingsPanel())}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <FiSettings size={20} />
            </button>
            <Link to="/login" className="flex items-center gap-2 pl-4 border-l border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <FiUser size={18} />
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
             <button 
                onClick={() => dispatch(toggleSettingsPanel())}
                className="p-2 text-zinc-500"
              >
                <FiSettings size={20} />
              </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-600 dark:text-zinc-300"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="block px-4 py-3 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
               <Link to="/login" className="flex items-center gap-2 px-4 py-3 text-zinc-600 dark:text-zinc-300">
                <FiUser size={18} />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
