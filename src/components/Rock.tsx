import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const Rock: React.FC = () => {
  const { stats } = useGame();
  const { level } = stats;

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-8">
      {/* The Rock */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-[150px] leading-none select-none filter drop-shadow-2xl grayscale-[0.2]"
        style={{
            filter: `brightness(${0.5 + (stats.hardness / 200)})` // Hardness affects brightness
        }}
        whileTap={{ scale: 0.9 }}
      >
        🪨
      </motion.div>

      {/* Accessories */}
      {level >= 5 && (
        <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-0 right-10 text-6xl"
        >
          🧢
        </motion.div>
      )}

      {level >= 10 && (
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 text-5xl z-10"
        >
          😎
        </motion.div>
      )}

      {level >= 20 && (
        <motion.div 
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="absolute bottom-0 -right-4 text-6xl"
        >
          🗡️
        </motion.div>
      )}
    </div>
  );
};
