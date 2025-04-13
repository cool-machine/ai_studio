import React from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import TeamMemberCard from '../components/TeamMemberCard';
import { teamMembers } from '../data/team';

const AboutPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="About Us"
        subtitle="Learn about our mission, vision, and the team behind Wharton Alumni AI Studio."
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-neutral mb-6">
                The Wharton Alumni AI Studio was founded with a clear mission: to leverage the collective expertise of Wharton alumni to foster innovation, knowledge sharing, and collaboration in the rapidly evolving field of artificial intelligence.
              </p>
              <p className="text-neutral mb-6">
                We believe that by connecting experienced industry professionals with emerging startups and facilitating meaningful discussions about AI applications and challenges, we can accelerate the development and adoption of responsible AI solutions across industries.
              </p>
              <p className="text-neutral">
                Our community is built on the principles of mutual support, continuous learning, and a commitment to ethical AI development and implementation.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-secondary-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team meeting"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-neutral mb-6">
                We envision a future where AI technology is developed and deployed responsibly, with a deep understanding of its potential impacts on business and society. The Wharton Alumni AI Studio aims to be at the forefront of this transformation.
              </p>
              <p className="text-neutral mb-6">
                Our three-stage development plan reflects this vision:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-neutral">
                <li>
                  <strong>Knowledge Sharing:</strong> Organizing impactful events that bring together diverse perspectives on AI applications and challenges.
                </li>
                <li>
                  <strong>Strategic Partnerships:</strong> Collaborating with established organizations to expand our reach and impact.
                </li>
                <li>
                  <strong>Thought Leadership:</strong> Developing consulting services and publishing insights that shape the future of AI in business.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Our Team"
            subtitle="Meet the dedicated professionals behind the Wharton Alumni AI Studio."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-primary-light">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto mb-8">
            Whether you're a Wharton alum interested in AI, a startup founder seeking guidance, or an industry expert looking to share your knowledge, we welcome you to be part of our growing community.
          </p>
          <a href="/get-involved" className="btn btn-primary">
            Get Involved
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;