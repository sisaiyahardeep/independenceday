import { motion } from 'motion/react';

export default function WavingFlag({ className }: { className?: string }) {
  return (
    <motion.div 
      animate={{ 
        rotate: [-5, 5, -5],
        y: [-2, 2, -2]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      className={`text-4xl drop-shadow-lg ${className}`}
    >
      🇮🇳
    </motion.div>
  );
}
