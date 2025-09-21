
import { useState, useMemo } from 'react';
import type { Word, UserProgress, Rank } from '../types';
import { INITIAL_WORDS, RANKS } from '../constants';

export const useVocabulary = () => {
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set(['Benevolent']));
    const [bookmarkedWords, setBookmarkedWords] = useState<Set<string>>(new Set(['Serendipity']));
    const [totalCorrect, setTotalCorrect] = useState(15);
    const [totalAnswered, setTotalAnswered] = useState(18);

    const allWords = useMemo(() => INITIAL_WORDS, []);
    
    const wordsToLearn = useMemo(() => {
        return allWords.filter(word => !learnedWords.has(word.word));
    }, [allWords, learnedWords]);

    const bookmarkedWordsList = useMemo(() => {
        return allWords.filter(word => bookmarkedWords.has(word.word));
    }, [allWords, bookmarkedWords]);

    const markAsLearned = (word: string) => {
        setLearnedWords(prev => new Set(prev).add(word));
    };

    const toggleBookmark = (word: string) => {
        setBookmarkedWords(prev => {
            const newSet = new Set(prev);
            if (newSet.has(word)) {
                newSet.delete(word);
            } else {
                newSet.add(word);
            }
            return newSet;
        });
    };

    const recordQuizResult = (isCorrect: boolean) => {
        setTotalAnswered(prev => prev + 1);
        if (isCorrect) {
            setTotalCorrect(prev => prev + 1);
        }
    };

    const progress: UserProgress = useMemo(() => {
        const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
        const wordsLearnedCount = learnedWords.size;

        const currentRank = [...RANKS].reverse().find(rank => wordsLearnedCount >= rank.minWords) || RANKS[0];

        return {
            wordsLearned: wordsLearnedCount,
            accuracy,
            rank: currentRank,
        };
    }, [learnedWords.size, totalCorrect, totalAnswered]);


    return {
        allWords,
        wordsToLearn,
        learnedWords,
        bookmarkedWords,
        bookmarkedWordsList,
        progress,
        markAsLearned,
        toggleBookmark,
        recordQuizResult
    };
};

export type UseVocabularyReturn = ReturnType<typeof useVocabulary>;
