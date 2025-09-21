
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Sparkles, Search, User } from 'lucide-react';
import HomeView from './views/HomeView';
import LearnView from './views/LearnView';
import PracticeView from './views/PracticeView';
import ProfileView from './views/ProfileView';
import ReverseDictionaryView from './views/ReverseDictionaryView';
import DictionaryView from './views/DictionaryView';
import BottomNav from './components/BottomNav';
import type { NavItem } from './types';
import { useVocabulary } from './hooks/useVocabulary';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Sparkles },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'profile', label: 'Profile', icon: User },
];

const App: React.FC = () => {
  const vocabulary = useVocabulary();
  const [activeView, setActiveView] = useState('home');
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  // This is to make lucide icons work without a build step
  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [isDictionaryOpen, activeView]);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView vocabulary={vocabulary} onNavigateToDictionary={() => setIsDictionaryOpen(true)} />;
      case 'learn':
        return <LearnView vocabulary={vocabulary} />;
      case 'practice':
        return <PracticeView vocabulary={vocabulary} />;
      case 'search':
        return <ReverseDictionaryView />;
      case 'profile':
        return <ProfileView vocabulary={vocabulary} />;
      default:
        return <HomeView vocabulary={vocabulary} onNavigateToDictionary={() => setIsDictionaryOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 font-sans text-slate-900">
      <div className="container mx-auto max-w-md pb-20"> {/* Add padding for bottom nav */}
        <main className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {isDictionaryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsDictionaryOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-[95vh] bg-base-100 rounded-t-2xl z-50 flex flex-col"
            >
              <div className="flex-shrink-0 flex justify-center py-3 cursor-pointer" onClick={() => setIsDictionaryOpen(false)}>
                <div className="w-12 h-1.5 bg-base-300 rounded-full"></div>
              </div>
              <div className="flex-grow p-4 pt-0 overflow-y-auto">
                <DictionaryView onBack={() => setIsDictionaryOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <BottomNav items={navItems} activeItem={activeView} onItemClick={setActiveView} />
    </div>
  );
};

export default App;
