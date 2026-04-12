
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

export const sevenOnesData: Module[] = [
  {
    id: 'module-0',
    title: 'Introduction',
    description: 'A general overview of the seven-fold unity in Ephesians 4:4-7.',
    lessons: [
      {
        id: 'lesson-0-1',
        title: 'The Seven-Fold Unity',
        scripture: [
          { reference: 'Ephesians 4:4-6', text: 'There is one body, and one Spirit, even as ye are called in one hope of your calling; One Lord, one faith, one baptism, One God and Father of all, who is above all, and through all, and in you all.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'In Ephesians 4:4-6, the Apostle Paul lists seven "ones" that constitute the unity of the Spirit. This unity is not something we are told to create, but something we are told to keep. It is the divine foundation for the Church which is His Body.'
        },
        summary: 'Ephesians 4:4-7 provides the blueprint for spiritual unity in the current dispensation of Grace. Paul identifies seven distinct "ones" that bind all believers together. These are not humanly devised points of agreement, but divinely established realities. Before diving into each one individually, we must recognize that they form a complete and perfect whole, representing the unity that God has already accomplished through Christ. Our responsibility is to "endeavor to keep the unity of the Spirit in the bond of peace."',
        keyIdeas: [
          'Unity is divinely established, not humanly created.',
          'The seven "ones" cover every aspect of our spiritual life.',
          'We are called to "keep" this unity, not manufacture it.'
        ],
        questions: [
          {
            id: 'q0-1',
            question: 'According to Ephesians 4:3, what are we told to do regarding the unity of the Spirit?',
            options: [
              'Create it through ecumenical councils',
              'Endeavor to keep it in the bond of peace',
              'Ignore it and focus on local traditions',
              'Wait for it to be established in the future'
            ],
            correctAnswer: 1,
            explanation: 'Paul exhorts us to "endeavor to keep the unity of the Spirit in the bond of peace," implying it already exists.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'Why is it important to realize that spiritual unity is something God has already created rather than something we must build ourselves?'
      }
    ]
  },
  {
    id: 'module-1',
    title: 'One Body',
    description: 'Understanding the organic unity of all believers in the present dispensation.',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'The Seven-Fold Unity & The One Body',
        scripture: [
          { reference: 'Ephesians 4:4', text: 'There is one body, and one Spirit, even as ye are called in one hope of your calling;' },
          { reference: '1 Corinthians 12:13', text: 'For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'The "one body" is not a local organization, but a living organism. It is the Body of Christ, composed of all who have been saved by grace since the mystery was revealed to Paul. In this body, there is no distinction between Jew and Gentile.'
        },
        summary: 'Ephesians 4:4-6 presents a seven-fold unity that defines the Church which is His Body. The first of these is the "One Body." This is not a physical building or a denominational organization, but a spiritual organism. Every believer in this age of Grace is a member of this one body, joined to Christ as the Head. This unity is a fact to be recognized and "kept" in the bond of peace, not something we create by our own efforts.',
        keyIdeas: [
          'The Body of Christ is a spiritual organism, not a human organization.',
          'All believers are members of this one body regardless of background.',
          'Unity is a spiritual reality already established by God.'
        ],
        questions: [
          {
            id: 'q1',
            question: 'What does the "One Body" refer to in Ephesians 4:4?',
            options: [
              'A local church building',
              'A specific denomination',
              'The spiritual organism of all believers in Christ',
              'The nation of Israel'
            ],
            correctAnswer: 2,
            explanation: 'The "One Body" is the Body of Christ, a spiritual organism composed of all believers in this dispensation.',
            type: 'multiple-choice'
          },
          {
            id: 'q2',
            question: 'How are believers joined to the One Body according to 1 Corinthians 12:13?',
            options: [
              'By water baptism',
              'By joining a local church',
              'By the baptism of the Holy Spirit',
              'By performing good works'
            ],
            correctAnswer: 2,
            explanation: '1 Corinthians 12:13 states that "by one Spirit are we all baptized into one body."',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does the reality of being part of "One Body" change how you view other believers who may have different cultural or denominational backgrounds?'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'One Spirit',
    description: 'The Holy Spirit as the unifying life-force of the Body.',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'The One Spirit',
        scripture: [
          { reference: 'Ephesians 4:4', text: 'There is one body, and one Spirit...' },
          { reference: 'Ephesians 2:18', text: 'For through him we both have access by one Spirit unto the Father.' }
        ],
        sourceText: {
          book: 'The Fundamentals of Dispensationalism',
          author: 'Cornelius R. Stam',
          excerpt: 'The Holy Spirit is the one who convicts, seals, and indwells the believer. He is the "One Spirit" who animates the "One Body." Without the Spirit, there is no spiritual life or unity.'
        },
        summary: 'The "One Spirit" is the Holy Spirit of God. He is the agent of our new birth and the one who seals us until the day of redemption. In the Body of Christ, the Spirit provides the internal unity that makes the external "bond of peace" possible. He distributes gifts as He wills for the edification of the body and guides us into all truth.',
        keyIdeas: [
          'The Holy Spirit is the source of life for the Body.',
          'He provides access to the Father for all believers.',
          'He is the seal and earnest of our inheritance.'
        ],
        questions: [
          {
            id: 'q1',
            question: 'What is the primary role of the "One Spirit" in the Body?',
            options: [
              'To cause confusion',
              'To provide spiritual life and unify the members',
              'To judge the world',
              'To establish physical kingdoms'
            ],
            correctAnswer: 1,
            explanation: 'The Holy Spirit animates the Body and provides the spiritual unity among its members.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'In what ways do you see the "One Spirit" working to bring unity in your own life and study of the Word?'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'One Hope',
    description: 'The blessed hope of the Body of Christ.',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'The One Hope of Your Calling',
        scripture: [
          { reference: 'Ephesians 4:4', text: '...even as ye are called in one hope of your calling;' },
          { reference: 'Titus 2:13', text: 'Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ;' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'Our hope is not an earthly kingdom or a restored Israel, but the "blessed hope" of being caught up to meet the Lord in the air. This is the "one hope" unique to the Body of Christ.'
        },
        summary: 'The "One Hope" refers to the future expectation of the believer in this age. Unlike the earthly hope of Israel, our hope is heavenly. It is the expectation of the Rapture—the appearing of our Lord Jesus Christ to take His Body to be with Him in the heavenly places. This hope serves as an anchor for the soul and a motivation for holy living.',
        keyIdeas: [
          'The hope of the Body is heavenly, not earthly.',
          'It centers on the appearing of Jesus Christ.',
          'This hope unifies our perspective on the future.'
        ],
        questions: [
          {
            id: 'q1',
            question: 'What is the "One Hope" of the believer today?',
            options: [
              'The restoration of the Davidic kingdom',
              'The "blessed hope" of Christ\'s appearing for His Body',
              'Reincarnation',
              'World peace through human effort'
            ],
            correctAnswer: 1,
            explanation: 'The "One Hope" is the heavenly expectation of Christ\'s appearing to receive His Body.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does focusing on this "One Hope" help you navigate the trials and uncertainties of present-day life?'
      }
    ]
  },
  {
    id: 'module-4',
    title: 'One Lord',
    description: 'The Headship of Jesus Christ over His Body.',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'The One Lord',
        scripture: [
          { reference: 'Ephesians 4:5', text: 'One Lord, one faith, one baptism,' },
          { reference: 'Colossians 1:18', text: 'And he is the head of the body, the church: who is the beginning, the firstborn from the dead; that in all things he might have the preeminence.' }
        ],
        sourceText: {
          book: 'The Lordship of Christ',
          author: 'Cornelius R. Stam',
          excerpt: 'Jesus Christ is the "One Lord." He is the Head of the Church, and all authority rests in Him. To acknowledge Him as Lord is to submit to His Word and His direction for the Body.'
        },
        summary: 'The "One Lord" is the Lord Jesus Christ. In this dispensation, He is primarily revealed as the Head of the Body. His Lordship implies absolute authority and preeminence. There is no other mediator or head; every member of the Body is directly accountable to Him. Recognizing His Lordship is fundamental to the unity and function of the Church.',
        keyIdeas: [
          'Jesus Christ is the sole Head of the Church.',
          'His authority is absolute and preeminent.',
          'Unity is found in shared submission to His Lordship.'
        ],
        questions: [
          {
            id: 'q1',
            question: 'Who is the "One Lord" mentioned in Ephesians 4:5?',
            options: [
              'The Apostle Paul',
              'The Pope',
              'The Lord Jesus Christ',
              'An earthly king'
            ],
            correctAnswer: 2,
            explanation: 'The "One Lord" is Jesus Christ, the Head of the Body.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'What does it mean for you practically to live under the "One Lord" in your daily decisions?'
      }
    ]
  },
  {
    id: 'module-5',
    title: 'One Faith',
    description: 'The body of truth committed to the Body of Christ.',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'The One Faith',
        scripture: [
          { reference: 'Ephesians 4:5', text: 'One Lord, one faith, one baptism,' },
          { reference: 'Galatians 1:11-12', text: 'But I certify you, brethren, that the gospel which was preached of me is not after man. For I neither received it of man, neither was I taught it, but by the revelation of Jesus Christ.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'The "one faith" is the body of doctrine committed to Paul for us. It is the "preaching of Jesus Christ according to the revelation of the mystery." This is the faith we are to stand fast in.'
        },
        summary: 'The "One Faith" is not just the act of believing, but the *content* of what we believe—the "faith once delivered." In the context of the Mystery, it refers to the specific body of truth revealed to the Apostle Paul for the Body of Christ. This includes the Gospel of the Grace of God and the doctrines of our position in Christ. Unity is maintained when we hold fast to this sound doctrine.',
        keyIdeas: [
          'The "One Faith" refers to the body of sound doctrine for this age.',
          'It was revealed through the Apostle Paul.',
          'Doctrinal unity is essential for the Body.'
        ],
        questions: [
          {
            id: 'q1',
            question: 'What does "One Faith" primarily refer to in this context?',
            options: [
              'Personal sincerity',
              'The body of truth revealed for the Church today',
              'A specific religious ritual',
              'Belief in any god'
            ],
            correctAnswer: 1,
            explanation: 'It refers to the body of doctrine (the faith) committed to the Church in this dispensation.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does "rightly dividing the Word" help you identify the "One Faith" among many conflicting religious ideas?'
      }
    ]
  },
  {
    id: 'module-6',
    title: 'One Baptism',
    description: 'The spiritual baptism into Christ.',
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'The One Baptism',
        scripture: [
          { reference: 'Ephesians 4:5', text: 'One Lord, one faith, one baptism,' },
          { reference: 'Romans 6:3', text: 'Know ye not, that so many of us as were baptized into Jesus Christ were baptized into his death?' }
        ],
        sourceText: {
          book: 'Real Baptism',
          author: 'Charles F. Baker',
          excerpt: 'In this age of Grace, there is but "one baptism." This is not water baptism, which was a ritual of the past, but the spiritual baptism by which the believer is identified with Christ in His death, burial, and resurrection.'
        },
        summary: 'The "One Baptism" of Ephesians 4:5 is the spiritual baptism of 1 Corinthians 12:13. It is the work of the Holy Spirit placing the believer into the Body of Christ. This baptism identifies us with Christ in His death and resurrection, making us one with Him. Because there is only "one," water baptism (which was "with" or "in" water) has been superseded by this spiritual reality in the current dispensation.',
        keyIdeas: [
          'The "One Baptism" is spiritual, not ritualistic.',
          'It identifies the believer with Christ.',
          'It is the means by which we enter the "One Body."'
        ],
        questions: [
          {
            id: 'q1',
            question: 'Which baptism is the "One Baptism" of Ephesians 4:5?',
            options: [
              'John\'s baptism',
              'Water baptism by immersion',
              'The spiritual baptism into Christ\'s Body',
              'Baptism for the dead'
            ],
            correctAnswer: 2,
            explanation: 'In the seven-fold unity, the "one baptism" is the spiritual identification with Christ.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does understanding baptism as "identification" rather than a "ritual" change your appreciation of your position in Christ?'
      }
    ]
  },
  {
    id: 'module-7',
    title: 'One God and Father',
    description: 'The ultimate source and goal of all things.',
    lessons: [
      {
        id: 'lesson-7-1',
        title: 'One God and Father of All',
        scripture: [
          { reference: 'Ephesians 4:6', text: 'One God and Father of all, who is above all, and through all, and in you all.' },
          { reference: '1 Corinthians 8:6', text: 'But to us there is but one God, the Father, of whom are all things, and we in him; and one Lord Jesus Christ, by whom are all things, and we by him.' }
        ],
        sourceText: {
          book: 'Things That Differ',
          author: 'C.R. Stam',
          excerpt: 'The climax of this unity is "One God and Father." He is the source of our life and the one to whom all glory belongs. He is sovereign over all and indwells every member of His family.'
        },
        summary: 'The final "one" is the "One God and Father of all." This emphasizes the fatherhood of God over the new creation. He is transcendent ("above all"), active ("through all"), and immanent ("in you all"). This unity reminds us that we are part of a divine family, with God Himself as our Father, providing the ultimate foundation for our peace and security.',
        keyIdeas: [
          'God is the Father of all who are in Christ.',
          'He is sovereign and omnipresent within His Body.',
          'He is the ultimate source of our unity.'
        ],
        questions: [
          {
            id: 'q1',
            question: 'What does it mean that God is "above all, through all, and in you all"?',
            options: [
              'He is distant and uncaring',
              'He is sovereign, active, and present in His people',
              'He is part of nature',
              'He only cares about certain people'
            ],
            correctAnswer: 1,
            explanation: 'These terms describe God\'s sovereignty, His working through His creation, and His indwelling of believers.',
            type: 'multiple-choice'
          }
        ],
        reflectionPrompt: 'How does knowing that the "One God and Father" is "in you all" affect your sense of belonging and purpose?'
      }
    ]
  }
];
