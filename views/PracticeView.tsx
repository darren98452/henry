import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UseVocabularyReturn } from '../hooks/useVocabulary';
import Quiz from '../components/Quiz';
import SwipeGame from '../components/SwipeGame';
import { Brain, Gamepad2, ArrowLeft } from 'lucide-react';

interface PracticeViewProps {
  vocabulary: UseVocabularyReturn;
}

type PracticeMode = 'menu' | 'quiz' | 'swipe';

const PracticeView: React.FC<PracticeViewProps> = ({ vocabulary }) => {
  const [mode, setMode] = useState<PracticeMode>('menu');

  const renderContent = () => {
    switch (mode) {
      case 'quiz':
        return <Quiz vocabulary={vocabulary} onFinish={() => setMode('menu')} />;
      case 'swipe':
        return <SwipeGame onFinish={() => setMode('menu')} />;
      case 'menu':
      default:
        return (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-title font-bold text-slate-900 mb-2">Practice Zone</h1>
                <p className="text-slate-600">Choose an activity to test your knowledge.</p>
            </motion.div>
            
            <div className="space-y-4">
              <PracticeCard 
                title="Vocabulary Quiz"
                description="Test your knowledge with multiple-choice questions."
                icon={<Brain size={32} />}
                onClick={() => setMode('quiz')}
                color="primary"
              />
              <PracticeCard 
                title="Synonym Swipe"
                description="A fast-paced game to identify synonyms."
                icon={<Gamepad2 size={32} />}
                onClick={() => setMode('swipe')}
                color="secondary"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div>
        {mode !== 'menu' && (
            <button onClick={() => setMode('menu')} className="flex items-center space-x-2 text-primary font-semibold mb-4">
                <ArrowLeft size={20} />
                <span>Back to Practice Menu</span>
            </button>
        )}
        <AnimatePresence mode="wait">
            <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
            >
                {renderContent()}
            </motion.div>
        </AnimatePresence>
    </div>
  );
};


const PracticeCard: React.FC<{title: string, description: string, icon: React.ReactNode, onClick: () => void, color: 'primary' | 'secondary'}> = ({ title, description, icon, onClick, color }) => (
  <motion.button 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full text-left p-6 bg-base-100 rounded-2xl shadow-md border-l-8 ${color === 'primary' ? 'border-primary' : 'border-secondary'} flex items-center space-x-6 transition-all`}>
    <div className={`p-4 rounded-full ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
        {icon}
    </div>
    <div>
      <h3 className="text-xl font-title font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 mt-1">{description}</p>
    </div>
  </motion.button>
);


export default PracticeView;