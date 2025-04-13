import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Startup } from '../types';

interface StartupCardProps {
  startup: Startup;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  return (
    <motion.div 
      className="card h-full flex flex-col hover-lift"
      whileHover={{ 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="p-6">
        <motion.div 
          className="h-16 w-16 mb-4 overflow-hidden rounded-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <img
            src={startup.logo}
            alt={`${startup.name} logo`}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
        <p className="text-neutral mb-4 flex-grow">{startup.description}</p>
        {startup.website && (
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary-dark"
          >
            Visit Website <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default StartupCard;