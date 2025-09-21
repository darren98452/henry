import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWordDetails } from '../services/geminiService';
import Loader from '../components/Loader';
import { ArrowLeft, Search } from 'lucide-react';
import type { Word } from '../types';

interface DictionaryViewProps {
    onBack: () => void;
}

const DictionaryView: React.FC<DictionaryViewProps> = ({ onBack }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<Word | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim().length < 2) {
            setError('Please enter a word to search.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setSearched(true);
        setResult(null);

        try {
            const wordDetails = await getWordDetails(query);
            setResult(wordDetails);
            if (!wordDetails) {
                setError(`Could not find a definition for "${query}". Check the spelling or try another word.`);
            }
        } catch (err) {
            setError('An error occurred while searching. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                 <button onClick={onBack} className="flex items-center space-x-2 text-primary font-semibold mb-4">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </button>
                <h1 className="text-3xl font-title font-bold text-slate-900">Dictionary</h1>
                <p className="text-slate-600 mt-1">Look up any word.</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., 'serendipity'"
                    className="w-full p-3 bg-white border-2 border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    aria-label="Search for a word"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary text-white font-bold p-3 rounded-lg hover:bg-primary-focus transition-colors disabled:bg-primary/50 flex items-center justify-center"
                    aria-label="Search"
                >
                    <Search size={24} />
                </button>
            </form>

            <div className="mt-4 min-h-[300px]">
                {isLoading && <Loader message="Looking up your word..." />}
                <AnimatePresence>
                {error && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-4 text-error bg-error/10 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}
                </AnimatePresence>
                {/* FIX: Corrected typo 'AnPresence' to 'AnimatePresence' */}
                <AnimatePresence>
                {result && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-primary to-teal-400 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden"
                    >
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-4 left-0 w-32 h-32 bg-white/10 rounded-tr-full"></div>
                        <div className="relative z-10 space-y-3">
                            <div>
                                <h2 className="text-3xl font-bold">{result.word}</h2>
                                <p className="opacity-80">{result.pronunciation}</p>
                            </div>
                            <div>
                                <p className="font-light text-base">{result.definition}</p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-lg">
                                <p className="italic text-sm">"{result.example}"</p>
                            </div>
                            <div>
                                <p className="font-semibold">Synonyms:</p>
                                <p className="text-sm opacity-90">{result.synonyms.join(', ')}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
                 {!isLoading && !result && !searched && (
                    <div className="text-center p-8 text-slate-500">
                       <p>Search for a word to see its definition here.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default DictionaryView;