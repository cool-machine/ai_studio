import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary dark:bg-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 overflow-hidden rounded-md">
                <img 
                  src="/wharton.png" 
                  alt="Wharton Alumni AI Studio Logo" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23011F5B'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EAI%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='30' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EWharton%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span className="text-lg font-bold">Wharton Alumni AI Studio</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Connecting Wharton alumni to foster innovation and knowledge sharing in the AI space.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">Home</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">Events</Link>
              </li>
              <li>
                <Link to="/startup-community" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">Startup Community</Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">Get Involved</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">About Us</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">Resources</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <span className="text-gray-300 dark:text-gray-400">3730 Walnut Street, Philadelphia, PA 19104</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-2" />
                <a href="mailto:info@whartonaistudio.org" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">
                  info@whartonaistudio.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-2" />
                <a href="tel:+12155551234" className="text-gray-300 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary">
                  (215) 555-1234
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest events and opportunities.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-neutral-dark dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-lighter dark:border-gray-700"
              />
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-dark text-white py-2 rounded-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Wharton Alumni AI Studio. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-secondary dark:hover:text-secondary">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-secondary dark:hover:text-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;