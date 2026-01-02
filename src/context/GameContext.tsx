import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { getRandomMessage, InteractionType } from '../utils/humorEngine';
import { toast } from 'sonner';

interface GameStats {
  ego: number;
  hardness: number;
  xp: number;
  level: number;
}

interface GameContextType {
  stats: GameStats;
  interact: (type: InteractionType) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const MAX_STAT = 100;
const DECAY_RATE = 1; // Amount to decrease per tick
const DECAY_INTERVAL = 3000; // Milliseconds
const XP_PER_LEVEL = 100;

const INITIAL_STATS: GameStats = {
  ego: 100,
  hardness: 100,
  xp: 0,
  level: 1,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useLocalStorage<GameStats>('pet-rock-stats', INITIAL_STATS);

  // Game Loop: Decay stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        ego: Math.max(0, prev.ego - DECAY_RATE),
        hardness: Math.max(0, prev.hardness - DECAY_RATE),
      }));
    }, DECAY_INTERVAL);

    return () => clearInterval(interval);
  }, [setStats]);

  const interact = useCallback((type: InteractionType) => {
    const message = getRandomMessage(type);
    toast(message);

    setStats((prev) => {
      let newStats = { ...prev };

      switch (type) {
        case 'polish':
          newStats.hardness = Math.min(MAX_STAT, prev.hardness + 10);
          break;
        case 'praise':
          newStats.ego = Math.min(MAX_STAT, prev.ego + 10);
          break;
        case 'talk':
          newStats.xp += 10;
          break;
        case 'poke':
          newStats.ego = Math.max(0, prev.ego - 5);
          newStats.hardness = Math.max(0, prev.hardness - 5);
          break;
      }

      // Level Up Logic
      if (newStats.xp >= newStats.level * XP_PER_LEVEL) {
        newStats.level += 1;
        newStats.xp = 0; // Reset XP for next level (or keep accumulating? Design says "reset" implied by logic usually, but let's just keep accumulating or reset. Let's do cumulative XP but check threshold. Easier: Reset XP for now as per prompt implication usually.)
        // Actually prompt says "XP (Kinh nghiệm): Tăng khi tương tác -> Lên cấp." simple logic.
        // Let's stick to "XP resets each level" for simplicity in bar display.
        toast.success(`Hòn đá đã lên cấp ${newStats.level}! Kinh khủng khiếp!`);
      }

      return newStats;
    });
  }, [setStats]);

  return (
    <GameContext.Provider value={{ stats, interact }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
