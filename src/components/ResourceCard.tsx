import React from 'react';
import { ExternalLink, FileText, Video, Headphones, PenTool as Tool } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getIcon = () => {
    switch (resource.category) {
      case 'article':
        return <FileText className="h-6 w-6 text-primary" />;
      case 'video':
        return <Video className="h-6 w-6 text-primary" />;
      case 'podcast':
        return <Headphones className="h-6 w-6 text-primary" />;
      case 'tool':
        return <Tool className="h-6 w-6 text-primary" />;
      default:
        return <FileText className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="card h-full flex flex-col p-6">
      <div className="mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
      <p className="text-neutral mb-4 flex-grow">{resource.description}</p>
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary hover:text-primary-dark mt-auto"
      >
        View Resource <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
};

export default ResourceCard;