
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
  summary: string;
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

export const dualMinistryData: Module[] = [
  {
    id: 'dual-module-1',
    title: 'Introduction: The Two-Fold Purpose',
    description: 'Understanding that God has a dual purpose: one for the earth and one for the heavens.',
    lessons: [
      {
        id: 'dual-lesson-1-1',
        title: 'The Two-Fold Purpose of God',
        scripture: [
          { reference: 'Ephesians 1:10', text: 'That in the dispensation of the fulness of times he might gather together in one all things in Christ, both which are in heaven, and which are on earth; even in him:' }
        ],
        sourceText: {
          book: 'The Two-Fold Purpose of God',
          author: 'C.R. Stam',
          excerpt: 'God has a two-fold purpose in Christ. One concerns the earth and the restoration of the kingdom to Israel. The other concerns the heavens and the formation of the Body of Christ. These two programs are distinct and must be rightly divided.'
        },
        summary: 'The Bible reveals that God is working out two distinct programs through His Son, Jesus Christ. One program is "Prophecy," which concerns the earth, the nation of Israel, and the establishment of a literal kingdom. The other is the "Mystery," which concerns the heavenly places and the Church which is His Body. Ephesians 1:10 shows that eventually, all things—both in heaven and on earth—will be gathered together in Christ. However, during this present age, we must distinguish between His role as Israel\'s Messiah and His role as the Head of the Body.',
        keyIdeas: [
          'God has a purpose for the earth and a purpose for the heavens.',
          'Prophecy concerns the earthly kingdom; Mystery concerns the heavenly Body.',
          'Jesus Christ is the center of both programs.'
        ],
        questions: [
          {
            id: 'dq1-1',
            question: 'According to Ephesians 1:10, where are the "all things" that God will gather together in Christ?',
            options: [
              'Only on the earth',
              'Only in the heavens',
              'Both in heaven and on earth',
              'Only in the hearts of men'
            ],
            correctAnswer: 2,
            explanation: 'The verse explicitly mentions "both which are in heaven, and which are on earth."',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does knowing that God has a specific plan for the "heavens" change your perspective on your future as a member of the Body of Christ?'
      }
    ]
  },
  {
    id: 'dual-module-2',
    title: 'Messiah of the Circumcision',
    description: 'Christ\'s earthly ministry to the nation of Israel.',
    lessons: [
      {
        id: 'dual-lesson-2-1',
        title: 'A Minister of the Circumcision',
        scripture: [
          { reference: 'Romans 15:8', text: 'Now I say that Jesus Christ was a minister of the circumcision for the truth of God, to confirm the promises made unto the fathers:' },
          { reference: 'Matthew 15:24', text: 'But he answered and said, I am not sent but unto the lost sheep of the house of Israel.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'During His earthly ministry, Jesus Christ limited His message to Israel. He came as their Messiah, the Son of David, to fulfill the covenants and promises made to the fathers. He was a "minister of the circumcision."'
        },
        summary: 'In His earthly ministry, Jesus Christ came specifically to the nation of Israel. Romans 15:8 explicitly calls Him a "minister of the circumcision." His purpose was to confirm the promises made to the Hebrew patriarchs (Abraham, Isaac, Jacob) and to offer the promised Kingdom to Israel. During this time, He instructed His disciples not to go into the way of the Gentiles, but rather to the "lost sheep of the house of Israel." As Messiah, He was the King of the Jews, fulfilling prophecy.',
        keyIdeas: [
          'Christ\'s earthly ministry was focused on Israel.',
          'He came to fulfill the covenants and promises made to the fathers.',
          'As Messiah, He is the rightful King of Israel.'
        ],
        questions: [
          {
            id: 'dq2-1',
            question: 'What title does Romans 15:8 give to Jesus Christ in relation to His earthly ministry?',
            options: [
              'Head of the Body',
              'Minister of the circumcision',
              'Apostle to the Gentiles',
              'High Priest of the Mystery'
            ],
            correctAnswer: 1,
            explanation: 'Romans 15:8 says, "Jesus Christ was a minister of the circumcision for the truth of God."',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'Why is it important to recognize that Jesus limited His earthly ministry to Israel before the revelation of the Mystery?'
      }
    ]
  },
  {
    id: 'dual-module-3',
    title: 'Head of the Body',
    description: 'Christ\'s heavenly ministry as revealed through the Apostle Paul.',
    lessons: [
      {
        id: 'dual-lesson-3-1',
        title: 'The Head of the Church',
        scripture: [
          { reference: 'Colossians 1:18', text: 'And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence.' },
          { reference: 'Ephesians 1:22-23', text: 'And hath put all things under his feet, and gave him to be the head over all things to the church, Which is his body, the fulness of him that filleth all in all.' }
        ],
        sourceText: {
          book: 'The Lordship of Christ',
          author: 'C.R. Stam',
          excerpt: 'From His position at the right hand of God, Christ is now the Head of a new creation: the Body of Christ. This relationship was not a subject of prophecy but was a "mystery" hidden in God until revealed to Paul.'
        },
        summary: 'Following His rejection, crucifixion, and resurrection, Christ ascended to heaven. There, He began a new ministry as the "Head" of the Body. This relationship is fundamentally different from His role as Messiah-King. As Head, He is organically joined to every believer. He is the source of life, direction, and unity for the Church. This "Headship" is a key component of the Mystery revelation given to Paul, emphasizing our position "in Christ" in the heavenly places.',
        keyIdeas: [
          'Christ is the Head of the Body, which is the Church.',
          'This relationship is a spiritual and organic union.',
          'The Headship of Christ was a mystery hidden from previous ages.'
        ],
        questions: [
          {
            id: 'dq3-1',
            question: 'According to Colossians 1:18, what is Christ\'s relationship to the Church?',
            options: [
              'He is the earthly King',
              'He is the Head of the Body',
              'He is a fellow-servant',
              'He is a distant observer'
            ],
            correctAnswer: 1,
            explanation: 'Colossians 1:18 states, "And he is the head of the body, the church."',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does viewing Christ as your "Head" differ from viewing Him merely as a "King"?'
      }
    ]
  },
  {
    id: 'dual-module-4',
    title: 'Comparing the Roles',
    description: 'Contrasting Messiahship and Headship.',
    lessons: [
      {
        id: 'dual-lesson-4-1',
        title: 'Messiah vs. Head',
        scripture: [
          { reference: '2 Corinthians 5:16', text: 'Wherefore henceforth know we no man after the flesh: yea, though we have known Christ after the flesh, yet now henceforth know we him no more.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'We no longer know Christ "after the flesh"—that is, as the earthly Messiah of Israel. We know Him as the glorified Head of the Body in heaven. The Messiah rules over subjects; the Head lives through members.'
        },
        summary: 'The contrast between Christ as Messiah and Christ as Head is profound. As Messiah, He is the King of Israel, ruling over subjects in an earthly kingdom. As Head, He is the life of the Body, living through members in a heavenly organism. Messiahship is a matter of Prophecy; Headship is a matter of Mystery. Paul tells us in 2 Corinthians 5:16 that we are no longer to know Christ "after the flesh" (His earthly, prophetic role), but rather in His current, glorified position as our heavenly Head.',
        keyIdeas: [
          'Messiah rules over subjects; Head lives through members.',
          'Messiahship is prophetic; Headship is mysterious (revealed mystery).',
          'We know Christ now as the glorified Head, not the earthly Messiah.'
        ],
        questions: [
          {
            id: 'dq4-1',
            question: 'What does it mean to know Christ "no more after the flesh" (2 Cor 5:16)?',
            options: [
              'To forget that Jesus ever lived',
              'To stop focusing on His earthly, prophetic role as Israel\'s Messiah',
              'To deny His physical resurrection',
              'To only study the Old Testament'
            ],
            correctAnswer: 1,
            explanation: 'It means our focus is now on His heavenly role as Head of the Body, rather than His earthly role to Israel.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'In what ways does focusing on Christ\'s current "Headship" provide more intimacy than focusing on His "Messiahship"?'
      }
    ]
  }
];
