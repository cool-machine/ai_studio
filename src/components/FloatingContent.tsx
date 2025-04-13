import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface FloatingContentProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const FloatingContent: React.FC<FloatingContentProps> = ({ title, subtitle, children }) => {
  return (
    <motion.div
      className="relative z-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedText
        text={title}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <AnimatedText
          text={subtitle}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200"
          delay={5}
        />
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default FloatingContent;