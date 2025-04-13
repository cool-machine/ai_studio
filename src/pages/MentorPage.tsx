import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, Award } from 'lucide-react';

const MentorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    graduationYear: '',
    company: '',
    role: '',
    expertise: '',
    experience: '',
    motivation: '',
    timeCommitment: 'monthly',
    linkedIn: '',
    agreeToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log('Mentor application submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div>
      <Hero
        title="Become a Mentor"
        subtitle="Share your expertise and help shape the future of AI innovation."
        backgroundImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Why Become a Mentor?"
                subtitle="Make a meaningful impact while staying at the cutting edge of AI innovation."
              />
              <p className="text-neutral mb-6">
                As a mentor in our Give Back program, you'll be matched with an early-stage AI startup that can benefit from your industry expertise and business acumen. This is a rewarding opportunity to:
              </p>
              <ul className="space-y-3 text-neutral mb-6">
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Guide entrepreneurs through critical business challenges</span>
                </li>
                <li className="flex items-start">
                  <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Stay at the forefront of AI innovation</span>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Expand your professional network</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Flexible time commitment (typically 1-2 hours per month)</span>
                </li>
              </ul>
              <p className="text-neutral">
                Our mentors are experienced professionals who bring valuable insights from their careers in technology, business, finance, healthcare, and other industries. Your expertise can help shape the next generation of AI solutions.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Mentorship session"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <SectionHeading
            title="Mentor Application"
            subtitle="Apply to join our network of mentors supporting AI startups."
            centered={true}
          />

          <div className="max-w-3xl mx-auto mt-12">
            {submitted ? (
              <motion.div 
                className="bg-white rounded-lg shadow-md p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Thank You for Applying!</h3>
                <p className="text-neutral mb-6">
                  We've received your application to become a mentor. Our team will review your information and get back to you within 5-7 business days.
                </p>
                <p className="text-neutral">
                  If you have any questions in the meantime, please contact us at <a href="mailto:mentors@whartonaistudio.org" className="text-primary hover:text-primary-dark">mentors@whartonaistudio.org</a>.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white rounded-lg shadow-md p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-neutral-dark font-medium mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-neutral-dark font-medium mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label htmlFor="graduationYear" className="block text-neutral-dark font-medium mb-1">
                        Wharton Graduation Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="graduationYear"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="linkedIn" className="block text-neutral-dark font-medium mb-1">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        id="linkedIn"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="mb-4">
                      <label htmlFor="company" className="block text-neutral-dark font-medium mb-1">
                        Current Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="role" className="block text-neutral-dark font-medium mb-1">
                        Current Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="expertise" className="block text-neutral-dark font-medium mb-1">
                      Areas of Expertise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Machine Learning, Healthcare AI, Product Management"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="experience" className="block text-neutral-dark font-medium mb-1">
                      Relevant Experience <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Briefly describe your experience with AI, startups, or mentoring."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="motivation" className="block text-neutral-dark font-medium mb-1">
                      Why do you want to be a mentor? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="timeCommitment" className="block text-neutral-dark font-medium mb-1">
                      Preferred Time Commitment <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="timeCommitment"
                      name="timeCommitment"
                      value={formData.timeCommitment}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="monthly">Monthly (1-2 hours)</option>
                      <option value="biweekly">Bi-weekly (2-4 hours)</option>
                      <option value="weekly">Weekly (4+ hours)</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-neutral">
                        I agree to the <a href="#" className="text-primary hover:text-primary-dark">Mentor Program Terms</a> and understand that my information will be used to match me with appropriate startups.
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white w-full">
                    Submit Application
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorPage;