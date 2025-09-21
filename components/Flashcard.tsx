import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Word } from '../types';

interface FlashcardProps {
  word: Word;
  isBookmarked: boolean;
  onBookmark: (word: string) => void;
  onLearned: (word: string) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ word, isBookmarked, onBookmark, onLearned }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full h-80 [perspective:1000px]">
        <motion.div
            className="relative w-full h-full [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleFlip}
        >
            {/* Front of the card */}
            <div className="absolute w-full h-full [backface-visibility:hidden] bg-base-100 rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 text-center cursor-pointer">
                <h2 className="text-4xl font-bold text-primary">{word.word}</h2>
                <p className="text-slate-600 mt-2">{word.pronunciation}</p>
                <p className="mt-8 text-sm text-slate-500">Tap to see meaning</p>
                 <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(word.word);
                    }}
                    className="absolute top-4 right-4 text-slate-500 hover:text-amber-500"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isBookmarked ? "#f59e0b" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
            </div>

            {/* Back of the card */}
            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary text-white rounded-2xl shadow-lg flex flex-col p-6 cursor-pointer">
                <h3 className="text-xl font-bold border-b border-white/50 pb-2">{word.definition}</h3>
                <p className="italic mt-4">"{word.example}"</p>
                <div className="mt-auto">
                    <p className="font-semibold">Synonyms:</p>
                    <p className="text-sm">{word.synonyms.join(', ')}</p>
                </div>
                 <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmark(word.word);
                    }}
                    className="absolute top-4 right-4 text-white/80 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isBookmarked ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
            </div>
        </motion.div>
    </div>
  );
};

export default Flashcard;