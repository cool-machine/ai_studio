import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { Calendar, Users, Edit, Globe } from 'lucide-react';

const VolunteerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    graduationYear: '',
    interests: [] as string[],
    skills: '',
    availability: '',
    motivation: '',
    agreeToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      
      if (name === 'agreeToTerms') {
        setFormData(prev => ({
          ...prev,
          [name]: isChecked
        }));
      } else {
        // Handle interests checkboxes
        setFormData(prev => {
          const updatedInterests = [...prev.interests];
          
          if (isChecked) {
            updatedInterests.push(value);
          } else {
            const index = updatedInterests.indexOf(value);
            if (index > -1) {
              updatedInterests.splice(index, 1);
            }
          }
          
          return {
            ...prev,
            interests: updatedInterests
          };
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log('Volunteer application submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div>
      <Hero
        title="Volunteer Opportunities"
        subtitle="Help build and grow the Wharton Alumni AI Studio community."
        backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Volunteer with Us"
                subtitle="There are many ways to contribute to our community."
              />
              <p className="text-neutral mb-6">
                The Wharton Alumni AI Studio is powered by volunteers who are passionate about AI and committed to fostering connections within our community. By volunteering, you can:
              </p>
              <ul className="space-y-3 text-neutral mb-6">
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Help organize and run events, both virtual and in-person</span>
                </li>
                <li className="flex items-start">
                  <Edit className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Create content for our newsletter, website, and social media</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Support our mentorship program and startup community</span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Represent the Wharton Alumni AI Studio at industry events</span>
                </li>
              </ul>
              <p className="text-neutral">
                Volunteering is a great way to expand your network, develop new skills, and stay connected with the Wharton community while making a meaningful impact.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Volunteers working together"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <SectionHeading
            title="Volunteer Application"
            subtitle="Join our team of dedicated volunteers."
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
                <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Thank You for Volunteering!</h3>
                <p className="text-neutral mb-6">
                  We've received your application to volunteer with the Wharton Alumni AI Studio. Our team will review your information and get back to you within 5-7 business days.
                </p>
                <p className="text-neutral">
                  If you have any questions in the meantime, please contact us at <a href="mailto:volunteer@whartonaistudio.org" className="text-primary hover:text-primary-dark">volunteer@whartonaistudio.org</a>.
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
                    <label className="block text-neutral-dark font-medium mb-1">
                      Areas of Interest <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value="events"
                          checked={formData.interests.includes('events')}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Event Organization</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value="content"
                          checked={formData.interests.includes('content')}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Content Creation</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value="mentorship"
                          checked={formData.interests.includes('mentorship')}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Mentorship Program</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value="outreach"
                          checked={formData.interests.includes('outreach')}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Community Outreach</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value="social"
                          checked={formData.interests.includes('social')}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Social Media</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value="other"
                          checked={formData.interests.includes('other')}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Other</span>
                      </label>
                    </div>
                    {formData.interests.length === 0 && (
                      <p className="text-sm text-red-500 mt-1">Please select at least one area of interest</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="skills" className="block text-neutral-dark font-medium mb-1">
                      Relevant Skills <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Describe any skills or experience you have that would be valuable for volunteering (e.g., event planning, writing, social media, etc.)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="availability" className="block text-neutral-dark font-medium mb-1">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your availability</option>
                      <option value="1-2 hours per week">1-2 hours per week</option>
                      <option value="3-5 hours per week">3-5 hours per week</option>
                      <option value="5+ hours per week">5+ hours per week</option>
                      <option value="Event-based only">Event-based only</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="motivation" className="block text-neutral-dark font-medium mb-1">
                      Why do you want to volunteer? <span className="text-red-500">*</span>
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
                        I agree to the <a href="#" className="text-primary hover:text-primary-dark">Volunteer Program Terms</a> and understand that my information will be used to match me with appropriate volunteer opportunities.
                      </span>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn bg-primary hover:bg-primary-dark text-white w-full"
                    disabled={formData.interests.length === 0}
                  >
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

export default VolunteerPage;