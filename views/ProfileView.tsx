
import React from 'react';
import { motion } from 'framer-motion';
import type { UseVocabularyReturn } from '../hooks/useVocabulary';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import type { Word } from '../types';
import { BookCopy, Target } from 'lucide-react';

interface ProfileViewProps {
  vocabulary: UseVocabularyReturn;
}

const progressData = [
  { week: 'Week 1', learned: 10, accuracy: 75 },
  { week: 'Week 2', learned: 22, accuracy: 80 },
  { week: 'Week 3', learned: 35, accuracy: 88 },
  { week: 'Week 4', learned: 51, accuracy: 92 },
];

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

const ProfileView: React.FC<ProfileViewProps> = ({ vocabulary }) => {
    const { progress, bookmarkedWordsList } = vocabulary;

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center p-6 bg-base-100 rounded-2xl shadow-lg">
                <div className="relative">
                    <img src={`https://picsum.photos/seed/user1/120/120`} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-primary shadow-md" />
                    <span className="absolute -bottom-2 -right-2 text-4xl">{progress.rank.icon}</span>
                </div>
                <h2 className="mt-4 text-3xl font-title font-bold text-slate-900">Jane Doe</h2>
                <p className="text-primary font-semibold">{progress.rank.name} Rank</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3 className="text-xl font-title font-bold text-slate-800 mb-2">My Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                    <StatCard label="Words Learned" value={progress.wordsLearned} icon={<BookCopy size={24}/>} />
                    <StatCard label="Accuracy" value={`${progress.accuracy}%`} icon={<Target size={24} />} />
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-xl font-title font-bold text-slate-800 mb-2">Progress Over Time</h3>
              <div className="bg-base-100 p-4 rounded-2xl shadow-md h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData} margin={{ top: 5, right: 20, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="week" tick={{ fill: '#475569' }} />
                        <YAxis yAxisId="left" stroke="#a78bfa" tick={{ fill: '#a78bfa' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#2dd4bf" tick={{ fill: '#2dd4bf' }} unit="%" />
                        <Tooltip contentStyle={{ backgroundColor: '#f6f4fc', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                        <Legend verticalAlign="top" wrapperStyle={{paddingBottom: '20px'}}/>
                        <Line yAxisId="left" type="monotone" dataKey="learned" name="Words Learned" stroke="#a78bfa" strokeWidth={3} />
                        <Line yAxisId="right" type="monotone" dataKey="accuracy" name="Accuracy" stroke="#2dd4bf" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-xl font-title font-bold text-slate-800 mb-2">Bookmarked Words</h3>
                <div className="bg-base-100 p-4 rounded-2xl shadow-md max-h-60 overflow-y-auto">
                    {bookmarkedWordsList.length > 0 ? (
                         <ul className="divide-y divide-base-200">
                            {bookmarkedWordsList.map((word: Word) => (
                                <li key={word.word} className="py-3">
                                    <p className="font-bold text-primary">{word.word}</p>
                                    <p className="text-sm text-slate-700">{word.definition}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-600 text-center py-4">You have no bookmarked words.</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileView;
