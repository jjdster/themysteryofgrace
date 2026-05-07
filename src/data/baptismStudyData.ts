export interface Lesson {
  id: string;
  title: string;
  scripture: { reference: string; text: string }[];
  sourceText: { book: string; author: string; excerpt: string };
  summary: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz: Question[];
}

export const baptismStudyData: Module[] = [];
