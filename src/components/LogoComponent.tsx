import React from 'react';
import { motion } from 'framer-motion';

interface LogoComponentProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animated?: boolean;
}

const LogoComponent: React.FC<LogoComponentProps> = ({ 
  size = 'medium',
  className = '',
  animated = false
}) => {
  const sizeClasses = {
    small: 'h-10 w-auto',
    medium: 'h-16 w-auto',
    large: 'h-32 w-auto'
  };

  const logoContent = (
    <img 
      src="/wharton.png" 
      alt="Wharton Alumni AI Studio Logo" 
      className="h-full w-auto object-contain"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        // Fallback to a dark blue background with text if image fails to load
        target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23011F5B'/%3E%3Ctext x='50%25' y='50%25' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EAI%3C/text%3E%3Ctext x='50%25' y='70%25' font-size='30' text-anchor='middle' fill='white' font-family='Arial, sans-serif' dominant-baseline='middle'%3EWharton%3C/text%3E%3C/svg%3E";
      }}
    />
  );

  if (animated) {
    return (
      <motion.div 
        className={`${sizeClasses[size]} ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {logoContent}
      </motion.div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {logoContent}
    </div>
  );
};

export default LogoComponent;