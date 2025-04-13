import React from 'react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { events } from '../data/events';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UpcomingEventsPage: React.FC = () => {
  const upcomingEvents = events.filter(event => event.type === 'upcoming');

  return (
    <div>
      <Hero
        title="Upcoming Events"
        subtitle="Join us for these exciting opportunities to learn and connect."
        backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex border-b border-gray-200 mb-10">
            <Link
              to="/events/upcoming"
              className="py-3 px-6 font-medium text-lg border-b-2 border-primary text-primary"
            >
              Upcoming Events
            </Link>
            <Link
              to="/events/past"
              className="py-3 px-6 font-medium text-lg border-b-2 border-transparent text-neutral hover:text-primary"
            >
              Past Events
            </Link>
            <Link
              to="/events"
              className="py-3 px-6 font-medium text-lg border-b-2 border-transparent text-neutral hover:text-primary"
            >
              All Events
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
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
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Want to Stay Updated?</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter to receive notifications about upcoming events and opportunities.
          </p>
          <Link to="/get-involved/newsletter" className="btn btn-primary">
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UpcomingEventsPage;