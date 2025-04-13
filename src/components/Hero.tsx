import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
}) => {
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      className={`py-20 md:py-28 ${
        backgroundImage 
          ? 'text-white' 
          : 'bg-primary-light dark:bg-dark-lighter text-neutral-dark dark:text-white'
      }`}
      style={bgStyle}
    >
      <div className="container-custom text-center">
        <motion.h1 
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            backgroundImage 
              ? 'text-white' 
              : 'text-neutral-dark dark:text-white'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${
            backgroundImage 
              ? 'text-gray-200' 
              : 'text-neutral dark:text-gray-300'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
        {(ctaText || secondaryCtaText) && (
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {ctaText && ctaLink && (
              <Link
                to={ctaLink}
                className={`btn ${
                  backgroundImage 
                    ? 'bg-primary hover:bg-primary-dark text-white' 
                    : 'btn-primary'
                }`}
              >
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                to={secondaryCtaLink}
                className={`btn ${
                  backgroundImage
                    ? 'bg-transparent border border-white text-white hover:bg-white hover:text-neutral-dark'
                    : 'btn-outline dark:border-white dark:text-white dark:hover:bg-white/10'
                }`}
              >
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;