import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, MessageSquare } from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import StartupCard from '../components/StartupCard';
import { startups } from '../data/startups';

const StartupCommunityPage: React.FC = () => {
  const featuredStartups = startups.slice(0, 3);

  return (
    <div>
      <Hero
        title="Startup Community"
        subtitle="Connecting early-stage AI startups with experienced Wharton alumni for mentorship and growth."
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Give Back Program"
                subtitle="Experienced alumni helping early-stage startups find their product-market fit."
              />
              <p className="text-neutral mb-6">
                Our Give Back program matches tech startups at the very early stage with experienced Wharton alumni who are industry experts. These mentors volunteer their time to help startups find the best possible product-market fit, while gaining valuable insights into emerging AI-based products.
              </p>
              <p className="text-neutral mb-6">
                This mutually beneficial relationship helps startups accelerate their growth while keeping our alumni network at the cutting edge of AI innovation.
              </p>
              <Link to="/startup-community/give-back" className="btn btn-primary">
                Learn More
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
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
            title="How It Works"
            subtitle="Our structured approach ensures valuable outcomes for both startups and mentors."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Application</h3>
              <p className="text-neutral">
                Startups apply to the program, providing details about their product, target market, and specific challenges they're facing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Matching</h3>
              <p className="text-neutral">
                We carefully match startups with alumni mentors who have relevant industry experience and expertise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-neutral">
                Startups and mentors work together over a 3-month period, with structured check-ins and goal-setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <SectionHeading
              title="Featured Startups"
              subtitle="Meet some of the innovative AI startups in our community."
            />
            <Link to="/startup-community/startups" className="hidden md:flex items-center text-primary hover:text-primary-dark">
              View All Startups <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStartups.map(startup => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/startup-community/startups" className="btn btn-outline">
              View All Startups
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-secondary-light">
        <div className="container-custom">
          <SectionHeading
            title="Benefits"
            subtitle="Our program creates value for both startups and mentors."
            centered={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-primary-light p-3 rounded-full mr-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">For Startups</h3>
              </div>
              <ul className="space-y-3 text-neutral">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Access to industry expertise and domain knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Guidance on product-market fit and go-to-market strategy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Connections to potential customers and partners</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Feedback from experienced professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Opportunity to showcase at Wharton Alumni AI Studio events</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-primary-light p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">For Mentors</h3>
              </div>
              <ul className="space-y-3 text-neutral">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Exposure to cutting-edge AI technologies and applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Opportunity to give back to the entrepreneurial community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Expand professional network with innovative founders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Stay current with emerging trends in AI</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-2">•</span>
                  <span>Recognition within the Wharton alumni community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Participate?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a startup looking for guidance or an alum wanting to mentor, we'd love to have you join our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/get-involved" className="btn bg-white text-primary hover:bg-gray-100">
              Apply as a Startup
            </Link>
            <Link to="/get-involved/mentor" className="btn bg-transparent border border-white text-white hover:bg-white hover:text-primary">
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupCommunityPage;