import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { Mail, Calendar, Rocket, BookOpen, Users } from 'lucide-react';

const NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log('Newsletter signup:', { name, email });
    setSubmitted(true);
  };

  const recentNewsletters = [
    {
      id: '1',
      title: 'AI Trends for Q3 2025',
      date: 'August 2025',
      description: 'Exploring the latest developments in generative AI and their implications for business.',
      link: '#'
    },
    {
      id: '2',
      title: 'Spotlight: Alumni AI Startups',
      date: 'July 2025',
      description: 'Featuring success stories from Wharton alumni who have founded innovative AI companies.',
      link: '#'
    },
    {
      id: '3',
      title: 'Event Recap: AI in Finance Symposium',
      date: 'June 2025',
      description: 'Highlights and key takeaways from our recent symposium on AI applications in financial services.',
      link: '#'
    }
  ];

  return (
    <div>
      <Hero
        title="Newsletter"
        subtitle="Stay updated with the latest news, events, and insights from the Wharton Alumni AI Studio."
        backgroundImage="https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Subscribe to Our Newsletter"
                subtitle="Get monthly updates delivered directly to your inbox."
              />
              <p className="text-neutral mb-6">
                Our newsletter keeps you informed about:
              </p>
              <ul className="space-y-3 text-neutral mb-6">
                <li className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Upcoming events and networking opportunities</span>
                </li>
                <li className="flex items-start">
                  <Rocket className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Featured AI startups from our community</span>
                </li>
                <li className="flex items-start">
                  <BookOpen className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Insightful articles and resources on AI</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Opportunities to get involved with our initiatives</span>
                </li>
              </ul>
            </div>
            <div>
              {submitted ? (
                <motion.div 
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Mail className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You for Subscribing!</h3>
                  <p className="text-green-700 mb-4">
                    You've been added to our newsletter. Look out for our next issue in your inbox!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                    }}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  className="bg-white rounded-lg shadow-md p-6 md:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-neutral-dark font-medium mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-neutral-dark font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 mr-2"
                        />
                        <span className="text-sm text-neutral">
                          I agree to receive the Wharton Alumni AI Studio newsletter and understand that I can unsubscribe at any time.
                        </span>
                      </label>
                    </div>
                    <button type="submit" className="btn bg-primary hover:bg-primary-dark text-white w-full">
                      Subscribe to Newsletter
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <SectionHeading
            title="Recent Newsletters"
            subtitle="Catch up on what you've missed in our previous newsletters."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {recentNewsletters.map((newsletter, index) => (
              <motion.div
                key={newsletter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    <span className="text-sm text-neutral">{newsletter.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{newsletter.title}</h3>
                  <p className="text-neutral mb-4">{newsletter.description}</p>
                  <a href={newsletter.link} className="text-primary hover:text-primary-dark font-medium">
                    Read Newsletter →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsletterPage;