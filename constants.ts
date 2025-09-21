
import type { Rank, Word } from './types';

export const RANKS: Rank[] = [
  { name: 'Bronze', icon: '🥉', minWords: 0 },
  { name: 'Silver', icon: '🥈', minWords: 25 },
  { name: 'Gold', icon: '🥇', minWords: 50 },
  { name: 'Platinum', icon: '💎', minWords: 100 },
];

export const INITIAL_WORDS: Word[] = [
    {
        word: 'Ephemeral',
        pronunciation: '/əˈfem(ə)rəl/',
        definition: 'Lasting for a very short time.',
        example: 'The beauty of the cherry blossoms is ephemeral.',
        synonyms: ['transitory', 'fleeting', 'momentary'],
        difficulty: 'medium',
    },
    {
        word: 'Ubiquitous',
        pronunciation: '/yo͞oˈbikwədəs/',
        definition: 'Present, appearing, or found everywhere.',
        example: 'Smartphones have become ubiquitous in modern society.',
        synonyms: ['omnipresent', 'pervasive', 'universal'],
        difficulty: 'medium',
    },
    {
        word: 'Mellifluous',
        pronunciation: '/məˈliflo͞oəs/',
        definition: 'A sound that is sweet and smooth, pleasing to hear.',
        example: 'Her mellifluous voice captivated the audience.',
        synonyms: ['euphonious', 'melodious', 'dulcet'],
        difficulty: 'hard',
    },
    {
        word: 'Serendipity',
        pronunciation: '/ˌserənˈdipədē/',
        definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
        example: 'Discovering the hidden cafe was a moment of pure serendipity.',
        synonyms: ['fluke', 'chance', 'happy accident'],
        difficulty: 'hard',
    },
    {
        word: 'Benevolent',
        pronunciation: '/bəˈnevələnt/',
        definition: 'Well meaning and kindly.',
        example: 'A benevolent smile from a stranger can brighten your day.',
        synonyms: ['kind', 'charitable', 'magnanimous'],
        difficulty: 'easy',
    },
     {
        word: 'Fastidious',
        pronunciation: '/faˈstidēəs/',
        definition: 'Very attentive to and concerned about accuracy and detail.',
        example: 'He was a fastidious dresser, always impeccably attired.',
        synonyms: ['meticulous', 'scrupulous', 'punctilious'],
        difficulty: 'hard',
    },
    {
        word: 'Gregarious',
        pronunciation: '/ɡrəˈɡerēəs/',
        definition: 'Fond of company; sociable.',
        example: 'He was a popular and gregarious man.',
        synonyms: ['sociable', 'convivial', 'outgoing'],
        difficulty: 'easy',
    },
];
