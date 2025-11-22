import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard: React.FC<Props> = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.2)" }}
      className={`bg-brand-soft border border-slate-700 rounded-xl p-6 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;