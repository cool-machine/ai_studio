import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import StartupCard from '../components/StartupCard';
import { startups } from '../data/startups';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StartupsPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="AI Startups"
        subtitle="Discover innovative AI startups founded or supported by our Wharton alumni community."
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Our Startup Community"
            subtitle="Meet the innovative AI startups that are part of our Wharton Alumni AI Studio network."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {startups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StartupCard startup={startup} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Join Our Startup Community"
                subtitle="Are you a founder working on an AI startup?"
              />
              <p className="text-neutral mb-6">
                If you're a Wharton alum working on an AI startup, we'd love to feature your company in our community. Being part of our network gives you access to:
              </p>
              <ul className="space-y-3 text-neutral mb-6">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Mentorship from experienced industry experts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Networking opportunities with other founders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Visibility within the Wharton alumni community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Potential connections to investors and partners</span>
                </li>
              </ul>
              <Link to="/get-involved" className="btn btn-primary">
                Apply to Join
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Startup team meeting"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Looking for Mentorship?</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto mb-8">
            Our Give Back program connects early-stage AI startups with experienced Wharton alumni mentors who can help guide your growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/startup-community/give-back" className="btn btn-primary">
              Learn About Give Back Program
            </Link>
            <Link to="/get-involved/mentor" className="btn btn-outline">
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupsPage;