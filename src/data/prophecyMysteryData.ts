import { Module } from './baptismStudyData';

export const prophecyMysteryData: Module[] = [
  {
    id: 'intro',
    title: 'Introduction',
    lessons: [
      {
        id: 'lesson-1',
        title: 'Prophecy vs Mystery',
        scripture: [{ reference: 'Rom 16:25', text: 'Mystery kept secret since the world began' }],
        sourceText: { book: 'Sample', author: 'Author Name', excerpt: '...' },
        summary: '...'
      }
    ],
    quiz: [
      {
        question: 'What is the mystery?',
        options: ['A secret revealed', 'Something unknown', 'Option 3', 'Option 4'],
        correctAnswer: 0,
        explanation: 'It was kept secret but now revealed.'
      }
    ]
  }
];
