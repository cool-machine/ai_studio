import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import EventCard from '../components/EventCard';
import { events } from '../data/events';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingEvents = events.filter(event => event.type === 'upcoming');
  const pastEvents = events.filter(event => event.type === 'past');
  
  const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div>
      <Hero
        title="Events"
        subtitle="Join us for insightful discussions, workshops, and networking opportunities."
        backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex border-b border-gray-200 mb-10">
            <button
              className={`py-3 px-6 font-medium text-lg border-b-2 ${
                activeTab === 'upcoming'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral hover:text-primary'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
            </button>
            <button
              className={`py-3 px-6 font-medium text-lg border-b-2 ${
                activeTab === 'past'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral hover:text-primary'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
            </button>
            <Link
              to={activeTab === 'upcoming' ? '/events/upcoming' : '/events/past'}
              className="py-3 px-6 font-medium text-lg border-b-2 border-transparent text-neutral hover:text-primary ml-auto"
            >
              View All {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Events
            </Link>
          </div>

          {displayedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral text-lg">
                {activeTab === 'upcoming'
                  ? 'No upcoming events at the moment. Check back soon!'
                  : 'No past events to display.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Host an Event"
                subtitle="Are you a Wharton alum interested in hosting or speaking at one of our events?"
              />
              <p className="text-neutral mb-6">
                We're always looking for knowledgeable speakers and hosts for our events. If you have expertise in AI and would like to share your insights with our community, we'd love to hear from you.
              </p>
              <a href="/get-involved" className="btn btn-primary">
                Get in Touch
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Event speaker"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;