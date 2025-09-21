
import type { LucideProps } from 'lucide-react';
import type React from 'react';

export interface Word {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  synonyms: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  wordsLearned: number;
  accuracy: number;
  rank: Rank;
}

export interface Rank {
  name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  icon: string;
  minWords: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.FC<LucideProps>;
}

export interface QuizQuestion {
  word: string;
  definition: string;
  options: string[];
  correctAnswer: string;
}

export interface SwipeItem {
    word1: string;
    word2: string;
    areSynonyms: boolean;
}
