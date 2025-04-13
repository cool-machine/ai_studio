import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '../data/navigation';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-dark-lighter shadow-md py-2' : 'bg-white dark:bg-dark-lighter shadow-sm py-4'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-16 w-auto"
            >
              <img 
                src="/wharton.png" 
                alt="Wharton Alumni AI Studio Logo" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23011F5B'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EAI%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='30' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EWharton%3C/text%3E%3C/svg%3E";
                }}
              />
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-primary dark:text-white"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Wharton Alumni AI Studio
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.children ? (
                  <div className="flex items-center cursor-pointer nav-link dark:text-white">
                    <span>{item.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      isActive 
                        ? 'nav-link-active dark:text-white' 
                        : 'nav-link dark:text-gray-300 dark:hover:text-white'
                    }
                  >
                    {item.name}
                  </NavLink>
                )}

                {item.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-dark-lighter rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.path}
                        className={({ isActive }) => 
                          `block px-4 py-2 text-sm ${
                            isActive 
                              ? 'text-primary dark:text-white bg-primary-light dark:bg-primary/20' 
                              : 'text-neutral-dark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              className="text-neutral-dark dark:text-white hover:text-primary dark:hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-dark-lighter border-t dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-custom py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-left py-2 nav-link dark:text-white"
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.name && (
                          <motion.div 
                            className="pl-4 mt-2 space-y-2 border-l-2 border-primary-light dark:border-primary/20"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.children.map((child) => (
                              <NavLink
                                key={child.name}
                                to={child.path}
                                className={({ isActive }) => 
                                  `block py-2 ${
                                    isActive 
                                      ? 'text-primary dark:text-white' 
                                      : 'text-neutral-dark dark:text-gray-300'
                                  }`
                                }
                                onClick={closeMenu}
                              >
                                {child.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `block py-2 ${
                          isActive 
                            ? 'text-primary dark:text-white font-medium' 
                            : 'text-neutral-dark dark:text-gray-300'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;