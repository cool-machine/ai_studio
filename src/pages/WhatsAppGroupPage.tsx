import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Bell, Lock } from 'lucide-react';

const WhatsAppGroupPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="WhatsApp Group"
        subtitle="Join our community chat for real-time discussions and networking."
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Connect with Fellow Alumni"
                subtitle="Join our WhatsApp group for instant communication with the Wharton AI community."
              />
              <p className="text-neutral mb-6">
                Our WhatsApp group is a vibrant community where Wharton alumni interested in AI can:
              </p>
              <ul className="space-y-3 text-neutral mb-6">
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Engage in real-time discussions about AI trends and technologies</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Network with fellow alumni working in AI and related fields</span>
                </li>
                <li className="flex items-start">
                  <Bell className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Receive instant notifications about upcoming events and opportunities</span>
                </li>
                <li className="flex items-start">
                  <Lock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Participate in a private, moderated space exclusive to Wharton alumni</span>
                </li>
              </ul>
              <p className="text-neutral mb-6">
                To join our WhatsApp group, please click the button below to fill out a short form. Once verified as a Wharton alum, you'll receive an invitation link to join the group.
              </p>
            </div>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <a 
                  href="https://forms.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
                    alt="WhatsApp Logo"
                    className="w-48 h-48 object-contain mb-4"
                  />
                  <button className="btn bg-green-600 hover:bg-green-700 text-white w-full">
                    Join WhatsApp Group
                  </button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Group Guidelines</h3>
              <p className="text-neutral">
                Our WhatsApp group is moderated to ensure relevant, respectful discussions. Please keep conversations focused on AI, business, and professional networking.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Privacy</h3>
              <p className="text-neutral">
                Your privacy is important to us. Your contact information will only be visible to other group members and will not be shared with third parties.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Verification</h3>
              <p className="text-neutral">
                To maintain the quality of our community, we verify all members' Wharton affiliation before adding them to the group.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppGroupPage;