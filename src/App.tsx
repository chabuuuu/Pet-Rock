import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';
import { GameProvider, useGame } from './context/GameContext';
import { Layout } from './components/Layout';
import { Rock } from './components/Rock';
import { StatsBoard } from './components/StatsBoard';
import { Controls } from './components/Controls';

const GameContent: React.FC = () => {
    const { stats } = useGame();
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
    const [prevLevel, setPrevLevel] = useState(stats.level);

    // Detect Level Up for Confetti
    useEffect(() => {
        if (stats.level > prevLevel) {
            setShowConfetti(true);
            setPrevLevel(stats.level);
            // Hide confetti after 5 seconds
            const timer = setTimeout(() => setShowConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [stats.level, prevLevel]);

    const isCritical = stats.ego < 20 || stats.hardness < 20;

    return (
        <Layout>
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
            
            {/* Red Alert Overlay */}
            <div 
                className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0
                ${isCritical ? 'opacity-30 bg-red-500 mix-blend-overlay' : 'opacity-0'}`} 
            />

            <div className="z-10 w-full flex flex-col items-center">
                <StatsBoard />
                <Rock />
                <Controls />
            </div>
        </Layout>
    );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
