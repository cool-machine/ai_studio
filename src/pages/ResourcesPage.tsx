import React, { useState } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import ResourceCard from '../components/ResourceCard';
import { resources } from '../data/resources';
import { FileText, Video, Headphones, PenTool as Tool } from 'lucide-react';

type ResourceCategory = 'all' | 'article' | 'video' | 'podcast' | 'tool';

const ResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('all');
  
  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <div>
      <Hero
        title="Resources"
        subtitle="Explore our collection of articles, videos, podcasts, and tools to enhance your AI knowledge."
        backgroundImage="https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <SectionHeading
            title="Knowledge Hub"
            subtitle="Access resources created by and for the Wharton alumni community."
            centered={true}
          />

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            <button
              className={`px-4 py-2 rounded-full flex items-center ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              All Resources
            </button>
            <button
              className={`px-4 py-2 rounded-full flex items-center ${
                activeCategory === 'article'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('article')}
            >
              <FileText className="h-4 w-4 mr-2" /> Articles
            </button>
            <button
              className={`px-4 py-2 rounded-full flex items-center ${
                activeCategory === 'video'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('video')}
            >
              <Video className="h-4 w-4 mr-2" /> Videos
            </button>
            <button
              className={`px-4 py-2 rounded-full flex items-center ${
                activeCategory === 'podcast'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('podcast')}
            >
              <Headphones className="h-4 w-4 mr-2" /> Podcasts
            </button>
            <button
              className={`px-4 py-2 rounded-full flex items-center ${
                activeCategory === 'tool'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-neutral hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory('tool')}
            >
              <Tool className="h-4 w-4 mr-2" /> Tools
            </button>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral text-lg">
                No resources found in this category. Please check back later.
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
                title="Contribute a Resource"
                subtitle="Share your expertise with the Wharton Alumni AI Studio community."
              />
              <p className="text-neutral mb-6">
                We welcome contributions from Wharton alumni who have insights, research, or tools related to AI that could benefit our community. Whether it's an article, case study, video tutorial, or analytical framework, we'd love to feature your work.
              </p>
              <p className="text-neutral mb-6">
                By contributing, you'll help expand our knowledge base and establish yourself as a thought leader in the AI space.
              </p>
              <a href="/get-involved" className="btn btn-primary">
                Submit a Resource
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Person writing"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;