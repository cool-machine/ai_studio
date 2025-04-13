import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Partner } from '../types';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  return (
    <div className="card h-full flex flex-col p-6 items-center text-center">
      <div className="h-20 w-20 mb-4 overflow-hidden">
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary hover:text-primary-dark mt-auto"
      >
        Visit Website <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
};

export default PartnerCard;