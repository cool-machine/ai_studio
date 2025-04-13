import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Rocket, 
  BookOpen, 
  Users, 
  Handshake, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const navItems = [
    { path: '/admin', name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/events', name: 'Events', icon: <Calendar className="h-5 w-5" /> },
    { path: '/admin/startups', name: 'Startups', icon: <Rocket className="h-5 w-5" /> },
    { path: '/admin/resources', name: 'Resources', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/admin/team', name: 'Team', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/partners', name: 'Partners', icon: <Handshake className="h-5 w-5" /> },
    { path: '/admin/pages', name: 'Pages', icon: <FileText className="h-5 w-5" /> },
    { path: '/admin/settings', name: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-primary text-white hover:bg-primary-dark"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
            <div className="fixed inset-y-0 left-0 w-64 bg-primary text-white overflow-y-auto">
              <div className="p-4 border-b border-primary-dark">
                <div className="flex items-center justify-center">
                  <img 
                    src="/wharton.png" 
                    alt="Wharton Alumni AI Studio" 
                    className="h-10 w-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23011F5B'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EAI%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='30' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EWharton%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <span className="ml-2 text-lg font-semibold">Admin Panel</span>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) =>
                          `flex items-center p-2 rounded-md ${
                            isActive
                              ? 'bg-white text-primary'
                              : 'text-white hover:bg-primary-dark'
                          }`
                        }
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full p-2 rounded-md text-white hover:bg-primary-dark"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="ml-3">Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-primary text-white transition-all duration-300 hidden lg:block ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4 border-b border-primary-dark">
          <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {sidebarOpen && (
              <>
                <div className="flex items-center">
                  <img 
                    src="/wharton.png" 
                    alt="Wharton Alumni AI Studio" 
                    className="h-10 w-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23011F5B'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EAI%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='30' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EWharton%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <span className="ml-2 text-lg font-semibold">Admin</span>
                </div>
                <button onClick={toggleSidebar} className="text-white hover:text-gray-300">
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            )}
            {!sidebarOpen && (
              <button onClick={toggleSidebar} className="text-white hover:text-gray-300">
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md ${
                      isActive
                        ? 'bg-white text-primary'
                        : 'text-white hover:bg-primary-dark'
                    }`
                  }
                  title={!sidebarOpen ? item.name : undefined}
                >
                  {item.icon}
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 rounded-md text-white hover:bg-primary-dark"
                title={!sidebarOpen ? 'Logout' : undefined}
              >
                <LogOut className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-neutral-dark">Admin Dashboard</h1>
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"}
                  alt={user?.name || "User"}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden md:block">{user?.name}</span>
                {profileDropdownOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="p-2 border-b">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100 rounded-md"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 text-center text-sm text-gray-500 border-t">
          &copy; {new Date().getFullYear()} Wharton Alumni AI Studio Admin Panel
        </footer>
      </div>
    </div>
  );
};

// These components are defined here to avoid circular imports
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default AdminLayout;