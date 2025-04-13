import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import { Link } from 'react-router-dom';

const GiveBackProgramPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="Give Back Program"
        subtitle="Connecting Wharton alumni expertise with AI innovation"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="AI Studio"
                subtitle="Our journey from 2020 to today"
              />
              <p className="text-neutral mb-6">
                The Wharton Alumni AI Studio was born in 2020 in collaboration with the Wharton Club of the UK, as an initiative aiming to strengthen the connection between Business Professionals, Domain Experts, and Researchers in Artificial Intelligence with a series of AI-focused events.
              </p>
              <p className="text-neutral mb-6">
                In 2023, we have launched Wharton AI Studio Expert Network, a community of professionals sharing an interest in the deep tech ecosystem.
              </p>
              <p className="text-neutral mb-6">
                Our purpose is to help Wharton Alumni to convert their business expertise into something valuable in the world of AI, create new projects and start-ups with AI professionals, participate in AI Studio think tanks and exchange about how the invaluable knowledge of Wharton Alumni can help the deep tech field.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Mentorship session"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                title="Our Vision"
                subtitle="Driving change through connection and collaboration"
              />
              <p className="text-neutral mb-6">
                AI Studio wants to go one step further and bring closer tech experts, industry professionals, investors, entrepreneurs and future leaders to exchange knowledge, capabilities, skills and ideas around how to disrupt current business models. We want to be a driving force of change, and believe we can do so by deepening connections between our like-minded Alumni.
              </p>
              <p className="text-neutral mb-6">
                Should you be interested in joining our community, please fill out the form at the link below so that we can include you in the community we are creating.
              </p>
              <p className="text-neutral mb-6 font-medium">
                George Gvishiani (founder of Wharton Studio AI and co-founder of Wharton Studio AI Expert Network)<br />
                Emilie Esposito (co-founder of Wharton Studio AI Expert Network)
              </p>
              <Link to="/get-involved" className="btn btn-primary">
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom text-center">
          <SectionHeading
            title="Join the Give Back Program"
            subtitle="Share your expertise and help shape the future of AI innovation"
            centered={true}
          />
          <p className="text-neutral max-w-3xl mx-auto mb-8">
            Whether you're a Wharton alum interested in mentoring AI startups, a startup founder seeking guidance, or an industry expert looking to share your knowledge, we welcome you to be part of our growing community.
          </p>
          <Link to="/get-involved" className="btn btn-primary">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GiveBackProgramPage;