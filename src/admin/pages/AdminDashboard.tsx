import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Rocket, 
  BookOpen, 
  Users, 
  Handshake, 
  FileText, 
  TrendingUp, 
  Eye, 
  Clock, 
  Mail 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { events } from '../../data/events';
import { startups } from '../../data/startups';
import { resources } from '../../data/resources';
import { teamMembers } from '../../data/team';
import { partners } from '../../data/partners';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const upcomingEvents = events.filter(event => event.type === 'upcoming');
  
  // Get current date for the greeting
  const currentHour = new Date().getHours();
  let greeting = 'Good morning';
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else if (currentHour >= 18) {
    greeting = 'Good evening';
  }

  return (
    <div>
      <div className="mb-6">
        <motion.h1 
          className="text-2xl font-bold text-neutral-dark mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {greeting}, {user?.name}
        </motion.h1>
        <motion.p 
          className="text-neutral"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome to your admin dashboard. Here's an overview of your site.
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Events" 
          value={events.length.toString()} 
          icon={<Calendar className="h-6 w-6 text-primary" />}
          link="/admin/events"
          delay={0.1}
        />
        <StatsCard 
          title="Startups" 
          value={startups.length.toString()} 
          icon={<Rocket className="h-6 w-6 text-primary" />}
          link="/admin/startups"
          delay={0.2}
        />
        <StatsCard 
          title="Resources" 
          value={resources.length.toString()} 
          icon={<BookOpen className="h-6 w-6 text-primary" />}
          link="/admin/resources"
          delay={0.3}
        />
        <StatsCard 
          title="Team Members" 
          value={teamMembers.length.toString()} 
          icon={<Users className="h-6 w-6 text-primary" />}
          link="/admin/team"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-dark">Upcoming Events</h2>
            <Link to="/admin/events" className="text-primary hover:text-primary-dark text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.slice(0, 3).map((event) => {
                const eventDate = new Date(event.date);
                return (
                  <div key={event.id} className="flex items-start">
                    <div className="bg-primary-light p-2 rounded-md mr-3">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-dark">{event.title}</h3>
                      <p className="text-sm text-neutral">
                        {eventDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-neutral">No upcoming events.</p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-neutral-dark mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/events"
              className="flex flex-col items-center p-3 bg-primary-light rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              <Calendar className="h-6 w-6 mb-1" />
              <span className="text-sm">Add Event</span>
            </Link>
            <Link
              to="/admin/startups"
              className="flex flex-col items-center p-3 bg-primary-light rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              <Rocket className="h-6 w-6 mb-1" />
              <span className="text-sm">Add Startup</span>
            </Link>
            <Link
              to="/admin/resources"
              className="flex flex-col items-center p-3 bg-primary-light rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              <BookOpen className="h-6 w-6 mb-1" />
              <span className="text-sm">Add Resource</span>
            </Link>
            <Link
              to="/admin/pages"
              className="flex flex-col items-center p-3 bg-primary-light rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              <FileText className="h-6 w-6 mb-1" />
              <span className="text-sm">Add Page</span>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 col-span-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-neutral-dark mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-dark">New page view</h3>
                <p className="text-sm text-neutral">Home page - 5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-dark">New newsletter signup</h3>
                <p className="text-sm text-neutral">user@example.com - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-md mr-3">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-dark">Event registration</h3>
                <p className="text-sm text-neutral">AI in Finance - 1 day ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partners Section */}
      <motion.div 
        className="mt-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-dark">Partners</h2>
          <Link to="/admin/partners" className="text-primary hover:text-primary-dark text-sm">
            Manage Partners
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {partners.slice(0, 5).map((partner) => (
            <div key={partner.id} className="flex flex-col items-center p-3 border rounded-md">
              <div className="h-12 w-12 mb-2 overflow-hidden">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-center">{partner.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  link: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, link, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link to={link} className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral mb-1">{title}</p>
            <p className="text-2xl font-bold text-neutral-dark">{value}</p>
          </div>
          <div className="bg-primary-light p-3 rounded-full">
            {icon}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AdminDashboard;