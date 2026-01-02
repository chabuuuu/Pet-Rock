import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { cn } from '../utils/cn'; // Note: I need to create this utility or just use clsx/tailwind-merge inline. I'll create it.

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, max = 100, color }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1 text-sm font-bold text-stone-700">
        <span>{label}</span>
        <span>{Math.floor(value)}/{max}</span>
      </div>
      <div className="w-full h-4 bg-stone-200 rounded-full overflow-hidden border-2 border-stone-300">
        <motion.div
          className={cn("h-full transition-all duration-500", color)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const StatsBoard: React.FC = () => {
    const { stats } = useGame();
    const xpToNextLevel = stats.level * 100;

    return (
        <div className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border-2 border-stone-100">
            <div className="flex justify-between items-center mb-4 border-b pb-2 border-stone-100">
                <h2 className="text-xl font-black text-stone-800">LEVEL {stats.level}</h2>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">The Rock Stats</span>
            </div>
            
            <StatBar 
                label="Độ Chảnh (Ego)" 
                value={stats.ego} 
                color="bg-purple-500"
            />
            <StatBar 
                label="Độ Cứng (Hardness)" 
                value={stats.hardness} 
                color="bg-stone-600"
            />
            <StatBar 
                label="Kinh Nghiệm (XP)" 
                value={stats.xp} 
                max={xpToNextLevel}
                color="bg-amber-400"
            />
        </div>
    );
};
