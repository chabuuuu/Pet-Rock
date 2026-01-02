import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Sparkles, Heart, MessageCircle, Gavel } from 'lucide-react';
import { InteractionType } from '../utils/humorEngine';

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onClick, color }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`${color} text-white font-bold py-4 px-2 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 transition-colors`}
  >
    <div className="p-2 bg-white/20 rounded-full">
      {icon}
    </div>
    <span className="text-sm">{label}</span>
  </motion.button>
);

export const Controls: React.FC = () => {
  const { interact } = useGame();

  const handleInteraction = (type: InteractionType) => {
    interact(type);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 w-full px-2">
      <ActionButton
        label="Đánh Bóng"
        icon={<Sparkles size={24} />}
        onClick={() => handleInteraction('polish')}
        color="bg-cyan-500 hover:bg-cyan-600"
      />
      <ActionButton
        label="Khen Ngợi"
        icon={<Heart size={24} />}
        onClick={() => handleInteraction('praise')}
        color="bg-pink-500 hover:bg-pink-600"
      />
      <ActionButton
        label="Tâm Sự"
        icon={<MessageCircle size={24} />}
        onClick={() => handleInteraction('talk')}
        color="bg-emerald-500 hover:bg-emerald-600"
      />
      <ActionButton
        label="Chọc Ghẹo"
        icon={<Gavel size={24} />}
        onClick={() => handleInteraction('poke')}
        color="bg-orange-500 hover:bg-orange-600"
      />
    </div>
  );
};
