
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'multiple-choice' | 'short-answer' | 'reflection';
}

export interface Lesson {
  id: string;
  title: string;
  scripture: {
    reference: string;
    text: string;
  }[];
  sourceText: {
    book: string;
    author: string;
    excerpt: string;
  };
  keyIdeas: string[];
  questions: Question[];
  reflectionPrompt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const baptismStudyData: Module[] = [
  {
    id: 'intro',
    title: 'Introduction to the Study',
    description: 'An overview of how to use this interactive guide and the importance of a scripture-first approach.',
    lessons: [
      {
        id: 'welcome',
        title: 'Welcome & Purpose',
        scripture: [
          { reference: '2 Timothy 2:15', text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'The word "baptism" is one of the most misunderstood words in the religious vocabulary. To understand it, we must look at how God uses it in His Word, not how tradition has defined it.'
        },
        keyIdeas: [
          'Rightly dividing the Word is essential for understanding baptism.',
          'Tradition often clouds the biblical meaning of words.',
          'This study focuses on what the Bible says, specifically in the light of the Mystery revealed to Paul.'
        ],
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: 'According to 2 Timothy 2:15, what is the key to being a workman that needeth not to be ashamed?',
            options: [
              'Memorizing the entire Bible',
              'Rightly dividing the word of truth',
              'Attending church every Sunday',
              'Being baptized in water'
            ],
            correctAnswer: 1,
            explanation: 'The verse explicitly states that "rightly dividing the word of truth" is how we show ourselves approved unto God.'
          }
        ],
        reflectionPrompt: 'What is your current understanding of water baptism, and are you willing to set aside tradition to see what the scriptures say?'
      }
    ]
  },
  {
    id: 'module-1',
    title: 'The Meaning of Baptism',
    description: 'Exploring the Greek word "baptizo" and its primary meaning of identification.',
    lessons: [
      {
        id: 'identification',
        title: 'Baptism as Identification',
        scripture: [
          { reference: 'Romans 6:3', text: 'Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death?' }
        ],
        sourceText: {
          book: 'Real Baptism',
          author: 'Charles F. Baker',
          excerpt: 'The primary meaning of the Greek word baptizo is to place into, or to identify with. It does not always imply water. When we are baptized into Christ, we are identified with Him in His death, burial, and resurrection.'
        },
        keyIdeas: [
          'Baptism means "identification" or "placement into."',
          'Not all baptisms in the Bible involve water.',
          'The most important baptism is our identification with Jesus Christ.'
        ],
        questions: [
          {
            id: 'q2',
            type: 'multiple-choice',
            question: 'What is the primary meaning of the Greek word "baptizo" according to this study?',
            options: [
              'To sprinkle with water',
              'To immerse in a pool',
              'To identify with or place into',
              'To join a local church'
            ],
            correctAnswer: 2,
            explanation: 'As Baker notes, the word primarily means identification or placement into a new environment or condition.'
          }
        ],
        reflectionPrompt: 'How does the idea of "identification" change your perspective on verses that mention baptism?'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'John\'s Baptism and the Kingdom',
    description: 'Understanding the purpose of water baptism in the ministry of John the Baptist and Jesus\' earthly ministry.',
    lessons: [
      {
        id: 'johns-purpose',
        title: 'John the Baptist\'s Ministry',
        scripture: [
          { reference: 'Mark 1:4', text: 'John did baptize in the wilderness, and preach the baptism of repentance for the remission of sins.' },
          { reference: 'John 1:31', text: 'And I knew him not: but that he should be made manifest to Israel, therefore am I come baptizing with water.' }
        ],
        sourceText: {
          book: 'The Bible and Baptism',
          author: 'Harry Bultema',
          excerpt: 'John\'s baptism was specifically for the manifestation of Christ to Israel. it was a "baptism of repentance for the remission of sins" linked to the coming Kingdom.'
        },
        keyIdeas: [
          'John\'s baptism was for Israel.',
          'It was linked to repentance and the remission of sins.',
          'Its purpose was to manifest Christ to the nation of Israel.'
        ],
        questions: [
          {
            id: 'q3',
            type: 'multiple-choice',
            question: 'According to John 1:31, why did John come baptizing with water?',
            options: [
              'To start the Christian church',
              'To manifest Christ to Israel',
              'To wash away original sin',
              'To fulfill a personal tradition'
            ],
            correctAnswer: 1,
            explanation: 'John explicitly states: "but that he should be made manifest to Israel, therefore am I come baptizing with water."'
          }
        ],
        reflectionPrompt: 'If John\'s baptism was for Israel, how does that affect its application to the Body of Christ today?'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'The One Baptism',
    description: 'The transition to the "One Baptism" of the current dispensation of Grace.',
    lessons: [
      {
        id: 'ephesians-one-baptism',
        title: 'One Lord, One Faith, One Baptism',
        scripture: [
          { reference: 'Ephesians 4:5', text: 'One Lord, one faith, one baptism,' },
          { reference: '1 Corinthians 12:13', text: 'For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit.' }
        ],
        sourceText: {
          book: 'Common Questions About the Grace Message',
          author: 'Joel Fink',
          excerpt: 'In the current dispensation of Grace, Paul declares there is "one baptism." Since 1 Corinthians 12:13 tells us we are baptized into the Body by the Spirit, this spiritual baptism is the "one" that remains.'
        },
        keyIdeas: [
          'Paul identifies only ONE baptism for the current age.',
          'This one baptism is performed by the Spirit, not by man with water.',
          'It places the believer into the Body of Christ.'
        ],
        questions: [
          {
            id: 'q4',
            type: 'multiple-choice',
            question: 'According to Ephesians 4:5, how many baptisms are there for the believer today?',
            options: [
              'Two (Water and Spirit)',
              'Three (Water, Spirit, and Fire)',
              'One',
              'As many as the believer desires'
            ],
            correctAnswer: 2,
            explanation: 'Ephesians 4:5 clearly states there is "one baptism."'
          },
          {
            id: 'q5',
            type: 'multiple-choice',
            question: 'Review: What was the primary purpose of John\'s water baptism?',
            options: [
              'To manifest Christ to Israel',
              'To join the Body of Christ',
              'To receive the Holy Spirit',
              'To show everyone he was a Christian'
            ],
            correctAnswer: 0,
            explanation: 'This is a review from Module 2. John 1:31 says it was to manifest Christ to Israel.'
          }
        ],
        reflectionPrompt: 'If there is only "one baptism" today, and 1 Cor 12:13 describes a Spirit baptism, what does that imply about the necessity of water baptism?'
      }
    ]
  }
];
