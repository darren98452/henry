
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { UseVocabularyReturn } from '../hooks/useVocabulary';
import { getWordOfTheDay, getVocabularyQuote } from '../services/geminiService';
import type { Word } from '../types';
import Loader from '../components/Loader';
import { Target, BookText } from 'lucide-react';
import { INITIAL_WORDS } from '../constants';

interface HomeViewProps {
  vocabulary: UseVocabularyReturn;
  onNavigateToDictionary: () => void;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-base-100 p-4 rounded-xl shadow-sm flex items-center space-x-3 h-full">
        <div className="bg-primary/10 p-3 rounded-full text-primary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-600">{label}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

const activityData = [
  { name: 'Mon', words: 2 },
  { name: 'Tue', words: 3 },
  { name: 'Wed', words: 1 },
  { name: 'Thu', words: 4 },
  { name: 'Fri', words: 5 },
  { name: 'Sat', words: 3 },
  { name: 'Sun', words: 6 },
];

interface Quote {
  quote: string;
  author: string;
}

const HomeView: React.FC<HomeViewProps> = ({ vocabulary, onNavigateToDictionary }) => {
    const [wordOfTheDay, setWordOfTheDay] = useState<Word | null>(null);
    const [quote, setQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuoteLoading, setIsQuoteLoading] = useState(true);

    useEffect(() => {
        const fetchWord = async () => {
            const cacheKey = 'wordOfTheDay';
            const cachedWord = localStorage.getItem(cacheKey);
            const now = new Date();

            if (cachedWord) {
                const { timestamp, word } = JSON.parse(cachedWord);
                const isCacheValid = (now.getTime() - timestamp) < 24 * 60 * 60 * 1000; // 24 hours
                if (isCacheValid) {
                    setWordOfTheDay(word);
                    setIsLoading(false);
                    return;
                }
            }
            
            setIsLoading(true);
            try {
                const word = await getWordOfTheDay();
                setWordOfTheDay(word);
                const cacheData = {
                    word,
                    timestamp: now.getTime(),
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            } catch (error) {
                console.error("Failed to fetch word of the day", error);
                // Set a fallback word from the initial list if the API fails
                // This ensures a word with a definition is always available.
                setWordOfTheDay(INITIAL_WORDS[0]);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchQuote = async () => {
            const cacheKey = 'vocabularyQuote';
            const cachedQuote = localStorage.getItem(cacheKey);
            const now = new Date();

            if (cachedQuote) {
                const { timestamp, quoteData } = JSON.parse(cachedQuote);
                const isCacheValid = (now.getTime() - timestamp) < 24 * 60 * 60 * 1000;
                if (isCacheValid) {
                    setQuote(quoteData);
                    setIsQuoteLoading(false);
                    return;
                }
            }
            
            setIsQuoteLoading(true);
            try {
                const quoteData = await getVocabularyQuote();
                setQuote(quoteData);
                const cacheData = {
                    quoteData,
                    timestamp: now.getTime(),
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            } catch (error) {
                console.error("Failed to fetch quote", error);
                // Fallback is handled inside the service, but we can set quote to null
                setQuote(null);
            } finally {
                setIsQuoteLoading(false);
            }
        };

        fetchWord();
        fetchQuote();
    }, []);

    const { progress } = vocabulary;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[calc(100vh-112px)] space-y-3">
            <div className="animate-fade-in flex-shrink-0">
                <h1 className="text-2xl font-title font-bold text-slate-900 flex items-center">
                    Hello, Learner! <span className="text-xl ml-2">👋</span>
                </h1>
                <p className="text-slate-600 text-sm">Let's make today a productive day.</p>
            </div>
            
            <motion.div 
                className="animate-pop-in flex-shrink-0"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
            >
                <h2 className="text-xl font-title font-bold text-slate-900 mb-2 flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles mr-2 text-primary"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                   Word of the Day
                </h2>
                {isLoading ? <div className="h-44 flex justify-center items-center bg-base-100 rounded-xl shadow-sm"><Loader message="Fetching..." /></div> : 
                wordOfTheDay && (
                    <div className="bg-gradient-to-br from-primary to-teal-400 text-white p-4 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-4 left-0 w-32 h-32 bg-white/10 rounded-tr-full"></div>
                         <div className="relative z-10">
                            <h3 className="text-2xl font-bold">{wordOfTheDay.word}</h3>
                            <p className="opacity-80 mb-1 text-sm">{wordOfTheDay.pronunciation}</p>
                            <p className="mb-2 font-light text-sm">{wordOfTheDay.definition}</p>
                            <p className="italic opacity-90 bg-white/20 p-2 rounded-lg text-xs">"{wordOfTheDay.example}"</p>
                        </div>
                    </div>
                )}
            </motion.div>

            <motion.div className="animate-slide-in-up grid grid-cols-2 gap-3 flex-shrink-0" style={{ animationDelay: '0.2s' }}>
                <motion.button
                    onClick={onNavigateToDictionary}
                    whileTap={{ scale: 0.98 }}
                    className="bg-base-100 p-3 rounded-xl shadow-sm flex items-center space-x-3 h-full text-left transition-transform transform hover:scale-105"
                >
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                        <BookText size={20} />
                    </div>
                    <div>
                        <p className="text-lg font-title font-bold text-slate-900">Dictionary</p>
                        <p className="text-xs text-slate-600">Look up any word</p>
                    </div>
                </motion.button>
                <StatCard label="Accuracy" value={`${progress.accuracy}%`} icon={<Target size={20} />} />
            </motion.div>
            
            <motion.div className="flex-grow flex flex-col animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-lg font-title font-bold text-slate-900 mb-2 flex-shrink-0">Weekly Activity</h2>
              <div className="bg-base-100 p-2 rounded-2xl shadow-md flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData} margin={{ top: 5, right: 15, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} />
                        <YAxis tick={{ fill: '#475569', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#f6f4fc', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                        <Line type="monotone" dataKey="words" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Words Learned"/>
                    </LineChart>
                </ResponsiveContainer>
              </div>
               <div className="flex-shrink-0 pt-2">
                {isQuoteLoading ? <div className="h-12 flex items-center justify-center"><Loader /></div> : 
                quote ? (
                    <figure>
                        <blockquote className="italic text-slate-700 text-center text-sm">
                        “{quote.quote}”
                        </blockquote>
                        <figcaption className="text-right mt-1 text-xs font-semibold text-primary">
                        — {quote.author}
                        </figcaption>
                    </figure>
                ) : (
                    <p className="text-slate-500 text-center text-sm">Could not load a quote today.</p>
                )}
              </div>
            </motion.div>
        </motion.div>
    );
};

export default HomeView;
